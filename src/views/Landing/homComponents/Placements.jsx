import React from "react";
import CurvedLoop from "./CurvedLoop";
import { useThemeContext } from "@/theme/ThemeProvider";

const companies = [
  {
    name: "Google",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/google.svg",
  },
  {
    name: "Amazon",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/amazon.svg",
  },
  {
    name: "Microsoft",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/microsoft.svg",
  },
  {
    name: "Meta",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/meta.svg",
  },
  {
    name: "Salesforce",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/salesforce.svg",
  },
  {
    name: "IBM",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/ibm.svg",
  },
  {
    name: "Adobe",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/adobe.svg",
  },
  {
    name: "Accenture",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/accenture.svg",
  },
  {
    name: "Intel",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/intel.svg",
  },
  {
    name: "Apple",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/apple.svg",
  },
];

const Placements = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <section className={`py-16 transition-colors duration-500 overflow-hidden ${isDarkMode ? "bg-[#161616]" : "bg-white"}`}>
      <div className="w-[85%] mx-auto flex flex-col align-middle justify-start mb-6">
        <div className="flex mb-5 items-center">
          <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
          <h1 className={`text-sm md:text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            PLACEMENTS
          </h1>
        </div>
        <h1 className={`text-2xl md:text-4xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Students Placed at
          <span className="text-[#ca0019] text-2xl md:text-5xl md:py-2 block">
            Top Companies
          </span>
        </h1>
      </div>

      {/* Curved Loop with Logos */}
      <div className="relative w-full h-[240px] flex items-center justify-center">
        <CurvedLoop
          logos={companies}
          speed={0.8}
          curveAmount={80}
          direction="left"
          interactive={true}
          isDarkMode={isDarkMode}
        />
      </div>
    </section>
  );
};

export default Placements;
