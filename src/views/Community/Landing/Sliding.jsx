import React, { useState, useEffect, useRef } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import tu_red from "@/assets/logos/tu-red.png"
import { useThemeContext } from "@/theme/ThemeProvider"
import "@/utils/Card/weirdcard.css"
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

const WeirdCard = ({ title, description, isDarkMode, height = 140 }) => {
  return (
    <div 
      className={`card group cursor-pointer duration-100 w-full max-w-xl shadow-lg hover:shadow-xl flex-shrink-0 transition-shadow ${isDarkMode ? 'dark-mode-cutout bg-[#141414]' : 'bg-white'}`}
      style={{ height: `${height}px` }}
    >
      <div className={`top-section h-full rounded-2xl relative transition-all duration-300 overflow-hidden ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-slate-100'}`}>
        {/* Cutout Logo Badge - centered in the top-left notch */}
        <div className="absolute flex justify-center items-center top-2 left-2.5 sm:top-2 sm:left-2.5 w-8 h-8 sm:w-8.5 sm:h-8.5 bg-black/90 rounded-full z-20 shadow-sm">
          <img className="w-4.5 h-4.5 sm:w-5 sm:h-5 object-contain" src={tu_red || "/placeholder.svg"} alt="The Uniques Logo" />
        </div>

        {/* Bottom-right diagonal cutout */}
        <div className="border2"></div>

        {/* Card Content - Well arranged typography and balanced spacing */}
        <div className="pt-2 sm:pt-2.5 pl-[66px] xs:pl-[70px] sm:pl-[74px] pr-3.5 sm:pr-4 flex flex-col justify-start">
          <h2 className={`text-[13.5px] xs:text-[14px] sm:text-[15px] md:text-[15.5px] font-bold tracking-tight leading-tight truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <div className="bg-[#ca0019] h-[2px] w-7 rounded-full mt-1 mb-1.5 transition-all duration-300"></div>
          <p className={`text-[11px] xs:text-[11.5px] sm:text-[12px] md:text-[12.5px] font-normal leading-[1.38] sm:leading-[1.42] text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>

      {/* Decorative branded element inside bottom-right corner */}
      <div className="relative">
        <div 
          aria-hidden="true"
          className={`flex items-center justify-center gap-1.5 h-4.5 w-[54px] sm:h-5 sm:w-[58px] rounded-md sm:rounded-lg absolute bottom-1 right-1.5 pointer-events-none select-none transition-colors duration-300 ${isDarkMode ? 'bg-[#1e1e1e] border border-white/5' : 'bg-slate-200/80 shadow-xs'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ca0019]" />
          <span className="w-3 sm:w-3.5 h-1 rounded-full bg-[#ca0019]/45" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#ca0019]/20" />
        </div>
      </div>
    </div>
  )
}

export default function SplitLayout() {
  const { isDarkMode } = useThemeContext()
  const [activeIndex, setActiveIndex] = useState(0)
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )
  const cardsContainerRef = useRef(null)
  const lastWheelTime = useRef(0)
  const touchStartY = useRef(null)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(cardData.length - 1, prev + 1))
  }

  // Non-passive wheel event listener to enable smooth, controlled card scrolling over the deck
  useEffect(() => {
    const el = cardsContainerRef.current
    if (!el) return

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 15) return
      const now = Date.now()
      if (now - lastWheelTime.current < 350) return

      if (e.deltaY > 0) {
        // Scrolling down: advance card, release scroll when reaching the last card
        if (activeIndex < cardData.length - 1) {
          e.preventDefault()
          lastWheelTime.current = now
          setActiveIndex((prev) => Math.min(cardData.length - 1, prev + 1))
        }
      } else if (e.deltaY < 0) {
        // Scrolling up: reverse card, release scroll when reaching the first card
        if (activeIndex > 0) {
          e.preventDefault()
          lastWheelTime.current = now
          setActiveIndex((prev) => Math.max(0, prev - 1))
        }
      }
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [activeIndex])

  const isMobile = screenWidth < 640
  const isTablet = screenWidth >= 640 && screenWidth < 1024

  const CARD_HEIGHT = isMobile ? 134 : isTablet ? 138 : 140
  const TOP_Y = isMobile ? 4 : 6
  const GAP = isMobile ? 8 : 10
  const PEEK_Y = TOP_Y + CARD_HEIGHT + GAP
  const WAIT_Y = PEEK_Y + CARD_HEIGHT + GAP
  const PEEK_VISIBLE = isMobile ? 66 : isTablet ? 70 : 74
  const containerHeight = PEEK_Y + PEEK_VISIBLE

  // Touch swipe gesture support for mobile devices
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const diffY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(diffY) > 30) {
      if (diffY > 0) {
        // Swiped up -> next card
        handleNext()
      } else {
        // Swiped down -> previous card
        handlePrev()
      }
    }
    touchStartY.current = null
  }

  const getCardTransform = (index) => {
    const diff = index - activeIndex

    if (diff < 0) {
      // Previous card(s) scrolled past: glide upward and fade out
      return {
        y: TOP_Y - Math.min(CARD_HEIGHT * 0.45, 50),
        scale: 0.95,
        zIndex: 5,
        opacity: 0,
        pointerEvents: "none",
      }
    } else if (diff === 0) {
      // Active primary card
      return {
        y: TOP_Y,
        scale: 1,
        zIndex: 30,
        opacity: 1,
        pointerEvents: "auto",
      }
    } else if (diff === 1) {
      // Peeking card directly below
      return {
        y: PEEK_Y,
        scale: 0.97,
        zIndex: 20,
        opacity: 0.88,
        pointerEvents: "auto",
      }
    } else {
      // Future cards in waiting below
      return {
        y: WAIT_Y,
        scale: 0.92,
        zIndex: 10,
        opacity: 0,
        pointerEvents: "none",
      }
    }
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
          ref={cardsContainerRef}
          className="w-full md:w-1/2 flex flex-col items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3.5 w-full">
            {/* Card Deck Viewport */}
            <div 
              className="relative flex-1 max-w-[340px] xs:max-w-[370px] sm:max-w-[390px] md:max-w-[420px] overflow-hidden"
              style={{
                height: `${containerHeight}px`,
              }}
            >
              {cardData.map((card, index) => {
                const { y, scale, zIndex, opacity, pointerEvents } = getCardTransform(index)
                return (
                  <div
                    key={card.title}
                    className="absolute left-0 right-0 w-full will-change-transform select-none"
                    style={{
                      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                      zIndex,
                      opacity,
                      pointerEvents,
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out",
                    }}
                    onClick={() => {
                      if (index === activeIndex + 1) {
                        handleNext()
                      } else if (index === activeIndex - 1) {
                        handlePrev()
                      } else if (index !== activeIndex) {
                        setActiveIndex(index)
                      }
                    }}
                  >
                    <WeirdCard
                      title={card.title}
                      description={card.description}
                      isDarkMode={isDarkMode}
                      height={CARD_HEIGHT}
                    />
                  </div>
                )
              })}
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
                className={`group flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ca0019] ${
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
                className={`group flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ca0019] ${
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
          <div className="flex items-center justify-center gap-1.5 mt-3 select-none">
            {cardData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show card ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex 
                    ? 'w-6 bg-[#ca0019]' 
                    : 'w-1.5 bg-gray-300 dark:bg-neutral-700 hover:bg-gray-400 dark:hover:bg-neutral-600'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
