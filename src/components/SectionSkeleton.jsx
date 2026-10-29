/**
 * @file SectionSkeleton.jsx
 * @description Generalized animated placeholder skeleton for loading sections.
 * @architecture Used primarily as the `fallback` prop inside `LazyViewport` containers and React Suspense boundaries
 * across the landing page (`src/layout/Landing/index.jsx`) to stabilize layout geometry before components mount.
 * @agent_note Provides customizable height and styling to approximate the target section dimensions and prevent layout shifts.
 */

import PropTypes from "prop-types";

/**
 * @component SectionSkeleton
 * @description Renders pulsing placeholder blocks simulating section titles, captions, and card rows.
 * @param {Object} props - Component properties.
 * @param {string|number} [props.height="350px"] - Minimum height reserved for the skeleton container.
 * @param {string} [props.className=""] - Additional custom Tailwind CSS classes.
 * @returns {JSX.Element} Pulse-animated skeleton UI.
 */
export default function SectionSkeleton({ height = "350px", className = "" }) {

  return (
    <div
      className={`w-full flex items-center justify-center py-12 px-4 ${className}`}
      style={{ minHeight: height }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-6 opacity-60">
        <div className="w-48 h-6 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
        <div className="w-3/4 max-w-md h-10 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          <div className="h-44 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-44 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse hidden sm:block" />
          <div className="h-44 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse hidden md:block" />
        </div>
      </div>
    </div>
  );
}

SectionSkeleton.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
