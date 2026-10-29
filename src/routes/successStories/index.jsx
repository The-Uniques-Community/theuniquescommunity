/**
 * @file index.jsx
 * @description Sub-route definitions for the Success Stories domain.
 * @architecture Exported as `SuccessStoriesRoutes` and mounted into the main router in `src/routes/index.jsx`.
 * Wraps index and individual student story sub-views within the persistent `SuccessLayout` container.
 * @agent_note The parameterized child route `:studentId` receives `students` collection from the parent `SuccessLayout`
 * via React Router outlet context (`useOutletContext()`).
 */

import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

const SuccessLayout = Loader(lazyWithRetry(() => import("@/layout/Landing/successStories")));
const SuccessStoriesHome = Loader(lazyWithRetry(() => import("@/views/Landing/SuccessStories/HomeContent")));
const StudentStory = Loader(lazyWithRetry(() => import("@/views/Landing/SuccessStories/StudentStory")));

/**
 * @desc Success Stories route branch configuration with layout wrapper and error boundary.
 * @type {import('react-router-dom').RouteObject}
 */
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

