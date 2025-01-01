import { lazy } from "react";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";

const AdminLayout = Loader(lazy(() => import("@/layout/Admin")));
const AdminDashboard = Loader(lazy(() => import("@/views/Admin")));

const AdminRoutes = {
  path: "/admin",
  element: <ProtectedRoute isAllowed={true} element={<AdminLayout />} />,
  children: [
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
  ],
};

export default AdminRoutes;
