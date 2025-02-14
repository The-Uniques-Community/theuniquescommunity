import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Loader from "@/utils/Loader";
import AdminRoutes from "@/routes/Admin/AdminRoutes";
import CommunityRoutes from "@/routes/Community/CommunityRoutes";
import CoordinatorRoutes from "@/routes/Uniques/CoordinatorRoute";
import MemberRoutes from "@/routes/Uniques/MemberRoutes";
import About from "@/views/Landing/About/index";
import HowItStarted from "@/views/Landing/HowItStarted/index";

const Landing = Loader(lazy(() => import("@/views/Landing")));

const LandingRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/howitstarted",
    element: <HowItStarted />,
  },
];

const router = createBrowserRouter([
  ...LandingRoutes,
  AdminRoutes,
  CommunityRoutes,
  CoordinatorRoutes,
  MemberRoutes,
]);

export default router;
