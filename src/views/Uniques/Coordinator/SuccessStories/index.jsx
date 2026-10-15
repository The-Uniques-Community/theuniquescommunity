import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  CircularProgress,
  Stack,
  Tooltip,
  Switch,
  FormControlLabel,
  InputAdornment,
  Divider,
  Tabs,
  Tab,
  Paper,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  alpha,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  AutoStories as AutoStoriesIcon,
  AccountTree as AccountTreeIcon,
  Layers as LayersIcon,
  Public as PublicIcon,
  Category as CategoryIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Timeline as TimelineIcon,
  Launch as LaunchIcon,
  Close as CloseIcon,
  PlayCircleOutline as VideoIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  FilterList as FilterListIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useThemeContext } from "@/theme/ThemeProvider";
import tu from "@/assets/logos/tu.png";
import userIcon from "@/assets/img/user-icon.webp";
import {
  fetchSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
  getStoredSuccessStories,
  restoreDefaultSuccessStories,
} from "@/utils/successStories/successStoriesApi";

// Batches: "Uniques" without "The", as requested
const MAIN_BATCHES = [
  "Uniques 1.0",
  "Uniques 2.0",
  "Uniques 3.0",
  "Uniques 4.0",
];

const MORE_BATCHES = [
  "Uniques 5.0",
  "Uniques 6.0",
  "Uniques 7.0",
];

const BATCH_OPTIONS = [...MAIN_BATCHES, ...MORE_BATCHES];

export const normalizeBatch = (batchStr) => {
  if (!batchStr) return "Uniques 1.0";
  return batchStr.replace(/^the\s+/i, "").trim();
};

const EMPTY_STORY_FORM = {
  id: "",
  storyId: "",
  name: "",
  role: "",
  company: "",
  batch: "Uniques 1.0",
  image: "",
  video: "",
  summary: "",
  isPublished: true,
  timeline: [
    { year: 2021, achievements: ["Joined Uniques Community"] },
    { year: 2024, achievements: ["Placed in leading technology firm"] },
  ],
  education: {
    institution: "Swami Vivekanand Institute of Engineering And Technology",
    degree: "B.Tech Computer Science Engineering",
    duration: "2021-2025",
    location: "Chandigarh",
    details: "",
  },
  experience: [
    {
      company: "",
      role: "",
      duration: "",
      location: "",
      responsibilities: [""],
    },
  ],
  projects: [
    {
      name: "",
      technologies: "",
      date: "",
      description: "",
      achievements: [""],
    },
  ],
  skills: {
    languages: "JavaScript, Python, C++",
    technologies: "React, Node.js, Express, MongoDB",
    tools: "Git, VS Code, Postman",
  },
  leadership: {
    organization: "The Uniques Community",
    role: "Core Member",
    duration: "2023 - Present",
    achievements: [""],
  },
};

const CoordinatorSuccessStories = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // State
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");

  // More Batches Menu Anchor
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const handleOpenMoreMenu = (e) => setMoreMenuAnchor(e.currentTarget);
  const handleCloseMoreMenu = () => setMoreMenuAnchor(null);
  const isMoreBatchSelected = MORE_BATCHES.includes(selectedBatch);

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(EMPTY_STORY_FORM);
  const [formTab, setFormTab] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // View Details Modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [viewTab, setViewTab] = useState(0);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Load stories
  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await fetchSuccessStories(true);
      if (Array.isArray(data)) {
        setStories(data);
      }
    } catch (err) {
      console.error("Failed to load success stories:", err);
      toast.error("Failed to fetch success stories");
      const fallback = getStoredSuccessStories();
      setStories(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();

    const handleUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setStories(e.detail);
      } else {
        loadStories();
      }
    };

    window.addEventListener("success-stories-updated", handleUpdate);
    return () => {
      window.removeEventListener("success-stories-updated", handleUpdate);
    };
  }, []);

  // Filtered stories: supports both "Uniques X.0" and legacy "The Uniques X.0"
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const q = searchQuery.toLowerCase().trim();
      const storyBatchNorm = normalizeBatch(story.batch).toLowerCase();
      const selectedBatchNorm = normalizeBatch(selectedBatch).toLowerCase();

      const matchesSearch =
        !q ||
        story.name?.toLowerCase().includes(q) ||
        story.role?.toLowerCase().includes(q) ||
        story.company?.toLowerCase().includes(q) ||
        story.summary?.toLowerCase().includes(q) ||
        storyBatchNorm.includes(q) ||
        (story.skills?.technologies &&
          String(story.skills.technologies).toLowerCase().includes(q));

      const matchesBatch =
        selectedBatch === "all" || storyBatchNorm === selectedBatchNorm;

      return matchesSearch && matchesBatch;
    });
  }, [stories, searchQuery, selectedBatch]);

  // Dashboard Stats Calculations (Matching Pic 3)
  const totalStories = stories.length;
  const uniques1Stories = stories.filter(
    (s) => normalizeBatch(s.batch).toLowerCase() === "uniques 1.0"
  ).length;
  const placedCount =
    stories.filter((s) => s.company && s.company.trim()).length || totalStories;
  const uniqueDomainsCount = useMemo(() => {
    const roles = new Set(
      stories
        .map((s) => s.role)
        .filter(Boolean)
        .map((r) => r.trim().toLowerCase())
    );
    return roles.size || (stories.length > 0 ? Math.min(stories.length, 10) : 0);
  }, [stories]);

  // Open Create Dialog
  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({
      ...EMPTY_STORY_FORM,
      timeline: [
        { year: 2021, achievements: ["Joined Uniques Community"] },
        { year: 2024, achievements: ["Placed in leading technology firm"] },
      ],
    });
    setFormTab(0);
    setFormOpen(true);
  };

  // Open Edit Dialog
  const handleOpenEdit = (story) => {
    setIsEditing(true);
    setFormData({
      ...EMPTY_STORY_FORM,
      ...story,
      batch: normalizeBatch(story.batch),
      skills: {
        languages: Array.isArray(story.skills?.languages)
          ? story.skills.languages.join(", ")
          : story.skills?.languages || "",
        technologies: Array.isArray(story.skills?.technologies)
          ? story.skills.technologies.join(", ")
          : story.skills?.technologies || "",
        tools: Array.isArray(story.skills?.tools)
          ? story.skills.tools.join(", ")
          : story.skills?.tools || "",
      },
      timeline:
        Array.isArray(story.timeline) && story.timeline.length > 0
          ? story.timeline
          : [{ year: new Date().getFullYear(), achievements: [""] }],
      education: story.education || EMPTY_STORY_FORM.education,
      experience: Array.isArray(story.experience) ? story.experience : [],
      projects: Array.isArray(story.projects) ? story.projects : [],
    });
    setFormTab(0);
    setFormOpen(true);
  };

  // Open View Details Modal
  const handleOpenView = (story) => {
    setSelectedStory(story);
    setViewTab(0);
    setViewModalOpen(true);
  };

  // Open Delete Confirmation
  const handleOpenDelete = (story) => {
    setStoryToDelete(story);
    setDeleteDialogOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!storyToDelete) return;
    try {
      setDeleting(true);
      const toDelete = { ...storyToDelete };
      const targetId = toDelete.id || toDelete._id || toDelete.storyId;
      const targetName = toDelete.name?.trim().toLowerCase();

      // Pass full object so deleteSuccessStory can match by any ID and name
      await deleteSuccessStory(toDelete);

      // Immediately filter from current view state
      setStories((prev) =>
        prev.filter((s) => {
          const sIds = [s.id, s.storyId, s._id].filter(Boolean).map(String);
          const matchId = targetId && sIds.includes(String(targetId));
          const matchName = targetName && s.name?.trim().toLowerCase() === targetName;
          return !matchId && !matchName;
        })
      );

      toast.success(`Success story of "${toDelete.name}" deleted successfully`);
      setDeleteDialogOpen(false);
      setStoryToDelete(null);

      if (
        selectedStory &&
        (selectedStory.id === targetId ||
          selectedStory._id === targetId ||
          selectedStory.name?.trim().toLowerCase() === targetName)
      ) {
        setViewModalOpen(false);
        setSelectedStory(null);
      }
    } catch (err) {
      console.error("Failed to delete story:", err);
      toast.error(err?.response?.data?.message || "Failed to delete success story");
    } finally {
      setDeleting(false);
    }
  };

  // Form Submit (Create or Update)
  const handleSubmitForm = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter the student's name");
      setFormTab(0);
      return;
    }

    try {
      setSubmitting(true);

      const processedSkills = {
        languages:
          typeof formData.skills?.languages === "string"
            ? formData.skills.languages.split(",").map((s) => s.trim()).filter(Boolean)
            : formData.skills?.languages || [],
        technologies:
          typeof formData.skills?.technologies === "string"
            ? formData.skills.technologies.split(",").map((s) => s.trim()).filter(Boolean)
            : formData.skills?.technologies || [],
        tools:
          typeof formData.skills?.tools === "string"
            ? formData.skills.tools.split(",").map((s) => s.trim()).filter(Boolean)
            : formData.skills?.tools || [],
      };

      const payload = {
        ...formData,
        batch: normalizeBatch(formData.batch),
        skills: processedSkills,
      };

      if (isEditing) {
        const targetId = formData.id || formData._id || formData.storyId;
        const updated = await updateSuccessStory(targetId, payload);
        toast.success("Success story updated successfully!");
        setStories((prev) =>
          prev.map((s) =>
            s.id === targetId || s.storyId === targetId || String(s._id) === String(targetId)
              ? { ...s, ...updated }
              : s
          )
        );
      } else {
        const created = await createSuccessStory(payload);
        toast.success("Success story created successfully!");
        setStories((prev) => [created, ...prev]);
      }

      setFormOpen(false);
    } catch (err) {
      console.error("Error saving success story:", err);
      toast.error(err?.response?.data?.message || "Failed to save success story");
    } finally {
      setSubmitting(false);
    }
  };

  // Helpers for timeline milestone edits
  const handleTimelineYearChange = (index, year) => {
    const list = Array.isArray(formData.timeline) ? [...formData.timeline] : [];
    if (list[index]) {
      list[index] = { ...list[index], year };
      setFormData({ ...formData, timeline: list });
    }
  };

  const handleTimelineAchChange = (timelineIndex, achIndex, text) => {
    const list = Array.isArray(formData.timeline) ? [...formData.timeline] : [];
    if (list[timelineIndex]) {
      const achs = [...(list[timelineIndex].achievements || [])];
      achs[achIndex] = text;
      list[timelineIndex] = { ...list[timelineIndex], achievements: achs };
      setFormData({ ...formData, timeline: list });
    }
  };

  const handleAddTimelineYear = () => {
    const list = Array.isArray(formData.timeline) ? [...formData.timeline] : [];
    setFormData({
      ...formData,
      timeline: [
        ...list,
        { year: new Date().getFullYear(), achievements: [""] },
      ],
    });
  };

  const handleRemoveTimelineYear = (index) => {
    const list = Array.isArray(formData.timeline) ? [...formData.timeline] : [];
    setFormData({
      ...formData,
      timeline: list.filter((_, i) => i !== index),
    });
  };

  const handleAddAchievement = (timelineIndex) => {
    const list = Array.isArray(formData.timeline) ? [...formData.timeline] : [];
    if (list[timelineIndex]) {
      const achs = [...(list[timelineIndex].achievements || []), ""];
      list[timelineIndex] = { ...list[timelineIndex], achievements: achs };
      setFormData({ ...formData, timeline: list });
    }
  };

  const handleRemoveAchievement = (timelineIndex, achIndex) => {
    const list = Array.isArray(formData.timeline) ? [...formData.timeline] : [];
    if (list[timelineIndex]) {
      const achs = (list[timelineIndex].achievements || []).filter((_, i) => i !== achIndex);
      list[timelineIndex] = { ...list[timelineIndex], achievements: achs };
      setFormData({ ...formData, timeline: list });
    }
  };

  // Restore default stories (brings back Ronit JaiPrakash and initial stories)
  const handleRestoreDefaults = () => {
    const restored = restoreDefaultSuccessStories();
    setStories(restored);
    toast.success("Default success stories (including Ronit JaiPrakash) restored!");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minHeight: "100vh" }}>
      {/* Top Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AutoStoriesIcon sx={{ color: "#ca0019", fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
              Success Stories Dashboard
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: "text.secondary", mt: 0.5 }}>
            Manage community members' inspiring career journeys, achievements & alumni profiles
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleRestoreDefaults}
            sx={{
              borderRadius: "8px",
              borderColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              color: isDarkMode ? "#fff" : "#333",
              "&:hover": {
                borderColor: "#ca0019",
                color: "#ca0019",
              },
            }}
          >
            Restore Defaults
          </Button>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadStories}
            disabled={loading}
            sx={{
              borderRadius: "8px",
              borderColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              color: isDarkMode ? "#fff" : "#333",
              "&:hover": {
                borderColor: "#ca0019",
                color: "#ca0019",
              },
            }}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
            sx={{
              backgroundColor: "#ca0019",
              color: "#ffffff",
              borderRadius: "8px",
              fontWeight: 600,
              px: 2.5,
              py: 1,
              "&:hover": {
                backgroundColor: "#a10014",
              },
            }}
          >
            Add Success Story
          </Button>
        </Stack>
      </Box>

      {/* DASHBOARD STATS CARDS (Over the cards - Exact Match to Pic 3) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Stories */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.06)",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isDarkMode ? "0 8px 25px rgba(202,0,25,0.2)" : "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                Total Stories
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <AccountTreeIcon sx={{ mr: 1.5, color: "#ca0019", fontSize: 30 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {totalStories}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Uniques 1.0 Stories */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.06)",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isDarkMode ? "0 8px 25px rgba(24,144,255,0.2)" : "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                Uniques 1.0 Stories
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <LayersIcon sx={{ mr: 1.5, color: "#1890ff", fontSize: 30 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {uniques1Stories}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Live Web Portals / Placed Profiles */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.06)",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isDarkMode ? "0 8px 25px rgba(82,196,26,0.2)" : "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                Live Portals & Profiles
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <PublicIcon sx={{ mr: 1.5, color: "#52c41a", fontSize: 30 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {placedCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Story Roles & Domains */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.06)",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isDarkMode ? "0 8px 25px rgba(250,173,20,0.2)" : "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                Project & Tech Domains
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <CategoryIcon sx={{ mr: 1.5, color: "#faad14", fontSize: 30 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {uniqueDomainsCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SEARCH AND BATCH FILTER BAR (Clean single-row alignment with integrated More batches Menu) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 4,
          p: 2,
          backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
          borderRadius: 2.5,
          border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
          boxShadow: isDarkMode ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        {/* Search Input */}
        <TextField
          placeholder="Search by name, role, company, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{
            minWidth: { xs: "100%", md: 320, lg: 380 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: isDarkMode ? "#27272a" : "#f9f9fb",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery("")}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Batch Filter Buttons (All on the same line, no awkward breaking) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700, mr: 0.5 }}>
            Batch:
          </Typography>

          <Chip
            label="All Batches"
            onClick={() => {
              setSelectedBatch("all");
              handleCloseMoreMenu();
            }}
            sx={{
              fontWeight: selectedBatch === "all" ? 700 : 500,
              backgroundColor: selectedBatch === "all" ? "#ca0019" : isDarkMode ? "#27272a" : "#f4f4f5",
              color: selectedBatch === "all" ? "#ffffff" : "inherit",
              cursor: "pointer",
              borderRadius: "16px",
              height: 32,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: selectedBatch === "all" ? "#a10014" : isDarkMode ? "#3f3f46" : "#e4e4e7",
              },
            }}
          />

          {MAIN_BATCHES.map((b) => {
            const isSelected = selectedBatch === b;
            return (
              <Chip
                key={b}
                label={b}
                onClick={() => {
                  setSelectedBatch(b);
                  handleCloseMoreMenu();
                }}
                sx={{
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? "#ca0019" : isDarkMode ? "#27272a" : "#f4f4f5",
                  color: isSelected ? "#ffffff" : "inherit",
                  cursor: "pointer",
                  borderRadius: "16px",
                  height: 32,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: isSelected ? "#a10014" : isDarkMode ? "#3f3f46" : "#e4e4e7",
                  },
                }}
              />
            );
          })}

          {/* More Batches Dropdown Chip */}
          <Chip
            label={isMoreBatchSelected ? `${selectedBatch} ▾` : "More batches ▾"}
            onClick={handleOpenMoreMenu}
            sx={{
              fontWeight: isMoreBatchSelected ? 700 : 500,
              backgroundColor: isMoreBatchSelected
                ? "#ca0019"
                : isDarkMode
                ? "#27272a"
                : "#f4f4f5",
              color: isMoreBatchSelected ? "#ffffff" : "inherit",
              cursor: "pointer",
              borderRadius: "16px",
              height: 32,
              border: isMoreBatchSelected
                ? "none"
                : isDarkMode
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid rgba(0,0,0,0.12)",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: isMoreBatchSelected ? "#a10014" : isDarkMode ? "#3f3f46" : "#e4e4e7",
              },
            }}
          />

          <Menu
            anchorEl={moreMenuAnchor}
            open={Boolean(moreMenuAnchor)}
            onClose={handleCloseMoreMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                mt: 1,
                minWidth: 150,
                backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
                border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
              },
            }}
          >
            {MORE_BATCHES.map((b) => (
              <MenuItem
                key={b}
                selected={selectedBatch === b}
                onClick={() => {
                  setSelectedBatch(b);
                  handleCloseMoreMenu();
                }}
                sx={{
                  fontWeight: selectedBatch === b ? 700 : 500,
                  color: selectedBatch === b ? "#ca0019" : "inherit",
                  py: 1,
                  px: 2,
                  "&.Mui-selected": {
                    backgroundColor: isDarkMode ? "rgba(202,0,25,0.15)" : "rgba(202,0,25,0.08)",
                  },
                }}
              >
                {b}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* SECTION TITLE: SUCCESS STORY CARDS */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Community Success Stories ({filteredStories.length})
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Authenticated Coordinator CRUD Enabled
        </Typography>
      </Box>

      {/* LOADING STATE */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: "#ca0019" }} />
        </Box>
      ) : filteredStories.length === 0 ? (
        /* EMPTY STATE */
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
          }}
        >
          <AutoStoriesIcon sx={{ fontSize: 56, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No Success Stories Found
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            {searchQuery || selectedBatch !== "all"
              ? "Try adjusting your search criteria or batch filter."
              : "Start inspiring others by adding your first community success story!"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
            sx={{ backgroundColor: "#ca0019", "&:hover": { backgroundColor: "#a10014" } }}
          >
            Add New Story
          </Button>
        </Card>
      ) : (
        /* CARDS GRID (Merged Edit/Delete Icons, Unobstructed Student Info, Clean Layout) */
        <Grid container spacing={3}>
          {filteredStories.map((story) => {
            const storyKey = story.id || story._id || story.storyId;
            const isPublished = story.isPublished !== false;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={storyKey}>
                <Card
                  sx={{
                    borderRadius: 2.5,
                    border: isDarkMode
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.08)",
                    backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
                    boxShadow: isDarkMode
                      ? "0 4px 20px rgba(0,0,0,0.4)"
                      : "0 2px 10px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: isDarkMode ? "rgba(202,0,25,0.4)" : "rgba(202,0,25,0.3)",
                      boxShadow: isDarkMode
                        ? "0 10px 30px rgba(202,0,25,0.25)"
                        : "0 10px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    {/* Header Row: TU Logo & Batch on Left, Status Badge & Merged Actions on Right */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        pb: 1.5,
                        borderBottom: isDarkMode
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <Box
                          component="img"
                          src={tu}
                          alt="Uniques"
                          sx={{ width: 20, height: 20, objectFit: "contain" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: isDarkMode ? "#f4f4f5" : "#18181b",
                            fontSize: "0.85rem",
                          }}
                        >
                          {normalizeBatch(story.batch)}
                        </Typography>
                      </Box>

                      {/* Merged Actions & Status Pill in one cohesive row */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                        <Chip
                          label={isPublished ? "Active" : "Draft"}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            backgroundColor: isPublished
                              ? "rgba(34, 197, 94, 0.15)"
                              : isDarkMode
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(0,0,0,0.06)",
                            color: isPublished ? "#16a34a" : isDarkMode ? "#a1a1aa" : "#71717a",
                            border: isPublished
                              ? "1px solid rgba(34, 197, 94, 0.3)"
                              : isDarkMode
                              ? "1px solid rgba(255,255,255,0.12)"
                              : "1px solid rgba(0,0,0,0.1)",
                          }}
                        />

                        <Tooltip title="Edit Story" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEdit(story);
                            }}
                            sx={{
                              width: 26,
                              height: 26,
                              borderRadius: "6px",
                              color: "#2563eb",
                              backgroundColor: isDarkMode ? "rgba(37,99,235,0.12)" : "rgba(37,99,235,0.08)",
                              border: isDarkMode ? "1px solid rgba(37,99,235,0.25)" : "1px solid rgba(37,99,235,0.2)",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                transform: "translateY(-1px)",
                                boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
                              },
                            }}
                          >
                            <EditIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Story" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDelete(story);
                            }}
                            sx={{
                              width: 26,
                              height: 26,
                              borderRadius: "6px",
                              color: "#dc2626",
                              backgroundColor: isDarkMode ? "rgba(220,38,38,0.12)" : "rgba(220,38,38,0.08)",
                              border: isDarkMode ? "1px solid rgba(220,38,38,0.25)" : "1px solid rgba(220,38,38,0.2)",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "#dc2626",
                                color: "#ffffff",
                                transform: "translateY(-1px)",
                                boxShadow: "0 2px 6px rgba(220,38,38,0.3)",
                              },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    {/* Member Details: Avatar + Name + Role (Full Width, Zero Overlap) */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.8, mb: 2 }}>
                      <Avatar
                        src={story.image || userIcon}
                        alt={story.name}
                        sx={{
                          width: 58,
                          height: 58,
                          border: "2px solid #ca0019",
                          boxShadow: "0 4px 10px rgba(202,0,25,0.2)",
                          flexShrink: 0,
                        }}
                      >
                        <PersonIcon />
                      </Avatar>

                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.02rem",
                            lineHeight: 1.25,
                            color: isDarkMode ? "#f4f4f5" : "#18181b",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={story.name}
                        >
                          {story.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.82rem",
                            lineHeight: 1.35,
                            mt: 0.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {story.role || "Community Member"}
                          {story.company ? ` at ${story.company}` : ""}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Bio / Summary Excerpt */}
                    {story.summary && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.82rem",
                          lineHeight: 1.45,
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          fontStyle: "italic",
                        }}
                      >
                        "{story.summary}"
                      </Typography>
                    )}

                    {/* Skills preview chips */}
                    {story.skills && (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2, mt: "auto" }}>
                        {(Array.isArray(story.skills.technologies)
                          ? story.skills.technologies
                          : String(story.skills.technologies || "")
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                        )
                          .slice(0, 3)
                          .map((tech, i) => (
                            <Chip
                              key={i}
                              label={tech}
                              size="small"
                              sx={{
                                fontSize: "0.7rem",
                                height: 20,
                                backgroundColor: isDarkMode
                                  ? "rgba(255,255,255,0.06)"
                                  : "rgba(0,0,0,0.04)",
                              }}
                            />
                          ))}
                      </Box>
                    )}

                    {/* Action Button: "View Details" */}
                    <Box sx={{ mt: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleOpenView(story)}
                        sx={{
                          backgroundColor: "#ca0019",
                          color: "#ffffff",
                          borderRadius: "8px",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          textTransform: "none",
                          py: 0.9,
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#a10014",
                            boxShadow: "0 4px 14px rgba(202,0,25,0.35)",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* ========================================================================= */}
      {/* VIEW DETAILS MODAL */}
      {/* ========================================================================= */}
      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
          },
        }}
      >
        {selectedStory && (
          <>
            <DialogTitle
              sx={{
                p: 2.5,
                borderBottom: isDarkMode
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  src={selectedStory.image || userIcon}
                  alt={selectedStory.name}
                  sx={{ width: 48, height: 48, border: "2px solid #ca0019" }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {selectedStory.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {selectedStory.role} {selectedStory.company ? `• ${selectedStory.company}` : ""} •{" "}
                    {normalizeBatch(selectedStory.batch)}
                  </Typography>
                </Box>
              </Box>

              <IconButton onClick={() => setViewModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2.5 }}>
              <Tabs
                value={viewTab}
                onChange={(_, val) => setViewTab(val)}
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
                  "& .Mui-selected": { color: "#ca0019" },
                  "& .MuiTabs-indicator": { backgroundColor: "#ca0019" },
                }}
              >
                <Tab label="Overview" />
                <Tab label="Timeline Milestones" />
                <Tab label="Education & Skills" />
                {selectedStory.video && <Tab label="Video Story" />}
              </Tabs>
            </Box>

            <DialogContent sx={{ p: 3 }}>
              {/* Tab 0: Overview */}
              {viewTab === 0 && (
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 0.5 }}>
                      Story Summary
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {selectedStory.summary || "No summary provided for this success story."}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: isDarkMode ? "#27272a" : "#f4f4f5",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Current Company
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedStory.company || "Not specified"}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: isDarkMode ? "#27272a" : "#f4f4f5",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Current Role
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedStory.role || "Not specified"}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: isDarkMode ? "#27272a" : "#f4f4f5",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Community Batch
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {normalizeBatch(selectedStory.batch)}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: isDarkMode ? "#27272a" : "#f4f4f5",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Publication Status
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          <Chip
                            label={selectedStory.isPublished !== false ? "Published" : "Draft"}
                            size="small"
                            color={selectedStory.isPublished !== false ? "success" : "default"}
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Public Link */}
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<LaunchIcon />}
                      component={Link}
                      to={`/success-stories/${selectedStory.id || selectedStory.storyId || selectedStory._id}`}
                      target="_blank"
                      sx={{
                        color: "#ca0019",
                        borderColor: "#ca0019",
                        "&:hover": { borderColor: "#a10014", backgroundColor: "rgba(202,0,25,0.05)" },
                      }}
                    >
                      View Public Success Story Page
                    </Button>
                  </Box>
                </Stack>
              )}

              {/* Tab 1: Timeline Milestones */}
              {viewTab === 1 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                    Career Milestones & Journey
                  </Typography>

                  {Array.isArray(selectedStory.timeline) && selectedStory.timeline.length > 0 ? (
                    <Stack spacing={2.5}>
                      {selectedStory.timeline.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            borderLeft: "4px solid #ca0019",
                            backgroundColor: isDarkMode ? "#27272a" : "#f9f9f9",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#ca0019", minWidth: 60 }}
                          >
                            {item.year}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }}>
                            {Array.isArray(item.achievements) &&
                              item.achievements.map((ach, achIdx) => (
                                <Typography
                                  key={achIdx}
                                  variant="body2"
                                  sx={{ mb: 0.5, lineHeight: 1.5 }}
                                >
                                  • {ach}
                                </Typography>
                              ))}
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      No timeline milestones added yet.
                    </Typography>
                  )}
                </Box>
              )}

              {/* Tab 2: Education & Skills */}
              {viewTab === 2 && (
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      Education
                    </Typography>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: isDarkMode ? "#27272a" : "#f9f9f9",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {selectedStory.education?.institution || "Institution not specified"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {selectedStory.education?.degree} {selectedStory.education?.duration ? `(${selectedStory.education.duration})` : ""}
                      </Typography>
                      {selectedStory.education?.location && (
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                          📍 {selectedStory.education.location}
                        </Typography>
                      )}
                    </Paper>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      Technical Skills
                    </Typography>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                          Programming Languages:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                          {(Array.isArray(selectedStory.skills?.languages)
                            ? selectedStory.skills.languages
                            : String(selectedStory.skills?.languages || "").split(",")
                          )
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .map((lang, i) => (
                              <Chip key={i} label={lang} size="small" />
                            ))}
                        </Box>
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                          Frameworks & Technologies:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                          {(Array.isArray(selectedStory.skills?.technologies)
                            ? selectedStory.skills.technologies
                            : String(selectedStory.skills?.technologies || "").split(",")
                          )
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .map((tech, i) => (
                              <Chip key={i} label={tech} size="small" color="primary" sx={{ backgroundColor: "#ca0019" }} />
                            ))}
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              )}

              {/* Tab 3: Video */}
              {viewTab === 3 && selectedStory.video && (
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                    Featured Journey Video
                  </Typography>
                  <Box
                    component="video"
                    src={selectedStory.video}
                    controls
                    sx={{
                      width: "100%",
                      maxHeight: 400,
                      borderRadius: 2,
                      backgroundColor: "#000",
                    }}
                  />
                </Box>
              )}
            </DialogContent>

            <DialogActions
              sx={{
                p: 2,
                borderTop: isDarkMode
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
                justifyContent: "space-between",
              }}
            >
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setViewModalOpen(false);
                  handleOpenDelete(selectedStory);
                }}
              >
                Delete
              </Button>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setViewModalOpen(false);
                    handleOpenEdit(selectedStory);
                  }}
                >
                  Edit Story
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setViewModalOpen(false)}
                  sx={{ backgroundColor: "#ca0019", "&:hover": { backgroundColor: "#a10014" } }}
                >
                  Close
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ========================================================================= */}
      {/* CREATE / EDIT SUCCESS STORY MODAL */}
      {/* ========================================================================= */}
      <Dialog
        open={formOpen}
        onClose={() => !submitting && setFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 2.5,
            borderBottom: isDarkMode
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {isEditing ? "Edit Success Story" : "Add New Success Story"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)} disabled={submitting}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2.5 }}>
          <Tabs
            value={formTab}
            onChange={(_, val) => setFormTab(val)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
              },
              "& .Mui-selected": { color: "#ca0019" },
              "& .MuiTabs-indicator": { backgroundColor: "#ca0019" },
            }}
          >
            <Tab label="1. Basic Info" />
            <Tab label="2. Timeline & Career" />
            <Tab label="3. Education & Skills" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          {/* TAB 0: Basic Info */}
          {formTab === 0 && (
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Student Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ronit JaiPrakash"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Community Batch</InputLabel>
                    <Select
                      value={formData.batch}
                      label="Community Batch"
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    >
                      {BATCH_OPTIONS.map((b) => (
                        <MenuItem key={b} value={b}>
                          {b}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Role / Designation"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Application Developer / Full Stack Engineer"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Caelius Consultancy, Google, Microsoft"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Profile Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://... or /assets/img/... image path"
                    helperText="Leave empty to use the default community avatar"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Video Story URL (Optional)"
                    value={formData.video}
                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                    placeholder="https://res.cloudinary.com/... or mp4 link"
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Story Summary / Bio"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="A brief inspiring summary of the member's journey, achievements, and impact..."
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    color="primary"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": { color: "#ca0019" },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#ca0019" },
                    }}
                  />
                }
                label="Published on website (Visible to public visitors)"
              />
            </Stack>
          )}

          {/* TAB 1: Timeline & Career */}
          {formTab === 1 && (
            <Stack spacing={3}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Timeline Milestones
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddTimelineYear}
                  sx={{ color: "#ca0019" }}
                >
                  Add Year
                </Button>
              </Box>

              {(formData.timeline || []).map((item, tIdx) => (
                <Paper
                  key={tIdx}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: isDarkMode ? "#27272a" : "#f9f9f9",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                    <TextField
                      label="Year"
                      size="small"
                      type="number"
                      value={item.year}
                      onChange={(e) => handleTimelineYearChange(tIdx, Number(e.target.value))}
                      sx={{ width: 120 }}
                    />
                    <Typography variant="body2" sx={{ color: "text.secondary", flexGrow: 1 }}>
                      Achievements / Milestones
                    </Typography>
                    {(formData.timeline || []).length > 1 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveTimelineYear(tIdx)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>

                  <Stack spacing={1}>
                    {(item.achievements || []).map((ach, achIdx) => (
                      <Box key={achIdx} sx={{ display: "flex", gap: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="e.g. Won Global Future Summit Hackathon / Led SVIET website"
                          value={ach}
                          onChange={(e) => handleTimelineAchChange(tIdx, achIdx, e.target.value)}
                        />
                        {(item.achievements || []).length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveAchievement(tIdx, achIdx)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddAchievement(tIdx)}
                      sx={{ alignSelf: "flex-start", color: "text.secondary" }}
                    >
                      Add Achievement Item
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}

          {/* TAB 2: Education & Skills */}
          {formTab === 2 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Academic Background
              </Typography>

              <TextField
                fullWidth
                label="Institution Name"
                value={formData.education?.institution || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: { ...(formData.education || {}), institution: e.target.value },
                  })
                }
                placeholder="Swami Vivekanand Institute of Engineering And Technology"
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Degree / Major"
                    value={formData.education?.degree || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: { ...(formData.education || {}), degree: e.target.value },
                      })
                    }
                    placeholder="B.Tech in Computer Science Engineering"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    value={formData.education?.duration || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: { ...(formData.education || {}), duration: e.target.value },
                      })
                    }
                    placeholder="2021 - 2025"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Technical Skills & Tools
              </Typography>

              <TextField
                fullWidth
                label="Programming Languages (comma-separated)"
                value={formData.skills?.languages || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: { ...(formData.skills || {}), languages: e.target.value },
                  })
                }
                placeholder="JavaScript, Python, C++, TypeScript, Java"
              />

              <TextField
                fullWidth
                label="Technologies & Frameworks (comma-separated)"
                value={formData.skills?.technologies || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: { ...(formData.skills || {}), technologies: e.target.value },
                  })
                }
                placeholder="React, Node.js, Express, Next.js, MongoDB, Tailwind CSS"
              />

              <TextField
                fullWidth
                label="Tools & Platforms (comma-separated)"
                value={formData.skills?.tools || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: { ...(formData.skills || {}), tools: e.target.value },
                  })
                }
                placeholder="Git, GitHub, Docker, AWS, Postman, VS Code"
              />
            </Stack>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 2.5,
            borderTop: isDarkMode
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
            justifyContent: "space-between",
          }}
        >
          <Button type="button" onClick={() => setFormOpen(false)} disabled={submitting}>
            Cancel
          </Button>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            {formTab > 0 && (
              <Button
                type="button"
                onClick={() => setFormTab((prev) => Math.max(prev - 1, 0))}
                disabled={submitting}
              >
                Back
              </Button>
            )}

            {formTab < 2 ? (
              <Button
                type="button"
                variant="outlined"
                onClick={() => setFormTab((prev) => Math.min(prev + 1, 2))}
                sx={{
                  borderColor: "#ca0019",
                  color: "#ca0019",
                  "&:hover": { borderColor: "#a10014", backgroundColor: "rgba(202,0,25,0.05)" },
                }}
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                variant="contained"
                onClick={handleSubmitForm}
                disabled={submitting}
                sx={{
                  backgroundColor: "#ca0019",
                  "&:hover": { backgroundColor: "#a10014" },
                  minWidth: 120,
                }}
              >
                {submitting ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : isEditing ? (
                  "Update Story"
                ) : (
                  "Save Story"
                )}
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleting && setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete the success story of{" "}
            <strong>{storyToDelete?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Delete Story"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoordinatorSuccessStories;
