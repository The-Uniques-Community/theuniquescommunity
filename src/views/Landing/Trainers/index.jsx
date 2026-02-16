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

    const filteredTrainers = trainers.filter(trainer =>
        trainer.fullName.toLowerCase().includes(search.toLowerCase()) ||
        trainer.email.toLowerCase().includes(search.toLowerCase()) ||
        (trainer.skills && trainer.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())))
    );

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

                    {/* Search Bar */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            placeholder="Search by name, skill, or role..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            variant="outlined"
                            sx={{
                                width: { xs: "100%", md: "500px" },
                                bgcolor: "white",
                                borderRadius: "50px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "50px",
                                    "& fieldset": {
                                        borderColor: "#e2e8f0",
                                        borderWidth: "2px",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#cbd5e1",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#ca0019",
                                    },
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#94a3b8", ml: 1 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
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
