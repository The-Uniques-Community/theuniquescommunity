import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Award, RefreshCw, Users, ChevronDown, Check } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/config";
import MemberCard from "./components/MemberCard";
import CelebrationComponent from "@/utils/Header";
import { Card, CardContent, Typography, Box, Tooltip, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import { AnimatePresence } from "framer-motion";

const index = () => {
  // State management
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [batchCounts, setBatchCounts] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [countsLoading, setCountsLoading] = useState(true);

  // Define batches data with count information from API
  const batchesData = useMemo(() => [
    {
      id: "All",
      name: "All Batches",
      icon: "👥",
      description: "All members from The Uniques Community.",
      memberCount: batchCounts["All"] || 0,
      iconComponent: <GroupsIcon />
    },
    {
      id: "The Uniques 1.0",
      name: "The Uniques 1.0",
      icon: "🥇",
      description: "The founding batch of The Uniques Community, established in 2021 with a vision to create a supportive learning environment for tech enthusiasts.",
      memberCount: batchCounts["The Uniques 1.0"] || 0,
      iconComponent: <SchoolIcon />
    },
    {
      id: "The Uniques 2.0",
      name: "The Uniques 2.0",
      icon: "🥈",
      description: "The second generation of The Uniques Community that continued the legacy with new innovations and community initiatives.",
      memberCount: batchCounts["The Uniques 2.0"] || 0,
      iconComponent: <SchoolIcon />
    },
    {
      id: "The Uniques 3.0",
      name: "The Uniques 3.0",
      icon: "🥉",
      description: "The newest members of The Uniques Community, bringing fresh perspectives and energy to our growing tech community.",
      memberCount: batchCounts["The Uniques 3.0"] || 0,
      iconComponent: <SchoolIcon />
    },
    {
      id: "The Uniques 4.0",
      name: "The Uniques 4.0",
      icon: "🏅",
      description: "The latest batch of The Uniques Community, driving innovation and collaboration in the tech space.",
      memberCount: batchCounts["The Uniques 4.0"] || 0,
      iconComponent: <SchoolIcon />
    }
  ], [batchCounts]);

  // Fetch batch counts using the counts API
  useEffect(() => {
    const fetchBatchCounts = async () => {
      try {
        setCountsLoading(true);
        console.log("Fetching batch counts...");

        const response = await axios.get(`${BASE_URL}/api/public/members/counts`);

        if (response.data.success) {
          console.log("Batch counts received:", response.data.data);
          setBatchCounts(response.data.data);
        } else {
          console.error("Failed to fetch batch counts:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching batch counts:", err);
      } finally {
        setCountsLoading(false);
      }
    };

    fetchBatchCounts();
  }, []);

  // Reset members when batch changes
  useEffect(() => {
    setMembers([]);
    setLoading(true);
  }, [selectedBatch]);

  // Filter members client-side based on search term
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim() || !Array.isArray(members)) {
      return members;
    }

    const term = searchTerm.toLowerCase();
    return members.filter(member => {
      // Safely check properties (they might be missing in incomplete profiles)
      const nameMatch = member.fullName && member.fullName.toLowerCase().includes(term);
      const bioMatch = member.bio && member.bio.toLowerCase().includes(term);
      const courseMatch = member.course && member.course.toLowerCase().includes(term);

      // Check for skills - handle both array of objects and array of strings
      const skillsMatch = Array.isArray(member.skills) && member.skills.some(skill => {
        if (typeof skill === 'string') {
          return skill.toLowerCase().includes(term);
        }
        return (skill && skill.name && skill.name.toLowerCase().includes(term));
      });

      return nameMatch || bioMatch || courseMatch || skillsMatch;
    });
  }, [members, searchTerm]);

  // Fetch all members data
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        console.log(`Fetching members for batch: ${selectedBatch}`);

        // Fetch all members for the selected batch without search parameter
        // We'll handle search client-side for better filtering of incomplete profiles
        const response = await axios.get(`${BASE_URL}/api/public/members`, {
          params: {
            batch: selectedBatch !== "All" ? selectedBatch : undefined
          }
        });

        if (response.data.success) {
          console.log(`Received ${response.data.data.length} members out of ${response.data.count} total`);

          // Process members to ensure no null/undefined values that might break rendering
          const processedMembers = response.data.data.map(member => ({
            ...member,
            // Ensure all potentially problematic properties have fallbacks
            fullName: member.fullName || member.email,
            batch: member.batch || "Unspecified Batch",
            skills: Array.isArray(member.skills) ? member.skills : [],
            projects: Array.isArray(member.projects) ? member.projects : [],
            achievements: Array.isArray(member.achievements) ? member.achievements : [],
            certifications: Array.isArray(member.certifications) ? member.certifications : []
          }));

          setMembers(processedMembers);
          setTotalMembers(response.data.count);
          setError(null);
        } else {
          setError(response.data.message || "Failed to fetch members");
          setMembers([]);
        }
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to load members. Please try again later.");
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [selectedBatch]); // Search is handled client-side


  const currentBatch = useMemo(() => {
    return batchesData.find((batch) => batch.id === selectedBatch);
  }, [selectedBatch, batchesData]);

  // Achievement Card Component using MUI
  const AchievementCard = ({ title, description, icon, color }) => {
    return (
      <Card sx={{
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
        }
      }}>
        <CardContent>
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Box
              sx={{
                backgroundColor: color || '#ca0019',
                color: 'white',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {icon || <EmojiEventsIcon />}
            </Box>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Using dummy achievement data
  useEffect(() => {
    const defaultAchievements = {
      "All": [
        {
          id: "community-excellence",
          title: "Community Excellence",
          description: "Recognized for outstanding contributions to the tech ecosystem",
          color: "rgb(59, 130, 246)"
        }
      ],
      "The Uniques 1.0": [
        {
          id: "founding-milestone",
          title: "Founding Milestone",
          description: "Established the community and set the foundation for future growth",
          color: "rgb(34, 197, 94)"
        }
      ],
      "The Uniques 2.0": [
        {
          id: "community-growth",
          title: "Community Growth",
          description: "Expanded membership by 200% and introduced mentorship programs",
          color: "rgb(168, 85, 247)"
        }
      ],
      "The Uniques 3.0": [
        {
          id: "innovation-hub",
          title: "Innovation Hub",
          description: "Launched the innovation lab for members to collaborate on projects",
          color: "rgb(249, 115, 22)"
        }
      ],
      "The Uniques 4.0": [
        {
          id: "collaborative-leadership",
          title: "Collaborative Leadership",
          description: "Pioneered new initiatives and fostered cross-batch collaboration in 2024",
          color: "rgb(239, 68, 68)"
        }
      ]
    };

    setAchievements(defaultAchievements[selectedBatch] || []);
  }, [selectedBatch]);

  // Function to retry both data fetches
  const refreshData = () => {
    // Reset state
    setMembers([]);
    setLoading(true);
    setError(null);
    setCountsLoading(true);

    // Fetch both counts and members data
    const fetchAll = async () => {
      try {
        // First fetch counts
        const countsResponse = await axios.get(`${BASE_URL}/api/public/members/counts`);
        if (countsResponse.data.success) {
          setBatchCounts(countsResponse.data.data);
        }

        // Then fetch members
        const membersResponse = await axios.get(`${BASE_URL}/api/public/members`, {
          params: {
            batch: selectedBatch !== "All" ? selectedBatch : undefined
          }
        });

        if (membersResponse.data.success) {
          const processedMembers = membersResponse.data.data.map(member => ({
            ...member,
            fullName: member.fullName || " Member",
            batch: member.batch || "Unspecified Batch",
            skills: Array.isArray(member.skills) ? member.skills : [],
            projects: Array.isArray(member.projects) ? member.projects : [],
            achievements: Array.isArray(member.achievements) ? member.achievements : [],
            certifications: Array.isArray(member.certifications) ? member.certifications : []
          }));

          setMembers(processedMembers);
          setTotalMembers(membersResponse.data.count);
        } else {
          setError("Failed to refresh data");
        }
      } catch (err) {
        console.error("Error refreshing data:", err);
        setError("Failed to refresh data. Please try again.");
      } finally {
        setLoading(false);
        setCountsLoading(false);
      }
    };

    fetchAll();
  };

  return (
    <div className="min-h-screen">
      <CelebrationComponent title="Our Batches → Celebrating Excellence ✦" />

      {/* Batch Selection with Premium Dropdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">

          <div className="w-full md:w-auto">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block ml-1">Select Batch</label>
            <div className="relative group min-w-[280px]">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full px-5 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-300 group-hover:border-[#ca0019]/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentBatch?.icon}</span>
                  <span className="font-semibold text-gray-900">{currentBatch?.name}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 5, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {batchesData.map((batch) => (
                      <button
                        key={batch.id}
                        onClick={() => {
                          setSelectedBatch(batch.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-5 py-4 text-left transition-colors ${selectedBatch === batch.id
                            ? "bg-red-50 text-[#ca0019]"
                            : "hover:bg-gray-50 text-gray-700"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{batch.icon}</span>
                          <span className="font-medium">{batch.name}</span>
                        </div>
                        {selectedBatch === batch.id && <Check className="w-5 h-5" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block ml-1">Find Members</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#ca0019] transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca0019]/20 focus:border-[#ca0019] transition-all duration-300 group-hover:border-[#ca0019]/30"
                placeholder="Search by name, position, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Batch Information and Members */}
      {currentBatch && (
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={currentBatch.id}
        >
          {/* Batch Info Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Award size={120} className="text-gray-900" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{currentBatch.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                      {currentBatch.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-red-100 text-[#ca0019] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Users size={12} />
                        {loading ? "Loading..." : `${totalMembers} MEMBERS`}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                  {currentBatch.description}
                </p>
              </div>

              <button
                onClick={refreshData}
                className="self-start md:self-center flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-[#ca0019] hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                title="Refresh data"
                disabled={loading || countsLoading}
              >
                <RefreshCw size={18} className={loading || countsLoading ? "animate-spin" : ""} />
                <span>Refresh Data</span>
              </button>
            </div>

            {/* Batch Achievements Section */}
            <motion.div
              className="mt-10 pt-10 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#ca0019]" />
                </div>
                Batch Achievements
              </h3>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    title={achievement.title}
                    description={achievement.description}
                    icon={<EmojiEventsIcon />}
                    color={achievement.color}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Members Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 place-items-center sm:gap-x-0 gap-x-4 gap-y-6 h-auto md:grid-cols-2">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#ca0019] rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading members...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={refreshData}
                  className="mt-4 px-4 py-2 bg-[#ca0019] text-white rounded-md hover:bg-[#a80015] transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredMembers.length > 0 ? (
              <>
                {filteredMembers.map((member) => (
                  <MemberCard key={member._id} member={member} />
                ))}

                {/* Show count of members displayed */}
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    {searchTerm ?
                      `Found ${filteredMembers.length} of ${members.length} members matching "${searchTerm}"` :
                      `Displaying all ${members.length} members`}
                  </p>
                </div>
              </>
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No members found matching your search.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 bg-[#ca0019] text-white rounded-md hover:bg-[#a80015] transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default index;
