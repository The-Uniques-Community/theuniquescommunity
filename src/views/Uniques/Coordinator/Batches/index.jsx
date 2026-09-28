import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  IconButton,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useThemeContext } from "@/theme/ThemeProvider";
import {
  getStoredBatchProfiles,
  saveStoredBatchProfiles,
  resetStoredBatchProfiles,
  DEFAULT_BATCH_PROFILES,
} from "@/utils/batch/batchProfilesData";
import { addStoredBatch } from "@/utils/batch/batchesData";

const CoordinatorBatches = () => {
  const { isDarkMode } = useThemeContext();
  const [profiles, setProfiles] = useState(() => getStoredBatchProfiles());
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Form states for the currently selected batch
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Notification state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // New batch modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newBatchName, setNewBatchName] = useState("");

  // Load profiles and sync form fields
  useEffect(() => {
    const loaded = getStoredBatchProfiles();
    setProfiles(loaded);
  }, []);

  useEffect(() => {
    if (profiles.length > 0 && profiles[selectedIndex]) {
      const current = profiles[selectedIndex];
      setLabel(current.label || "");
      setTitle(current.title || "");
      setDescription(current.description || "");
      setImage(current.image || "");
    }
  }, [selectedIndex, profiles]);

  // Handle image upload from computer
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: "Please choose an image smaller than 5MB.",
          severity: "warning",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setSnackbar({
          open: true,
          message: "Photo loaded! Click 'Save Changes' to update the batch.",
          severity: "info",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to the selected batch profile
  const handleSave = () => {
    if (!profiles[selectedIndex]) return;

    const updatedProfile = {
      ...profiles[selectedIndex],
      label: label.trim() || profiles[selectedIndex].label,
      title: title.trim() || profiles[selectedIndex].title,
      description: description.trim(),
      image: image || profiles[selectedIndex].image,
      customImage: Boolean(
        image &&
        (image.startsWith("data:") ||
          image.startsWith("http://") ||
          image.startsWith("https://"))
      ),
    };

    const updatedList = [...profiles];
    updatedList[selectedIndex] = updatedProfile;

    saveStoredBatchProfiles(updatedList);
    setProfiles(updatedList);

    setSnackbar({
      open: true,
      message: `Batch "${updatedProfile.label}" updated successfully! Changes are live on the website.`,
      severity: "success",
    });
  };

  // Reset current batch or all batches to defaults
  const handleResetCurrent = () => {
    const defaultItem = DEFAULT_BATCH_PROFILES.find(
      (d) => d.id === profiles[selectedIndex]?.id || d.label === profiles[selectedIndex]?.label
    );

    if (defaultItem) {
      setLabel(defaultItem.label);
      setTitle(defaultItem.title);
      setDescription(defaultItem.description);
      setImage(defaultItem.image);

      const updatedList = [...profiles];
      updatedList[selectedIndex] = { ...defaultItem };
      saveStoredBatchProfiles(updatedList);
      setProfiles(updatedList);

      setSnackbar({
        open: true,
        message: `Batch "${defaultItem.label}" reset to default values.`,
        severity: "info",
      });
    } else {
      setSnackbar({
        open: true,
        message: "No default preset found for this custom batch.",
        severity: "warning",
      });
    }
  };

  // Create a new batch
  const handleAddNewBatch = () => {
    if (!newBatchName.trim()) return;

    const trimmed = newBatchName.trim();
    // Normalize label (e.g., "5.0" -> "Uniques 5.0", "The Uniques 5.0" -> "Uniques 5.0")
    let batchLabel = trimmed;
    if (batchLabel.toLowerCase().startsWith("the uniques")) {
      batchLabel = batchLabel.replace(/^the\s+/i, "");
    } else if (!batchLabel.toLowerCase().startsWith("uniques")) {
      batchLabel = `Uniques ${batchLabel}`;
    }

    const batchTitle = batchLabel.toLowerCase().startsWith("the ")
      ? batchLabel
      : `The ${batchLabel}`;

    const newProfile = {
      id: `batch-${Date.now()}`,
      label: batchLabel,
      title: batchTitle,
      description: `${batchTitle} is actively engaged in advanced skills training, projects, and innovation within The Uniques Community.`,
      image: profiles[0]?.image || "",
      customImage: false,
    };

    // Also register in member batches list
    addStoredBatch(batchTitle);

    const updated = [...profiles, newProfile];
    saveStoredBatchProfiles(updated);
    setProfiles(updated);
    setSelectedIndex(updated.length - 1);
    setNewBatchName("");
    setAddModalOpen(false);

    setSnackbar({
      open: true,
      message: `New batch "${batchLabel}" added successfully!`,
      severity: "success",
    });
  };

  const currentProfile = profiles[selectedIndex] || {};

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      {/* Top Page Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "12px",
              backgroundColor: "rgba(202, 0, 25, 0.12)",
              color: "#CA0019",
            }}
          >
            <ClassIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Batch Profiles Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select and update batch details, photos, and descriptions shown dynamically on the landing page.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Batch Selector Bar */}
      <Card
        sx={{
          mb: 4,
          p: 2.5,
          borderRadius: "14px",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-batch-label">Select Batch</InputLabel>
              <Select
                labelId="select-batch-label"
                value={selectedIndex}
                label="Select Batch"
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                sx={{ borderRadius: "10px" }}
              >
                {profiles.map((p, idx) => (
                  <MenuItem key={p.id || idx} value={idx}>
                    {p.label || `Batch ${idx + 1}`} - {p.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <Stack direction="row" spacing={1.5} justifyContent={{ xs: "flex-start", sm: "flex-end" }}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setAddModalOpen(true)}
                sx={{
                  borderColor: "#CA0019",
                  color: "#CA0019",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#a60014",
                    backgroundColor: "rgba(202, 0, 25, 0.08)",
                  },
                }}
              >
                Add New Batch
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Main Content Grid: Editor on Left, Live Preview on Right */}
      <Grid container spacing={3}>
        {/* Editor Form */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              borderRadius: "16px",
              p: 3,
              backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Edit Batch Details
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                label="Batch Short Label"
                fullWidth
                size="small"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                helperText="Used in dropdowns (e.g., Uniques 4.0)"
              />

              <TextField
                label="Batch Heading / Title"
                fullWidth
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                helperText="Main title displayed on the profile (e.g., The Uniques Batch 4.0)"
              />

              {/* Photo Upload Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Batch Photo
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: "12px",
                    border: isDarkMode ? "1px dashed rgba(255,255,255,0.2)" : "1px dashed rgba(0,0,0,0.15)",
                    backgroundColor: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                  }}
                >
                  <Box
                    sx={{
                      width: 90,
                      height: 70,
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={image}
                      alt={title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      size="small"
                      sx={{
                        backgroundColor: "#CA0019",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#a60014" },
                      }}
                    >
                      Upload New Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                      Supports JPG, PNG, WEBP (Max 5MB)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Description TextArea */}
              <TextField
                label="Description About the Batch"
                fullWidth
                multiline
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                helperText="Enter detailed achievements, skills, and projects of this batch (supports paragraphs)."
              />

              {/* Action Buttons */}
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<RestartAltIcon />}
                  onClick={handleResetCurrent}
                  sx={{ textTransform: "none", borderRadius: "10px" }}
                >
                  Reset to Default
                </Button>

                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#CA0019",
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 3,
                    "&:hover": { backgroundColor: "#a60014" },
                  }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* Live Website Preview Card */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              borderRadius: "16px",
              p: 3,
              backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <VisibilityIcon sx={{ color: "#CA0019", fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Live Website Preview
              </Typography>
            </Stack>

            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: "14px",
                backgroundColor: isDarkMode ? "#121212" : "#fbfbfb",
                border: isDarkMode ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Batch image */}
              <Box
                sx={{
                  width: "100%",
                  maxHeight: 280,
                  borderRadius: "12px",
                  overflow: "hidden",
                  mb: 2.5,
                  backgroundColor: "rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={image}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 280,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  color: isDarkMode ? "#ffffff" : "#111827",
                }}
              >
                {title || "The Uniques Batch"}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? "rgba(255,255,255,0.7)" : "#4b5563",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                  fontSize: "0.95rem",
                }}
              >
                {description || "No description provided yet."}
              </Typography>

              {/* Mock Know More Button */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    backgroundColor: "#CA0019 !important",
                    color: "#fff !important",
                    opacity: "1 !important",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                  }}
                >
                  Know More ↗
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Add New Batch Modal */}
      <Dialog
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "14px",
            backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Batch</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the name of the new cohort batch (e.g. Uniques 5.0 or 5.0):
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Batch Name"
            placeholder="e.g. Uniques 5.0"
            value={newBatchName}
            onChange={(e) => setNewBatchName(e.target.value)}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setAddModalOpen(false)}
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddNewBatch}
            disabled={!newBatchName.trim()}
            sx={{
              backgroundColor: "#CA0019",
              "&:hover": { backgroundColor: "#a60014" },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Create Batch
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoordinatorBatches;
