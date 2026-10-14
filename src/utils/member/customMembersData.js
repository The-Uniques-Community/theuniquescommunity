import axios from "axios";
import { BASE_URL } from "@/config";

const STORAGE_KEY = "tu_community_custom_members";

export const DEFAULT_CUSTOM_MEMBERS = [
 
];

export const getStoredCustomMembers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CUSTOM_MEMBERS));
      return [...DEFAULT_CUSTOM_MEMBERS];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const normalized = parsed
        .filter((m) => m && typeof m === "object")
        .map((m) => {
          const b = (m.batch || "").toLowerCase();
          if (b.includes("1.0") || b.includes("2.0") || b.includes("3.0")) {
            return { ...m, profileStatus: "inactive" };
          }
          if ((b.includes("4.0") || b.includes("5.0")) && !m.isSuspended && m.profileStatus !== "blocked") {
            return { ...m, profileStatus: "active" };
          }
          return m;
        });
      return normalized;
    }
    return [...DEFAULT_CUSTOM_MEMBERS];
  } catch (err) {
    console.error("Error reading stored custom members:", err);
    return [...DEFAULT_CUSTOM_MEMBERS];
  }
};

export const fetchCustomMembers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/custom-members`);
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      const members = response.data.data
        .filter((m) => m && typeof m === "object")
        .map((m) => {
          const b = (m.batch || "").toLowerCase();
          if (b.includes("1.0") || b.includes("2.0") || b.includes("3.0")) {
            return { ...m, profileStatus: "inactive" };
          }
          if ((b.includes("4.0") || b.includes("5.0")) && !m.isSuspended && m.profileStatus !== "blocked") {
            return { ...m, profileStatus: "active" };
          }
          return m;
        });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
      window.dispatchEvent(new CustomEvent("custom-members-updated", { detail: members }));
      return members;
    }
  } catch (err) {
    console.warn("Could not fetch custom members from backend:", err?.message || err);
  }
  return getStoredCustomMembers();
};

export const saveStoredCustomMember = async (memberData) => {
  try {
    const current = getStoredCustomMembers();
    const isLegacy = /1\.0|2\.0|3\.0/.test(memberData.batch || "");
    const initialStatus = isLegacy ? "inactive" : "active";

    const newMemberPayload = {
      _id: memberData._id || `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      fullName: memberData.fullName || "Member",
      email: memberData.email || "",
      admno: memberData.admno || "",
      batch: memberData.batch || "The Uniques 5.0",
      course: memberData.course || "B.Tech CSE",
      profileStatus: memberData.isSuspended ? "inactive" : (memberData.profileStatus || initialStatus),
      isSuspended: Boolean(memberData.isSuspended),
      bio: memberData.bio || "Member of The Uniques Community.",
      skills: Array.isArray(memberData.skills) ? memberData.skills : ["Developer"],
      projects: Array.isArray(memberData.projects) ? memberData.projects : [],
      achievements: Array.isArray(memberData.achievements) ? memberData.achievements : [],
      certifications: Array.isArray(memberData.certifications) ? memberData.certifications : [],
      createdAt: new Date().toISOString(),
    };

    let savedMember = newMemberPayload;
    // 1. Store in MongoDB first
    try {
      const response = await axios.post(`${BASE_URL}/api/custom-members/add`, newMemberPayload);
      if (response.data && response.data.success && response.data.data) {
        savedMember = response.data.data;
      }
    } catch (apiErr) {
      console.warn("Backend MongoDB notice for custom member add:", apiErr?.message || apiErr);
    }

    // 2. After MongoDB operation, update local cache and broadcast to main webpage
    const updated = [savedMember, ...current.filter((m) => m._id !== savedMember._id && m.admno !== savedMember.admno)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("custom-members-updated", { detail: updated }));
    window.dispatchEvent(new CustomEvent("members-updated", { detail: updated }));

    return savedMember;
  } catch (err) {
    console.error("Error saving custom member:", err);
    return null;
  }
};

export const deleteStoredCustomMember = async (id) => {
  try {
    // 1. Delete from MongoDB first
    try {
      await axios.delete(`${BASE_URL}/api/custom-members/${id}`);
    } catch (apiErr) {
      console.warn("Backend MongoDB notice for custom member delete:", apiErr?.message || apiErr);
    }

    // 2. After MongoDB operation, update local storage and broadcast to main webpage
    const current = getStoredCustomMembers();
    const updated = current.filter((m) => m._id !== id && m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("custom-members-updated", { detail: updated }));
    window.dispatchEvent(new CustomEvent("members-updated", { detail: updated }));
    return true;
  } catch (err) {
    console.error("Error deleting custom member:", err);
    return false;
  }
};

export const updateStoredCustomMember = async (id, fields) => {
  try {
    // 1. Update in MongoDB first
    let updatedRecord = null;
    try {
      const response = await axios.put(`${BASE_URL}/api/custom-members/${id}`, fields);
      if (response.data && response.data.success && response.data.data) {
        updatedRecord = response.data.data;
      }
    } catch (apiErr) {
      console.warn("Backend MongoDB notice for custom member update:", apiErr?.message || apiErr);
    }

    // 2. After MongoDB operation, update local storage and broadcast to main webpage
    const current = getStoredCustomMembers();
    const updated = current.map((m) => (m._id === id || m.id === id ? (updatedRecord || { ...m, ...fields }) : m));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("custom-members-updated", { detail: updated }));
    window.dispatchEvent(new CustomEvent("members-updated", { detail: updated }));
    return true;
  } catch (err) {
    console.error("Error updating custom member:", err);
    return false;
  }
};
