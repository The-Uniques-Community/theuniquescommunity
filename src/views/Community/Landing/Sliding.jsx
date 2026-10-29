/**
 * @file Sliding.jsx
 * @description Vertical sliding accordion showcase for community ambassador benefits.
 * Features keyboard-accessible expandable cards with upward/downward navigation,
 * pagination pills, and responsive light/dark styling.
 *
 * @architecture
 * - Part of the Community Landing feature cluster (`views/Community/Landing/`).
 * - Encapsulates `BenefitCard` item component and main `Sliding` orchestrator.
 * - Styled via Tailwind CSS and `premium_sliding.css`.
 *
 * @agent_note
 * Cards maintain active state highlight with brand border `#ca0019`.
 */

import React, { useState, useEffect, useRef } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import tu_red from "@/assets/logos/tu-red.png"
import { useThemeContext } from "@/theme/ThemeProvider"
import "./premium_sliding.css"

const cardData = [
  { 
    title: "Expand Your Community", 
    description: "Kickstart a student club at your university, collaborating with university officials and forming a dedicated core team." 
  },
  { 
    title: "Engaging Workshops", 
    description: "Organize interactive workshops to help students explore various developer tools and platforms." 
  },
  { 
    title: "Lead Project Development", 
    description: "Collaborate with local organizations to identify project opportunities and spearhead impactful community projects." 
  },
  { 
    title: "Professional Growth", 
    description: "Gain access to community management training, technical insights, and exclusive industry events." 
  },
  { 
    title: "Expand Your Network", 
    description: "Connect with student leaders, industry professionals, and experienced mentors in a thriving global community." 
  },
  { 
    title: "Community Empowerment", 
    description: "Receive dedicated support and resources to educate and expand your community both online and offline." 
  },
]

const BenefitCard = ({ title, description, isActive, isDarkMode, height, onClick }) => {
  return (
    <div 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={`group relative w-full rounded-2xl p-3.5 sm:p-4 md:p-4.5 transition-all duration-300 cursor-pointer select-none flex flex-col justify-center ${
        isActive
          ? isDarkMode
            ? 'bg-[#18181b] border-2 border-[#ca0019] shadow-[0_10px_25px_-5px_rgba(202,0,25,0.3)] ring-1 ring-[#ca0019]/30'
            : 'bg-white border-2 border-[#ca0019] shadow-[0_10px_25px_-5px_rgba(202,0,25,0.15),0_4px_12px_rgba(0,0,0,0.04)] ring-1 ring-[#ca0019]/20'
          : isDarkMode
            ? 'bg-[#141416]/95 hover:bg-[#18181b] border border-neutral-800 hover:border-neutral-700 shadow-none'
            : 'bg-slate-50/90 hover:bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md'
      }`}
      style={{ height: `${height}px` }}
    >
      <div className="flex items-start gap-3 sm:gap-3.5">
        {/* Brand Logo Badge */}
        <div 
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 overflow-hidden ${
            isActive
              ? 'bg-black text-white shadow-md shadow-red-950/20 ring-2 ring-[#ca0019]/40'
              : isDarkMode
                ? 'bg-[#202024] border border-white/10'
                : 'bg-black/90 shadow-xs'
          }`}
        >
          <img 
            className="w-5 h-5 object-contain" 
            src={tu_red || "/placeholder.svg"} 
            alt="The Uniques Logo" 
          />
        </div>

        {/* Card Content */}
        <div className="flex-1 min-w-0">
          <h3 
            className={`text-[13.5px] xs:text-[14px] sm:text-[15px] font-bold tracking-tight leading-snug transition-colors duration-200 ${
              isActive 
                ? (isDarkMode ? 'text-white' : 'text-gray-900') 
                : (isDarkMode ? 'text-gray-200' : 'text-gray-800')
            }`}
          >
            {title}
          </h3>

          <div 
            className={`h-[2px] rounded-full my-1 sm:my-1.5 transition-all duration-300 ${
              isActive ? 'w-8 bg-[#ca0019]' : 'w-5 bg-gray-200 dark:bg-neutral-700'
            }`}
          />

          <p 
            className={`text-[11px] xs:text-[11.5px] sm:text-[12px] md:text-[12.5px] leading-[1.42] sm:leading-[1.48] transition-colors duration-200 text-left ${
              isActive
                ? (isDarkMode ? 'text-gray-300' : 'text-gray-600')
                : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SplitLayout() {
  const { isDarkMode } = useThemeContext()
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartY = useRef(null)

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(cardData.length - 1, prev + 1))
  }

  const CARD_HEIGHT = 138
  const GAP = 12
  const containerHeight = CARD_HEIGHT * 2 + GAP

  // Keep track bounded so two full cards are always cleanly visible in the container
  const scrollIndex = Math.min(activeIndex, cardData.length - 2)
  const trackOffsetY = scrollIndex * (CARD_HEIGHT + GAP)

  // Touch swipe gesture support for mobile devices
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const diffY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(diffY) > 35) {
      if (diffY > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    touchStartY.current = null
  }

  return (
    <section 
      className={`relative transition-colors duration-700 py-6 sm:py-8 md:py-10 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      <div className="container mx-auto flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 lg:px-12 items-center justify-center">
        
        {/* Left section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-1 sm:py-3 md:py-4">
          <div className="space-y-1.5 sm:space-y-3 md:space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight sm:tracking-tighter">
              Join <span className="text-[#ca0019]">The Uniques Community</span> Today!
            </h1>
            <p className={`text-xs sm:text-base md:text-lg lg:text-xl max-w-lg font-medium leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Become an ambassador and lead a thriving community while gaining invaluable experience and networking opportunities.
            </p>
          </div>

          <div className="mt-3 sm:mt-5 md:mt-7 grid grid-cols-3 gap-2 sm:gap-6 md:gap-8">
            <div className="stat-item">
              <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-[#ca0019]">500+</h3>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-[9px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest mt-0.5 sm:mt-1`}>Ambassadors</p>
            </div>
            <div className="stat-item">
              <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-[#ca0019]">100+</h3>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-[9px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest mt-0.5 sm:mt-1`}>Workshops</p>
            </div>
            <div className="stat-item">
              <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-[#ca0019]">4.9</h3>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-[9px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest mt-0.5 sm:mt-1`}>Rating</p>
            </div>
          </div>
        </div>

        {/* Right section - Overlapping Card Stack with side navigation arrows */}
        <div 
          className="w-full md:w-1/2 flex flex-col items-center justify-center min-w-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4 w-full">
            {/* Card Deck Viewport */}
            <div 
              className="relative flex-1 max-w-[340px] xs:max-w-[370px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px] overflow-hidden rounded-2xl"
              style={{
                height: `${containerHeight}px`,
              }}
            >
              <div 
                className="flex flex-col will-change-transform"
                style={{
                  transform: `translate3d(0, -${trackOffsetY}px, 0)`,
                  gap: `${GAP}px`,
                  transition: "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {cardData.map((card, index) => {
                  const isActive = index === activeIndex
                  return (
                    <BenefitCard
                      key={card.title}
                      title={card.title}
                      description={card.description}
                      isActive={isActive}
                      isDarkMode={isDarkMode}
                      height={CARD_HEIGHT}
                      onClick={() => setActiveIndex(index)}
                    />
                  )
                })}
              </div>
            </div>

            {/* Subtle Vertical Side Navigation Arrows */}
            <div 
              className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 flex-shrink-0 z-30" 
              aria-label="Card navigation controls"
            >
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous card"
                title="Previous card"
                className={`group flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ca0019] ${
                  activeIndex === 0
                    ? 'opacity-30 cursor-not-allowed border-gray-200 dark:border-neutral-800 text-gray-400 dark:text-neutral-600 bg-gray-50/50 dark:bg-neutral-900/30'
                    : isDarkMode
                      ? 'bg-[#18181b] hover:bg-[#232328] border-neutral-700/80 text-gray-300 hover:text-[#ca0019] shadow-sm hover:shadow active:scale-95 cursor-pointer'
                      : 'bg-white hover:bg-slate-50 border-gray-200 text-gray-700 hover:text-[#ca0019] shadow-sm hover:shadow active:scale-95 cursor-pointer'
                }`}
              >
                <ChevronUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === cardData.length - 1}
                aria-label="Next card"
                title="Next card"
                className={`group flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ca0019] ${
                  activeIndex === cardData.length - 1
                    ? 'opacity-30 cursor-not-allowed border-gray-200 dark:border-neutral-800 text-gray-400 dark:text-neutral-600 bg-gray-50/50 dark:bg-neutral-900/30'
                    : isDarkMode
                      ? 'bg-[#18181b] hover:bg-[#232328] border-neutral-700/80 text-gray-300 hover:text-[#ca0019] shadow-sm hover:shadow active:scale-95 cursor-pointer'
                      : 'bg-white hover:bg-slate-50 border-gray-200 text-gray-700 hover:text-[#ca0019] shadow-sm hover:shadow active:scale-95 cursor-pointer'
                }`}
              >
                <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Clean indicator pills to switch or show active card */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 select-none" role="tablist" aria-label="Card pagination">
            {cardData.map((card, idx) => (
              <button
                key={card.title}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${card.title}`}
                title={card.title}
                role="tab"
                aria-selected={idx === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex 
                    ? 'w-7 bg-[#ca0019]' 
                    : 'w-2 bg-gray-300 dark:bg-neutral-700 hover:bg-gray-400 dark:hover:bg-neutral-600'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
