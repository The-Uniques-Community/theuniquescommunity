import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

const EventForm = Loader(lazyWithRetry(() => import("@/utils/event/EventForm")));
const ProjectForm = Loader(lazyWithRetry(() => import("@/utils/project/ProjectForm")));
const CoordinatorLayout = Loader(lazyWithRetry(() => import("@/layout/Uniques/Coordinator")));
const CoordinatorDashboard = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator")));
const Member = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Members")));
const Event = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Events")));
const Projects = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Projects")));
const Account = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Accounts/index")));
const Profile = Loader(lazyWithRetry(() => import("@/views/Uniques/Member")));
const EventBudget = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Events/Budget")));
const EventView = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Events/View")));
const ProjectView = Loader(lazyWithRetry(() => import("@/views/Admin/Projects/View")));
const Enquiry = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Enquiry")));
const Trainers = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Trainers")));
const Stats = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Stats")));
const Batches = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Batches")));
const Community = Loader(lazyWithRetry(() => import("@/views/Uniques/Coordinator/Community")));

const CoordinatorRoute = {
  path: "/coordinator",
  element: <ProtectedRoute role={"coordinator"} element={<CoordinatorLayout />} />,
  errorElement: <RouteErrorBoundaryView />,
  children: [
    {
      path: "/coordinator",
      element: <CoordinatorDashboard />,
    },
    {
      path: "/coordinator/members-overview",
      element: <Member />,
    },
    {
      path: "/coordinator/events-overview",
      element: <Event />,
    },
    {
      path: "/coordinator/events-overview/create",
      element: <EventForm />,
    },
    {
      path: "/coordinator/events-overview/view/:id",
      element: <EventView />,
    },
    {
      path: "/coordinator/events-overview/:id/budget",
      element: <EventBudget />,
    },
    {
      path: "/coordinator/projects-overview",
      element: <Projects />,
    },
    {
      path: "/coordinator/projects-overview/create",
      element: <ProjectForm />,
    },
    {
      path: "/coordinator/projects-overview/view/:id",
      element: <ProjectView />,
    },
    {
      path: "/coordinator/accounts",
      element: <Account />,
    },
    {
      path: "/coordinator/profile",
      element: <Profile />,
    },
    {
      path: "/coordinator/enquiry",
      element: <Enquiry />,
    },
    {
      path: "/coordinator/trainers",
      element: <Trainers />,
    },
    {
      path: "/coordinator/stats",
      element: <Stats />,
    },
    {
      path: "/coordinator/batches",
      element: <Batches />,
    },
    {
      path: "/coordinator/community",
      element: <Community />,
    },
  ],
};

export default CoordinatorRoute;
