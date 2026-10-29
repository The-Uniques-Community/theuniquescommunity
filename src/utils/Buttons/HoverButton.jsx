/**
 * @file HoverButton.jsx
 * @description Morphing CTA button component that expands a circular indicator into a full-width branded backdrop on mouse hover.
 * @architecture Micro-interaction button in src/utils/Buttons/ designed for landing page and hero section CTAs.
 * @agent_note Toggles `hovered` state on mouse enter/leave, altering shape from a circle to a full-width pill and inverting label color.
 */

import { useState } from "react";

/**
 * @component LearnMoreButton
 * @description Interactive 'Learn More' CTA button featuring animated pill expansion and chevron indicator.
 * @param {Object} props - Component properties
 * @param {Function} [props.onClick] - Click handler triggered on button click
 * @state {boolean} hovered - Tracks mouse hover state to trigger morph animation
 * @api None
 */
export default function LearnMoreButton({onClick}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="relative flex items-center w-44 h-10 bg-transparent border-0 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <span
        className={`relative flex w-10 h-10 rounded-full transition-all duration-500 ease-out ${hovered ? 'w-full items-center justify-end pr-4 bg-[#ca0019]' : 'w-10 items-center justify-center bg-black'}`}
      >
        <span
          className="absolute w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45"
        ></span>
      </span>
      <span
        className={`absolute left-14 text-sm font-bold uppercase transition-all duration-500 ease-out ${hovered ? 'text-white' : 'text-black'}`}
      >
        Learn More
      </span>
    </button>
  );
}
