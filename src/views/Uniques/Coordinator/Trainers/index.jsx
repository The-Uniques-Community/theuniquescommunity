
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { TrainerCardDashboard } from "@/utils/Card/TrainerCardDashboard";
import {
    Grid,
    TextField,
    InputAdornment,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SchoolIcon from "@mui/icons-material/School";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RefreshIcon from "@mui/icons-material/Refresh";

const Trainers = () => {
    const burl = "http://localhost:5000"; // Ideally this should come from env or context
    const [search, setSearch] = useState("");
    const [trainers, setTrainers] = useState([]);
    const [tabValue, setTabValue] = useState("1");
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuTrainerId, setMenuTrainerId] = useState(null);

    // Fetch Trainers from Backend
    const fetchTrainers = async () => {
        try {
            const response = await fetch(`${burl}/api/admin/trainers/all-trainers`);
            if (response.ok) {
                const data = await response.json();
                setTrainers(data);
            } else {
                toast.error("Failed to fetch trainers.");
            }
        } catch (error) {
            console.error("Error fetching trainers:", error);
            toast.error("An error occurred while fetching trainers.");
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    // Validation Schema
    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        batch: Yup.string().required("Batch is required"),
        course: Yup.string().required("Course is required"),
        bio: Yup.string().required("Bio is required"),
        skills: Yup.string(), // Changed to string as we process it manually
    });

    // Formik
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            batch: "",
            course: "",
            bio: "",
            skills: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Process skills string to array
            const skillsArray = values.skills ? values.skills.split(',').map(s => s.trim()) : [];
            const payload = { ...values, skills: skillsArray };

            try {
                if (selectedTrainer) {
                    // Update Logic
                    const response = await fetch(`${burl}/api/admin/trainers/update-trainer/${selectedTrainer._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });
                    
                    if (response.ok) {
                        toast.success("Trainer updated successfully!");
                        fetchTrainers();
                    } else {
                        const errorData = await response.json();
                        toast.error(errorData.message || "Failed to update trainer.");
                    }
                } else {
                    // Add Logic
                    const response = await fetch(`${burl}/api/admin/trainers/add-trainer`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });

                    if (response.ok) {
                        toast.success("Trainer added successfully!");
                        fetchTrainers();
                    } else {
                        const errorData = await response.json();
                        toast.error(errorData.message || "Failed to add trainer.");
                    }
                }
                handleCloseDialog();
            } catch (error) {
                console.error("Error saving trainer:", error);
                toast.error("An error occurred.");
            }
        },
    });

    // Mock Data
    useEffect(() => {
        const mockTrainers = [
            {
                _id: "1",
                fullName: "Jane Doe",
                email: "jane.doe@example.com",
                course: "M.Tech CSE",
                batch: "Trainer Batch 1",
                profileStatus: "active",
                bio: "Senior Technical Trainer specializing in Full Stack Development.",
                skills: ["React", "Node.js", "MongoDB", "Express"],
                linkedinProfile: "https://linkedin.com",
                githubProfile: "https://github.com",
                profilePic: null
            },
            {
                _id: "2",
                fullName: "John Smith",
                email: "john.smith@example.com",
                course: "B.Tech CSE",
                batch: "Trainer Batch 1",
                profileStatus: "active",
                bio: "Expert in Data Structures and Algorithms.",
                skills: ["C++", "Java", "Python"],
                linkedinProfile: "https://linkedin.com",
                profilePic: null
            },
            {
                _id: "3",
                fullName: "Alice Johnson",
                email: "alice.j@example.com",
                course: "Ph.D CS",
                batch: "Trainer Batch 2",
                profileStatus: "active",
                bio: "AI/ML Enthusiast and Trainer.",
                skills: ["Python", "TensorFlow", "PyTorch"],
                githubProfile: "https://github.com",
                profilePic: null
            }
        ];
        setTrainers(mockTrainers);
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = (trainer = null) => {
        setSelectedTrainer(trainer);
        if (trainer) {
            formik.setValues({
                fullName: trainer.fullName,
                email: trainer.email,
                batch: trainer.batch,
                course: trainer.course,
                bio: trainer.bio,
                skills: trainer.skills.join(", "),
            });
        } else {
            formik.resetForm();
        }
        setOpenDialog(true);
        handleCloseMenu();
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTrainer(null);
        formik.resetForm();
    };

    const handleOpenDeleteDialog = (trainer) => {
        setSelectedTrainer(trainer);
        setDeleteDialogOpen(true);
        handleCloseMenu();
    };

    const handleDeleteTrainer = async () => {
        try {
            const response = await fetch(`${burl}/api/admin/trainers/delete-trainer/${selectedTrainer._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Trainer deleted successfully!");
                fetchTrainers();
            } else {
                toast.error("Failed to delete trainer.");
            }
        } catch (error) {
            console.error("Error deleting trainer:", error);
            toast.error("An error occurred.");
        }
        setDeleteDialogOpen(false);
        setSelectedTrainer(null);
    };

    const handleMenuClick = (event, trainerId) => {
        setAnchorEl(event.currentTarget);
        setMenuTrainerId(trainerId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuTrainerId(null);
    };

    const filteredTrainers = trainers.filter(trainer =>
        trainer.fullName.toLowerCase().includes(search.toLowerCase()) ||
        trainer.email.toLowerCase().includes(search.toLowerCase()) ||
        trainer.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <Box sx={{ width: "100%", typography: "body1", p: 3 }}>
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ca0019', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon fontSize="large" /> Trainers Overview
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        sx={{
                            color: "#ca0019",
                            borderColor: "#ca0019",
                            "&:hover": { bgcolor: "#ffebee", borderColor: "#ca0019" },
                            textTransform: 'none'
                        }}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<PersonAddIcon />}
                        onClick={() => handleOpenDialog()}
                        sx={{
                            bgcolor: "#ca0019",
                            "&:hover": { bgcolor: "#a30014" },
                            textTransform: 'none'
                        }}
                    >
                        Add Trainer
                    </Button>
                </Box>
            </Box>

            {/* Tabs */}
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                    <TabList onChange={handleTabChange} aria-label="Trainer tabs"
                        sx={{
                            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '1rem' },
                            '& .Mui-selected': { color: '#ca0019 !important' },
                            '& .MuiTabs-indicator': { backgroundColor: '#ca0019' },
                        }}
                    >
                        <Tab label="Profiles" value="1" />
                        <Tab label="Manage" value="2" />
                    </TabList>
                </Box>

                {/* Search Bar (Common) */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <TextField
                        placeholder="Search trainers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ maxWidth: '400px', bgcolor: 'background.paper' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Profiles Tab */}
                <TabPanel value="1" sx={{ p: 0 }}>
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-1 gap-4">
                        {filteredTrainers.length > 0 ? (
                            filteredTrainers.map((trainer) => (
                                <TrainerCardDashboard
                                    key={trainer._id}
                                    user={trainer}
                                />
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                                No trainers found matching your search.
                            </Typography>
                        )}
                    </div>
                </TabPanel>

                {/* Manage Tab */}
                <TabPanel value="2" sx={{ p: 0 }}>
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Batch</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Course</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    {/* <TableCell sx={{ fontWeight: 'bold' }}>Skills</TableCell> */}
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTrainers.length > 0 ? (
                                    filteredTrainers.map((trainer) => (
                                        <TableRow key={trainer._id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar src={trainer.profilePic || "/placeholder.svg"} alt={trainer.fullName} />
                                                    <Typography variant="subtitle2">{trainer.fullName}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{trainer.email}</TableCell>
                                            <TableCell><Chip label={trainer.batch} size="small" variant="outlined" /></TableCell>
                                            <TableCell>{trainer.course}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={trainer.profileStatus}
                                                    size="small"
                                                    color={trainer.profileStatus === 'active' ? 'success' : 'default'}
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'right' }}>
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls={`menu-${trainer._id}`}
                                                    aria-haspopup="true"
                                                    onClick={(e) => handleMenuClick(e, trainer._id)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id={`menu-${trainer._id}`}
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl) && menuTrainerId === trainer._id}
                                                    onClose={handleCloseMenu}
                                                >
                                                    <MenuItem onClick={() => handleOpenDialog(trainer)}>
                                                        <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                                                        Edit
                                                    </MenuItem>
                                                    <MenuItem onClick={() => handleOpenDeleteDialog(trainer)} sx={{ color: 'error.main' }}>
                                                        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                                                        Delete
                                                    </MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No trainers found.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </TabContext>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    {selectedTrainer ? "Edit Trainer" : "Add New Trainer"}
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2} sx={{ mt: 0.5 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="fullName"
                                    name="fullName"
                                    label="Full Name"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="batch"
                                    name="batch"
                                    label="Batch"
                                    value={formik.values.batch}
                                    onChange={formik.handleChange}
                                    error={formik.touched.batch && Boolean(formik.errors.batch)}
                                    helperText={formik.touched.batch && formik.errors.batch}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="course"
                                    name="course"
                                    label="Course"
                                    value={formik.values.course}
                                    onChange={formik.handleChange}
                                    error={formik.touched.course && Boolean(formik.errors.course)}
                                    helperText={formik.touched.course && formik.errors.course}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="skills"
                                    name="skills"
                                    label="Skills (comma separated)"
                                    placeholder="React, Node.js, Python"
                                    value={formik.values.skills}
                                    onChange={formik.handleChange}
                                    error={formik.touched.skills && Boolean(formik.errors.skills)}
                                    helperText={formik.touched.skills && formik.errors.skills}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="bio"
                                    name="bio"
                                    label="Bio"
                                    multiline
                                    rows={3}
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio}
                                />
                            </Grid>

                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
                    <Button onClick={formik.handleSubmit} variant="contained" sx={{ bgcolor: "#ca0019", "&:hover": { bgcolor: "#a30014" } }}>
                        {selectedTrainer ? "Update Trainer" : "Add Trainer"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete trainer <strong>{selectedTrainer?.fullName}</strong>?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">Cancel</Button>
                    <Button onClick={handleDeleteTrainer} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default Trainers;
