/**
 * @file networkFirst.js
 * Universal Network-First data fetching utility.
 * Always attempts to query the fresh backend database first.
 * If the network fails, is offline, or times out (3.5s default),
 * it seamlessly falls back to high-capacity IndexedDB cache and dispatches
 * status events to trigger transparent offline UI indicators.
 */

import { getCache, setCache, migrateFromLocalStorage } from "./idbStorage";

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

// Listen for global retry request from OfflineCacheBanner
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

/**
 * Dispatches a global event when an entity is fetched or served from cache.
 * @param {object} detail
 */
export const broadcastCacheStatus = (detail) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CACHE_STATUS_EVENT, { detail }));
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
  if (typeof window === "undefined") return () => {};
  const handler = (e) => callback(e.detail);
  window.addEventListener(CACHE_STATUS_EVENT, handler);
  return () => window.removeEventListener(CACHE_STATUS_EVENT, handler);
};

/**
 * Executes a network-first fetch with IndexedDB fallback.
 *
 * @template T
 * @param {object} options
 * @param {string} options.cacheKey - Unique key for IndexedDB
 * @param {string} [options.legacyKey] - Optional legacy localStorage key for one-time migration
 * @param {(signal: AbortSignal) => Promise<any>} options.fetcher - Async function making the network call
 * @param {T} options.fallbackDefault - Static fallback if both network & cache fail
 * @param {number} [options.timeoutMs=3500] - Max time to wait for network before falling back to cache
 * @param {(data: any) => T} [options.transform] - Optional transformer function applied to raw response data
 * @returns {Promise<{ data: T, isFromCache: boolean, timestamp: number | null, isDefault?: boolean }>}
 */
export const networkFirstFetch = async ({
  cacheKey,
  legacyKey = null,
  fetcher,
  fallbackDefault,
  timeoutMs = 3500,
  transform = (x) => x,
}) => {
  // Reuse in-flight request if one is already pending for this cacheKey
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const executionPromise = (async () => {
    // 1. If legacyKey provided, run one-time lazy migration in the background
    const migrationPromise = legacyKey
      ? migrateFromLocalStorage(legacyKey, cacheKey).catch(() => {})
      : null;

    // 2. Attempt Network Request First
    try {
      const controller = new AbortController();
      const timerId = setTimeout(() => {
        controller.abort();
      }, timeoutMs);

      const response = await fetcher(controller.signal);
      clearTimeout(timerId);

      // Validate response payload: reject bodies with success === false or missing data
      if (!response || response.data?.success === false || response.data?.data === undefined) {
        throw new Error(`Invalid response payload for "${cacheKey}"`);
      }

      const rawData = response.data.data;
      const finalData = transform(rawData);

      // Asynchronously update IndexedDB cache
      const now = Date.now();
      await setCache(cacheKey, finalData);

      // Notify UI that content is fresh from the live network
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
    } catch (err) {
      console.warn(
        `[networkFirst] Network request failed for "${cacheKey}" (${err?.message || err}). Falling back to IndexedDB.`
      );
    }

    // 3. Fallback to IndexedDB Cache
    try {
      if (migrationPromise) {
        await migrationPromise;
      }
      const cached = await getCache(cacheKey);
      if (cached && cached.data !== undefined) {
        broadcastCacheStatus({
          cacheKey,
          isFromCache: true,
          timestamp: cached.timestamp,
          error: "Network unavailable. Serving from offline cache.",
        });

        return {
          data: cached.data,
          isFromCache: true,
          timestamp: cached.timestamp,
        };
      }
    } catch (idbErr) {
      console.error(`[networkFirst] Error accessing IndexedDB for "${cacheKey}":`, idbErr);
    }

    // 4. Ultimate Fallback to Hardcoded Defaults
    broadcastCacheStatus({
      cacheKey,
      isFromCache: true,
      isDefault: true,
      timestamp: null,
      error: "Network unavailable and no cached snapshot found.",
    });

    return {
      data: fallbackDefault,
      isFromCache: true,
      isDefault: true,
      timestamp: null,
    };
  })().finally(() => {
    inFlightRequests.delete(cacheKey);
  });

  inFlightRequests.set(cacheKey, executionPromise);
  return executionPromise;
};
