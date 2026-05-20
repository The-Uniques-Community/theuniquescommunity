import React from "react";
import { Box, Typography, Grid, Card, Stack, Container, Select, MenuItem, FormControl } from "@mui/material";
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const navigate = useNavigate();

  const batchData = [
    {
      label: "Uniques 1.0",
      title: "The Uniques Batch 1.0",
      description:
        "The Uniques 1.0 batch is the pioneering group within The Uniques Community. These senior members have successfully completed their journey and are now placed in various esteemed organizations.\n\nThey have contributed immensely to the growth of the community and continue to mentor and inspire the upcoming batches.\n\nWith a strong foundation of innovation and leadership, Batch 1.0 has set high standards for excellence, paving the way for future cohorts to follow in their footsteps.",
      image: uniques1,
    },
    {
      label: "Uniques 2.0",
      title: "The Uniques Batch 2.0",
      description:
        "The Uniques 2.0 batch consists of highly driven junior members who are actively enhancing their skills in modern technologies.\n\nWith a focus on collaboration and hands-on learning, they engage in real-world projects and hackathons, ensuring they are industry-ready.\n\nBatch 2.0 members benefit from mentorship programs, networking opportunities, and workshops to sharpen their expertise. They are on the path to becoming future innovators, following the footsteps of their predecessors while bringing fresh perspectives to the community.",
      image: uniques2,
    },
    {
      label: "Uniques 3.0",
      title: "The Uniques Batch 3.0",
      description:
        "The latest addition to The Uniques Community, Batch 3.0, is a dynamic and ambitious group of individuals passionate about pushing boundaries.\n\nAs they embark on their journey, they are exposed to cutting-edge technologies, problem-solving challenges, and research-driven initiatives.\n\nWith an eagerness to learn and innovate, Batch 3.0 aims to make a lasting impact, bringing new ideas and energy to the community. They are being nurtured to be future leaders and trailblazers in their respective fields.",
      image: uniques3,
    },
    {
      label: "Uniques 4.0",
      title: "The Uniques Batch 4.0",
      description:
        "The Uniques 4.0 batch is the newest cohort carrying forward the legacy of innovation. They are actively engaged in advanced skills training across Python, Full-Stack Development, DSA, and Salesforce CRM modules.\n\nFocused on real-world implementation, Batch 4.0 is collaborating with community mentors on modern engineering challenges to prepare for elite placements.",
      image: uniques3, // Reusing uniques3.jpg as uniques4.jpg does not exist
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "2rem 0" }}>
      <Container sx={{ width: "85%", maxWidth: "1200px", textAlign: "left" }}>
        {/* Header and Dropdown Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            marginBottom: "2.5rem",
          }}
        >
          {/* Header Section */}
          <Stack spacing={1} sx={{ textAlign: "left" }}>
            <Typography variant="h2" sx={{ fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, color: theme.palette.primary.dark }}>
              Batch Profiles
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              Explore the talented batches of The Uniques and their amazing achievements.
            </Typography>
          </Stack>

          {/* Dropdown Section */}
          <FormControl sx={{ minWidth: 220, alignSelf: { xs: "stretch", md: "auto" } }}>
            <Select
              value={value}
              onChange={handleChange}
              sx={{
                borderRadius: "12px",
                color: isDarkMode ? "white" : "black",
                backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)",
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#CA0019",
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#CA0019",
                },
                '& .MuiSvgIcon-root': {
                  color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.5)",
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "12px",
                    backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
                    color: isDarkMode ? "white" : "black",
                    boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.1)",
                  }
                }
              }}
            >
              {batchData.map((batch, index) => (
                <MenuItem
                  key={index}
                  value={index}
                  sx={{
                    fontWeight: 500,
                    '&.Mui-selected': {
                      backgroundColor: "rgba(202, 0, 25, 0.15)",
                      color: "#CA0019",
                      '&:hover': {
                        backgroundColor: "rgba(202, 0, 25, 0.25)",
                      }
                    },
                    '&:hover': {
                      backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    }
                  }}
                >
                  {batch.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Dynamic Content */}
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ marginTop: "1rem" }}>
          {/* Left Section */}
          <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
            <Card
              elevation={0}
              sx={{
                height: { xs: "300px", sm: "400px", md: "500px" },
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: isDarkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={batchData[value].image}
                alt={batchData[value].title}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </Card>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "1rem",
                color: isDarkMode ? "white" : theme.palette.text.primary,
                fontSize: { xs: "1.2rem", sm: "1.5rem" }
              }}
            >
              {batchData[value].title}
            </Typography>
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
