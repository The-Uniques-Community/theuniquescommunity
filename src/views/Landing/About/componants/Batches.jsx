import React from "react";
import { Box, Typography, Grid, Card, Stack, Chip, Container } from "@mui/material";
import Button from "@/utils/Buttons/Button";
import { useTheme } from "@mui/material";
import uniques1 from "../../../../assets/img/About/uniques1.jpg";
import uniques2 from "../../../../assets/img/About/uniques2.jpg";
import uniques3 from "../../../../assets/img/About/uniques3.jpg";

import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../../theme/ThemeProvider";

const BatchProfile = () => {
  const { isDarkMode } = useThemeContext();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const batchData = [
    {
      label: "Batch 1.0",
      icon: "tabler-users",
      title: "The Uniques Batch 1.0",
      description:
        "The Uniques 1.0 batch is the pioneering group within The Uniques Community. These senior members have successfully completed their journey and are now placed in various esteemed organizations.\n\nThey have contributed immensely to the growth of the community and continue to mentor and inspire the upcoming batches.\n\nWith a strong foundation of innovation and leadership, Batch 1.0 has set high standards for excellence, paving the way for future cohorts to follow in their footsteps.",
      image: uniques1,
    },
    {
      label: "Batch 2.0",
      icon: "tabler-code",
      title: "The Uniques Batch 2.0",
      description:
        "The Uniques 2.0 batch consists of highly driven junior members who are actively enhancing their skills in modern technologies.\n\nWith a focus on collaboration and hands-on learning, they engage in real-world projects and hackathons, ensuring they are industry-ready.\n\nBatch 2.0 members benefit from mentorship programs, networking opportunities, and workshops to sharpen their expertise. They are on the path to becoming future innovators, following the footsteps of their predecessors while bringing fresh perspectives to the community.",
      image: uniques2,
    },
    {
      label: "Batch 3.0",
      icon: "tabler-rocket",
      title: "The Uniques Batch 3.0",
      description:
        "The latest addition to The Uniques Community, Batch 3.0, is a dynamic and ambitious group of individuals passionate about pushing boundaries.\n\nAs they embark on their journey, they are exposed to cutting-edge technologies, problem-solving challenges, and research-driven initiatives.\n\nWith an eagerness to learn and innovate, Batch 3.0 aims to make a lasting impact, bringing new ideas and energy to the community. They are being nurtured to be future leaders and trailblazers in their respective fields.",
      image: uniques3,
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "2rem 0" }}>
      <Container sx={{ width: "85%", maxWidth: "1200px", textAlign: "left" }}>
        {/* Header Section */}
        <Stack spacing={2} sx={{ marginBottom: "2rem", textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, color: theme.palette.primary.dark }}>
            Batch Profiles
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Explore the talented batches of The Uniques and their amazing achievements.
          </Typography>
        </Stack>

        {/* Tabs Section */}
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1, backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : theme.palette.background.default, borderRadius: "16px", padding: "8px 16px", width: "fit-content", margin: "auto" }}>
          {batchData.map((batch, index) => (
            <Chip
              key={index}
              label={batch.label}
              onClick={() => handleChange(null, index)}
              sx={{
                margin: "0 6px",
                width: { xs: "auto", sm: "110px" },
                height: "36px",
                fontSize: "0.75rem",
                backgroundColor: value === index ? "#CA0019" : (isDarkMode ? "rgba(255,255,255,0.1)" : theme.palette.action.hover),
                color: value === index ? "#fff" : (isDarkMode ? "rgba(255,255,255,0.7)" : theme.palette.text.secondary),
                borderRadius: "16px",
                fontWeight: value === index ? "bold" : "normal",
                cursor: "pointer",
                border: "none",
                ":hover": {
                  backgroundColor: value === index ? "#A50014" : (isDarkMode ? "rgba(255,255,255,0.2)" : theme.palette.action.selected),
                },
              }}
            />
          ))}
        </Box>

        {/* Dynamic Tab Content */}
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ marginTop: "2rem" }}>
          {/* Left Section */}
          <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
            <Card
              elevation={0}
              sx={{
                backgroundImage: `url(${batchData[value].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: { xs: "300px", sm: "400px", md: "500px" },
                borderRadius: "20px",
                boxShadow: isDarkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>

          {/* Right Section (Only Text and Button) */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{ 
                color: isDarkMode ? "rgba(255,255,255,0.7)" : theme.palette.text.secondary, 
                fontSize: { xs: "0.9rem", sm: "1.1rem" }, 
                lineHeight: 1.8,
                whiteSpace: "pre-line" 
              }}
            >
              {batchData[value].description}
            </Typography>

            {/* Know More Button */}
            <Box sx={{ marginTop: "2.5rem" }}>
              <Button
                bgColor="#CA0019"
                borderColor="#CA0019"
                textColor="#fff"
                iconColor="#CA0019"
                color="#fff"
                onClick={() => navigate("/batches")}
              >
                Know More
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BatchProfile;
