/**
 * @file index.jsx
 * @description Higher-Order Component (HOC) providing Suspense fallback and RouteErrorBoundary protection for route code-splitting.
 * @architecture Central route-splitting wrapper in src/utils/Loader/ wrapping lazy-loaded pages across React Router configurations.
 * @agent_note Wraps passed components in `<RouteErrorBoundary>` and optional `<Suspense fallback={<CustomLoader />}>`. Sets displayName for React DevTools.
 */

import { Suspense } from "react";
import CustomLoader from "./CustomLoader";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

/**
 * @desc Higher-order component wrapper providing Suspense fallback and ErrorBoundary protection against dynamic import failures and runtime crashes.
 * @param {React.ComponentType} Component - Lazy-loaded or standard React component to wrap
 * @param {boolean} [hasFallback=true] - Whether to wrap with Suspense and CustomLoader fallback
 * @returns {React.ComponentType} Wrapped component with error boundary and suspense handling
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
