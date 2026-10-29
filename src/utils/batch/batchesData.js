/**
 * @file batchesData.js
 * @description Master cohort data service managing community batch nomenclature, validation, natural sorting, status resolution, and backend synchronization.
 * @architecture Batch data foundation utility in src/utils/batch/ consumed by filter controls, registration forms, student rosters, and batch profile resolvers.
 * @agent_note Communicates with backend endpoints:
 *   - GET `${BASE_URL}/api/batches/all` (handled by backend batch controller `getAllBatches`)
 *   - POST `${BASE_URL}/api/batches/add` (handled by backend batch controller `addBatch`, payload: `{ name: string }`)
 * Caching strategy: Network-first via `networkFirstFetch` with IndexedDB key "tu_community_member_batches", legacy localStorage key "tu_community_member_batches", in-memory cache `inMemoryBatches`, and DOM event "batches-updated".
 */

import axios from "axios";
import { BASE_URL } from "../../config.js";
import { networkFirstFetch, registerCacheFetcher } from "../cache/networkFirst.js";
import { setCache, getCache } from "../cache/idbStorage.js";

export const DEFAULT_BATCHES = [];

const BATCH_CACHE_KEY = "tu_community_member_batches";
const LEGACY_STORAGE_KEY = "tu_community_member_batches";

/**
 * @desc Sorts batch names in natural numerical order according to batch version numbers
 * @param {Array<string>} list - Array of batch name strings
 * @returns {Array<string>} Naturally sorted batch names
 */
const sortBatchesNaturally = (list) => {
  return [...list].sort((a, b) => {
    const numA = parseFloat(String(a).match(/(\d+(\.\d+)?)/)?.[1] || 9999);
    const numB = parseFloat(String(b).match(/(\d+(\.\d+)?)/)?.[1] || 9999);
    if (numA !== numB) return numA - numB;
    return String(a).localeCompare(String(b));
  });
};

/**
 * @desc Validates, deduplicates, and filters out malformed or timestamp-corrupted batch names
 * @param {Array<string>} rawList - Raw batch identifiers
 * @returns {Array<string>} Clean, deduplicated, sorted batch list
 */
const mergeBatches = (rawList) => {
  if (!Array.isArray(rawList) || rawList.length === 0) return [];
  const valid = rawList.filter(
    (b) => typeof b === "string" && b.trim().length > 0 && !/-\d{10,}/.test(b)
  );
  if (valid.length === 0) return [];
  return sortBatchesNaturally(Array.from(new Set(valid)));
};

// In-memory runtime cache for synchronous lookups
let inMemoryBatches = [];

// Asynchronously hydrate from IndexedDB on startup
if (typeof window !== "undefined") {
  getCache(BATCH_CACHE_KEY).then((cached) => {
    if (cached && Array.isArray(cached.data)) {
      inMemoryBatches = mergeBatches(cached.data);
    }
  }).catch(() => {});
}

/**
 * @desc Synchronously returns all stored batch names from the in-memory cache
 * @returns {Array<string>} Snapshot list of active batch names
 */
export const getStoredBatches = () => {
  return [...inMemoryBatches];
};

/**
 * @desc Fetches all registered batches via network-first strategy, updating IndexedDB cache
 * @api GET `${BASE_URL}/api/batches/all` handled by backend `getAllBatches` controller
 * @returns {Promise<Array<string>>} Resolved list of batch names
 */
export const fetchBatches = async () => {
  const result = await networkFirstFetch({
    cacheKey: BATCH_CACHE_KEY,
    legacyKey: LEGACY_STORAGE_KEY,
    fallbackDefault: [],
    timeoutMs: 10000,
    fetcher: (signal) => axios.get(`${BASE_URL}/api/batches/all`, { signal }),
    transform: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        return mergeBatches(data);
      }
      return [];
    },
  });

  if (result.data) {
    inMemoryBatches = result.data;
    window.dispatchEvent(new CustomEvent("batches-updated", { detail: result.data }));
  }

  return result.data || [];
};

// Register for global network retry button
if (typeof window !== "undefined") {
  registerCacheFetcher(BATCH_CACHE_KEY, fetchBatches);
}

/**
 * @desc Calculates the next sequential batch name based on the highest existing batch version
 * @param {Array<string>} [existingBatches=getStoredBatches()] - Existing batch names
 * @returns {string} Suggested next batch title (e.g. "The Uniques 5.0")
 */
export const suggestNextBatch = (existingBatches = getStoredBatches()) => {
  let maxNum = 4.0;
  existingBatches.forEach((b) => {
    const match = String(b).match(/(\d+(\.\d+)?)/);
    if (match) {
      const num = parseFloat(match[1]);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });
  const nextNum = (Math.floor(maxNum) + 1).toFixed(1);
  return `The Uniques ${nextNum}`;
};

/**
 * @desc Appends a newly created batch name, saving to MongoDB and updating IndexedDB cache
 * @api POST `${BASE_URL}/api/batches/add` handled by backend `addBatch` controller (payload: `{ name: formatted }`)
 * @param {string} batchName - Proposed batch name
 * @returns {Promise<string|null>} Formatted batch name, or null if invalid
 */
export const addStoredBatch = async (batchName) => {
  if (!batchName || !batchName.trim()) return null;
  let formatted = batchName.trim();
  if (
    !formatted.toLowerCase().startsWith("the uniques") &&
    !formatted.toLowerCase().startsWith("uniques")
  ) {
    formatted = `The Uniques ${formatted}`;
  } else if (formatted.toLowerCase().startsWith("uniques")) {
    formatted = `The ${formatted}`;
  }

  const current = getStoredBatches();
  if (!current.includes(formatted)) {
    // 1. Save in MongoDB first
    try {
      await axios.post(`${BASE_URL}/api/batches/add`, { name: formatted }, { withCredentials: true });
    } catch (err) {
      console.warn("Backend MongoDB notice for batch add:", err?.message || err);
    }

    // 2. Update memory & IndexedDB cache, broadcast to app
    const updated = [...current, formatted];
    inMemoryBatches = updated;
    await setCache(BATCH_CACHE_KEY, updated);
    window.dispatchEvent(
      new CustomEvent("batches-updated", { detail: updated })
    );
    return formatted;
  }
  return formatted;
};

/**
 * @desc Returns active/inactive status based on batch cohort:
 * - Batches 1.0, 2.0, 3.0 -> "inactive"
 * - Batch 4.0 (and 5.0+) -> "active"
 * - Honors suspended / blocked states if user object is provided
 * @param {string|Object} batchOrUser - Batch name string or user profile object
 * @returns {string} Batch status ("active", "inactive", "suspended", "blocked")
 */
export const getBatchStatus = (batchOrUser) => {
  if (!batchOrUser) return "inactive";

  const isUserObj = typeof batchOrUser === "object" && batchOrUser !== null;
  const batchStr = isUserObj ? (batchOrUser.batch || "") : String(batchOrUser);
  
  if (isUserObj) {
    if (batchOrUser.isSuspended) return "suspended";
    if (batchOrUser.profileStatus === "blocked") return "blocked";
  }

  const lower = batchStr.toLowerCase().trim();

  // Batches 1.0, 2.0, 3.0 are inactive (graduated batches)
  if (
    lower.includes("1.0") ||
    lower.includes("2.0") ||
    lower.includes("3.0") ||
    lower.endsWith("1.0") ||
    lower.endsWith("2.0") ||
    lower.endsWith("3.0")
  ) {
    return "inactive";
  }

  // Batch 4.0, 5.0 and newer batches are active
  if (
    lower.includes("4.0") ||
    lower.includes("5.0") ||
    lower.includes("6.0") ||
    lower.includes("7.0") ||
    lower.includes("8.0") ||
    lower.includes("9.0")
  ) {
    return "active";
  }

  if (isUserObj && batchOrUser.profileStatus) {
    return batchOrUser.profileStatus;
  }

  return "active";
};
