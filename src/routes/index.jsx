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
import EventDetailPage from "@/views/Landing/Event/Componant/EventDetailPage"
import BatchesPage from "@/views/Landing/Batches/index"
// import AdvisoryBoard from "@/views/Landing/AdvisoryBoard";
import Notices from "@/views/Landing/Notices/index"
import SuccessStoriesRoutes from "./successStories";
import { element } from "prop-types";

// Fix the import path - change from Batches/MemberProfile to Profile/MemberProfile
import MemberProfile from "@/views/Landing/Profile/MemberProfile";
import ForgetPassword from "@/views/Authentication/login/ForgetPassword";


const Landing = Loader(lazy(() => import("@/views/Landing/index")));

const BlogPage = Loader(lazy(() => import("@/views/Landing/Blog/index")));
const Contact = Loader(lazy(() => import("@/views/Landing/Contact/index")));
const Training = Loader(lazy(() => import("@/views/Landing/Training-model/Training")));
const NotFound = Loader(lazy(() => import("@/views/Landing/NotFound/index")));
const CommunityPage = Loader(lazy(() => import("@/views/Landing/Community/index")));
const SuccessStories  = Loader(lazy(() => import("@/views/Landing/SuccessStories/index")));
const Timeline = Loader(lazy(()=>import('@/utils/Timeline/Timeline')));

const timelineData = [
  {
    year: "1919",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFlLk9mYa6d4a69Y5YTMUFDUaER76hZzkkRg&s",
    heading: "Walter Gropius",
    subheading: "Founding of Bauhaus",
    brief: "Founded the Staatliches Bauhaus in Weimar, Germany, with the goal of uniting architecture, fine arts, and craft for mass-produced designs.",
    quote: "Let us create a new guild of craftsmen, without the class distinctions which raise an arrogant barrier between craftsmen and artist.",
    quoteAuthor: "WALTER GROPIUS"
  },
  {
    year: "1920",
    image: "/images/klee.jpg",
    heading: "Paul Klee",
    subheading: "Color Theory Pioneer",
    brief: "Joins and brings his expertise in color theory and form.",
    quote: ""
  },
  {
    year: "1923",
    image: "/images/moholy-nagy.jpg",
    heading: "László Moholy-Nagy",
    subheading: "New Vision",
    brief: "Introduced new approaches to photography and typography, promoting the integration of technology and art."
  }
];

const LandingRoutes = {
  path: "/",
  element: <LandingLayout />, // Wrap all pages inside LandingLayout
  children: [
    { index: true, element: <Landing /> }, // Default route ("/")
    { path: "about", element: <About /> },
    { path: "howitstarted", element: <div><HowItStarted /></div> },
    { path: "events", element: <Event /> },
    { path: "events/:id", element: <EventDetailPage /> }, // Add this line for event detail page
    { path: "community-page", element: <CommunityPage /> },
    { path: "community-main", element: <Community /> },
    { path: "training", element: <Training /> },
    { path: "blogs", element: <BlogPage /> },
    { path: "contact", element: <Contact /> },
    { path: "batches", element: <BatchesPage />  },
    { path: "success-stories", element: <SuccessStories />  },
    { path: "notices", element: <Notices/>  },
    { path: "test", element: <Timeline events={timelineData}/> },
    { path: "forget-password", element: <ForgetPassword /> },
    // Member profile route - this should come BEFORE the wildcard route
    { path: "profile/:id", element: <MemberProfile /> },
    
    // Wildcard route should be last
    { path: "*", element: <NotFound /> },
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