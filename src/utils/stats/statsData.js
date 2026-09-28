export const DEFAULT_STATS = {
  Earnings: 860000,
  Clients: 100,
  Projects: 150,
  Events: 40,
};

const STATS_STORAGE_KEY = "tu_community_stats";

export const getStoredStats = () => {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(DEFAULT_STATS));
      return { ...DEFAULT_STATS };
    }
    const parsed = JSON.parse(raw);
    return {
      Earnings: Number(parsed.Earnings) || DEFAULT_STATS.Earnings,
      Clients: Number(parsed.Clients) || DEFAULT_STATS.Clients,
      Projects: Number(parsed.Projects) || DEFAULT_STATS.Projects,
      Events: Number(parsed.Events) || DEFAULT_STATS.Events,
    };
  } catch (err) {
    console.error("Error reading stored stats:", err);
    return { ...DEFAULT_STATS };
  }
};

export const saveStoredStats = (newStats) => {
  const updated = {
    Earnings: Number(newStats.Earnings) || 0,
    Clients: Number(newStats.Clients) || 0,
    Projects: Number(newStats.Projects) || 0,
    Events: Number(newStats.Events) || 0,
  };
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("stats-updated", { detail: updated }));
  } catch (err) {
    console.error("Error saving stats:", err);
  }
  return updated;
};

export const resetStoredStats = () => {
  return saveStoredStats(DEFAULT_STATS);
};
