import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/utils/NavBar/Navbar";
import Footer from "@/utils/Footer/Footer";
import CustomLoader from "@/utils/Loader/CustomLoader";

const LandingLayout = () => {
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

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
      <Suspense fallback={<CustomLoader />}>
        <Navbar />

        {/* Main Content: Slides over the footer */}
        <div 
          className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden min-h-screen"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </Suspense>

      {/* Reveal Footer: Stays fixed at the bottom */}
      <div 
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full z-0"
      >
        <Footer />
      </div>
    </div>
  );
};

export default LandingLayout;
