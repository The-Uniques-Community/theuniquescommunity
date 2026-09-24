import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Code, Star, ChevronDown, Monitor, Terminal } from 'lucide-react';
import { useThemeContext } from '@/theme/ThemeProvider';
import { BASE_URL } from '@/config';

const batches = [
  "All Batches",
  "Uniques 1.0",
  "Uniques 2.0",
  "Uniques 3.0",
  "Uniques 4.0"
];

const TrainerCard = ({ trainer, isDarkMode }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -10 }}
      className={`relative h-full group transition-all duration-500 rounded-[2.5rem] p-px overflow-hidden ${
        isDarkMode 
        ? 'bg-gradient-to-br from-white/10 to-transparent' 
        : 'bg-gradient-to-br from-gray-200 to-transparent'
      }`}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(202,0,25,0.15),transparent_70%)]"></div>

      <div className={`relative h-full rounded-[2.4rem] p-8 flex flex-col z-10 ${
        isDarkMode 
        ? 'bg-[#0f0f0f]/90 backdrop-blur-2xl border border-white/5' 
        : 'bg-white/90 backdrop-blur-2xl border border-gray-100'
      }`}>
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="relative">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative w-24 h-24 rounded-3xl overflow-hidden border-2 border-[#ca0019]/30 p-1 bg-gradient-to-tr from-[#ca0019]/20 to-transparent"
            >
              <img 
                src={trainer.image} 
                alt={trainer.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
            {trainer.isIndustryPro && (
              <div className="absolute -top-2 -right-2 bg-[#ca0019] text-white p-1.5 rounded-xl shadow-lg rotate-12">
                <Star size={14} fill="currentColor" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
              {trainer.program}
            </div>
            <div className="flex gap-2">
              {trainer.social?.linkedin && (
                <a href={trainer.social.linkedin} target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 hover:bg-[#ca0019] text-white' : 'bg-gray-50 hover:bg-[#ca0019] hover:text-white text-gray-400'}`}>
                  <Linkedin size={18} />
                </a>
              )}
              {trainer.social?.github && (
                <a href={trainer.social.github} target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 hover:bg-black text-white' : 'bg-gray-50 hover:bg-black hover:text-white text-gray-400'}`}>
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-6">
          <h3 className={`text-2xl font-black tracking-tighter mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {trainer.name}
          </h3>
          <p className="text-[#ca0019] font-black text-xs uppercase tracking-[0.2em] mb-4">
            {trainer.position}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {trainer.expertise.map((tech, i) => (
              <span key={i} className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                isDarkMode 
                ? 'bg-white/5 border-white/5 text-gray-400 group-hover:border-[#ca0019]/30 group-hover:text-gray-300' 
                : 'bg-gray-50 border-gray-100 text-gray-500 group-hover:border-[#ca0019]/20'
              }`}>
                <div className="w-1 h-1 rounded-full bg-[#ca0019]"></div>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bio Section with Code Style */}
        <div className={`mt-auto relative p-5 rounded-3xl border transition-all duration-500 ${
          isDarkMode 
          ? 'bg-black/40 border-white/5 group-hover:border-[#ca0019]/20' 
          : 'bg-gray-50/50 border-gray-100'
        }`}>
          <Monitor size={40} className="absolute -bottom-2 -right-2 opacity-5 text-[#ca0019]" />
          <p className={`text-sm leading-relaxed relative z-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="text-[#ca0019] font-mono mr-2 opacity-50 font-bold">&gt;</span>
            {trainer.bio}
          </p>
        </div>

      </div>
    </motion.div>
  );
};

const Trainers = () => {
  const { isDarkMode } = useThemeContext();
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [isOpen, setIsOpen] = useState(false);

  const trainers = [
    {
      id: 1,
      name: "Viswanadh Rayavarapu",
      position: "Founder, Autobot Energy | Ex-meta",
      program: "Uniques 1.0",
      image: "https://media.licdn.com/dms/image/v2/C5603AQFdDBAD3h7VWQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1598468860624?e=1756339200&v=beta&t=_f2-EvKBeiQbz-6y2-NkAJa2UyCf5cqSsAjay0E4gP0",
      bio: "Viswanadh brings extensive expertise in Full stack development with experience at industry giants like Meta and Google.",
      expertise: ["Full Stack", "Web Development", "MERN"],
      social: { linkedin: "https://www.linkedin.com/in/viswanadh-rayavarapu/" },
      isIndustryPro: true
    },
    {
      id: 2,
      name: "Kapil Partap",
      position: "Business Head, MindCodeLab",
      program: "Uniques 1.0 & 2.0",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFNTzTH8mq59w/profile-displayphoto-shrink_800_800/B56ZRLIxkMG8Ag-/0/1736427379944?e=1756339200&v=beta&t=BjOb7ejzjeE1HjemF5YGaOIu3XGQeb_V_nq1aYFaUq0",
      bio: "Kapil specializes in ML, PowerBI and Full Stack Development, bringing business insights to technical training.",
      expertise: ["ML", "PowerBI", "Full Stack"],
      social: { linkedin: "https://www.linkedin.com/in/kapilpartap/" },
      isIndustryPro: true
    },
    {
      id: 3,
      name: "Nishant Singh",
      position: "Campus Tech Lead",
      program: "Uniques 3.0",
      image: `${BASE_URL}/api/image-proxy/1SH3BoI8y1FcIPnOq4--cwjLxAx_MxcWB`,
      bio: "Talented student mentor specializing in Adobe video editing suite, helping peers create professional-grade video content.",
      expertise: ["Adobe Premiere", "After Effects", "Video Editing"],
      social: { linkedin: "https://www.linkedin.com/in/nishant-singh-14769a208/" },
      isIndustryPro: false
    },
    {
      id: 4,
      name: "Mukul Tiwari",
      position: "UI/UX Ambassador",
      program: "Uniques 3.0",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFWOrm_F9Szrw/profile-displayphoto-shrink_800_800/B4EZZrad.nH0Ac-/0/1745558823405?e=1756339200&v=beta&t=B2-0DZI2kvC78ckfCaAu7_YND9U0DqVxx2PX-lj0Bvs",
      bio: "Emerging UI/UX talent focused on teaching Figma design principles and empowering fellow students with digital design skills.",
      expertise: ["Figma", "UI Design", "UX Research"],
      social: { linkedin: "https://www.linkedin.com/in/mukul-tiwari-4b07b829a/" },
      isIndustryPro: false
    },
    {
      id: 5,
      name: "Aryan Kamboj",
      position: "Frontend Champion",
      program: "Uniques 3.0",
      image: `${BASE_URL}/api/image-proxy/1qoV-I6YPWaKM-58pOrWhLRHX8KIsRKv0`,
      bio: "Rising talent in React ecosystem development with a passion for teaching fellow students modern frontend techniques.",
      expertise: ["React", "Next.js", "UI Architecture"],
      social: { linkedin: "https://www.linkedin.com/in/aryan-kammboz-110521252/" },
      isIndustryPro: false
    },
    {
      id: 6,
      name: "Riya Singh",
      position: "Programming Leader",
      program: "Uniques 4.0",
      image: `${BASE_URL}/api/image-proxy/1AhUVLUwrplop3WRvTsagm6aR6WPZaYOK`,
      bio: "Talented student mentor sharing practical C++ programming knowledge and fostering a collaborative learning environment.",
      expertise: ["C++", "STL", "Logic"],
      social: { linkedin: "https://www.linkedin.com/in/riya-singh-5b71b7248/" },
      isIndustryPro: false
    }
  ];

  const filteredTrainers = useMemo(() => {
    if (selectedBatch === "All Batches") return trainers;
    return trainers.filter(t => t.program.includes(selectedBatch));
  }, [selectedBatch]);

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
          <div className="relative z-50 min-w-[200px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full px-6 py-4 rounded-2xl border flex items-center justify-between font-black uppercase tracking-widest text-xs transition-all ${
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
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTrainers.map((trainer) => (
              <TrainerCard 
                key={trainer.id} 
                trainer={trainer} 
                isDarkMode={isDarkMode} 
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
    </section>
  );
};

export default Trainers;
