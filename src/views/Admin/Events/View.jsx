import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Tooltip,
  Fade,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  Edit,
  Save,
  Close,
  Delete,
  PhotoCamera,
  EventNote,
  LocationOn,
  Schedule,
  Group,
  AttachMoney,
  PhotoLibrary,
  ContactMail,
  Add,
  PersonAdd,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

// Image gallery component
const Gallery = ({ images, onAddImage, onRemoveImage, readOnly }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Event Gallery</Typography>
        {!readOnly && (
          <Button
            variant="contained"
            startIcon={<PhotoCamera />}
            component="label"
            sx={{ 
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' }
            }}
          >
            Add Images
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={onAddImage}
            />
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <Grid item xs={6} md={4} lg={3} key={index}>
              <Card 
                sx={{ 
                  position: "relative", 
                  height: 200, 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url || '/placeholder-image.png'}
                  alt={`Gallery image ${index}`}
                  sx={{ objectFit: "cover" }}
                />
                {!readOnly && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "white",
                      "&:hover": { bgcolor: "rgba(255,0,0,0.7)" },
                    }}
                    size="small"
                    onClick={() => onRemoveImage(image._id || index)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)',
              }}
            >
              <PhotoLibrary
                sx={{ fontSize: 60, color: "text.secondary", mb: 1 }}
              />
              <Typography color="text.secondary">
                No images in gallery
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

// Event view component
const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [editedEvent, setEditedEvent] = useState({});
  const [gallery, setGallery] = useState([]);
  const [formResponses, setFormResponses] = useState([]);
  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const [availableGuests, setAvailableGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guestTag, setGuestTag] = useState("");

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await response.json();

        if (data.success) {
          setEvent(data.event);
          setEditedEvent(data.event);

          // Check if event has gallery images
          if (data.event.eventGallery && data.event.eventGallery.length > 0) {
            setGallery(data.event.eventGallery);
          }

          // Fetch form responses if event has a form
          if (data.event.eventForm && data.event.eventForm.formId) {
            fetchFormResponses(data.event._id);
          }
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Fetch available guests
  const fetchAvailableGuests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/guest/get-all-guests`);
      const data = await response.json();

      if (data.success) {
        setAvailableGuests(data.guests || []);
      }
    } catch (error) {
      console.error("Error fetching available guests:", error);
    }
  };

  // Fetch form responses
  const fetchFormResponses = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/form-responses`
      );
      const data = await response.json();

      if (data.success) {
        setFormResponses(data.responses || []);
      }
    } catch (error) {
      console.error("Error fetching form responses:", error);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Toggle edit mode
  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Reset changes if canceling
      setEditedEvent(event);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setEditedEvent({
      ...editedEvent,
      eventDate: date ? date.format('YYYY-MM-DD') : null
    });
  };

  // Handle time change
  const handleTimeChange = (time) => {
    setEditedEvent({
      ...editedEvent,
      eventTime: time ? time.format("hh:mm A") : "",
    });
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setEditedEvent({
      ...editedEvent,
      eventStatus: e.target.value,
    });
  };

  // Save event changes
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(editedEvent),
      });

      const data = await response.json();

      if (data.success) {
        setEvent(data.event);
        setEditMode(false);
      } else {
        // Handle error
        console.error("Error updating event:", data.message);
      }
    } catch (error) {
      console.error("Error saving event changes:", error);
    }
  };

  // Add image to gallery
  const handleAddImage = async (e) => {
    try {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;
      
      // Show temporary local images while uploading
      const tempImages = files.map(file => ({
        _id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: URL.createObjectURL(file),
        isTemp: true
      }));
      
      setGallery(prevGallery => [...prevGallery, ...tempImages]);

      // Upload images first to get their IDs
      const formData = new FormData();
      for (let file of files) {
        formData.append("files", file);
      }

      const uploadResponse = await fetch(
        "http://localhost:5000/upload/event_file_upload",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();

      if (uploadResult.success) {
        // Now add these images to event gallery
        const imageIds = uploadResult.files.map((file) => file._id);

        const galleryResponse = await fetch(
          `http://localhost:5000/api/events/${id}/gallery`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              imagesToAdd: imageIds,
            }),
          }
        );

        const galleryResult = await galleryResponse.json();

        if (galleryResult.success) {
          // Replace the temporary images with the real ones
          setGallery(galleryResult.gallery);
        }
        
        // Clean up any object URLs to prevent memory leaks
        tempImages.forEach(image => {
          if (image.isTemp && image.url) {
            URL.revokeObjectURL(image.url);
          }
        });
      }
    } catch (error) {
      console.error("Error adding images:", error);
    }
  };

  // Remove image from gallery
  const handleRemoveImage = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}/gallery`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            imagesToRemove: [imageId],
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setGallery(result.gallery);
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  // Handle budget navigation
  const handleNavigateToBudget = () => {
    navigate(`/admin/events-overview/${id}/budget`);
  };
  
  // Handle event registration
  const handleRegisterForEvent = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login or show login dialog
        navigate("/login", { 
          state: { 
            redirectTo: `/admin/events-overview/${id}`,
            message: "Please log in to register for this event" 
          } 
        });
        return;
      }

      // If event has a form, redirect to the form submission page
      if (event.eventForm && event.eventForm.formId) {
        const formUrl = `http://localhost:5000/api/forms/${event.eventForm.formId}/submit?eventId=${id}`;
        window.open(formUrl, "_blank");
      } else {
        // Simple registration without form
        const response = await fetch(`http://localhost:5000/api/events/${id}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        
        const result = await response.json();
        if (result.success) {
          // Show success notification or update UI
          alert("Successfully registered for this event!");
        }
      }
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  // Open manage guests dialog
  const handleOpenGuestDialog = async () => {
    await fetchAvailableGuests();
    setGuestDialogOpen(true);
  };

  // Close manage guests dialog
  const handleCloseGuestDialog = () => {
    setGuestDialogOpen(false);
    setSelectedGuest(null);
    setGuestTag("");
  };

  // Add guest to event
  const handleAddGuest = async () => {
    if (!selectedGuest) return;

    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          guestId: selectedGuest._id,
          guestTag: guestTag || selectedGuest.guestDesignation,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update event with new guest list
        setEvent({
          ...event,
          eventGuests: result.guests,
        });

        // Reset form fields
        setSelectedGuest(null);
        setGuestTag("");
      }
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };

  // Remove guest from event
  const handleRemoveGuest = async (guestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}/guests/${guestId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        // Update event with new guest list
        setEvent({
          ...event,
          eventGuests: result.guests,
        });
      }
    } catch (error) {
      console.error("Error removing guest:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dayjs(dateString).format("dddd, MMMM D, YYYY");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          Event not found
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/admin/events")}
        >
          Back to Events
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
          p: 2,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: "bold",
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
             }}
          >
            {editMode ? "Edit Event" : event.eventName}
          </Typography>
          {!editMode && (
            <Typography variant="body1" color="text.secondary">
              {event.eventType} • {formatDate(event.eventDate)}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Register button beside heading */}
          {event.eventForm && event.eventForm.formId && !editMode && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ContactMail />}
              onClick={handleRegisterForEvent}
              sx={{ 
                background: 'linear-gradient(45deg, #FF5722 30%, #FFA726 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              Register Now
            </Button>
          )}

          <Button
            variant={editMode ? "outlined" : "contained"}
            color={editMode ? "error" : "primary"}
            onClick={handleToggleEditMode}
            startIcon={editMode ? <Close /> : <Edit />}
            sx={{ 
              transition: 'all 0.2s',
              ...(editMode ? {} : {
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              }),
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            {editMode ? "Cancel" : "Edit Event"}
          </Button>

          {editMode && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveChanges}
              sx={{ 
                background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-2px)' }
              }}
            >
              Save Changes
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<AttachMoney />}
            onClick={handleNavigateToBudget}
            sx={{ 
              borderColor: '#4CAF50', 
              color: '#4CAF50',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Manage Budget
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 3, 
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
            elevation={2}
          >
            {/* Banner image */}
            <Box sx={{ position: "relative", mb: 3 }}>
              {event.eventBanner ? (
                <CardMedia
                  component="img"
                  height="350"
                  image={event.eventBanner.url}
                  alt={event.eventName}
                  sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                />
              ) : (
                <Box
                  sx={{
                    height: 350,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0,0,0,0.04)",
                    borderRadius: 2,
                  }}
                >
                  <PhotoCamera sx={{ fontSize: 60, color: "text.disabled" }} />
                </Box>
              )}

              {editMode && (
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    background: 'rgba(0,0,0,0.7)',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.9)',
                    }
                  }}
                >
                  Change Banner
                  <input type="file" hidden accept="image/*" />
                </Button>
              )}
            </Box>

            {/* Tabs for different sections */}
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: 'primary.main',
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  },
                  mb: 1,
                }}
              >
                <Tab label="Details" />
                <Tab label="Gallery" />
                <Tab label="Form Responses" />
              </Tabs>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ py: 2 }}>
                {/* Details Tab */}
                {tabValue === 0 && (
                  <Box>
                    {editMode ? (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            name="eventName"
                            label="Event Name"
                            value={editedEvent.eventName || ""}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ mb: 2 }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            name="eventDescription"
                            label="Event Description"
                            value={editedEvent.eventDescription || ""}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Event Date"
                              value={
                                editedEvent.eventDate
                                  ? dayjs(editedEvent.eventDate)
                                  : null
                              }
                              onChange={handleDateChange}
                              slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                              sx={{ mb: 2 }}
                            />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              label="Event Time"
                              value={
                                editedEvent.eventTime
                                  ? dayjs(`2000-01-01T${editedEvent.eventTime}`)
                                  : null
                              }
                              onChange={handleTimeChange}
                              slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                              sx={{ mb: 2 }}
                            />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            name="eventVenue"
                            label="Event Venue"
                            value={editedEvent.eventVenue || ""}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="eventType"
                            label="Event Type"
                            value={editedEvent.eventType || ""}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                            <InputLabel>Event Status</InputLabel>
                            <Select
                              value={editedEvent.eventStatus || "upcoming"}
                              label="Event Status"
                              onChange={handleStatusChange}
                            >
                              <MenuItem value="upcoming">Upcoming</MenuItem>
                              <MenuItem value="ongoing">Ongoing</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            name="eventOrganizerBatch"
                            label="Organizer Batch"
                            value={editedEvent.eventOrganizerBatch || ""}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Box>
                        {/* Description */}
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ mt: 2, mb: 1, fontSize: '1.1rem' }}
                        >
                          Description
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
                          {event.eventDescription ||
                            "No description available."}
                        </Typography>

                        {/* Event details */}
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ mt: 4, mb: 2, fontSize: '1.1rem' }}
                        >
                          Event Details
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Card
                              sx={{
                                bgcolor: "background.paper",
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                borderRadius: 2,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                                }
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Schedule
                                  sx={{ mr: 2, color: "primary.main", fontSize: 28 }}
                                />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 0.5 }}
                                  >
                                    Date & Time
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {formatDate(event.eventDate)}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.primary', mt: 0.5 }}>
                                    {event.eventTime}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Card
                              sx={{
                                bgcolor: "background.paper",
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                borderRadius: 2,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                                }
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <LocationOn
                                  sx={{ mr: 2, color: "primary.main", fontSize: 28 }}
                                />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 0.5 }}
                                  >
                                    Venue
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {event.eventVenue || "Venue not specified"}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Card
                              sx={{
                                bgcolor: "background.paper",
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                borderRadius: 2,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                                }
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <EventNote
                                  sx={{ mr: 2, color: "primary.main", fontSize: 28 }}
                                />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 0.5 }}
                                  >
                                    Event Type
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {event.eventType || "Not specified"}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Card
                              sx={{
                                bgcolor: "background.paper",
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                borderRadius: 2,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                                }
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Group sx={{ mr: 2, color: "primary.main", fontSize: 28 }} />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 0.5 }}
                                  >
                                    Organizer Batch
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {event.eventOrganizerBatch ||
                                      "Not specified"}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>

                        {/* Budget summary */}
                        {event.budget && event.budget.totalAllocated > 0 && (
                          <Box sx={{ mt: 4 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ mb: 2, fontSize: '1.1rem' }}
                            >
                              Budget Overview
                            </Typography>
                            <Card
                              sx={{
                                bgcolor: "background.paper",
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                borderRadius: 2,
                              }}
                            >
                              <CardContent>
                                <Grid container spacing={2}>
                                  <Grid item xs={4}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Total Budget
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                      ₹
                                      {event.budget.totalAllocated.toLocaleString()}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Total Spent
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                      ₹
                                      {event.budget.totalSpent.toLocaleString()}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Remaining
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      sx={{ fontWeight: 600 }}
                                      color={
                                        event.budget.remaining >= 0
                                          ? "success.main"
                                          : "error.main"
                                      }
                                    >
                                      ₹{event.budget.remaining.toLocaleString()}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{ mt: 2 }}
                                  onClick={handleNavigateToBudget}
                                >
                                  View Details
                                </Button>
                              </CardContent>
                            </Card>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                )}

                {/* Gallery Tab */}
                {tabValue === 1 && (
                  <Gallery
                    images={gallery}
                    onAddImage={handleAddImage}
                    onRemoveImage={handleRemoveImage}
                    readOnly={!editMode}
                  />
                )}

                {/* Form Responses Tab */}
                {tabValue === 2 && (
                  <Box>
                    {event.eventForm && event.eventForm.formId ? (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Form Responses
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ContactMail />}
                            onClick={handleRegisterForEvent}
                            sx={{ 
                              background: 'linear-gradient(45deg, #FF5722 30%, #FFA726 90%)',
                              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                              transition: 'transform 0.2s',
                              '&:hover': { transform: 'scale(1.02)' }
                            }}
                          >
                            Register for Event
                          </Button>
                        </Box>

                        {/* Form Preview Section */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                            Form Preview
                          </Typography>
                          <Box sx={{ 
                            border: '1px solid', 
                            borderColor: 'divider', 
                            borderRadius: 2, 
                            mb: 2,
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          }}>
                            <iframe
                              src={`http://localhost:5000/api/forms/${event.eventForm.formId}/preview`}
                              style={{ width: '100%', height: '400px', border: 'none' }}
                              title="Form Preview"
                            />
                          </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                          Submissions ({formResponses.length})
                        </Typography>

                        {formResponses.length > 0 ? (
                          <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                            <Table>
                              <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                                <TableRow>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Email</TableCell>
                                  <TableCell>Status</TableCell>
                                  <TableCell>Submission Date</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {formResponses.map((response, index) => (
                                  <TableRow 
                                    key={response._id || index}
                                    sx={{ 
                                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' },
                                      transition: 'background-color 0.2s'
                                    }}
                                  >
                                    <TableCell>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ mr: 1, width: 32, height: 32 }}>
                                          {(response.respondent?.member?.memberName || "A").charAt(0)}
                                        </Avatar>
                                        {response.respondent?.member?.memberName || "Anonymous"}
                                      </Box>
                                    </TableCell>
                                    <TableCell>{response.respondent?.member?.memberEmail || "No email"}</TableCell>
                                    <TableCell>
                                      <Chip
                                        size="small"
                                        label={response.status}
                                        color={
                                          response.status === "approved"
                                            ? "success"
                                            : response.status === "rejected"
                                            ? "error"
                                            : "default"
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>{new Date(response.metadata?.submittedAt).toLocaleString()}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        ) : (
                          <Box
                            sx={{
                              p: 4,
                              textAlign: "center",
                              bgcolor: "background.paper",
                              borderRadius: 2,
                              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)',
                            }}
                          >
                            <Typography color="text.secondary">
                              No form responses yet
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          p: 4,
                          textAlign: "center",
                          bgcolor: "background.paper",
                          borderRadius: 2,
                          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)',
                        }}
                      >
                        <Typography color="text.secondary">
                          No registration form attached to this event
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right column - Side panel */}
        <Grid item xs={12} md={4}>
          {/* Event Status Card */}
          <Card 
            sx={{ 
              mb: 3, 
              borderRadius: 3, 
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Event Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor:
                      event.eventStatus === "ongoing"
                        ? "#ff4d4f"
                        : event.eventStatus === "completed"
                        ? "#52c41a"
                        : event.eventStatus === "cancelled"
                        ? "#8c8c8c"
                        : "#faad14",
                    mr: 1,
                    boxShadow: `0 0 8px ${
                      event.eventStatus === "ongoing"
                        ? "#ff4d4f"
                        : event.eventStatus === "completed"
                        ? "#52c41a"
                        : event.eventStatus === "cancelled"
                        ? "#8c8c8c"
                        : "#faad14"
                    }`,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "medium",
                    color:
                      event.eventStatus === "ongoing"
                        ? "#cf1322"
                        : event.eventStatus === "completed"
                        ? "#389e0d"
                        : event.eventStatus === "cancelled"
                        ? "#595959"
                        : "#d48806",
                  }}
                >
                  {event.eventStatus}
                </Typography>
              </Box>

              {!editMode && (
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel>Update Status</InputLabel>
                  <Select
                    value=""
                    label="Update Status"
                    onChange={async (e) => {
                      try {
                        const response = await fetch(
                          `http://localhost:5000/api/events/${id}/status`,
                          {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                            body: JSON.stringify({ status: e.target.value }),
                          }
                        );

                        const data = await response.json();

                        if (data.success) {
                          setEvent({
                            ...event,
                            eventStatus: data.event.eventStatus,
                          });
                        }
                      } catch (error) {
                        console.error("Error updating event status:", error);
                      }
                    }}
                  >
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                    <MenuItem value="ongoing">Ongoing</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              )}
            </CardContent>
          </Card>

          {/* Guests Card */}
          <Card 
            sx={{ 
              mb: 3, 
              borderRadius: 3, 
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Event Guests
                </Typography>
                <Chip 
                  label={`${event.eventGuests?.length || 0} guests`} 
                  size="small" 
                  color="primary" 
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              {event.eventGuests && event.eventGuests.length > 0 ? (
                <List>
                  {event.eventGuests.map((guest, index) => (
                    <ListItem
                      key={index}
                      alignItems="flex-start"
                      sx={{ 
                        px: 0, 
                        transition: 'background-color 0.2s',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' },
                        borderRadius: 1,
                      }}
                      secondaryAction={
                        !editMode && (
                          <IconButton 
                            edge="end" 
                            size="small"
                            onClick={() => handleRemoveGuest(guest.guestId?._id)}
                            sx={{ 
                              opacity: 0.6,
                              '&:hover': { opacity: 1, color: 'error.main' }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        )
                      }
                    >
                      <ListItemAvatar>
                        <Avatar 
                          src={guest.guestId?.guestImage?.url}
                          sx={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          }}
                        >
                          {guest.guestId?.guestName?.charAt(0) || "G"}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={guest.guestId?.guestName || "Unknown Guest"}
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                              {guest.guestId?.guestDesignation}
                              {guest.guestId?.guestCompany && (
                                <>, {guest.guestId.guestCompany}</>
                              )}
                            </Typography>
                            {guest.guestTag && (
                              <Chip
                                label={guest.guestTag}
                                size="small"
                                sx={{ mt: 0.5, fontSize: '0.7rem' }}
                                variant="outlined"
                              />
                            )}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No guests added to this event yet
                  </Typography>
                </Box>
              )}

              {!editMode && (
                <Button
                  variant="outlined"
                  startIcon={<PersonAdd />}
                  size="medium"
                  sx={{ 
                    mt: 2, 
                    width: '100%',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.08)',
                      borderColor: 'primary.main',
                    }
                  }}
                  onClick={handleOpenGuestDialog}
                >
                  Manage Guests
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              background: 'linear-gradient(to right bottom, #f9f9f9, #ffffff)',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Stats
              </Typography>

              <Grid container spacing={2}>
                {event.eventForm && (
                  <Grid item xs={6}>
                    <Card sx={{ 
                      boxShadow: 'none', 
                      backgroundColor: 'rgba(33, 150, 243, 0.04)', 
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}>
                      <CardContent sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                          {formResponses.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Registrations
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}

                {event.eventGallery && (
                  <Grid item xs={6}>
                    <Card sx={{ 
                      boxShadow: 'none', 
                      backgroundColor: 'rgba(76, 175, 80, 0.04)', 
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}>
                      <CardContent sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                          {gallery.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Gallery Images
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}

                <Grid item xs={6}>
                  <Card sx={{ 
                    boxShadow: 'none', 
                    backgroundColor: 'rgba(255, 152, 0, 0.04)', 
                    borderRadius: 2,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}>
                    <CardContent sx={{ textAlign: "center", p: 2 }}>
                      <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>
                        {event.eventMembers?.length || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Team Members
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card sx={{ 
                    boxShadow: 'none', 
                    backgroundColor: 'rgba(156, 39, 176, 0.04)', 
                    borderRadius: 2,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}>
                    <CardContent sx={{ textAlign: "center", p: 2 }}>
                      <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 700 }}>
                        {event.eventGuests?.length || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Guests
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Manage Guests Dialog */}
      <Dialog 
        open={guestDialogOpen} 
        onClose={handleCloseGuestDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Manage Event Guests
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Add New Guest
            </Typography>
            <Autocomplete
              options={availableGuests || []}
              getOptionLabel={(option) => 
                option.guestName ? `${option.guestName} - ${option.guestDesignation || 'No designation'}` : ''
              }
              renderInput={(params) => 
                <TextField {...params} label="Select Guest" variant="outlined" fullWidth />
              }
              value={selectedGuest}
              onChange={(e, newValue) => setSelectedGuest(newValue)}
              sx={{ mb: 2 }}
            />
            <TextField 
              label="Guest Tag (Optional)" 
              variant="outlined" 
              fullWidth 
              value={guestTag}
              onChange={(e) => setGuestTag(e.target.value)}
              placeholder="Speaker, Judge, Mentor, etc."
              helperText="How would you like to describe this guest's role?"
            />
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
              onClick={handleAddGuest}
              disabled={!selectedGuest}
              sx={{ mt: 2 }}
            >
              Add Guest
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />
          
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Current Guests
          </Typography>
          
          <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {event.eventGuests && event.eventGuests.length > 0 ? (
              event.eventGuests.map((guest, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton 
                      edge="end"
                      onClick={() => handleRemoveGuest(guest.guestId?._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={guest.guestId?.guestImage?.url}>
                      {guest.guestId?.guestName?.charAt(0) || "G"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={guest.guestId?.guestName || "Unknown Guest"}
                    secondary={
                      <>
                        {guest.guestId?.guestDesignation}
                        {guest.guestTag && (
                          <Chip
                            label={guest.guestTag}
                            size="small"
                            sx={{ ml: 1, fontSize: '0.7rem' }}
                            variant="outlined"
                          />
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText 
                  primary="No guests added" 
                  secondary="Add guests from the form above"
                  sx={{ textAlign: 'center', color: 'text.secondary' }}
                />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGuestDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventView;