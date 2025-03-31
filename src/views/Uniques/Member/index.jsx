// "use client";

// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Snackbar,
//   Alert,
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   Chip,
//   IconButton,
//   FormControlLabel,
//   Switch,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Avatar,
//   Paper,
//   LinearProgress,
//   styled,
//   Tooltip,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   GitHub as GitHubIcon,
//   LinkedIn as LinkedInIcon,
//   Instagram as InstagramIcon,
//   Twitter as TwitterIcon,
//   WhatsApp as WhatsAppIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   LocationOn as LocationOnIcon,
//   Bookmark as BookmarkIcon,
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Upload as UploadIcon,
//   Close as CloseIcon,
//   NorthEast as ArrowUpRightIcon,
//   EmojiEvents as AwardIcon,
//   School,
//   MenuBook as BookOpenIcon,
//   Business as BriefcaseIcon,
//   Tag as TagIcon,
// } from "@mui/icons-material";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip as ChartTooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
// } from "chart.js";
// import { Line, Bar, Pie } from "react-chartjs-2";
// import { toast } from "react-toastify";

// // Define the API base URL
// const API_URL = "https://theuniquesbackend.vercel.app";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   ChartTooltip,
//   Legend
// );

// // Styled components
// const SectionTitle = styled(Box)(({ theme }) => ({
//   backgroundColor: theme.palette.common.black,
//   color: theme.palette.common.white,
//   padding: theme.spacing(0.5, 1),
//   borderTopRightRadius: "9999px",
//   display: "inline-block",
// }));

// const SocialIconWrapper = styled(Box)(({ theme }) => ({
//   width: 28,
//   height: 28,
//   padding: theme.spacing(0.5),
//   backgroundColor: theme.palette.grey[500],
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   "& svg": {
//     color: theme.palette.common.white,
//     fontSize: "1rem",
//   },
// }));

// // Custom Tab Panel component
// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const index = () => {
//   // State for member data
//   const [member, setMember] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Tab state
//   const [value, setValue] = useState(0);

//   // Edit states
//   const [isEditing, setIsEditing] = useState(false);
//   const [editSection, setEditSection] = useState("");
//   const [formData, setFormData] = useState({});

//   // File upload states
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const fileInputRef = useRef(null);

//   // Alert state
//   const [alert, setAlert] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // New item states
//   const [newSkill, setNewSkill] = useState("");
//   const [newAchievement, setNewAchievement] = useState({
//     title: "",
//     description: "",
//     date: "",
//   });
//   const [newCertification, setNewCertification] = useState({
//     mainFolderName: "",
//     studentId: "",
//     subfolder: "",
//     memberId: "",
//     files: [],
//   });
//   const [newProject, setNewProject] = useState({
//     title: "",
//     description: "",
//     technologies: [],
//     link: "",
//     githubUrl: "",
//     imageUrl: "",
//   });
//   const [newTechnology, setNewTechnology] = useState("");

//   // SGPA and Supplementary states
//   const [newSGPA, setNewSGPA] = useState({
//     semester: 1,
//     sgpa: 0,
//   });

//   const [newFine, setNewFine] = useState({
//     amount: 0,
//     dateImposed: new Date(),
//     status: "pending",
//     reason: "",
//   });

//   // Fetch member data
//   const fetchMemberData = async () => {
//     try {
//       setLoading(true);

//       // Get profile data using the getProfile endpoint
//       const response = await axios.get(`${API_URL}/api/member/getProfile`, {
//         withCredentials: true,
//       });

//       if (response.data && response.data.member) {
//         // Map the backend data structure to our component's expected structure
//         const memberData = {
//           ...response.data.member,
//           fullName:
//             response.data.member.fullName || response.data.member.name || "",
//           admno:
//             response.data.member.admno || response.data.member.admnNo || "",
//           skills: response.data.member.skills || [],
//           achievements: response.data.member.achievements || [],
//           certifications: response.data.member.certifications || [],
//           projects: response.data.member.projects || [],
//           internships: response.data.member.internships || [],
//           fines: response.data.member.fines || [],
//           semesterSGPA: response.data.member.semesterSGPA || [],
//           semesterSupplementary:
//             response.data.member.semesterSupplementary || [],
//           whatsappContact: response.data.member.whatsappContact || "",
//           twitterProfile: response.data.member.twitterProfile || "",
//           isPlaced: response.data.member.isPlaced || false,
//         };

//         setMember(memberData);
//         setFormData(memberData);
//       } else {
//         throw new Error("Failed to fetch member data");
//       }

//       setError(null);
//     } catch (err) {
//       console.error("Error fetching member data:", err);

//       // Handle authentication errors
//       if (err.response && err.response.status === 401) {
//         setError("Authentication failed. Please log in again.");
//       } else {
//         setError(
//           err.response?.data?.message ||
//             "Failed to load member data. Please try again."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle tab change
//   const handleTabChange = (_event, newValue) => {
//     setValue(newValue);
//   };

//   // Handle edit button click
//   const handleEdit = (section) => {
//     setEditSection(section);
//     setIsEditing(true);

//     // Reset form data based on current member data
//     if (section === "profile") {
//       setFormData({
//         fullName: member?.fullName || "",
//         batch: member?.batch || "",
//         course: member?.course || "",
//         admno: member?.admno || "",
//         isPlaced: member?.isPlaced || false,
//       });
//     } else if (section === "bio") {
//       setFormData({
//         bio: member?.bio || "",
//       });
//     } else if (section === "contact") {
//       setFormData({
//         email: member?.email || "",
//         contact: member?.contact || "",
//         address: member?.address || "",
//         city: member?.city || "",
//         state: member?.state || "",
//       });
//     } else if (section === "social") {
//       setFormData({
//         githubProfile: member?.githubProfile || "",
//         linkedinProfile: member?.linkedinProfile || "",
//         instagramProfile: member?.instagramProfile || "",
//         twitterProfile: member?.twitterProfile || "",
//         whatsappContact: member?.whatsappContact || "",
//       });
//     } else if (section === "skills") {
//       setFormData({
//         skills: [...(member?.skills || [])],
//       });
//       setNewSkill("");
//     }
//   };

//   // Handle add new item
//   const handleAddItem = (section) => {
//     setEditSection(`add-${section}`);

//     if (section === "achievement") {
//       setNewAchievement({
//         title: "",
//         description: "",
//         date: "",
//       });
//     } else if (section === "certification") {
//       setNewCertification({
//         title: "",
//         issuer: "",
//         date: "",
//         imageUrl: "",
//         proofOfCompletion: null, // For file upload if required
//         description: "",
//       });
//       setUploadedFile(null);
//     } else if (section === "project") {
//       setNewProject({
//         title: "",
//         description: "",
//         technologies: [],
//         link: "",
//         githubUrl: "",
//         imageUrl: "",
//       });
//       setNewTechnology("");
//       setUploadedFile(null);
//     } else if (section === "sgpa") {
//       setNewSGPA({
//         semester: 1,
//         sgpa: 0,
//       });
//     } else if (section === "fine") {
//       setNewFine({
//         amount: 0,
//         dateImposed: new Date(),
//         status: "pending",
//         reason: "",
//       });
//     }

//     setIsEditing(true);
//   };

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     const checked = e.target.checked;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle select change
//   const handleSelectChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle achievement form change
//   const handleAchievementChange = (e) => {
//     const { name, value } = e.target;

//     setNewAchievement((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle certification form change
//   const handleCertificationChange = (e) => {
//     const { name, value } = e.target;

//     setNewCertification((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle project form change
//   const handleProjectChange = (e) => {
//     const { name, value } = e.target;

//     setNewProject((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle SGPA form change
//   const handleSGPAChange = (e) => {
//     const { name, value } = e.target;

//     setNewSGPA((prev) => ({
//       ...prev,
//       [name]:
//         name === "semester" ? Number.parseInt(value) : Number.parseFloat(value),
//     }));
//   };

//   // Handle SGPA select change
//   const handleSGPASelectChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setNewSGPA((prev) => ({
//       ...prev,
//       [name]: Number.parseInt(value),
//     }));
//   };

//   // Handle fine form change
//   const handleFineChange = (e) => {
//     const { name, value } = e.target;

//     setNewFine((prev) => ({
//       ...prev,
//       [name]: name === "amount" ? Number.parseFloat(value) : value,
//     }));
//   };

//   // Handle fine select change
//   const handleFineSelectChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setNewFine((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle skill operations
//   const addSkill = () => {
//     if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         skills: [...(prev?.skills || []), newSkill.trim()],
//       }));
//       setNewSkill("");
//     }
//   };

//   const removeSkill = (skillToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       skills: prev?.skills?.filter((skill) => skill !== skillToRemove) || [],
//     }));
//   };

//   // Handle technology operations
//   const addTechnology = () => {
//     if (
//       newTechnology.trim() &&
//       !newProject.technologies.includes(newTechnology.trim())
//     ) {
//       setNewProject((prev) => ({
//         ...prev,
//         technologies: [...prev.technologies, newTechnology.trim()],
//       }));
//       setNewTechnology("");
//     }
//   };

//   const removeTechnology = (techToRemove) => {
//     setNewProject((prev) => ({
//       ...prev,
//       technologies: prev.technologies.filter((tech) => tech !== techToRemove),
//     }));
//   };

//   // Handle file upload
//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setUploadedFile(e.target.files[0]);
//     }
//   };

//   const uploadFile = async () => {
//     if (!uploadedFile) return null;

//     try {
//       const formData = new FormData();
//       formData.append("mainFolderName", member.batch);
//       formData.append("studentId", member.admno);
//       formData.append("subfolder", "certificate");
//       formData.append("memberId", member._id);
//       formData.append("files", uploadedFile);

//       const response = await axios.post(
//         `${API_URL}/upload/file_upload`,
//         formData,
//         {
//           withCredentials: true, // Include cookies for JWT authentication
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               const percentCompleted = Math.round(
//                 (progressEvent.loaded * 100) / progressEvent.total
//               );
//               setUploadProgress(percentCompleted);
//             }
//           },
//         }
//       );

//       toast.success("File uploaded successfully!");
//     } catch (err) {
//       console.error("Error uploading file:", err);

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to upload file. Please try again.",
//         severity: "error",
//       });

//       return null;
//     } finally {
//       setUploadProgress(0);
//     }
//   };

//   // Handle save profile section
//   const handleSaveProfile = async () => {
//     try {
//       // Map form data to match the backend's expected structure
//       const profileData = { ...formData };

//       // Make the API call to update profile
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         profileData,
//         {
//           withCredentials: true, // Include cookies for JWT authentication
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state with the new data
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 ...formData,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Profile updated successfully!",
//           severity: "success",
//         });

//         setIsEditing(false);
//       } else {
//         throw new Error("Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to update profile. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle add achievement
//   const handleAddAchievement = async () => {
//     try {
//       if (!newAchievement.title || !newAchievement.description) {
//         setAlert({
//           open: true,
//           message: "Title and description are required!",
//           severity: "error",
//         });
//         return;
//       }

//       const updatedAchievements = [
//         ...(member?.achievements || []),
//         newAchievement,
//       ];

//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { achievements: updatedAchievements },
//         { withCredentials: true }
//       );

//       if (response.data && response.data.message) {
//         // Create a new achievement object with an ID
//         const newAchievementWithId = {
//           ...newAchievement,
//           id: Date.now().toString(), // Generate a temporary ID
//         };

//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 achievements: [
//                   ...(prev.achievements || []),
//                   newAchievementWithId,
//                 ],
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Achievement added successfully!",
//           severity: "success",
//         });

//         setIsEditing(false);
//       } else {
//         throw new Error("Failed to add achievement");
//       }
//     } catch (err) {
//       console.error("Error adding achievement:", err);
//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to add achievement. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle add certification
//   const handleAddCertification = async () => {
//     try {
//       if (!newCertification.title || !newCertification.issuer) {
//         setAlert({
//           open: true,
//           message: "Title and issuer are required!",
//           severity: "error",
//         });
//         return;
//       }

//       // Upload file if selected
//       let fileUrl = newCertification.imageUrl;
//       if (uploadedFile) {
//         fileUrl = await uploadFile();
//         if (!fileUrl) return;
//       }

//       // Prepare certification data with the file URL
//       const certificationWithImage = {
//         ...newCertification,
//         imageUrl: fileUrl,
//       };

//       const updatedCertifications = [
//         ...(member?.certifications || []),
//         certificationWithImage,
//       ];

//       // Make API call to add certification
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { certifications: updatedCertifications },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Create a new certification object with an ID
//         const newCertificationWithId = {
//           ...certificationWithImage,
//           id: Date.now().toString(), // Generate a temporary ID
//         };

//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 certifications: [
//                   ...(prev.certifications || []),
//                   newCertificationWithId,
//                 ],
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Certification added successfully!",
//           severity: "success",
//         });

//         setIsEditing(false);
//       } else {
//         throw new Error("Failed to add certification");
//       }
//     } catch (err) {
//       console.error("Error adding certification:", err);

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to add certification. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle add project
//   const handleAddProject = async () => {
//     try {
//       if (!newProject.title || !newProject.description) {
//         setAlert({
//           open: true,
//           message: "Title and description are required!",
//           severity: "error",
//         });
//         return;
//       }

//       // Upload file if selected
//       let fileUrl = newProject.imageUrl;
//       if (uploadedFile) {
//         fileUrl = await uploadFile();
//         if (!fileUrl) return;
//       }

//       // Prepare project data with the file URL
//       const projectWithImage = {
//         ...newProject,
//         imageUrl: fileUrl,
//       };

//       const updatedProjects = [...(member?.projects || []), projectWithImage];

//       // Make API call to add project
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { projects: updatedProjects },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Create a new project object with an ID
//         const newProjectWithId = {
//           ...projectWithImage,
//           id: Date.now().toString(), // Generate a temporary ID
//         };

//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 projects: [...(prev.projects || []), newProjectWithId],
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Project added successfully!",
//           severity: "success",
//         });

//         setIsEditing(false);
//       } else {
//         throw new Error("Failed to add project");
//       }
//     } catch (err) {
//       console.error("Error adding project:", err);

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to add project. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle add SGPA
//   const handleAddSGPA = async () => {
//     try {
//       if (
//         newSGPA.semester < 1 ||
//         newSGPA.semester > 8 ||
//         newSGPA.sgpa < 0 ||
//         newSGPA.sgpa > 10
//       ) {
//         setAlert({
//           open: true,
//           message: "Please enter valid semester (1-8) and SGPA (0-10) values!",
//           severity: "error",
//         });
//         return;
//       }

//       // Check if semester already exists
//       if (member?.semesterSGPA?.some((s) => s.semester === newSGPA.semester)) {
//         setAlert({
//           open: true,
//           message: "SGPA for this semester already exists!",
//           severity: "error",
//         });
//         return;
//       }

//       // Prepare SGPA data
//       const updatedSGPAs = [...(member?.semesterSGPA || []), newSGPA];

//       // Make API call to add SGPA
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { semesterSGPA: updatedSGPAs },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 semesterSGPA: updatedSGPAs,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "SGPA added successfully!",
//           severity: "success",
//         });

//         setIsEditing(false);
//       } else {
//         throw new Error("Failed to add SGPA");
//       }
//     } catch (err) {
//       console.error("Error adding SGPA:", err);

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to add SGPA. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle add Fine
//   const handleAddFine = async () => {
//     try {
//       if (newFine.amount <= 0 || !newFine.reason) {
//         setAlert({
//           open: true,
//           message: "Please enter a valid amount and reason!",
//           severity: "error",
//         });
//         return;
//       }

//       // Prepare fine data
//       const updatedFines = [...(member?.fines || []), newFine];

//       // Make API call to add fine
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { fines: updatedFines },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 fines: updatedFines,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Fine added successfully!",
//           severity: "success",
//         });

//         setIsEditing(false);
//       } else {
//         throw new Error("Failed to add fine");
//       }
//     } catch (err) {
//       console.error("Error adding fine:", err);

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to add fine. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle delete achievement
//   const handleDeleteAchievement = async (id) => {
//     try {
//       if (!member?.achievements) return;

//       const updatedAchievements = member.achievements.filter(
//         (ach) => ach._id !== id && ach.id !== id
//       );

//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { achievements: updatedAchievements },
//         { withCredentials: true }
//       );

//       if (response.data && response.data.message) {
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 achievements: updatedAchievements,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Achievement deleted successfully!",
//           severity: "success",
//         });
//       } else {
//         throw new Error("Failed to delete achievement");
//       }
//     } catch (err) {
//       console.error("Error deleting achievement:", err);

//       // Revert the local state change
//       fetchMemberData();

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to delete achievement. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle delete certification
//   const handleDeleteCertification = async (id) => {
//     try {
//       if (!member?.certifications) return;

//       // Filter out the certification to delete
//       const updatedCertifications = member.certifications.filter(
//         (cert) => cert._id !== id && cert.id !== id
//       );

//       // Make API call to update certifications
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { certifications: updatedCertifications },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 certifications: updatedCertifications,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Certification deleted successfully!",
//           severity: "success",
//         });
//       } else {
//         throw new Error("Failed to delete certification");
//       }
//     } catch (err) {
//       console.error("Error deleting certification:", err);

//       // Revert the local state change
//       fetchMemberData();

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to delete certification. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle delete project
//   const handleDeleteProject = async (id) => {
//     try {
//       if (!member?.projects) return;

//       // Filter out the project to delete
//       const updatedProjects = member.projects.filter(
//         (project) => project._id !== id && project.id !== id
//       );

//       // Make API call to update projects
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { projects: updatedProjects },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 projects: updatedProjects,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Project deleted successfully!",
//           severity: "success",
//         });
//       } else {
//         throw new Error("Failed to delete project");
//       }
//     } catch (err) {
//       console.error("Error deleting project:", err);

//       // Revert the local state change
//       fetchMemberData();

//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to delete project. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle delete SGPA
//   const handleDeleteSGPA = async (id) => {
//     try {
//       if (!member?.semesterSGPA) return;

//       const updatedSGPAs = member.semesterSGPA.filter(
//         (sgpa) => sgpa._id !== id
//       );

//       // Make API call to update SGPAs
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { semesterSGPA: updatedSGPAs },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 semesterSGPA: updatedSGPAs,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "SGPA deleted successfully!",
//           severity: "success",
//         });
//       } else {
//         throw new Error("Failed to delete SGPA");
//       }
//     } catch (err) {
//       console.error("Error deleting SGPA:", err);
//       fetchMemberData();
//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to delete SGPA. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle delete Fine
//   const handleDeleteFine = async (id) => {
//     try {
//       if (!member?.fines) return;

//       const updatedFines = member.fines.filter((fine) => fine._id !== id);

//       // Make API call to update fines
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { fines: updatedFines },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 fines: updatedFines,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Fine deleted successfully!",
//           severity: "success",
//         });
//       } else {
//         throw new Error("Failed to delete fine");
//       }
//     } catch (err) {
//       console.error("Error deleting fine:", err);
//       fetchMemberData();
//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to delete fine. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Handle update fine status
//   const handleUpdateFineStatus = async (id, status) => {
//     try {
//       if (!member?.fines) return;

//       const updatedFines = member.fines.map((fine) =>
//         fine._id === id ? { ...fine, status } : fine
//       );

//       // Make API call to update fines
//       const response = await axios.post(
//         `${API_URL}/api/member/editProfile`,
//         { fines: updatedFines },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data && response.data.message) {
//         // Update the local member state
//         setMember((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 fines: updatedFines,
//               }
//             : null
//         );

//         setAlert({
//           open: true,
//           message: "Fine status updated successfully!",
//           severity: "success",
//         });
//       } else {
//         throw new Error("Failed to update fine status");
//       }
//     } catch (err) {
//       console.error("Error updating fine status:", err);
//       fetchMemberData();
//       setAlert({
//         open: true,
//         message:
//           err.response?.data?.message ||
//           "Failed to update fine status. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   // Initialize data on component mount
//   useEffect(() => {
//     fetchMemberData();
//   }, []);

//   // Calculate statistics for charts
//   const calculateStatistics = () => {
//     if (!member) return null;

//     // SGPA data for line chart
//     const sgpaData = {
//       labels: member.semesterSGPA?.map((s) => `Sem ${s.semester}`) || [],
//       datasets: [
//         {
//           label: "SGPA",
//           data: member.semesterSGPA?.map((s) => s.sgpa) || [],
//           borderColor: "rgb(202, 0, 25)",
//           backgroundColor: "rgba(202, 0, 25, 0.1)",
//           tension: 0.3,
//         },
//       ],
//     };

//     // Supplementary data for bar chart
//     const supplementaryData = {
//       labels:
//         member.semesterSupplementary?.map((s) => `Sem ${s.semester}`) || [],
//       datasets: [
//         {
//           label: "Supplementary Exams",
//           data:
//             member.semesterSupplementary?.map((s) => s.subjects.length) || [],
//           backgroundColor: "rgba(202, 0, 25, 0.7)",
//         },
//       ],
//     };

//     // Fines data for pie chart
//     const fineStatusCounts = {
//       pending: member.fines?.filter((f) => f.status === "pending").length || 0,
//       paid: member.fines?.filter((f) => f.status === "paid").length || 0,
//       waived: member.fines?.filter((f) => f.status === "waived").length || 0,
//     };

//     const fineData = {
//       labels: ["Pending", "Paid", "Waived"],
//       datasets: [
//         {
//           label: "Fines",
//           data: [
//             fineStatusCounts.pending,
//             fineStatusCounts.paid,
//             fineStatusCounts.waived,
//           ],
//           backgroundColor: [
//             "rgba(255, 99, 132, 0.7)",
//             "rgba(75, 192, 192, 0.7)",
//             "rgba(153, 102, 255, 0.7)",
//           ],
//         },
//       ],
//     };

//     return {
//       sgpaData,
//       supplementaryData,
//       fineData,
//     };
//   };

//   const statistics = calculateStatistics();

//   // Render loading state
//   if (loading && !member) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "50vh",
//         }}
//       >
//         <CircularProgress sx={{ color: "#ca0019" }} />
//       </Box>
//     );
//   }

//   // Render error state
//   if (error && !member) {
//     return (
//       <Alert severity="error" sx={{ m: 2 }}>
//         {error}
//       </Alert>
//     );
//   }

//   // Render member profile
//   return (
//     <Box className="bg-white">
//       {/* Header Section */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         {/* Profile Image and Name */}
//         <Grid
//           item
//           xs={12}
//           lg={3}
//           xl={3}
//           sx={{ display: "flex", gap: 2, alignItems: "center" }}
//         >
//           <Avatar
//             src={member?.profilePic || "/placeholder.svg?height=200&width=200"}
//             alt={member?.fullName}
//             sx={{ width: 144, height: 144 }}
//           />
//           <Box>
//             <Typography variant="caption" color="text.secondary">
//               //member
//             </Typography>
//             <Typography variant="h4" fontWeight={500}>
//               {member?.fullName}
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
//               {member?.githubProfile && (
//                 <Tooltip title="GitHub">
//                   <a
//                     href={member.githubProfile}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <SocialIconWrapper>
//                       <GitHubIcon fontSize="small" />
//                     </SocialIconWrapper>
//                   </a>
//                 </Tooltip>
//               )}
//               {member?.linkedinProfile && (
//                 <Tooltip title="LinkedIn">
//                   <a
//                     href={member.linkedinProfile}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <SocialIconWrapper>
//                       <LinkedInIcon fontSize="small" />
//                     </SocialIconWrapper>
//                   </a>
//                 </Tooltip>
//               )}
//               {member?.instagramProfile && (
//                 <Tooltip title="Instagram">
//                   <a
//                     href={member.instagramProfile}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <SocialIconWrapper>
//                       <InstagramIcon fontSize="small" />
//                     </SocialIconWrapper>
//                   </a>
//                 </Tooltip>
//               )}
//               {member?.twitterProfile && (
//                 <Tooltip title="Twitter">
//                   <a
//                     href={member.twitterProfile}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <SocialIconWrapper>
//                       <TwitterIcon fontSize="small" />
//                     </SocialIconWrapper>
//                   </a>
//                 </Tooltip>
//               )}
//               {member?.whatsappContact && (
//                 <Tooltip title="WhatsApp">
//                   <a
//                     href={`https://wa.me/${member.whatsappContact}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <SocialIconWrapper>
//                       <WhatsAppIcon fontSize="small" />
//                     </SocialIconWrapper>
//                   </a>
//                 </Tooltip>
//               )}
//               <IconButton
//                 size="small"
//                 onClick={() => handleEdit("social")}
//                 sx={{
//                   bgcolor: "#f1f5f9",
//                   "&:hover": { bgcolor: "#e2e8f0" },
//                 }}
//               >
//                 <EditIcon fontSize="small" />
//               </IconButton>
//             </Box>
//           </Box>
//         </Grid>

//         {/* Member Details */}
//         <Grid
//           item
//           xs={12}
//           lg={6}
//           xl={6}
//           sx={{ borderLeft: "1px solid #e0e0e0", p: 2 }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
//             <School fontSize="small" color="action" />
//             <Typography color="text.secondary">
//               <Box component="span" fontWeight={500}>
//                 Batch:
//               </Box>{" "}
//               {member?.batch || "Not specified"}
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
//             <BookOpenIcon fontSize="small" color="action" />
//             <Typography color="text.secondary">
//               <Box component="span" fontWeight={500}>
//                 Course:
//               </Box>{" "}
//               {member?.course || "Not specified"}
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
//             <TagIcon fontSize="small" color="action" />
//             <Typography color="text.secondary">
//               <Box component="span" fontWeight={500}>
//                 Admn No:
//               </Box>{" "}
//               {member?.admno || "Not specified"}
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
//             <BriefcaseIcon fontSize="small" color="action" />
//             <Typography color="text.secondary">
//               <Box component="span" fontWeight={500}>
//                 Placement:
//               </Box>{" "}
//               {member?.isPlaced ? "Placed" : "Not Placed"}
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.5 }}>
//             <Typography variant="body2" color="text.secondary">
//               <Box component="span" fontWeight={500}>
//                 Joined on:
//               </Box>{" "}
//               {member?.createdAt
//                 ? new Date(member.createdAt).toLocaleDateString()
//                 : "Unknown"}
//             </Typography>
//           </Box>
//         </Grid>

//         {/* Edit Button */}
//         <Grid
//           item
//           xs={12}
//           lg={3}
//           xl={3}
//           sx={{ display: "flex", alignItems: "center" }}
//         >
//           <Button
//             variant="outlined"
//             color="primary"
//             size="medium"
//             startIcon={<EditIcon />}
//             onClick={() => handleEdit("profile")}
//             sx={{
//               borderColor: "#ca0019",
//               color: "#ca0019",
//               "&:hover": {
//                 borderColor: "#a30014",
//                 backgroundColor: "rgba(202, 0, 25, 0.04)",
//               },
//             }}
//           >
//             Edit Profile
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Main Content */}
//       <Grid container spacing={2}>
//         {/* Left Sidebar */}
//         <Grid item xs={12} lg={3}>
//           <Typography variant="h6" gutterBottom>
//             Overview
//           </Typography>

//           {/* Bio Section */}
//           <Box sx={{ mb: 3 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <SectionTitle>BIO</SectionTitle>
//               <IconButton
//                 size="small"
//                 onClick={() => handleEdit("bio")}
//                 sx={{
//                   bgcolor: "#f1f5f9",
//                   "&:hover": { bgcolor: "#e2e8f0" },
//                 }}
//               >
//                 <EditIcon fontSize="small" />
//               </IconButton>
//             </Box>
//             <Paper
//               sx={{
//                 p: 2,
//                 bgcolor: "#f8fafc",
//                 borderBottomLeftRadius: 4,
//                 borderBottomRightRadius: 4,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
//                 <BookmarkIcon
//                   fontSize="small"
//                   color="action"
//                   sx={{ mt: 0.5 }}
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {member?.bio || "No bio added yet."}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Box>

//           {/* Contact Information */}
//           <Box sx={{ mb: 3 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <SectionTitle>CONTACT INFORMATION</SectionTitle>
//               <IconButton
//                 size="small"
//                 onClick={() => handleEdit("contact")}
//                 sx={{
//                   bgcolor: "#f1f5f9",
//                   "&:hover": { bgcolor: "#e2e8f0" },
//                 }}
//               >
//                 <EditIcon fontSize="small" />
//               </IconButton>
//             </Box>
//             <Paper
//               sx={{
//                 p: 2,
//                 bgcolor: "#f8fafc",
//                 borderBottomLeftRadius: 4,
//                 borderBottomRightRadius: 4,
//               }}
//             >
//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
//               >
//                 <EmailIcon fontSize="small" color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   {member?.email}
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
//               >
//                 <PhoneIcon fontSize="small" color="action" />
//                 <Typography variant="body2" color="text.secondary">
//                   <a
//                     href={`tel:${member?.contact}`}
//                     style={{ textDecoration: "none", color: "inherit" }}
//                   >
//                     {member?.contact || "No phone number added"}
//                   </a>
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
//                 <LocationOnIcon
//                   fontSize="small"
//                   color="action"
//                   sx={{ mt: 0.5 }}
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {member?.address
//                     ? `${member.address} | ${member.city || ""}, ${
//                         member.state || ""
//                       }`
//                     : "No address added"}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Box>

//           {/* Skills Section */}
//           <Box sx={{ mb: 3 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <SectionTitle>SKILLS</SectionTitle>
//               <IconButton
//                 size="small"
//                 onClick={() => handleEdit("skills")}
//                 sx={{
//                   bgcolor: "#f1f5f9",
//                   "&:hover": { bgcolor: "#e2e8f0" },
//                 }}
//               >
//                 <EditIcon fontSize="small" />
//               </IconButton>
//             </Box>
//             <Paper
//               sx={{
//                 p: 2,
//                 bgcolor: "#f8fafc",
//                 borderBottomLeftRadius: 4,
//                 borderBottomRightRadius: 4,
//               }}
//             >
//               {member?.skills && member.skills.length > 0 ? (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {member.skills.map((skill, index) => (
//                     <Chip
//                       key={index}
//                       label={skill}
//                       size="small"
//                       sx={{
//                         m: 0.5,
//                         bgcolor: "#e2e8f0",
//                         color: "#475569",
//                       }}
//                     />
//                   ))}
//                 </Box>
//               ) : (
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ p: 1 }}
//                 >
//                   No skills added yet
//                 </Typography>
//               )}
//             </Paper>
//           </Box>

//           {/* Academic Status */}
//           <Box sx={{ mb: 3 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <SectionTitle>ACADEMIC STATUS</SectionTitle>
//             </Box>
//             <Paper
//               sx={{
//                 p: 2,
//                 bgcolor: "#f8fafc",
//                 borderBottomLeftRadius: 4,
//                 borderBottomRightRadius: 4,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={500}
//                   color="text.secondary"
//                 >
//                   CGPA
//                 </Typography>
//                 <Typography variant="body2" fontWeight={700} color="primary">
//                   {member?.cgpa || "0.00"}
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={500}
//                   color="text.secondary"
//                 >
//                   Supplementary Exams
//                 </Typography>
//                 <Typography variant="body2" fontWeight={700} color="primary">
//                   {member?.totalSupplementary || 0}
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={500}
//                   color="text.secondary"
//                 >
//                   Pending Supplementary
//                 </Typography>
//                 <Typography variant="body2" fontWeight={700} color="primary">
//                   {member?.pendingSupplementary || 0}
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={500}
//                   color="text.secondary"
//                 >
//                   Pending Fines
//                 </Typography>
//                 <Typography variant="body2" fontWeight={700} color="primary">
//                   ₹{member?.totalPendingFines || 0}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Box>
//         </Grid>

//         {/* Right Content - Tabs */}
//         <Grid item xs={12} lg={9}>
//           <Box sx={{ width: "100%" }}>
//             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//               <Tabs
//                 value={value}
//                 onChange={handleTabChange}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 sx={{
//                   "& .MuiTab-root": {
//                     fontWeight: 500,
//                     transition: "0.3s",
//                     "&.Mui-selected": {
//                       color: "#ca0019",
//                     },
//                   },
//                   "& .MuiTabs-indicator": {
//                     backgroundColor: "#ca0019",
//                   },
//                 }}
//               >
//                 <Tab label="Statistics" {...a11yProps(0)} />
//                 <Tab label="Achievements" {...a11yProps(1)} />
//                 <Tab label="Certifications" {...a11yProps(2)} />
//                 <Tab label="Projects" {...a11yProps(3)} />
//                 <Tab label="Academics" {...a11yProps(4)} />
//               </Tabs>
//             </Box>

//             {/* Statistics Tab */}
//             <CustomTabPanel value={value} index={0}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                   <Card sx={{ bgcolor: "#f8f9fa", boxShadow: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Achievements
//                       </Typography>
//                       <Typography
//                         variant="h3"
//                         sx={{ color: "#ca0019", fontWeight: "bold" }}
//                       >
//                         {member?.achievements?.length || 0}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Card sx={{ bgcolor: "#f8f9fa", boxShadow: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Certifications
//                       </Typography>
//                       <Typography
//                         variant="h3"
//                         sx={{ color: "#ca0019", fontWeight: "bold" }}
//                       >
//                         {member?.certifications?.length || 0}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Card sx={{ bgcolor: "#f8f9fa", boxShadow: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Projects
//                       </Typography>
//                       <Typography
//                         variant="h3"
//                         sx={{ color: "#ca0019", fontWeight: "bold" }}
//                       >
//                         {member?.projects?.length || 0}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>

//               {/* Charts */}
//               <Grid container spacing={3} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={6}>
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h6">SGPA Progression</Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         gutterBottom
//                       >
//                         Semester-wise SGPA performance
//                       </Typography>
//                       <Box sx={{ height: 320 }}>
//                         {statistics?.sgpaData.labels.length > 0 ? (
//                           <Line
//                             data={statistics.sgpaData}
//                             options={{
//                               scales: {
//                                 y: {
//                                   beginAtZero: true,
//                                   max: 10,
//                                   ticks: {
//                                     stepSize: 2,
//                                   },
//                                 },
//                               },
//                               maintainAspectRatio: false,
//                             }}
//                           />
//                         ) : (
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               height: "100%",
//                             }}
//                           >
//                             <Typography color="text.secondary">
//                               No SGPA data available
//                             </Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h6">Supplementary Exams</Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         gutterBottom
//                       >
//                         Semester-wise supplementary count
//                       </Typography>
//                       <Box sx={{ height: 320 }}>
//                         {statistics?.supplementaryData.labels.length > 0 ? (
//                           <Bar
//                             data={statistics.supplementaryData}
//                             options={{
//                               scales: {
//                                 y: {
//                                   beginAtZero: true,
//                                   ticks: {
//                                     stepSize: 1,
//                                   },
//                                 },
//                               },
//                               maintainAspectRatio: false,
//                             }}
//                           />
//                         ) : (
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               height: "100%",
//                             }}
//                           >
//                             <Typography color="text.secondary">
//                               No supplementary data available
//                             </Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>

//               <Card sx={{ mt: 3 }}>
//                 <CardContent>
//                   <Typography variant="h6">Fine Status Distribution</Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     gutterBottom
//                   >
//                     Overview of fine payment status
//                   </Typography>
//                   <Box sx={{ height: 320 }}>
//                     {member?.fines && member.fines.length > 0 ? (
//                       <Grid container spacing={2}>
//                         <Grid
//                           item
//                           xs={12}
//                           md={6}
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <Box sx={{ width: "100%", maxWidth: 300 }}>
//                             <Pie
//                               data={
//                                 statistics?.fineData || {
//                                   labels: ["No Data"],
//                                   datasets: [
//                                     {
//                                       data: [1],
//                                       backgroundColor: ["#e2e8f0"],
//                                     },
//                                   ],
//                                 }
//                               }
//                               options={{
//                                 maintainAspectRatio: false,
//                               }}
//                             />
//                           </Box>
//                         </Grid>
//                         <Grid
//                           item
//                           xs={12}
//                           md={6}
//                           sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <Box sx={{ mb: 2 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 mb: 1,
//                               }}
//                             >
//                               <Box
//                                 sx={{
//                                   width: 16,
//                                   height: 16,
//                                   borderRadius: "50%",
//                                   bgcolor: "rgba(255,99,132,0.7)",
//                                   mr: 1,
//                                 }}
//                               />
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   width: "100%",
//                                 }}
//                               >
//                                 <Typography variant="body2" fontWeight={500}>
//                                   Pending
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500}>
//                                   {
//                                     member.fines.filter(
//                                       (f) => f.status === "pending"
//                                     ).length
//                                   }
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <LinearProgress
//                               variant="determinate"
//                               value={
//                                 (member.fines.filter(
//                                   (f) => f.status === "pending"
//                                 ).length /
//                                   member.fines.length) *
//                                 100
//                               }
//                               sx={{ height: 8, borderRadius: 4 }}
//                             />
//                           </Box>

//                           <Box sx={{ mb: 2 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 mb: 1,
//                               }}
//                             >
//                               <Box
//                                 sx={{
//                                   width: 16,
//                                   height: 16,
//                                   borderRadius: "50%",
//                                   bgcolor: "rgba(75,192,192,0.7)",
//                                   mr: 1,
//                                 }}
//                               />
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   width: "100%",
//                                 }}
//                               >
//                                 <Typography variant="body2" fontWeight={500}>
//                                   Paid
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500}>
//                                   {
//                                     member.fines.filter(
//                                       (f) => f.status === "paid"
//                                     ).length
//                                   }
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <LinearProgress
//                               variant="determinate"
//                               value={
//                                 (member.fines.filter((f) => f.status === "paid")
//                                   .length /
//                                   member.fines.length) *
//                                 100
//                               }
//                               sx={{ height: 8, borderRadius: 4 }}
//                             />
//                           </Box>

//                           <Box sx={{ mb: 2 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 mb: 1,
//                               }}
//                             >
//                               <Box
//                                 sx={{
//                                   width: 16,
//                                   height: 16,
//                                   borderRadius: "50%",
//                                   bgcolor: "rgba(153,102,255,0.7)",
//                                   mr: 1,
//                                 }}
//                               />
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   width: "100%",
//                                 }}
//                               >
//                                 <Typography variant="body2" fontWeight={500}>
//                                   Waived
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500}>
//                                   {
//                                     member.fines.filter(
//                                       (f) => f.status === "waived"
//                                     ).length
//                                   }
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <LinearProgress
//                               variant="determinate"
//                               value={
//                                 (member.fines.filter(
//                                   (f) => f.status === "waived"
//                                 ).length /
//                                   member.fines.length) *
//                                 100
//                               }
//                               sx={{ height: 8, borderRadius: 4 }}
//                             />
//                           </Box>

//                           <Box sx={{ pt: 2 }}>
//                             <Typography variant="body2" fontWeight={500}>
//                               Total Pending Amount:{" "}
//                               <Box
//                                 component="span"
//                                 fontWeight={700}
//                                 color="primary"
//                               >
//                                 ₹{member.totalPendingFines || 0}
//                               </Box>
//                             </Typography>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     ) : (
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           height: "100%",
//                         }}
//                       >
//                         <Typography color="text.secondary">
//                           No fine data available
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </CustomTabPanel>

//             {/* Achievements Tab */}
//             <CustomTabPanel value={value} index={1}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 3,
//                 }}
//               >
//                 <Typography variant="h6">Achievements</Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<AddIcon />}
//                   onClick={() => handleAddItem("achievement")}
//                   sx={{
//                     bgcolor: "#ca0019",
//                     "&:hover": { bgcolor: "#a30014" },
//                   }}
//                 >
//                   Add Achievement
//                 </Button>
//               </Box>

//               <Grid container spacing={3}>
//                 {member?.achievements && member.achievements.length > 0 ? (
//                   member.achievements.map((achievement) => (
//                     <Grid
//                       item
//                       xs={12}
//                       md={6}
//                       key={achievement.id || achievement._id}
//                     >
//                       <Card sx={{ position: "relative" }}>
//                         <IconButton
//                           size="small"
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             bgcolor: "rgba(0,0,0,0.05)",
//                             "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
//                           }}
//                           onClick={() =>
//                             handleDeleteAchievement(
//                               achievement.id || achievement._id || ""
//                             )
//                           }
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                         <CardContent>
//                           <Box sx={{ display: "flex", gap: 2 }}>
//                             <Box
//                               sx={{
//                                 p: 1.5,
//                                 borderRadius: "50%",
//                                 bgcolor: "#f1f5f9",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 height: "fit-content",
//                               }}
//                             >
//                               <AwardIcon sx={{ color: "#ca0019" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="h6">
//                                 {achievement.title}
//                               </Typography>
//                               <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                                 sx={{ mt: 1 }}
//                               >
//                                 {achievement.description}
//                               </Typography>
//                               {achievement.date && (
//                                 <Typography
//                                   variant="caption"
//                                   color="text.secondary"
//                                   sx={{ display: "block", mt: 1 }}
//                                 >
//                                   {new Date(
//                                     achievement.date
//                                   ).toLocaleDateString()}
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   ))
//                 ) : (
//                   <Grid item xs={12}>
//                     <Box
//                       sx={{
//                         textAlign: "center",
//                         py: 4,
//                         bgcolor: "#f8fafc",
//                         borderRadius: 1,
//                       }}
//                     >
//                       <Typography variant="body1" color="text.secondary">
//                         No achievements added yet
//                       </Typography>
//                       <Button
//                         variant="outlined"
//                         startIcon={<AddIcon />}
//                         sx={{ mt: 2 }}
//                         onClick={() => handleAddItem("achievement")}
//                       >
//                         Add Your First Achievement
//                       </Button>
//                     </Box>
//                   </Grid>
//                 )}
//               </Grid>
//             </CustomTabPanel>

//             {/* Certifications Tab */}
//             <CustomTabPanel value={value} index={2}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 3,
//                 }}
//               >
//                 <Typography variant="h6">Certifications</Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<AddIcon />}
//                   onClick={() => handleAddItem("certification")}
//                   sx={{
//                     bgcolor: "#ca0019",
//                     "&:hover": { bgcolor: "#a30014" },
//                   }}
//                 >
//                   Add Certification
//                 </Button>
//               </Box>

//               <Grid container spacing={3}>
//                 {member?.certifications && member.certifications.length > 0 ? (
//                   member.certifications.map((certification) => (
//                     <Grid
//                       item
//                       xs={12}
//                       md={4}
//                       key={certification.id || certification._id}
//                     >
//                       <Card sx={{ position: "relative", overflow: "hidden" }}>
//                         <IconButton
//                           size="small"
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             bgcolor: "rgba(255,255,255,0.8)",
//                             "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
//                             zindex: 1,
//                           }}
//                           onClick={() =>
//                             handleDeleteCertification(
//                               certification.id || certification._id || ""
//                             )
//                           }
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                         <iframe
                          
//                           height="140"
//                           src={
//                             `https://drive.google.com/file/d/${certification.fileId}/preview`
//                           }
//                           alt={certification.title}
//                         />
//                         <CardContent>
//                           <Typography variant="h6" noWrap>
//                             {certification.title}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {certification.issuer}
//                           </Typography>
//                           {certification.date && (
//                             <Typography
//                               variant="caption"
//                               color="text.secondary"
//                               sx={{ display: "block", mt: 1 }}
//                             >
//                               {new Date(
//                                 certification.date
//                               ).toLocaleDateString()}
//                             </Typography>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   ))
//                 ) : (
//                   <Grid item xs={12}>
//                     <Box
//                       sx={{
//                         textAlign: "center",
//                         py: 4,
//                         bgcolor: "#f8fafc",
//                         borderRadius: 1,
//                       }}
//                     >
//                       <Typography variant="body1" color="text.secondary">
//                         No certifications added yet
//                       </Typography>
//                       <Button
//                         variant="outlined"
//                         startIcon={<AddIcon />}
//                         sx={{ mt: 2 }}
//                         onClick={() => handleAddItem("certification")}
//                       >
//                         Add Your First Certification
//                       </Button>
//                     </Box>
//                   </Grid>
//                 )}
//               </Grid>
//             </CustomTabPanel>

//             {/* Projects Tab */}
//             <CustomTabPanel value={value} index={3}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 3,
//                 }}
//               >
//                 <Typography variant="h6">Projects</Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<AddIcon />}
//                   onClick={() => handleAddItem("project")}
//                   sx={{
//                     bgcolor: "#ca0019",
//                     "&:hover": { bgcolor: "#a30014" },
//                   }}
//                 >
//                   Add Project
//                 </Button>
//               </Box>

//               <Grid container spacing={3}>
//                 {member?.projects && member.projects.length > 0 ? (
//                   member.projects.map((project) => (
//                     <Grid item xs={12} md={6} key={project.id || project._id}>
//                       <Card sx={{ position: "relative" }}>
//                         <IconButton
//                           size="small"
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             bgcolor: "rgba(255,255,255,0.8)",
//                             "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
//                             zindex: 1,
//                           }}
//                           onClick={() =>
//                             handleDeleteProject(project.id || project._id || "")
//                           }
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                         {project.imageUrl && (
//                           <CardMedia
//                             component="img"
//                             height="200"
//                             image={
//                               project.imageUrl ||
//                               "/placeholder.svg?height=180&width=320"
//                             }
//                             alt={project.title}
//                           />
//                         )}
//                         <CardContent>
//                           <Typography variant="h6">{project.title}</Typography>
//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             sx={{ mt: 1 }}
//                           >
//                             {project.description}
//                           </Typography>

//                           <Box
//                             sx={{
//                               mt: 2,
//                               display: "flex",
//                               flexWrap: "wrap",
//                               gap: 0.5,
//                             }}
//                           >
//                             {project.technologies &&
//                               project.technologies.map((tech, index) => (
//                                 <Chip
//                                   key={index}
//                                   label={tech}
//                                   size="small"
//                                   sx={{
//                                     bgcolor: "#f1f5f9",
//                                     color: "#475569",
//                                   }}
//                                 />
//                               ))}
//                           </Box>

//                           <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
//                             {project.link && (
//                               <Button
//                                 variant="text"
//                                 size="small"
//                                 endIcon={<ArrowUpRightIcon />}
//                                 component="a"
//                                 href={project.link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 sx={{
//                                   color: "#ca0019",
//                                   "&:hover": {
//                                     bgcolor: "rgba(202, 0, 25, 0.04)",
//                                   },
//                                 }}
//                               >
//                                 View Project
//                               </Button>
//                             )}

//                             {project.githubUrl && (
//                               <Button
//                                 variant="text"
//                                 size="small"
//                                 startIcon={<GitHubIcon />}
//                                 component="a"
//                                 href={project.githubUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 sx={{
//                                   color: "#475569",
//                                   "&:hover": {
//                                     bgcolor: "rgba(71, 85, 105, 0.04)",
//                                   },
//                                 }}
//                               >
//                                 GitHub
//                               </Button>
//                             )}
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   ))
//                 ) : (
//                   <Grid item xs={12}>
//                     <Box
//                       sx={{
//                         textAlign: "center",
//                         py: 4,
//                         bgcolor: "#f8fafc",
//                         borderRadius: 1,
//                       }}
//                     >
//                       <Typography variant="body1" color="text.secondary">
//                         No projects added yet
//                       </Typography>
//                       <Button
//                         variant="outlined"
//                         startIcon={<AddIcon />}
//                         sx={{ mt: 2 }}
//                         onClick={() => handleAddItem("project")}
//                       >
//                         Add Your First Project
//                       </Button>
//                     </Box>
//                   </Grid>
//                 )}
//               </Grid>
//             </CustomTabPanel>

//             {/* Academics Tab */}
//             <CustomTabPanel value={value} index={4}>
//               <Grid container spacing={3}>
//                 {/* SGPA Section */}
//                 <Grid item xs={12} md={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       mb: 2,
//                     }}
//                   >
//                     <Typography variant="h6">Semester SGPA</Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<AddIcon />}
//                       onClick={() => handleAddItem("sgpa")}
//                     >
//                       Add SGPA
//                     </Button>
//                   </Box>

//                   <Card>
//                     <CardContent sx={{ p: 0 }}>
//                       <Box
//                         sx={{ border: "1px solid #e0e0e0", borderRadius: 1 }}
//                       >
//                         <Box
//                           sx={{
//                             display: "grid",
//                             gridTemplateColumns: "25% 50% 25%",
//                             bgcolor: "#f8fafc",
//                             p: 1.5,
//                           }}
//                         >
//                           <Typography variant="body2" fontWeight={500}>
//                             Semester
//                           </Typography>
//                           <Typography variant="body2" fontWeight={500}>
//                             SGPA
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             fontWeight={500}
//                             sx={{ textAlign: "right" }}
//                           >
//                             Actions
//                           </Typography>
//                         </Box>
//                         <Box sx={{ maxHeight: 300, overflow: "auto" }}>
//                           {member?.semesterSGPA &&
//                           member.semesterSGPA.length > 0 ? (
//                             member.semesterSGPA
//                               .sort((a, b) => a.semester - b.semester)
//                               .map((sgpa) => (
//                                 <Box
//                                   key={sgpa._id}
//                                   sx={{
//                                     display: "grid",
//                                     gridTemplateColumns: "25% 50% 25%",
//                                     p: 1.5,
//                                     borderTop: "1px solid #e0e0e0",
//                                   }}
//                                 >
//                                   <Typography variant="body2">
//                                     Semester {sgpa.semester}
//                                   </Typography>
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: 1,
//                                     }}
//                                   >
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight={500}
//                                     >
//                                       {sgpa.sgpa.toFixed(2)}
//                                     </Typography>
//                                     <LinearProgress
//                                       variant="determinate"
//                                       value={(sgpa.sgpa / 10) * 100}
//                                       sx={{
//                                         height: 8,
//                                         borderRadius: 4,
//                                         flexGrow: 1,
//                                       }}
//                                     />
//                                   </Box>
//                                   <Box sx={{ textAlign: "right" }}>
//                                     <IconButton
//                                       size="small"
//                                       sx={{
//                                         color: "#64748b",
//                                         "&:hover": {
//                                           color: "#ef4444",
//                                           bgcolor: "rgba(239, 68, 68, 0.04)",
//                                         },
//                                       }}
//                                       onClick={() =>
//                                         handleDeleteSGPA(sgpa._id || "")
//                                       }
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </Box>
//                               ))
//                           ) : (
//                             <Box sx={{ p: 3, textAlign: "center" }}>
//                               <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                               >
//                                 No SGPA data available
//                               </Typography>
//                             </Box>
//                           )}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>

//                   {member?.semesterSGPA && member.semesterSGPA.length > 0 && (
//                     <Box
//                       sx={{
//                         mt: 2,
//                         p: 1.5,
//                         bgcolor: "#f8fafc",
//                         borderRadius: 1,
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Typography variant="body1" fontWeight={500}>
//                         CGPA
//                       </Typography>
//                       <Typography variant="h5" fontWeight={700} color="primary">
//                         {member.cgpa || "0.00"}
//                       </Typography>
//                     </Box>
//                   )}
//                 </Grid>

//                 {/* Fines Section */}
//                 <Grid item xs={12} md={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       mb: 2,
//                     }}
//                   >
//                     <Typography variant="h6">Fines</Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<AddIcon />}
//                       onClick={() => handleAddItem("fine")}
//                     >
//                       Add Fine
//                     </Button>
//                   </Box>

//                   <Card>
//                     <CardContent sx={{ p: 0 }}>
//                       <Box
//                         sx={{ border: "1px solid #e0e0e0", borderRadius: 1 }}
//                       >
//                         <Box
//                           sx={{
//                             display: "grid",
//                             gridTemplateColumns: "20% 35% 30% 15%",
//                             bgcolor: "#f8fafc",
//                             p: 1.5,
//                           }}
//                         >
//                           <Typography variant="body2" fontWeight={500}>
//                             Amount
//                           </Typography>
//                           <Typography variant="body2" fontWeight={500}>
//                             Reason
//                           </Typography>
//                           <Typography variant="body2" fontWeight={500}>
//                             Status
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             fontWeight={500}
//                             sx={{ textAlign: "right" }}
//                           >
//                             Actions
//                           </Typography>
//                         </Box>
//                         <Box sx={{ maxHeight: 300, overflow: "auto" }}>
//                           {member?.fines && member.fines.length > 0 ? (
//                             member.fines.map((fine) => (
//                               <Box
//                                 key={fine._id}
//                                 sx={{
//                                   display: "grid",
//                                   gridTemplateColumns: "20% 35% 30% 15%",
//                                   p: 1.5,
//                                   borderTop: "1px solid #e0e0e0",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <Typography variant="body2" fontWeight={500}>
//                                   ₹{fine.amount}
//                                 </Typography>
//                                 <Typography
//                                   variant="body2"
//                                   sx={{
//                                     overflow: "hidden",
//                                     textOverflow: "ellipsis",
//                                     whiteSpace: "nowrap",
//                                   }}
//                                   title={fine.reason}
//                                 >
//                                   {fine.reason}
//                                 </Typography>
//                                 <FormControl
//                                   size="small"
//                                   sx={{ minWidth: 120 }}
//                                 >
//                                   <Select
//                                     value={fine.status}
//                                     onChange={(e) =>
//                                       handleUpdateFineStatus(
//                                         fine._id || "",
//                                         e.target.value
//                                       )
//                                     }
//                                     sx={{ height: 32 }}
//                                   >
//                                     <MenuItem value="pending">
//                                       <Chip
//                                         label="Pending"
//                                         size="small"
//                                         color="error"
//                                         sx={{ height: 20, fontSize: "0.75rem" }}
//                                       />
//                                     </MenuItem>
//                                     <MenuItem value="paid">
//                                       <Chip
//                                         label="Paid"
//                                         size="small"
//                                         color="primary"
//                                         sx={{ height: 20, fontSize: "0.75rem" }}
//                                       />
//                                     </MenuItem>
//                                     <MenuItem value="waived">
//                                       <Chip
//                                         label="Waived"
//                                         size="small"
//                                         color="default"
//                                         sx={{ height: 20, fontSize: "0.75rem" }}
//                                       />
//                                     </MenuItem>
//                                   </Select>
//                                 </FormControl>
//                                 <Box sx={{ textAlign: "right" }}>
//                                   <IconButton
//                                     size="small"
//                                     sx={{
//                                       color: "#64748b",
//                                       "&:hover": {
//                                         color: "#ef4444",
//                                         bgcolor: "rgba(239, 68, 68, 0.04)",
//                                       },
//                                     }}
//                                     onClick={() =>
//                                       handleDeleteFine(fine._id || "")
//                                     }
//                                   >
//                                     <DeleteIcon fontSize="small" />
//                                   </IconButton>
//                                 </Box>
//                               </Box>
//                             ))
//                           ) : (
//                             <Box sx={{ p: 3, textAlign: "center" }}>
//                               <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                               >
//                                 No fines recorded
//                               </Typography>
//                             </Box>
//                           )}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>

//                   {member?.fines && member.fines.length > 0 && (
//                     <Box
//                       sx={{
//                         mt: 2,
//                         p: 1.5,
//                         bgcolor: "#f8fafc",
//                         borderRadius: 1,
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Typography variant="body1" fontWeight={500}>
//                         Total Pending Fines
//                       </Typography>
//                       <Typography variant="h5" fontWeight={700} color="primary">
//                         ₹{member.totalPendingFines || 0}
//                       </Typography>
//                     </Box>
//                   )}
//                 </Grid>
//               </Grid>
//             </CustomTabPanel>
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Edit Profile Dialog */}
//       <Dialog
//         open={isEditing}
//         onClose={() => setIsEditing(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>
//           {editSection === "profile" && "Edit Profile"}
//           {editSection === "bio" && "Edit Bio"}
//           {editSection === "contact" && "Edit Contact Information"}
//           {editSection === "social" && "Edit Social Links"}
//           {editSection === "skills" && "Edit Skills"}
//           {editSection === "add-achievement" && "Add Achievement"}
//           {editSection === "add-certification" && "Add Certification"}
//           {editSection === "add-project" && "Add Project"}
//           {editSection === "add-sgpa" && "Add Semester SGPA"}
//           {editSection === "add-fine" && "Add Fine"}
//         </DialogTitle>

//         <DialogContent>
//           {/* Profile Form */}
//           {editSection === "profile" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="fullName"
//                 label="Full Name"
//                 name="fullName"
//                 value={formData.fullName || ""}
//                 onChange={handleInputChange}
//               />

//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Batch</InputLabel>
//                 <Select
//                   name="batch"
//                   value={formData.batch || ""}
//                   label="Batch"
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="The Uniques 1.0">The Uniques 1.0</MenuItem>
//                   <MenuItem value="The Uniques 2.0">The Uniques 2.0</MenuItem>
//                   <MenuItem value="The Uniques 3.0">The Uniques 3.0</MenuItem>
//                   <MenuItem value="The Uniques 4.0">The Uniques 4.0</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Course</InputLabel>
//                 <Select
//                   name="course"
//                   value={formData.course || ""}
//                   label="Course"
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="B.Tech CSE">B.Tech CSE</MenuItem>
//                   <MenuItem value="CSD">CSD</MenuItem>
//                 </Select>
//               </FormControl>

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="admno"
//                 label="Admission Number"
//                 name="admno"
//                 value={formData.admno || ""}
//                 onChange={handleInputChange}
//               />

//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={formData.isPlaced || false}
//                     onChange={(e) =>
//                       setFormData({ ...formData, isPlaced: e.target.checked })
//                     }
//                     name="isPlaced"
//                   />
//                 }
//                 label="Placed"
//                 sx={{ mt: 2 }}
//               />
//             </Box>
//           )}

//           {/* Bio Form */}
//           {editSection === "bio" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="bio"
//                 label="Bio"
//                 name="bio"
//                 multiline
//                 rows={4}
//                 value={formData.bio || ""}
//                 onChange={handleInputChange}
//               />
//             </Box>
//           )}

//           {/* Contact Form */}
//           {editSection === "contact" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={handleInputChange}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="contact"
//                 label="Phone"
//                 name="contact"
//                 value={formData.contact || ""}
//                 onChange={handleInputChange}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="address"
//                 label="Address"
//                 name="address"
//                 value={formData.address || ""}
//                 onChange={handleInputChange}
//               />

//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <TextField
//                     margin="normal"
//                     fullWidth
//                     id="city"
//                     label="City"
//                     name="city"
//                     value={formData.city || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     margin="normal"
//                     fullWidth
//                     id="state"
//                     label="State"
//                     name="state"
//                     value={formData.state || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Grid>
//               </Grid>
//             </Box>
//           )}

//           {/* Social Links Form */}
//           {editSection === "social" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="githubProfile"
//                 label="GitHub Profile"
//                 name="githubProfile"
//                 value={formData.githubProfile || ""}
//                 onChange={handleInputChange}
//                 InputProps={{
//                   startAdornment: (
//                     <GitHubIcon sx={{ mr: 1, color: "text.secondary" }} />
//                   ),
//                 }}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="linkedinProfile"
//                 label="LinkedIn Profile"
//                 name="linkedinProfile"
//                 value={formData.linkedinProfile || ""}
//                 onChange={handleInputChange}
//                 InputProps={{
//                   startAdornment: (
//                     <LinkedInIcon sx={{ mr: 1, color: "text.secondary" }} />
//                   ),
//                 }}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="instagramProfile"
//                 label="Instagram Profile"
//                 name="instagramProfile"
//                 value={formData.instagramProfile || ""}
//                 onChange={handleInputChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InstagramIcon sx={{ mr: 1, color: "text.secondary" }} />
//                   ),
//                 }}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="twitterProfile"
//                 label="Twitter Profile"
//                 name="twitterProfile"
//                 value={formData.twitterProfile || ""}
//                 onChange={handleInputChange}
//                 InputProps={{
//                   startAdornment: (
//                     <TwitterIcon sx={{ mr: 1, color: "text.secondary" }} />
//                   ),
//                 }}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="whatsappContact"
//                 label="WhatsApp Number"
//                 name="whatsappContact"
//                 value={formData.whatsappContact || ""}
//                 onChange={handleInputChange}
//                 InputProps={{
//                   startAdornment: (
//                     <WhatsAppIcon sx={{ mr: 1, color: "text.secondary" }} />
//                   ),
//                 }}
//               />
//             </Box>
//           )}

//           {/* Skills Form */}
//           {editSection === "skills" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Current Skills
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: 0.5,
//                     p: 1,
//                     border: "1px solid #e0e0e0",
//                     borderRadius: 1,
//                   }}
//                 >
//                   {formData.skills?.map((skill, index) => (
//                     <Chip
//                       key={index}
//                       label={skill}
//                       onDelete={() => removeSkill(skill)}
//                       size="small"
//                       sx={{
//                         m: 0.5,
//                         bgcolor: "#e2e8f0",
//                         color: "#475569",
//                       }}
//                     />
//                   ))}
//                   {(!formData.skills || formData.skills.length === 0) && (
//                     <Typography variant="body2" color="text.secondary">
//                       No skills added yet
//                     </Typography>
//                   )}
//                 </Box>
//               </Box>

//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <TextField
//                   fullWidth
//                   id="newSkill"
//                   label="Add Skill"
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       addSkill();
//                     }
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={addSkill}
//                   sx={{
//                     bgcolor: "#ca0019",
//                     "&:hover": { bgcolor: "#a30014" },
//                   }}
//                 >
//                   Add
//                 </Button>
//               </Box>
//             </Box>
//           )}

//           {/* Add Achievement Form */}
//           {editSection === "add-achievement" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="title"
//                 label="Title"
//                 name="title"
//                 value={newAchievement.title}
//                 onChange={handleAchievementChange}
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="description"
//                 label="Description"
//                 name="description"
//                 multiline
//                 rows={3}
//                 value={newAchievement.description}
//                 onChange={handleAchievementChange}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="date"
//                 label="Date"
//                 name="date"
//                 type="date"
//                 value={newAchievement.date}
//                 onChange={handleAchievementChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </Box>
//           )}

//           {/* Add Certification Form */}
//           {editSection === "add-certification" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="title"
//                 label="Title"
//                 name="title"
//                 value={newCertification.title}
//                 onChange={handleCertificationChange}
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="issuer"
//                 label="Issuer"
//                 name="issuer"
//                 value={newCertification.issuer}
//                 onChange={handleCertificationChange}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="date"
//                 label="Date"
//                 name="date"
//                 type="date"
//                 value={newCertification.date}
//                 onChange={handleCertificationChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />

//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Certificate Image
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     startIcon={<UploadIcon />}
//                     sx={{
//                       borderColor: "#ca0019",
//                       color: "#ca0019",
//                       "&:hover": {
//                         borderColor: "#a30014",
//                         backgroundColor: "rgba(202, 0, 25, 0.04)",
//                       },
//                     }}
//                   >
//                     Upload File
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*"
//                       onChange={handleFileSelect}
//                       ref={fileInputRef}
//                     />
//                   </Button>
//                   {uploadedFile && (
//                     <Typography variant="body2">{uploadedFile.name}</Typography>
//                   )}
//                 </Box>

//                 {uploadProgress > 0 && (
//                   <LinearProgress
//                     variant="determinate"
//                     value={uploadProgress}
//                     sx={{ mt: 1, height: 8, borderRadius: 4 }}
//                   />
//                 )}

//                 <Divider sx={{ my: 2 }} />

//                 <Typography variant="subtitle2" gutterBottom>
//                   Or enter image URL
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   id="imageUrl"
//                   label="Image URL"
//                   name="imageUrl"
//                   value={newCertification.imageUrl}
//                   onChange={handleCertificationChange}
//                   disabled={!!uploadedFile}
//                   helperText={
//                     uploadedFile ? "Clear uploaded file to use URL instead" : ""
//                   }
//                 />

//                 {uploadedFile && (
//                   <Button
//                     variant="text"
//                     size="small"
//                     startIcon={<CloseIcon />}
//                     onClick={() => {
//                       setUploadedFile(null);
//                       if (fileInputRef.current) {
//                         fileInputRef.current.value = "";
//                       }
//                     }}
//                     sx={{ mt: 1 }}
//                   >
//                     Clear uploaded file
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//           )}

//           {/* Add Project Form */}
//           {editSection === "add-project" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="title"
//                 label="Title"
//                 name="title"
//                 value={newProject.title}
//                 onChange={handleProjectChange}
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="description"
//                 label="Description"
//                 name="description"
//                 multiline
//                 rows={3}
//                 value={newProject.description}
//                 onChange={handleProjectChange}
//               />

//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Technologies
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: 0.5,
//                     p: 1,
//                     border: "1px solid #e0e0e0",
//                     borderRadius: 1,
//                     mb: 2,
//                   }}
//                 >
//                   {newProject.technologies.map((tech, index) => (
//                     <Chip
//                       key={index}
//                       label={tech}
//                       onDelete={() => removeTechnology(tech)}
//                       size="small"
//                       sx={{
//                         m: 0.5,
//                         bgcolor: "#e2e8f0",
//                         color: "#475569",
//                       }}
//                     />
//                   ))}
//                   {newProject.technologies.length === 0 && (
//                     <Typography variant="body2" color="text.secondary">
//                       No technologies added yet
//                     </Typography>
//                   )}
//                 </Box>

//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <TextField
//                     fullWidth
//                     id="newTechnology"
//                     label="Add Technology"
//                     value={newTechnology}
//                     onChange={(e) => setNewTechnology(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         e.preventDefault();
//                         addTechnology();
//                       }
//                     }}
//                   />
//                   <Button
//                     variant="contained"
//                     onClick={addTechnology}
//                     sx={{
//                       bgcolor: "#ca0019",
//                       "&:hover": { bgcolor: "#a30014" },
//                     }}
//                   >
//                     Add
//                   </Button>
//                 </Box>
//               </Box>

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="link"
//                 label="Project Link"
//                 name="link"
//                 value={newProject.link}
//                 onChange={handleProjectChange}
//               />

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="githubUrl"
//                 label="GitHub Repository URL"
//                 name="githubUrl"
//                 value={newProject.githubUrl}
//                 onChange={handleProjectChange}
//                 InputProps={{
//                   startAdornment: (
//                     <GitHubIcon sx={{ mr: 1, color: "text.secondary" }} />
//                   ),
//                 }}
//               />

//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Project Image
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     startIcon={<UploadIcon />}
//                     sx={{
//                       borderColor: "#ca0019",
//                       color: "#ca0019",
//                       "&:hover": {
//                         borderColor: "#a30014",
//                         backgroundColor: "rgba(202, 0, 25, 0.04)",
//                       },
//                     }}
//                   >
//                     Upload File
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*"
//                       onChange={handleFileSelect}
//                       ref={fileInputRef}
//                     />
//                   </Button>
//                   {uploadedFile && (
//                     <Typography variant="body2">{uploadedFile.name}</Typography>
//                   )}
//                 </Box>

//                 {uploadProgress > 0 && (
//                   <LinearProgress
//                     variant="determinate"
//                     value={uploadProgress}
//                     sx={{ mt: 1, height: 8, borderRadius: 4 }}
//                   />
//                 )}

//                 <Divider sx={{ my: 2 }} />

//                 <Typography variant="subtitle2" gutterBottom>
//                   Or enter image URL
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   id="imageUrl"
//                   label="Image URL"
//                   name="imageUrl"
//                   value={newProject.imageUrl}
//                   onChange={handleProjectChange}
//                   disabled={!!uploadedFile}
//                   helperText={
//                     uploadedFile ? "Clear uploaded file to use URL instead" : ""
//                   }
//                 />

//                 {uploadedFile && (
//                   <Button
//                     variant="text"
//                     size="small"
//                     startIcon={<CloseIcon />}
//                     onClick={() => {
//                       setUploadedFile(null);
//                       if (fileInputRef.current) {
//                         fileInputRef.current.value = "";
//                       }
//                     }}
//                     sx={{ mt: 1 }}
//                   >
//                     Clear uploaded file
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//           )}

//           {/* Add SGPA Form */}
//           {editSection === "add-sgpa" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Semester</InputLabel>
//                 <Select
//                   name="semester"
//                   value={newSGPA.semester.toString()}
//                   label="Semester"
//                   onChange={handleSGPASelectChange}
//                 >
//                   {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//                     <MenuItem key={sem} value={sem.toString()}>
//                       Semester {sem}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="sgpa"
//                 label="SGPA"
//                 name="sgpa"
//                 type="number"
//                 inputProps={{ min: 0, max: 10, step: 0.01 }}
//                 value={newSGPA.sgpa}
//                 onChange={handleSGPAChange}
//               />
//             </Box>
//           )}

//           {/* Add Fine Form */}
//           {editSection === "add-fine" && (
//             <Box component="form" noValidate sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="amount"
//                 label="Amount (₹)"
//                 name="amount"
//                 type="number"
//                 inputProps={{ min: 0, step: 1 }}
//                 value={newFine.amount}
//                 onChange={handleFineChange}
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="reason"
//                 label="Reason"
//                 name="reason"
//                 multiline
//                 rows={3}
//                 value={newFine.reason}
//                 onChange={handleFineChange}
//               />

//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   name="status"
//                   value={newFine.status}
//                   label="Status"
//                   onChange={handleFineSelectChange}
//                 >
//                   <MenuItem value="pending">Pending</MenuItem>
//                   <MenuItem value="paid">Paid</MenuItem>
//                   <MenuItem value="waived">Waived</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           )}
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setIsEditing(false)}>Cancel</Button>

//           {editSection === "profile" && (
//             <Button
//               onClick={handleSaveProfile}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Save Changes
//             </Button>
//           )}

//           {editSection === "bio" && (
//             <Button
//               onClick={handleSaveProfile}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Save Changes
//             </Button>
//           )}

//           {editSection === "contact" && (
//             <Button
//               onClick={handleSaveProfile}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Save Changes
//             </Button>
//           )}

//           {editSection === "social" && (
//             <Button
//               onClick={handleSaveProfile}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Save Changes
//             </Button>
//           )}

//           {editSection === "skills" && (
//             <Button
//               onClick={handleSaveProfile}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Save Changes
//             </Button>
//           )}

//           {editSection === "add-achievement" && (
//             <Button
//               onClick={handleAddAchievement}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Add Achievement
//             </Button>
//           )}

//           {editSection === "add-certification" && (
//             <Button
//               onClick={handleAddCertification}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Add Certification
//             </Button>
//           )}

//           {editSection === "add-project" && (
//             <Button
//               onClick={handleAddProject}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Add Project
//             </Button>
//           )}

//           {editSection === "add-sgpa" && (
//             <Button
//               onClick={handleAddSGPA}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Add SGPA
//             </Button>
//           )}

//           {editSection === "add-fine" && (
//             <Button
//               onClick={handleAddFine}
//               variant="contained"
//               sx={{
//                 bgcolor: "#ca0019",
//                 "&:hover": { bgcolor: "#a30014" },
//               }}
//             >
//               Add Fine
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for alerts */}
//       <Snackbar
//         open={alert.open}
//         autoHideDuration={6000}
//         onClose={() => setAlert({ ...alert, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setAlert({ ...alert, open: false })}
//           severity={alert.severity}
//         >
//           {alert.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default index;
"use client"

import { useState, useEffect, useRef } from "react"
import {
  Button,
  Chip,
  LinearProgress,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Avatar,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Switch,
  FormControlLabel,
  Paper,
  Container,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Tooltip,
  useTheme
} from "@mui/material"
import axios from "axios"
import tu from "@/assets/logos/tu.png"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import XIcon from "@mui/icons-material/X"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { Link } from "react-router"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import { ArrowUpRight, Award, Briefcase, Home, Upload } from 'lucide-react'
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import BusinessIcon from "@mui/icons-material/Business"
import PropTypes from "prop-types"
import LabelIcon from "@mui/icons-material/Label"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import LoginIcon from "@mui/icons-material/Login"
import EditIcon from "@mui/icons-material/Edit"
import VerifiedIcon from "@mui/icons-material/Verified"
import BlockIcon from "@mui/icons-material/Block"
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"
import InstagramIcon from "@mui/icons-material/Instagram"
import SchoolIcon from "@mui/icons-material/School"
import WorkIcon from "@mui/icons-material/Work"
import EventIcon from "@mui/icons-material/Event"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AssessmentIcon from "@mui/icons-material/Assessment"
import DoneIcon from "@mui/icons-material/Done"
import ErrorIcon from "@mui/icons-material/Error"
import EventAvailableIcon from "@mui/icons-material/EventAvailable"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"
import UploadIcon from "@mui/icons-material/Upload"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Menu from "@mui/material/Menu"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import CodeIcon from "@mui/icons-material/Code"
import LanguageIcon from "@mui/icons-material/Language"
import BarChartIcon from "@mui/icons-material/BarChart"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts'

// API base URL
const API_BASE_URL = "https://theuniquesbackend.vercel.app"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

// Add this helper function near the top of your component
const getProxyImageUrl = (fileId) => {
  if (!fileId) return '/placeholder.svg'; // Fallback image
  return `${API_BASE_URL}/api/image-proxy/${fileId}`;
};

const Index = () => {
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const [fineModalOpen, setFineModalOpen] = useState(false)
  const [fineAmount, setFineAmount] = useState("")
  const [fineReason, setFineReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  // CRUD state management
  const [editMode, setEditMode] = useState({
    profile: false,
    skills: false,
    bio: false,
  })
  const [editedUser, setEditedUser] = useState({})
  const [skillInput, setSkillInput] = useState("")

  // Profile picture upload
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePictureDialogOpen, setProfilePictureDialogOpen] = useState(false)
  const profilePictureInputRef = useRef(null)

  // Achievement CRUD states
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState({
    title: "",
    description: "",
    date: "",
  })
  const [achievementEditIndex, setAchievementEditIndex] = useState(-1)

  // Certification CRUD states
  const [certificationDialogOpen, setCertificationDialogOpen] = useState(false)
  const [currentCertification, setCurrentCertification] = useState({
    fileName: "",
    fileUrl: "",
    fileId: "",
  })
  const [certificationFile, setCertificationFile] = useState(null)
  const [certificationEditIndex, setCertificationEditIndex] = useState(-1)

  // Project CRUD states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    technologies: [],
    link: "",
    imageUrl: "",
  })
  const [projectTechInput, setProjectTechInput] = useState("")
  const [projectImage, setProjectImage] = useState(null)
  const [projectEditIndex, setProjectEditIndex] = useState(-1)

  // Internship CRUD states
  const [internshipDialogOpen, setInternshipDialogOpen] = useState(false)
  const [currentInternship, setCurrentInternship] = useState({
    title: "",
    company: "",
    type: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: [],
  })
  const [internshipSkillInput, setInternshipSkillInput] = useState("")
  const [internshipEditIndex, setInternshipEditIndex] = useState(-1)
  const [currentlyWorking, setCurrentlyWorking] = useState(false)

  // Event CRUD states
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState({
    eventName: "",
    eventDate: "",
    eventStatus: "completed",
    eventContributionType: [],
  })
  const [eventContributionInput, setEventContributionInput] = useState("")
  const [eventEditIndex, setEventEditIndex] = useState(-1)

  // Academic CRUD states
  const [semesterDialogOpen, setSemesterDialogOpen] = useState(false)
  const [currentSemester, setCurrentSemester] = useState({
    semester: "",
    sgpa: "",
  })
  const [semesterEditIndex, setSemesterEditIndex] = useState(-1)

  // Menu states for item actions
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [menuItemType, setMenuItemType] = useState("")
  const [menuItemIndex, setMenuItemIndex] = useState(-1)

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setPageLoading(true)
        const response = await axios.get(`${API_BASE_URL}/api/member/getProfile`, {
          withCredentials: true,
        })

        if (response.data && response.data.member) {
          setUser(response.data.member)
          setEditedUser(response.data.member)
        } else {
          setError("Failed to load profile data")
        }
      } catch (err) {
        console.error("Error fetching profile data:", err)
        setError("Failed to load profile. Please try again.")
      } finally {
        setPageLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Refresh data function
  const refreshData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/member/getProfile`, {
        withCredentials: true,
      })

      if (response.data && response.data.member) {
        setUser(response.data.member)
        setEditedUser(response.data.member)
        setAlert({
          open: true,
          message: "Profile data refreshed successfully",
          severity: "success",
        })
      }
    } catch (err) {
      console.error("Error refreshing profile data:", err)
      setAlert({
        open: true,
        message: "Failed to refresh profile data",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // Status badge
  const getStatusBadge = () => {
    if (!user) return null

    if (user.isSuspended) {
      return <Chip icon={<BlockIcon />} label="Suspended" color="error" size="small" />
    } else if (user.isVerified) {
      return <Chip icon={<VerifiedIcon />} label="Verified" color="success" size="small" />
    } else {
      return <Chip label={user.profileStatus} color="default" size="small" />
    }
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Handle opening fine modal
  const handleOpenFineModal = () => {
    setFineModalOpen(true)
    setFineAmount("")
    setFineReason("")
    setError(null)
  }

  // Handle closing fine modal
  const handleCloseFineModal = () => {
    setFineModalOpen(false)
  }

  // Handle imposing fine
  const handleImposeFine = async () => {
    // Validate inputs
    if (!fineAmount || fineAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (!fineReason.trim()) {
      setError("Please provide a reason for the fine")
      return
    }

    try {
      setLoading(true)

      // Make API call to impose fine
      await axios.post(
        `${API_BASE_URL}/api/admin/member/${user._id}/fine`,
        {
          amount: Number(fineAmount),
          reason: fineReason.trim(),
        },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: `Fine of ₹${fineAmount} imposed successfully`,
        severity: "success",
      })

      // Close modal
      setFineModalOpen(false)

      // Refresh data to show updated fine status
      refreshData()
    } catch (err) {
      console.error("Error imposing fine:", err)
      setError(err.response?.data?.message || "Failed to impose fine. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Toggle edit mode for profile sections
  const toggleEditMode = (section) => {
    setEditMode({
      ...editMode,
      [section]: !editMode[section],
    })

    // Reset to original data if canceling edit
    if (editMode[section]) {
      setEditedUser({ ...user })
    }
  }

  // Handle input change for profile editing
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser({
      ...editedUser,
      [name]: value,
    })
  }

  // Save profile changes
  const saveProfileChanges = async (section) => {
    try {
      setLoading(true);
  
      let dataToUpdate = {};
  
      if (section === "profile") {
        dataToUpdate = {
          fullName: editedUser.fullName,
          email: editedUser.email,
          contact: editedUser.contact,
          address: editedUser.address,
          city: editedUser.city,
          state: editedUser.state,
          linkedinProfile: editedUser.linkedinProfile,
          githubProfile: editedUser.githubProfile,
          twitterProfile: editedUser.twitterProfile,
          instagramProfile: editedUser.instagramProfile,
          whatsappContact: editedUser.whatsappContact,
        };
      } else if (section === "bio") {
        dataToUpdate = { bio: editedUser.bio };
      } else if (section === "skills") {
        dataToUpdate = { skills: Array.isArray(editedUser.skills) ? editedUser.skills : [] };
      }
  
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/editProfile`,
        dataToUpdate,
        { withCredentials: true }
      );
  
      setAlert({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
  
      toggleEditMode(section);
      refreshData();
    } catch (err) {
      console.error("Error updating profile:", err);
      setAlert({
        open: true,
        message: err.response?.data?.message || "Failed to update profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Add a skill
  const addSkill = () => {
    if (skillInput.trim() === "") return

    const updatedSkills = [...(editedUser.skills || []), skillInput.trim()]
    setEditedUser({
      ...editedUser,
      skills: updatedSkills,
    })
    setSkillInput("")
  }

  // Remove a skill
  const removeSkill = (index) => {
    const updatedSkills = [...(editedUser.skills || [])]
    updatedSkills.splice(index, 1)
    setEditedUser({
      ...editedUser,
      skills: updatedSkills,
    })
  }

  // Profile picture handling
  const handleProfilePictureClick = () => {
    setProfilePictureDialogOpen(true);
  }

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  }

  const uploadProfilePicture = async () => {
    if (!profilePicture) {
      setError("Please select an image to upload");
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("mainFolderName", user.batch);
      formData.append("studentId", user.admno);
      formData.append("subfolder", "profile");
      formData.append("memberId", user._id);
      formData.append("files", profilePicture);

      const uploadResponse = await axios.post(
        `${API_BASE_URL}/upload/file_upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (uploadResponse?.data?.files?.length > 0) {
        const fileData = {
          fileUrl: uploadResponse.data.files[0].fileUrl,
          fileId: uploadResponse.data.files[0].fileId,
        };

        // Update profile picture in database
        await axios.put(
          `${API_BASE_URL}/api/member/members/${user._id}/editProfile`,
          { profilePic: fileData },
          { withCredentials: true }
        );

        setAlert({
          open: true,
          message: "Profile picture updated successfully",
          severity: "success",
        });

        setProfilePictureDialogOpen(false);
        refreshData();
      } else {
        throw new Error("File upload failed");
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      setError(err.response?.data?.message || "Failed to upload profile picture");
    } finally {
      setLoading(false);
    }
  }

  // Achievement CRUD operations
  const openAchievementDialog = (achievement = null, index = -1) => {
    if (achievement) {
      setCurrentAchievement({ ...achievement })
      setAchievementEditIndex(index)
    } else {
      setCurrentAchievement({
        title: "",
        description: "",
        date: "",
      })
      setAchievementEditIndex(-1)
    }
    setAchievementDialogOpen(true)
  }

  const handleAchievementInputChange = (e) => {
    const { name, value } = e.target
    setCurrentAchievement({
      ...currentAchievement,
      [name]: value,
    })
  }

  const saveAchievement = async () => {
    try {
      setLoading(true)

      // Validate
      if (!currentAchievement.title.trim()) {
        setError("Title is required")
        return
      }

      const updatedAchievements = [...(user.achievements || [])]

      if (achievementEditIndex >= 0) {
        // Update existing achievement
        updatedAchievements[achievementEditIndex] = currentAchievement
      } else {
        // Add new achievement
        updatedAchievements.push(currentAchievement)
      }

      // Make API call to update achievements
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/achievements`,
        { achievements: updatedAchievements },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: achievementEditIndex >= 0 ? "Achievement updated successfully" : "Achievement added successfully",
        severity: "success",
      })

      // Close dialog
      setAchievementDialogOpen(false)

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error saving achievement:", err)
      setError(err.response?.data?.message || "Failed to save achievement. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deleteAchievement = async (index) => {
    try {
      setLoading(true)

      const updatedAchievements = [...(user.achievements || [])]
      updatedAchievements.splice(index, 1)

      // Make API call to update achievements
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/achievements`,
        { achievements: updatedAchievements },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: "Achievement deleted successfully",
        severity: "success",
      })

      // Close menu
      handleMenuClose()

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error deleting achievement:", err)
      setAlert({
        open: true,
        message: err.response?.data?.message || "Failed to delete achievement",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Certification CRUD operations
  const openCertificationDialog = (certification = null, index = -1) => {
    if (certification) {
      setCurrentCertification({ ...certification })
      setCertificationEditIndex(index)
    } else {
      setCurrentCertification({
        fileName: "",
        fileUrl: "",
        fileId: "",
      })
      setCertificationEditIndex(-1)
    }
    setCertificationFile(null)
    setCertificationDialogOpen(true)
  }

  const handleCertificationInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCertification({
      ...currentCertification,
      [name]: value,
    })
  }

  const handleCertificationFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCertificationFile(e.target.files[0])
      setCurrentCertification({
        ...currentCertification,
        fileName: e.target.files[0].name,
      })
    }
  }

  const saveCertification = async () => {
    try {
      setLoading(true)

      // Validate
      if (!currentCertification.fileName.trim()) {
        setError("Certificate name is required")
        return
      }

      if (certificationEditIndex === -1 && !certificationFile) {
        setError("Please upload a certificate file")
        return
      }

      let fileData = {}

      // If there's a new file, upload it first
      if (certificationFile) {
        const formData = new FormData()
        formData.append("mainFolderName", user.batch)
        formData.append("studentId", user.admno)
        formData.append("subfolder", "certificate")
        formData.append("memberId", user._id)
        formData.append("files", certificationFile)

        const uploadResponse = await axios.post(`${API_BASE_URL}/upload/file_upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })

        if (uploadResponse?.data?.files?.length > 0) {
          fileData = {
            fileUrl: uploadResponse.data.files[0].fileUrl,
            fileId: uploadResponse.data.files[0].fileId,
          }
        } else {
          throw new Error("File upload failed")
        }
      }

      const updatedCertifications = [...(user.certifications || [])]

      if (certificationEditIndex >= 0) {
        // Update existing certification
        updatedCertifications[certificationEditIndex] = {
          ...currentCertification,
          ...(certificationFile ? fileData : {}),
        }
      } else {
        // Add new certification
        updatedCertifications.push({
          ...currentCertification,
          ...fileData,
          createdAt: new Date().toISOString(),
        })
      }

      // Make API call to update certifications
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/certifications`,
        { certifications: updatedCertifications },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message:
          certificationEditIndex >= 0 ? "Certification updated successfully" : "Certification added successfully",
        severity: "success",
      })

      // Close dialog
      setCertificationDialogOpen(false)

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error saving certification:", err)
      setError(err.response?.data?.message || "Failed to save certification. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deleteCertification = async (index) => {
    try {
      setLoading(true)

      const updatedCertifications = [...(user.certifications || [])]
      updatedCertifications.splice(index, 1)

      // Make API call to update certifications
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/certifications`,
        { certifications: updatedCertifications },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: "Certification deleted successfully",
        severity: "success",
      })

      // Close menu
      handleMenuClose()

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error deleting certification:", err)
      setAlert({
        open: true,
        message: err.response?.data?.message || "Failed to delete certification",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Project CRUD operations
  const openProjectDialog = (project = null, index = -1) => {
    if (project) {
      setCurrentProject({ ...project })
      setProjectEditIndex(index)
    } else {
      setCurrentProject({
        title: "",
        description: "",
        technologies: [],
        link: "",
        imageUrl: "",
      })
      setProjectEditIndex(-1)
    }
    setProjectImage(null)
    setProjectDialogOpen(true)
  }

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target
    setCurrentProject({
      ...currentProject,
      [name]: value,
    })
  }

  const handleProjectImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProjectImage(e.target.files[0])
    }
  }

  const addProjectTechnology = () => {
    if (projectTechInput.trim() === "") return

    const updatedTechnologies = [...(currentProject.technologies || []), projectTechInput.trim()]
    setCurrentProject({
      ...currentProject,
      technologies: updatedTechnologies,
    })
    setProjectTechInput("")
  }

  const removeProjectTechnology = (index) => {
    const updatedTechnologies = [...(currentProject.technologies || [])]
    updatedTechnologies.splice(index, 1)
    setCurrentProject({
      ...currentProject,
      technologies: updatedTechnologies,
    })
  }

  const saveProject = async () => {
    try {
      setLoading(true);
  
      if (!currentProject.title.trim()) {
        setError("Project title is required");
        return;
      }
  
      let imageUrl = currentProject.imageUrl;
  
      if (projectImage) {
        const formData = new FormData();
        formData.append("mainFolderName", user.batch);
        formData.append("studentId", user.admno);
        formData.append("subfolder", "projects");
        formData.append("memberId", user._id);
        formData.append("files", projectImage);
  
        const uploadResponse = await axios.post(
          `${API_BASE_URL}/upload/file_upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
  
        if (uploadResponse?.data?.files?.length > 0) {
          imageUrl = uploadResponse.data.files[0].fileUrl;
        } else {
          throw new Error("File upload failed");
        }
      }
  
      const updatedProjects = [...(user.projects || [])];
  
      if (projectEditIndex >= 0) {
        updatedProjects[projectEditIndex] = { ...currentProject, imageUrl };
      } else {
        updatedProjects.push({ ...currentProject, imageUrl });
      }
  
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/projects`,
        { projects: updatedProjects },
        { withCredentials: true }
      );
      
      setAlert({
        open: true,
        message: projectEditIndex >= 0
          ? "Project updated successfully"
          : "Project added successfully",
        severity: "success",
      });
  
      setProjectDialogOpen(false);
      refreshData();
    } catch (err) {
      console.error("Error saving project:", err);
      setError(err.response?.data?.message || "Failed to save project. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const deleteProject = async (index) => {
    try {
      setLoading(true);
  
      const updatedProjects = [...(user.projects || [])];
      updatedProjects.splice(index, 1);
  
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/projects`,
        { projects: updatedProjects },
        { withCredentials: true }
      );
  
      setAlert({
        open: true,
        message: "Project deleted successfully",
        severity: "success",
      });
  
      handleMenuClose();
      refreshData();
    } catch (err) {
      console.error("Error deleting project:", err);
      setAlert({
        open: true,
        message: err.response?.data?.message || "Failed to delete project.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  

  // Internship CRUD operations
  const openInternshipDialog = (internship = null, index = -1) => {
    if (internship) {
      setCurrentInternship({ ...internship })
      setInternshipEditIndex(index)
      setCurrentlyWorking(!internship.endDate)
    } else {
      setCurrentInternship({
        title: "",
        company: "",
        type: "",
        startDate: "",
        endDate: "",
        description: "",
        skills: [],
      })
      setInternshipEditIndex(-1)
      setCurrentlyWorking(false)
    }
    setInternshipDialogOpen(true)
  }

  const handleInternshipInputChange = (e) => {
    const { name, value } = e.target
    setCurrentInternship({
      ...currentInternship,
      [name]: value,
    })
  }

  const addInternshipSkill = () => {
    if (internshipSkillInput.trim() === "") return

    const updatedSkills = [...(currentInternship.skills || []), internshipSkillInput.trim()]
    setCurrentInternship({
      ...currentInternship,
      skills: updatedSkills,
    })
    setInternshipSkillInput("")
  }

  const removeInternshipSkill = (index) => {
    const updatedSkills = [...(currentInternship.skills || [])]
    updatedSkills.splice(index, 1)
    setCurrentInternship({
      ...currentInternship,
      skills: updatedSkills,
    })
  }

  const saveInternship = async () => {
    try {
      setLoading(true)

      // Validate
      if (!currentInternship.title.trim() || !currentInternship.company.trim()) {
        setError("Title and company are required")
        return
      }

      if (!currentInternship.startDate) {
        setError("Start date is required")
        return
      }

      // Handle currently working case
      const internshipToSave = {
        ...currentInternship,
        endDate: currentlyWorking ? "" : currentInternship.endDate,
      }

      const updatedInternships = [...(user.internships || [])]

      if (internshipEditIndex >= 0) {
        // Update existing internship
        updatedInternships[internshipEditIndex] = internshipToSave
      } else {
        // Add new internship
        updatedInternships.push(internshipToSave)
      }

      // Make API call to update internships
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/internships`,
        { internships: updatedInternships },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: internshipEditIndex >= 0 ? "Internship updated successfully" : "Internship added successfully",
        severity: "success",
      })

      // Close dialog
      setInternshipDialogOpen(false)

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error saving internship:", err)
      setError(err.response?.data?.message || "Failed to save internship. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deleteInternship = async (index) => {
    try {
      setLoading(true)

      const updatedInternships = [...(user.internships || [])]
      updatedInternships.splice(index, 1)

      // Make API call to update internships
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/internships`,
        { internships: updatedInternships },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: "Internship deleted successfully",
        severity: "success",
      })

      // Close menu
      handleMenuClose()

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error deleting internship:", err)
      setAlert({
        open: true,
        message: err.response?.data?.message || "Failed to delete internship",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Event CRUD operations
  const openEventDialog = (event = null, index = -1) => {
    if (event) {
      setCurrentEvent({ ...event })
      setEventEditIndex(index)
    } else {
      setCurrentEvent({
        eventName: "",
        eventDate: "",
        eventStatus: "completed",
        eventContributionType: [],
      })
      setEventEditIndex(-1)
    }
    setEventDialogOpen(true)
  }

  const handleEventInputChange = (e) => {
    const { name, value } = e.target
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    })
  }

  const addEventContribution = () => {
    if (eventContributionInput.trim() === "") return

    const updatedContributions = [...(currentEvent.eventContributionType || []), eventContributionInput.trim()]
    setCurrentEvent({
      ...currentEvent,
      eventContributionType: updatedContributions,
    })
    setEventContributionInput("")
  }

  const removeEventContribution = (index) => {
    const updatedContributions = [...(currentEvent.eventContributionType || [])]
    updatedContributions.splice(index, 1)
    setCurrentEvent({
      ...currentEvent,
      eventContributionType: updatedContributions,
    })
  }

  const saveEvent = async () => {
    try {
      setLoading(true);
  
      // Validate
      if (!currentEvent.eventName.trim()) {
        setError("Event name is required");
        return;
      }
  
      if (!currentEvent.eventDate) {
        setError("Event date is required");
        return;
      }
  
      const updatedEvents = [...(user.event_participation || [])];
  
      if (eventEditIndex >= 0) {
        // Update existing event
        updatedEvents[eventEditIndex] = currentEvent;
      } else {
        // Add new event
        updatedEvents.push(currentEvent);
      }
  
      // Make API call to update events
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/events`,
        { event_participation: updatedEvents },
        {
          withCredentials: true,
        }
      );
  
      // Show success message
      setAlert({
        open: true,
        message: eventEditIndex >= 0 ? "Event updated successfully" : "Event added successfully",
        severity: "success",
      });
  
      // Close dialog
      setEventDialogOpen(false);
  
      // Refresh data
      refreshData();
    } catch (err) {
      console.error("Error saving event:", err);
      setError(err.response?.data?.message || "Failed to save event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (index) => {
    try {
      setLoading(true);
  
      const updatedEvents = [...(user.event_participation || [])];
      updatedEvents.splice(index, 1);
  
      // Make API call to update events
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/events`,
        { event_participation: updatedEvents },
        {
          withCredentials: true,
        }
      );
  
      // Show success message
      setAlert({
        open: true,
        message: "Event deleted successfully",
        severity: "success",
      });
  
      // Close menu
      handleMenuClose();
  
      // Refresh data
      refreshData();
    } catch (err) {
      console.error("Error deleting event:", err);
      setAlert({
        open: true,
        message: err.response?.data?.message || "Failed to delete event",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Academic CRUD operations
  const openSemesterDialog = (semester = null, index = -1) => {
    if (semester) {
      setCurrentSemester({ ...semester })
      setSemesterEditIndex(index)
    } else {
      setCurrentSemester({
        semester: "",
        sgpa: "",
      })
      setSemesterEditIndex(-1)
    }
    setSemesterDialogOpen(true)
  }

  const handleSemesterInputChange = (e) => {
    const { name, value } = e.target
    setCurrentSemester({
      ...currentSemester,
      [name]: value,
    })
  }

  const saveSemester = async () => {
    try {
      setLoading(true)

      // Validate
      if (!currentSemester.semester) {
        setError("Semester number is required")
        return
      }

      if (
        !currentSemester.sgpa ||
        isNaN(currentSemester.sgpa) ||
        currentSemester.sgpa < 0 ||
        currentSemester.sgpa > 10
      ) {
        setError("Valid SGPA between 0-10 is required")
        return
      }

      const updatedSemesters = [...(user.semesterSGPA || [])]

      if (semesterEditIndex >= 0) {
        // Update existing semester
        updatedSemesters[semesterEditIndex] = {
          ...currentSemester,
          sgpa: Number.parseFloat(currentSemester.sgpa),
          semester: Number.parseInt(currentSemester.semester),
        }
      } else {
        // Add new semester
        updatedSemesters.push({
          ...currentSemester,
          sgpa: Number.parseFloat(currentSemester.sgpa),
          semester: Number.parseInt(currentSemester.semester),
        })
      }

      // Make API call to update semesters
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/academics`,
        { semesterSGPA: updatedSemesters },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: semesterEditIndex >= 0 ? "Semester data updated successfully" : "Semester data added successfully",
        severity: "success",
      })

      // Close dialog
      setSemesterDialogOpen(false)

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error saving semester data:", err)
      setError(err.response?.data?.message || "Failed to save semester data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deleteSemester = async (index) => {
    try {
      setLoading(true)

      const updatedSemesters = [...(user.semesterSGPA || [])]
      updatedSemesters.splice(index, 1)

      // Make API call to update semesters
      await axios.put(
        `${API_BASE_URL}/api/member/members/${user._id}/academics`,
        { semesterSGPA: updatedSemesters },
        {
          withCredentials: true,
        },
      )

      // Show success message
      setAlert({
        open: true,
        message: "Semester data deleted successfully",
        severity: "success",
      })

      // Close menu
      handleMenuClose()

      // Refresh data
      refreshData()
    } catch (err) {
      console.error("Error deleting semester data:", err)
      setAlert({
        open: true,
        message: err.response?.data?.message || "Failed to delete semester data",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Menu handlers for item actions
  const handleMenuOpen = (event, type, index) => {
    setMenuAnchorEl(event.currentTarget)
    setMenuItemType(type)
    setMenuItemIndex(index)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setMenuItemType("")
    setMenuItemIndex(-1)
  }

  const handleMenuAction = (action) => {
    handleMenuClose()

    if (action === "edit") {
      switch (menuItemType) {
        case "achievement":
          openAchievementDialog(user.achievements[menuItemIndex], menuItemIndex)
          break
        case "certification":
          openCertificationDialog(user.certifications[menuItemIndex], menuItemIndex)
          break
        case "project":
          openProjectDialog(user.projects[menuItemIndex], menuItemIndex)
          break
        case "internship":
          openInternshipDialog(user.internships[menuItemIndex], menuItemIndex)
          break
        case "event":
          openEventDialog(user.event_participation[menuItemIndex], menuItemIndex)
          break
        case "semester":
          openSemesterDialog(user.semesterSGPA[menuItemIndex], menuItemIndex)
          break
        default:
          break
      }
    } else if (action === "delete") {
      switch (menuItemType) {
        case "achievement":
          deleteAchievement(menuItemIndex)
          break
        case "certification":
          deleteCertification(menuItemIndex)
          break
        case "project":
          deleteProject(menuItemIndex)
          break
        case "internship":
          deleteInternship(menuItemIndex)
          break
        case "event":
          deleteEvent(menuItemIndex)
          break
        case "semester":
          deleteSemester(menuItemIndex)
          break
        default:
          break
      }
    }
  }

  // Prepare data for charts
  const prepareSemesterData = () => {
    if (!user?.semesterSGPA || user.semesterSGPA.length === 0) return []
    
    return user.semesterSGPA
      .sort((a, b) => a.semester - b.semester)
      .map(sem => ({
        name: `Sem ${sem.semester}`,
        sgpa: sem.sgpa,
        fill: '#ca0019'
      }))
  }

  const prepareSkillsData = () => {
    if (!user?.skills || user.skills.length === 0) return []
    
    // Group similar skills and count them
    const skillsCount = {}
    user.skills.forEach(skill => {
      skillsCount[skill] = (skillsCount[skill] || 0) + 1
    })
    
    // Convert to array for pie chart
    return Object.keys(skillsCount).map(skill => ({
      name: skill,
      value: skillsCount[skill]
    }))
  }

  const COLORS = ['#ca0019', '#333333', '#555555', '#777777', '#999999', '#bbbbbb', '#dddddd', '#eeeeee']

  // If page is loading, show loading indicator
  if (pageLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            flexDirection: "column",
          }}
        >
          <CircularProgress size={60} sx={{ mb: 3, color: "#ca0019" }} />
          <Typography variant="h6" color="textSecondary">
            Loading profile...
          </Typography>
        </Box>
      </Container>
    )
  }

  // If there's an error loading the profile, show error message
  if (error && !user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Profile
          </Typography>
          <Typography variant="body1" paragraph>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={refreshData}>
            Try Again
          </Button>
        </Paper>
      </Container>
    )
  }

  // If user data is not available, show message
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Profile Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            Unable to load profile information. Please try again later.
          </Typography>
          <Button variant="contained" color="primary" onClick={refreshData}>
            Refresh
          </Button>
        </Paper>
      </Container>
    )
  }

  const userRole = user?.role || "member"

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <Home size={16} style={{ marginRight: 4 }} />
          Back to Home 
        </Link>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={user?.profilePic?.fileId ? 
                  getProxyImageUrl(user.profilePic.fileId) : 
                  '/placeholder.svg'
                }
                alt={user.fullName}
                style={{ 
                  width: 120, 
                  height: 120, 
                  border: '4px solid #f5f5f5',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={handleProfilePictureClick}
              />
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: -10, 
                  bgcolor: '#ca0019', 
                  color: 'white',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: '#a30014'
                  }
                }}
                size="small"
                onClick={handleProfilePictureClick}
              >
                <Upload size={16} />
              </IconButton>
            </Box>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-500 font-medium uppercase">{userRole}</span>
              {getStatusBadge()}
            </div>
            {editMode.profile ? (
              <TextField
                name="fullName"
                value={editedUser.fullName || ""}
                onChange={handleProfileInputChange}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h5" fontWeight="600" align="center" gutterBottom>
                {user.fullName}
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'center' }}>
              {!editMode.profile && (
                <>
                  {user.githubProfile && (
                    <Tooltip title="GitHub">
                      <IconButton 
                        component="a" 
                        href={user.githubProfile} 
                        target="_blank"
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(0,0,0,0.1)', 
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' } 
                        }}
                      >
                        <GitHubIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {user.linkedinProfile && (
                    <Tooltip title="LinkedIn">
                      <IconButton 
                        component="a" 
                        href={user.linkedinProfile} 
                        target="_blank"
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(10,102,194,0.1)', 
                          color: '#0a66c2',
                          '&:hover': { bgcolor: 'rgba(10,102,194,0.2)' } 
                        }}
                      >
                        <LinkedInIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {user.twitterProfile && (
                    <Tooltip title="Twitter">
                      <IconButton 
                        component="a" 
                        href={user.twitterProfile} 
                        target="_blank"
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(29,161,242,0.1)', 
                          color: '#1da1f2',
                          '&:hover': { bgcolor: 'rgba(29,161,242,0.2)' } 
                        }}
                      >
                        <XIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {user.instagramProfile && (
                    <Tooltip title="Instagram">
                      <IconButton 
                        component="a" 
                        href={user.instagramProfile} 
                        target="_blank"
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(225,48,108,0.1)', 
                          color: '#e1306c',
                          '&:hover': { bgcolor: 'rgba(225,48,108,0.2)' } 
                        }}
                      >
                        <InstagramIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {user.whatsappContact && (
                    <Tooltip title="WhatsApp">
                      <IconButton 
                        component="a" 
                        href={`https://wa.me/${user.whatsappContact}`} 
                        target="_blank"
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(37,211,102,0.1)', 
                          color: '#25d366',
                          '&:hover': { bgcolor: 'rgba(37,211,102,0.2)' } 
                        }}
                      >
                        <WhatsAppIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}
            </Box>
            {editMode.profile && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1, width: '100%' }}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => saveProfileChanges("profile")}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  fullWidth
                >
                  Save
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => toggleEditMode("profile")}
                  startIcon={<CancelIcon />}
                  fullWidth
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={6} lg={7}>
            <Box sx={{ pl: { md: 3 }, borderLeft: { md: '1px solid #eee' } }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AutoStoriesIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Course:</strong> {user.course}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LabelIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Admission No:</strong> {user.admno}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BusinessIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Placement:</strong> {user.isPlaced === true ? "Placed" : "Not Placed"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <img src={tu || "/placeholder.svg"} style={{ width: 20, height: 20, marginRight: 8 }} alt="University" />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Batch:</strong> {user.batch}
                    </Typography>
                  </Box>
                  {Number.parseInt(user.fineStatus) > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CurrencyRupeeIcon fontSize="small" sx={{ color: 'error.main', mr: 1 }} />
                      <Typography variant="body2" color="error.main">
                        <strong>Fine Amount:</strong> ₹{user.fineStatus}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LoginIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Joined:</strong> {formatDate(user.createdAt)}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                    Contact Information
                  </Typography>
                  
                  {editMode.profile ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          name="email"
                          value={editedUser.email || ""}
                          onChange={handleProfileInputChange}
                          size="small"
                          fullWidth
                          margin="dense"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Contact"
                          name="contact"
                          value={editedUser.contact || ""}
                          onChange={handleProfileInputChange}
                          size="small"
                          fullWidth
                          margin="dense"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Address"
                          name="address"
                          value={editedUser.address || ""}
                          onChange={handleProfileInputChange}
                          size="small"
                          fullWidth
                          margin="dense"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="City"
                          name="city"
                          value={editedUser.city || ""}
                          onChange={handleProfileInputChange}
                          size="small"
                          fullWidth
                          margin="dense"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="State"
                          name="state"
                          value={editedUser.state || ""}
                          onChange={handleProfileInputChange}
                          size="small"
                          fullWidth
                          margin="dense"
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <EmailIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2">
                          {user.email}
                        </Typography>
                      </Box>
                      {user.contact && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <PhoneIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2">
                            <Link to={`tel:${user.contact}`}>{user.contact}</Link>
                          </Typography>
                        </Box>
                      )}
                      {(user.address || user.city || user.state) && (
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                          <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, mt: 0.3 }} />
                          <Typography variant="body2">
                            {user.address} {user.address && (user.city || user.state) && "|"} {user.city}
                            {user.city && user.state && ","} {user.state}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3} lg={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                {!editMode.profile ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => toggleEditMode("profile")}
                    sx={{
                      borderColor: '#ca0019',
                      color: '#ca0019',
                      '&:hover': {
                        borderColor: '#a30014',
                        backgroundColor: 'rgba(202, 0, 25, 0.04)'
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : null}
                
                {userRole === "admin" && (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CurrencyRupeeIcon />}
                      disabled={user.isSuspended}
                      onClick={handleOpenFineModal}
                      sx={{
                        bgcolor: '#ca0019',
                        '&:hover': {
                          bgcolor: '#a30014'
                        }
                      }}
                    >
                      Impose Fine
                    </Button>
                    <Button
                      variant="contained"
                      color={user.isSuspended ? "success" : "error"}
                      size="small"
                      startIcon={user.isSuspended ? <DoneIcon /> : <BlockIcon />}
                    >
                      {user.isSuspended ? "Unblock" : "Block"}
                    </Button>
                  </>
                )}
              </Stack>
              
              {user.cgpa && (
                <Card sx={{ 
                  mb: 2, 
                  bgcolor: 'white', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0'
                }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Overall CGPA
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h4" fontWeight="bold" color="#ca0019">
                        {user.cgpa}
                      </Typography>
                      <Rating 
                        value={Number.parseFloat(user.cgpa) / 2} 
                        precision={0.5} 
                        readOnly 
                        max={5}
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#ca0019',
                          }
                        }}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(Number.parseFloat(user.cgpa) / 10) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        mt: 1,
                        backgroundColor: "rgba(0,0,0,0.05)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#ca0019",
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              )}
              
              {user.skills && user.skills.length > 0 && (
                <Card sx={{ bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 2, border: '1px solid #f0f0f0' }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Top Skills
                      </Typography>
                      {!editMode.skills && (
                        <IconButton size="small" onClick={() => toggleEditMode("skills")}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {user.skills.slice(0, 5).map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          size="small" 
                          sx={{
                            bgcolor: 'rgba(202, 0, 25, 0.08)',
                            color: '#ca0019',
                            borderColor: 'rgba(202, 0, 25, 0.3)'
                          }}
                          variant="outlined"
                        />
                      ))}
                      {user.skills.length > 5 && (
                        <Chip 
                          label={`+${user.skills.length - 5} more`} 
                          size="small" 
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 0, borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 500,
                transition: "0.3s",
                "&.Mui-selected": {
                  color: "#ca0019",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ca0019",
              },
            }}
          >
            <Tab icon={<BarChartIcon />} iconPosition="start" label="Statistics" {...a11yProps(0)} />
            <Tab icon={<EmojiEventsIcon />} iconPosition="start" label="Achievements" {...a11yProps(1)} />
            <Tab icon={<BookmarkIcon />} iconPosition="start" label="Bio" {...a11yProps(2)} />
            <Tab icon={<AssignmentIcon />} iconPosition="start" label="Certifications" {...a11yProps(3)} />
            <Tab icon={<CodeIcon />} iconPosition="start" label="Projects" {...a11yProps(4)} />
            <Tab icon={<WorkIcon />} iconPosition="start" label="Internships" {...a11yProps(5)} />
            <Tab icon={<EventIcon />} iconPosition="start" label="Events" {...a11yProps(6)} />
          </Tabs>
        </Box>
        
        {/* Statistics Tab */}
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={4}>
            {/* Academic Performance */}
            <Grid item xs={12} md={7}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ color: '#ca0019', mr: 1 }} />
                    <Typography variant="h6">Academic Performance</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => openSemesterDialog()}
                    sx={{
                      borderColor: '#ca0019',
                      color: '#ca0019',
                      '&:hover': {
                        borderColor: '#a30014',
                        backgroundColor: 'rgba(202, 0, 25, 0.04)'
                      }
                    }}
                  >
                    Add Semester
                  </Button>
                </Box>

                {/* SGPA Chart */}
                {user.semesterSGPA && user.semesterSGPA.length > 0 ? (
                  <Box sx={{ height: 300, mb: 3, bgcolor: 'white', p: 2, borderRadius: 2, border: '1px solid #f0f0f0' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prepareSemesterData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <RechartsTooltip formatter={(value) => [`${value} SGPA`, 'Performance']} />
                        <Legend />
                        <Bar dataKey="sgpa" name="SGPA" fill="#ca0019" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    No semester data available to display chart
                  </Typography>
                )}

                {/* Semester-wise SGPA */}
                <Typography variant="subtitle1" gutterBottom>
                  Semester Performance
                </Typography>

                {user.semesterSGPA && user.semesterSGPA.length > 0 ? (
                  <Grid container spacing={2}>
                    {user.semesterSGPA
                      .sort((a, b) => a.semester - b.semester)
                      .map((sem, index) => (
                        <Grid item xs={12} sm={6} md={4} key={sem.semester}>
                          <Paper 
                            elevation={1} 
                            sx={{ 
                              p: 2, 
                              borderRadius: 2, 
                              position: 'relative',
                              borderLeft: `4px solid #ca0019`,
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                              }
                            }}
                          >
                            <IconButton
                              size="small"
                              sx={{ position: 'absolute', top: 1, right: -5 }}
                              onClick={(e) => handleMenuOpen(e, "semester", index)}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2">Semester {sem.semester}</Typography>
                              <Chip
                                label={sem.sgpa.toFixed(2)}
                                size="small"
                                sx={{ bgcolor: '#ca0019', color: 'white' }}
                              />
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(sem.sgpa / 10) * 100}
                              sx={{
                                height: 8,
                                borderRadius: 5,
                                backgroundColor: "rgba(0,0,0,0.05)",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: "#ca0019",
                                },
                              }}
                            />
                          </Paper>
                        </Grid>
                      ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No semester data available
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Skills & Supplementary */}
            <Grid item xs={12} md={5}>
              {/* Skills Distribution */}
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4, bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Skills Distribution</Typography>
                  <IconButton size="small" onClick={() => toggleEditMode("skills")}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>

                {user.skills && user.skills.length > 0 ? (
                  <Box sx={{ height: 250, display: 'flex', justifyContent: 'center', bgcolor: 'white', p: 2, borderRadius: 2, border: '1px solid #f0f0f0' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareSkillsData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name }) => name}
                        >
                          {prepareSkillsData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value, name) => [`${value} skills`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                    <Typography variant="body2" color="text.secondary">
                      No skills data available
                    </Typography>
                  </Box>
                )}

                {editMode.skills ? (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        size="small"
                        placeholder="Add a skill"
                        fullWidth
                      />
                      <Button 
                        variant="contained" 
                        onClick={addSkill} 
                        size="small"
                        sx={{
                          bgcolor: '#ca0019',
                          '&:hover': {
                            bgcolor: '#a30014'
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {editedUser.skills &&
                        editedUser.skills.map((skill, index) => (
                          <Chip 
                            key={index} 
                            label={skill} 
                            onDelete={() => removeSkill(index)} 
                            size="small"
                            sx={{
                              bgcolor: 'rgba(202, 0, 25, 0.08)',
                              color: '#ca0019',
                              borderColor: 'rgba(202, 0, 25, 0.3)'
                            }}
                          />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => saveProfileChanges("skills")}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                        sx={{
                          bgcolor: '#ca0019',
                          '&:hover': {
                            bgcolor: '#a30014'
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => toggleEditMode("skills")}
                        startIcon={<CancelIcon />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : null}
              </Paper>

              {/* Bio Section */}
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4, bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Bio</Typography>
                  {!editMode.bio && (
                    <IconButton size="small" onClick={() => toggleEditMode("bio")}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                {editMode.bio ? (
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      name="bio"
                      value={editedUser.bio || ""}
                      onChange={handleProfileInputChange}
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Tell us about yourself"
                      variant="outlined"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => saveProfileChanges("bio")}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                        sx={{
                          bgcolor: '#ca0019',
                          '&:hover': {
                            bgcolor: '#a30014'
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => toggleEditMode("bio")}
                        startIcon={<CancelIcon />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color={user.bio ? "text.primary" : "text.secondary"} sx={{ mt: 1 }}>
                    {user.bio || "No bio available"}
                  </Typography>
                )}
              </Paper>

              {/* Supplementary Information */}
              {user.semesterSupplementary && user.semesterSupplementary.length > 0 && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2, bgcolor: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ErrorIcon sx={{ color: '#ca0019', mr: 1 }} />
                    <Typography variant="h6">Supplementary Exams</Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    {user.semesterSupplementary.map((sem) => (
                      <Box key={sem.semester} sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Semester {sem.semester}
                        </Typography>

                        {sem.subjects.length > 0 ? (
                          <Grid container spacing={1}>
                            {sem.subjects.map((subject, idx) => (
                              <Grid item xs={12} key={idx}>
                                <Paper 
                                  variant="outlined" 
                                  sx={{ 
                                    p: 1.5, 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderLeft: `3px solid ${
                                      subject.status === 'passed' 
                                        ? '#4caf50' 
                                        : subject.status === 'failed'
                                          ? '#ca0019'
                                          : '#ff9800'
                                    }`
                                  }}
                                >
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">
                                      {subject.subjectName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {subject.subjectCode}
                                    </Typography>
                                  </Box>
                                  <Chip
                                    label={subject.status.toUpperCase()}
                                    size="small"
                                    color={
                                      subject.status === "passed"
                                        ? "success"
                                        : subject.status === "failed"
                                          ? "error"
                                          : "warning"
                                    }
                                  />
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No supplementary subjects
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </CustomTabPanel>
        
        {/* Achievements Tab */}
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Achievements</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => openAchievementDialog()}
              sx={{
                bgcolor: '#ca0019',
                '&:hover': {
                  bgcolor: '#a30014'
                }
              }}
            >
              Add Achievement
            </Button>
          </Box>
          
          {user.achievements && user.achievements.length > 0 ? (
            <Grid container spacing={3}>
              {user.achievements.map((achievement, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      },
                      bgcolor: 'white'
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <IconButton
                        size="small"
                        sx={{ position: 'absolute', top: -8, right: -8 }}
                        onClick={(e) => handleMenuOpen(e, "achievement", idx)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'rgba(202, 0, 25, 0.1)',
                            color: '#ca0019',
                            width: 50,
                            height: 50
                          }}
                        >
                          <Award />
                        </Avatar>
                        
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {achievement.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {achievement.description}
                          </Typography>
                          {achievement.date && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarMonthIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                              {formatDate(achievement.date)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'white'
              }}
            >
              <Typography variant="body1" color="text.secondary" paragraph>
                No achievements added yet
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => openAchievementDialog()}
                sx={{
                  borderColor: '#ca0019',
                  color: '#ca0019',
                  '&:hover': {
                    borderColor: '#a30014',
                    backgroundColor: 'rgba(202, 0, 25, 0.04)'
                  }
                }}
              >
                Add Your First Achievement
              </Button>
            </Paper>
          )}
        </CustomTabPanel>
        
        {/* Bio Tab */}
        <CustomTabPanel value={value} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">About Me</Typography>
            {!editMode.bio && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => toggleEditMode("bio")}
                sx={{
                  borderColor: '#ca0019',
                  color: '#ca0019',
                  '&:hover': {
                    borderColor: '#a30014',
                    backgroundColor: 'rgba(202, 0, 25, 0.04)'
                  }
                }}
              >
                Edit Bio
              </Button>
            )}
          </Box>
          
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              bgcolor: 'white'
            }}
          >
            {editMode.bio ? (
              <Box>
                <TextField
                  name="bio"
                  value={editedUser.bio || ""}
                  onChange={handleProfileInputChange}
                  multiline
                  rows={6}
                  fullWidth
                  placeholder="Tell us about yourself, your interests, goals, and aspirations..."
                  variant="outlined"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => saveProfileChanges("bio")}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    sx={{
                      bgcolor: '#ca0019',
                      '&:hover': {
                        bgcolor: '#a30014'
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => toggleEditMode("bio")}
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                {user.bio ? (
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {user.bio}
                  </Typography>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      No bio information available
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => toggleEditMode("bio")}
                      sx={{
                        borderColor: '#ca0019',
                        color: '#ca0019',
                        '&:hover': {
                          borderColor: '#a30014',
                          backgroundColor: 'rgba(202, 0, 25, 0.04)'
                        }
                      }}
                    >
                      Add Bio
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Paper>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Skills</Typography>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                bgcolor: 'white'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">My Skills</Typography>
                {!editMode.skills && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => toggleEditMode("skills")}
                    sx={{
                      borderColor: '#ca0019',
                      color: '#ca0019',
                      '&:hover': {
                        borderColor: '#a30014',
                        backgroundColor: 'rgba(202, 0, 25, 0.04)'
                      }
                    }}
                  >
                    Edit Skills
                  </Button>
                )}
              </Box>
              
              {editMode.skills ? (
                <Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      size="small"
                      placeholder="Add a skill"
                      fullWidth
                    />
                    <Button 
                      variant="contained" 
                      onClick={addSkill} 
                      sx={{
                        bgcolor: '#ca0019',
                        '&:hover': {
                          bgcolor: '#a30014'
                        }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
                    {editedUser.skills &&
                      editedUser.skills.map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          onDelete={() => removeSkill(index)} 
                          sx={{
                            bgcolor: 'rgba(202, 0, 25, 0.08)',
                            color: '#ca0019',
                            borderColor: 'rgba(202, 0, 25, 0.3)'
                          }}
                        />
                      ))}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => saveProfileChanges("skills")}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      sx={{
                        bgcolor: '#ca0019',
                        '&:hover': {
                          bgcolor: '#a30014'
                        }
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => toggleEditMode("skills")}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  {user.skills && user.skills.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {user.skills.map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          sx={{
                            bgcolor: 'rgba(202, 0, 25, 0.08)',
                            color: '#ca0019',
                            borderColor: 'rgba(202, 0, 25, 0.3)'
                          }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No skills added yet
                    </Typography>
                  )}
                </>
              )}
            </Paper>
          </Box>
        </CustomTabPanel>
        
        {/* Certifications Tab */}
        <CustomTabPanel value={value} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Certifications</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => openCertificationDialog()}
              sx={{
                bgcolor: '#ca0019',
                '&:hover': {
                  bgcolor: '#a30014'
                }
              }}
            >
              Add Certification
            </Button>
          </Box>
          
          {user.certifications && user.certifications.length > 0 ? (
            <Grid container spacing={3}>
              {user.certifications.map((certificate, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card 
                    elevation={2} 
                      md={4} key={idx}/>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      },
                      bgcolor: 'white'
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <IconButton
                        size="small"
                        sx={{ 
                          position: 'absolute', 
                          top: 8, 
                          right: 8, 
                          zIndex: 2,
                          bgcolor: 'rgba(255,255,255,0.8)',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.9)'
                          }
                        }}
                        onClick={(e) => handleMenuOpen(e, "certification", idx)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      
                      <CardMedia
                        component="iframe"
                        src={`https://drive.google.com/file/d/${certificate.fileId}/preview`}
                        sx={{ 
                          height: 180,
                          border: 'none'
                        }}
                        title={certificate.fileName}
                      />
                    </Box>
                    
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        {certificate.fileName || `Certificate ${idx + 1}`}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {certificate.createdAt ? formatDate(certificate.createdAt) : "Date not available"}
                        </Typography>
                        
                        {certificate.fileUrl && (
                          <Button
                            component="a"
                            href={certificate.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            endIcon={<ArrowUpRight size={14} />}
                            sx={{ color: '#ca0019' }}
                          >
                            View
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'white'
              }}
            >
              <Typography variant="body1" color="text.secondary" paragraph>
                No certifications added yet
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => openCertificationDialog()}
                sx={{
                  borderColor: '#ca0019',
                  color: '#ca0019',
                  '&:hover': {
                    borderColor: '#a30014',
                    backgroundColor: 'rgba(202, 0, 25, 0.04)'
                  }
                }}
              >
                Add Your First Certification
              </Button>
            </Paper>
          )}
        </CustomTabPanel>
        
        {/* Projects Tab */}
        <CustomTabPanel value={value} index={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Projects</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => openProjectDialog()}
              sx={{
                bgcolor: '#ca0019',
                '&:hover': {
                  bgcolor: '#a30014'
                }
              }}
            >
              Add Project
            </Button>
          </Box>
          
          {user.projects && user.projects.length > 0 ? (
            <Grid container spacing={3}>
              {user.projects.map((project, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      },
                      bgcolor: 'white'
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <IconButton
                        size="small"
                        sx={{ 
                          position: 'absolute', 
                          top: 8, 
                          right: 8, 
                          zIndex: 2,
                          bgcolor: 'rgba(255,255,255,0.8)',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.9)'
                          }
                        }}
                        onClick={(e) => handleMenuOpen(e, "project", idx)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      
                      {project.imageUrl && (
                        <CardMedia
                          component="img"
                          height="180"
                          image={project.imageUrl || "/placeholder.svg"}
                          alt={project.title}
                        />
                      )}
                    </Box>
                    
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {project.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {project.technologies &&
                          project.technologies.map((tech, index) => (
                            <Chip 
                              key={index} 
                              label={tech} 
                              size="small" 
                              sx={{
                                bgcolor: 'rgba(202, 0, 25, 0.08)',
                                color: '#ca0019',
                                borderColor: 'rgba(202, 0, 25, 0.3)'
                              }}
                            />
                          ))}
                      </Box>
                      
                      {project.link && (
                        <Button
                          component="a"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          startIcon={<LanguageIcon />}
                          endIcon={<ArrowUpRight size={14} />}
                          sx={{ color: '#ca0019' }}
                        >
                          View Project
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'white'
              }}
            >
              <Typography variant="body1" color="text.secondary" paragraph>
                No projects added yet
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => openProjectDialog()}
                sx={{
                  borderColor: '#ca0019',
                  color: '#ca0019',
                  '&:hover': {
                    borderColor: '#a30014',
                    backgroundColor: 'rgba(202, 0, 25, 0.04)'
                  }
                }}
              >
                Add Your First Project
              </Button>
            </Paper>
          )}
        </CustomTabPanel>
        
        {/* Internships Tab */}
        <CustomTabPanel value={value} index={5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Internships</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => openInternshipDialog()}
              sx={{
                bgcolor: '#ca0019',
                '&:hover': {
                  bgcolor: '#a30014'
                }
              }}
            >
              Add Internship
            </Button>
          </Box>
          
          {user.internships && user.internships.length > 0 ? (
            <Grid container spacing={3}>
              {user.internships.map((internship, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      height: '100%',
                      position: 'relative',
                      bgcolor: 'white',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={(e) => handleMenuOpen(e, "internship", idx)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'rgba(202, 0, 25, 0.1)',
                          color: '#ca0019',
                          width: 50,
                          height: 50
                        }}
                      >
                        <Briefcase />
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 1 }}>
                          <Typography variant="h6">
                            {internship.title}
                          </Typography>
                          <Chip
                            label={internship.type || "Internship"}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(202, 0, 25, 0.08)',
                              color: '#ca0019'
                            }}
                          />
                        </Box>
                        
                        <Typography variant="subtitle1" color="#ca0019" gutterBottom>
                          {internship.company}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {internship.startDate} - {internship.endDate || "Present"}
                        </Typography>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="body2" paragraph>
                          {internship.description}
                        </Typography>
                        
                        {internship.skills && internship.skills.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" color="text.secondary" gutterBottom>
                              Skills Used:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                              {internship.skills.map((skill, index) => (
                                <Chip
                                  key={index}
                                  label={skill}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    bgcolor: 'rgba(202, 0, 25, 0.08)',
                                    color: '#ca0019',
                                    borderColor: 'rgba(202, 0, 25, 0.3)'
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'white'
              }}
            >
              <Typography variant="body1" color="text.secondary" paragraph>
                No internships added yet
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => openInternshipDialog()}
                sx={{
                  borderColor: '#ca0019',
                  color: '#ca0019',
                  '&:hover': {
                    borderColor: '#a30014',
                    backgroundColor: 'rgba(202, 0, 25, 0.04)'
                  }
                }}
              >
                Add Your First Internship
              </Button>
            </Paper>
          )}
        </CustomTabPanel>
        
        {/* Events Tab */}
        <CustomTabPanel value={value} index={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EventAvailableIcon sx={{ color: '#ca0019', mr: 1 }} />
              <Typography variant="h6">Event Participation</Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => openEventDialog()}
              sx={{
                bgcolor: '#ca0019',
                '&:hover': {
                  bgcolor: '#a30014'
                }
              }}
            >
              Add Event
            </Button>
          </Box>
          
          {user.event_participation && user.event_participation.length > 0 ? (
            <Grid container spacing={3}>
              {user.event_participation.map((event, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      height: '100%',
                      position: 'relative',
                      borderTop: `4px solid #ca0019`,
                      bgcolor: 'white',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={(e) => handleMenuOpen(e, "event", idx)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6">
                        {event.eventName || "Event Title"}
                      </Typography>
                      <Chip
                        label={event.eventStatus || "Participated"}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(202, 0, 25, 0.08)',
                          color: '#ca0019'
                        }}
                      />
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        color: 'text.secondary'
                      }}
                    >
                      <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {event.eventDate || "Event date"}
                    </Typography>
                    
                    {event.eventContributionType && event.eventContributionType.length > 0 && (
                      <Box>
                        <Typography variant="caption" color="text.secondary" gutterBottom>
                          Contribution as:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {event.eventContributionType.map((role, i) => (
                            <Chip 
                              key={i} 
                              label={role} 
                              size="small" 
                              variant="outlined"
                              sx={{
                                bgcolor: 'rgba(202, 0, 25, 0.08)',
                                color: '#ca0019',
                                borderColor: 'rgba(202, 0, 25, 0.3)'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'white'
              }}
            >
              <Typography variant="body1" color="text.secondary" paragraph>
                No event participation records found
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => openEventDialog()}
                sx={{
                  borderColor: '#ca0019',
                  color: '#ca0019',
                  '&:hover': {
                    borderColor: '#a30014',
                    backgroundColor: 'rgba(202, 0, 25, 0.04)'
                  }
                }}
              >
                Add Your First Event
              </Button>
            </Paper>
          )}
        </CustomTabPanel>
      </Paper>

      {/* Fine Modal */}
      <Dialog open={fineModalOpen} onClose={handleCloseFineModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ borderBottom: "1px solid #eee", fontWeight: 500 }}>
          Impose Fine on {user.fullName}
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Member Details
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={`https://drive.google.com/uc?id=${user?.profilePic?.fileId}`} 
                    alt={user.fullName} 
                    sx={{ width: 40, height: 40 }} 
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {user.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.admno} • {user.batch}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>

            <TextField
              label="Fine Amount (₹)"
              type="number"
              value={fineAmount}
              onChange={(e) => setFineAmount(e.target.value)}
              fullWidth
              variant="outlined"
              required
              inputProps={{ min: 1 }}
              placeholder="Enter amount in rupees"
            />

            <TextField
              label="Reason for Fine"
              value={fineReason}
              onChange={(e) => setFineReason(e.target.value)}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              required
              placeholder="Provide a clear reason for imposing this fine"
            />

            {Number.parseInt(user.fineStatus) > 0 && (
              <Alert severity="warning">
                This member already has an outstanding fine of ₹{user.fineStatus}. The new fine will be added to this
                amount.
              </Alert>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseFineModal} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleImposeFine}
            disabled={loading}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Processing..." : "Impose Fine"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Picture Dialog */}
      <Dialog open={profilePictureDialogOpen} onClose={() => setProfilePictureDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Avatar
              src={profilePicture ? URL.createObjectURL(profilePicture) : `https://drive.google.com/uc?id=${user?.profilePic?.fileId}`}
              alt={user.fullName}
              sx={{ 
                width: 150, 
                height: 150, 
                mb: 2,
                border: '4px solid #f5f5f5',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            />
            
            <Paper variant="outlined" sx={{ p: 3, borderStyle: 'dashed', width: '100%', textAlign: 'center' }}>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: "none" }}
                ref={profilePictureInputRef}
              />
              <label htmlFor="profile-picture">
                <Button 
                  variant="outlined" 
                  component="span" 
                  startIcon={<UploadIcon />} 
                  fullWidth
                  sx={{
                    borderColor: '#ca0019',
                    color: '#ca0019',
                    '&:hover': {
                      borderColor: '#a30014',
                      backgroundColor: 'rgba(202, 0, 25, 0.04)'
                    }
                  }}
                >
                  {profilePicture ? "Change Image" : "Upload Profile Picture"}
                </Button>
              </label>
              {profilePicture && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Selected image: {profilePicture.name}
                </Typography>
              )}
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfilePictureDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={uploadProfilePicture}
            disabled={loading || !profilePicture}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
          >
            {loading ? "Uploading..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Achievement Dialog */}
      <Dialog open={achievementDialogOpen} onClose={() => setAchievementDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{achievementEditIndex >= 0 ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Title"
              name="title"
              value={currentAchievement.title}
              onChange={handleAchievementInputChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={currentAchievement.description}
              onChange={handleAchievementInputChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={currentAchievement.date}
              onChange={handleAchievementInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAchievementDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveAchievement}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certification Dialog */}
      <Dialog open={certificationDialogOpen} onClose={() => setCertificationDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{certificationEditIndex >= 0 ? "Edit Certification" : "Add Certification"}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Certificate Name"
              name="fileName"
              value={currentCertification.fileName}
              onChange={handleCertificationInputChange}
              fullWidth
              required
            />
            <Paper variant="outlined" sx={{ p: 3, borderStyle: 'dashed' }}>
              <input
                type="file"
                id="certification-file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleCertificationFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="certification-file">
                <Button 
                  variant="outlined" 
                  component="span" 
                  startIcon={<FileUploadIcon />} 
                  fullWidth
                  sx={{
                    borderColor: '#ca0019',
                    color: '#ca0019',
                    '&:hover': {
                      borderColor: '#a30014',
                      backgroundColor: 'rgba(202, 0, 25, 0.04)'
                    }
                  }}
                >
                  {certificationFile ? certificationFile.name : "Upload Certificate"}
                </Button>
              </label>
              {certificationFile && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Selected file: {certificationFile.name}
                </Typography>
              )}
              {certificationEditIndex >= 0 && !certificationFile && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Current file will be kept if no new file is uploaded
                </Typography>
              )}
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertificationDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveCertification}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{projectEditIndex >= 0 ? "Edit Project" : "Add Project"}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Project Title"
              name="title"
              value={currentProject.title}
              onChange={handleProjectInputChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={currentProject.description}
              onChange={handleProjectInputChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Project Link"
              name="link"
              value={currentProject.link}
              onChange={handleProjectInputChange}
              fullWidth
              placeholder="https://github.com/username/project"
            />

            <Paper variant="outlined" sx={{ p: 3, borderStyle: 'dashed' }}>
              <input
                type="file"
                id="project-image"
                accept="image/*"
                onChange={handleProjectImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="project-image">
                <Button 
                  variant="outlined" 
                  component="span" 
                  startIcon={<UploadIcon />} 
                  fullWidth
                  sx={{
                    borderColor: '#ca0019',
                    color: '#ca0019',
                    '&:hover': {
                      borderColor: '#a30014',
                      backgroundColor: 'rgba(202, 0, 25, 0.04)'
                    }
                  }}
                >
                  {projectImage ? projectImage.name : "Upload Project Image"}
                </Button>
              </label>
              {projectImage && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Selected image: {projectImage.name}
                </Typography>
              )}
              {projectEditIndex >= 0 && !projectImage && currentProject.imageUrl && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current image:
                  </Typography>
                  <img
                    src={currentProject.imageUrl || "/placeholder.svg"}
                    alt="Current project"
                    style={{ height: 80, objectFit: 'cover', borderRadius: 4 }}
                  />
                </Box>
              )}
            </Paper>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Technologies Used
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  value={projectTechInput}
                  onChange={(e) => setProjectTechInput(e.target.value)}
                  size="small"
                  placeholder="Add a technology"
                  fullWidth
                />
                <Button 
                  variant="contained" 
                  onClick={addProjectTechnology}
                  sx={{
                    bgcolor: '#ca0019',
                    '&:hover': {
                      bgcolor: '#a30014'
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {currentProject.technologies &&
                  currentProject.technologies.map((tech, index) => (
                    <Chip 
                      key={index} 
                      label={tech} 
                      onDelete={() => removeProjectTechnology(index)} 
                      size="small"
                      sx={{
                        bgcolor: 'rgba(202, 0, 25, 0.08)',
                        color: '#ca0019',
                        borderColor: 'rgba(202, 0, 25, 0.3)'
                      }}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveProject}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Internship Dialog */}
      <Dialog open={internshipDialogOpen} onClose={() => setInternshipDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{internshipEditIndex >= 0 ? "Edit Internship" : "Add Internship"}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Position/Title"
                  name="title"
                  value={currentInternship.title}
                  onChange={handleInternshipInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company"
                  name="company"
                  value={currentInternship.company}
                  onChange={handleInternshipInputChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={currentInternship.type || ""}
                label="Type"
                onChange={handleInternshipInputChange}
              >
                <MenuItem value="On-site">On-site</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
              <FormHelperText>Select internship type</FormHelperText>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={currentInternship.startDate}
                  onChange={handleInternshipInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch checked={currentlyWorking} onChange={(e) => setCurrentlyWorking(e.target.checked)} />
                    }
                    label="Currently Working"
                  />

                  {!currentlyWorking && (
                    <TextField
                      label="End Date"
                      name="endDate"
                      type="date"
                      value={currentInternship.endDate}
                      onChange={handleInternshipInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>

            <TextField
              label="Description"
              name="description"
              value={currentInternship.description}
              onChange={handleInternshipInputChange}
              fullWidth
              multiline
              rows={3}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Skills Used
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  value={internshipSkillInput}
                  onChange={(e) => setInternshipSkillInput(e.target.value)}
                  size="small"
                  placeholder="Add a skill"
                  fullWidth
                />
                <Button 
                  variant="contained" 
                  onClick={addInternshipSkill}
                  sx={{
                    bgcolor: '#ca0019',
                    '&:hover': {
                      bgcolor: '#a30014'
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {currentInternship.skills &&
                  currentInternship.skills.map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill} 
                      onDelete={() => removeInternshipSkill(index)} 
                      size="small"
                      sx={{
                        bgcolor: 'rgba(202, 0, 25, 0.08)',
                        color: '#ca0019',
                        borderColor: 'rgba(202, 0, 25, 0.3)'
                      }}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInternshipDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveInternship}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Event Dialog */}
      <Dialog open={eventDialogOpen} onClose={() => setEventDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{eventEditIndex >= 0 ? "Edit Event" : "Add Event"}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Event Name"
              name="eventName"
              value={currentEvent.eventName}
              onChange={handleEventInputChange}
              fullWidth
              required
            />

            <TextField
              label="Event Date"
              name="eventDate"
              type="date"
              value={currentEvent.eventDate}
              onChange={handleEventInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth>
              <InputLabel>Event Status</InputLabel>
              <Select
                name="eventStatus"
                value={currentEvent.eventStatus || "completed"}
                label="Event Status"
                onChange={handleEventInputChange}
              >
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Contribution Types
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  value={eventContributionInput}
                  onChange={(e) => setEventContributionInput(e.target.value)}
                  size="small"
                  placeholder="Add a contribution type"
                  fullWidth
                />
                <Button 
                  variant="contained" 
                  onClick={addEventContribution}
                  sx={{
                    bgcolor: '#ca0019',
                    '&:hover': {
                      bgcolor: '#a30014'
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {currentEvent.eventContributionType &&
                  currentEvent.eventContributionType.map((contribution, index) => (
                    <Chip
                      key={index}
                      label={contribution}
                      onDelete={() => removeEventContribution(index)}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(202, 0, 25, 0.08)',
                        color: '#ca0019',
                        borderColor: 'rgba(202, 0, 25, 0.3)'
                      }}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEventDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveEvent}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Semester Dialog */}
      <Dialog open={semesterDialogOpen} onClose={() => setSemesterDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{semesterEditIndex >= 0 ? "Edit Semester" : "Add Semester"}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Semester</InputLabel>
              <Select
                name="semester"
                value={currentSemester.semester || ""}
                label="Semester"
                onChange={handleSemesterInputChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    Semester {sem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="SGPA"
              name="sgpa"
              type="number"
              value={currentSemester.sgpa}
              onChange={handleSemesterInputChange}
              fullWidth
              required
              inputProps={{
                min: 0,
                max: 10,
                step: 0.01,
              }}
              helperText="Enter SGPA between 0-10"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSemesterDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveSemester}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              color: "white",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Item Action Menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleMenuAction("edit")}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction("delete")}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Index