import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

const SuccessLayout = Loader(lazyWithRetry(() => import("@/layout/Landing/successStories")));
const SuccessStoriesHome = Loader(lazyWithRetry(() => import("@/views/Landing/SuccessStories/HomeContent")));
const StudentStory = Loader(lazyWithRetry(() => import("@/views/Landing/SuccessStories/StudentStory")));

const SuccessStoriesRoutes = {
    path: "/success-stories",
    element: <SuccessLayout />,
    errorElement: <RouteErrorBoundaryView />,
    children: [
        { index: true, element: <SuccessStoriesHome /> },
        { path: ":studentId", element: <StudentStory /> }
    ],
};

export default SuccessStoriesRoutes;
