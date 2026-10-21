/**
 * @file idbStorage.js
 * High-performance, Promise-based IndexedDB storage manager for client-side caching.
 * Provides asynchronous, non-blocking storage with zero main-thread blocking
 * and no 5MB quota restrictions.
 */

const DB_NAME = "tu_community_cache_db";
const DB_VERSION = 1;
const STORE_NAME = "app_cache";

/**
 * Opens or initializes the IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
const openDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB is not supported in this environment"));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Reads a cached value by key along with its metadata.
 * @param {string} key
 * @returns {Promise<{ data: any, timestamp: number } | null>}
 */
export const getCache = async (key) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        if (req.result && req.result.data !== undefined) {
          resolve({
            data: req.result.data,
            timestamp: req.result.timestamp || Date.now(),
          });
        } else {
          resolve(null);
        }
      };

      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error(`[idbStorage] Error reading key "${key}":`, err);
    return null;
  }
};

/**
 * Stores a value in the cache with the current timestamp.
 * @param {string} key
 * @param {any} data
 * @returns {Promise<boolean>}
 */
export const setCache = async (key, data) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const record = {
        key,
        data,
        timestamp: Date.now(),
      };
      const req = store.put(record);

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error(`[idbStorage] Error setting key "${key}":`, err);
    return false;
  }
};

/**
 * Removes a cached entry from IndexedDB.
 * @param {string} key
 * @returns {Promise<boolean>}
 */
export const deleteCache = async (key) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error(`[idbStorage] Error deleting key "${key}":`, err);
    return false;
  }
};

/**
 * Clears all cached items from the store.
 * @returns {Promise<boolean>}
 */
export const clearAllCache = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("[idbStorage] Error clearing cache:", err);
    return false;
  }
};

/**
 * Migrates a legacy localStorage item into IndexedDB if it doesn't already exist.
 * Automatically cleans up the legacy localStorage key after migration.
 * @param {string} legacyLocalStorageKey
 * @param {string} idbKey
 * @returns {Promise<any | null>} Migrated data if migration occurred, or null.
 */
export const migrateFromLocalStorage = async (legacyLocalStorageKey, idbKey) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;

    const existing = await getCache(idbKey);
    if (existing) return existing.data;

    const raw = window.localStorage.getItem(legacyLocalStorageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (parsed !== undefined && parsed !== null) {
      await setCache(idbKey, parsed);
      // Clean up legacy key to free up localStorage quota
      window.localStorage.removeItem(legacyLocalStorageKey);
      return parsed;
    }
  } catch (err) {
    console.warn(`[idbStorage] Migration notice for "${legacyLocalStorageKey}":`, err?.message || err);
  }
  return null;
};
