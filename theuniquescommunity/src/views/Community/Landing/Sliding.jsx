import React, { useRef } from "react"
import { motion } from "framer-motion"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import tu_red from "@/assets/logos/tu-red.png"
import { useThemeContext } from "@/theme/ThemeProvider"
import ScrollStack, { ScrollStackItem } from "@/utils/ScrollStack/ScrollStack"
import "@/utils/Card/weirdcard.css"
import "./premium_sliding.css"

const cardData = [
  { title: "Expand Your Community", description: "Kickstart a student club at your university, collaborating with university officials and forming a dedicated core team." },
  { title: "Engaging Workshops", description: "Organize interactive workshops to help students explore various developer tools and platforms ." },
  { title: "Lead Project Development", description: "Collaborate with local organizations to identify project opportunities and spearhead impactful community projects." },
  { title: "Professional Growth", description: "Gain access to community management training, technical insights, and exclusive industry events." },
  { title: "Expand Your Network", description: "Connect with student leaders, industry professionals, and experienced mentors in a thriving global community." },
  { title: "Community Empowerment", description: "Receive dedicated support and resources to educate and expand your community both online and offline." },
]

const WeirdCard = ({ title, description, isDarkMode }) => {
  return (
    <div className={`card group hover:cursor-pointer duration-100 w-full max-w-xl shadow-xl hover:shadow-2xl flex-shrink-0 ${isDarkMode ? 'dark-mode-cutout' : ''}`}>
      <div className={`top-section py-4 rounded-lg relative transition-all duration-500 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-slate-100'}`}>
        <div className="absolute flex justify-center items-center top-0 left-0 w-12 h-12 bg-black/90 rounded-full z-20">
          <img className="w-7 object-contain h-7" src={tu_red || "/placeholder.svg"} alt="logo" />
        </div>
        <div className="border2"></div>
        <h2 className={`text-2xl font-bold mt-10 px-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <div className="bg-[#ca0019] h-[2px] w-0 group-hover:w-1/2 transition-all duration-700 ml-6 mt-1"></div>
        <p className={`text-base font-medium px-6 mt-4 leading-relaxed text-justify ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>
      </div>
      <div className="relative">
        <div className={`px-3 flex justify-center items-center py-1.5 h-8 w-[90px] rounded-2xl absolute bottom-0 right-0 transition-all duration-300 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-slate-100 shadow-md'} group-hover:bg-[#ca0019]`}>
          <ArrowRightAltIcon className={`${isDarkMode ? 'text-white' : 'text-black'} group-hover:text-white transition-colors duration-300`} />
        </div>
      </div>
    </div>
  )
}

export default function SplitLayout() {
  const { isDarkMode } = useThemeContext()

  return (
    <div className={`py-24 transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="container mx-auto flex flex-col md:flex-row gap-12 px-6 lg:px-12 items-center">
        
        {/* Left section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-12">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
              Join <span className="text-[#ca0019]">The Uniques Community</span> Today!
            </h1>
            <p className={`text-xl max-w-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Become an ambassador and lead a thriving community while gaining invaluable experience and networking opportunities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="stat-item">
              <h3 className="text-4xl font-black text-[#ca0019]">500+</h3>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs font-bold uppercase tracking-widest mt-1`}>Ambassadors</p>
            </div>
            <div className="stat-item">
              <h3 className="text-4xl font-black text-[#ca0019]">100+</h3>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs font-bold uppercase tracking-widest mt-1`}>Workshops</p>
            </div>
            <div className="stat-item">
              <h3 className="text-4xl font-black text-[#ca0019]">4.9</h3>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs font-bold uppercase tracking-widest mt-1`}>Rating</p>
            </div>
          </div>
        </div>

        {/* Right section - Advanced ScrollStack Implementation */}
        <div className="w-full md:w-1/2 flex justify-center h-[500px]">
          <ScrollStack 
            itemDistance={50} 
            itemStackDistance={40} 
            baseScale={0.9} 
            itemScale={0.025}
            blurAmount={1}
            className="w-full max-w-2xl"
          >
            {cardData.map((card, index) => (
              <ScrollStackItem key={index}>
                <WeirdCard 
                  title={card.title} 
                  description={card.description} 
                  isDarkMode={isDarkMode} 
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

      </div>
    </div>
  )
}
