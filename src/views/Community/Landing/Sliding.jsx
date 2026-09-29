import React, { useRef, useState, useEffect } from "react"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
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

const WeirdCard = ({ title, description, isDarkMode, height = 260 }) => {
  return (
    <div 
      className={`card group hover:cursor-pointer duration-100 w-full max-w-xl shadow-xl hover:shadow-2xl flex-shrink-0 ${isDarkMode ? 'dark-mode-cutout bg-[#141414]' : 'bg-white'}`}
      style={{ height: `${height}px` }}
    >
      <div className={`top-section h-full py-3 sm:py-4 rounded-lg relative transition-all duration-500 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-slate-100'}`}>
        <div className="absolute flex justify-center items-center top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 bg-black/90 rounded-full z-20">
          <img className="w-5 h-5 sm:w-7 sm:h-7 object-contain" src={tu_red || "/placeholder.svg"} alt="logo" />
        </div>
        <div className="border2"></div>
        <h2 className={`text-base sm:text-lg md:text-xl font-bold mt-6 sm:mt-8 px-4 sm:px-6 whitespace-nowrap overflow-hidden text-ellipsis ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <div className="bg-[#ca0019] h-[2px] w-0 group-hover:w-1/2 transition-all duration-700 ml-4 sm:ml-6 mt-1"></div>
        <p className={`text-xs sm:text-sm md:text-base font-normal px-4 sm:px-6 mt-2 sm:mt-3 leading-relaxed text-left line-clamp-3 sm:line-clamp-none ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>
      </div>
      <div className="relative">
        <div className={`px-2 flex justify-center items-center h-6 w-[70px] rounded-xl absolute bottom-0.5 right-1 transition-all duration-300 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-slate-200 shadow-sm'} group-hover:bg-[#ca0019]`}>
          <ArrowRightAltIcon className={`!text-lg ${isDarkMode ? 'text-white' : 'text-black'} group-hover:text-white transition-colors duration-300`} />
        </div>
      </div>
    </div>
  )
}

export default function SplitLayout() {
  const { isDarkMode } = useThemeContext()
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const currentScroll = -rect.top
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable))
      setScrollProgress(progress)
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      handleScroll()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024

  const totalCards = cardData.length
  // Step ranges continuously from 0 to totalCards - 1 (0 to 5)
  const step = scrollProgress * (totalCards - 1)

  // Standardized constants tailored for responsive breakpoints
  const CARD_HEIGHT = isMobile ? 215 : isTablet ? 235 : 260
  const TOP_Y = isMobile ? 8 : isTablet ? 30 : 65
  const GAP = isMobile ? 16 : 25
  const PEEK_Y = TOP_Y + CARD_HEIGHT + GAP
  const WAIT_Y = PEEK_Y + CARD_HEIGHT + GAP

  const getCardTransform = (index) => {
    // If this card is already completely passed (new card has fully landed over it):
    if (step >= index + 1) {
      return {
        y: TOP_Y,
        scale: 0.96,
        zIndex: 10 + index * 10,
        opacity: 0,
        pointerEvents: "none",
      }
    }

    // If this card is currently at the top:
    if (step >= index && step < index + 1) {
      const nextP = step - index // 0 to 1
      const opacity = nextP > 0.4 ? Math.max(0, 1 - (nextP - 0.4) * 1.67) : 1
      return {
        y: TOP_Y,
        scale: Math.max(0.96, 1 - 0.04 * nextP),
        zIndex: 10 + index * 10,
        opacity,
        pointerEvents: opacity > 0.1 ? "auto" : "none",
      }
    }

    // If this card is actively rising from PEEK_Y to TOP_Y:
    if (step >= index - 1 && step < index) {
      const p = step - (index - 1) // 0 to 1
      const y = PEEK_Y - p * (PEEK_Y - TOP_Y)
      const scale = 0.96 + 0.04 * p
      return {
        y,
        scale,
        zIndex: 10 + index * 10,
        opacity: 1,
        pointerEvents: p > 0.8 ? "auto" : "none",
      }
    }

    // If this card is moving from WAIT_Y to PEEK_Y:
    if (step >= index - 2 && step < index - 1) {
      const p = step - (index - 2) // 0 to 1
      const y = WAIT_Y - p * (WAIT_Y - PEEK_Y)
      const scale = 0.94 + 0.02 * p
      const opacity = Math.min(1, p * 1.5)
      return {
        y,
        scale,
        zIndex: 10 + index * 10,
        opacity,
        pointerEvents: "none",
      }
    }

    // Otherwise, card is waiting below
    return {
      y: WAIT_Y,
      scale: 0.94,
      zIndex: 10 + index * 10,
      opacity: 0,
      pointerEvents: "none",
    }
  }

  return (
    <section 
      ref={containerRef}
      className={`relative transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}
      style={{
        // Keeps the page stuck at this section while scrolling through each card
        height: isMobile ? "calc(100vh + 2200px)" : "calc(100vh + 3000px)"
      }}
    >
      {/* Sticky Viewport Container: stays pinned while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 sm:gap-8 md:gap-12 px-4 sm:px-6 lg:px-12 items-center justify-center">
          
          {/* Left section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center py-2 sm:py-6 md:py-12">
            <div className="space-y-2 sm:space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight sm:tracking-tighter">
                Join <span className="text-[#ca0019]">The Uniques Community</span> Today!
              </h1>
              <p className={`text-xs sm:text-base md:text-lg lg:text-xl max-w-lg font-medium leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Become an ambassador and lead a thriving community while gaining invaluable experience and networking opportunities.
              </p>
            </div>

            <div className="mt-3 sm:mt-6 md:mt-12 grid grid-cols-3 gap-2 sm:gap-6 md:gap-8">
              <div className="stat-item">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#ca0019]">500+</h3>
                <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-[9px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest mt-0.5 sm:mt-1`}>Ambassadors</p>
              </div>
              <div className="stat-item">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#ca0019]">100+</h3>
                <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-[9px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest mt-0.5 sm:mt-1`}>Workshops</p>
              </div>
              <div className="stat-item">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#ca0019]">4.9</h3>
                <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-[9px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest mt-0.5 sm:mt-1`}>Rating</p>
              </div>
            </div>
          </div>

          {/* Right section - Overlapping Card Stack */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div 
              className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[420px] overflow-hidden"
              style={{
                height: isMobile ? "360px" : isTablet ? "470px" : "560px"
              }}
            >
              {cardData.map((card, index) => {
                const { y, scale, zIndex, opacity } = getCardTransform(index)
                return (
                  <div
                    key={card.title}
                    className="absolute left-0 right-0 w-full will-change-transform"
                    style={{
                      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                      zIndex,
                      opacity,
                      transition: "transform 0.1s ease-out, opacity 0.2s ease-out",
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
          </div>

        </div>
      </div>
    </section>
  )
}
