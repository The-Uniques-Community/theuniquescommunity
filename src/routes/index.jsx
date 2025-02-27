import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Loader from "@/utils/Loader";
import AdminRoutes from "@/routes/Admin/AdminRoutes";
import CommunityRoutes from "@/routes/Community/CommunityRoutes";
import CoordinatorRoutes from "@/routes/Uniques/CoordinatorRoute";
import MemberRoutes from "@/routes/Uniques/MemberRoutes";
import LandingLayout from "@/layout/Landing/index";
import Auth from "@/routes/Authentication/Auth";
import About from "@/views/Landing/About/index"
import HowItStarted from "@/views/Landing/HowItStarted/index"

import Event from "@/views/Landing/Event/Index"


const Landing = Loader(lazy(() => import("@/views/Landing/index")));
// const MemberLogin = Loader(lazy(() => import("@/views/Landing/MemberLogin/index")));
// const MemberRegister = Loader(lazy(() => import("@/views/Landing/MemberRegister/index")));


const BlogPage = Loader(lazy(() => import("@/views/Landing/Blog/index")));
const Contact = Loader(lazy(() => import("@/views/Landing/Contact/index")));
const LandingRoutes = {
  path: "/",
  element: <LandingLayout />, // Wrap all pages inside LandingLayout
  children: [
    { index: true, element: <Landing /> }, // Default route ("/")
    { path: "about", element: <About /> },
    { path: "howitstarted", element: <div><HowItStarted /></div> },
    { path: "events", element: <Event/> },
    { path: "community-page", element: <div>Community Page</div> },
    { path: "training", element: <div>Training</div> },
    // { path: "login", element: <div>Login</div> },
    { path: "batches", element: <></>},
    // { path: "member-login", element: <MemberLogin /> },      all login will be in login router with diffrent layout please find the folder in routes
    // { path: "member-register", element: <MemberRegister /> },
    { path: "blogs", element: <BlogPage /> },
    { path: "contact", element: <Contact /> },
  ],
};

const router = createBrowserRouter([
  
  LandingRoutes,  // ✅ Fix: Use object directly, no spread operator
  AdminRoutes,
  CommunityRoutes,
  CoordinatorRoutes,
  MemberRoutes,
  Auth
]);

export default router;
