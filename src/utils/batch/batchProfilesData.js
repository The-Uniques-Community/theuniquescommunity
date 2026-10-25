import axios from "axios";
import { BASE_URL } from "@/config";
import uniques1 from "@/assets/img/About/uniques1.webp";
import uniques2 from "@/assets/img/About/uniques2.webp";
import uniques3 from "@/assets/img/About/uniques3.webp";
import uniques4 from "@/assets/img/About/uniques4.webp";
import { getStoredBatches } from "./batchesData";
import { networkFirstFetch, registerCacheFetcher } from "@/utils/cache/networkFirst";
import { setCache, getCache, deleteCache } from "@/utils/cache/idbStorage";

export const DEFAULT_BATCH_PROFILES = [];

const PROFILES_CACHE_KEY = "tu_community_batch_profiles";
const LEGACY_STORAGE_KEY = "tu_community_batch_profiles";

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

const resolveProfilesWithDefaults = (rawList) => {
  let profiles = [];
  if (Array.isArray(rawList) && rawList.length > 0) {
    profiles = rawList.map((p) => {
      return {
        ...p,
        image: p.image || uniques4,
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
        image: uniques4,
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

export const getStoredBatchProfiles = () => {
  return [...inMemoryProfiles];
};

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
