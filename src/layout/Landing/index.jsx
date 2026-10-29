/**
 * @file index.jsx
 * @description Primary master layout wrapper for landing and public-facing routes.
 * @architecture Hosts persistent top navigation (`Navbar`), dynamically renders nested sub-routes via `<Outlet />`,
 * manages page-change scroll resets, provides lazy-loaded chatbot support (`ChatBot`), and creates a fixed reveal footer effect.
 * @agent_note The footer uses a sticky reveal effect: the content section calculates `marginBottom` from `footerHeight`
 * via dynamic DOM measurements on resize, allowing the fixed footer to become visible as the user scrolls past main content.
 */

import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/utils/NavBar/Navbar";
import Footer from "@/utils/Footer/Footer";
import CustomLoader from "@/utils/Loader/CustomLoader";
import lazyWithRetry from "@/utils/lazyWithRetry";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

const ChatBot = lazyWithRetry(() => import("@/components/ChatBot"));

/**
 * @component LandingLayout
 * @description Structural container managing navigation headers, route transition animations, and reveal footers.
 * @state {number} footerHeight - Dynamic height in pixels of the fixed bottom footer, measured for content margin offset.
 * @state {string} pathname - Current URL path from `useLocation` triggering scroll reset and route fade animation.
 * @returns {JSX.Element} The rendered layout structure surrounding routed outlets.
 */
const LandingLayout = () => {
  const { pathname } = useLocation();

  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Navbar stays persistently mounted across route transitions */}
      <Navbar />

      {/* Main Content: Slides over the footer */}
      <div
        className="relative z-10 bg-white dark:bg-[#0a0a0a] layout-bottom-clip overflow-x-clip min-h-screen"
        style={{
          marginBottom: `${footerHeight}px`,
          filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.1))'
        }}
      >
        <RouteErrorBoundary>
          <Suspense fallback={<CustomLoader />}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <Outlet />
            </motion.div>
          </Suspense>
        </RouteErrorBoundary>
      </div>

      {/* Reveal Footer: Stays fixed at the bottom */}
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full z-0"
      >
        <Footer />
      </div>

      <RouteErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      </RouteErrorBoundary>
    </div>
  );
};

export default LandingLayout;
