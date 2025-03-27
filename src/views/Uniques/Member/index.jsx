"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Box,
  Typography,
  Chip,
  IconButton,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import {
	Edit as EditIcon,
	GitHub as GitHubIcon,
	LinkedIn as LinkedInIcon,
	Twitter as TwitterIcon,
	WhatsApp as WhatsAppIcon,
	Email as EmailIcon,
	Phone as PhoneIcon,
	LocationOn as LocationOnIcon,
	Bookmark as BookmarkIcon,
	Add as AddIcon,
	Delete as DeleteIcon,
	Upload as UploadIcon,
	Close as CloseIcon,
	NorthEast as ArrowUpRightIcon, // Replacement for ArrowUpRight
	EmojiEvents as AwardIcon, // Replacement for Award
	School,
	MenuBook as BookOpenIcon, // Replacement for BookOpen
	Business as BriefcaseIcon, // Ensure Briefcase is imported correctly
	Tag as TagIcon,
  } from "@mui/icons-material";
  
  
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react";
// Custom Tab Panel component
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

function a11yProps(index) {
  return {
	id: `simple-tab-${index}`,
	"aria-controls": `simple-tabpanel-${index}`,
  }
}

const index = ({ memberId }) => {
  // State for member data
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Tab state
  const [value, setValue] = useState(0)

  // Edit states
  const [isEditing, setIsEditing] = useState(false)
  const [editSection, setEditSection] = useState("")
  const [formData, setFormData] = useState({})

  // File upload states
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  // Alert state
  const [alert, setAlert] = useState({
	open: false,
	message: "",
	severity: "success",
  })

  // New item states
  const [newSkill, setNewSkill] = useState("")
  const [newAchievement, setNewAchievement] = useState({
	title: "",
	description: "",
	date: "",
	color: "bg-primary",
  })
  const [newCertification, setNewCertification] = useState({
	title: "",
	issuer: "",
	date: "",
	imageUrl: "",
  })
  const [newProject, setNewProject] = useState({
	title: "",
	description: "",
	technologies: [],
	link: "",
	githubUrl: "",
	imageUrl: "",
  })
  const [newTechnology, setNewTechnology] = useState("")

  // Fetch member data
  const fetchMemberData = async () => {
	try {
	  setLoading(true)
	  const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
	  if (!token || !email) {
		throw new Error("Authentication token is missing. Please log in again.");
	  }
  
	  const response = await axios.get(
		"http://localhost:5000/api/member/getProfile",
		{ email }, // Send the email in the request body
		{
		  headers: {
			Authorization: `Bearer ${token}`, // Include the token in the Authorization header
		  },
		}
	  );
  

	  if (response.data.success) {
		setMember(response.data.data)
		setFormData(response.data.data)
		setError(null); 
	  } else {
		throw new Error(response.data.message || "Failed to fetch member data")
	  }

	  setError(null)
	} catch (err) {
		console.error("Error fetching member data:", err);
	
		// Handle missing token error
		if (err.message === "Authentication token is missing. Please log in again.") {
		  setError(err.message);
		  // Optionally, redirect to login page
		  // window.location.href = "/login";
		} else {
		  setError(
			err.response?.data?.message || "Failed to load member data. Please try again."
		  );
		}
	  } finally {
		setLoading(false); // Stop the loading spinner
	  }
  }

  // Handle tab change
  const handleTabChange = (event, newValue) => {
	setValue(newValue)
  }

  // Handle edit button click
  const handleEdit = (section) => {
	setEditSection(section)

	// Reset form data based on current member data
	if (section === "profile") {
	  setFormData({
		fullName: member.fullName || "",
		batch: member.batch || "",
		course: member.course || "",
		admno: member.admno || "",
		isPlaced: member.isPlaced || false,
	  })
	} else if (section === "bio") {
	  setFormData({
		bio: member.bio || "",
	  })
	} else if (section === "contact") {
	  setFormData({
		email: member.email || "",
		contact: member.contact || "",
		address: member.address || "",
		city: member.city || "",
		state: member.state || "",
	  })
	} else if (section === "social") {
	  setFormData({
		githubProfile: member.githubProfile || "",
		linkedinProfile: member.linkedinProfile || "",
		twitterProfile: member.twitterProfile || "",
		whatsappContact: member.whatsappContact || "",
	  })
	} else if (section === "skills") {
	  setFormData({
		skills: [...(member.skills || [])],
	  })
	  setNewSkill("")
	}

	setIsEditing(true)
  }

  // Handle add new item
  const handleAddItem = (section) => {
	setEditSection(`add-${section}`)

	if (section === "achievement") {
	  setNewAchievement({
		title: "",
		description: "",
		date: "",
		color: "bg-primary",
	  })
	} else if (section === "certification") {
	  setNewCertification({
		title: "",
		issuer: "",
		date: "",
		imageUrl: "",
	  })
	  setUploadedFile(null)
	} else if (section === "project") {
	  setNewProject({
		title: "",
		description: "",
		technologies: [],
		link: "",
		githubUrl: "",
		imageUrl: "",
	  })
	  setNewTechnology("")
	  setUploadedFile(null)
	}

	setIsEditing(true)
  }

  // Handle form input change
  const handleInputChange = (e) => {
	const { name, value, type, checked } = e.target

	setFormData((prev) => ({
	  ...prev,
	  [name]: type === "checkbox" ? checked : value,
	}))
  }

  // Handle achievement form change
  const handleAchievementChange = (e) => {
	const { name, value } = e.target

	setNewAchievement((prev) => ({
	  ...prev,
	  [name]: value,
	}))
  }

  // Handle certification form change
  const handleCertificationChange = (e) => {
	const { name, value } = e.target

	setNewCertification((prev) => ({
	  ...prev,
	  [name]: value,
	}))
  }

  // Handle project form change
  const handleProjectChange = (e) => {
	const { name, value } = e.target

	setNewProject((prev) => ({
	  ...prev,
	  [name]: value,
	}))
  }

  // Handle skill operations
  const addSkill = () => {
	if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
	  setFormData((prev) => ({
		...prev,
		skills: [...prev.skills, newSkill.trim()],
	  }))
	  setNewSkill("")
	}
  }

  const removeSkill = (skillToRemove) => {
	setFormData((prev) => ({
	  ...prev,
	  skills: prev.skills.filter((skill) => skill !== skillToRemove),
	}))
  }

  // Handle technology operations
  const addTechnology = () => {
	if (newTechnology.trim() && !newProject.technologies.includes(newTechnology.trim())) {
	  setNewProject((prev) => ({
		...prev,
		technologies: [...prev.technologies, newTechnology.trim()],
	  }))
	  setNewTechnology("")
	}
  }

  const removeTechnology = (techToRemove) => {
	setNewProject((prev) => ({
	  ...prev,
	  technologies: prev.technologies.filter((tech) => tech !== techToRemove),
	}))
  }

  // Handle file upload
  const handleFileSelect = (e) => {
	if (e.target.files.length > 0) {
	  setUploadedFile(e.target.files[0])
	}
  }

  const uploadFile = async () => {
	if (!uploadedFile) return null

	try {
	  const formData = new FormData()
	  formData.append("file", uploadedFile)

	  const response = await axios.post("http://localhost:5000/api/upload", formData, {
		headers: {
		  "Content-Type": "multipart/form-data",
		},
		onUploadProgress: (progressEvent) => {
		  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
		  setUploadProgress(percentCompleted)
		},
	  })

	  if (response.data.success) {
		setAlert({
		  open: true,
		  message: "File uploaded successfully!",
		  severity: "success",
		})

		return response.data.fileUrl
	  } else {
		throw new Error(response.data.message || "Failed to upload file")
	  }
	} catch (err) {
	  console.error("Error uploading file:", err)

	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to upload file. Please try again.",
		severity: "error",
	  })

	  return null
	} finally {
	  setUploadProgress(0)
	}
  }

  // Handle save profile section
  const handleSaveProfile = async () => {
	try {
	  const token = localStorage.getItem("token");
  
	  if (!token) {
		throw new Error("Authentication token is missing. Please log in again.");
	  }
  
	  const response = await axios.put(
		"http://localhost:5000/api/member/update-profile",
		formData, // Send the updated profile data
		{
		  headers: {
			Authorization: `Bearer ${token}`, // Include the token in the Authorization header
		  },
		}
	  );
  
	  if (response.data.success) {
		setMember((prev) => ({
		  ...prev,
		  ...formData,
		}));
  
		setAlert({
		  open: true,
		  message: "Profile updated successfully!",
		  severity: "success",
		});
  
		setIsEditing(false);
	  } else {
		throw new Error(response.data.message || "Failed to update profile");
	  }
	} catch (err) {
	  console.error("Error updating profile:", err);
  
	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to update profile. Please try again.",
		severity: "error",
	  });
	}
  };

  // Handle add achievement
  const handleAddAchievement = async () => {
	try {
	  if (!newAchievement.title || !newAchievement.description) {
		setAlert({
		  open: true,
		  message: "Title and description are required!",
		  severity: "error",
		});
		return;
	  }
  
	  const token = localStorage.getItem("token");
  
	  if (!token) {
		throw new Error("Authentication token is missing. Please log in again.");
	  }
  
	  const response = await axios.post(
		"http://localhost:5000/api/member/achievements",
		newAchievement, // Send the new achievement data
		{
		  headers: {
			Authorization: `Bearer ${token}`, // Include the token in the Authorization header
		  },
		}
	  );
  
	  if (response.data.success) {
		setMember((prev) => ({
		  ...prev,
		  achievements: [...prev.achievements, response.data.data],
		}));
  
		setAlert({
		  open: true,
		  message: "Achievement added successfully!",
		  severity: "success",
		});
  
		setIsEditing(false);
	  } else {
		throw new Error(response.data.message || "Failed to add achievement");
	  }
	} catch (err) {
	  console.error("Error adding achievement:", err);
  
	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to add achievement. Please try again.",
		severity: "error",
	  });
	}
  };

  // Handle add certification
  const handleAddCertification = async () => {
	try {
	  if (!newCertification.title || !newCertification.issuer) {
		setAlert({
		  open: true,
		  message: "Title and issuer are required!",
		  severity: "error",
		});
		return;
	  }
  
	  const token = localStorage.getItem("token");
  
	  if (!token) {
		throw new Error("Authentication token is missing. Please log in again.");
	  }
  
	  const response = await axios.post(
		"http://localhost:5000/api/member/certifications",
		newCertification, // Send the new certification data
		{
		  headers: {
			Authorization: `Bearer ${token}`, // Include the token in the Authorization header
		  },
		}
	  );
  
	  if (response.data.success) {
		setMember((prev) => ({
		  ...prev,
		  certifications: [...prev.certifications, response.data.data],
		}));
  
		setAlert({
		  open: true,
		  message: "Certification added successfully!",
		  severity: "success",
		});
  
		setIsEditing(false);
	  } else {
		throw new Error(response.data.message || "Failed to add certification");
	  }
	} catch (err) {
	  console.error("Error adding certification:", err);
  
	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to add certification. Please try again.",
		severity: "error",
	  });
	}
  };

  // Handle add project
  const handleAddProject = async () => {
	try {
	  if (!newProject.title || !newProject.description) {
		setAlert({
		  open: true,
		  message: "Title and description are required!",
		  severity: "error",
		})
		return
	  }

	  // Upload file if selected
	  let fileUrl = newProject.imageUrl
	  if (uploadedFile) {
		fileUrl = await uploadFile()
		if (!fileUrl) return
	  }

	  const projectData = {
		...newProject,
		imageUrl: fileUrl,
	  }

	  const response = await axios.post(`http://localhost:5000/api/member/projects`, projectData)

	  if (response.data.success) {
		setMember((prev) => ({
		  ...prev,
		  projects: [...prev.projects, response.data.data],
		}))

		setAlert({
		  open: true,
		  message: "Project added successfully!",
		  severity: "success",
		})

		setIsEditing(false)
	  } else {
		throw new Error(response.data.message || "Failed to add project")
	  }
	} catch (err) {
	  console.error("Error adding project:", err)

	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to add project. Please try again.",
		severity: "error",
	  })
	}
  }

  // Handle delete achievement
  const handleDeleteAchievement = async (id) => {
	try {
	  const token = localStorage.getItem("token");
  
	  if (!token) {
		throw new Error("Authentication token is missing. Please log in again.");
	  }
  
	  const response = await axios.delete(
		`http://localhost:5000/api/member/achievements/${id}`,
		{
		  headers: {
			Authorization: `Bearer ${token}`, // Include the token in the Authorization header
		  },
		}
	  );
  
	  if (response.data.success) {
		setMember((prev) => ({
		  ...prev,
		  achievements: prev.achievements.filter((achievement) => achievement.id !== id),
		}));
  
		setAlert({
		  open: true,
		  message: "Achievement deleted successfully!",
		  severity: "success",
		});
	  } else {
		throw new Error(response.data.message || "Failed to delete achievement");
	  }
	} catch (err) {
	  console.error("Error deleting achievement:", err);
  
	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to delete achievement. Please try again.",
		severity: "error",
	  });
	}
  };

  // Handle delete certification
  const handleDeleteCertification = async (id) => {
	try {
	  const response = await axios.delete(`http://localhost:5000/api/member/certifications/${id}`)

	  if (response.data.success) {
		setMember((prev) => ({
		  ...prev,
		  certifications: prev.certifications.filter((certification) => certification.id !== id),
		}))

		setAlert({
		  open: true,
		  message: "Certification deleted successfully!",
		  severity: "success",
		})
	  } else {
		throw new Error(response.data.message || "Failed to delete certification")
	  }
	} catch (err) {
	  console.error("Error deleting certification:", err)

	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to delete certification. Please try again.",
		severity: "error",
	  })
	}
  }

  // Handle delete project
  const handleDeleteProject = async (id) => {
	try {
	  const response = await axios.delete(`http://localhost:5000/api/member/projects/${id}`)

	  if (response.data.success) {
		setMember((prev) => ({
		  ...prev,
		  projects: prev.projects.filter((project) => project.id !== id),
		}))

		setAlert({
		  open: true,
		  message: "Project deleted successfully!",
		  severity: "success",
		})
	  } else {
		throw new Error(response.data.message || "Failed to delete project")
	  }
	} catch (err) {
	  console.error("Error deleting project:", err)

	  setAlert({
		open: true,
		message: err.response?.data?.message || "Failed to delete project. Please try again.",
		severity: "error",
	  })
	}
  }

  // Initialize data on component mount
  useEffect(() => {
	fetchMemberData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId])

  // Render loading state
  if (loading && !member) {
	return (
	  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
		<CircularProgress sx={{ color: "#ca0019" }} />
	  </Box>
	)
  }

  // Render error state
  if (error && !member) {
	return (
	  <Alert severity="error" sx={{ m: 2 }}>
		{error}
	  </Alert>
	)
  }

  // Render member profile
  return (
	<div className="bg-white">
	  {/* Header Section */}
	  <div className="grid xl:grid-cols-4 lg:grid-cols-3 col-span-1 mb-7 gap-x-6 gap-y-5">
		{/* Profile Image and Name */}
		<div className="xl:col-span-1 lg:col-span-1 col-span-1 flex gap-x-5 items-center">
		  <div className="bg-black w-36 h-36 overflow-hidden rounded-full">
			<img
			  src={member?.profilePic || "/placeholder.svg?height=200&width=200"}
			  className="w-full h-full object-center"
			  alt=""
			/>
		  </div>
		  <div>
			<span className="text-xs text-slate-500">//member</span>
			<p className="text-3xl font-medium">{member?.fullName}</p>
			<div className="flex justify-start gap-x-4 mt-3">
			  {member?.githubProfile && (
				<Link to={member.githubProfile || ""}>
				  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
					<div className="w-full h-full flex items-center justify-center">
					  <GitHubIcon fontSize="small" className="text-white" />
					</div>
				  </div>
				</Link>
			  )}
			  {member?.linkedinProfile && (
				<Link to={member.linkedinProfile || ""}>
				  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
					<div className="w-full h-full flex items-center justify-center">
					  <LinkedInIcon fontSize="small" className="text-white" />
					</div>
				  </div>
				</Link>
			  )}
			  {member?.twitterProfile && (
				<Link to={member.twitterProfile || ""}>
				  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
					<div className="w-full h-full flex items-center justify-center">
					  <TwitterIcon fontSize="small" className="text-white" />
					</div>
				  </div>
				</Link>
			  )}
			  {member?.whatsappContact && (
				<Link to={`https://wa.me/${member.whatsappContact}` || ""}>
				  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
					<div className="w-full h-full flex items-center justify-center">
					  <WhatsAppIcon fontSize="small" className="text-white" />
					</div>
				  </div>
				</Link>
			  )}
			  <IconButton
				size="small"
				onClick={() => handleEdit("social")}
				sx={{
				  bgcolor: "#f1f5f9",
				  "&:hover": { bgcolor: "#e2e8f0" },
				}}
			  >
				<EditIcon fontSize="small" />
			  </IconButton>
			</div>
		  </div>
		</div>

		{/* Member Details */}
		<div className="border-l p-5 xl:col-span-2 lg:col-span-1 col-span-1">
		  <div className="flex items-center justify-start gap-x-3 mb-3">
			<School className="text-slate-500" />
			<p className="text-slate-500">
			  <span className="font-medium">Batch:</span> {member?.batch}
			</p>
		  </div>
		  <div className="flex items-center gap-x-3 mb-4">
			<BookOpen className="text-slate-500" />
			<p className="text-slate-500">
			  <span className="font-medium">Course:</span> {member?.course}
			</p>
		  </div>
		  <div className="flex items-center gap-x-3 mb-4">
			<TagIcon className="text-slate-500" />
			<p className="text-slate-500">
			  <span className="font-medium">Admn No:</span> {member?.admno}
			</p>
		  </div>
		  <div className="flex items-center gap-x-3 mb-4">
			<Briefcase className="text-slate-500" />
			<p className="text-slate-500">
			  <span className="font-medium">Placement:</span> {member?.isPlaced === true ? "Placed" : "Not Placed"}
			</p>
		  </div>
		  <div className="flex items-center justify-end gap-x-3 mb-4">
			<Typography variant="body2" className="text-slate-500">
			  <span className="font-medium">Joined on:</span> {new Date(member?.createdAt).toLocaleDateString()}
			</Typography>
		  </div>
		</div>

		{/* Edit Button */}
		<div className="col-span-1">
		  <div className="flex items-center h-full gap-x-3">
			<Button
			  variant="outlined"
			  color="primary"
			  size="medium"
			  startIcon={<EditIcon />}
			  onClick={() => handleEdit("profile")}
			  sx={{
				borderColor: "#ca0019",
				color: "#ca0019",
				"&:hover": {
				  borderColor: "#a30014",
				  backgroundColor: "rgba(202, 0, 25, 0.04)",
				},
			  }}
			>
			  Edit
			</Button>
		  </div>
		</div>
	  </div>

	  {/* Main Content */}
	  <div className="mt-4 grid grid-cols-4 gap-4">
		{/* Left Sidebar */}
		<div className="lg:col-span-1 col-span-4">
		  <h3 className="text-xl font-medium">Overview</h3>

		  {/* Bio Section */}
		  <div className="my-3">
			<div>
			  <div className="flex justify-between items-center">
				<p className="bg-black p-1 px-2 rounded-tr-full text-white">BIO</p>
				<IconButton
				  size="small"
				  onClick={() => handleEdit("bio")}
				  sx={{
					bgcolor: "#f1f5f9",
					"&:hover": { bgcolor: "#e2e8f0" },
				  }}
				>
				  <EditIcon fontSize="small" />
				</IconButton>
			  </div>
			  <div className="py-3 px-2 bg-slate-50 border border-slate-200 rounded-b-md">
				<div className="flex items-start mb-2 gap-x-3">
				  <BookmarkIcon fontSize="small" className="text-slate-500" />
				  <p className="text-slate-500 text-sm">{member?.bio}</p>
				</div>
			  </div>
			</div>
		  </div>

		  {/* Contact Information */}
		  <div className="my-3">
			<div>
			  <div className="flex justify-between items-center">
				<p className="bg-black p-1 px-2 rounded-tr-full text-white">CONTACT INFORMATION</p>
				<IconButton
				  size="small"
				  onClick={() => handleEdit("contact")}
				  sx={{
					bgcolor: "#f1f5f9",
					"&:hover": { bgcolor: "#e2e8f0" },
				  }}
				>
				  <EditIcon fontSize="small" />
				</IconButton>
			  </div>
			  <div className="py-3 px-2 bg-slate-50 border border-slate-200 rounded-b-md">
				<div className="flex items-center mb-2 gap-x-3">
				  <EmailIcon fontSize="small" className="text-slate-500" />
				  <p className="text-slate-500 text-sm">{member?.email}</p>
				</div>
				<div className="flex items-center mb-2 gap-x-3">
				  <PhoneIcon fontSize="small" className="text-slate-500" />
				  <p className="text-slate-500 text-sm">
					<Link to={`tel:${member?.contact}`}>{member?.contact}</Link>
				  </p>
				</div>
				<div className="flex items-start mb-2 gap-x-3">
				  <LocationOnIcon fontSize="small" className="text-slate-500" />
				  <p className="text-slate-500 text-sm">
					{member?.address} | {member?.city}, {member?.state}
				  </p>
				</div>
			  </div>
			</div>
		  </div>

		  {/* Skills Section */}
		  <div className="my-3">
			<div>
			  <div className="flex justify-between items-center">
				<p className="bg-black p-1 px-2 rounded-tr-full text-white">SKILLS</p>
				<IconButton
				  size="small"
				  onClick={() => handleEdit("skills")}
				  sx={{
					bgcolor: "#f1f5f9",
					"&:hover": { bgcolor: "#e2e8f0" },
				  }}
				>
				  <EditIcon fontSize="small" />
				</IconButton>
			  </div>
			  <div className="py-3 bg-slate-50 border border-slate-200 rounded-b-md">
				{member?.skills?.map((skill, index) => (
				  <Chip
					key={index}
					label={skill}
					size="small"
					sx={{
					  m: 0.5,
					  bgcolor: "#e2e8f0",
					  color: "#475569",
					}}
				  />
				))}
			  </div>
			</div>
		  </div>
		</div>

		{/* Right Content - Tabs */}
		<div className="lg:col-span-3 col-span-4">
		  <Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
			  <Tabs
				value={value}
				onChange={handleTabChange}
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
				<Tab label="Statistics" {...a11yProps(0)} />
				<Tab label="Achievements" {...a11yProps(1)} />
				<Tab label="Certifications" {...a11yProps(2)} />
				<Tab label="Projects" {...a11yProps(3)} />
				<Tab label="Events" {...a11yProps(4)} />
			  </Tabs>
			</Box>

			{/* Statistics Tab */}
			<CustomTabPanel value={value} index={0}>
			  <Grid container spacing={3}>
				<Grid item xs={12} md={4}>
				  <Card sx={{ bgcolor: "#f8f9fa", boxShadow: 2 }}>
					<CardContent>
					  <Typography variant="h6" gutterBottom>
						Achievements
					  </Typography>
					  <Typography variant="h3" sx={{ color: "#ca0019", fontWeight: "bold" }}>
						{member?.achievements?.length || 0}
					  </Typography>
					</CardContent>
				  </Card>
				</Grid>
				<Grid item xs={12} md={4}>
				  <Card sx={{ bgcolor: "#f8f9fa", boxShadow: 2 }}>
					<CardContent>
					  <Typography variant="h6" gutterBottom>
						Certifications
					  </Typography>
					  <Typography variant="h3" sx={{ color: "#ca0019", fontWeight: "bold" }}>
						{member?.certifications?.length || 0}
					  </Typography>
					</CardContent>
				  </Card>
				</Grid>
				<Grid item xs={12} md={4}>
				  <Card sx={{ bgcolor: "#f8f9fa", boxShadow: 2 }}>
					<CardContent>
					  <Typography variant="h6" gutterBottom>
						Projects
					  </Typography>
					  <Typography variant="h3" sx={{ color: "#ca0019", fontWeight: "bold" }}>
						{member?.projects?.length || 0}
					  </Typography>
					</CardContent>
				  </Card>
				</Grid>
			  </Grid>
			</CustomTabPanel>

			{/* Achievements Tab */}
			<CustomTabPanel value={value} index={1}>
			  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h6">Achievements</Typography>
				<Button
				  variant="contained"
				  startIcon={<AddIcon />}
				  onClick={() => handleAddItem("achievement")}
				  sx={{
					bgcolor: "#ca0019",
					"&:hover": { bgcolor: "#a30014" },
				  }}
				>
				  Add Achievement
				</Button>
			  </Box>

			  <Grid container spacing={3}>
				{member?.achievements?.length > 0 ? (
				  member.achievements.map((achievement) => (
					<Grid item xs={12} md={6} key={achievement.id}>
					  <Card sx={{ boxShadow: 2, position: "relative" }}>
						<IconButton
						  size="small"
						  sx={{
							position: "absolute",
							top: 8,
							right: 8,
							bgcolor: "rgba(0,0,0,0.05)",
							"&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
						  }}
						  onClick={() => handleDeleteAchievement(achievement.id)}
						>
						  <DeleteIcon fontSize="small" />
						</IconButton>
						<CardContent>
						  <Box sx={{ display: "flex", gap: 2 }}>
							<Box
							  sx={{
								p: 1.5,
								borderRadius: "50%",
								bgcolor: "#f1f5f9",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							  }}
							>
							  <Award sx={{ color: "#ca0019" }} />
							</Box>
							<Box>
							  <Typography variant="h6">{achievement.title}</Typography>
							  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
								{achievement.description}
							  </Typography>
							  {achievement.date && (
								<Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
								  {new Date(achievement.date).toLocaleDateString()}
								</Typography>
							  )}
							</Box>
						  </Box>
						</CardContent>
					  </Card>
					</Grid>
				  ))
				) : (
				  <Grid item xs={12}>
					<Box sx={{ textAlign: "center", py: 4 }}>
					  <Typography variant="body1" color="text.secondary">
						No achievements added yet
					  </Typography>
					</Box>
				  </Grid>
				)}
			  </Grid>
			</CustomTabPanel>

			{/* Certifications Tab */}
			<CustomTabPanel value={value} index={2}>
			  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h6">Certifications</Typography>
				<Button
				  variant="contained"
				  startIcon={<AddIcon />}
				  onClick={() => handleAddItem("certification")}
				  sx={{
					bgcolor: "#ca0019",
					"&:hover": { bgcolor: "#a30014" },
				  }}
				>
				  Add Certification
				</Button>
			  </Box>

			  <Grid container spacing={3}>
				{member?.certifications?.length > 0 ? (
				  member.certifications.map((certification) => (
					<Grid item xs={12} md={4} key={certification.id}>
					  <Card sx={{ boxShadow: 2, position: "relative" }}>
						<IconButton
						  size="small"
						  sx={{
							position: "absolute",
							top: 8,
							right: 8,
							bgcolor: "rgba(255,255,255,0.8)",
							"&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
							zIndex: 1,
						  }}
						  onClick={() => handleDeleteCertification(certification.id)}
						>
						  <DeleteIcon fontSize="small" />
						</IconButton>
						<CardMedia
						  component="img"
						  height="140"
						  image={certification.imageUrl || "/placeholder.svg?height=180&width=320"}
						  alt={certification.title}
						/>
						<CardContent>
						  <Typography variant="h6" noWrap>
							{certification.title}
						  </Typography>
						  <Typography variant="body2" color="text.secondary">
							{certification.issuer}
						  </Typography>
						  {certification.date && (
							<Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
							  {new Date(certification.date).toLocaleDateString()}
							</Typography>
						  )}
						</CardContent>
					  </Card>
					</Grid>
				  ))
				) : (
				  <Grid item xs={12}>
					<Box sx={{ textAlign: "center", py: 4 }}>
					  <Typography variant="body1" color="text.secondary">
						No certifications added yet
					  </Typography>
					</Box>
				  </Grid>
				)}
			  </Grid>
			</CustomTabPanel>

			{/* Projects Tab */}
			<CustomTabPanel value={value} index={3}>
			  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h6">Projects</Typography>
				<Button
				  variant="contained"
				  startIcon={<AddIcon />}
				  onClick={() => handleAddItem("project")}
				  sx={{
					bgcolor: "#ca0019",
					"&:hover": { bgcolor: "#a30014" },
				  }}
				>
				  Add Project
				</Button>
			  </Box>

			  <Grid container spacing={3}>
				{member?.projects?.length > 0 ? (
				  member.projects.map((project) => (
					<Grid item xs={12} md={6} key={project.id}>
					  <Card sx={{ boxShadow: 2, position: "relative" }}>
						<IconButton
						  size="small"
						  sx={{
							position: "absolute",
							top: 8,
							right: 8,
							bgcolor: "rgba(255,255,255,0.8)",
							"&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
							zIndex: 1,
						  }}
						  onClick={() => handleDeleteProject(project.id)}
						>
						  <DeleteIcon fontSize="small" />
						</IconButton>
						{project.imageUrl && (
						  <CardMedia
							component="img"
							height="200"
							image={project.imageUrl || "/placeholder.svg?height=180&width=320"}
							alt={project.title}
						  />
						)}
						<CardContent>
						  <Typography variant="h6">{project.title}</Typography>
						  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
							{project.description}
						  </Typography>

						  <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{project.technologies.map((tech, index) => (
							  <Chip
								key={index}
								label={tech}
								size="small"
								sx={{
								  bgcolor: "#f1f5f9",
								  color: "#475569",
								}}
							  />
							))}
						  </Box>

						  <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
							{project.link && (
							  <Button
								variant="text"
								size="small"
								endIcon={<ArrowUpRightIcon />}
								component="a"
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								sx={{
								  color: "#ca0019",
								  "&:hover": { bgcolor: "rgba(202, 0, 25, 0.04)" },
								}}
							  >
								View Project
							  </Button>
							)}

							{project.githubUrl && (
							  <Button
								variant="text"
								size="small"
								startIcon={<GitHubIcon />}
								component="a"
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								sx={{
								  color: "#475569",
								  "&:hover": { bgcolor: "rgba(71, 85, 105, 0.04)" },
								}}
							  >
								GitHub
							  </Button>
							)}
						  </Box>
						</CardContent>
					  </Card>
					</Grid>
				  ))
				) : (
				  <Grid item xs={12}>
					<Box sx={{ textAlign: "center", py: 4 }}>
					  <Typography variant="body1" color="text.secondary">
						No projects added yet
					  </Typography>
					</Box>
				  </Grid>
				)}
			  </Grid>
			</CustomTabPanel>

			{/* Events Tab */}
			<CustomTabPanel value={value} index={4}>
			  <Box sx={{ textAlign: "center", py: 4 }}>
				<Typography variant="body1" color="text.secondary">
				  No events to display
				</Typography>
			  </Box>
			</CustomTabPanel>
		  </Box>
		</div>
	  </div>

	  {/* Edit Profile Dialog */}
	  <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth maxWidth="sm">
		<DialogTitle>
		  {editSection === "profile" && "Edit Profile"}
		  {editSection === "bio" && "Edit Bio"}
		  {editSection === "contact" && "Edit Contact Information"}
		  {editSection === "social" && "Edit Social Links"}
		  {editSection === "skills" && "Edit Skills"}
		  {editSection === "add-achievement" && "Add Achievement"}
		  {editSection === "add-certification" && "Add Certification"}
		  {editSection === "add-project" && "Add Project"}
		</DialogTitle>

		<DialogContent>
		  {/* Profile Form */}
		  {editSection === "profile" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <TextField
				margin="normal"
				required
				fullWidth
				id="fullName"
				label="Full Name"
				name="fullName"
				value={formData.fullName || ""}
				onChange={handleInputChange}
			  />

			  <FormControl fullWidth margin="normal">
				<InputLabel>Batch</InputLabel>
				<Select name="batch" value={formData.batch || ""} label="Batch" onChange={handleInputChange}>
				  <MenuItem value="The Uniques 1.0">The Uniques 1.0</MenuItem>
				  <MenuItem value="The Uniques 2.0">The Uniques 2.0</MenuItem>
				  <MenuItem value="The Uniques 3.0">The Uniques 3.0</MenuItem>
				  <MenuItem value="The Uniques 4.0">The Uniques 4.0</MenuItem>
				</Select>
			  </FormControl>

			  <TextField
				margin="normal"
				fullWidth
				id="course"
				label="Course"
				name="course"
				value={formData.course || ""}
				onChange={handleInputChange}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="admno"
				label="Admission Number"
				name="admno"
				value={formData.admno || ""}
				onChange={handleInputChange}
			  />

			  <FormControlLabel
				control={
				  <Switch
					checked={formData.isPlaced || false}
					onChange={(e) => setFormData({ ...formData, isPlaced: e.target.checked })}
					name="isPlaced"
				  />
				}
				label="Placed"
				sx={{ mt: 2 }}
			  />
			</Box>
		  )}

		  {/* Bio Form */}
		  {editSection === "bio" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <TextField
				margin="normal"
				required
				fullWidth
				id="bio"
				label="Bio"
				name="bio"
				multiline
				rows={4}
				value={formData.bio || ""}
				onChange={handleInputChange}
			  />
			</Box>
		  )}

		  {/* Contact Form */}
		  {editSection === "contact" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email"
				name="email"
				type="email"
				value={formData.email || ""}
				onChange={handleInputChange}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="contact"
				label="Phone"
				name="contact"
				value={formData.contact || ""}
				onChange={handleInputChange}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="address"
				label="Address"
				name="address"
				value={formData.address || ""}
				onChange={handleInputChange}
			  />

			  <Grid container spacing={2}>
				<Grid item xs={6}>
				  <TextField
					margin="normal"
					fullWidth
					id="city"
					label="City"
					name="city"
					value={formData.city || ""}
					onChange={handleInputChange}
				  />
				</Grid>
				<Grid item xs={6}>
				  <TextField
					margin="normal"
					fullWidth
					id="state"
					label="State"
					name="state"
					value={formData.state || ""}
					onChange={handleInputChange}
				  />
				</Grid>
			  </Grid>
			</Box>
		  )}

		  {/* Social Links Form */}
		  {editSection === "social" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <TextField
				margin="normal"
				fullWidth
				id="githubProfile"
				label="GitHub Profile"
				name="githubProfile"
				value={formData.githubProfile || ""}
				onChange={handleInputChange}
				InputProps={{
				  startAdornment: <GitHubIcon sx={{ mr: 1, color: "text.secondary" }} />,
				}}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="linkedinProfile"
				label="LinkedIn Profile"
				name="linkedinProfile"
				value={formData.linkedinProfile || ""}
				onChange={handleInputChange}
				InputProps={{
				  startAdornment: <LinkedInIcon sx={{ mr: 1, color: "text.secondary" }} />,
				}}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="twitterProfile"
				label="Twitter Profile"
				name="twitterProfile"
				value={formData.twitterProfile || ""}
				onChange={handleInputChange}
				InputProps={{
				  startAdornment: <TwitterIcon sx={{ mr: 1, color: "text.secondary" }} />,
				}}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="whatsappContact"
				label="WhatsApp Number"
				name="whatsappContact"
				value={formData.whatsappContact || ""}
				onChange={handleInputChange}
				InputProps={{
				  startAdornment: <WhatsAppIcon sx={{ mr: 1, color: "text.secondary" }} />,
				}}
			  />
			</Box>
		  )}

		  {/* Skills Form */}
		  {editSection === "skills" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <Box sx={{ mb: 2 }}>
				<Typography variant="subtitle2" gutterBottom>
				  Current Skills
				</Typography>
				<Box
				  sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 0.5,
					p: 1,
					border: "1px solid #e0e0e0",
					borderRadius: 1,
				  }}
				>
				  {formData.skills?.map((skill, index) => (
					<Chip
					  key={index}
					  label={skill}
					  onDelete={() => removeSkill(skill)}
					  size="small"
					  sx={{
						m: 0.5,
						bgcolor: "#e2e8f0",
						color: "#475569",
					  }}
					/>
				  ))}
				  {formData.skills?.length === 0 && (
					<Typography variant="body2" color="text.secondary">
					  No skills added yet
					</Typography>
				  )}
				</Box>
			  </Box>

			  <Box sx={{ display: "flex", gap: 1 }}>
				<TextField
				  fullWidth
				  id="newSkill"
				  label="Add Skill"
				  value={newSkill}
				  onChange={(e) => setNewSkill(e.target.value)}
				  onKeyDown={(e) => {
					if (e.key === "Enter") {
					  e.preventDefault()
					  addSkill()
					}
				  }}
				/>
				<Button
				  variant="contained"
				  onClick={addSkill}
				  sx={{
					bgcolor: "#ca0019",
					"&:hover": { bgcolor: "#a30014" },
				  }}
				>
				  Add
				</Button>
			  </Box>
			</Box>
		  )}

		  {/* Add Achievement Form */}
		  {editSection === "add-achievement" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <TextField
				margin="normal"
				required
				fullWidth
				id="title"
				label="Title"
				name="title"
				value={newAchievement.title}
				onChange={handleAchievementChange}
			  />

			  <TextField
				margin="normal"
				required
				fullWidth
				id="description"
				label="Description"
				name="description"
				multiline
				rows={3}
				value={newAchievement.description}
				onChange={handleAchievementChange}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="date"
				label="Date"
				name="date"
				type="date"
				value={newAchievement.date}
				onChange={handleAchievementChange}
				InputLabelProps={{
				  shrink: true,
				}}
			  />
			</Box>
		  )}

		  {/* Add Certification Form */}
		  {editSection === "add-certification" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <TextField
				margin="normal"
				required
				fullWidth
				id="title"
				label="Title"
				name="title"
				value={newCertification.title}
				onChange={handleCertificationChange}
			  />

			  <TextField
				margin="normal"
				required
				fullWidth
				id="issuer"
				label="Issuer"
				name="issuer"
				value={newCertification.issuer}
				onChange={handleCertificationChange}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="date"
				label="Date"
				name="date"
				type="date"
				value={newCertification.date}
				onChange={handleCertificationChange}
				InputLabelProps={{
				  shrink: true,
				}}
			  />

			  <Box sx={{ mt: 2 }}>
				<Typography variant="subtitle2" gutterBottom>
				  Certificate Image
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				  <Button
					variant="outlined"
					component="label"
					startIcon={<UploadIcon />}
					sx={{
					  borderColor: "#ca0019",
					  color: "#ca0019",
					  "&:hover": {
						borderColor: "#a30014",
						backgroundColor: "rgba(202, 0, 25, 0.04)",
					  },
					}}
				  >
					Upload File
					<input type="file" hidden accept="image/*" onChange={handleFileSelect} ref={fileInputRef} />
				  </Button>
				  {uploadedFile && <Typography variant="body2">{uploadedFile.name}</Typography>}
				</Box>

				<Divider sx={{ my: 2 }} />

				<Typography variant="subtitle2" gutterBottom>
				  Or enter image URL
				</Typography>
				<TextField
				  fullWidth
				  id="imageUrl"
				  label="Image URL"
				  name="imageUrl"
				  value={newCertification.imageUrl}
				  onChange={handleCertificationChange}
				  disabled={!!uploadedFile}
				  helperText={uploadedFile ? "Clear uploaded file to use URL instead" : ""}
				/>

				{uploadedFile && (
				  <Button
					variant="text"
					size="small"
					startIcon={<CloseIcon />}
					onClick={() => {
					  setUploadedFile(null)
					  if (fileInputRef.current) {
						fileInputRef.current.value = ""
					  }
					}}
					sx={{ mt: 1 }}
				  >
					Clear uploaded file
				  </Button>
				)}
			  </Box>
			</Box>
		  )}

		  {/* Add Project Form */}
		  {editSection === "add-project" && (
			<Box component="form" noValidate sx={{ mt: 2 }}>
			  <TextField
				margin="normal"
				required
				fullWidth
				id="title"
				label="Title"
				name="title"
				value={newProject.title}
				onChange={handleProjectChange}
			  />

			  <TextField
				margin="normal"
				required
				fullWidth
				id="description"
				label="Description"
				name="description"
				multiline
				rows={3}
				value={newProject.description}
				onChange={handleProjectChange}
			  />

			  <Box sx={{ mt: 2 }}>
				<Typography variant="subtitle2" gutterBottom>
				  Technologies
				</Typography>
				<Box
				  sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 0.5,
					p: 1,
					border: "1px solid #e0e0e0",
					borderRadius: 1,
					mb: 2,
				  }}
				>
				  {newProject.technologies.map((tech, index) => (
					<Chip
					  key={index}
					  label={tech}
					  onDelete={() => removeTechnology(tech)}
					  size="small"
					  sx={{
						m: 0.5,
						bgcolor: "#e2e8f0",
						color: "#475569",
					  }}
					/>
				  ))}
				  {newProject.technologies.length === 0 && (
					<Typography variant="body2" color="text.secondary">
					  No technologies added yet
					</Typography>
				  )}
				</Box>

				<Box sx={{ display: "flex", gap: 1 }}>
				  <TextField
					fullWidth
					id="newTechnology"
					label="Add Technology"
					value={newTechnology}
					onChange={(e) => setNewTechnology(e.target.value)}
					onKeyDown={(e) => {
					  if (e.key === "Enter") {
						e.preventDefault()
						addTechnology()
					  }
					}}
				  />
				  <Button
					variant="contained"
					onClick={addTechnology}
					sx={{
					  bgcolor: "#ca0019",
					  "&:hover": { bgcolor: "#a30014" },
					}}
				  >
					Add
				  </Button>
				</Box>
			  </Box>

			  <TextField
				margin="normal"
				fullWidth
				id="link"
				label="Project Link"
				name="link"
				value={newProject.link}
				onChange={handleProjectChange}
			  />

			  <TextField
				margin="normal"
				fullWidth
				id="githubUrl"
				label="GitHub Repository URL"
				name="githubUrl"
				value={newProject.githubUrl}
				onChange={handleProjectChange}
				InputProps={{
				  startAdornment: <GitHubIcon sx={{ mr: 1, color: "text.secondary" }} />,
				}}
			  />

			  <Box sx={{ mt: 2 }}>
				<Typography variant="subtitle2" gutterBottom>
				  Project Image
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				  <Button
					variant="outlined"
					component="label"
					startIcon={<UploadIcon />}
					sx={{
					  borderColor: "#ca0019",
					  color: "#ca0019",
					  "&:hover": {
						borderColor: "#a30014",
						backgroundColor: "rgba(202, 0, 25, 0.04)",
					  },
					}}
				  >
					Upload File
					<input type="file" hidden accept="image/*" onChange={handleFileSelect} ref={fileInputRef} />
				  </Button>
				  {uploadedFile && <Typography variant="body2">{uploadedFile.name}</Typography>}
				</Box>

				<Divider sx={{ my: 2 }} />

				<Typography variant="subtitle2" gutterBottom>
				  Or enter image URL
				</Typography>
				<TextField
				  fullWidth
				  id="imageUrl"
				  label="Image URL"
				  name="imageUrl"
				  value={newProject.imageUrl}
				  onChange={handleProjectChange}
				  disabled={!!uploadedFile}
				  helperText={uploadedFile ? "Clear uploaded file to use URL instead" : ""}
				/>

				{uploadedFile && (
				  <Button
					variant="text"
					size="small"
					startIcon={<CloseIcon />}
					onClick={() => {
					  setUploadedFile(null)
					  if (fileInputRef.current) {
						fileInputRef.current.value = ""
					  }
					}}
					sx={{ mt: 1 }}
				  >
					Clear uploaded file
				  </Button>
				)}
			  </Box>
			</Box>
		  )}
		</DialogContent>

		<DialogActions>
		  <Button onClick={() => setIsEditing(false)}>Cancel</Button>

		  {editSection === "profile" && (
			<Button
			  onClick={handleSaveProfile}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Save Changes
			</Button>
		  )}

		  {editSection === "bio" && (
			<Button
			  onClick={handleSaveProfile}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Save Changes
			</Button>
		  )}

		  {editSection === "contact" && (
			<Button
			  onClick={handleSaveProfile}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Save Changes
			</Button>
		  )}

		  {editSection === "social" && (
			<Button
			  onClick={handleSaveProfile}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Save Changes
			</Button>
		  )}

		  {editSection === "skills" && (
			<Button
			  onClick={handleSaveProfile}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Save Changes
			</Button>
		  )}

		  {editSection === "add-achievement" && (
			<Button
			  onClick={handleAddAchievement}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Add Achievement
			</Button>
		  )}

		  {editSection === "add-certification" && (
			<Button
			  onClick={handleAddCertification}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Add Certification
			</Button>
		  )}

		  {editSection === "add-project" && (
			<Button
			  onClick={handleAddProject}
			  variant="contained"
			  sx={{
				bgcolor: "#ca0019",
				"&:hover": { bgcolor: "#a30014" },
			  }}
			>
			  Add Project
			</Button>
		  )}
		</DialogActions>
	  </Dialog>

	  {/* Snackbar for alerts */}
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
	</div>
  )
}

export default index

