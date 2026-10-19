/**
 * @file customMembersData.js
 * @deprecated This module is deprecated. All community members are now unified under
 * the canonical Member / User model and fetched directly from `/api/public/members`
 * and `/api/admin/member`.
 */

const STORAGE_KEY = "tu_community_custom_members";

// Automatically purge legacy local storage cache on load
try {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
} catch (e) {
  // Ignore localStorage access errors (e.g. private browsing restrictions)
}

export const DEFAULT_CUSTOM_MEMBERS = [];

export const getStoredCustomMembers = () => [];

export const fetchCustomMembers = async () => [];

export const saveStoredCustomMember = async () => null;

export const deleteStoredCustomMember = async () => false;

export const updateStoredCustomMember = async () => false;
