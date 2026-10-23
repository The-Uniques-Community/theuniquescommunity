import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

const CommunityLayout = Loader(lazyWithRetry(() => import("@/layout/Community")));
const CommunityDashboard = Loader(lazyWithRetry(() => import("@/views/Community")));

const CommunityRoutes = {
  path: "/community",
  element: <ProtectedRoute role={'communityadmin'} element={<CommunityLayout />} />,
  errorElement: <RouteErrorBoundaryView />,
  children: [
    {
      path: "/community",
      element: <CommunityDashboard />,
    },
  ],
};

export default CommunityRoutes;
