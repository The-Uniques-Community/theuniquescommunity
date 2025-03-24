
import { useRef } from "react"
import "@/utils/Card/Weirdcard.css"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import tu_red from "@/assets/logos/tu-red.png"

const WeirdCard = ({ title, description }) => {
  return (
    <div className="card group hover:cursor-pointer z-10 duration-100 mb-6">
      <div className="top-section bg-slate-200">
        <div className="absolute flex justify-center items-center top-0 left-3 w-10 h-10 bg-black/80 rounded-full">
          <img className="w-6 object-center h-6 object-contain" src={tu_red || "/placeholder.svg"} alt="" />
        </div>
        <div className="border2"></div>
        <div>
          <h2 className="absolute left-24 top-4 text-xl font-light">{title}</h2>
          <div className="bg-[#ca0019] h-[1px] absolute left-24 top-10 w-0 group-hover:w-1/2 transition-all duration-500"></div>
        </div>
        <p className="absolute left-5 right-4 top-[78px] text-sm font-light text-justify">{description}</p>
      </div>
      <div className="relative">
        <div className="px-2 bg-slate-200 flex justify-center items-center py-1 h-5 w-[70px] rounded-xl absolute bottom-0 z-10 right-0">
          <ArrowRightAltIcon className="text-black group-hover:text-2xl font-light duration-100" />
        </div>
      </div>
    </div>
  )
}

export default function SplitLayout() {
  const scrollRef = useRef(null)

  const cardData = [
    {
      title: "Explore great neighborhoods",
      description: "Explore video tours, in-depth research, and articles on 20,000 neighborhoods.",
    },
    {
      title: "Find highly rated best property",
      description: "Find the very best schools with in-depth reviews and ratings from multiple experts.",
    },
    {
      title: "Discover condo quality buildings",
      description: "Explore video tours, in-depth research, and articles on 20,000 neighborhoods.",
    },
    {
      title: "Premium Property Listings",
      description:
        "Access exclusive listings not available on other platforms with detailed information and virtual tours.",
    },
    {
      title: "Market Trend Analysis",
      description: "Stay informed with real-time market trends, price histories, and future projections for any area.",
    },
    {
      title: "Connect with Top Agents",
      description:
        "Get matched with experienced real estate agents who specialize in your desired location and property type.",
    },
  ]

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left side - Fixed */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify- bg-white">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            Trusted by <span className="text-gray-400">100 Million</span> buyers
          </h1>
          <p className="text-gray-700 mt-4">
            Only we connects you directly to the person that knows the most about a property for sale, the listing
            agent.
          </p>
        </div>

        <div className="mt-56">
          <div className="flex items-center justify-between mt-8">
            <div className="flex -space-x-2">
              <img
                src="/placeholder.svg?height=50&width=50"
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="User"
              />
              <img
                src="/placeholder.svg?height=50&width=50"
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="User"
              />
              <img
                src="/placeholder.svg?height=50&width=50"
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="User"
              />
              <img
                src="/placeholder.svg?height=50&width=50"
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="User"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <h3 className="text-2xl font-bold">100M</h3>
              <p className="text-gray-600 text-sm">Happy buyers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">40M</h3>
              <p className="text-gray-600 text-sm">Client review</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">4.6</h3>
              <p className="text-gray-600 text-sm">Positive Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Scrollable */}
      <div ref={scrollRef} className="w-full md:w-[50%]  p-8 mx-[40px]">
        <div className="space-y-6 pr-4">
          {cardData.map((card, index) => (
            <WeirdCard key={index} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </div>
  )
}

