/**
 * @file networkFirst.js
 * High-performance Stale-While-Revalidate (SWR) data fetching engine with IndexedDB persistence.
 *
 * Pattern:
 * 1. Instant Cache Return: If cached snapshot exists, returns it immediately (0ms blocking time).
 * 2. Background Revalidation: Automatically revalidates against the live backend with a realistic
 *    timeout (10s) that accommodates serverless cold starts.
 * 3. Silent Sync: Updates cache and dispatches entity-update events cleanly without jarring UI flashes.
 * 4. True Offline Detection: Does NOT report network failure or show error banners if the client is online.
 */

import { getCache, setCache, migrateFromLocalStorage } from "./idbStorage.js";

export const CACHE_STATUS_EVENT = "tu-cache-status-updated";

// Global registry of retryable fetchers
const registeredFetchers = new Map();

/**
 * Registers an active data fetcher for global retry attempts.
 * @param {string} cacheKey
 * @param {() => Promise<any>} fetcherFn
 * @returns {() => void} Unregister function
 */
export const registerCacheFetcher = (cacheKey, fetcherFn) => {
  registeredFetchers.set(cacheKey, fetcherFn);
  return () => registeredFetchers.delete(cacheKey);
};

// Listen for global retry request from OfflineCacheBanner or manual sync
if (typeof window !== "undefined") {
  window.addEventListener("tu-cache-retry-all", () => {
    registeredFetchers.forEach((fetchFn) => {
      try {
        fetchFn();
      } catch (err) {
        console.warn("[networkFirst] Error executing retry:", err);
      }
    });
  });
}

// Universal event bus that works across browser and testing environments
const globalEventBus =
  typeof window !== "undefined"
    ? window
    : (typeof globalThis !== "undefined" && globalThis.EventTarget ? new globalThis.EventTarget() : null);

/**
 * Dispatches a global event when an entity is fetched or served from cache.
 * @param {object} detail
 */
export const broadcastCacheStatus = (detail) => {
  if (globalEventBus && typeof globalEventBus.dispatchEvent === "function") {
    let event;
    if (typeof CustomEvent === "function") {
      event = new CustomEvent(CACHE_STATUS_EVENT, { detail });
    } else {
      // Node.js EventTarget fallback
      event = new Event(CACHE_STATUS_EVENT);
      event.detail = detail;
    }
    globalEventBus.dispatchEvent(event);
  }
};

// In-flight request deduplication map to prevent multiple concurrent requests for the same key
const inFlightRequests = new Map();

/**
 * Subscribes to cache status updates.
 * @param {(detail: object) => void} callback
 * @returns {() => void} Unsubscribe function
 */
export const subscribeCacheStatus = (callback) => {
  if (!globalEventBus || typeof globalEventBus.addEventListener !== "function") return () => {};
  const handler = (e) => callback(e.detail || e);
  globalEventBus.addEventListener(CACHE_STATUS_EVENT, handler);
  return () => globalEventBus.removeEventListener(CACHE_STATUS_EVENT, handler);
};

/**
 * Helper to determine if browser is truly online
 */
export const isBrowserOnline = () => {
  return typeof navigator === "undefined" || navigator.onLine !== false;
};

/**
 * Executes a Stale-While-Revalidate fetch with IndexedDB persistence.
 *
 * @template T
 * @param {object} options
 * @param {string} options.cacheKey - Unique key for IndexedDB
 * @param {string} [options.legacyKey] - Optional legacy localStorage key for one-time migration
 * @param {(signal: AbortSignal) => Promise<any>} options.fetcher - Async function making the network call
 * @param {T} options.fallbackDefault - Static fallback if both network & cache fail
 * @param {number} [options.timeoutMs=10000] - Max time to wait for network before falling back to cache
 * @param {(data: any) => T} [options.transform] - Optional transformer function applied to raw response data
 * @param {boolean} [options.forceFresh=false] - If true, bypasses immediate cache return and awaits fresh network response
 * @returns {Promise<{ data: T, isFromCache: boolean, timestamp: number | null, isDefault?: boolean }>}
 */
export const networkFirstFetch = async ({
  cacheKey,
  legacyKey = null,
  fetcher,
  fallbackDefault,
  timeoutMs = 10000,
  transform = (x) => x,
  forceFresh = false,
}) => {
  // 1. One-time legacy localStorage migration if configured
  if (legacyKey) {
    migrateFromLocalStorage(legacyKey, cacheKey).catch(() => {});
  }

  // Helper executing the network call with timeout
  const executeNetworkCall = async () => {
    const controller = new AbortController();
    const timerId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const response = await fetcher(controller.signal);
      clearTimeout(timerId);

      // Validate response payload: reject bodies with success === false or missing data
      if (!response || response.data?.success === false || response.data?.data === undefined) {
        throw new Error(`Invalid response payload for "${cacheKey}"`);
      }

      const rawData = response.data.data;
      const finalData = transform(rawData);

      const now = Date.now();
      await setCache(cacheKey, finalData);

      broadcastCacheStatus({
        cacheKey,
        isFromCache: false,
        timestamp: now,
        error: null,
      });

      return {
        data: finalData,
        isFromCache: false,
        timestamp: now,
      };
    } catch (networkErr) {
      clearTimeout(timerId);
      const online = isBrowserOnline();

      // Only report an error if genuinely offline
      const errorMsg = online
        ? null
        : "Network unavailable. Serving from offline cache.";

      broadcastCacheStatus({
        cacheKey,
        isFromCache: true,
        timestamp: Date.now(),
        error: errorMsg,
      });

      throw networkErr;
    }
  };

  // 2. Check existing cache
  let cachedRecord = null;
  try {
    cachedRecord = await getCache(cacheKey);
  } catch (idbErr) {
    console.warn(`[networkFirst] Cache read error for "${cacheKey}":`, idbErr);
  }

  const hasValidCache = cachedRecord && cachedRecord.data !== undefined;

  // Stale-While-Revalidate: If we have valid cache and forceFresh is NOT requested,
  // return cached data immediately and revalidate silently in the background
  if (hasValidCache && !forceFresh) {
    // Schedule background revalidation if no request is currently in-flight
    if (!inFlightRequests.has(cacheKey)) {
      const bgPromise = executeNetworkCall()
        .catch((err) => {
          // Suppress error in console when online (normal slow/cold-start revalidation)
          if (isBrowserOnline()) {
            console.debug(`[networkFirst] Background revalidation failed for "${cacheKey}":`, err?.message || err);
          } else {
            console.warn(`[networkFirst] Offline revalidation failed for "${cacheKey}".`);
          }
        })
        .finally(() => {
          inFlightRequests.delete(cacheKey);
        });

      inFlightRequests.set(cacheKey, bgPromise);
    }

    return {
      data: cachedRecord.data,
      isFromCache: true,
      timestamp: cachedRecord.timestamp,
    };
  }

  // 3. No cache available OR forceFresh requested: Must await network call
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const executionPromise = (async () => {
    try {
      return await executeNetworkCall();
    } catch (err) {
      console.warn(
        `[networkFirst] Initial network fetch failed for "${cacheKey}" (${err?.message || err}). Falling back to defaults/cache.`
      );

      if (hasValidCache) {
        return {
          data: cachedRecord.data,
          isFromCache: true,
          timestamp: cachedRecord.timestamp,
        };
      }

      // Fallback to hardcoded default
      return {
        data: fallbackDefault,
        isFromCache: true,
        isDefault: true,
        timestamp: null,
      };
    }
  })().finally(() => {
    inFlightRequests.delete(cacheKey);
  });

  inFlightRequests.set(cacheKey, executionPromise);
  return executionPromise;
};

// Modern semantic alias
export const swrFetch = networkFirstFetch;
