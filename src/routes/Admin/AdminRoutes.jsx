import { lazy } from "react";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { element } from "prop-types";

const AdminLayout = Loader(lazy(() => import("@/layout/Admin")));
const AdminDashboard = Loader(lazy(() => import("@/views/Admin")));
const Member = Loader(lazy(() => import('@/views/Admin/Members')))
const Event = Loader(lazy(() => import('@/views/Admin/Events')))
const Account = Loader(lazy(() => import('@/views/Admin/Accounts')))

const AdminRoutes = {
  path: "/admin",
  element: <ProtectedRoute isAllowed={true} element={<AdminLayout />} />,
  children: [
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
    {
      path:"/admin/members-overview",
      element: <Member/>
    },
    {
      path: "/admin/events-overview",
      element: <Event/>
    },
    {
      path: "/admin/accounts",
      element: <Account/>
    }
  ],
};

export default AdminRoutes;
