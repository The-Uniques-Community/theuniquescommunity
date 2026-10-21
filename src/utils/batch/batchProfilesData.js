import axios from "axios";
import { BASE_URL } from "@/config";
import uniques1 from "@/assets/img/About/uniques1.webp";
import uniques2 from "@/assets/img/About/uniques2.webp";
import uniques3 from "@/assets/img/About/uniques3.webp";
import uniques4 from "@/assets/img/About/uniques4.webp";
import { getStoredBatches } from "./batchesData";
import { networkFirstFetch, registerCacheFetcher } from "@/utils/cache/networkFirst";
import { setCache, getCache, deleteCache } from "@/utils/cache/idbStorage";

export const DEFAULT_BATCH_PROFILES = [
  {
    id: "uniques-1.0",
    label: "Uniques 1.0",
    title: "The Uniques Batch 1.0",
    description:
      "The Uniques 1.0 batch is the pioneering group within The Uniques Community. These senior members have successfully completed their journey and are now placed in various esteemed organizations.\n\nThey have contributed immensely to the growth of the community and continue to mentor and inspire the upcoming batches.\n\nWith a strong foundation of innovation and leadership, Batch 1.0 has set high standards for excellence, paving the way for future cohorts to follow in their footsteps.",
    image: uniques1,
  },
  {
    id: "uniques-2.0",
    label: "Uniques 2.0",
    title: "The Uniques Batch 2.0",
    description:
      "The Uniques 2.0 batch consists of highly driven junior members who are actively enhancing their skills in modern technologies.\n\nWith a focus on collaboration and hands-on learning, they engage in real-world projects and hackathons, ensuring they are industry-ready.\n\nBatch 2.0 members benefit from mentorship programs, networking opportunities, and workshops to sharpen their expertise. They are on the path to becoming future innovators, following the footsteps of their predecessors while bringing fresh perspectives to the community.",
    image: uniques2,
  },
  {
    id: "uniques-3.0",
    label: "Uniques 3.0",
    title: "The Uniques Batch 3.0",
    description:
      "The latest addition to The Uniques Community, Batch 3.0, is a dynamic and ambitious group of individuals passionate about pushing boundaries.\n\nAs they embark on their journey, they are exposed to cutting-edge technologies, problem-solving challenges, and research-driven initiatives.\n\nWith an eagerness to learn and innovate, Batch 3.0 aims to make a lasting impact, bringing new ideas and energy to the community. They are being nurtured to be future leaders and trailblazers in their respective fields.",
    image: uniques3,
  },
  {
    id: "uniques-4.0",
    label: "Uniques 4.0",
    title: "The Uniques Batch 4.0",
    description:
      "The Uniques 4.0 batch is the newest cohort carrying forward the legacy of innovation. They are actively engaged in advanced skills training across Python, Full-Stack Development, DSA, and Salesforce CRM modules.\n\nFocused on real-world implementation, Batch 4.0 is collaborating with community mentors on modern engineering challenges to prepare for elite placements.",
    image: uniques4,
  },
];

const PROFILES_CACHE_KEY = "tu_community_batch_profiles";
const LEGACY_STORAGE_KEY = "tu_community_batch_profiles";

const resolveProfilesWithDefaults = (rawList) => {
  let profiles = [];
  if (Array.isArray(rawList) && rawList.length > 0) {
    profiles = rawList.map((p) => {
      const defaultMatch = DEFAULT_BATCH_PROFILES.find((d) => d.label === p.label || d.id === p.id);
      return {
        ...p,
        image: p.customImage ? p.image : (defaultMatch ? defaultMatch.image : (p.image || uniques4)),
      };
    });
  }

  if (profiles.length === 0) {
    profiles = [...DEFAULT_BATCH_PROFILES];
  }

  const memberBatches = getStoredBatches();
  memberBatches.forEach((batchName) => {
    const label = batchName.replace(/^The\s+/i, "");
    const exists = profiles.some(
      (p) => p.label.toLowerCase() === label.toLowerCase() || p.title.toLowerCase() === batchName.toLowerCase()
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

  return profiles;
};

// In-memory runtime cache for synchronous UI reads
let inMemoryProfiles = resolveProfilesWithDefaults(DEFAULT_BATCH_PROFILES);

// Asynchronously hydrate from IndexedDB on startup
if (typeof window !== "undefined") {
  getCache(PROFILES_CACHE_KEY).then((cached) => {
    if (cached && Array.isArray(cached.data)) {
      inMemoryProfiles = resolveProfilesWithDefaults(cached.data);
    }
  }).catch(() => {});
}

export const getStoredBatchProfiles = () => {
  return [...inMemoryProfiles];
};

export const fetchBatchProfiles = async () => {
  const result = await networkFirstFetch({
    cacheKey: PROFILES_CACHE_KEY,
    legacyKey: LEGACY_STORAGE_KEY,
    fallbackDefault: resolveProfilesWithDefaults(DEFAULT_BATCH_PROFILES),
    timeoutMs: 3500,
    fetcher: (signal) => axios.get(`${BASE_URL}/api/batches/profiles`, { signal }),
    transform: (data) => {
      if (Array.isArray(data)) {
        return resolveProfilesWithDefaults(data);
      }
      return resolveProfilesWithDefaults(DEFAULT_BATCH_PROFILES);
    },
  });

  if (result.data) {
    inMemoryProfiles = result.data;
    window.dispatchEvent(new CustomEvent("batch-profiles-updated", { detail: result.data }));
  }

  return result.data;
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
        (p.image.startsWith("data:") || p.image.startsWith("http://") || p.image.startsWith("https://") || p.image.startsWith("blob:"))
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
    await axios.post(`${BASE_URL}/api/batches/profiles/update`, { profiles: toSave }, { withCredentials: true });
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
    inMemoryProfiles = resolveProfilesWithDefaults(DEFAULT_BATCH_PROFILES);
    window.dispatchEvent(
      new CustomEvent("batch-profiles-updated", { detail: DEFAULT_BATCH_PROFILES })
    );
    return DEFAULT_BATCH_PROFILES;
  } catch (err) {
    console.error("Error resetting batch profiles:", err);
    return DEFAULT_BATCH_PROFILES;
  }
};
