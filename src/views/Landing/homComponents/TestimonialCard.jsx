"use client"
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  School, 
  Work, 
  Computer,
  Star
} from "@mui/icons-material"
import ronitImg from "@/assets/img/Success Stories avatars/ronit-jaiprakash.jpeg";
import praveenImg from "@/assets/img/Success Stories avatars/praveen-jaiswal.jpeg";
import mantashaImg from "@/assets/img/Success Stories avatars/mantasha-tabassum.jpg";
import naveenImg from "@/assets/img/Success Stories avatars/naveen-jaiswal.jpg";

const colors = {
  primary: "#ca0019",     // Red
  dark: "#000000",        // Black
  light: "#ffffff",       // White
  gray: "#f5f5f5",        // Light gray
  primaryLight: "#ffebee" // Light red for backgrounds
};

// Testimonial data with balanced, equal-length quote texts across all cards
const testimonialData = {
  students: [
    {
      name: "Ronit JaiPrakash",
      role: "Application Developer, Caelius",
      image: ronitImg,
      testimonial: "The Uniques Community provided me with the technical skills and network to launch my career. The industry mentorship was instrumental in helping me secure my developer role at Caelius.",
      rating: 5,
      highlight: "MERN Stack"
    },
    {
      name: "Naveen Jaiswal",
      role: "Software Developer, Thor Solutions",
      image: naveenImg,
      testimonial: "Through hands-on projects and focused cohort training at The Uniques, I developed the engineering mindset required to excel in high-scale product customization at Thor Solutions.",
      rating: 5,
      highlight: "Product Dev"
    },
    {
      name: "Parveen Jaiswal",
      role: "Web Developer, SpacePepper",
      image: praveenImg,
      testimonial: "As an MCD certified engineer, I attribute my career trajectory to the practical guidance from The Uniques Community. Their ecosystem truly transformed my passion into industry impact.",
      rating: 5,
      highlight: "MCD Certified"
    },
    {
      name: "Mantasha Tabassum",
      role: "Cloud Engineer, Caelius",
      image: mantashaImg,
      testimonial: "The Uniques gave me the confidence and AWS cloud expertise needed to architect scalable systems. The rigorous real-world curriculum made all the difference in my engineering journey.",
      rating: 5,
      highlight: "AWS Specialist"
    }
  ],
  faculty: [
    {
      name: "Dr. Rajesh Sharma",
      role: "Professor of Computer Science",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      testimonial: "The curriculum at The Uniques Community bridges academic theory with industry practice seamlessly. Our students who engage with their cohorts consistently excel in technical problem-solving.",
      rating: 5,
      highlight: "Curriculum"
    },
    {
      name: "Prof. Anita Desai",
      role: "Head of IT Department",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      testimonial: "I have witnessed an inspiring transformation in students participating in The Uniques programs. Their technical confidence, code quality, and collaboration skills show immense growth.",
      rating: 5,
      highlight: "Skill Growth"
    },
    {
      name: "Dr. Vikram Mehta",
      role: "Dean of Engineering",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      testimonial: "The Uniques Community's focus on project-driven learning complements our degree programs brilliantly. Their industry mentors provide students with priceless hands-on tech exposure.",
      rating: 5,
      highlight: "Industry Link"
    },
    {
      name: "Prof. Sunita Patel",
      role: "Director of Placements",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      testimonial: "Leading tech companies actively seek students trained by The Uniques Community. Their structured training significantly elevates campus placement records and career opportunities.",
      rating: 5,
      highlight: "Placements"
    }
  ],
  professionals: [
    {
      name: "Amit Kumar",
      role: "CTO, Caelius",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      testimonial: "Graduates from The Uniques Community join our teams with strong foundations in modern stacks and professional ethics. Their preparation clearly emphasizes solving real-world challenges.",
      rating: 5,
      highlight: "Team Ready"
    },
    {
      name: "Priya Sharma",
      role: "Engineering Manager, HCL GUVI",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      testimonial: "We have hired multiple engineers trained by The Uniques, and they consistently demonstrate strong coding standards, agile adaptability, and remarkable team-first problem solving.",
      rating: 5,
      highlight: "Top Talent"
    },
    {
      name: "Rahul Verma",
      role: "Lead Developer, Grazitti",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      testimonial: "The Uniques Community produces engineers who understand not just coding, but the entire software development lifecycle. That makes them immediate high-value contributors to our team.",
      rating: 5,
      highlight: "SDLC Experts"
    },
    {
      name: "Neha Gupta",
      role: "Hiring Manager, SALC",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      testimonial: "I am consistently impressed by candidates from The Uniques Community. They possess both deep technical excellence and the collaborative communication essential for modern engineering.",
      rating: 5,
      highlight: "All-Rounders"
    }
  ]
};

// Fallback avatar component with initials and brand styling to prevent broken image icons
const AvatarImage = ({ src, name }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "TU";

  if (hasError || !imgSrc) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-white bg-gradient-to-tr from-[#8B0000] to-[#ca0019] text-xs select-none">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={name}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
};

// Transition settings
const transitionSettings = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "40%" : "-40%",
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "40%" : "-40%",
    opacity: 0
  })
};

const TestimonialCard = ({ image, name, role, testimonial, rating = 5, highlight, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-[#1e1e1e] dark:bg-[#1e1e1e] rounded-2xl shadow-xl p-5 sm:p-6 lg:p-5 xl:p-6 border border-white/10 transition-all duration-300 flex flex-col justify-between h-full hover:border-[#ca0019]/40 hover:shadow-2xl"
    >
      {/* Top Header inside card: Quote Icon & Highlight Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div 
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md shrink-0"
          style={{ backgroundColor: `${colors.primaryLight}` }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" fill={colors.primary}/>
          </svg>
        </div>

        {highlight && (
          <span 
            className="py-0.5 px-2.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase shadow-sm shrink-0"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            {highlight}
          </span>
        )}
      </div>

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Star rating */}
          <div className="flex mb-2.5">
            {[...Array(rating || 5)].map((_, i) => (
              <Star key={i} style={{ color: '#FFD700', fontSize: '15px' }} />
            ))}
          </div>
          
          {/* Testimonial text with standardized container height */}
          <div className="min-h-[105px] sm:min-h-[115px] lg:min-h-[110px] xl:min-h-[105px] flex items-start mb-4">
            <p className="text-white text-xs sm:text-sm lg:text-[13px] xl:text-sm leading-relaxed font-normal">
              &ldquo;{testimonial}&rdquo;
            </p>
          </div>
        </div>

        {/* Author Details */}
        <div className="flex items-center pt-3.5 border-t border-white/10 mt-auto">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 shrink-0 ring-2 ring-[#ca0019]/30">
            <AvatarImage
              src={image}
              name={name}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white text-xs sm:text-sm truncate" style={{ color: '#ffffff' }}>
              {name}
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-400 truncate">
              {role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const sections = ['students', 'faculty', 'professionals'];
  const activeSection = sections[page % sections.length];
  
  const sectionIcons = {
    'students': <School fontSize="small" />,
    'faculty': <Work fontSize="small" />,
    'professionals': <Computer fontSize="small" />
  };
  
  const sectionDescriptions = {
    students: "Hear from our alumni who have successfully launched their careers through The Uniques Community",
    faculty: "Academic professionals share their insights on the impact of our program on students and institutions",
    professionals: "Industry leaders discuss the quality and preparedness of talent from The Uniques Community"
  };

  const sectionRef = useRef(null);

  const handleSectionChange = (index) => {
    if (!isAnimating && index !== page % sections.length) {
      setIsAnimating(true);
      setPage([index, index > page % sections.length ? 1 : -1]);
      setTimeout(() => setIsAnimating(false), 550);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative bg-gradient-to-b from-white to-gray-50 dark:bg-none dark:bg-transparent"
    >
      {/* Background decorative elements */}
      <div 
        className="absolute -top-40 -right-40 w-80 sm:w-96 h-80 sm:h-96 rounded-full opacity-5 pointer-events-none"
        style={{ backgroundColor: colors.primary }}
      />
      <div 
        className="absolute -bottom-40 -left-40 w-80 sm:w-96 h-80 sm:h-96 rounded-full opacity-5 pointer-events-none"
        style={{ backgroundColor: colors.dark }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span 
            className="inline-block py-1 px-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-3 shadow-xs uppercase" 
            style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
          >
            TESTIMONIALS
          </span>
          
          <AnimatePresence mode="wait">
            <motion.div key={activeSection + "title"}>
              <motion.h2
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={transitionSettings}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-slate-900 dark:text-white"
              >
                Testimonials from{" "}
                <span style={{ color: colors.primary }}>
                  {activeSection === 'students' ? 'Our Students' : 
                   activeSection === 'faculty' ? 'Faculty Members' : 'IT Professionals'}
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
                exit={{ y: -10, opacity: 0 }}
                transition={transitionSettings}
                className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 px-2"
              >
                {sectionDescriptions[activeSection]}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Responsive Grid Carousel with smooth horizontal bounds */}
        <div className="relative w-full overflow-hidden py-2 px-1">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transitionSettings}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch"
            >
              {testimonialData[activeSection].map((item, index) => (
                <TestimonialCard
                  key={`${activeSection}-${index}`}
                  image={item.image}
                  name={item.name}
                  role={item.role}
                  testimonial={item.testimonial}
                  rating={item.rating}
                  highlight={item.highlight}
                  delay={index * 0.08}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category selectors */}
        <div className="flex flex-col items-center mt-8 sm:mt-12 lg:mt-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {sections.map((section, index) => {
              const isActive = page % sections.length === index;
              return (
                <motion.button
                  key={section}
                  className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center justify-center transition-all text-xs sm:text-sm font-medium shadow-sm border border-transparent"
                  style={{
                    backgroundColor: isActive ? colors.primary : '#1e1e1e',
                    color: colors.light,
                    opacity: isActive ? 1 : 0.8,
                  }}
                  whileHover={{ scale: 1.04, opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSectionChange(index)}
                >
                  <span className="mr-1.5 sm:mr-2 flex items-center">
                    {sectionIcons[section]}
                  </span>
                  <span>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      className="ml-2 w-1.5 h-1.5 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center space-x-2.5 mt-5">
            {sections.map((section, index) => {
              const isActive = page % sections.length === index;
              return (
                <motion.button
                  key={`dot-${section}`}
                  aria-label={`Go to ${section} testimonials`}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all border-none focus:outline-none"
                  style={{ 
                    backgroundColor: isActive ? colors.primary : '#888888',
                    opacity: isActive ? 1 : 0.4
                  }}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => handleSectionChange(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
