import axios from "axios";
import { BASE_URL } from "@/config";
import { networkFirstFetch, registerCacheFetcher } from "@/utils/cache/networkFirst";
import { setCache, getCache } from "@/utils/cache/idbStorage";

export const DEFAULT_STATS = {
  Earnings: 0,
  Clients: 0,
  Projects: 0,
  Events: 0,
};

const STATS_CACHE_KEY = "tu_community_stats";
const LEGACY_STORAGE_KEY = "tu_community_stats";

// In-memory runtime cache for instantaneous synchronous initial render
let inMemoryStats = { ...DEFAULT_STATS };

// Pre-load from IndexedDB asynchronously on module load
if (typeof window !== "undefined") {
  getCache(STATS_CACHE_KEY).then((cached) => {
    if (cached && cached.data) {
      inMemoryStats = { ...DEFAULT_STATS, ...cached.data };
    }
  }).catch(() => {});
}

export const getStoredStats = () => {
  return { ...inMemoryStats };
};

export const fetchStats = async () => {
  const result = await networkFirstFetch({
    cacheKey: STATS_CACHE_KEY,
    legacyKey: LEGACY_STORAGE_KEY,
    fallbackDefault: DEFAULT_STATS,
    timeoutMs: 3500,
    fetcher: (signal) => axios.get(`${BASE_URL}/api/stats`, { signal }),
    transform: (data) => {
      if (!data) return DEFAULT_STATS;
      return {
        Earnings: Number(data.Earnings) || DEFAULT_STATS.Earnings,
        Clients: Number(data.Clients) || DEFAULT_STATS.Clients,
        Projects: Number(data.Projects) || DEFAULT_STATS.Projects,
        Events: Number(data.Events) || DEFAULT_STATS.Events,
      };
    },
  });

  if (result.data) {
    inMemoryStats = { ...result.data };
    window.dispatchEvent(new CustomEvent("stats-updated", { detail: result.data }));
  }

  return result.data;
};

// Register for global network retry button
if (typeof window !== "undefined") {
  registerCacheFetcher(STATS_CACHE_KEY, fetchStats);
}

export const saveStoredStats = async (newStats) => {
  const payload = {
    Earnings: Number(newStats.Earnings) || 0,
    Clients: Number(newStats.Clients) || 0,
    Projects: Number(newStats.Projects) || 0,
    Events: Number(newStats.Events) || 0,
  };

  let savedData = payload;

  // 1. Save to MongoDB database first
  try {
    const response = await axios.post(`${BASE_URL}/api/stats/update`, payload, { withCredentials: true });
    if (response.data && response.data.success && response.data.data) {
      savedData = {
        Earnings: Number(response.data.data.Earnings) ?? payload.Earnings,
        Clients: Number(response.data.data.Clients) ?? payload.Clients,
        Projects: Number(response.data.data.Projects) ?? payload.Projects,
        Events: Number(response.data.data.Events) ?? payload.Events,
      };
    }
  } catch (err) {
    console.warn("Backend save notice:", err?.message || err);
  }

  // 2. Update in-memory & IndexedDB cache, broadcast to app
  inMemoryStats = { ...savedData };
  await setCache(STATS_CACHE_KEY, savedData);
  window.dispatchEvent(new CustomEvent("stats-updated", { detail: savedData }));
  return savedData;
};

export const resetStoredStats = async () => {
  return await saveStoredStats(DEFAULT_STATS);
};
