import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Divider,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { ArrowBack, CloudUpload, Delete, AddPhotoAlternate } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const BannerUploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
  },
}));

const EventTypes = [
  'Cultural',
  'Technical',
  'Sports',
  'Workshop',
  'Seminar',
  'Conference',
  'Festival',
  'Competition',
  'Other'
];

const BatchOptions = [
  'All Batches',
  'Uniques 1.0',
  'Uniques 2.0',
  'Uniques 3.0',
  'Uniques 4.0',
];

function ActivityForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventVenue: '',
    eventType: '',
    eventOrganizerBatch: '',
    eventStatus: 'upcoming',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.eventName.trim()) {
      errors.eventName = 'Activity name is required';
    }
    
    if (!formData.eventDate) {
      errors.eventDate = 'Event date is required';
    }
    
    if (!formData.eventTime) {
      errors.eventTime = 'Event time is required';
    }
    
    if (!formData.eventVenue.trim()) {
      errors.eventVenue = 'Venue is required';
    }
    
    if (!formData.eventType) {
      errors.eventType = 'Event type is required';
    }
    
    if (!formData.eventOrganizerBatch) {
      errors.eventOrganizerBatch = 'Organizer batch is required';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showSnackbar('Please upload an image file', 'error');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('File size should be less than 5MB', 'error');
        return;
      }

      setUploadingBanner(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
        setBannerFile(file);
        setUploadingBanner(false);
        showSnackbar('Banner uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (event) => {
    const files = Array.from(event.target.files);
    
    if (galleryFiles.length + files.length > 20) {
      showSnackbar('Maximum 20 images allowed in gallery', 'error');
      return;
    }

    setUploadingGallery(true);
    
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        showSnackbar(`${file.name} is not an image file`, 'error');
        return false;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar(`${file.name} size should be less than 5MB`, 'error');
        return false;
      }
      
      return true;
    });

    let processedCount = 0;
    const newPreviews = [];
    const newFiles = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        newFiles.push(file);
        processedCount++;
        
        if (processedCount === validFiles.length) {
          setGalleryPreviews(prev => [...prev, ...newPreviews]);
          setGalleryFiles(prev => [...prev, ...newFiles]);
          setUploadingGallery(false);
          showSnackbar(`${validFiles.length} image(s) uploaded successfully!`);
        }
      };
      reader.readAsDataURL(file);
    });

    if (validFiles.length === 0) {
      setUploadingGallery(false);
    }
  };

  const handleRemoveBanner = () => {
    setBannerPreview(null);
    setBannerFile(null);
  };

  const handleRemoveGalleryImage = (index) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    showSnackbar('Image removed from gallery');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      
      // Here you would make your API call to save the activity
      console.log('Form submitted:', {
        formData,
        bannerFile,
        galleryFiles
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSnackbar('Activity created successfully!', 'success');
      
      // Navigate back to activities list after a short delay
      setTimeout(() => {
        navigate('/coordinator/activity');
      }, 1000);
      
    } catch (error) {
      console.error('Error creating activity:', error);
      showSnackbar('Failed to create activity. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/coordinator/activity');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Back Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography textColor="red">
          Back
        </Typography>
      </Box>

      {/* Form Card */}
      <Card elevation={2} sx={{ maxWidth: 900, mx: 'auto', borderRadius: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Information Section */}
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Basic Information
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Activity Name"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  error={!!formErrors.eventName}
                  helperText={formErrors.eventName}
                  required
                  placeholder="Enter activity name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  error={!!formErrors.eventDate}
                  helperText={formErrors.eventDate}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Time"
                  name="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  error={!!formErrors.eventTime}
                  helperText={formErrors.eventTime}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Venue"
                  name="eventVenue"
                  value={formData.eventVenue}
                  onChange={handleInputChange}
                  error={!!formErrors.eventVenue}
                  helperText={formErrors.eventVenue}
                  required
                  placeholder="Enter event venue"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!formErrors.eventType} required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    label="Event Type"
                  >
                    {EventTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.eventType && (
                    <FormHelperText>{formErrors.eventType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!formErrors.eventOrganizerBatch} required>
                  <InputLabel>Organizer Batch</InputLabel>
                  <Select
                    name="eventOrganizerBatch"
                    value={formData.eventOrganizerBatch}
                    onChange={handleInputChange}
                    label="Organizer Batch"
                  >
                    {BatchOptions.map((batch) => (
                      <MenuItem key={batch} value={batch}>
                        {batch}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.eventOrganizerBatch && (
                    <FormHelperText>{formErrors.eventOrganizerBatch}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="eventStatus"
                    value={formData.eventStatus}
                    onChange={handleInputChange}
                    label="Status"
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
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  placeholder="Enter activity description..."
                />
              </Grid>

              {/* Banner Upload Section */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Event Banner
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload a banner image for the activity. Recommended size: 1200x400 pixels. Max size: 5MB.
                </Typography>

                {bannerPreview ? (
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      style={{
                        width: '100%',
                        maxHeight: 300,
                        borderRadius: 8,
                        objectFit: 'cover'
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'error.light' }
                      }}
                      onClick={handleRemoveBanner}
                      size="small"
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ) : (
                  <BannerUploadBox>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      style={{ display: 'none' }}
                      id="banner-upload"
                    />
                    <label htmlFor="banner-upload" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                      {uploadingBanner ? (
                        <CircularProgress size={40} />
                      ) : (
                        <>
                          <CloudUpload sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                          <Typography variant="body1" gutterBottom>
                            Click to upload banner
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            PNG, JPG, GIF up to 5MB
                          </Typography>
                        </>
                      )}
                    </label>
                  </BannerUploadBox>
                )}
              </Grid>

              {/* Gallery Upload Section */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Gallery Images
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload multiple images for the activity gallery. Maximum 20 images. Max size per image: 5MB.
                </Typography>

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<AddPhotoAlternate />}
                  disabled={uploadingGallery || galleryFiles.length >= 20}
                  sx={{ mb: 2 }}
                >
                  Upload Images
                  <VisuallyHiddenInput 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleGalleryUpload}
                  />
                </Button>

                {/* Gallery Preview Grid */}
                {galleryPreviews.length > 0 && (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {galleryPreviews.map((preview, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box sx={{ position: 'relative', paddingBottom: '100%', bgcolor: 'grey.100', borderRadius: 1, overflow: 'hidden' }}>
                          <img
                            src={preview}
                            alt={`Gallery ${index + 1}`}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          <IconButton
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'error.main',
                              color: 'white',
                              '&:hover': { bgcolor: 'error.dark' }
                            }}
                            onClick={() => handleRemoveGalleryImage(index)}
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {galleryFiles.length > 0 && (
                  <Typography variant="caption" color="success.main" sx={{ mt: 2, display: 'block' }}>
                    {galleryFiles.length} image(s) uploaded (Max: 20)
                  </Typography>
                )}
              </Grid>

              {/* Form Actions */}
              <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 2 }}>
                <Button 
                  onClick={handleBack}
                  variant="outlined"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Activity'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

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
  );
}

export default ActivityForm;
