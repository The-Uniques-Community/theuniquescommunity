/**
 * @file RouteErrorBoundary.jsx
 * @description Comprehensive React Error Boundary and route error presentation fallback.
 * @architecture Used in `src/App.jsx` and throughout route tree definitions (`src/routes/index.jsx`) as both a class-based
 * React error boundary and a React Router `errorElement` adapter (`RouteErrorBoundaryView`).
 * @agent_note Distinguishes between standard runtime Javascript exceptions and Vite deployment chunk loading mismatches
 * via `isChunkLoadError`. Offers auto-recovery options ("Refresh Now", "Try Again", "Back to Home").
 */

import { Component } from "react";
import PropTypes from "prop-types";
import { useRouteError } from "react-router-dom";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import { isChunkLoadError } from "@/utils/lazyWithRetry";

/**
 * @component RouteErrorFallback
 * @description Visual card presentation displayed when a lazy component or route fails to render or load.
 * @param {Object} props - Component properties.
 * @param {Error|any} props.error - The error object or reason caught by the boundary.
 * @param {Function} [props.onRetry] - Optional custom retry callback; defaults to `window.location.reload()`.
 * @returns {JSX.Element} Rendered error presentation card with action buttons.
 */
export function RouteErrorFallback({ error, onRetry }) {

  const isChunkError = isChunkLoadError(error);

  const handleRefresh = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-white p-8 text-center shadow-xl dark:border-red-500/20 dark:bg-[#121212]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-[#ca0019] dark:bg-red-950/40">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {isChunkError ? "New Version Available" : "Unable to Load Page"}
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {isChunkError
            ? "A fresh update or new features were deployed to The Uniques Community. Please reload to load the latest version."
            : error?.message || "An unexpected error occurred while loading this section."}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ca0019] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#b00016] focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            <RefreshCw className="h-4 w-4" />
            {isChunkError ? "Refresh Now" : "Try Again"}
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-transparent px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>
        </div>

        {import.meta.env?.DEV && error && (
          <details className="mt-6 text-left text-xs text-gray-500 dark:text-gray-400">
            <summary className="cursor-pointer font-mono hover:underline">
              Technical Details (Dev Only)
            </summary>
            <pre className="mt-2 overflow-x-auto rounded bg-gray-100 p-2 font-mono text-[11px] text-red-600 dark:bg-zinc-900 dark:text-red-400">
              {error?.stack || error?.message || String(error)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

RouteErrorFallback.propTypes = {
  error: PropTypes.any,
  onRetry: PropTypes.func,
};

/**
 * @component RouteErrorBoundaryView
 * @description Functional route error handler designed as the React Router `errorElement`.
 * Uses `useRouteError()` to capture routing failures and delegating visual rendering to `RouteErrorFallback`.
 * @returns {JSX.Element} Rendered fallback view.
 */
export function RouteErrorBoundaryView() {
  const error = useRouteError();
  return <RouteErrorFallback error={error} />;
}

/**
 * @component RouteErrorBoundary
 * @description React Error Boundary class that catches JavaScript errors anywhere in its child component tree,
 * logs them, and displays fallback UI instead of crashing the whole application.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} [props.children] - Protected child component tree.
 * @param {React.ReactNode} [props.fallback] - Custom fallback node override.
 * @state {boolean} hasError - Tracks if an unhandled error was caught in child components.
 * @state {Error|null} error - The caught error instance.
 */
export class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[RouteErrorBoundary] Caught error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <RouteErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

RouteErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
};

export default RouteErrorBoundary;
