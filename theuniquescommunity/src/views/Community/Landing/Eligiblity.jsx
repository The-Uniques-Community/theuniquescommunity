import React from 'react';
import SpotlightCard from '@/utils/Card/SpotLightCard';
import { useThemeContext } from "@/theme/ThemeProvider";
import { motion } from "framer-motion";

const perksData = [
  {
    id: "01",
    title: "Exclusive Events",
    description: "Get access to members-only workshops, webinars, and meetups with leading experts in the field.",
  },
  {
    id: "02",
    title: "Networking",
    description: "Connect with industry experts, mentors, and like-minded peers to build your professional network.",
  },
  {
    id: "03",
    title: "Skill Development",
    description: "Participate in hands-on projects and learning opportunities tailored to boost your technical skills.",
  },
  {
    id: "04",
    title: "Recognition",
    description: "Get featured on our platforms and earn rewards and certifications for your contributions.",
  },
  {
    id: "05",
    title: "Exclusive Merchandise",
    description: "Receive branded goodies, T-shirts, and special gifts as a token of appreciation.",
  },
];

const PerkCard = ({ perk, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative flex items-center justify-center w-full"
  >
    <SpotlightCard spotlightColor={isDarkMode ? "rgba(202, 0, 25, 0.2)" : "rgba(191, 0, 0, 0.1)"}>
      <div className="relative p-6 h-full min-h-[250px] flex flex-col justify-center overflow-hidden">
        <span className={`absolute top-2 right-4 text-7xl font-black select-none pointer-events-none transition-colors duration-300 ${isDarkMode ? 'text-white/5' : 'text-gray-100'}`}>
          {perk.id}
        </span>
        <div className="relative z-10">
          <h3 className={`font-black text-xl mb-3 uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {perk.title}
          </h3>
          <div className="w-8 h-1 bg-[#ca0019] mb-4"></div>
          <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {perk.description}
          </p>
        </div>
      </div>
    </SpotlightCard>
  </motion.div>
);

const SevenCardsLayout = () => {
  const { isDarkMode } = useThemeContext();
  
  return (
    <div className={`transition-colors duration-500 py-24 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center text-5xl font-black mb-24 tracking-tighter">
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Exciting </span>
          <span className="text-[#ca0019]">Perks </span>
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>for You</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 max-w-6xl mx-auto items-center">
          
          {/* Row 1: Left and Right */}
          <PerkCard perk={perksData[0]} isDarkMode={isDarkMode} />
          <div className="hidden md:block" /> {/* Middle Spacer */}
          <PerkCard perk={perksData[1]} isDarkMode={isDarkMode} />

          {/* Row 2: Center Only */}
          <div className="hidden md:block" /> {/* Left Spacer */}
          <PerkCard perk={perksData[2]} isDarkMode={isDarkMode} />
          <div className="hidden md:block" /> {/* Right Spacer */}

          {/* Row 3: Left and Right */}
          <PerkCard perk={perksData[3]} isDarkMode={isDarkMode} />
          <div className="hidden md:block" /> {/* Middle Spacer */}
          <PerkCard perk={perksData[4]} isDarkMode={isDarkMode} />

        </div>
      </div>
    </div>
  );
};

export default SevenCardsLayout;
