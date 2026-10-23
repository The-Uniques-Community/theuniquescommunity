import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

const EventForm = Loader(lazyWithRetry(() => import("@/utils/event/EventForm")));
const ProjectForm = Loader(lazyWithRetry(() => import("@/utils/project/ProjectForm")));
const AdminLayout = Loader(lazyWithRetry(() => import("@/layout/Admin")));
const AdminDashboard = Loader(lazyWithRetry(() => import("@/views/Admin")));
const Member = Loader(lazyWithRetry(() => import("@/views/Admin/Members")));
const Event = Loader(lazyWithRetry(() => import("@/views/Admin/Events")));
const Projects = Loader(lazyWithRetry(() => import("@/views/Admin/Projects")));
const Account = Loader(lazyWithRetry(() => import("@/views/Admin/Accounts/index")));
const Profile = Loader(lazyWithRetry(() => import("@/views/Admin/Profile")));
const EventBudget = Loader(lazyWithRetry(() => import("@/views/Admin/Events/Budget")));
const EventView = Loader(lazyWithRetry(() => import("@/views/Admin/Events/View")));
const ProjectView = Loader(lazyWithRetry(() => import("@/views/Admin/Projects/View")));
const Enquiry = Loader(lazyWithRetry(() => import("@/views/Admin/Enquiry")));
const Trainers = Loader(lazyWithRetry(() => import("@/views/Admin/Trainers")));
const Stats = Loader(lazyWithRetry(() => import("@/views/Admin/Stats")));
const Batches = Loader(lazyWithRetry(() => import("@/views/Admin/Batches")));
const Community = Loader(lazyWithRetry(() => import("@/views/Admin/Community")));

const AdminRoutes = {
  path: "/admin",
  element: <ProtectedRoute role={"admin"} element={<AdminLayout />} />,
  errorElement: <RouteErrorBoundaryView />,
  children: [
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/members-overview",
      element: <Member />,
    },
    {
      path: "/admin/events-overview",
      element: <Event />,
    },
    {
      path: "/admin/events-overview/create",
      element: <EventForm />,
    },
    {
      path: "/admin/events-overview/view/:id",
      element: <EventView />,
    },
    {
      path: "/admin/events-overview/:id/budget",
      element: <EventBudget />,
    },
    {
      path: "/admin/projects-overview",
      element: <Projects />,
    },
    {
      path: "/admin/projects-overview/create",
      element: <ProjectForm />,
    },
    {
      path: "/admin/projects-overview/view/:id",
      element: <ProjectView />,
    },
    {
      path: "/admin/accounts",
      element: <Account />,
    },
    {
      path: "/admin/profile",
      element: <Profile />,
    },
    {
      path: "/admin/enquiry",
      element: <Enquiry/>,
    },
    {
      path: "/admin/trainers",
      element: <Trainers />,
    },
    {
      path: "/admin/stats",
      element: <Stats />,
    },
    {
      path: "/admin/batches",
      element: <Batches />,
    },
    {
      path: "/admin/community",
      element: <Community />,
    }
  ],
};

export default AdminRoutes;
