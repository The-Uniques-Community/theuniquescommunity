import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  Cpu,
  Leaf,
  UsersRound,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useThemeContext } from "../../../../theme/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

const infraData = [
  {
    id: 1,
    number: "01.",
    url: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5D1y1o4fQ57NPj9YlOJCumqw8S4bfTIih3gXv",
    title: "Modern Workspaces",
    desc: "State-of-the-art office environments designed for maximum productivity and agile tech teams.",
    category: "Workspaces",
    tag: "Corporate Bay 01",
    badge: "100+ Workstations",
    icon: Building2,
    svgArt: (
      <svg className="w-48 h-48 opacity-30 text-emerald-300 stroke-current" fill="none" strokeWidth="1" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" rx="8" />
        <path d="M30 40h40M30 55h40M30 70h25" />
        <circle cx="70" cy="70" r="6" />
      </svg>
    ),
  },
  {
    id: 2,
    number: "02.",
    url: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5QYO1p4UA0Cpb4ysi61TzJLRaW735foPjv8GS",
    title: "Build the Strategy",
    desc: "Sustainable architecture meeting modern technology with solar energy and open green corridors.",
    category: "Eco-Campus",
    tag: "Green Zone",
    badge: "100% Solar Powered",
    icon: Leaf,
    svgArt: (
      <svg className="w-48 h-48 opacity-30 text-rose-300 stroke-current" fill="none" strokeWidth="1" viewBox="0 0 100 100">
        <rect x="40" y="20" width="20" height="15" rx="2" />
        <rect x="30" y="40" width="18" height="15" rx="2" />
        <rect x="52" y="40" width="18" height="15" rx="2" />
        <rect x="20" y="60" width="16" height="15" rx="2" />
        <rect x="42" y="60" width="16" height="15" rx="2" />
        <rect x="64" y="60" width="16" height="15" rx="2" />
      </svg>
    ),
  },
  {
    id: 3,
    number: "03.",
    url: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5XLjoIcBdwE1zgNU9nBLxO62lZYuAWsqiRGCt",
    title: "Innovation & R&D Hub",
    desc: "Where ideas transform into breakthrough reality through advanced testing rigs and AI hardware.",
    category: "R&D Labs",
    tag: "Lab Alpha",
    badge: "24/7 AI Hardware Access",
    icon: Cpu,
    svgArt: (
      <svg className="w-48 h-48 opacity-30 text-sky-300 stroke-current" fill="none" strokeWidth="1" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" />
        <path d="M50 20v60M20 50h60" />
        <circle cx="50" cy="50" r="10" />
      </svg>
    ),
  },
  {
    id: 4,
    number: "04.",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    title: "Collaborative Synergy",
    desc: "Open, flexible spaces that foster spontaneous brainstorming, code reviews, and team synergy.",
    category: "Collaborative",
    tag: "Synergy Pod",
    badge: "Interactive Touch Boards",
    icon: UsersRound,
    svgArt: (
      <svg className="w-48 h-48 opacity-30 text-amber-300 stroke-current" fill="none" strokeWidth="1" viewBox="0 0 100 100">
        <circle cx="35" cy="40" r="22" />
        <circle cx="65" cy="40" r="22" />
        <circle cx="50" cy="68" r="22" />
      </svg>
    ),
  },
  {
    id: 5,
    number: "05.",
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    title: "Architectural Excellence",
    desc: "A sprawling campus designed to inspire through thoughtful structural beauty and spatial flow.",
    category: "Workspaces",
    tag: "Main Atrium",
    badge: "50,000+ Sq Ft",
    icon: Building2,
    svgArt: (
      <svg className="w-48 h-48 opacity-30 text-purple-300 stroke-current" fill="none" strokeWidth="1" viewBox="0 0 100 100">
        <path d="M20 80 L50 20 L80 80 Z" />
        <path d="M32 80 L50 44 L68 80" />
        <path d="M42 80 L50 64 L58 80" />
      </svg>
    ),
  },
  {
    id: 6,
    number: "06.",
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80",
    title: "Premium Tech Lounges",
    desc: "Elegance meets high functionality in every corner, providing relaxing spaces between intense coding sprints.",
    category: "Tech Lounges",
    tag: "Lounge 304",
    badge: "Artisanal Coffee & Chill",
    icon: Building2,
    svgArt: (
      <svg className="w-48 h-48 opacity-30 text-rose-300 stroke-current" fill="none" strokeWidth="1" viewBox="0 0 100 100">
        <path d="M20 50 Q 35 20, 50 50 T 80 50" />
        <path d="M20 65 Q 35 35, 50 65 T 80 65" />
        <path d="M20 80 Q 35 50, 50 80 T 80 80" />
      </svg>
    ),
  },
];

const categories = ["All", "Workspaces", "R&D Labs", "Eco-Campus", "Collaborative", "Tech Lounges"];

const Infrastructure = () => {
  const { isDarkMode } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const touchStartX = useRef(0);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return infraData;
    return infraData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // GSAP ScrollTrigger Pinned Section setup for smooth page scroll integration
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const total = filteredItems.length;
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveIndex(idx);
        },
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [filteredItems]);

  // Mouse Wheel Scroll Interceptor:
  // Scroll Down -> Cards move one by one from right to left
  // Scroll Up -> Cards move one by one from left to right
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let isCooldown = false;

    const handleWheel = (e) => {
      if (isCooldown) return;
      if (Math.abs(e.deltaY) < 15) return;

      if (e.deltaY > 0 && activeIndex < filteredItems.length - 1) {
        e.preventDefault();
        isCooldown = true;
        setActiveIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
        setTimeout(() => {
          isCooldown = false;
        }, 350);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        e.preventDefault();
        isCooldown = true;
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        setTimeout(() => {
          isCooldown = false;
        }, 350);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeIndex, filteredItems.length]);

  // Touch swipe support for mobile/tablets
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0 && activeIndex < filteredItems.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (diffX < 0 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  const scrollToCard = (index) => {
    const targetIdx = Math.max(0, Math.min(index, filteredItems.length - 1));
    setActiveIndex(targetIdx);

    const triggers = ScrollTrigger.getAll();
    const currentTrigger = triggers.find((t) => t.trigger === sectionRef.current);
    if (currentTrigger && filteredItems.length > 1) {
      const progress = targetIdx / (filteredItems.length - 1);
      const targetScroll = currentTrigger.start + progress * (currentTrigger.end - currentTrigger.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handleNextCard = () => {
    scrollToCard((activeIndex + 1) % filteredItems.length);
  };

  const handlePrevCard = () => {
    scrollToCard((activeIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard arrow key controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNextCard();
      } else if (e.key === "ArrowLeft") {
        handlePrevCard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, filteredItems.length]);

  // Active category derived from currently focused card
  const currentActiveCategory = filteredItems[activeIndex]?.category || "All";

  // Compute exact horizontal offset for cards track: each card width (340px) + gap (24px) = 364px
  const trackTranslateX = -activeIndex * 364;

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[350vh] transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b0c10] text-white" : "bg-[#faf9f6] text-gray-900"
      }`}
    >
      {/* Pinned Sticky Viewport Container (100vh) */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-10 py-6">
        
        {/* Subtle Background Glow Orbs */}
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#ca0019]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-[92%] max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-20">
          
          {/* LEFT COLUMN (Fixed Pinned Content ~38%) */}
          <div className="w-full lg:w-[38%] flex flex-col justify-between shrink-0 space-y-6">
            <div>
              {/* Step Counter / Header Badge */}
              <div className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-3 flex items-center gap-2">
                <span className="text-[#ca0019] font-black">
                  {String(activeIndex + 1).padStart(2, "0")}/{String(filteredItems.length).padStart(2, "0")}
                </span>
                <span>•</span>
                <span>INFRASTRUCTURE</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4">
                From first conversation <br className="hidden sm:inline" />
                to <span className="text-[#ca0019]">closed case.</span>
              </h2>

              {/* Subheading Description */}
              <p
                className={`text-sm md:text-base leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Immerse yourself in our cutting-edge infrastructure designed to bridge academic learning with real-world tech leadership. Scroll to explore each space.
              </p>
            </div>

            {/* Category Filter / Step Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat || (selectedCategory === "All" && currentActiveCategory === cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      scrollToCard(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#ca0019] text-white shadow-md shadow-[#ca0019]/30 scale-105"
                        : isDarkMode
                        ? "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Primary Action CTA & Navigation Arrows */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                onClick={() => scrollToCard((activeIndex + 1) % filteredItems.length)}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#ca0019] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ca0019]/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>EXPLORE OPPORTUNITY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Circular Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCard}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "border-white/20 text-white hover:bg-white/10 active:scale-95"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm active:scale-95"
                  }`}
                  aria-label="Previous Card"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextCard}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "border-white/20 text-white hover:bg-white/10 active:scale-95"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm active:scale-95"
                  }`}
                  aria-label="Next Card"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Horizontal Card Track ~62%) */}
          <div className="w-full lg:w-[62%] overflow-hidden shrink-0 py-4 flex items-center">
            <div
              className="flex items-center gap-6 flex-nowrap w-max pr-16 will-change-transform transform-gpu"
              style={{
                transform: `translate3d(${trackTranslateX}px, 0, 0)`,
                transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {filteredItems.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => scrollToCard(idx)}
                    className={`relative w-[300px] sm:w-[340px] md:w-[360px] h-[450px] sm:h-[480px] shrink-0 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 border ${
                      isActive
                        ? "border-[#ca0019] scale-100 opacity-100 shadow-[#ca0019]/30"
                        : "border-white/15 scale-[0.96] opacity-75 hover:opacity-100 hover:scale-[0.98]"
                    } bg-black group`}
                  >
                    {/* BACKGROUND IMAGE WITH DARK OVERLAY */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Dark gradient overlay for readable white text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/80 transition-colors duration-500" />
                    </div>

                    {/* Top Header: Number Pill & Tag Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="w-11 h-11 rounded-full bg-white text-gray-950 font-black text-sm flex items-center justify-center shadow-lg tracking-tighter">
                        {item.number}
                      </div>

                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                        {item.tag}
                      </span>
                    </div>

                    {/* Center Line Art Graphic */}
                    <div className="relative z-10 my-auto flex items-center justify-center pointer-events-none">
                      {item.svgArt}
                    </div>

                    {/* Bottom Text Content */}
                    <div className="relative z-10 text-white">
                      <h3 className="text-xl md:text-2xl font-black mb-1.5 group-hover:text-red-400 transition-colors duration-300 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-normal opacity-90">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
