import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@/theme/ThemeProvider";
import { RocketLaunch, Code } from "@mui/icons-material";

const getIconUrl = (icon) => `https://skillicons.dev/icons?i=${icon}`;

const CanvaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#00C4CC" />
    <text
      x="50"
      y="68"
      fontFamily="Arial, sans-serif"
      fontSize="58"
      fontWeight="bold"
      textAnchor="middle"
      fill="white"
    >
      C
    </text>
  </svg>
);

const IconRenderer = ({ icon, size = "sm" }) => {
  const imgClass = size === "lg" ? "w-20 h-20 object-contain" : "w-8 h-8 object-contain";

  if (icon === "canva") {
    return <CanvaLogo />;
  }

  return (
    <img
      src={getIconUrl(icon)}
      alt={icon}
      className={imgClass}
      onError={(e) => { e.currentTarget.style.opacity = "0.3"; }}
    />
  );
};

const OrbitIcon = ({ icon, delay = 0, distance = 100, duration = 10, isDarkMode }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    style={{ width: distance * 2, height: distance * 2, left: `calc(50% - ${distance}px)`, top: `calc(50% - ${distance}px)` }}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/10 overflow-hidden ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}
      >
        <IconRenderer icon={icon} size="sm" />
      </motion.div>
    </div>
  </motion.div>
);

const CircularOrbit = ({ centralIcon, orbitingIcons, isDarkMode }) => (
  <div className="relative w-full h-[400px] flex items-center justify-center">
    <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-gray-500/30"></div>
    <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-gray-500/20"></div>
    <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-gray-500/10"></div>

    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl z-20 bg-white border-4 border-[#ca0019] overflow-hidden"
    >
      <IconRenderer icon={centralIcon} size="lg" />
    </motion.div>

    {orbitingIcons.map((icon, i) => (
      <OrbitIcon
        key={i}
        icon={icon}
        delay={i * (10 / orbitingIcons.length)}
        distance={90 + (i % 3) * 50}
        duration={15 + i * 2}
        isDarkMode={isDarkMode}
      />
    ))}
  </div>
);

const FourPhase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { isDarkMode } = useThemeContext();

  const tabData = [
    {
      title: "First Year",
      subtitle: "Technical & Soft Skills",
      centralIcon: "ps",
      orbitingIcons: ["figma", "pr", "ai", "canva"],
      description: "Master advanced image editing, responsive front-end development, digital marketing, and UI/UX design while developing communication and interview skills.",
      focusAreas: ["Image Editing", "Front-end Dev", "UI/UX Design", "Soft Skills"]
    },
    {
      title: "Second Year",
      subtitle: "Programming & Data",
      centralIcon: "js",
      orbitingIcons: ["nodejs", "mysql", "java", "react"],
      description: "Develop robust backend logic, manage databases, and explore data structures. Specialize in Java programming or Digital Marketing.",
      focusAreas: ["Backend Logic", "Database Mgmt", "Data Structures", "Java Track"]
    },
    {
      title: "Third Year",
      subtitle: "Cutting-Edge Tech",
      centralIcon: "react",
      orbitingIcons: ["aws", "redis", "nextjs", "solidity"],
      description: "Gain hands-on experience in designing scalable applications, real-world problem-solving, and collaborative development projects.",
      focusAreas: ["Scalable Apps", "Problem Solving", "Collaboration", "Industry Projects"]
    },
    {
      title: "Fourth Year",
      subtitle: "Professional Readiness",
      centralIcon: "postman",
      orbitingIcons: ["github", "docker", "kubernetes", "linux"],
      description: "Prepare for careers with mock interviews, aptitude tests, and personality development. Explore Blockchain and emerging technologies.",
      focusAreas: ["Career Prep", "Mock Interviews", "Blockchain", "Aptitude"]
    },
    {
      title: "L&T Courses",
      subtitle: "Specialized Training",
      centralIcon: "matlab",
      orbitingIcons: ["py", "spring", "mongodb", "azure"],
      description: "Specialized training in Machine Learning, Java & Spring, Blockchain Legal Consulting, and Microsoft Power BI.",
      focusAreas: ["Machine Learning", "Spring Boot", "Legal Tech", "Power BI"]
    },
  ];

  return (
    <div className={`transition-colors duration-500 py-24 px-6 lg:px-12 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-sm uppercase tracking-[0.3em] font-black mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
          >
            Our Curriculum
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter"
          >
            Program <span className="text-[#ca0019]">Structure</span>
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-white/5 pb-8">
          {tabData.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${activeTab === index
                  ? 'bg-[#ca0019] text-white shadow-lg shadow-red-900/20 scale-105'
                  : `${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="flex justify-center">
                <CircularOrbit
                  centralIcon={tabData[activeTab].centralIcon}
                  orbitingIcons={tabData[activeTab].orbitingIcons}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#ca0019]/10 flex items-center justify-center">
                    <RocketLaunch className="text-[#ca0019] text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                      {tabData[activeTab].title}
                    </h3>
                    <p className={`text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tabData[activeTab].subtitle}
                    </p>
                  </div>
                </div>

                <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {tabData[activeTab].description}
                </p>

                <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
                  <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Code className="text-[#ca0019]" /> Key Focus Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tabData[activeTab].focusAreas.map((area, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ca0019]"></div>
                        <span className={`text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FourPhase;