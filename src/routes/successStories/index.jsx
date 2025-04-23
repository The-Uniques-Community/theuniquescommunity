import { lazy } from "react";
import SuccessLayout from "@/layout/Landing/successStories";
import Loader from "@/utils/Loader";

// Lazy load components
const SuccessStoriesHome = Loader(lazy(() => import("@/views/Landing/SuccessStories/HomeContent")));
const StudentStory = Loader(lazy(() => import("@/views/Landing/SuccessStories/StudentStory")));

const SuccessStoriesRoutes = {
    path: "/success-stories",
    element: <SuccessLayout />,
    children: [
        { index: true, element: <SuccessStoriesHome /> },
        { path: ":studentId", element: <StudentStory /> }
    ],
};

export default SuccessStoriesRoutes;