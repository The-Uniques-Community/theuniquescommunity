import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * LazyViewport component defers mounting its children until the container
 * approaches within `rootMargin` of the viewport.
 * 
 * Once rendered, `shouldRender` remains true (sticky visibility) to prevent
 * unmounting and re-fetching on scroll, and applies `content-visibility: auto`
 * for optimal browser paint performance.
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
