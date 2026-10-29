/**
 * @file lazyWithRetry.js
 * @description Resilient dynamic module import utility with exponential backoff and automatic cache-busting reloads on deployment chunk mismatches.
 * @architecture Core routing and bundle loading utility in src/utils/ wrapping React.lazy across application code-split entrypoints.
 * @agent_note Intercepts 'ChunkLoadError' and network fetch rejections. Stores reload timestamp in sessionStorage (tu_chunk_reload_timestamp) to debounce refresh loops.
 */

import { lazy } from "react";

const RELOAD_STORAGE_KEY = "tu_chunk_reload_timestamp";
const DEFAULT_RELOAD_DELAY_MS = 20000;

/**
 * @desc Determines whether an error is caused by a missing chunk / dynamic import failure.
 * @param {unknown} error - Error object or error string to inspect
 * @returns {boolean} True if error indicates a chunk load failure or network fetch error
 */
export const isChunkLoadError = (error) => {
  if (!error) return false;
  const msg = error?.message || (typeof error === "string" ? error : "");
  const name = error?.name || "";

  return (
    name === "ChunkLoadError" ||
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Importing a module script failed") ||
    msg.includes("error loading dynamically imported module") ||
    msg.includes("Loading chunk") ||
    msg.includes("Failed to load module script")
  );
};

/**
 * @desc Retries a dynamic module import with backoff and automatic page refresh on stale chunks.
 * @template T
 * @param {() => Promise<T>} componentImport - Factory function returning dynamic import() promise
 * @param {object} [options]
 * @param {number} [options.retries=2] - Number of network retry attempts before failing
 * @param {number} [options.interval=1000] - Base delay in ms between retries
 * @param {number} [options.reloadDelay=DEFAULT_RELOAD_DELAY_MS] - Min ms between auto-reloads
 * @param {Storage | null} [options.storage] - Storage interface for reload debounce
 * @param {(() => void) | null} [options.reloader] - Function to trigger page reload
 * @returns {Promise<T>}
 */
export const retryImport = (
  componentImport,
  {
    retries = 2,
    interval = 1000,
    reloadDelay = DEFAULT_RELOAD_DELAY_MS,
    storage = typeof window !== "undefined" ? window.sessionStorage : null,
    reloader = typeof window !== "undefined" ? () => window.location.reload() : null,
  } = {}
) => {
  return new Promise((resolve, reject) => {
    const attempt = (retriesLeft, currentDelay) => {
      componentImport()
        .then(resolve)
        .catch((error) => {
          // If we still have retries remaining, backoff and retry
          if (retriesLeft > 0) {
            setTimeout(() => {
              attempt(retriesLeft - 1, Math.round(currentDelay * 1.5));
            }, currentDelay);
            return;
          }

          // If all retries exhausted, check if this is a chunk hash mismatch from a new deployment
          if (isChunkLoadError(error) && storage && reloader) {
            try {
              const lastReload = storage.getItem(RELOAD_STORAGE_KEY);
              const now = Date.now();

              // Only auto-reload if we haven't reloaded within reloadDelay to prevent infinite refresh loops
              if (!lastReload || now - Number(lastReload) > reloadDelay) {
                storage.setItem(RELOAD_STORAGE_KEY, String(now));
                try {
                  reloader();
                } finally {
                  reject(new Error("Reloading page due to updated application version"));
                }
                return;
              }
            } catch (storageErr) {
              console.warn("[lazyWithRetry] Storage error during chunk reload check:", storageErr);
            }
          }

          reject(error);
        });
    };

    attempt(retries, interval);
  });
};

/**
 * @desc Enhanced React.lazy wrapper with automatic retry and stale-chunk auto-refresh.
 * @template T
 * @param {() => Promise<{ default: T }>} componentImport
 * @param {object} [options]
 * @returns {React.LazyExoticComponent<T>}
 */
export const lazyWithRetry = (componentImport, options = {}) => {
  return lazy(() => retryImport(componentImport, options));
};

export default lazyWithRetry;
