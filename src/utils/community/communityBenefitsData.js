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

export const getStoredBenefitsCards = () => {
  return [...inMemoryBenefits];
};

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
