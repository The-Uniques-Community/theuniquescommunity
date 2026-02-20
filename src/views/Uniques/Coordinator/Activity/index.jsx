import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  Pagination,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  Avatar,
  Badge,
} from "@mui/material";
import {
  AddCircleOutline,
  EventNote,
  EventAvailable,
  Visibility,
  Collections,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



function Activity() {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // State declarations
  const [stats] = useState({
    total: 0,
    ongoing: 0,
    upcoming: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    count: 0
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock data for activities - replace with API call
  const mockEvents = [];

  const events = mockEvents;
  const loading = false;


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStatusIndicator = (status) => {
    const statusConfig = {
      ongoing: { color: '#ff4d4f', label: 'Ongoing' },
      upcoming: { color: '#faad14', label: 'Upcoming' },
      completed: { color: '#52c41a', label: 'Completed' },
      cancelled: { color: '#ff4d4f', label: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.upcoming;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: config.color
          }}
        />
        <Typography variant="body2">
          {config.label}
        </Typography>
      </Box>
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  // Event handlers
  const handleCreateEvent = () => {
    navigate("/coordinator/activity/create");
  };

  const handleViewEvent = (eventId) => {
    console.log('View event:', eventId);
  };

  const handleViewGallery = (eventId) => {
    console.log('View gallery for event:', eventId);
  };

  const handlePageChange = (event, page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
    console.log('Page changed to:', page);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Activities
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ borderRadius: 2, boxShadow: "none" }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Activities
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EventNote sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h4">{stats.total}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ borderRadius: 2, boxShadow: "none" }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Ongoing Activities
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    mr: 1,
                    display: "flex",
                    alignItems: "center",
                    color: "#ff4d4f",
                  }}
                >
                  <EventAvailable />
                </Box>
                <Typography variant="h4">{stats.ongoing}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ borderRadius: 2, boxShadow: "none" }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Upcoming Activities
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 1, color: "#faad14" }}>
                  <EventNote />
                </Box>
                <Typography variant="h4">{stats.upcoming}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Events Table with Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Activity List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={handleCreateEvent}
          sx={{ borderRadius: 2 }}
        >
          Create New Activity
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
            No Activity found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleCreateEvent}
            sx={{ borderRadius: 2 }}
          >
            Create Your First Activity
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                  <TableCell>Banner</TableCell>
                  <TableCell>Activity Name</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Venue</TableCell>
                  <TableCell>Event Type</TableCell>
                  <TableCell>Organizer Batch</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow
                    key={event._id}
                    hover
                    sx={{
                      backgroundColor: 'inherit'
                    }}
                  >
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={event.bannerImage}
                        sx={{ width: 50, height: 50 }}
                      >
                        <EventNote />
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="medium">{event.eventName}</Typography>
                      {event.galleryImages?.length > 0 && (
                        <Typography variant="caption" color="success.main" display="block">
                          {event.galleryImages.length} images in gallery
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate(event.eventDate)}
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        {event.eventTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {renderStatusIndicator(event.eventStatus)}
                    </TableCell>
                    <TableCell>{event.eventVenue}</TableCell>
                    <TableCell>{event.eventType}</TableCell>
                    <TableCell>{event.eventOrganizerBatch}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Tooltip title="View Details">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewEvent(event._id)}
                            sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="View Gallery">
                          <IconButton
                            color="success"
                            size="small"
                            onClick={() => handleViewGallery(event._id)}
                            sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
                          >
                            <Badge 
                              badgeContent={event.galleryImages?.length || 0} 
                              color="primary"
                              max={99}
                            >
                              <Collections />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}

          {/* Showing results text */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Showing {pagination.count} of {pagination.total} events
            </Typography>
          </Box>
        </>
      )}

      {/* Create Activity Modal with Image Uploads */}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Activity;