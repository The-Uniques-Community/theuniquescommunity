/**
 * @file App.jsx
 * @description Main application root component for The Uniques Community.
 * @architecture Hosts top-level layout infrastructure, wrapping the client with error boundary resilience (`RouteErrorBoundary`),
 * offline cache alerts (`CacheProvider`, `OfflineCacheBanner`), interactive grid background canvas (`GridBackground`),
 * and mounts the dynamic client-side router (`RouterProvider` with `@/routes`).
 * @agent_note Acts as the parent container for all routed landing views and subpages. Note that `CacheProvider` is scoped
 * around `OfflineCacheBanner` to isolate offline data availability notifications without forcing unnecessary app-wide re-renders.
 */

import router from "@/routes";
import { RouterProvider } from "react-router-dom";
import GridBackground from "./utils/GridBackground.jsx/GridBackground";
import { CacheProvider } from "@/context/CacheContext";
import OfflineCacheBanner from "@/components/OfflineCacheBanner";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

/**
 * @component App
 * @description Master shell component mounting routing, background effects, and offline caching banners.
 * @returns {JSX.Element} The rendered root React application tree.
 * @state None directly; delegates routing state to `RouterProvider` and cache state to `CacheProvider`.
 * @api None directly; routing delegates to child page loaders and API endpoints.
 */
const App = () => {
  return (
    <RouteErrorBoundary>
      <div className="relative overflow-x-clip">
        {/* Floating offline / cached data banner isolated with its own provider */}
        <CacheProvider>
          <OfflineCacheBanner />
        </CacheProvider>

        {/* Global grid hover effect */}
        <GridBackground />

        {/* Main app content */}
        <div className="relative z-10">
          <RouterProvider router={router} />
        </div>
      </div>
    </RouteErrorBoundary>
  );
};

export default App;

