/**
 * @file OfflineCacheBanner.jsx
 * Floating pill banner indicating when the client is genuinely offline or has just reconnected.
 *
 * Design Rule:
 * Never displays "No Internet" or "Network Unreachable" when the user has working internet.
 * Content served from local IndexedDB cache is considered high-speed SWR performance, not an error.
 */

import { useState } from "react";
import { useCacheStatus } from "@/context/CacheContext";
import { WifiOff, RefreshCw, X, CheckCircle2 } from "lucide-react";

export const OfflineCacheBanner = () => {
  const { isOnline, justReconnected, cachedEntities, retryAll } = useCacheStatus();
  const [isDismissed, setIsDismissed] = useState(false);
  const [retrying, setRetrying] = useState(false);

  // If user is online and didn't just reconnect, NEVER render any banner.
  if ((isOnline && !justReconnected) || isDismissed) {
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

  // State 1: Just reconnected back online -> Brief green success notification
  if (justReconnected) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-lg w-[92%] sm:w-auto animate-in fade-in slide-in-from-top-2 duration-300"
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/95 text-white backdrop-blur-md border border-emerald-500/40 shadow-2xl">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
            <CheckCircle2 size={15} />
          </div>
          <div className="text-xs sm:text-sm font-medium">
            <span className="font-semibold text-emerald-400">Back Online</span>
            <span className="text-neutral-300 ml-1.5 hidden sm:inline">
              • Syncing latest updates
            </span>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Offline Mode -> Amber alert notification with retry and dismiss
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-lg w-[92%] sm:w-auto animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-neutral-900/90 text-white backdrop-blur-md border border-neutral-700/60 shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
          <WifiOff size={15} />
        </div>

        <div className="text-xs sm:text-sm font-medium leading-tight flex-1">
          <span className="font-semibold text-amber-300">Offline Mode</span>
          <span className="text-neutral-300 ml-1.5 hidden sm:inline">
            • Displaying saved cache ({formatTimestamp(latestTimestamp)})
          </span>
        </div>

        <button
          onClick={handleRetry}
          disabled={retrying}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-neutral-200 hover:text-white border border-neutral-700 transition"
          title="Retry network connection"
        >
          <RefreshCw size={12} className={retrying ? "animate-spin text-amber-400" : ""} />
          <span>{retrying ? "Checking..." : "Retry"}</span>
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
