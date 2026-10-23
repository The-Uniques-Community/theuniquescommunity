/**
 * @file CacheContext.jsx
 * Context to monitor network status and cached entity states.
 * Provides resilient online/offline state tracking with reconnect notifications.
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { subscribeCacheStatus } from "@/utils/cache/networkFirst";

const CacheContext = createContext({
  isOnline: true,
  justReconnected: false,
  cachedEntities: {},
  hasCachedData: false,
  refreshTimestamp: null,
  retryAll: () => {},
});

export const CacheProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine !== false : true
  );
  const [justReconnected, setJustReconnected] = useState(false);
  const [cachedEntities, setCachedEntities] = useState({});
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());

  // Listen for browser online / offline transitions
  useEffect(() => {
    let reconnectTimer = null;

    const handleOnline = () => {
      setIsOnline(true);
      setJustReconnected(true);
      setRefreshTimestamp(Date.now());

      // Trigger automatic background revalidation when back online
      window.dispatchEvent(new CustomEvent("tu-cache-retry-all"));

      // Auto-dismiss the "Back Online" notification after 3.5 seconds
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => {
        setJustReconnected(false);
      }, 3500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setJustReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Listen to networkFirst/SWR events
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
          // Fresh network response arrived: clear cached status for this entity
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
    justReconnected,
    cachedEntities,
    hasCachedData,
    refreshTimestamp,
    retryAll,
  }), [isOnline, justReconnected, cachedEntities, hasCachedData, refreshTimestamp, retryAll]);

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
