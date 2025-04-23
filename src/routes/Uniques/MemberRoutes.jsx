import { lazy } from "react";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { element } from "prop-types";

const MemberLayout = Loader(lazy(() => import("@/layout/Uniques/Member")));
const MemberDashboard = Loader(lazy(() => import("@/views/Uniques/Member")));
const CreateBlog = Loader(lazy(() => import("@/views/Uniques/Member/Blog")));
const MemberRoutes = {
  path: "/member",
  element: <ProtectedRoute role={'member'} element={<MemberLayout />} />,
  children: [
    {
      path: "/member",
      element: <MemberDashboard />,
    },
    {
      path:"/member/createBlog",
      element: <CreateBlog/>,
    }
  ],
};

export default MemberRoutes;
