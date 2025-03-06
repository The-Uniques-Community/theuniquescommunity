import { lazy } from "react";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";

const CoordinatorLayout = Loader(lazy(() => import("@/layout/Uniques/Coordinator")));
const CoordinatorDashboard = Loader(lazy(() => import("@/views/Uniques/Coordinator")));

const CoordinatorRoute = {
  path: "/coordinator",
  element: <ProtectedRoute role={'coordinator'} element={<CoordinatorLayout />} />,
  children: [
    {
      path: "/coordinator",
      element: <CoordinatorDashboard />,
    },
  ],
};

export default CoordinatorRoute;
