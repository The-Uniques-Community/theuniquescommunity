import React from "react";
import CurvedLoop from "./CurvedLoop";
import { useThemeContext } from "@/theme/ThemeProvider";

const companies = [
  {
    name: "Google",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5OrEVK3gzNMYq46FIdR2OJ5Vr1m0WDHthsXwp",
  },
  {
    name: "Dentsu",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5tSfIXhEyKp7vbuh4aZnGcCs8ARDxHFO2LY0S",
  },
  {
    name: "Grazitti Interactive",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5yxk5MxYbN5ISOZ3mVoe8PMhvGujQwxq6rJd1",
  },
  {
    name: "Virtuos",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5LNvENAV4dQjwtUe75ApxbP68hlkFNKnGZIqT",
  },
  {
    name: "Revocept Solutions",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5q1pq2P9avH4S0MZTogxLPtUlVr3wpcjD6WEI",
  },
  {
    name: "NeoSoft",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5XRXqkTBdwE1zgNU9nBLxO62lZYuAWsqiRGCt",
  },
  {
    name: "Sopra Steria",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5KT5IuzovpGOZJ0MUag4QI3kRmCE7P1nwNtSF",
  },
  {
    name: "Siemens",
    logo: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5W3VJLlrBbR9rw3ciXY8DKdzPWVsp25LaHlth",
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
