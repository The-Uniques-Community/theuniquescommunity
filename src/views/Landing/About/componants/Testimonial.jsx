import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useThemeContext } from "../../../../theme/ThemeProvider";

import sahilGargImg from "../../../../assets/img/About/sahil_garg.png";
import shubhamGargImg from "../../../../assets/img/About/shubham_garg.png";

const desk = [
  {
    id: 0,
    name: "Mr. Ashwani Garg",
    position: "Chairman",
    description:
      "I welcome every aspiring achiever to the Swami Vivekanand Group of Institutions. Today SVGOI has become a dream place to provide valuable educational experience to students, from different cultures and backgrounds. I am delighted to see the contributions, the students, faculty, and management of SVGOI have been making towards the overall success of students across the world. We have an interactive curriculum made to provide definite learning solutions in the field of Scientific studies, Medical studies, Arts, Business & Engineering. In this world known as a global village, all boundaries and the national borders are gradually becoming more transparent. Our international collaborations have helped students to form unlimited opportunities of global exposure for our students, to excel in their careers. So join your hands with SVGOI and be future-ready.",
    image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumv2ojXKUjtV3JMvxUIZnXbTfpBu58zRdYhQaF",
    facebook: "https://www.facebook.com/ChairmanSVGOI",
  },
  {
    id: 1,
    name: "Mr. Ashok Garg",
    position: "President",
    description:
      "SVGOI has experienced remarkable growth in recent years, earning widespread acclaim for its rapid advancement. Our journey from inception to our current standing is a testament to our unwavering dedication, exceptional faculty, and enriching learning environment. With a focus on quality education, we offer diverse programs affiliated with both national and international universities. We celebrate the achievements of our faculty, staff, and partners, employing modern teaching methods that empower students to realize their full potential. Emphasizing hands-on experience over mere theoretical knowledge, SVGOI is dedicated to providing practical solutions and fostering intellectual brilliance through research and development. Let's collaborate in building a skilled society together.",
    image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumltl0Dlu4P3qMiabZeUz87wrEkVfCgNntQHSJ",
    facebook: "https://www.facebook.com/ashok.garg.566",
  },
  {
    id: 2,
    name: "Mr. Vishal Garg",
    position: "Director Secretarial and Administration",
    description:
      "At SVGOI, we prioritize global standards in academia, fostering active engagement among teachers, students, and industry. Our focus is on holistic education, preparing students for the challenges of a globalized world. With dedicated faculty and staff, we aim to excel in shaping individuals' futures and elevate SVGOI's standing in the academic realm. Our commitment to excellence is reflected in the diverse student body, including foreign exchange students, enriching our campus culture. Join us in experiencing exceptional intellectual and academic opportunities, shaping the future of learning together.",
    image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum8xTTG5XlJfrKGuWUjb4n6NYRd3wE9DxCgy0v",
    facebook: "https://www.facebook.com/vishal.garg.7921975",
    linkedin: "https://www.linkedin.com/in/vishal-garg-2134aa142/",
  },
  {
    id: 3,
    name: "Mr. Sahil Garg",
    position: "Managing Director",
    description:
      "SVGOI epitomizes quality, dedication, values, and commitment, evident through our accomplished alumni. To cement our position as a premier institute in Technical Higher Education in India, we offer diverse, industry-relevant programs. With a student-centric approach, SVGOI is esteemed as one of the top private colleges in North India. From computer science to mechanical engineering, business management to nursing, SVGOI provides a wide array of educational services. Our strength lies in nurturing globally competitive graduates prepared for success in various professional domains. Join us in shaping a brighter future together.",
    image: sahilGargImg,
    linkedin: "https://www.linkedin.com/in/sahil-garg-034226130/",
    facebook: "https://www.facebook.com/sahil.garg.58910",
  },
  {
    id: 4,
    name: "Mr. Shubham Garg",
    position: "Director Placements",
    description:
      "Our aim is to provide Placements & Corporate Interface for the students and to make the students aware about the job opportunities and help them get placed. In the last fifteen years, Training & Placement Office (General) has been successfully able to place students of different courses & has invited reputed MNCs from Social Sector, Information Technology, Manufacturing, ITES, Media, Services, Banking & Finance, etc. The Training & Placement Office (General) looks after the Campus Placements of the Engineering & Non-Engineering Courses of the College & Coordinates with the respective departmental TPO's regarding the Placement & related activities.",
    image: shubhamGargImg,
    linkedin: "https://www.linkedin.com/in/shubham-garg-670537170/",
    facebook: "https://www.facebook.com/profile.php?id=100052235821482",
  },
];

export default function Testimonial() {
  const { isDarkMode } = useThemeContext();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMember = desk[activeIndex];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-[#fcfbf9] text-gray-900"
      }`}
    >
      <div className="w-[88%] max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col justify-start">
          <div className="flex mb-3 items-center">
            <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
              OUR FLAG BEARERS
            </h2>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            From the{" "}
            <span className="text-[#ca0019] block sm:inline">
              Desk of Management
            </span>
          </h1>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Featured Member Display Card */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`rounded-3xl border p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col md:flex-row items-center md:items-start gap-8 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#18191e] border-white/10"
                  : "bg-white border-gray-200/80 shadow-gray-200/50"
              }`}
            >
              {/* Featured Image with Zoom Effect */}
              <div className="relative overflow-hidden rounded-2xl w-full md:w-80 h-80 sm:h-96 shrink-0 group border border-black/10 shadow-md">
                <motion.img
                  src={activeMember.image}
                  alt={activeMember.name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover transition-transform duration-500 cursor-pointer object-top"
                />
              </div>

              {/* Featured Content Details */}
              <div className="flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {activeMember.name}
                  </h3>
                  <h4 className="text-base font-bold text-[#ca0019] mt-1 mb-4">
                    {activeMember.position}
                  </h4>
                  <p
                    className={`text-sm sm:text-base leading-relaxed text-justify ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {activeMember.description}
                  </p>
                </div>

                {/* Social Links */}
                {(activeMember.facebook || activeMember.linkedin) && (
                  <div className="pt-2 flex items-center gap-3">
                    {activeMember.facebook && (
                      <a
                        href={activeMember.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#ca0019] dark:hover:bg-[#ca0019] text-gray-700 dark:text-gray-300 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        aria-label="Facebook Profile"
                      >
                        <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                      </a>
                    )}
                    {activeMember.linkedin && (
                      <a
                        href={activeMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#ca0019] dark:hover:bg-[#ca0019] text-gray-700 dark:text-gray-300 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        aria-label="LinkedIn Profile"
                      >
                        <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Management Members List */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {desk.map((member, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={member.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                    isActive
                      ? "border-[#ca0019] bg-[#fff5f5] dark:bg-[#ca0019]/15 shadow-md shadow-[#ca0019]/15 scale-[1.02]"
                      : isDarkMode
                      ? "bg-[#18191e] border-white/10 hover:border-white/20 hover:bg-white/5"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  {/* Thumbnail Avatar */}
                  <div
                    className={`relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 transition-transform duration-300 ${
                      isActive ? "border-[#ca0019] scale-105" : "border-transparent"
                    }`}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Member Name & Position */}
                  <div className="flex-grow min-w-0">
                    <h4
                      className={`text-sm sm:text-base font-bold truncate transition-colors ${
                        isActive
                          ? "text-[#ca0019]"
                          : isDarkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {member.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {member.position}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
