/**
 * @file CommunityPartners.jsx
 * @description Landing page section showcasing community and corporate partner logos in dual bi-directional continuous marquees.
 * @architecture Child section on the landing page view, using `react-fast-marquee`, `framer-motion` viewport detection, and `useThemeContext`.
 * @agent_note Optimizes rendering by pausing marquees when scrolled out of view via `useInView`. Logos include theme brightness adjustments for dark mode.
 */

import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { useInView } from "framer-motion";
import { useThemeContext } from "@/theme/ThemeProvider";

const partners = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "GitHub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
  },
  {
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    name: "Notion",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
  {
    name: "Postman",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png",
  },
  {
    name: "MongoDB",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
  },
  {
    name: "Vercel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
  },
  {
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "Canva",
    logo: "https://www.vectorlogo.zone/logos/canva/canva-ar21.svg",
  },
];

/**
 * @component PartnerLogo
 * @description Renders an individual partner logo with hover transitions, dark-mode inversion, and image error fallback.
 * @param {Object} props - Component properties
 * @param {Object} props.partner - Partner data item containing brand name and svg/png logo URL
 * @param {string} props.partner.name - Company or organization name
 * @param {string} props.partner.logo - Web image asset URL
 * @param {boolean} props.isDarkMode - Theme dark mode active flag
 * @state None
 * @api None (Static asset presentation)
 */
const PartnerLogo = ({ partner, isDarkMode }) => (
  <div className="flex items-center justify-center mx-10 group">
    <img
      src={partner.logo}
      alt={partner.name}
      onError={(e) => {
        if (partner.name === "Canva") {
          e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg";
        }
      }}
      className={`h-8 md:h-10 w-auto object-contain transition-all duration-300 ${isDarkMode ? "brightness-0 invert opacity-40 group-hover:opacity-80" : "opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100"
        }`}
    />
  </div>
);

/**
 * @component CommunityPartners
 * @description Renders the community partnerships section with partner count statistics and two opposing infinite scroll marquees.
 * @param {Object} props - Component properties (empty)
 * @state None (Theme state consumed via `useThemeContext`)
 * @api None (Static partner catalog)
 */
const CommunityPartners = () => {
  const { isDarkMode } = useThemeContext();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "100px 0px" });

  return (
    <section ref={sectionRef} className={`pt-6 sm:pt-10 lg:pt-14 pb-8 sm:pb-12 lg:pb-16 transition-colors duration-500 ${isDarkMode ? "bg-[#0d0d0d]" : "bg-gray-50"}`}>
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <div className="flex items-center justify-center gap-3 mb-3">

        </div>
        <h2 className={`text-2xl md:text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Trusted by <span className="text-[#ca0019]">Industry Leaders</span>
        </h2>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="text-center">
            <p className={`text-3xl md:text-4xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              50<span className="text-[#ca0019]">+</span>
            </p>
            <p className={`text-sm font-semibold uppercase tracking-widest mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Community Partners
            </p>
          </div>
          <div className={`w-px h-12 ${isDarkMode ? "bg-white/10" : "bg-gray-300"}`} />
          <div className="text-center">
            <p className={`text-3xl md:text-4xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              50<span className="text-[#ca0019]">+</span>
            </p>
            <p className={`text-sm font-semibold uppercase tracking-widest mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Corporate Partners
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Row 1 — left to right */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 h-full w-24 z-10 pointer-events-none ${isDarkMode ? "bg-gradient-to-r from-[#0d0d0d]" : "bg-gradient-to-r from-gray-50"} to-transparent`} />
        <div className={`absolute right-0 top-0 h-full w-24 z-10 pointer-events-none ${isDarkMode ? "bg-gradient-to-l from-[#0d0d0d]" : "bg-gradient-to-l from-gray-50"} to-transparent`} />

        <Marquee play={isInView} gradient={false} speed={40} pauseOnHover={true}>
          {[...partners, ...partners].map((partner, i) => (
            <PartnerLogo key={`row1-${i}`} partner={partner} isDarkMode={isDarkMode} />
          ))}
        </Marquee>
      </div>

      {/* Marquee Row 2 — right to left */}
      <div className="relative overflow-hidden mt-8">
        <div className={`absolute left-0 top-0 h-full w-24 z-10 pointer-events-none ${isDarkMode ? "bg-gradient-to-r from-[#0d0d0d]" : "bg-gradient-to-r from-gray-50"} to-transparent`} />
        <div className={`absolute right-0 top-0 h-full w-24 z-10 pointer-events-none ${isDarkMode ? "bg-gradient-to-l from-[#0d0d0d]" : "bg-gradient-to-l from-gray-50"} to-transparent`} />

        <Marquee play={isInView} gradient={false} speed={35} direction="right" pauseOnHover={true}>
          {[...partners].reverse().concat([...partners].reverse()).map((partner, i) => (
            <PartnerLogo key={`row2-${i}`} partner={partner} isDarkMode={isDarkMode} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CommunityPartners;
