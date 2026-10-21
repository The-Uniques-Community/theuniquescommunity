import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Loader from "@/utils/Loader";
import AdminRoutes from "@/routes/Admin/AdminRoutes";
import CommunityRoutes from "@/routes/Community/CommunityRoutes";
import CoordinatorRoutes from "@/routes/Uniques/CoordinatorRoute";
import MemberRoutes from "@/routes/Uniques/MemberRoutes";
import LandingLayout from "@/layout/Landing/index";
import Auth from "@/routes/Authentication/Auth";
import SuccessStoriesRoutes from "./successStories";

// Lazy-loaded landing & public route views
const Landing = Loader(lazy(() => import("@/views/Landing/index")));
const About = Loader(lazy(() => import("@/views/Landing/About/index")));
const HowItStarted = Loader(lazy(() => import("@/views/Landing/HowItStarted/index")));
const Community = Loader(lazy(() => import("@/views/Community/index")));
const CommunityPage = Loader(lazy(() => import("@/views/Landing/Community/index")));
const Event = Loader(lazy(() => import("@/views/Landing/Event/Index")));
const EventDetailPage = Loader(lazy(() => import("@/views/Landing/Event/Componant/EventDetailPage")));
const BatchesPage = Loader(lazy(() => import("@/views/Landing/Batches/index")));
const Notices = Loader(lazy(() => import("@/views/Landing/Notices/index")));
const MemberProfile = Loader(lazy(() => import("@/views/Landing/Profile/MemberProfile")));
const ForgetPassword = Loader(lazy(() => import("@/views/Authentication/login/ForgetPassword")));
const Login = Loader(lazy(() => import("@/views/Authentication/login")));
const BlogPage = Loader(lazy(() => import("@/views/Landing/Blog/index")));
const Contact = Loader(lazy(() => import("@/views/Landing/Contact/index")));
const Training = Loader(lazy(() => import("@/views/Landing/Training-model/Training")));
const TermsOfService = Loader(lazy(() => import("@/views/Landing/TermsOfService")));
const NotFound = Loader(lazy(() => import("@/views/Landing/NotFound/index")));
const SuccessStories = Loader(lazy(() => import("@/views/Landing/SuccessStories/index")));
const PrivacyPolicy = Loader(lazy(() => import("@/views/Landing/PrivacyPolicy/index")));
const Projects = Loader(lazy(() => import("@/views/Landing/Projects/index")));
const ProjectDetails = Loader(lazy(() => import("@/views/Landing/Projects/ProjectDetails")));
const Timeline = Loader(lazy(() => import("@/utils/Timeline/Timeline")));

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
    image: "/images/klee.webp",
    heading: "Paul Klee",
    subheading: "Color Theory Pioneer",
    brief: "Joins and brings his expertise in color theory and form.",
    quote: ""
  },
  {
    year: "1923",
    image: "/images/moholy-nagy.webp",
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
    { path: "register", element: <Community /> },
    { path: "campus-ambassador", element: <Community /> },
    { path: "training", element: <Training /> },
    { path: "terms-of-service", element: <TermsOfService /> },
    { path: "blogs", element: <BlogPage /> },
    { path: "contact", element: <Contact /> },
    { path: "privacy-policy", element: <PrivacyPolicy /> },
    { path: "privacy", element: <PrivacyPolicy /> },
    { path: "projects", element: <Projects /> },
    { path: "projects/:projectId", element: <ProjectDetails /> },
    { path: "project", element: <Projects /> },
    { path: "project/:projectId", element: <ProjectDetails /> },
    { path: "batches", element: <BatchesPage /> },
    { path: "notices", element: <Notices /> },
    { path: "test", element: <Timeline events={timelineData} /> },
    { path: "login", element: <Login /> },
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
