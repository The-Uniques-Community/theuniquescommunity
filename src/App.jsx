import router from "@/routes";
import { RouterProvider } from "react-router-dom";
import GridBackground from "./utils/GridBackground.jsx/GridBackground";
import { CacheProvider } from "@/context/CacheContext";
import OfflineCacheBanner from "@/components/OfflineCacheBanner";

const App = () => {
  return (
    <CacheProvider>
      <div className="relative overflow-x-clip">
        {/* Floating offline / cached data banner */}
        <OfflineCacheBanner />

        {/* Global grid hover effect */}
        <GridBackground />

        {/* Main app content */}
        <div className="relative z-10">
          <RouterProvider router={router} />
        </div>
      </div>
    </CacheProvider>
  );
};

export default App;
