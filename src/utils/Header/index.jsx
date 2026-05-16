import React from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useThemeContext } from "@/theme/ThemeProvider";
import { motion } from "framer-motion";

const CelebrationComponent = ({
    title = "More Than a Community → The Uniques ✦",
    subtitle = "Over 200+",
    chipLabel = "Design Blocks",
    highlightColor = "#ca0019",
}) => {
    const { isDarkMode } = useThemeContext();
    const currentBgColor = isDarkMode ? "#3a474c" : "#f1f4f9";
    const currentTextColor = "white";

    return (
        <Box
            className="MuiBox-root rounded-b-[60px] relative overflow-hidden"
            sx={{
                backgroundColor: currentBgColor,
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60"><text x="0" y="25" fill="rgba(255,255,255,0.2)" font-size="60px">.</text></svg>')`,
                backgroundSize: "30px 30px",
                padding: "4rem 0",
                borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={4} alignItems="center">
                    {/* Chip Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Box sx={{ 
                            padding: '4px',
                            borderRadius: '100px',
                            border: '1px solid rgba(255,255,255,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            backgroundColor: 'rgba(0,0,0,0.1)'
                        }}>
                            <Typography variant="caption" sx={{ 
                                fontSize: "0.75rem", 
                                fontWeight: 500, 
                                color: 'white',
                                ml: 2
                            }}>
                                {subtitle}
                            </Typography>
                            
                            <Box sx={{
                                backgroundColor: highlightColor,
                                padding: '4px 12px',
                                borderRadius: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <Person2OutlinedIcon sx={{ fontSize: '1rem', color: 'white' }} />
                                <Typography variant="caption" sx={{ 
                                    fontSize: "0.75rem", 
                                    fontWeight: 700, 
                                    color: 'white'
                                }}>
                                    {chipLabel}
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Heading Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Typography 
                            align="center" 
                            sx={{ 
                                fontSize: { xs: "2.2rem", md: "4.2rem" }, 
                                fontWeight: 500,
                                lineHeight: "1.2", 
                                maxWidth: "950px", 
                                letterSpacing: "-0.01em",
                                color: 'white',
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            {title}
                        </Typography>
                    </motion.div>

                    {/* Wave Section */}
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "120px" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <svg viewBox="0 0 122 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                            <path d="M1 5.5C10 5.5 10 1 20 1C30 1 30 9 40 9C50 9 50 1 60 1C70 1 70 9 80 9C90 9 90 1 100 1C110 1 110 9 121 9" stroke={highlightColor} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                </Stack>
            </Container>
        </Box>
    );
};

export default CelebrationComponent;
