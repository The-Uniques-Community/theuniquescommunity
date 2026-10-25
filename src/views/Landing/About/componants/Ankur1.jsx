import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Briefcase, User2, Linkedin, Twitter, Mail, Instagram } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  React.useEffect(() => {
    if (!isOpen) return;

    if (window.lenis) {
      window.lenis.stop();
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        data-lenis-prevent="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl overflow-hidden relative w-[90%] max-w-6xl shadow-2xl my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-gray-100 transition-colors z-50 text-white md:text-gray-200 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </motion.div>
    </div>,
    document.body
  );
};

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${active
        ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const ProfileCard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStartup, setActiveStartup] = useState(2);

  const books = [
    {
      title: "The Art of Giving",
      cover: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumlhBlWJ7u4P3qMiabZeUz87wrEkVfCgNntQHS",
      description: "A comprehensive guide to navigating the digital age",
      link: "#"
    },
    {
      title: "Empowering Youth",
      cover: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumx3mamjn96rMwa3N4fR0hndkIVipFyKUB8bHc",
      description: "Essential strategies for building thriving communities",
      link: "#"
    },
    {
      title: "From Sacrifice to Success",
      cover: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumrJWVY51tqLi810a5BU7mZyDEfnuXpQgMYRIT",
      description: "Transforming education in the digital era",
      link: "#"
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {/* Profile Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-red-700 via-red-600 to-red-800 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
            <div className="relative w-40 md:w-48 flex-shrink-0">
              <motion.svg
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                width="100%"
                height="auto"
                viewBox="0 0 342 265"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
              >
                <defs>
                  <clipPath id="aboutClip">
                    <path d="M0 56V30C0 23.3726 5.37258 18 12 18H42C48.6274 18 54 23.3726 54 30V37C54 43.6274 59.3726 49 66 49H68C74.6274 49 80 43.6274 80 37V30C80 23.3726 85.3726 18 92 18H275C279.971 18 284 13.9706 284 9C284 4.02944 288.029 0 293 0H330C336.627 0 342 5.37258 342 12V79C342 85.6274 336.627 91 330 91H296C289.373 91 284 96.3726 284 103V167.5C284 169.985 286.015 172 288.5 172C290.985 172 293 169.985 293 167.5V151C293 144.373 298.373 139 305 139H330C336.627 139 342 144.373 342 151V181C342 187.627 336.627 193 330 193H304C297.925 193 293 197.925 293 204C293 210.075 297.925 215 304 215H330C336.627 215 342 220.373 342 227V253C342 259.627 336.627 265 330 265H305C298.373 265 293 259.627 293 253V232.5C293 230.015 290.985 228 288.5 228C286.015 228 284 230.015 284 232.5V253C284 259.627 278.627 265 272 265H92C85.3726 265 80 259.627 80 253V232C80 225.373 74.6274 220 68 220H35C28.3726 220 23 214.627 23 208V173.5C23 167.149 17.8513 162 11.5 162C5.14873 162 0 156.851 0 150.5V103C0 96.3726 5.37258 91 12 91H36.5C42.8513 91 48 85.8513 48 79.5C48 73.1487 42.8513 68 36.5 68H12C5.37258 68 0 62.6274 0 56Z" />
                  </clipPath>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <image
                  href="https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumGEtCTEIoeyaO1d7xYQMuBsK0zrR9WmSiLvEN"
                  width="342"
                  height="315"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#aboutClip)"
                  filter="url(#glow)"
                />
                <path
                  d="M0 56V30C0 23.3726 5.37258 18 12 18H42C48.6274 18 54 23.3726 54 30V37C54 43.6274 59.3726 49 66 49H68C74.6274 49 80 43.6274 80 37V30C80 23.3726 85.3726 18 92 18H275C279.971 18 284 13.9706 284 9C284 4.02944 288.029 0 293 0H330C336.627 0 342 5.37258 342 12V79C342 85.6274 336.627 91 330 91H296C289.373 91 284 96.3726 284 103V167.5C284 169.985 286.015 172 288.5 172C290.985 172 293 169.985 293 167.5V151C293 144.373 298.373 139 305 139H330C336.627 139 342 144.373 342 151V181C342 187.627 336.627 193 330 193H304C297.925 193 293 197.925 293 204C293 210.075 297.925 215 304 215H330C336.627 215 342 220.373 342 227V253C342 259.627 336.627 265 330 265H305C298.373 265 293 259.627 293 253V232.5C293 230.015 290.985 228 288.5 228C286.015 228 284 230.015 284 232.5V253C284 259.627 278.627 265 272 265H92C85.3726 265 80 259.627 80 253V232C80 225.373 74.6274 220 68 220H35C28.3726 220 23 214.627 23 208V173.5C23 167.149 17.8513 162 11.5 162C5.14873 162 0 156.851 0 150.5V103C0 96.3726 5.37258 91 12 91H36.5C42.8513 91 48 85.8513 48 79.5C48 73.1487 42.8513 68 36.5 68H12C5.37258 68 0 62.6274 0 56Z"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  fill="none"
                />
              </motion.svg>
            </div>

            <div className="text-white text-center md:text-left relative z-10 flex-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100">Er. Ankur Gill</h2>
                <p className="text-lg md:text-xl opacity-90 mb-4 font-light">Founder - The Uniques Community</p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {[
                    { Icon: Linkedin, label: 'LinkedIn' },
                    { Icon: Twitter, label: 'Twitter' },
                    { Icon: Instagram, label: 'Instagram' },
                    { Icon: Mail, label: 'Email' }
                  ].map(({ Icon, label }) => (
                    <motion.button
                      key={label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-white shadow-sm">
          <div className="flex gap-3 px-6 py-3">
            <TabButton
              active={activeTab === 'overview'}
              icon={User2}
              label="Overview"
              onClick={() => setActiveTab('overview')}
            />
            <TabButton
              active={activeTab === 'startups'}
              icon={Briefcase}
              label="Startups"
              onClick={() => setActiveTab('startups')}
            />
            <TabButton
              active={activeTab === 'books'}
              icon={Book}
              label="Books"
              onClick={() => setActiveTab('books')}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-100 p-6 md:p-8">
          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {/* Left Column: About and Vision */}
                    <div className="flex flex-col gap-6 justify-between">
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-600 flex-1 flex flex-col justify-center"
                      >
                        <h3 className="text-xl font-semibold mb-2.5 text-red-600">About</h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          A visionary entrepreneur and community builder with over a decade of experience
                          in digital transformation and education technology. Founded The Uniques Community
                          to empower the next generation of digital leaders.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-600 flex-1 flex flex-col justify-center"
                      >
                        <h3 className="text-xl font-semibold mb-2.5 text-red-600">Vision</h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          Dedicated to transforming the educational landscape through innovative digital
                          solutions and community-driven learning experiences. Committed to empowering
                          individuals to reach their full potential in the digital age.
                        </p>
                      </motion.div>
                    </div>

                    {/* Right Column: Achievements */}
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-600 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-red-600">Achievements</h3>
                        <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                          {[
                            '100+ Student Mentorship Programs',
                            '3 Successful Startups',
                            'Published Author',
                            'TEDx Speaker'
                          ].map((achievement, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + index * 0.08 }}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0"></div>
                              <span className="font-medium text-gray-700">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'startups' && (
                <motion.div
                  key="startups"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3.5">
                      {[
                        {
                          id: 1,
                          name: "godigitify Nexus",
                          description: "A company providing innovative digital solutions to transform businesses.",
                          image: "https://www.theuniques.in/assets/12-4C_l7pvM.webp"
                        },
                        {
                          id: 2,
                          name: "Techlearns Academy",
                          description: "A startup dedicated to enhancing student careers through innovative learning solutions.",
                          image: "https://www.babushahi.com/upload/image/resized_550x410_under_150kb(20260917-101958).jpg"
                        },
                        {
                          id: 3,
                          name: "Click Master",
                          description: "A startup empowering local photographers to showcase their creativity and grow their business.",
                          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQfMaGoE5f9m0mAd0lIt5pR4F49iRRAG6WSyBjnUVPw&s"
                        }
                      ].map((startup) => (
                        <motion.div
                          key={startup.id}
                          whileHover={{ scale: 1.01 }}
                          className={`p-4 rounded-xl transition-all cursor-pointer ${activeStartup === startup.id
                              ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md'
                              : 'bg-white hover:bg-gray-50 shadow-sm'
                            }`}
                          onClick={() => setActiveStartup(startup.id)}
                        >
                          <h3 className="text-base font-semibold mb-1">{startup.name}</h3>
                          <p className={`text-sm ${activeStartup === startup.id ? 'text-red-100' : 'text-gray-600'}`}>
                            {startup.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl overflow-hidden shadow-xl h-[260px] md:h-[280px]"
                      >
                        <img
                          src={[
                            "https://www.theuniques.in/assets/12-4C_l7pvM.webp",
                            "https://www.babushahi.com/upload/image/resized_550x410_under_150kb(20260917-101958).jpg",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQfMaGoE5f9m0mAd0lIt5pR4F49iRRAG6WSyBjnUVPw&s"
                          ][activeStartup - 1]}
                          alt="Startup"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'books' && (
                <motion.div
                  key="books"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {books.map((book, index) => (
                    <motion.div
                      key={book.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-white rounded-xl overflow-hidden group hover:shadow-xl transition-all flex flex-col justify-between shadow-md"
                    >
                      <div className="relative h-36 md:h-40">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-base font-semibold">{book.title}</h3>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-1">
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{book.description}</p>
                        <motion.a
                          href={book.link}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:shadow-md transition-all self-start"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileCard;
