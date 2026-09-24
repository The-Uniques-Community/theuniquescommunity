import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logos/theuniquesCommunity.png";

const CustomLoader = () => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with Breathing Animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: [0.9, 1.05, 1],
            opacity: 1 
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="relative"
        >
          <img 
            src={logo} 
            alt="The Uniques Community" 
            className="w-48 md:w-64 object-contain filter drop-shadow-2xl" 
          />
          
          {/* Luminescent Ring */}
          <motion.div 
            className="absolute -inset-4 border-2 border-red-500/20 rounded-full pointer-events-none"
            animate={{ 
              scale: [1, 1.2],
              opacity: [0.5, 0] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>

        {/* Loading Progress Text/Indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-red-600 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-neutral-500 ml-1"
          >
            Loading Experience
          </motion.p>
        </div>
      </div>

      {/* Bottom Brand Tagline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-1"
      >
        <p className="text-[10px] font-medium text-neutral-400 tracking-widest uppercase">
          Innovating Since 2026
        </p>
      </motion.div>
    </div>,
    document.body
  );
};

export default CustomLoader;
