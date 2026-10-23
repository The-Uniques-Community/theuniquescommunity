import lazyWithRetry from "@/utils/lazyWithRetry";
import Loader from "@/utils/Loader";
import { RouteErrorBoundaryView } from "@/components/RouteErrorBoundary";

const AuthLayout = Loader(lazyWithRetry(() => import("@/layout/Authentication/AuthLayout")));
const Login = Loader(lazyWithRetry(() => import("@/views/Authentication/login")));

const Auth = {
  path: "/auth",
  element: <AuthLayout />,
  errorElement: <RouteErrorBoundaryView />,
  children: [
    {
      index: true,
      element: <Login />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
};

export default Auth;
