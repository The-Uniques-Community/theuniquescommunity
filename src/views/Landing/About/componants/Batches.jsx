import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, Stack, Container, Select, MenuItem, FormControl, Modal, IconButton } from "@mui/material";
import { X } from "lucide-react";
import Button from "@/utils/Buttons/Button";
import { useTheme } from "@mui/material";
import uniques1 from "../../../../assets/img/About/uniques1.webp";
import uniques2 from "../../../../assets/img/About/uniques2.webp";
import uniques3 from "../../../../assets/img/About/uniques3.webp";
import uniques4 from "../../../../assets/img/About/uniques4.webp";

import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../../theme/ThemeProvider";
import { getStoredBatchProfiles } from "@/utils/batch/batchProfilesData";

const BatchProfile = () => {
  const { isDarkMode } = useThemeContext();
  const [value, setValue] = useState(0);
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const [batchData, setBatchData] = useState(() => getStoredBatchProfiles());

  useEffect(() => {
    const handleUpdate = () => {
      setBatchData(getStoredBatchProfiles());
    };
    window.addEventListener("batch-profiles-updated", handleUpdate);
    return () => window.removeEventListener("batch-profiles-updated", handleUpdate);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const currentBatch = batchData[value] || batchData[0] || {};

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
          {/* Left Section - Clean picture with no thick frame */}
          <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
            <Box
              onClick={() => setSelectedImageModal(currentBatch)}
              sx={{
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.015)",
                }
              }}
            >
              <img
                src={currentBatch.image}
                alt={currentBatch.title}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "16px",
                  objectFit: "contain",
                }}
              />
            </Box>
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
              {currentBatch.title}
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
              {currentBatch.description}
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

      {/* Fullscreen Lightbox Image Modal */}
      <Modal
        open={Boolean(selectedImageModal)}
        onClose={() => setSelectedImageModal(null)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "92vw",
            maxHeight: "92vh",
            outline: "none",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: isDarkMode ? "#121212" : "#ffffff",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 1.5, sm: 2.5 }
          }}
        >
          <IconButton
            onClick={() => setSelectedImageModal(null)}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "#ffffff",
              zIndex: 10,
              "&:hover": {
                backgroundColor: "#CA0019",
              }
            }}
          >
            <X size={20} />
          </IconButton>

          {selectedImageModal && (
            <Box sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 1.5,
                  fontWeight: 700,
                  color: isDarkMode ? "#ffffff" : "#111111",
                  fontSize: { xs: "0.95rem", sm: "1.15rem" }
                }}
              >
                {selectedImageModal.title}
              </Typography>
              <img
                src={selectedImageModal.image}
                alt={selectedImageModal.title}
                style={{
                  maxWidth: "88vw",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: "12px",
                  display: "block",
                  margin: "0 auto"
                }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BatchProfile;
