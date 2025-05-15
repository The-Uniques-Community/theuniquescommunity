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
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as AchievementIcon,
  Code as CodeIcon,
  Build as ToolsIcon,
  Assignment as ProjectIcon,
  Group as LeadershipIcon,
  Timeline as TimelineIcon
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
  paddingBottom: '5rem',
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
  bottom: '-85px',
  left: '8%',
  zIndex: 5,
  [theme.breakpoints.down('md')]: {
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-70px',
  }
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: '170px',
  height: '170px',
  objectFit: 'cover',
  borderRadius: '50%',
  border: '4px solid #ca0019',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  backgroundColor: '#f5f5f5',
  [theme.breakpoints.down('md')]: {
    width: '140px',
    height: '140px',
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '100px',
  [theme.breakpoints.down('md')]: {
    paddingTop: '85px',
  }
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

// New Timeline Components
const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '40px',
  paddingBottom: '60px',
  marginTop: '20px',
  marginBottom: '40px',
}));

const TimelineLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '5px',
  backgroundColor: '#ca0019',
  top: '50px',
  left: 0,
  zIndex: 0,
}));

const TimelinePoint = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '24px',
  height: '24px',
  backgroundColor: '#ca0019',
  borderRadius: '50%',
  top: '40px',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 0 4px #fff',
}));

const TimelineEvent = styled(Paper)(({ theme, position }) => ({
  position: 'absolute',
  width: '280px',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: '#fff',
  boxShadow: theme.shadows[3],
  top: position === 'top' ? '-180px' : '80px',
  transform: 'translateX(-50%)',
  zIndex: 2,
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: 'inherit',
    boxShadow: 'inherit',
    transform: 'rotate(45deg)',
    top: position === 'top' ? '100%' : '-10px',
    left: '50%',
    marginLeft: '-10px',
  }
}));

const TimelineYear = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontWeight: 'bold',
  fontSize: '24px',
  color: '#000',
  transform: 'translateX(-50%)',
  top: '15px',
}));

const StudentStory = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mainTabValue, setMainTabValue] = useState(0);
  const [detailTabValue, setDetailTabValue] = useState(0);
  
  // Tab change handlers
  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
  };
  
  const handleDetailTabChange = (event, newValue) => {
    setDetailTabValue(newValue);
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
            marginLeft: isMobile ? '0' : '190px',
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
            {/* Main tabs for Profile and Timeline */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <StyledTabs 
                value={mainTabValue} 
                onChange={handleMainTabChange} 
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
              >
                <StyledTab 
                  icon={<SchoolIcon />} 
                  iconPosition="start" 
                  label="Profile Information" 
                />
                <StyledTab 
                  icon={<TimelineIcon />} 
                  iconPosition="start" 
                  label="Success Timeline" 
                />
              </StyledTabs>
            </Box>
            
            {/* Profile Information Tab */}
            <TabPanel value={mainTabValue} index={0}>
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
                        value={detailTabValue} 
                        onChange={handleDetailTabChange} 
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
                    <TabPanel value={detailTabValue} index={0}>
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
                    <TabPanel value={detailTabValue} index={1}>
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
                    <TabPanel value={detailTabValue} index={2}>
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
                                  sx={{ 
                                    bgcolor: '#000', 
                                    color: '#fff', 
                                    borderColor: '#000' 
                                  }}
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
                                  variant="outlined" 
                                  sx={{ 
                                    color: '#000', 
                                    borderColor: '#ca0019' 
                                  }}
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
                                  sx={{ 
                                    bgcolor: '#ca0019', 
                                    color: '#fff' 
                                  }}
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
            </TabPanel>
            
            {/* Success Timeline Tab - Bauhaus Style */}
            <TabPanel value={mainTabValue} index={1}>
              <Box sx={{ position: 'relative', minHeight: '600px' }}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 4, 
                    mb: 4,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <SectionHeading variant="h5">Success Timeline</SectionHeading>
                  <Typography variant="body1" paragraph sx={{ maxWidth: '700px' }}>
                    Follow {student.name.split(' ')[0]}'s journey from education to professional success, 
                    highlighting key milestones and achievements along the way.
                  </Typography>
                  
                  {/* Timeline container */}
                  <Box sx={{ position: 'relative', mt: 8, mb: 8 }}>
                    {/* Main Timeline path - horizontal line with flowing sections */}
                    <Box sx={{ 
                      position: 'relative',
                      height: '500px',
                      width: '100%',
                    }}>
                      {/* Vertical timeline sidebar */}
                      <Box sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '120px',
                        height: '100%',
                        borderRight: '1px solid #e0e0e0',
                        bgcolor: '#f5f5f5',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                      }}>
                        {student.timeline.map((item, index) => (
                          <Box key={index} sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: index < student.timeline.length - 1 ? '1px solid #e0e0e0' : 'none',
                            position: 'relative',
                          }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 'bold',
                                color: '#000',
                              }}
                            >
                              {item.year}
                            </Typography>
                            {/* Connection dot */}
                            <Box sx={{
                              position: 'absolute',
                              right: '-6px',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              bgcolor: '#ca0019',
                              zIndex: 3,
                            }} />
                          </Box>
                        ))}
                      </Box>
                      
                      {/* Main flowing timeline path */}
                      <Box sx={{
                        position: 'absolute',
                        left: '120px',
                        top: '30px',
                        bottom: '30px',
                        right: '20px',
                      }}>
                        {/* The flowing line connecting all events */}
                        <svg 
                          width="100%" 
                          height="100%" 
                          viewBox="0 0 800 440"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                          }}
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,50 C100,50 120,150 180,150 S260,50 320,50 S400,150 460,150 S540,50 600,50 S680,150 740,150 S820,50 880,50"
                            stroke="#ca0019"
                            strokeWidth="4"
                            fill="none"
                          />
                        </svg>
                        
                        {/* Content boxes for each achievement */}
                        {student.timeline.map((item, timelineIndex) => (
                          <React.Fragment key={timelineIndex}>
                            <Box sx={{
                              position: 'absolute',
                              left: `${timelineIndex * (100 / (student.timeline.length - 1))}%`,
                              top: timelineIndex % 2 === 0 ? '160px' : '50px',
                              transform: 'translateX(-50%)',
                              zIndex: 2,
                              width: '250px',
                            }}>
                              {/* Circle at connection point */}
                              <Box sx={{
                                position: 'absolute',
                                top: timelineIndex % 2 === 0 ? '-30px' : 'auto',
                                bottom: timelineIndex % 2 === 0 ? 'auto' : '-30px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                bgcolor: '#ca0019',
                                border: '4px solid white',
                                boxShadow: '0 0 0 1px #ca0019',
                                zIndex: 3,
                              }} />
                              
                              {/* Content card */}
                              <Paper 
                                elevation={3}
                                sx={{
                                  p: 2,
                                  bgcolor: 'white',
                                  position: 'relative',
                                }}
                              >
                                <Typography variant="h6" sx={{ color: '#ca0019', mb: 1 }}>
                                  {item.year}
                                </Typography>
                                <List dense sx={{ p: 0 }}>
                                  {item.achievements.map((achievement, idx) => (
                                    <ListItem key={idx} sx={{ pl: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 28 }}>
                                        <AchievementIcon sx={{ color: '#000', fontSize: 16 }} />
                                      </ListItemIcon>
                                      <ListItemText 
                                        primary={achievement}
                                        primaryTypographyProps={{ 
                                          variant: 'body2', 
                                          sx: { fontSize: '0.9rem' } 
                                        }}
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              </Paper>
                            </Box>
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Paper>
                
                {/* Call to action at the bottom */}
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
                    sx={{ 
                      mt: 2,
                      bgcolor: '#ca0019',
                      '&:hover': {
                        bgcolor: '#a50014',
                      }
                    }}
                  >
                    JOIN NOW
                  </Button>
                </Paper>
              </Box>
            </TabPanel>
          </motion.div>
        </Box>
      </ContentWrapper>
    </Box>
  );
};

export default StudentStory;