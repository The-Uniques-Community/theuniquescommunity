/**
 * @file OfflineCacheBanner.jsx
 * Floating pill banner indicating when content is served from cache due to network failure.
 */

import { useState } from "react";
import { useCacheStatus } from "@/context/CacheContext";
import { WifiOff, RefreshCw, X, AlertTriangle } from "lucide-react";

export const OfflineCacheBanner = () => {
  const { isOnline, cachedEntities, hasCachedData, retryAll } = useCacheStatus();
  const [isDismissed, setIsDismissed] = useState(false);
  const [retrying, setRetrying] = useState(false);

  // If user is completely online and no entity is served from cache, don't show
  if ((isOnline && !hasCachedData) || isDismissed) {
    return null;
  }

  // Get most recent timestamp among cached entities
  const timestamps = Object.values(cachedEntities)
    .map((e) => e.timestamp)
    .filter(Boolean);
  const latestTimestamp = timestamps.length > 0 ? Math.max(...timestamps) : null;

  const formatTimestamp = (ts) => {
    if (!ts) return "saved snapshot";
    const diffSec = Math.floor((Date.now() - ts) / 1000);
    if (diffSec < 60) return "just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleRetry = async () => {
    setRetrying(true);
    retryAll();
    setTimeout(() => {
      setRetrying(false);
    }, 1200);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-lg w-[92%] sm:w-auto"
    >
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-neutral-900/90 text-white backdrop-blur-md border border-neutral-700/60 shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
          {!isOnline ? <WifiOff size={15} /> : <AlertTriangle size={15} />}
        </div>

        <div className="text-xs sm:text-sm font-medium leading-tight flex-1">
          <span className="font-semibold text-amber-300">
            {!isOnline ? "Offline Mode" : "Network Unreachable"}
          </span>
          <span className="text-neutral-300 ml-1.5 hidden sm:inline">
            • Displaying cache ({formatTimestamp(latestTimestamp)})
          </span>
        </div>

        <button
          onClick={handleRetry}
          disabled={retrying}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-neutral-200 hover:text-white border border-neutral-700 transition"
          title="Retry fetching latest data"
        >
          <RefreshCw size={12} className={retrying ? "animate-spin text-amber-400" : ""} />
          <span>{retrying ? "Syncing..." : "Retry"}</span>
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-neutral-400 hover:text-neutral-200 p-1 -mr-1 rounded-full transition"
          aria-label="Dismiss offline banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default OfflineCacheBanner;
