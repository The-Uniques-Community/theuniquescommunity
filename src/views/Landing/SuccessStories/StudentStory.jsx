import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Skeleton
} from '@mui/material';
import {
  School as SchoolIcon,
  Timeline as TimelineIcon,
  PlayCircleOutline as VideoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { styled } from '@mui/system';
import axios from 'axios';
import { BASE_URL } from '@/config';
import ProfileInformation from './ProfileInformation';
import SuccessTimeline from './SuccessTimeline';
import VideoMessage from './VideoMessage';
import { useThemeContext } from '@/theme/ThemeProvider';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '50vh',
  display: 'flex',
  alignItems: 'flex-end',
  padding: '0 3rem',
  paddingBottom: '5rem',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.55)), url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)',
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
  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(202, 0, 25, 0.5)',
    borderColor: '#ff334b',
  },
  [theme.breakpoints.down('md')]: {
    width: '140px',
    height: '140px',
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '100px',
  transition: 'padding-top 0.3s ease',
  [theme.breakpoints.down('md')]: {
    paddingTop: '85px',
  }
}));

const SectionHeading = styled(Typography)({
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
});

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

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

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
  const { isDarkMode } = useThemeContext();
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

  const outletCtx = useOutletContext();
  const rawContextStudents = outletCtx?.students;
  const contextStudents = useMemo(() => rawContextStudents || [], [rawContextStudents]);

  // Initial candidate resolution from dynamic context if already loaded
  const initialStudent = useMemo(() => {
    return contextStudents.find((s) => s.id === studentId || s._id === studentId) || null;
  }, [contextStudents, studentId]);

  const [student, setStudent] = useState(initialStudent);
  const [isLoading, setIsLoading] = useState(!initialStudent);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Check if initial student is already available in context
    const existing = contextStudents.find((s) => s.id === studentId || s._id === studentId);

    if (existing) {
      setStudent(existing);
      setIsLoading(false);
      return;
    }

    const fetchStudentById = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/success-stories/${studentId}`);
        if (isMounted && response.data?.data) {
          setStudent(response.data.data);
          setError(null);
        }
      } catch (err) {
        console.warn("[StudentStory] Failed to fetch story by ID from API:", err);
        if (isMounted) {
          setStudent(null);
          setError("Student story not found");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStudentById();
    return () => {
      isMounted = false;
    };
  }, [studentId, contextStudents]);

  // Loading state placeholder with sleek skeletons
  if (isLoading) {
    return (
      <Box sx={{ width: "100%", pb: 8 }}>
        <Box
          sx={{
            height: "45vh",
            bgcolor: "rgba(0,0,0,0.85)",
            p: 4,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ maxWidth: 800, width: "100%", ml: { xs: 0, md: "190px" } }}>
            <Skeleton variant="text" width="60%" height={56} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
            <Skeleton variant="text" width="40%" height={32} sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} />
            <Skeleton variant="rounded" width={110} height={32} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
          </Box>
        </Box>
        <Box sx={{ p: { xs: 2, md: 5 }, pt: 12 }}>
          <Skeleton variant="rounded" width="100%" height={260} sx={{ borderRadius: 3, mb: 4 }} />
          <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: 3 }} />
        </Box>
      </Box>
    );
  }

  // If no matching student is found after query finishes
  if (!student) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>{error || "Student not found"}</Typography>
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

  const timelineMinWidth = Math.max(900, (student.timeline?.length || 0) * 240);

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
              referrerPolicy="no-referrer"
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
                <StyledTab
                  icon={<VideoIcon />}
                  iconPosition="start"
                  label="Video Message"
                />
              </StyledTabs>
            </Box>

            {/* Profile Information Tab */}
            <TabPanel value={mainTabValue} index={0}>
              <ProfileInformation
                student={student}
                detailTabValue={detailTabValue}
                onDetailTabChange={handleDetailTabChange}
                isMobile={isMobile}
                StyledTabs={StyledTabs}
                StyledTab={StyledTab}
                SectionHeading={SectionHeading}
                DetailCard={DetailCard}
                isDarkMode={isDarkMode}
              />
            </TabPanel>

            {/* Success Timeline Tab - Bauhaus Style */}
            <TabPanel value={mainTabValue} index={1}>
              <SuccessTimeline
                student={student}
                timelineMinWidth={timelineMinWidth}
                SectionHeading={SectionHeading}
                isDarkMode={isDarkMode}
              />
            </TabPanel>

            {/* Video Message Tab */}
            <TabPanel value={mainTabValue} index={2}>
              <VideoMessage 
                student={student} 
                SectionHeading={SectionHeading} 
                isDarkMode={isDarkMode} 
              />
            </TabPanel>

          </motion.div>
        </Box>
      </ContentWrapper>
    </Box>
  );
};

export default StudentStory;
