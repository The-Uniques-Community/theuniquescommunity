/**
 * @file HomeContent.jsx
 * @description Main dashboard view for Community Success Stories, highlighting key placement KPIs (total stories, unique companies, active batches, verified placement rate) and dynamic candidate journey cards.
 * @architecture Rendered by `SuccessStories/index.jsx` within route `/success-stories`. Retrieves loaded student stories via `useOutletContext()` provided by `SuccessStoriesLayout` (`src/layout/Landing/successStories/index.jsx`).
 * @agent_note Explicit backend API integrations:
 * 1. `GET ${BASE_URL}/api/success-stories/stats`
 *    - Handled by: `The-Uniques-Portal/server/controller/Community/successStories.controller.js` (`getSuccessStoryStats`)
 *    - Request: No query parameters required.
 *    - Response schema: `{ success: true, stats: { totalStories: number, uniqueCompanies: number, activeBatches: number, verifiedPlacementRate: number } }`
 *    - Fallback: Calculates in-memory metrics across `students` context if remote stats endpoint fails.
 * 2. Context data source:
 *    - Sourced from `SuccessStoriesLayout` via `GET ${BASE_URL}/api/success-stories?all=true`
 *    - Handled by: `The-Uniques-Portal/server/controller/Community/successStories.controller.js` (`getAllSuccessStories`)
 *    - Response schema: `{ success: true, count: number, data: Array<SuccessStory> }`
 */

import { useState, useEffect, useMemo } from 'react';
import CelebrationComponent from '@/utils/Header';
import { 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Button,
  Grid,
  Card,
  Avatar,
  Chip,
  Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { useThemeContext } from '@/theme/ThemeProvider';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * @component HomeContent
 * @description Renders community placement KPI summary stat cards followed by a responsive grid of student success profiles.
 * @returns {JSX.Element} The rendered success stories dashboard.
 * @state {Object} stats - KPI metrics `{ totalStories, uniqueCompanies, activeBatches, verifiedPlacementRate }`
 * @state {boolean} isStatsLoading - Loading state for the stats API query
 * @api `GET /api/success-stories/stats` - Fetches live placement statistics from backend
 */
const HomeContent = () => {
  const { isDarkMode } = useThemeContext();
  const outletCtx = useOutletContext();
  const contextStudents = outletCtx?.students;
  const students = useMemo(() => contextStudents || [], [contextStudents]);
  const isStoriesLoading = outletCtx?.isLoading || false;

  const [stats, setStats] = useState({
    totalStories: 0,
    uniqueCompanies: 0,
    activeBatches: 0,
    verifiedPlacementRate: 0,
  });
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  // Fetch live aggregated stats from backend
  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/success-stories/stats`);
        if (isMounted && res.data?.stats) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.warn("[HomeContent] Failed to fetch stats from API:", err);
        if (isMounted) {
          if (students.length > 0) {
            const uniqueComp = new Set(students.map((s) => s.company).filter(Boolean)).size;
            const uniqueBatches = new Set(students.map((s) => s.batch).filter(Boolean)).size;
            setStats({
              totalStories: students.length,
              uniqueCompanies: uniqueComp,
              activeBatches: uniqueBatches,
              verifiedPlacementRate: 100,
            });
          } else {
            setStats({
              totalStories: 0,
              uniqueCompanies: 0,
              activeBatches: 0,
              verifiedPlacementRate: 0,
            });
          }
        }
      } finally {
        if (isMounted) setIsStatsLoading(false);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [students]);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const statCards = [
    {
      label: "Total Success Stories",
      value: `${stats.totalStories}+`,
      color: "#ca0019",
      icon: <AutoStoriesIcon sx={{ fontSize: 24, color: "#ca0019" }} />,
    },
    {
      label: "Top Tech Companies",
      value: `${stats.uniqueCompanies}+`,
      color: "#16a34a",
      icon: <BusinessIcon sx={{ fontSize: 24, color: "#16a34a" }} />,
    },
    {
      label: "Active Batches",
      value: `${stats.activeBatches} Batches`,
      color: "#2563eb",
      icon: <SchoolIcon sx={{ fontSize: 24, color: "#2563eb" }} />,
    },
    {
      label: "Verified Placement",
      value: `${stats.verifiedPlacementRate}%`,
      color: "#d97706",
      icon: <VerifiedIcon sx={{ fontSize: 24, color: "#d97706" }} />,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
    >
      <CelebrationComponent title="Success Stories → Inspiring Journeys ✦" />
      
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* 1. DYNAMIC COMMUNITY KPI STATS */}
        <Grid container spacing={2.5} sx={{ mb: 6 }}>
          {statCards.map((stat, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: isDarkMode ? "rgba(255,255,255,0.08)" : "#e2e8f0",
                  bgcolor: isDarkMode ? "#161616" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.03)",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: stat.color,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.05)" : "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {stat.label}
                  </Typography>
                  {isStatsLoading ? (
                    <Skeleton variant="text" width={80} height={32} />
                  ) : (
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
                      {stat.value}
                    </Typography>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 2. FEATURED ALUMNI JOURNEYS GRID */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <Box>
              <Typography variant="overline" sx={{ color: "#ca0019", fontWeight: 700, letterSpacing: 1.5 }}>
                COMMUNITY PROFILES
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mt: 0.5 }}>
                Meet Our Achievers
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
              Showing {students.length} verified candidate journeys
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {isStoriesLoading && students.length === 0 ? (
              [1, 2, 3, 4, 5, 6].map((sk) => (
                <Grid item xs={12} sm={6} md={4} key={sk}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "18px",
                      border: "1px solid",
                      borderColor: isDarkMode ? "rgba(255,255,255,0.08)" : "#e2e8f0",
                      bgcolor: isDarkMode ? "#161616" : "#ffffff",
                    }}
                  >
                    <Skeleton variant="circular" width={64} height={64} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="70%" height={28} />
                    <Skeleton variant="text" width="50%" height={20} sx={{ mb: 2 }} />
                    <Skeleton variant="rounded" width="100%" height={60} sx={{ mb: 2 }} />
                    <Skeleton variant="rounded" width="100%" height={36} />
                  </Card>
                </Grid>
              ))
            ) : students.length === 0 ? (
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 8 },
                    textAlign: "center",
                    borderRadius: "16px",
                    border: "1px dashed",
                    borderColor: isDarkMode ? "rgba(255,255,255,0.15)" : "#cbd5e1",
                    bgcolor: "transparent",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: isDarkMode ? "#ffffff" : "#1e293b" }}>
                    No Success Stories Published Yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 450, mx: "auto" }}>
                    Success stories will be displayed here dynamically as community members graduate and publish their journey.
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              students.map((story) => {
                const storyId = story.id || story._id;
                return (
                  <Grid item xs={12} sm={6} md={4} key={storyId}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 3,
                        borderRadius: "18px",
                        border: "1px solid",
                        borderColor: isDarkMode ? "rgba(255,255,255,0.08)" : "#e2e8f0",
                        bgcolor: isDarkMode ? "#161616" : "#ffffff",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          borderColor: "#ca0019",
                          boxShadow: isDarkMode ? "0 12px 30px rgba(0,0,0,0.6)" : "0 12px 30px rgba(0,0,0,0.06)",
                        },
                      }}
                    >
                      <Box>
                        {/* Top: Batch & Company */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Chip
                            label={story.batch || "Uniques 1.0"}
                            size="small"
                            sx={{
                              bgcolor: isDarkMode ? "rgba(202,0,25,0.15)" : "#fee2e2",
                              color: "#ca0019",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              borderRadius: "6px",
                            }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                            {story.company}
                          </Typography>
                        </Box>

                        {/* Middle: Identity Avatar & Info */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                          <Avatar
                            src={story.image}
                            alt={story.name}
                            sx={{
                              width: 60,
                              height: 60,
                              border: "2px solid #ca0019",
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              noWrap
                              sx={{ fontWeight: 800, color: "text.primary", fontSize: "1.05rem" }}
                            >
                              {story.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {story.role}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Summary excerpt */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 2.5,
                            fontSize: "0.88rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {story.summary || "Inspiring developer journey cultivated at The Uniques Community."}
                        </Typography>
                      </Box>

                      {/* Bottom Action Button */}
                      <Button
                        component={RouterLink}
                        to={`/success-stories/${storyId}`}
                        fullWidth
                        variant="outlined"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          borderColor: isDarkMode ? "rgba(255,255,255,0.15)" : "#e2e8f0",
                          color: isDarkMode ? "#ffffff" : "#1e293b",
                          py: 0.9,
                          "&:hover": {
                            bgcolor: "#ca0019",
                            borderColor: "#ca0019",
                            color: "#ffffff",
                          },
                        }}
                      >
                        Read Journey
                      </Button>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>

        {/* 3. THE UNIQUES DIFFERENCE & COMMUNITY CTA */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "20px",
            border: "1px solid",
            borderColor: isDarkMode ? "rgba(255,255,255,0.08)" : "#e2e8f0",
            bgcolor: isDarkMode ? "#161616" : "#ffffff",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
            The Uniques Difference
          </Typography>
          <Typography paragraph sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.7 }}>
            At The Uniques Community, we pride ourselves on nurturing talent and providing the resources, mentorship, 
            and opportunities that help our members achieve extraordinary success. Our comprehensive approach to 
            professional development focuses on technical skills, leadership abilities, and personal growth.
          </Typography>
          <Typography paragraph sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.7 }}>
            The success stories showcased here are testament to the power of community, dedication, and the unique 
            approach we take to preparing our members for the challenges of the tech industry.
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              component="a"
              href="https://chat.whatsapp.com/HYOloogGXKcIkR83DnOjFj"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained" 
              size="large"
              sx={{
                px: 5,
                py: 1.4,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "12px",
                bgcolor: "#ca0019",
                "&:hover": { bgcolor: "#a30014" },
              }}
            >
              Join The Uniques Community
            </Button>
          </Box>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default HomeContent;
