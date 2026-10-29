/**
 * @file LazyViewport.jsx
 * @description Viewport-aware lazy mounting wrapper using IntersectionObserver.
 * @architecture Used across landing sections and heavy component trees (`src/layout/Landing/index.jsx`) to delay mounting
 * below-the-fold content until the user scrolls near the element, conserving initial bundle execution and memory.
 * @agent_note Sticky visibility is intentional: once rendered, `shouldRender` remains true so child components do not
 * unmount or re-execute data fetch lifecycles when scrolled out of view. Supports `content-visibility: auto` styling.
 */

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * @component LazyViewport
 * @description Defers mounting child components until the element scrolls within specified margin of the visible viewport.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Lazy-rendered DOM or component nodes.
 * @param {React.ReactNode} [props.fallback=null] - Placeholder or skeleton rendered before entry into viewport.
 * @param {string|number} [props.minHeight="350px"] - Placeholder reservation height preventing cumulative layout shifts (CLS).
 * @param {string} [props.rootMargin="300px 0px"] - IntersectionObserver root margin threshold for early pre-loading.
 * @param {string} [props.className=""] - Additional CSS class names.
 * @param {boolean} [props.contentVisibility=true] - Toggle for applying CSS `content-visibility: auto` after mount.
 * @state {boolean} shouldRender - Tracks whether the element has intersected with the threshold.
 * @sideeffects Registers and disconnects an `IntersectionObserver` instance on the container DOM node.
 */
export default function LazyViewport({
  children,
  fallback = null,
  minHeight = "350px",
  rootMargin = "300px 0px",
  className = "",
  contentVisibility = true,
}) {

  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (shouldRender) return;

    const el = containerRef.current;
    if (!el) return;

    // Fallback if IntersectionObserver is not supported
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [shouldRender, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        minHeight: shouldRender ? "auto" : minHeight,
        ...(contentVisibility && shouldRender
          ? { contentVisibility: "auto", containIntrinsicSize: `auto ${minHeight}` }
          : {}),
      }}
    >
      {shouldRender ? children : fallback}
    </div>
  );
}

LazyViewport.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rootMargin: PropTypes.string,
  className: PropTypes.string,
  contentVisibility: PropTypes.bool,
};
