import { useState } from "react";

export default function LearnMoreButton() {
  const [hovered, setHovered] = useState(false);

  return (
   
      <button
        className="relative flex items-center w-56 h-12 bg-transparent border-0 cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className={`relative flex  w-12 h-12 rounded-full transition-all duration-500 ease-out ${hovered ? 'w-full items-center justify-end pr-6 bg-[#ca0019]'  : 'w-12 items-center justify-center bg-black '}`}
        >
          <span
            className="absolute w-2.5 h-2.5 border-t-2 border-r-2 border-white transform rotate-45"
          ></span>
        </span>
        <span
          className={`absolute left-16 text-lg font-bold uppercase transition-all duration-500 ease-out ${hovered ? 'text-white' : 'text-black'}`}
        >
          Learn More
        </span>
      </button>
   
  );
}
