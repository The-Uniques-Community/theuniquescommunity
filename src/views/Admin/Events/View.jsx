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
              <Card sx={{ position: "relative", height: 200 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url || URL.createObjectURL(image)}
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
                borderRadius: 1,
              }}
            >
              <PhotoLibrary
                sx={{ fontSize: 40, color: "text.secondary", mb: 1 }}
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

      // Upload images first to get their IDs
      const formData = new FormData();
      for (let file of files) {
        formData.append("files", file);
      }

      const uploadResponse = await fetch(
        "http://localhost:5000/api/uploads/images",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
          setGallery(galleryResult.gallery);
        }
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
    navigate(`/admin/events/${id}/budget`);
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
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {editMode ? "Edit Event" : event.eventName}
          </Typography>
          {!editMode && (
            <Typography variant="body1" color="text.secondary">
              {event.eventType} • {formatDate(event.eventDate)}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={editMode ? "outlined" : "contained"}
            color={editMode ? "error" : "primary"}
            onClick={handleToggleEditMode}
            startIcon={editMode ? <Close /> : <Edit />}
          >
            {editMode ? "Cancel" : "Edit Event"}
          </Button>

          {editMode && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<AttachMoney />}
            onClick={handleNavigateToBudget}
          >
            Manage Budget
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: "md" }}>
            {/* Banner image */}
            <Box sx={{ position: "relative", mb: 2 }}>
              {event.eventBanner ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={event.eventBanner.url}
                  alt={event.eventName}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Box
                  sx={{
                    height: 300,
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
              >
                <Tab label="Details" />
                <Tab label="Gallery" />
                <Tab label="Form Responses" />
                <Tab label="Members" />
              </Tabs>

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
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Event Date"
                              value={
                                editedEvent.eventDate
                                  ? dayjs(editedEvent.eventDate)
                                  : null
                              }
                              onChange={handleDateChange}
                            />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Event Time"
                              value={
                                editedEvent.eventTime
                                  ? dayjs(`2000-01-01T${editedEvent.eventTime}`)
                                  : null
                              }
                              onChange={handleTimeChange}
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
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="eventType"
                            label="Event Type"
                            value={editedEvent.eventType || ""}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
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
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Box>
                        {/* Description */}
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ mt: 2, mb: 1 }}
                        >
                          Description
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {event.eventDescription ||
                            "No description available."}
                        </Typography>

                        {/* Event details */}
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ mt: 3, mb: 1 }}
                        >
                          Event Details
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Card
                              sx={{
                                bgcolor: "background.paper",
                                boxShadow: "none",
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Schedule
                                  sx={{ mr: 1, color: "primary.main" }}
                                />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Date & Time
                                  </Typography>
                                  <Typography variant="body1">
                                    {formatDate(event.eventDate)}
                                  </Typography>
                                  <Typography variant="body2">
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
                                boxShadow: "none",
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <LocationOn
                                  sx={{ mr: 1, color: "primary.main" }}
                                />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Venue
                                  </Typography>
                                  <Typography variant="body1">
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
                                boxShadow: "none",
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <EventNote
                                  sx={{ mr: 1, color: "primary.main" }}
                                />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Event Type
                                  </Typography>
                                  <Typography variant="body1">
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
                                boxShadow: "none",
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Group sx={{ mr: 1, color: "primary.main" }} />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Organizer Batch
                                  </Typography>
                                  <Typography variant="body1">
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
                          <Box sx={{ mt: 3 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ mb: 1 }}
                            >
                              Budget Overview
                            </Typography>
                            <Card
                              sx={{
                                bgcolor: "background.paper",
                                boxShadow: "none",
                                border: "1px solid",
                                borderColor: "divider",
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
                                    <Typography variant="h6">
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
                                    <Typography variant="h6">
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
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Form Responses
                        </Typography>

                        {formResponses.length > 0 ? (
                          <List>
                            {formResponses.map((response, index) => (
                              <React.Fragment key={response._id || index}>
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar>
                                      <ContactMail />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      response.respondent?.member?.memberName ||
                                      "Anonymous"
                                    }
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                        >
                                          {response.respondent?.member
                                            ?.memberEmail || "No email"}
                                        </Typography>
                                        <Typography
                                          component="div"
                                          variant="body2"
                                        >
                                          Status:
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
                                            sx={{ ml: 1 }}
                                          />
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          component="div"
                                        >
                                          Submitted:{" "}
                                          {new Date(
                                            response.metadata?.submittedAt
                                          ).toLocaleString()}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                              </React.Fragment>
                            ))}
                          </List>
                        ) : (
                          <Box
                            sx={{
                              p: 4,
                              textAlign: "center",
                              bgcolor: "background.paper",
                              borderRadius: 1,
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
                          borderRadius: 1,
                        }}
                      >
                        <Typography color="text.secondary">
                          No registration form attached to this event
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Members Tab */}
                {tabValue === 3 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Event Members
                    </Typography>

                    {event.eventMembers && event.eventMembers.length > 0 ? (
                      <List>
                        {event.eventMembers.map((member, index) => (
                          <ListItem key={index}>
                            <ListItemAvatar>
                              <Avatar src={member.memberImage?.url}>
                                {member.memberName?.charAt(0) || "M"}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={member.memberName}
                              secondary={member.memberEmail}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Box
                        sx={{
                          p: 4,
                          textAlign: "center",
                          bgcolor: "background.paper",
                          borderRadius: 1,
                        }}
                      >
                        <Typography color="text.secondary">
                          No members assigned to this event
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
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Event Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
                    boxShadow: `0 0 5px ${
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
                <FormControl fullWidth size="small">
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
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Event Guests
              </Typography>

              {event.eventGuests && event.eventGuests.length > 0 ? (
                <List>
                  {event.eventGuests.map((guest, index) => (
                    <ListItem
                      key={index}
                      alignItems="flex-start"
                      sx={{ px: 0 }}
                    >
                      <ListItemAvatar>
                        <Avatar src={guest.guestId?.guestImage?.url}>
                          {guest.guestId?.guestName?.charAt(0) || "G"}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={guest.guestId?.guestName || "Unknown Guest"}
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2" component="span">
                              {guest.guestId?.guestDesignation}
                              {guest.guestId?.guestCompany && (
                                <>, {guest.guestId.guestCompany}</>
                              )}
                            </Typography>
                            {guest.guestTag && (
                              <Chip
                                label={guest.guestTag}
                                size="small"
                                sx={{ ml: 1 }}
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
                <Typography variant="body2" color="text.secondary">
                  No guests added to this event
                </Typography>
              )}

              {!editMode && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Manage Guests
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Stats
              </Typography>

              <Grid container spacing={2}>
                {event.eventForm && (
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: "center", p: 1 }}>
                      <Typography variant="h4" color="primary.main">
                        {formResponses.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Registrations
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {event.eventGallery && (
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: "center", p: 1 }}>
                      <Typography variant="h4" color="primary.main">
                        {gallery.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Gallery Images
                      </Typography>
                    </Box>
                  </Grid>
                )}

                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center", p: 1 }}>
                    <Typography variant="h4" color="primary.main">
                      {event.eventMembers?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Team Members
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center", p: 1 }}>
                    <Typography variant="h4" color="primary.main">
                      {event.eventGuests?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Guests
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventView;
