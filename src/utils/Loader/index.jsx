import { Suspense } from "react";
import CustomLoader from "./CustomLoader";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

/**
 * Higher-order component wrapper providing Suspense fallback and ErrorBoundary protection
 * against dynamic import failures and runtime crashes.
 */
const Loader = (Component, hasFallback = true) => {
  const WrappedComponent = (props) => (
    <RouteErrorBoundary>
      {hasFallback ? (
        <Suspense fallback={<CustomLoader />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <Component {...props} />
      )}
    </RouteErrorBoundary>
  );

  WrappedComponent.displayName = `Loader(${Component?.displayName || Component?.name || "Component"})`;
  return WrappedComponent;
};

export default Loader;
