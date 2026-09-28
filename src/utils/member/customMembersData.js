const STORAGE_KEY = "tu_community_custom_members";

export const DEFAULT_CUSTOM_MEMBERS = [
  {
    _id: "custom-member-deo",
    fullName: "Deo",
    email: "deo@theuniques.org",
    admno: "2024BTCS501",
    batch: "The Uniques 5.0",
    course: "B.Tech CSE",
    profileStatus: "active",
    isSuspended: false,
    bio: "Passionate developer and innovator in The Uniques 5.0 batch.",
    skills: ["JavaScript", "Python", "Web Development", "DSA"],
    createdAt: new Date().toISOString(),
  },
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
      // Ensure Deo is present if user added deo
      const hasDeo = parsed.some(
        (m) =>
          m.fullName?.toLowerCase().includes("deo") ||
          m.batch === "The Uniques 5.0" ||
          m.batch === "Uniques 5.0"
      );
      if (!hasDeo) {
        parsed.unshift(DEFAULT_CUSTOM_MEMBERS[0]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
    return [...DEFAULT_CUSTOM_MEMBERS];
  } catch (err) {
    console.error("Error reading stored custom members:", err);
    return [...DEFAULT_CUSTOM_MEMBERS];
  }
};

export const saveStoredCustomMember = (memberData) => {
  try {
    const current = getStoredCustomMembers();
    const newMember = {
      _id: memberData._id || `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      fullName: memberData.fullName || "Member",
      email: memberData.email || "",
      admno: memberData.admno || "",
      batch: memberData.batch || "The Uniques 5.0",
      course: memberData.course || "B.Tech CSE",
      profileStatus: memberData.profileStatus || (memberData.isSuspended ? "inactive" : "active"),
      isSuspended: Boolean(memberData.isSuspended),
      bio: memberData.bio || "Member of The Uniques Community.",
      skills: Array.isArray(memberData.skills) ? memberData.skills : ["Developer"],
      projects: Array.isArray(memberData.projects) ? memberData.projects : [],
      achievements: Array.isArray(memberData.achievements) ? memberData.achievements : [],
      certifications: Array.isArray(memberData.certifications) ? memberData.certifications : [],
      createdAt: new Date().toISOString(),
    };

    // Prepend so newly added members appear first
    const updated = [newMember, ...current.filter((m) => m._id !== newMember._id && m.admno !== newMember.admno)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("custom-members-updated", { detail: updated }));
    return newMember;
  } catch (err) {
    console.error("Error saving custom member:", err);
    return null;
  }
};

export const deleteStoredCustomMember = (id) => {
  try {
    const current = getStoredCustomMembers();
    const updated = current.filter((m) => m._id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("custom-members-updated", { detail: updated }));
    return true;
  } catch (err) {
    console.error("Error deleting custom member:", err);
    return false;
  }
};

export const updateStoredCustomMember = (id, fields) => {
  try {
    const current = getStoredCustomMembers();
    const updated = current.map((m) => (m._id === id ? { ...m, ...fields } : m));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("custom-members-updated", { detail: updated }));
    return true;
  } catch (err) {
    console.error("Error updating custom member:", err);
    return false;
  }
};
