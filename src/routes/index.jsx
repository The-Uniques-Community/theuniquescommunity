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
import Community from "@/views/Community/index"

import Event from "@/views/Landing/Event/Index"
import BatchesPage from "@/views/Landing/Batches/index"
// import AdvisoryBoard from "@/views/Landing/AdvisoryBoard";
import Notices from "@/views/Landing/Notices/index"
import SuccessStoriesRoutes from "./successStories";
const Landing = Loader(lazy(() => import("@/views/Landing/index")));


const BlogPage = Loader(lazy(() => import("@/views/Landing/Blog/index")));
const Contact = Loader(lazy(() => import("@/views/Landing/Contact/index")));
const Training = Loader(lazy(() => import("@/views/Landing/Training-model/Training")));
const NotFound = Loader(lazy(() => import("@/views/Landing/NotFound/index")));
const CommunityPage = Loader(lazy(() => import("@/views/Landing/Community/index")));
const SuccessStories  = Loader(lazy(() => import("@/views/Landing/SuccessStories/index")));
const LandingRoutes = {
  path: "/",
  element: <LandingLayout />, // Wrap all pages inside LandingLayout
  children: [
    { index: true, element: <Landing /> }, // Default route ("/")
    { path: "about", element: <About /> },
    { path: "howitstarted", element: <div><HowItStarted /></div> },
    { path: "events", element: <Event /> },
    { path: "community-page", element: <CommunityPage /> },
    { path: "community-main", element: <Community /> },
    { path: "training", element: <Training /> },
    // { path: "login", element: <div>Login</div> },
    // { path: "batches", element: <div>Batches</div> },
    //      all login will be in login router with diffrent layout please find the folder in routes
    { path: "*", element: <NotFound /> },
    { path: "blogs", element: <BlogPage /> },
    { path: "contact", element: <Contact /> },
    { path: "batches", element: <BatchesPage />  },
    { path: "success-stories", element: <SuccessStories />  },
    // { path: "advisoryBoard", element: <AdvisoryBoard />  },
    { path: "notices", element: <Notices/>  },
    
  ],
};

const router = createBrowserRouter([

  LandingRoutes,  // ✅ Fix: Use object directly, no spread operator
  AdminRoutes,
  CommunityRoutes,
  CoordinatorRoutes,
  MemberRoutes,
  Auth,
  SuccessStoriesRoutes
]);

export default router;
