/**
 * @file Eligiblity.jsx
 * @description Community perks, member benefits, and eligibility advantages grid.
 * Displays key perks (Exclusive Events, Networking, Skill Development, Recognition, Merchandise)
 * wrapped in cursor-interactive `SpotlightCard` components with ambient radial lighting.
 *
 * @architecture
 * - Part of the Community Landing feature cluster (`views/Community/Landing/`).
 * - Employs Framer Motion `motion.div` with viewport-triggered reveal animations.
 * - Integrates with `src/utils/Card/SpotLightCard.jsx`.
 *
 * @agent_note
 * Light and dark theme palettes adjust spotlight color density (`rgba(202, 0, 25, 0.2)` vs `0.1`).
 */

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

/**
 * PerkCard Component
 *
 * @component
 * @param {Object} props
 * @param {Object} props.perk - Perk data item.
 * @param {boolean} props.isDarkMode - Theme indicator.
 * @returns {JSX.Element} Spotlight-enhanced benefit card.
 */
const PerkCard = ({ perk, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative flex items-center justify-center w-full"
  >
    <SpotlightCard
      className="!p-4 sm:!p-5 md:!p-6"
      spotlightColor={isDarkMode ? "rgba(202, 0, 25, 0.2)" : "rgba(191, 0, 0, 0.1)"}
    >
      <div className="relative p-2 sm:p-3 md:p-4 h-full min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col justify-center overflow-hidden">
        <span className={`absolute top-1 sm:top-2 right-2 sm:right-4 text-5xl sm:text-6xl md:text-7xl font-black select-none pointer-events-none transition-colors duration-300 ${isDarkMode ? 'text-white/5' : 'text-gray-100'}`}>
          {perk.id}
        </span>
        <div className="relative z-10">
          <h3 className={`font-black text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {perk.title}
          </h3>
          <div className="w-8 h-1 bg-[#ca0019] mb-2 sm:mb-3"></div>
          <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
    <div className={`transition-colors duration-500 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-12 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black mb-5 sm:mb-8 md:mb-10 tracking-tight sm:tracking-tighter max-w-xl mx-auto px-4">
          <span className="inline-block">
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Exciting </span>
            <span className="text-[#ca0019]">Perks</span>
          </span>{' '}
          <span className={`inline-block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            for You
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 sm:gap-y-6 md:gap-y-8 gap-x-6 sm:gap-x-8 max-w-6xl mx-auto items-center">
          
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
