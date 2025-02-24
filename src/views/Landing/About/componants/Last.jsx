"use client";

import { motion } from "framer-motion";

export default function AnimatedTechStack() {
  return (
    <div className="w-full h-[600px] font-[Montserrat] flex justify-center bg-black text-white relative overflow-hidden">
      {/* Gradient Overlay for Fading Ends */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>

      <div className="w-4/5 h-full flex flex-wrap items-center justify-between relative">
        {/* Left Section - Text */}
        <div className="w-full md:w-2/5 py-10 text-center md:text-left">
          <p className="text-[38px] leading-[50px] font-medium">
            The best tech stack to scale like crazy
          </p>
          <p className="mt-7 text-[20px] text-gray-300">
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            quis gravida magna mi a libero. Nullam tincidunt adipiscing enim. Sed
            augue ipsum, egestas nec, vestibulum et.
          </p>
          <button className="mt-9 font-medium text-[18px] px-7 py-3 text-black rounded-lg bg-[#A5CDFD]">
            Let's talk
          </button>
        </div>

        {/* Right Section - Infinite Scrolling Animated Circles */}
        <div className="w-full md:w-2/5 flex justify-center items-center h-full p-4 relative overflow-hidden">
          {/* Left Column - Moves Up (Infinite Loop) */}
          <motion.div
            className="flex flex-col gap-y-4 mr-4"
            animate={{ y: ["100%", "-100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <div
                key={`left-${i}`}
                className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] bg-[#201B17] rounded-full"
              />
            ))}
          </motion.div>

          {/* Right Column - Moves Down (Infinite Loop) */}
          <motion.div
            className="flex flex-col gap-y-4 ml-4"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <div
                key={`right-${i}`}
                className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] bg-[#201B17] rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
