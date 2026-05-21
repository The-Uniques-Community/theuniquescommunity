import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ScrollStack, { ScrollStackItem } from "@/utils/ScrollStack/ScrollStack";
import { useThemeContext } from "@/theme/ThemeProvider";

const infraImages = [
  {
    url: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5D1y1o4fQ57NPj9YlOJCumqw8S4bfTIih3gXv",
    title: "Modern Workspaces",
    desc: "State-of-the-art office environments designed for productivity."
  },
  {
    url: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5QYO1p4UA0Cpb4ysi61TzJLRaW735foPjv8GS",
    title: "Eco-Friendly Campus",
    desc: "Sustainable architecture meeting modern technology."
  },
  {
    url: "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5XLjoIcBdwE1zgNU9nBLxO62lZYuAWsqiRGCt",
    title: "Innovation Hub",
    desc: "Where ideas transform into reality through advanced R&D."
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    title: "Collaborative Zones",
    desc: "Open spaces that foster creativity and team synergy."
  },
  {
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    title: "Architectural Excellence",
    desc: "A campus that inspires through thoughtful structural design."
  },
  {
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80",
    title: "Premium Interiors",
    desc: "Elegance meets functionality in every corner."
  }
];

const Infrastructure = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <Box sx={{
      pt: 12,
      pb: 8,
      backgroundColor: isDarkMode ? "#161616" : "#f8f9fa",
      overflow: "hidden"
    }}>
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.5rem", md: "4rem" },
            color: isDarkMode ? "white" : "#1a1a1a",
            mb: 2,
            letterSpacing: "-0.02em"
          }}
        >
          Corporate <span style={{ color: "#ca0019" }}>in Campus</span>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
            maxWidth: "600px",
            mx: "auto",
            fontSize: "1.1rem"
          }}
        >
          Explore our world-class infrastructure designed to nurture the next generation of tech leaders.
        </Typography>
      </Container>

      <Box sx={{ width: "100%", position: "relative" }}>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={100}
          itemScale={0.03}
          itemStackDistance={35}
          baseScale={0.92}
          rotationAmount={0.5}
          blurAmount={1}
        >
          {infraImages.map((img, index) => (
            <ScrollStackItem key={index}>
              <Box sx={{
                width: "100%",
                height: { xs: "400px", md: "500px" },
                position: "relative",
                borderRadius: "40px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}>
                <img
                  src={img.url}
                  alt={img.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7)"
                  }}
                />
                <Box sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  padding: { xs: "2rem", md: "3rem" },
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  color: "white"
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {img.title}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    {img.desc}
                  </Typography>
                </Box>
              </Box>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </Box>
    </Box>
  );
};

export default Infrastructure;
