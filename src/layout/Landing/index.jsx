import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/utils/NavBar/Navbar";
import Footer from "@/utils/Footer/Footer";
import CustomLoader from "@/utils/Loader/CustomLoader";
import lazyWithRetry from "@/utils/lazyWithRetry";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

const ChatBot = lazyWithRetry(() => import("@/components/ChatBot"));

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
