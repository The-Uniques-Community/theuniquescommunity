/**
 * @file index.jsx
 * @description Central routing configuration and route manifest for The Uniques Community.
 * @architecture Builds the root React Router v6 browser router (`createBrowserRouter`), aggregating the top-level
 * landing layout routes (`LandingRoutes`) and the modular success stories route sub-tree (`SuccessStoriesRoutes`).
 * Connects directly to `src/App.jsx` where it is passed to `<RouterProvider>`.
 * @agent_note All top-level page components are dynamically loaded via `lazyWithRetry` and wrapped with `Loader`
 * to protect against network transit errors and chunk version mismatches after new production deployments.
 */

import { createBrowserRouter } from "react-router-dom";
import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import LandingLayout from "@/layout/Landing/index";
import SuccessStoriesRoutes from "./successStories";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

// Resilient lazy-loaded landing & public route views
const Landing = Loader(lazyWithRetry(() => import("@/views/Landing/index")));
const About = Loader(lazyWithRetry(() => import("@/views/Landing/About/index")));
const HowItStarted = Loader(lazyWithRetry(() => import("@/views/Landing/HowItStarted/index")));
const Community = Loader(lazyWithRetry(() => import("@/views/Community/index")));
const CommunityPage = Loader(lazyWithRetry(() => import("@/views/Landing/Community/index")));
const Event = Loader(lazyWithRetry(() => import("@/views/Landing/Event/Index")));
const EventDetailPage = Loader(lazyWithRetry(() => import("@/views/Landing/Event/Componant/EventDetailPage")));
const BatchesPage = Loader(lazyWithRetry(() => import("@/views/Landing/Batches/index")));
const Notices = Loader(lazyWithRetry(() => import("@/views/Landing/Notices/index")));
const MemberProfile = Loader(lazyWithRetry(() => import("@/views/Landing/Profile/MemberProfile")));
const ForgetPassword = Loader(lazyWithRetry(() => import("@/views/Authentication/login/ForgetPassword")));
const Login = Loader(lazyWithRetry(() => import("@/views/Authentication/login/index")));
const BlogPage = Loader(lazyWithRetry(() => import("@/views/Landing/Blog/index")));
const Contact = Loader(lazyWithRetry(() => import("@/views/Landing/Contact/index")));
const Training = Loader(lazyWithRetry(() => import("@/views/Landing/Training-model/Training")));
const TermsOfService = Loader(lazyWithRetry(() => import("@/views/Landing/TermsOfService/index")));
const NotFound = Loader(lazyWithRetry(() => import("@/views/Landing/NotFound/index")));
const PrivacyPolicy = Loader(lazyWithRetry(() => import("@/views/Landing/PrivacyPolicy/index")));
const Projects = Loader(lazyWithRetry(() => import("@/views/Landing/Projects/index")));
const ProjectDetails = Loader(lazyWithRetry(() => import("@/views/Landing/Projects/ProjectDetails")));
const Timeline = Loader(lazyWithRetry(() => import("@/utils/Timeline/Timeline")));

/**
 * @desc Test timeline milestones data for demonstration and prototyping.
 * @type {Array<Object>}
 */
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

/**
 * @desc Route configuration tree for primary public landing sections nested under `LandingLayout`.
 * @type {import('react-router-dom').RouteObject}
 */
const LandingRoutes = {
  path: "/",
  element: <LandingLayout />,
  errorElement: <RouteErrorBoundaryView />,
  children: [
    { index: true, element: <Landing /> },
    { path: "about", element: <About /> },
    { path: "howitstarted", element: <div><HowItStarted /></div> },
    { path: "events", element: <Event /> },
    { path: "events/:id", element: <EventDetailPage /> },
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
    { path: "profile/:id", element: <MemberProfile /> },
    { path: "*", element: <NotFound /> },
  ],
};

/**
 * @desc Main React Router browser instance combining Landing and SuccessStories hierarchies.
 * @type {import('react-router-dom').Router}
 */
const router = createBrowserRouter([
  LandingRoutes,
  SuccessStoriesRoutes
]);

export default router;

