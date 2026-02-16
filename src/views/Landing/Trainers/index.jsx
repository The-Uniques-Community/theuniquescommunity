import React, { useState, useEffect } from "react";
import { Box, Typography, Container, CircularProgress, TextField, InputAdornment } from "@mui/material";
import axios from "axios";
import { TrainerCard } from "./TrainerCard";
import SearchIcon from "@mui/icons-material/Search";
import CustomLoader from "@/utils/Loader/CustomLoader";
import { School } from "@mui/icons-material";

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                // Using the specific URL directly as per user request to use axios
                const response = await axios.get("http://localhost:5000/api/admin/trainers/all-trainers");
                setTrainers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching trainers:", err);
                setError("Failed to load trainers. Please try again later.");
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    // Fixed batch versions for tabs (just the version numbers for matching)
    const batchVersions = [
        null, // Tab 0: All Batches
        "1.0",
        "2.0",
        "3.0",
        "4.0",
        "5.0"
    ];

    // Filter trainers based on active tab and search
    const getFilteredTrainers = () => {
        let filtered = trainers;

        // Filter by batch if not on "All Batches" tab
        if (activeTab > 0 && batchVersions[activeTab]) {
            const version = batchVersions[activeTab];
            filtered = filtered.filter(trainer => {
                const tb = (trainer.teachingBatch || trainer.batch || "").toLowerCase();
                return tb.includes(version);
            });
        }

        // Apply search filter only if search text exists
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            filtered = filtered.filter(trainer => {
                const name = (trainer.fullName || "").toLowerCase();
                const email = (trainer.email || "").toLowerCase();
                const course = (trainer.course || "").toLowerCase();
                const designation = (trainer.designation || "").toLowerCase();
                const skillMatch = Array.isArray(trainer.skills) && trainer.skills.some(skill => (skill || "").toLowerCase().includes(q));
                return name.includes(q) || email.includes(q) || course.includes(q) || designation.includes(q) || skillMatch;
            });
        }

        return filtered;
    };

    const filteredTrainers = getFilteredTrainers();

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 8 }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{ mb: 8, textAlign: "center" }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 800,
                            color: "#1e293b",
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            mb: 2,
                            textTransform: "uppercase",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        Our <span style={{ color: "#ca0019" }}>Trainers</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#64748b",
                            maxWidth: "800px",
                            mx: "auto",
                            lineHeight: 1.6,
                            mb: 6
                        }}
                    >
                        Meet the industry experts and passionate mentors behind The Uniques Community.
                        They are dedicated to shaping the next generation of tech leaders.
                    </Typography>

                    {/* Batch Tabs */}
                    <Box sx={{ mb: 6 }}>
                       
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                            {/* All Batches Button */}
                            <button
                                onClick={() => setActiveTab(0)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 0
                                        ? 'bg-[#ca0019] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#ca0019] hover:text-[#ca0019]'
                                }`}
                            >
                                🏆 All Batches
                            </button>

                            {/* Batch 1.0 */}
                            <button
                                onClick={() => setActiveTab(1)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 1
                                        ? 'bg-[#ca0019] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#ca0019] hover:text-[#ca0019]'
                                }`}
                            >
                                🏆 The Uniques 1.0
                            </button>

                            {/* Batch 2.0 */}
                            <button
                                onClick={() => setActiveTab(2)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 2
                                        ? 'bg-[#ca0019] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#ca0019] hover:text-[#ca0019]'
                                }`}
                            >
                                🏆 The Uniques 2.0
                            </button>

                            {/* Batch 3.0 */}
                            <button
                                onClick={() => setActiveTab(3)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 3
                                        ? 'bg-[#ca0019] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#ca0019] hover:text-[#ca0019]'
                                }`}
                            >
                                🏆 The Uniques 3.0
                            </button>

                            {/* Batch 4.0 */}
                            <button
                                onClick={() => setActiveTab(4)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 4
                                        ? 'bg-[#ca0019] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#ca0019] hover:text-[#ca0019]'
                                }`}
                            >
                                🏆 The Uniques 4.0
                            </button>

                            {/* Batch 5.0 */}
                            <button
                                onClick={() => setActiveTab(5)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 5
                                        ? 'bg-[#ca0019] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#ca0019] hover:text-[#ca0019]'
                                }`}
                            >
                                🏆 The Uniques 5.0
                            </button>
                        </Box>
                    </Box>
                </Box>

                {/* Content Section */}
                {loading ? (
                    <CustomLoader />
                ) : error ? (
                    <Box sx={{ textAlign: "center", py: 10 }}>
                        <Typography color="error" variant="h6">{error}</Typography>
                    </Box>
                ) : (
                    <>
                        {filteredTrainers.length > 0 ? (
                            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                                {filteredTrainers.map((trainer) => (
                                    <div key={trainer._id} className="flex justify-center">
                                        <TrainerCard user={trainer} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Box sx={{ textAlign: "center", py: 10 }}>
                                <School sx={{ fontSize: 60, color: "#cbd5e1", mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    No trainers found matching "{search}"
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Trainers;
