/**
 * @file CacheContext.jsx
 * Context to monitor network status and cached entity states.
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { subscribeCacheStatus } from "@/utils/cache/networkFirst";

const CacheContext = createContext({
  isOnline: true,
  cachedEntities: {},
  hasCachedData: false,
  refreshTimestamp: null,
  retryAll: () => {},
});

export const CacheProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [cachedEntities, setCachedEntities] = useState({});
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());

  // Listen for browser online / offline transitions
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Trigger refresh when back online
      setRefreshTimestamp(Date.now());
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Listen to networkFirst events
  useEffect(() => {
    const unsubscribe = subscribeCacheStatus((detail) => {
      if (!detail || !detail.cacheKey) return;

      setCachedEntities((prev) => {
        if (detail.isFromCache) {
          // If already in cache with identical timestamp, avoid re-render
          if (prev[detail.cacheKey]?.timestamp === detail.timestamp) {
            return prev;
          }
          return {
            ...prev,
            [detail.cacheKey]: {
              timestamp: detail.timestamp,
              isDefault: Boolean(detail.isDefault),
              error: detail.error,
            },
          };
        } else {
          // If key wasn't in cachedEntities, avoid creating new object reference
          if (!prev[detail.cacheKey]) {
            return prev;
          }
          const next = { ...prev };
          delete next[detail.cacheKey];
          return next;
        }
      });
    });

    return unsubscribe;
  }, []);

  const retryAll = useCallback(() => {
    setRefreshTimestamp(Date.now());
    window.dispatchEvent(new CustomEvent("tu-cache-retry-all"));
  }, []);

  const hasCachedData = useMemo(() => {
    return Object.keys(cachedEntities).length > 0;
  }, [cachedEntities]);

  const contextValue = useMemo(() => ({
    isOnline,
    cachedEntities,
    hasCachedData,
    refreshTimestamp,
    retryAll,
  }), [isOnline, cachedEntities, hasCachedData, refreshTimestamp, retryAll]);

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};

CacheProvider.propTypes = {
  children: PropTypes.node,
};

export const useCacheStatus = () => useContext(CacheContext);
