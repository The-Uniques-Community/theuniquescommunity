import React from 'react';
import visionImage from '/src/assets/img/About/VISION.png'; 
import { useThemeContext } from "@/theme/ThemeProvider";
import { ShieldCheck, Rocket, Zap, Users, Target, Globe, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

const MissionVission = () => {
  const { isDarkMode } = useThemeContext();

  const MissionData = [
    { 
      number: '01', 
      title: 'Mastering Technology', 
      description: 'Cultivating a deep understanding of cutting-edge technologies, empowering students to innovate beyond traditional academics.',
      icon: <Zap size={20} />
    },
    { 
      number: '02', 
      title: 'Building Future Innovators', 
      description: 'Nurturing a community of problem-solvers and tech enthusiasts who challenge norms and drive advancements.',
      icon: <Target size={20} />
    },
    { 
      number: '03', 
      title: 'Entrepreneurial Mindset', 
      description: 'Encouraging students to think beyond jobs and explore startups, turning ideas into real-world solutions.',
      icon: <Rocket size={20} />
    },
    { 
      number: '04', 
      title: 'Collaboration & Growth', 
      description: 'Fostering an ecosystem where like-minded individuals connect, collaborate, and grow together.',
      icon: <Users size={20} />
    }
  ];

  const VisionData = [
    { 
      number: '01', 
      title: 'Tech-Driven Excellence', 
      description: 'Creating a community where technical expertise is valued above rote academics, driving impact.',
      icon: <ShieldCheck size={20} />
    },
    { 
      number: '02', 
      title: 'Startup Culture', 
      description: 'Envisioning a future where members launch groundbreaking startups, disrupting industries.',
      icon: <Lightbulb size={20} />
    },
    { 
      number: '03', 
      title: 'Global Tech Impact', 
      description: 'Extending beyond boundaries to make a mark in the global tech ecosystem through innovation.',
      icon: <Globe size={20} />
    },
    { 
      number: '04', 
      title: 'Continuous Learning', 
      description: 'An ever-evolving learning journey, where adapting to new technologies is the standard.',
      icon: <BookOpen size={20} />
    }
  ];

  const listItemStyle = `group relative py-12 border-b ${isDarkMode ? 'border-white/10' : 'border-black/5'} transition-all duration-500 hover:pl-4`;

  return (
    <div className={`py-32 ${isDarkMode ? 'bg-[#161616] text-white' : 'bg-white text-gray-900'}`}>
      {/* PHILOSOPHY SECTION */}
      <div className="container max-w-7xl px-6 mx-auto mb-16">
        <div className="flex flex-col md:flex-row items-start gap-20">
          <div className="md:w-1/2 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-[1px] bg-[#ca0019]"></div>
              <span className="text-[#ca0019] text-sm font-bold tracking-[0.2em] uppercase">The Philosophy</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Principles <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ca0019] to-[#ff4d4d]">
                & Beliefs
              </span>
            </h2>
            
            <p className={`text-xl md:text-2xl leading-relaxed font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Batch Uniques is more than a community; it’s a technical movement. 
              We prioritize growth over grades, innovation over instruction, 
              and execution over theory.
            </p>
          </div>
          
          <div className="md:w-1/2 relative">
             <div className={`p-10 border-l-2 ${isDarkMode ? 'border-white/5' : 'border-black/5'} space-y-6`}>
                <p className={`text-lg italic font-serif ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "We are committed to fostering innovation, pushing boundaries, and creating a future filled with tech-driven startups and groundbreaking solutions."
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-[#ca0019]/10 flex items-center justify-center">
                      <ArrowRight size={16} className="text-[#ca0019]" />
                   </div>
                   <span className="font-bold text-sm">THE UNIQUES CORE</span>
                </div>
             </div>
             <img 
              className={`absolute -top-20 -right-20 w-80 opacity-5 pointer-events-none select-none`} 
              src={visionImage} 
              alt="" 
            />
          </div>
        </div>
      </div>

      {/* MISSION & VISION SECTIONS */}
      {[
        { title: 'Mission', data: MissionData, tag: 'The Driver' },
        { title: 'Vision', data: VisionData, tag: 'The Goal' }
      ].map((section, idx) => (
        <div key={idx} className="container max-w-7xl px-6 mx-auto mb-40">
          <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-32`}>
            <div className={`md:w-1/3 pt-4 ${idx % 2 !== 0 ? 'md:text-right' : ''}`}>
              <span className="text-[#ca0019] font-mono text-sm mb-4 block tracking-widest">{section.tag}</span>
              <h3 className="text-4xl md:text-6xl font-bold mb-6 italic">{section.title}</h3>
              <div className={`w-20 h-1 bg-[#ca0019] ${idx % 2 !== 0 ? 'ml-auto' : ''}`}></div>
            </div>

            <div className={`md:w-2/3 border-t-2 border-[#ca0019]`}>
              {section.data.map((item) => (
                <div key={item.number} className={listItemStyle}>
                   {/* Background Number */}
                   <span className={`absolute ${idx % 2 === 0 ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 text-8xl md:text-9xl font-black transition-all duration-700 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] ${idx % 2 === 0 ? 'group-hover:translate-x-4' : 'group-hover:-translate-x-4'}`}>
                      {item.number}
                   </span>

                   <div className={`relative z-10 flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center gap-6 md:gap-12`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} group-hover:bg-[#ca0019] group-hover:text-white transition-all duration-300`}>
                        {item.icon}
                      </div>
                      
                      <div className={`flex-1 ${idx % 2 !== 0 ? 'md:text-right' : ''}`}>
                        <h4 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#ca0019] transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.description}
                        </p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default MissionVission;

