import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Code, ChevronDown, Monitor, Terminal, X, ArrowRight } from 'lucide-react';
import { useThemeContext } from '@/theme/ThemeProvider';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { getStoredBatches, fetchBatches } from '@/utils/batch/batchesData';
import ronitImg from "@/assets/img/Success Stories avatars/ronit-jaiprakash.webp";
import mantashaImg from "@/assets/img/Success Stories avatars/mantasha-tabassum.webp";
import taniyaImg from "@/assets/img/Success Stories avatars/Taniya_singh.webp";

const DEFAULT_TRAINERS = [
  {
    id: 1,
    name: "Ronit Jaiprakash",
    position: "Solution Consultant @ Caelius Consulting",
    program: "Uniques 1.0",
    course: "Cloud Architecture & Full Stack",
    image: ronitImg,
    bio: "Solution Consultant & Technical Associate at Caelius Consulting, Full Stack Developer at Godigitify, and Instructor at Techlearns. Passionate about designing scalable cloud applications, distributed systems, and coaching future software engineers in modern technology stacks.",
    expertise: ["Solution Consultant", "Full Stack Developer", "Technical Associate", "Cloud Architecture", "System Design", "Node.js", "React", "AWS"],
    social: { linkedin: "https://www.linkedin.com/in/ronit-jaiprakash/" },
    isIndustryPro: true
  },
  {
    id: 2,
    name: "Mantasha Tabassum",
    position: "Solution Consultant @ Caelius Consulting",
    program: "Uniques 1.0",
    course: "MuleSoft Integration & AI Workflows",
    image: mantashaImg,
    bio: "Solution Consultant @ Caelius Consulting, connecting MuleSoft, AI and end systems for seamless workflows, technical trainer, application developer. Experienced in designing enterprise integrations and guiding students through modern enterprise stacks.",
    expertise: ["MuleSoft & AI", "Technical Trainer", "App Developer", "API Integration", "Enterprise Systems", "Java", "Salesforce", "Cloud Workflows"],
    social: { linkedin: "https://www.linkedin.com/in/mantasha-tabassum/" },
    isIndustryPro: true
  },
  {
    id: 3,
    name: "Nishant Singh",
    position: "Campus Tech Lead",
    program: "Uniques 3.0",
    course: "Video Editing & Motion Graphics",
    image: `${BASE_URL}/api/image-proxy/1SH3BoI8y1FcIPnOq4--cwjLxAx_MxcWB`,
    bio: "Talented student mentor specializing in Adobe video editing suite, helping peers create professional-grade video content. Dedicated to nurturing visual storytelling, post-production workflows, and creative media production.",
    expertise: ["Adobe Premiere", "After Effects", "Video Editing", "Motion Graphics", "Content Strategy", "Color Grading", "Visual Storytelling", "Sound Design"],
    social: { linkedin: "https://www.linkedin.com/in/nishant-singh-14769a208/" },
    isIndustryPro: false
  },
  {
    id: 4,
    name: "Taniya Singh",
    position: "Technical Associate @ Caelius Consulting",
    program: "Uniques 2.0",
    course: "UI/UX & Frontend Architecture",
    image: taniyaImg,
    bio: "Technical Associate @ Caelius Consulting, web developer, graphic designer. Focused on building intuitive user interfaces, modern frontend architectures, and coaching students on design systems and UI/UX design.",
    expertise: ["Web Development", "Graphic Design", "UI/UX", "Figma", "Frontend Architecture", "Brand Identity", "Design Systems", "Prototyping"],
    social: { linkedin: "https://www.linkedin.com/in/taniya-singh/" },
    isIndustryPro: true
  },
  {
    id: 5,
    name: "Aryan Kamboj",
    position: "Frontend Champion",
    program: "Uniques 3.0",
    course: "Modern React Ecosystem",
    image: `${BASE_URL}/api/image-proxy/1qoV-I6YPWaKM-58pOrWhLRHX8KIsRKv0`,
    bio: "Rising talent in React ecosystem development with a passion for teaching fellow students modern frontend techniques, responsive component patterns, and state-of-the-art web applications.",
    expertise: ["React", "Next.js", "UI Architecture", "TypeScript", "Tailwind CSS", "State Management", "Redux", "REST APIs"],
    social: { linkedin: "https://www.linkedin.com/in/aryan-kammboz-110521252/" },
    isIndustryPro: false
  },
  {
    id: 6,
    name: "Riya Singh",
    position: "Programming Leader",
    program: "Uniques 4.0",
    course: "C++ & Data Structures",
    image: `${BASE_URL}/api/image-proxy/1AhUVLUwrplop3WRvTsagm6aR6WPZaYOK`,
    bio: "Talented student mentor sharing practical C++ programming knowledge, data structures, algorithms, and fostering a collaborative learning environment for aspiring software developers.",
    expertise: ["C++", "STL", "Logic Building", "Data Structures", "Algorithms", "Competitive Programming", "Problem Solving", "System Concepts"],
    social: { linkedin: "https://www.linkedin.com/in/riya-singh-5b71b7248/" },
    isIndustryPro: false
  }
];

const TrainerModal = ({ trainer, isOpen, onClose, isDarkMode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !trainer) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container: centered, scale only, no bottom translation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.25, bounce: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl max-h-[88vh] sm:max-h-[85vh] my-auto flex flex-col rounded-3xl z-10 shadow-2xl overflow-hidden transition-all ${
              isDarkMode
                ? 'bg-[#111111] border border-white/10 text-white shadow-black/90'
                : 'bg-white border border-gray-100 text-gray-900 shadow-2xl'
            }`}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#ca0019]/10 blur-3xl pointer-events-none -z-0" />

            {/* Pinned Header */}
            <div className={`p-5 sm:p-6 pb-4 flex-shrink-0 flex items-start justify-between gap-4 border-b relative z-10 ${
              isDarkMode ? 'border-white/5 bg-[#111111]/95' : 'border-gray-100 bg-white/95'
            }`}>
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#ca0019]/40 p-1 bg-gradient-to-tr from-[#ca0019]/25 to-transparent flex-shrink-0">
                  <img
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'
                    }`}>
                      {trainer.program}
                    </span>
                    {trainer.isIndustryPro && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#ca0019]/15 border border-[#ca0019]/30 text-[#ca0019]">
                        Industry Pro
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug truncate ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {trainer.name}
                  </h3>

                  <p className="text-[#ca0019] font-black text-xs uppercase tracking-[0.16em] truncate">
                    {trainer.position}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black'
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body: All content fully accessible without truncation */}
            <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5 relative z-10">
              {/* Badges & Social Links */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  {trainer.course && (
                    <span className={`px-3 py-1 rounded-xl font-semibold border ${
                      isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}>
                      <strong className="text-[#ca0019]">Track:</strong> {trainer.course}
                    </span>
                  )}
                  {trainer.trainerBatch && (
                    <span className={`px-3 py-1 rounded-xl font-semibold border ${
                      isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}>
                      <strong className="text-[#ca0019]">Alum:</strong> {trainer.trainerBatch}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {trainer.social?.linkedin && (
                    <a
                      href={trainer.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isDarkMode
                          ? 'bg-white/5 hover:bg-[#ca0019] text-gray-200 hover:text-white'
                          : 'bg-gray-100 hover:bg-[#ca0019] text-gray-700 hover:text-white'
                      }`}
                    >
                      <Linkedin size={14} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {trainer.social?.github && (
                    <a
                      href={trainer.social.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isDarkMode
                          ? 'bg-white/5 hover:bg-black text-gray-200 hover:text-white'
                          : 'bg-gray-100 hover:bg-black text-gray-700 hover:text-white'
                      }`}
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Complete Skills Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code size={16} className="text-[#ca0019]" />
                  <h4 className={`text-xs font-black uppercase tracking-[0.18em] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    All Skills & Expertise
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ca0019]/10 text-[#ca0019]">
                    {(trainer.expertise || []).length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(trainer.expertise || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 text-gray-300'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ca0019]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Description / Bio Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={16} className="text-[#ca0019]" />
                  <h4 className={`text-xs font-black uppercase tracking-[0.18em] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Complete Biography & Details
                  </h4>
                </div>

                <div className={`relative p-5 sm:p-6 rounded-2xl border ${
                  isDarkMode ? 'bg-black/50 border-white/5' : 'bg-gray-50/70 border-gray-100'
                }`}>
                  <Monitor size={48} className="absolute -bottom-2 -right-2 opacity-5 text-[#ca0019] pointer-events-none" />
                  <p className={`text-sm leading-relaxed relative z-10 whitespace-pre-line ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className="text-[#ca0019] font-mono mr-2 font-bold opacity-60">&gt;</span>
                    {trainer.bio || "Dedicated mentor empowering students in modern technologies."}
                  </p>
                </div>
              </div>
            </div>

            {/* Pinned Footer */}
            <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 relative z-10 ${
              isDarkMode ? 'border-white/5 bg-[#111111]/95' : 'border-gray-100 bg-white/95'
            }`}>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {trainer.program}
              </span>
              <div className="flex items-center gap-2">
                {trainer.social?.linkedin && (
                  <a
                    href={trainer.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#ca0019] text-white hover:bg-[#b00016] transition-all inline-flex items-center gap-1.5"
                  >
                    <Linkedin size={13} />
                    <span>Connect</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

const TrainerCard = ({ trainer, isDarkMode, onOpenModal }) => {
  const MAX_SKILLS = 4;
  const allSkills = trainer.expertise || [];
  const visibleSkills = allSkills.slice(0, MAX_SKILLS);
  const remainingSkillsCount = allSkills.length - MAX_SKILLS;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      className={`relative h-full group transition-all duration-300 rounded-[2rem] p-px overflow-hidden ${
        isDarkMode 
        ? 'bg-gradient-to-br from-white/10 to-transparent' 
        : 'bg-gradient-to-br from-gray-200 to-transparent'
      }`}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(202,0,25,0.15),transparent_70%)] pointer-events-none" />

      <div className={`relative h-full rounded-[1.95rem] p-5 sm:p-6 flex flex-col z-10 ${
        isDarkMode 
        ? 'bg-[#0f0f0f]/90 backdrop-blur-2xl border border-white/5' 
        : 'bg-white/90 backdrop-blur-2xl border border-gray-100 shadow-sm'
      }`}>
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <motion.div 
              whileHover={{ rotate: 4, scale: 1.05 }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#ca0019]/30 p-1 bg-gradient-to-tr from-[#ca0019]/20 to-transparent flex-shrink-0"
            >
              <img 
                src={trainer.image || "/placeholder.svg"} 
                alt={trainer.name}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
              isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'
            }`}>
              {trainer.program}
            </div>
            <div className="flex gap-1.5">
              {trainer.social?.linkedin && (
                <a 
                  href={trainer.social.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isDarkMode ? 'bg-white/5 hover:bg-[#ca0019] text-white' : 'bg-gray-50 hover:bg-[#ca0019] hover:text-white text-gray-500 border border-gray-100'
                  }`}
                  title="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              )}
              {trainer.social?.github && (
                <a 
                  href={trainer.social.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isDarkMode ? 'bg-white/5 hover:bg-black text-white' : 'bg-gray-50 hover:bg-black hover:text-white text-gray-500 border border-gray-100'
                  }`}
                  title="GitHub"
                >
                  <Github size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-4">
          <h3 className={`text-xl font-black tracking-tight mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {trainer.name}
          </h3>
          <p className="text-[#ca0019] font-black text-xs uppercase tracking-[0.16em] mb-3 line-clamp-1">
            {trainer.position}
          </p>
          
          {/* Skills Tags (Only 4-5 tags with Read More button to reveal remaining skills) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleSkills.map((tech, i) => (
              <span key={i} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold border transition-colors ${
                isDarkMode 
                ? 'bg-white/5 border-white/5 text-gray-400 group-hover:border-[#ca0019]/30 group-hover:text-gray-300' 
                : 'bg-gray-50 border-gray-100 text-gray-600 group-hover:border-[#ca0019]/20'
              }`}>
                <div className="w-1 h-1 rounded-full bg-[#ca0019]" />
                {tech}
              </span>
            ))}

            {remainingSkillsCount > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(trainer);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold border transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#ca0019]/15 border-[#ca0019]/40 text-[#ca0019] hover:bg-[#ca0019]/25 hover:border-[#ca0019]/60' 
                    : 'bg-red-50 border-red-200 text-[#ca0019] hover:bg-red-100 hover:border-red-300'
                }`}
                title="View all skills"
              >
                +{remainingSkillsCount} Read More
              </button>
            )}
          </div>
        </div>

        {/* Bio Section with Code Style (Truncated to 3-4 lines with Read More option) */}
        <div className={`mt-auto relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 ${
          isDarkMode 
          ? 'bg-black/40 border-white/5 group-hover:border-[#ca0019]/20' 
          : 'bg-gray-50/70 border-gray-100'
        }`}>
          <Monitor size={32} className="absolute -bottom-1 -right-1 opacity-5 text-[#ca0019] pointer-events-none" />
          <p 
            className={`text-xs sm:text-[13px] leading-relaxed relative z-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            <span className="text-[#ca0019] font-mono mr-1.5 opacity-60 font-bold">&gt;</span>
            {trainer.bio || "Dedicated mentor empowering students in modern technologies."}
          </p>

          <div className="mt-2.5 pt-2 border-t border-dashed flex justify-between items-center relative z-10 border-black/5 dark:border-white/5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(trainer);
              }}
              className="text-[11px] font-black text-[#ca0019] hover:text-[#b00016] inline-flex items-center gap-1 uppercase tracking-wider transition-colors cursor-pointer group/btn"
            >
              <span>Read More</span>
              <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
            </button>
            <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Full Details
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const Trainers = () => {
  const { isDarkMode } = useThemeContext();
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [isOpen, setIsOpen] = useState(false);
  const [trainers, setTrainers] = useState(DEFAULT_TRAINERS);
  const [storedBatches, setStoredBatches] = useState(() => getStoredBatches());
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrainer(null);
  };

  useEffect(() => {
    fetchBatches().then((b) => {
      if (b && Array.isArray(b)) setStoredBatches(b);
    });

    const loadTrainers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/trainers/all-trainers`);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const formatted = response.data.map((t, idx) => {
            let imageSrc = "/placeholder.svg";
            if (t.profilePic) {
              const fileId = t.profilePic.fileId || (typeof t.profilePic === "string" ? t.profilePic : null);
              if (fileId) {
                imageSrc = `${BASE_URL}/api/image-proxy/${fileId}`;
              }
            } else if (t.image) {
              imageSrc = t.image;
            }

            // Parse skills whether array, comma string, or mixed
            let skillsList = [];
            if (Array.isArray(t.skills)) {
              skillsList = t.skills.flatMap(s => (typeof s === 'string' ? s.split(',') : s)).map(s => String(s).trim()).filter(Boolean);
            } else if (typeof t.skills === 'string' && t.skills.trim()) {
              skillsList = t.skills.split(',').map(s => s.trim()).filter(Boolean);
            } else if (Array.isArray(t.expertise)) {
              skillsList = t.expertise.flatMap(s => (typeof s === 'string' ? s.split(',') : s)).map(s => String(s).trim()).filter(Boolean);
            } else if (typeof t.expertise === 'string' && t.expertise.trim()) {
              skillsList = t.expertise.split(',').map(s => s.trim()).filter(Boolean);
            }

            if (t.course && !skillsList.some(s => s.toLowerCase() === t.course.toLowerCase())) {
              skillsList.push(t.course);
            }
            if (skillsList.length === 0) {
              skillsList = ["Tech Mentor"];
            }

            const teachingBatch = t.teachingBatch || t.batch || "The Uniques Community";
            const trainerBatch = t.trainerBatch || "";
            const designation = t.designation || t.position || (t.course ? `${t.course} Mentor` : "Technical Trainer");

            return {
              id: t._id || t.id || idx + 1,
              name: t.fullName || t.name || "Trainer",
              position: designation,
              program: teachingBatch,
              teachingBatch,
              trainerBatch,
              course: t.course || "",
              email: t.email || "",
              contact: t.contact || "",
              image: imageSrc,
              bio: t.bio || t.description || "Passionate trainer shaping the future tech leaders.",
              expertise: skillsList,
              social: {
                linkedin: t.linkedinProfile || t.linkedin || t.social?.linkedin || "",
                github: t.githubProfile || t.github || t.social?.github || "",
              },
              isIndustryPro: Boolean(t.isIndustryPro || t.isTrainer || t.origin === 'external'),
            };
          });
          setTrainers(formatted);
        }
      } catch (err) {
        console.warn("Using default trainers list:", err?.message || err);
      }
    };

    loadTrainers();
  }, []);

  const batches = useMemo(() => {
    const list = storedBatches.map((b) => b.replace(/^The\s+/i, ""));
    const uniqueBatches = Array.from(new Set(["All Batches", ...list]));
    return uniqueBatches;
  }, [storedBatches]);

  const filteredTrainers = useMemo(() => {
    if (selectedBatch === "All Batches") return trainers;
    const cleanSelected = selectedBatch.replace(/^The\s+/i, "").toLowerCase();
    return trainers.filter(t => {
      const prog = (t.program || "").replace(/^The\s+/i, "").toLowerCase();
      return prog.includes(cleanSelected) || cleanSelected.includes(prog);
    });
  }, [selectedBatch, trainers]);

  return (
    <section className={`py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ca0019]/10 rounded-full mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#ca0019] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ca0019]">
                Expert Trainers
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
              Learn from <br /> <span className="text-[#ca0019]">Industry Pros</span>
            </h2>
            <p className={`text-xl font-medium leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Our unique blend of experienced professionals and student mentors creates a dynamic learning environment.
            </p>
          </div>

          {/* Custom Dropdown */}
          <div className="relative z-40 min-w-[200px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full px-6 py-4 rounded-2xl border flex items-center justify-between font-black uppercase tracking-widest text-xs transition-all cursor-pointer ${
                isDarkMode 
                ? 'bg-[#1e1e1e] border-white/10 text-white' 
                : 'bg-white border-gray-200 text-gray-900 shadow-lg'
              }`}
            >
              {selectedBatch}
              <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={16} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border z-50 shadow-2xl ${
                    isDarkMode ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-gray-200'
                  }`}
                >
                  {batches.map((batch) => (
                    <button
                      key={batch}
                      onClick={() => {
                        setSelectedBatch(batch);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                        selectedBatch === batch 
                        ? 'bg-[#ca0019] text-white' 
                        : isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {batch}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Trainers Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTrainers.map((trainer) => (
              <TrainerCard 
                key={trainer.id} 
                trainer={trainer} 
                isDarkMode={isDarkMode} 
                onOpenModal={handleOpenModal}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTrainers.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-black text-gray-500 uppercase tracking-widest">No Trainers Found in this Batch</h3>
          </div>
        )}
      </div>

      {/* Details Popup / Modal */}
      <TrainerModal
        trainer={selectedTrainer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};

export default Trainers;
