import router from "@/routes";
import { RouterProvider } from "react-router-dom";
import GridBackground from "./utils/GridBackground.jsx/GridBackground";
import { CacheProvider } from "@/context/CacheContext";
import OfflineCacheBanner from "@/components/OfflineCacheBanner";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

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
