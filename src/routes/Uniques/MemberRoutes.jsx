import { lazy } from "react";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";

const MemberLayout = Loader(lazy(() => import("@/layout/Uniques/Member")));
const MemberDashboard = Loader(lazy(() => import("@/views/Uniques/Member")));

const MemberRoutes = {
  path: "/member",
  element: <ProtectedRoute isAllowed={true} element={<MemberLayout />} />,
  children: [
    {
      path: "/member",
      element: <MemberDashboard />,
    },
  ],
};

export default MemberRoutes;
