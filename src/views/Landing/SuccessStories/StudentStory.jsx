import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { 
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as AchievementIcon,
  Code as CodeIcon,
  Build as ToolsIcon,
  Assignment as ProjectIcon,
  Group as LeadershipIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { successStories } from './successStoriesData';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '50vh',
  display: 'flex',
  alignItems: 'flex-end',
  padding: '0 3rem',
  paddingBottom: '5rem', // Reduced padding to account for smaller image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80)',
  color: 'white',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingBottom: '7rem',
    height: '45vh',
  }
}));

const ProfileImageContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-85px', // Adjusted for smaller image
  left: '8%',
  zIndex: 5,
  [theme.breakpoints.down('md')]: {
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-70px', // Adjusted for smaller image
  }
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: '170px', // Updated to 170px
  height: '170px', // Updated to 170px
  objectFit: 'cover',
  borderRadius: '50%',
  border: '4px solid #ca0019', // Slightly reduced border
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Slightly reduced shadow
  backgroundColor: '#f5f5f5',
  [theme.breakpoints.down('md')]: {
    width: '140px', // Reduced for mobile
    height: '140px', // Reduced for mobile
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '100px', // Adjusted for smaller image
  [theme.breakpoints.down('md')]: {
    paddingTop: '85px', // Adjusted for smaller image
  }
}));

const StyledTimeline = styled(Timeline)(({ theme }) => ({
  padding: theme.spacing(0),
  '& .MuiTimelineItem-root:before': {
    flex: 0,
    padding: 0,
  },
}));

const AchievementListItem = styled(ListItem)({
  paddingLeft: 0,
  paddingRight: 0,
});

const SectionHeading = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: '20px',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '0',
    width: '50px',
    height: '4px',
    backgroundColor: '#ca0019',
  }
}));

const DetailCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[8],
  }
}));

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Styled Tabs
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#ca0019',
    height: 3,
  },
  borderBottom: '1px solid #e0e0e0',
  marginBottom: theme.spacing(1),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  minHeight: 48,
  marginRight: theme.spacing(4),
  '&.Mui-selected': {
    color: '#ca0019',
  },
}));

const StudentStory = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  
  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Find the student with the matching ID
  const student = successStories.find(s => s.id === studentId);
  
  // If no matching student is found, show a message or redirect
  if (!student) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Student not found</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/success-stories')}
        >
          Back to Success Stories
        </Button>
      </Box>
    );
  }
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box>
      <HeroSection>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          style={{ 
            maxWidth: '800px', 
            width: '100%', 
            marginLeft: isMobile ? '0' : '190px', // Adjusted for smaller image
            textAlign: isMobile ? 'center' : 'left' 
          }}
        >
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {student.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {student.role} at {student.company}
            </Typography>
            <Chip 
              label={student.batch} 
              size="small" 
              sx={{ mt: 1, bgcolor: '#ca0019', color: 'white' }} 
            />
          </Box>
        </motion.div>
        
        {/* Profile image with updated size */}
        <ProfileImageContainer>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            <ProfileImage 
              src={student.image} 
              alt={student.name}
            />
          </motion.div>
        </ProfileImageContainer>
      </HeroSection>
      
      <ContentWrapper>
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {/* Overview Section */}
              <Grid item xs={12}>
                <DetailCard elevation={3}>
                  <SectionHeading variant="h5">Journey Overview</SectionHeading>
                  <Typography variant="body1" paragraph sx={{ mt: 3 }}>
                    {student.summary}
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WorkIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Current Role</Typography>
                          </Box>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {student.role} at {student.company}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SchoolIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Education</Typography>
                          </Box>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {student.education?.degree || student.batch}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AchievementIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Key Achievement</Typography>
                          </Box>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {student.leadership?.achievements?.[0] || student.timeline.slice(-1)[0].achievements[0]}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </DetailCard>
              </Grid>
              
              {/* Tabbed section for Education, Experience, and Projects */}
              <Grid item xs={12}>
                <DetailCard elevation={3}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <StyledTabs 
                      value={tabValue} 
                      onChange={handleTabChange} 
                      variant={isMobile ? "scrollable" : "standard"}
                      scrollButtons={isMobile ? "auto" : false}
                    >
                      <StyledTab 
                        icon={<SchoolIcon />} 
                        iconPosition="start" 
                        label="Education" 
                      />
                      <StyledTab 
                        icon={<WorkIcon />} 
                        iconPosition="start" 
                        label="Professional Experience" 
                      />
                      <StyledTab 
                        icon={<ProjectIcon />} 
                        iconPosition="start" 
                        label="Notable Projects" 
                      />
                    </StyledTabs>
                  </Box>
                  
                  {/* Education Tab */}
                  <TabPanel value={tabValue} index={0}>
                    {student.education && (
                      <Box>
                        <Typography variant="h6">{student.education.institution}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{student.education.degree}</Typography>
                        <Typography variant="body2" sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                          <span>{student.education.duration}</span>
                          <span>{student.education.location}</span>
                        </Typography>
                        {student.education.details && (
                          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                            {student.education.details}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </TabPanel>
                  
                  {/* Professional Experience Tab */}
                  <TabPanel value={tabValue} index={1}>
                    {student.experience && student.experience.length > 0 ? (
                      student.experience.map((exp, index) => (
                        <Box key={index} sx={{ mb: index < student.experience.length - 1 ? 4 : 0 }}>
                          <Typography variant="h6">{exp.company}</Typography>
                          <Typography variant="subtitle1" color="text.secondary">{exp.role}</Typography>
                          <Typography variant="body2" sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <span>{exp.duration}</span>
                            <span>{exp.location}</span>
                          </Typography>
                          
                          {exp.responsibilities && (
                            <List dense sx={{ mt: 1 }}>
                              {exp.responsibilities.map((resp, idx) => (
                                <ListItem key={idx} sx={{ pl: 0 }}>
                                  <ListItemIcon sx={{ minWidth: 28 }}>
                                    <AchievementIcon color="primary" fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary={resp} />
                                </ListItem>
                              ))}
                            </List>
                          )}
                          
                          {index < student.experience.length - 1 && <Divider sx={{ my: 2 }} />}
                        </Box>
                      ))
                    ) : (
                      <Typography color="text.secondary">No professional experience listed.</Typography>
                    )}
                  </TabPanel>
                  
                  {/* Projects Tab */}
                  <TabPanel value={tabValue} index={2}>
                    {student.projects && student.projects.length > 0 ? (
                      <Grid container spacing={3}>
                        {student.projects.map((project, index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                              <CardContent>
                                <Typography variant="h6">{project.name}</Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                                  {project.date} • {project.technologies}
                                </Typography>
                                <Typography variant="body2" paragraph>{project.description}</Typography>
                                
                                <Typography variant="subtitle2" color="primary" gutterBottom>Key Achievements:</Typography>
                                <List dense>
                                  {project.achievements.map((achievement, idx) => (
                                    <ListItem key={idx} sx={{ pl: 0 }}>
                                      <ListItemIcon sx={{ minWidth: 28 }}>
                                        <AchievementIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary={achievement} />
                                    </ListItem>
                                  ))}
                                </List>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography color="text.secondary">No projects listed.</Typography>
                    )}
                  </TabPanel>
                </DetailCard>
              </Grid>
              
              {/* Technical Skills */}
              {student.skills && (
                <Grid item xs={12}>
                  <DetailCard elevation={3}>
                    <SectionHeading variant="h5">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CodeIcon sx={{ mr: 1 }} />
                        Technical Skills
                      </Box>
                    </SectionHeading>
                    
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                      {student.skills.languages && (
                        <Grid item xs={12} md={4}>
                          <Typography variant="h6" gutterBottom>Languages</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {student.skills.languages.map((lang, idx) => (
                              <Chip 
                                key={idx} 
                                label={lang} 
                                color="primary" 
                                variant="outlined" 
                                size="small"
                              />
                            ))}
                          </Box>
                        </Grid>
                      )}
                      
                      {student.skills.technologies && (
                        <Grid item xs={12} md={4}>
                          <Typography variant="h6" gutterBottom>Technologies & Frameworks</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {student.skills.technologies.map((tech, idx) => (
                              <Chip 
                                key={idx} 
                                label={tech} 
                                color="primary" 
                                variant="outlined" 
                                size="small"
                              />
                            ))}
                          </Box>
                        </Grid>
                      )}
                      
                      {student.skills.tools && (
                        <Grid item xs={12} md={4}>
                          <Typography variant="h6" gutterBottom>Developer Tools</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {student.skills.tools.map((tool, idx) => (
                              <Chip 
                                key={idx} 
                                label={tool} 
                                color="primary" 
                                variant="outlined" 
                                size="small"
                              />
                            ))}
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </DetailCard>
                </Grid>
              )}
              
              {/* Leadership */}
              {student.leadership && (
                <Grid item xs={12}>
                  <DetailCard elevation={3}>
                    <SectionHeading variant="h5">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LeadershipIcon sx={{ mr: 1 }} />
                        Leadership & Extracurricular
                      </Box>
                    </SectionHeading>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6">{student.leadership.organization}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">{student.leadership.role}</Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>{student.leadership.duration}</Typography>
                      
                      <List dense sx={{ mt: 2 }}>
                        {student.leadership.achievements.map((achievement, idx) => (
                          <ListItem key={idx} sx={{ pl: 0 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <AchievementIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={achievement} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </DetailCard>
                </Grid>
              )}
            </Grid>
            
            <SectionHeading variant="h5" sx={{ mt: 5, mb: 3 }}>Success Timeline</SectionHeading>
            
            <StyledTimeline position="alternate">
              {student.timeline.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent sx={{ py: '12px', px: 2 }}>
                    <motion.div variants={itemVariants}>
                      <Typography variant="h6" component="span" color="primary">
                        {item.year}
                      </Typography>
                    </motion.div>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {index < student.timeline.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <motion.div variants={itemVariants}>
                      <Paper elevation={3} sx={{ p: 3 }}>
                        <List dense>
                          {item.achievements.map((achievement, idx) => (
                            <AchievementListItem key={idx}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <AchievementIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={achievement} />
                            </AchievementListItem>
                          ))}
                        </List>
                      </Paper>
                    </motion.div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </StyledTimeline>
            
            <Paper elevation={3} sx={{ 
              p: 4, 
              mt: 5, 
              mb: 4,
              backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              color: 'white',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>
                Follow in {student.name.split(' ')[0]}'s Footsteps
              </Typography>
              <Typography paragraph>
                Join The Uniques Community today and embark on your journey to professional excellence. 
                Our comprehensive programs, mentorship opportunities, and vibrant network await you.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
              >
                JOIN NOW
              </Button>
            </Paper>
          </motion.div>
        </Box>
      </ContentWrapper>
    </Box>
  );
};

export default StudentStory;