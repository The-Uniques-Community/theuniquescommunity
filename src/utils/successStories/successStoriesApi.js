import axios from "axios";
import { BASE_URL } from "@/config";
import { successStories as initialStories } from "@/views/Landing/SuccessStories/successStoriesData";

const STORAGE_KEY = "tu_success_stories_cache";
const EVENT_NAME = "success-stories-updated";

/**
 * Restore default initial stories (including Ronit JaiPrakash) while preserving any custom stories
 */
export const restoreDefaultSuccessStories = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = raw ? JSON.parse(raw) : [];
    const currentList = Array.isArray(current) ? current : [];

    const existingIds = new Set(
      currentList.map((s) => s.id || s.storyId || s._id).filter(Boolean).map(String)
    );
    const existingNames = new Set(
      currentList.map((s) => s.name?.trim().toLowerCase()).filter(Boolean)
    );

    // Filter which initial stories are missing (like Ronit JaiPrakash)
    const missingInitial = initialStories.filter(
      (init) =>
        !existingIds.has(String(init.id)) &&
        !existingNames.has(init.name?.trim().toLowerCase())
    );

    const merged = [...missingInitial, ...currentList];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: merged }));
    return merged;
  } catch (err) {
    console.error("Error restoring default success stories:", err);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStories));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: initialStories }));
    return [...initialStories];
  }
};

/**
 * Get cached stories from localStorage or fallback to initial stories
 */
export const getStoredSuccessStories = () => {
  try {
    // One-time auto-recovery for Ronit JaiPrakash if accidentally deleted
    if (!localStorage.getItem("tu_ronit_recovered_v2")) {
      localStorage.setItem("tu_ronit_recovered_v2", "true");
      return restoreDefaultSuccessStories();
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStories));
      return [...initialStories];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return restoreDefaultSuccessStories();
  } catch (err) {
    console.error("Error reading stored success stories:", err);
    return [...initialStories];
  }
};

/**
 * Fetch all published success stories from backend API
 * @param {boolean} includeDrafts - If true, requests drafts as well (for coordinators)
 */
export const fetchSuccessStories = async (includeDrafts = false) => {
  try {
    const query = includeDrafts ? "?includeDrafts=true" : "";
    const response = await axios.get(`${BASE_URL}/api/success-stories${query}`);

    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      const fetchedStories = response.data.data;
      if (!includeDrafts && fetchedStories.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedStories));
      }
      window.dispatchEvent(
        new CustomEvent(EVENT_NAME, { detail: fetchedStories })
      );
      return fetchedStories;
    }
  } catch (err) {
    console.warn(
      "Could not fetch success stories from backend API, using cached data:",
      err?.response?.data?.message || err?.message || err
    );
  }
  return getStoredSuccessStories();
};

/**
 * Fetch a single success story by ID (or storyId / slug)
 */
export const fetchSuccessStoryById = async (studentId) => {
  if (!studentId) return null;
  try {
    const response = await axios.get(`${BASE_URL}/api/success-stories/${studentId}`);
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
  } catch (err) {
    console.warn(
      `Could not fetch story for ID ${studentId} from backend, looking up locally:`,
      err?.response?.data?.message || err?.message
    );
  }

  // Fallback to locally stored stories
  const localList = getStoredSuccessStories();
  return (
    localList.find(
      (s) => s.id === studentId || s.storyId === studentId || String(s._id) === String(studentId)
    ) || null
  );
};

/**
 * Create a new success story (Coordinator only)
 */
export const createSuccessStory = async (storyData) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers.token = token;
  }

  // Generate safe identifiers for client-side persistence
  const baseSlug = (storyData.name || "story")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const generatedId = `${baseSlug}-${Date.now().toString().slice(-4)}`;
  const finalId = storyData.id || storyData.storyId || generatedId;

  let savedStory = {
    ...storyData,
    id: finalId,
    storyId: finalId,
    _id: storyData._id || `story_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Attempt to store in MongoDB / backend API first
  try {
    const response = await axios.post(
      `${BASE_URL}/api/success-stories`,
      storyData,
      { headers, withCredentials: true }
    );
    if (response.data && response.data.success && response.data.data) {
      savedStory = response.data.data;
      if (!savedStory.id) {
        savedStory.id = savedStory.storyId || savedStory._id;
      }
    }
  } catch (apiErr) {
    console.warn(
      "Backend notice for success story creation (saved to local cache):",
      apiErr?.response?.data?.message || apiErr?.message || apiErr
    );
  }

  // 2. Always persist to localStorage cache & broadcast update across app
  const current = getStoredSuccessStories();
  const updated = [
    savedStory,
    ...current.filter(
      (s) =>
        s.id !== savedStory.id &&
        s.storyId !== savedStory.id &&
        String(s._id) !== String(savedStory._id)
    ),
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));

  return savedStory;
};

/**
 * Update an existing success story (Coordinator only)
 */
export const updateSuccessStory = async (storyId, updates) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers.token = token;
  }

  let updatedStory = {
    ...updates,
    id: storyId,
    storyId: updates.storyId || storyId,
    updatedAt: new Date().toISOString(),
  };

  // 1. Attempt to update in MongoDB / backend API first
  try {
    const response = await axios.put(
      `${BASE_URL}/api/success-stories/${storyId}`,
      updates,
      { headers, withCredentials: true }
    );
    if (response.data && response.data.success && response.data.data) {
      updatedStory = response.data.data;
      if (!updatedStory.id) {
        updatedStory.id = updatedStory.storyId || updatedStory._id;
      }
    }
  } catch (apiErr) {
    console.warn(
      "Backend notice for success story update (updated in local cache):",
      apiErr?.response?.data?.message || apiErr?.message || apiErr
    );
  }

  // 2. Always persist to localStorage cache & broadcast update
  const current = getStoredSuccessStories();
  const updated = current.map((s) =>
    s.id === storyId || s.storyId === storyId || String(s._id) === String(storyId)
      ? { ...s, ...updatedStory }
      : s
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));

  return updatedStory;
};

/**
 * Delete a success story (Coordinator only)
 */
export const deleteSuccessStory = async (storyOrId) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers.token = token;
  }

  const isObj = typeof storyOrId === "object" && storyOrId !== null;
  const targetId = isObj
    ? (storyOrId.id || storyOrId.storyId || storyOrId._id)
    : String(storyOrId || "");

  const idsToMatch = new Set();
  if (isObj) {
    if (storyOrId.id) idsToMatch.add(String(storyOrId.id));
    if (storyOrId.storyId) idsToMatch.add(String(storyOrId.storyId));
    if (storyOrId._id) idsToMatch.add(String(storyOrId._id));
  }
  if (targetId) idsToMatch.add(String(targetId));

  const targetName = isObj && storyOrId.name ? storyOrId.name.trim().toLowerCase() : "";

  // 1. Attempt deletion from MongoDB / backend API
  if (targetId) {
    try {
      await axios.delete(
        `${BASE_URL}/api/success-stories/${targetId}`,
        { headers, withCredentials: true }
      );
    } catch (apiErr) {
      console.warn(
        "Backend notice for success story deletion (deleted from local cache):",
        apiErr?.response?.data?.message || apiErr?.message || apiErr
      );
    }
  }

  // 2. Always persist to localStorage cache & broadcast update
  const current = getStoredSuccessStories();
  const updated = current.filter((s) => {
    const sId = s.id ? String(s.id) : "";
    const sStoryId = s.storyId ? String(s.storyId) : "";
    const sMongoId = s._id ? String(s._id) : "";
    const sName = s.name ? s.name.trim().toLowerCase() : "";

    const matchesId =
      (sId && idsToMatch.has(sId)) ||
      (sStoryId && idsToMatch.has(sStoryId)) ||
      (sMongoId && idsToMatch.has(sMongoId));

    const matchesName = targetName && sName === targetName;

    return !matchesId && !matchesName;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));

  return { success: true, message: "Deleted successfully", data: updated };
};

/**
 * Check if the currently logged-in user is a Coordinator
 */
export const checkIsCoordinator = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Quick decode token payload without verifying secret on client
    const base64Url = token.split(".")[1];
    if (base64Url) {
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const parsed = JSON.parse(jsonPayload);
      const role = (parsed.role || "").toLowerCase();
      if (role === "coordinator" || role === "admin") {
        return true;
      }
    }
  } catch (e) {
    // continue to server check
  }

  try {
    const res = await axios.get(`${BASE_URL}/auth/verify_role?role=coordinator`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, token },
    });
    return res.status === 200;
  } catch (err) {
    return false;
  }
};
