/**
 * @file communityBenefitsData.js
 * @description Data service for community benefit testimonials and cards, providing network-first caching, IndexedDB persistence, and backend synchronization.
 * @architecture Data provider utility in src/utils/community/ supplying benefit cards and leadership testimonials to the community showcase.
 * @agent_note Communicates with backend endpoints:
 *   - GET `${BASE_URL}/api/community-benefits` (handled by backend controller `getCommunityBenefits`)
 *   - POST `${BASE_URL}/api/community-benefits/update` (handled by backend controller `updateCommunityBenefits`, payload: `{ cards: Array<{ id, cardId, name, title, quote, avatar, customAvatar }> }`)
 * Caching strategy: Network-first via `networkFirstFetch` with IndexedDB key "tu_community_benefits_cards", legacy localStorage key "tu_community_benefits_cards", in-memory cache `inMemoryBenefits`, and DOM event "community-benefits-updated".
 */

import axios from "axios";
import { BASE_URL } from "@/config";
import communityOrganizerImg from "@/assets/img/Community/testimonials/community-organizer.webp";
import technicalLeadImg from "@/assets/img/Community/testimonials/technical-lead.webp";
import graphicsLeadImg from "@/assets/img/Community/testimonials/graphics-lead.webp";
import eventCoordinatorImg from "@/assets/img/Community/testimonials/event-coordinator.webp";
import socialMediaLeadImg from "@/assets/img/Community/testimonials/social-media-lead.webp";
import { networkFirstFetch, registerCacheFetcher } from "@/utils/cache/networkFirst";
import { setCache, getCache, deleteCache } from "@/utils/cache/idbStorage";

export const DEFAULT_BENEFITS_CARDS = [];

const BENEFITS_CACHE_KEY = "tu_community_benefits_cards";
const LEGACY_STORAGE_KEY = "tu_community_benefits_cards";

/**
 * @desc Sanitizes and normalizes community benefit card entries with default values
 * @param {Array<Object>} parsed - Raw card items from storage or server
 * @returns {Array<Object>} Cleaned benefit card objects
 */
const resolveBenefitsWithDefaults = (parsed) => {
  if (!Array.isArray(parsed) || parsed.length === 0) {
    return [];
  }
  return parsed.map((card, index) => ({
    id: card.id || index + 1,
    name: card.name || "",
    title: card.title || "",
    quote: card.quote || "",
    avatar: card.avatar || "",
    customAvatar: Boolean(card.customAvatar),
  }));
};

// In-memory runtime cache for synchronous initial renders
let inMemoryBenefits = [];

// Asynchronously hydrate from IndexedDB on startup
if (typeof window !== "undefined") {
  getCache(BENEFITS_CACHE_KEY).then((cached) => {
    if (cached && Array.isArray(cached.data)) {
      inMemoryBenefits = resolveBenefitsWithDefaults(cached.data);
    }
  }).catch(() => {});
}

/**
 * @desc Synchronously retrieves community benefit cards from in-memory cache
 * @returns {Array<Object>} Snapshot array of benefit cards
 */
export const getStoredBenefitsCards = () => {
  return [...inMemoryBenefits];
};

/**
 * @desc Fetches community benefit cards using network-first strategy and caches to IndexedDB
 * @api GET `${BASE_URL}/api/community-benefits` handled by backend `getCommunityBenefits` controller
 * @returns {Promise<Array<Object>>} Resolved array of benefit cards
 */
export const fetchBenefitsCards = async () => {
  const result = await networkFirstFetch({
    cacheKey: BENEFITS_CACHE_KEY,
    legacyKey: LEGACY_STORAGE_KEY,
    fallbackDefault: [],
    timeoutMs: 10000,
    fetcher: (signal) => axios.get(`${BASE_URL}/api/community-benefits`, { signal }),
    transform: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        return resolveBenefitsWithDefaults(data);
      }
      return [];
    },
  });

  if (result.data) {
    inMemoryBenefits = result.data;
    window.dispatchEvent(new CustomEvent("community-benefits-updated", { detail: result.data }));
  }

  return result.data || [];
};

// Register for global network retry button
if (typeof window !== "undefined") {
  registerCacheFetcher(BENEFITS_CACHE_KEY, fetchBenefitsCards);
}

/**
 * @desc Saves community benefit cards to IndexedDB cache and updates the MongoDB backend
 * @api POST `${BASE_URL}/api/community-benefits/update` handled by backend `updateCommunityBenefits` controller
 * @param {Array<Object>} cards - Benefit cards collection to persist
 * @returns {Promise<boolean>} True if update succeeded
 */
export const saveStoredBenefitsCards = async (cards) => {
  try {
    const toSave = cards.slice(0, 5).map((card, idx) => {
      const defaultCard = DEFAULT_BENEFITS_CARDS[idx] || {};
      const isCustom = Boolean(
        card.avatar &&
        typeof card.avatar === "string" &&
        (card.avatar.startsWith("data:") ||
          card.avatar.startsWith("http://") ||
          card.avatar.startsWith("https://") ||
          card.avatar.startsWith("blob:"))
      );

      return {
        id: card.id || defaultCard.id || idx + 1,
        cardId: card.id || defaultCard.id || idx + 1,
        name: card.name || defaultCard.name,
        title: card.title || defaultCard.title,
        quote: card.quote || defaultCard.quote,
        avatar: isCustom ? card.avatar : "",
        customAvatar: isCustom,
      };
    });

    inMemoryBenefits = resolveBenefitsWithDefaults(toSave);
    await setCache(BENEFITS_CACHE_KEY, toSave);
    window.dispatchEvent(
      new CustomEvent("community-benefits-updated", { detail: inMemoryBenefits })
    );
    await axios.post(`${BASE_URL}/api/community-benefits/update`, { cards: toSave }, { withCredentials: true });
    return true;
  } catch (err) {
    console.error("Error saving community benefits cards:", err);
    return false;
  }
};

/**
 * @desc Clears stored community benefit cards from IndexedDB cache and resets in-memory store
 * @returns {Promise<Array>} Empty array on successful reset
 */
export const resetStoredBenefitsCards = async () => {
  try {
    await deleteCache(BENEFITS_CACHE_KEY);
    inMemoryBenefits = [];
    window.dispatchEvent(
      new CustomEvent("community-benefits-updated", { detail: [] })
    );
    return [];
  } catch (err) {
    console.error("Error resetting community benefits cards:", err);
    return [];
  }
};
