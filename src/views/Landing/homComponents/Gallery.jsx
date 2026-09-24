import React from "react";
import { useThemeContext } from "../../../theme/ThemeProvider";
import DomeGallery from "./DomeGallery";

const ACHIEVEMENT_IMAGES = [
  {
    src: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumqWLC0dVXl8GxJUCebYMr3An0agj2yWpiqVvf",
    title: "SVGOI Tech Fest Win",
    category: "Award"
  },
  {
    src: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum2yUOpgWvT53OZ1aHF8mkfdPiU0cDoMlRG9zL",
    title: "National Hackathon Gold",
    category: "Hackathon"
  },
  {
    src: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumzE9eFQAhYxgKZ6AOMFluBUJEmvVjiwbnNWpq",
    title: "Uniques Core Team Meetup",
    category: "Community"
  },
  {
    src: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumIMqBstR21jqluvKkFoRaDpPfCGTtxewIs74z",
    title: "Code Warriors Trophy",
    category: "Award"
  },
  {
    src: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumyA6pe5Gvj9LGdSxXKPThlzeQcWmgO61ZJ87U",
    title: "Industry Mentorship Session",
    category: "Workshop"
  },
  {
    src: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumPGoet0Z89C4GnNKHTXFvruVyAOm6ZwU2Sibo",
    title: "Annual Innovators Summit",
    category: "Summit"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rEz8jr2og9AYBbcu0eXTH81rnVdpozvG6K4WI",
    title: "Ideathon Pitching Day",
    category: "Competition"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rHptqDVpF2pQE4PFU7NAMVr6YeWicz5h1KuJt",
    title: "UI/UX Design Masterclass",
    category: "Workshop"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rSSl9pOoaFDA2LEeO4I3rP8jBzJb7cltWkQRY",
    title: "TU Community Launch Event",
    category: "Launch"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rPoSO9PtUGhDgAYWEQrmjToyf265tVLilMXkq",
    title: "SVGOI Project Expo",
    category: "Exhibition"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rAWGbiBcYnIQDTmzWgy0bcOvPRLxFCXr97NJo",
    title: "Alumni Placement Panel",
    category: "Seminar"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rAlEKhmxcYnIQDTmzWgy0bcOvPRLxFCXr97NJ",
    title: "Flutter Mobile BootCamp",
    category: "Bootcamp"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1r5DgQ6rMC9pHMzvDGXT0OePm1Af7nSFktqrKE",
    title: "Code Sprint Champions",
    category: "Award"
  },
  {
    src: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rQYCb4jAIOoVhWP9E5DamsTHKt6ZeSc3LAJly",
    title: "Outstanding Performance Gala",
    category: "Celebration"
  }
];

const Gallery = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <div className={`w-full py-16 flex flex-col items-center justify-start transition-colors duration-500 ${isDarkMode ? "bg-transparent" : "bg-white"}`}>
      
      {/* Header Section */}
      <div className="w-[85%] mx-auto flex flex-col align-middle justify-start mb-6">
        <div className="flex mb-3 items-center">
          <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
          <h1 className={`text-sm md:text-lg font-semibold tracking-wider uppercase ${isDarkMode ? "text-white/70" : "text-gray-600"}`}>
            Celebrating Excellence
          </h1>
        </div>
        <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          A Glimpse of
          <span className="bg-gradient-to-r from-[#ca0019] via-[#ff3b4f] to-[#ca0019] bg-clip-text text-transparent text-3xl md:text-5xl md:py-2 block mt-1 mb-2 font-black">
            Our Achievements
          </span>
        </h1>
      </div>

      {/* 2D Draggable Plane Gallery Wrapper */}
      <div className="w-[85%] relative h-[600px] md:h-[700px] flex items-center justify-center">
        <DomeGallery
          images={ACHIEVEMENT_IMAGES}
          grayscale={false}
          overlayBlurColor={isDarkMode ? "#0d0b11" : "#ffffff"}
        />
      </div>

    </div>
  );
};

export default Gallery;
