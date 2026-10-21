import axios from "axios";
import { BASE_URL } from "@/config";
import { networkFirstFetch, registerCacheFetcher } from "@/utils/cache/networkFirst";
import { setCache, getCache } from "@/utils/cache/idbStorage";

export const DEFAULT_BATCHES = [
  "The Uniques 1.0",
  "The Uniques 2.0",
  "The Uniques 3.0",
  "The Uniques 4.0",
];

const BATCH_CACHE_KEY = "tu_community_member_batches";
const LEGACY_STORAGE_KEY = "tu_community_member_batches";

const mergeBatches = (rawList) => {
  if (!Array.isArray(rawList) || rawList.length === 0) return [...DEFAULT_BATCHES];
  const merged = [...DEFAULT_BATCHES];
  rawList.forEach((b) => {
    if (b && !merged.includes(b)) {
      merged.push(b);
    }
  });
  return merged;
};

// In-memory runtime cache for synchronous lookups
let inMemoryBatches = [...DEFAULT_BATCHES];

// Asynchronously hydrate from IndexedDB on startup
if (typeof window !== "undefined") {
  getCache(BATCH_CACHE_KEY).then((cached) => {
    if (cached && Array.isArray(cached.data)) {
      inMemoryBatches = mergeBatches(cached.data);
    }
  }).catch(() => {});
}

export const getStoredBatches = () => {
  return [...inMemoryBatches];
};

export const fetchBatches = async () => {
  const result = await networkFirstFetch({
    cacheKey: BATCH_CACHE_KEY,
    legacyKey: LEGACY_STORAGE_KEY,
    fallbackDefault: [...DEFAULT_BATCHES],
    timeoutMs: 3500,
    fetcher: (signal) => axios.get(`${BASE_URL}/api/batches/all`, { signal }),
    transform: (data) => {
      if (Array.isArray(data)) {
        return mergeBatches(data);
      }
      return [...DEFAULT_BATCHES];
    },
  });

  if (result.data) {
    inMemoryBatches = result.data;
    window.dispatchEvent(new CustomEvent("batches-updated", { detail: result.data }));
  }

  return result.data;
};

// Register for global network retry button
if (typeof window !== "undefined") {
  registerCacheFetcher(BATCH_CACHE_KEY, fetchBatches);
}

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
 * Returns active/inactive status based on batch cohort:
 * - Batches 1.0, 2.0, 3.0 -> "inactive"
 * - Batch 4.0 (and 5.0+) -> "active"
 * - Honors suspended / blocked states if user object is provided
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
