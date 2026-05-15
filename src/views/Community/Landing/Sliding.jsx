import { useRef } from "react"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import tu_red from "@/assets/logos/tu-red.png"
import "@/utils/Card/weirdcard.css"
// Import SimpleBar
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import '@/utils/scrollbar.css'
import { useThemeContext } from "@/theme/ThemeProvider"

const WeirdCard = ({ title, description, isDarkMode }) => {
  return (
    <div className="card group hover:cursor-pointer z-10 duration-100 mb-6 w-full">
      <div className={`top-section py-4 rounded-lg relative transition-colors duration-300 ${isDarkMode ? 'bg-[#424D53]/40 border border-white/10' : 'bg-slate-200'}`}>
        <div className="absolute flex justify-center items-center top-0 left-0 w-10 h-10 bg-black/80 rounded-full">
          <img className="w-6 object-contain h-6" src={tu_red || "/placeholder.svg"} alt="logo" />
        </div>
        <div className={`border2 ${isDarkMode ? 'opacity-20' : ''}`}></div>
        <h2 className={`text-xl font-bold mt-8 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <div className="bg-[#ca0019] h-[1px] w-0 group-hover:w-1/2 transition-all duration-500 ml-4"></div>
        <p className={`text-sm font-light px-4 mt-2 text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{description}</p>
      </div>
      <div className="relative">
        <div className={`px-2 flex justify-center items-center py-1 h-5 w-[70px] rounded-xl absolute bottom-0 right-0 transition-colors duration-300 ${isDarkMode ? 'bg-[#424D53] border border-white/10' : 'bg-slate-200'}`}>
          <ArrowRightAltIcon className={`${isDarkMode ? 'text-white' : 'text-black'} group-hover:text-2xl font-light duration-100`} />
        </div>
      </div>
    </div>
  )
}

export default function SplitLayout() {
  const scrollRef = useRef(null)
  const { isDarkMode } = useThemeContext()

  const cardData = [
    { title: "Expand Your Community", description: "Kickstart a student club at your university, collaborating with university officials and forming a dedicated core team." },
    { title: "Engaging Workshops", description: "Organize interactive workshops to help students explore various developer tools and platforms ." },
    { title: "Lead Project Development", description: "Collaborate with local organizations to identify project opportunities and spearhead impactful community projects." },
    { title: "Professional Growth", description: "Gain access to community management training, technical insights, and exclusive industry events." },
    { title: "Expand Your Network", description: "Connect with student leaders, industry professionals, and experienced mentors in a thriving global community." },
    { title: "Community Empowerment", description: "Receive dedicated support and resources to educate and expand your community both online and offline." },
  ]

  return (
    <div className={`transition-colors duration-500 py-12 ${isDarkMode ? 'bg-[#161616] text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto mb-32 flex flex-col md:flex-row w-full px-4 lg:px-8">
        {/* Left section - Fixed */}
        <div className={`w-full md:w-1/2 py-8 sticky top-0 flex flex-col justify-start items-start transition-colors duration-500 ${isDarkMode ? 'bg-[#161616]' : 'bg-white'}`}>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Join <span className="text-[#ca0019]">The Uniques Community</span> Today!
            </h1>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Become an ambassador and lead a thriving community while gaining invaluable experience and networking opportunities.
            </p>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mt-12">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <img
                    key={i}
                    src="https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumcie7BiH8VXEy6oP2FKNmz4aCbwtxqpB9gkJD"
                    className={`w-14 h-14 rounded-full border-4 ${isDarkMode ? 'border-[#161616]' : 'border-white'} shadow-xl`}
                    alt="User"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-[#ca0019]">500+</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium uppercase tracking-wider`}>Ambassadors Worldwide</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#ca0019]">100+</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium uppercase tracking-wider`}>Workshops Conducted</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#ca0019]">4.9</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium uppercase tracking-wider`}>Community Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Scrollable with SimpleBar - LEFT SIDE SCROLLBAR */}
        <SimpleBar
          ref={scrollRef}
          className={`w-full md:w-[50%] p-6 md:p-8 h-[500px] custom-simplebar rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-gray-50'}`}
          autoHide={false}
          scrollbarMinSize={50}
          forceVisible="y"
          direction="rtl"
          data-simplebar-force-visible="true"
        >
          {/* Content direction set to ltr */}
          <div className="space-y-6 flex flex-col items-center" style={{ direction: 'ltr' }}>
            {cardData.map((card, index) => (
              <WeirdCard key={index} title={card.title} description={card.description} isDarkMode={isDarkMode} />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}
