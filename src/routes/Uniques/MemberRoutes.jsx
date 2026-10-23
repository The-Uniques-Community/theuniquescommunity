import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

const MemberLayout = Loader(lazyWithRetry(() => import("@/layout/Uniques/Member")));
const MemberDashboard = Loader(lazyWithRetry(() => import("@/views/Uniques/Member")));
const CreateBlog = Loader(lazyWithRetry(() => import("@/views/Uniques/Member/Blog")));

const MemberRoutes = {
  path: "/member",
  element: <ProtectedRoute role={'member'} element={<MemberLayout />} />,
  errorElement: <RouteErrorBoundaryView />,
  children: [
    {
      path: "/member",
      element: <MemberDashboard />,
    },
    {
      path: "/member/createBlog",
      element: <CreateBlog/>,
    }
  ],
};

export default MemberRoutes;
