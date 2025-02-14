import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Loader from "@/utils/Loader";
import AdminRoutes from "@/routes/Admin/AdminRoutes";
import CommunityRoutes from "@/routes/Community/CommunityRoutes";
import CoordinatorRoutes from "@/routes/Uniques/CoordinatorRoute";
import MemberRoutes from "@/routes/Uniques/MemberRoutes";
import LandingLayout from "@/layout/Landing/index";

const Landing = Loader(lazy(() => import("@/views/Landing/index")));

const LandingRoutes = {
  path: "/",
  element: <LandingLayout />, // Wrap all pages inside LandingLayout
  children: [
    { index: true, element: <Landing /> }, // Default route ("/")
    { path: "about", element: <div>About</div> },
    { path: "contact", element: <div>Contact</div> },
    { path: "events", element: <div>Events</div> },
    { path: "blog", element: <div>Blog</div> },
    { path: "community-page", element: <div>Community Page</div> },
    { path: "training", element: <div>Training</div> },
    { path: "login", element: <div>Login</div> },
    { path: "batches", element: <div>Batches</div> },
  ],
};

const router = createBrowserRouter([
  LandingRoutes,  // ✅ Fix: Use object directly, no spread operator
  AdminRoutes,
  CommunityRoutes,
  CoordinatorRoutes,
  MemberRoutes,
]);

export default router;
