
import  React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Search, Award } from "lucide-react"
import MemberCard from "../Batches/components/MemberCard"
import AchievementCard from "../Batches/components/AchievementCard"
import { batchesData } from "../Batches/data/batchesData"
import { achievementsData } from "../Batches/data/achievementsData"
import { membersData } from "../Batches/data/membersData"
import Header from "../About/componants/Header"
const Batches = () => {
  const [selectedBatch, setSelectedBatch] = useState(batchesData[0].id)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedBatch, setExpandedBatch] = useState(null);


  // Get the current batch data
  const currentBatch = useMemo(() => batchesData.find((batch) => batch.id === selectedBatch), [selectedBatch])

  // Get achievements for the current batch
  const batchAchievements = useMemo(
    () => achievementsData.filter((achievement) => achievement.batchId === selectedBatch),
    [selectedBatch],
  )

  // Get members for the current batch
  const batchMembers = useMemo(() => membersData.filter((member) => member.batchId === selectedBatch), [selectedBatch])

  // Filter members based on search term
  const filteredMembers = useMemo(() => {
    if (!batchMembers) return []

    return searchTerm.trim() === ""
      ? batchMembers
      : batchMembers.filter(
          (member) =>
            member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())),
        )
  }, [searchTerm, batchMembers])

  return (
  
    <div className="min-h-screen bg-gray-50 w-full">
      
      {/* Header */}
      <motion.div
        className="bg-white py-12 px-4 sm:px-6 lg:px-8 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[85%] mx-auto flex flex-col align-middle justify-start">
            <div className="flex mb-5 items-center">
              <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
              <h1 className="text-sm md:text-lg font-bold capitalize">
                Our Batches
              </h1>
            </div>
            <h1 className="md:w-[100vh] w-full  text-xl md:text-3xl font-semibold">
            Explore the talented members of 
              <span className="text-[#ca0019] text-2xl md:text-5xl md:py-2 block mb-5">
              The Uniques Community
              </span>
            </h1>
          </div>
      </motion.div>

      {/* Batch Selection */}
      <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {batchesData.map((batch) => (
            <motion.button
              key={batch.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedBatch === batch.id
                  ? "bg-[#ca0019] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
              onClick={() => setSelectedBatch(batch.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {batch.icon}
              <span>{batch.name}</span>
              <span className="bg-black bg-opacity-10 px-2 py-0.5 rounded-full text-xs">{batch.memberCount}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-[#ca0019] focus:border-[#ca0019]"
          placeholder="Search by name, position, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Batch Information and Members */}
      {currentBatch && (
        <motion.div
          className="w-[85%] mx-auto  mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={currentBatch.id}
        >
          {/* Batch Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {currentBatch.icon}
                  {currentBatch.name}
                  <span className="bg-[#ca0019] text-white px-2 py-0.5 rounded-full text-sm">
                    {currentBatch.memberCount} Members
                  </span>
                </h2>
                <p className="mt-2 text-gray-600">{currentBatch.description}</p>
              </div>
              {/* <button
                onClick={() => setExpandedBatch(expandedBatch === currentBatch.id ? null : currentBatch.id)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                aria-label={expandedBatch === currentBatch.id ? "Collapse batch details" : "Expand batch details"}
              >
                {expandedBatch === currentBatch.id ? <ChevronUp /> : <ChevronDown />}
              </button> */}
            </div>

            {/* Expanded Batch Details */}
            {/* {expandedBatch === currentBatch.id && ( */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {/* Batch Achievements Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#ca0019]" />
                    Batch Achievements
                  </h3>
                  <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-1 gap-4">
                    {batchAchievements.map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        title={achievement.title}
                        description={achievement.description}
                        icon={achievement.icon}
                        color={achievement.color}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            {/* )} */}
          </div>

          {/* Members Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-items-center sm:gap-x-0 gap-x-4 gap-y-6 h-auto">
  {Array.isArray(filteredMembers) && filteredMembers.length > 0 ? (
    filteredMembers.slice(0, 3).map((member) => (
      <MemberCard key={member.id} {...member} />
    ))
  ) : (
    <div className="col-span-full text-center py-12">
      <p className="text-gray-500 text-lg">No members found matching your search.</p>
      <button
        onClick={() => setSearchTerm("")}
        className="mt-4 px-4 py-2 bg-[#ca0019] text-white rounded-md hover:bg-[#a80015] transition-colors"
      >
        Coming Soon
      </button>
    </div>
  )}
</div>


        </motion.div>
      )}
    </div>
  )
}

export default Batches

