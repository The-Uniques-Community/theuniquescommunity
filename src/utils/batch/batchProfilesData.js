/**
 * @file batchProfilesData.js
 * @description Data service and caching layer for community batch profiles, handling remote syncing, IndexedDB offline persistence, natural sorting, and member batch merging.
 * @architecture Data provider utility in src/utils/batch/ supplying batch metadata, portraits, and narratives to batch directories and cards.
 * @agent_note Communicates with backend endpoints:
 *   - GET `${BASE_URL}/api/batches/profiles` (handled by backend batch controller `getBatchProfiles`)
 *   - POST `${BASE_URL}/api/batches/profiles/update` (handled by backend batch controller `updateBatchProfiles`, payload: `{ profiles: Array<{ id, label, title, description, image, customImage }> }`)
 * Caching strategy: Network-first via `networkFirstFetch` using IndexedDB key "tu_community_batch_profiles", legacy localStorage key "tu_community_batch_profiles", synchronous `inMemoryProfiles` buffer, and DOM events "batch-profiles-updated".
 */

import axios from "axios";
import { BASE_URL } from "../../config.js";
import { getStoredBatches } from "./batchesData.js";
import { getSafeImageUrl } from "../imageHelper.js";
import { networkFirstFetch, registerCacheFetcher } from "../cache/networkFirst.js";
import { setCache, getCache, deleteCache } from "../cache/idbStorage.js";

export const DEFAULT_BATCH_FALLBACK_IMAGE = "/batches/default-batch.webp";
export const DEFAULT_BATCH_PROFILES = [];

const PROFILES_CACHE_KEY = "tu_community_batch_profiles";
const LEGACY_STORAGE_KEY = "tu_community_batch_profiles";

/**
 * @desc Sorts batch profile records naturally based on numeric version tags parsed from names
 * @param {Array<Object>} list - Raw batch profile items
 * @returns {Array<Object>} Numerically ordered batch profile items
 */
const sortProfilesNaturally = (list) => {
  return [...list].sort((a, b) => {
    const nameA = a.label || a.title || "";
    const nameB = b.label || b.title || "";
    const numA = parseFloat(String(nameA).match(/(\d+(\.\d+)?)/)?.[1] || 9999);
    const numB = parseFloat(String(nameB).match(/(\d+(\.\d+)?)/)?.[1] || 9999);
    if (numA !== numB) return numA - numB;
    return String(nameA).localeCompare(String(nameB));
  });
};

/**
 * @desc Transforms raw batch profile data, ensuring safe image URLs, synthesizing placeholders for registered member batches, and sorting
 * @param {Array<Object>} rawList - Raw profile items fetched from server or storage
 * @returns {Array<Object>} Normalized and enriched batch profiles
 */
export const resolveProfilesWithDefaults = (rawList) => {
  let profiles = [];
  if (Array.isArray(rawList) && rawList.length > 0) {
    profiles = rawList.map((p) => {
      return {
        ...p,
        image: getSafeImageUrl(p.image, DEFAULT_BATCH_FALLBACK_IMAGE),
      };
    });
  }

  if (profiles.length === 0) {
    return [];
  }

  const memberBatches = getStoredBatches().filter(
    (b) => typeof b === "string" && b.trim().length > 0 && !/-\d{10,}/.test(b)
  );
  memberBatches.forEach((batchName) => {
    const label = batchName.replace(/^The\s+/i, "");
    const exists = profiles.some(
      (p) => p.label?.toLowerCase() === label.toLowerCase() || p.title?.toLowerCase() === batchName.toLowerCase()
    );
    if (!exists) {
      profiles.push({
        id: `batch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        label: label,
        title: batchName,
        description: `${batchName} is actively engaged in advanced skills training, projects, and innovation within The Uniques Community.`,
        image: DEFAULT_BATCH_FALLBACK_IMAGE,
        customImage: false,
      });
    }
  });

  const validProfiles = profiles.filter(
    (p) => !/-\d{10,}/.test(p.title || "") && !/-\d{10,}/.test(p.label || "")
  );

  return sortProfilesNaturally(validProfiles);
};

// In-memory runtime cache for synchronous UI reads
let inMemoryProfiles = [];

// Asynchronously hydrate from IndexedDB on startup & listen for batch updates
if (typeof window !== "undefined") {
  getCache(PROFILES_CACHE_KEY).then((cached) => {
    if (cached && Array.isArray(cached.data)) {
      inMemoryProfiles = resolveProfilesWithDefaults(cached.data);
    }
  }).catch(() => {});

  window.addEventListener("batches-updated", () => {
    inMemoryProfiles = resolveProfilesWithDefaults(inMemoryProfiles);
  });
}

/**
 * @desc Synchronously retrieves current batch profiles from the in-memory runtime cache
 * @returns {Array<Object>} Snapshot array of normalized batch profiles
 */
export const getStoredBatchProfiles = () => {
  return [...inMemoryProfiles];
};

/**
 * @desc Fetches batch profiles using network-first strategy, writing to IndexedDB and broadcasting updates
 * @api GET `${BASE_URL}/api/batches/profiles` handled by backend `getBatchProfiles` controller
 * @returns {Promise<Array<Object>>} Resolved batch profile array
 */
export const fetchBatchProfiles = async () => {
  const result = await networkFirstFetch({
    cacheKey: PROFILES_CACHE_KEY,
    legacyKey: LEGACY_STORAGE_KEY,
    fallbackDefault: [],
    timeoutMs: 10000,
    fetcher: (signal) => axios.get(`${BASE_URL}/api/batches/profiles`, { signal }),
    transform: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        return resolveProfilesWithDefaults(data);
      }
      return [];
    },
  });

  if (result.data) {
    inMemoryProfiles = result.data;
    window.dispatchEvent(new CustomEvent("batch-profiles-updated", { detail: result.data }));
  }

  return result.data || [];
};

// Register for global network retry button
if (typeof window !== "undefined") {
  registerCacheFetcher(PROFILES_CACHE_KEY, fetchBatchProfiles);
}

/**
 * @desc Persists updated batch profiles list to IndexedDB and remote MongoDB backend
 * @api POST `${BASE_URL}/api/batches/profiles/update` handled by backend `updateBatchProfiles` controller
 * @param {Array<Object>} profiles - Full collection of batch profile items to save
 * @returns {Promise<boolean>} True if update succeeded
 */
export const saveStoredBatchProfiles = async (profiles) => {
  try {
    const toSave = profiles.map((p) => {
      const isCustom = Boolean(
        p.image &&
        (typeof p.image === "string") &&
        (p.image.startsWith("data:") || p.image.startsWith("http://") || p.image.startsWith("https://"))
      );
      return {
        id: p.id,
        label: p.label,
        title: p.title,
        description: p.description,
        image: isCustom ? p.image : "",
        customImage: isCustom,
      };
    });

    inMemoryProfiles = resolveProfilesWithDefaults(profiles);
    await setCache(PROFILES_CACHE_KEY, toSave);
    window.dispatchEvent(new CustomEvent("batch-profiles-updated", { detail: inMemoryProfiles }));
    const response = await axios.post(`${BASE_URL}/api/batches/profiles/update`, { profiles: toSave }, { withCredentials: true });
    if (response?.data?.data && Array.isArray(response.data.data)) {
      inMemoryProfiles = resolveProfilesWithDefaults(response.data.data);
      await setCache(PROFILES_CACHE_KEY, inMemoryProfiles);
      window.dispatchEvent(new CustomEvent("batch-profiles-updated", { detail: inMemoryProfiles }));
    }
    return true;
  } catch (err) {
    console.error("Error saving batch profiles:", err);
    return false;
  }
};

/**
 * @desc Upserts a single batch profile into the stored collection and syncs with backend
 * @param {Object} updatedProfile - Batch profile data to modify or insert
 * @returns {Promise<Array<Object>>} Updated list of all batch profiles
 */
export const updateSingleBatchProfile = async (updatedProfile) => {
  const current = getStoredBatchProfiles();
  const index = current.findIndex(
    (p) => (updatedProfile.id && p.id === updatedProfile.id) || p.label === updatedProfile.label
  );

  let updatedList;
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = { ...updatedList[index], ...updatedProfile };
  } else {
    updatedList = [...current, updatedProfile];
  }

  await saveStoredBatchProfiles(updatedList);
  return updatedList;
};

/**
 * @desc Deletes stored batch profiles from IndexedDB cache and resets in-memory store
 * @returns {Promise<Array>} Empty array on successful reset
 */
export const resetStoredBatchProfiles = async () => {
  try {
    await deleteCache(PROFILES_CACHE_KEY);
    inMemoryProfiles = [];
    window.dispatchEvent(
      new CustomEvent("batch-profiles-updated", { detail: [] })
    );
    return [];
  } catch (err) {
    console.error("Error resetting batch profiles:", err);
    return [];
  }
};
