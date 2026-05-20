import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import logo from "@/assets/logos/uniqueswhite.png";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: 'calc(100vh - 84px)',
  position: 'fixed',
  left: 0,
  top: '84px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(22, 22, 22, 0.95)' : 'rgba(255, 255, 255, 0.95)',
  color: theme.palette.text.primary,
  borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 90,
  transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',

  [theme.breakpoints.down('md')]: {
    position: 'relative',
    top: 0,
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(22, 22, 22, 0.98)' : 'rgba(255, 255, 255, 0.98)',
  }
}));

const ListContainer = styled(List)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  paddingBottom: '16px',

  // Custom scrollbar styling for the list specifically
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#ca0019',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
  },
  // Firefox scrollbar
  scrollbarWidth: 'thin',
  scrollbarColor: '#ca0019 transparent',
}));

const LogoSection = styled(Box)(({ theme }) => ({
  padding: '20px',
  textAlign: 'center',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
  transition: 'border-color 0.3s ease',
}));

const Logo = styled('img')(({ theme }) => ({
  width: '80%',
  maxWidth: 180,
  margin: '0 auto',
  filter: theme.palette.mode === 'light' ? 'invert(1) brightness(0.1)' : 'none',
  transition: 'filter 0.3s ease',
}));

const HeaderWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '20px'
});

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  cursor: 'pointer',
  backgroundColor: active 
    ? (theme.palette.mode === 'dark' ? 'rgba(202, 0, 25, 0.15)' : 'rgba(202, 0, 25, 0.08)')
    : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(202, 0, 25, 0.1)' : 'rgba(202, 0, 25, 0.04)',
  },
  borderLeft: active ? '4px solid #ca0019' : '4px solid transparent',
  transition: 'background-color 0.2s ease',
}));

const SocialSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: '20px',
  borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
  textAlign: 'center',
  transition: 'border-color 0.3s ease',
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
  margin: '0 8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#ca0019',
    transform: 'translateY(-2px)',
  }
}));

const Sidebar = ({ students, onDrawerToggle, isDrawerOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop();

  const handleHomeClick = () => {
    navigate('/');
    if (onDrawerToggle) onDrawerToggle();
  };

  return (
    <SidebarContainer open={isDrawerOpen}>
      <LogoSection>
        <Logo src={logo} alt="The Uniques Community" />
        <HeaderWrapper>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ca0019', textAlign: 'start' }}>
            Success Stories
          </Typography>
          <Tooltip title="Back to home" placement="right">
            <IconButton 
              onClick={handleHomeClick}
              sx={{ 
                color: 'inherit', 
                opacity: 0.8,
                '&:hover': { color: '#ca0019', opacity: 1 },
                padding: '4px'
              }}
            >
              <HomeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </HeaderWrapper>
      </LogoSection>

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Explore inspiring journeys of our community members who have achieved remarkable success in their careers.
        </Typography>
      </Box>

      <Divider sx={{ opacity: theme => theme.palette.mode === 'dark' ? 0.1 : 0.08 }} />

      <ListContainer>
        {students.map((student) => (
          <StyledListItem
            key={student.id}
            component={Link}
            to={`/success-stories/${student.id}`}
            active={currentPath === student.id ? 1 : 0}
            onClick={() => onDrawerToggle && onDrawerToggle()}
          >
            <ListItemAvatar>
              <Avatar src={student.image} alt={student.name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: currentPath === student.id ? 700 : 500,
                    color: currentPath === student.id ? '#ca0019' : 'text.primary',
                    transition: 'color 0.2s ease',
                    fontSize: '0.95rem'
                  }}
                >
                  {student.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mt: 0.5 }}>
                  {student.batch} • {student.role}
                </Typography>
              }
            />
          </StyledListItem>
        ))}
      </ListContainer>

      <SocialSection>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Connect with The Uniques Community
        </Typography>
        <Box>
          <SocialIcon size="small" aria-label="LinkedIn">
            <LinkedInIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon size="small" aria-label="Twitter">
            <TwitterIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon size="small" aria-label="Instagram">
            <InstagramIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon size="small" aria-label="Facebook">
            <FacebookIcon fontSize="small" />
          </SocialIcon>
        </Box>
      </SocialSection>
    </SidebarContainer>
  );
};

export default Sidebar;
