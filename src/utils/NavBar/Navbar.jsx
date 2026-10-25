import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/theuniquesCommunity.png";
import darkLogo from "../../assets/logos/theuniquesCommunity copy.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import ArticleIcon from "@mui/icons-material/Article";
import ScienceIcon from "@mui/icons-material/Science";
import TimelineIcon from "@mui/icons-material/Timeline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ExternalLink, ChevronRight, Sun, Moon } from "lucide-react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PORTAL_URL } from "@/config";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../../theme/ThemeProvider";

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState("");
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeContext();

  // Dynamically generate navItems
  const generateNavItems = () => {
    // Base navigation items that are always shown
    const baseItems = [
      { text: "Home", icon: <HomeIcon />, link: "/" },
      { text: "About Us", icon: <InfoIcon />, link: "/about" },
      { text: "Community", icon: <GroupsIcon />, link: "/community-main" },
      { text: "Events", icon: <EventIcon />, link: "/events" },
      { text: "Projects", icon: <WorkIcon />, link: "/projects" },
      { text: "How it started", icon: <TimelineIcon />, link: "/howitstarted" },
      { text: "Batches", icon: <SchoolIcon />, link: "/batches" },
      { text: "Training Model", icon: <ScienceIcon />, link: "/training" },
      { text: "Success Stories", icon: <CheckCircleIcon />, link: "/success-stories" },
      { text: "Blogs", icon: <ArticleIcon />, link: "/blogs" },
      { text: "Contact", icon: <ContactMailIcon />, link: "/contact" },
    ];

    const authItems = [
      {
        text: "Open Portal",
        icon: <ExternalLink size={20} />,
        link: PORTAL_URL,
      },
    ];

    return { baseItems, authItems };
  };

  // Helper to determine if an item is active
  const isItemActive = (item) => {
    if (activeLink === item.text) return true;
    if (item.link === "/" && location.pathname === "/") return true;
    if (item.link !== "/" && (location.pathname === item.link || location.pathname.startsWith(`${item.link}/`))) return true;
    return false;
  };

  // Get nav items based on auth status
  const { baseItems: mainNavItems, authItems: authNavItems } = generateNavItems();


  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLinkClick = (linkText) => {
    setActiveLink(linkText);
    setDrawerOpen(false);
  };

  // Social media links - update these URLs with actual links
  const socialLinks = [
    {
      icon: <WhatsAppIcon />,
      link: "https://chat.whatsapp.com/HYOloogGXKcIkR83DnOjFj",
      color: "#25D366",
      name: "WhatsApp",
    },
    {
      icon: <LinkedInIcon />,
      link: "https://www.linkedin.com/company/theuniquesofflicial",
      color: "#0A66C2",
      name: "LinkedIn",
    },
    {
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/theuniquescommunity/",
      color: "#E4405F",
      name: "Instagram",
    },
  ];

  const drawerContent = (
    <Box
      data-lenis-prevent
      sx={{
        width: { xs: 'calc(100vw - 32px)', sm: 280 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "hidden",
        background: isDarkMode ? "rgba(30, 30, 30, 0.98)" : "rgba(255, 248, 248, 0.98)", // Dynamic tint based on mode
        backdropFilter: "blur(25px)",
      }}
      role="presentation"

    >
      {/* Drawer Header */}
      <Box sx={{ pt: 2, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
        <motion.div
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDrawer(false)}
          className="p-2 rounded-full hover:bg-red-50 cursor-pointer transition-colors text-neutral-500 hover:text-red-600"
        >
          <RiCloseLine size={24} />
        </motion.div>

      </Box>

      <List
        data-lenis-prevent
        sx={{ 
          flexGrow: 1, 
          minHeight: 0,
          px: 2, 
          pt: 1, 
          pb: 2,
          overflowY: "auto",
          overscrollBehavior: "contain",
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        onKeyDown={toggleDrawer(false)}
      >
        <AnimatePresence>
          {mainNavItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={item.onClick ? "button" : Link}
                  to={!item.onClick ? item.link : undefined}
                  onClick={() => {
                    handleLinkClick(item.text);
                    if (item.onClick) item.onClick();
                  }}
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    py: 1.6,
                    mb: 0.8,
                    px: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    "&::before": {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      backgroundColor: '#CA0019',
                      transform: isItemActive(item) ? 'scaleY(0.6)' : 'scaleY(0)',
                      transition: 'transform 0.3s ease',
                      borderRadius: '0 4px 4px 0',
                    },
                    "&:hover": {
                      backgroundColor: "rgba(202, 0, 25, 0.04)",
                      transform: "translateX(4px)",
                      "& .MuiListItemIcon-root": { color: "#CA0019", transform: "scale(1.1)" },
                      "& .MuiTypography-root": { color: "#CA0019", fontWeight: 600 },
                    },
                    ...(isItemActive(item) && {
                      backgroundColor: "rgba(202, 0, 25, 0.08)",
                      boxShadow: '0 4px 12px rgba(202, 0, 25, 0.1)',
                      "& .MuiListItemIcon-root": { color: "#CA0019" },
                      "& .MuiTypography-root": { color: "#CA0019", fontWeight: 600 },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      color: isItemActive(item) ? "#CA0019" : (isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)"),
                      transition: "color 0.2s ease",
                      "& .MuiSvgIcon-root": { fontSize: "1.2rem" }
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.85rem",
                      fontWeight: isItemActive(item) ? 600 : 500,
                      color: isItemActive(item) ? "#CA0019" : (isDarkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)"),
                      letterSpacing: "0.01em",
                    }}
                  />
                  {isItemActive(item) && (
                    <motion.div layoutId="active-indicator">
                      <ChevronRight size={16} color="#CA0019" />
                    </motion.div>
                  )}
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>

      {/* Auth & Actions Section (Fixed) */}
      <Box sx={{ px: 2, pb: 2, flexShrink: 0 }}>
        {authNavItems.length > 0 && <Divider sx={{ mb: 3, opacity: 0.5 }} />}
        {authNavItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={item.onClick ? "button" : (item.link?.startsWith("http") ? "a" : Link)}
              to={!item.onClick && !item.link?.startsWith("http") ? item.link : undefined}
              href={!item.onClick && item.link?.startsWith("http") ? item.link : undefined}
              target={item.link?.startsWith("http") ? "_blank" : undefined}
              rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={() => {
                if (item.onClick) item.onClick();
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: "8px",
                py: 1.5,
                backgroundColor: (item.text === "Login" || item.text === "Open Portal") ? "#CA0019" : "rgba(0,0,0,0.03)",
                color: (item.text === "Login" || item.text === "Open Portal") ? "white" : "text.primary",
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
                "&::before": {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 0,
                  height: '100%',
                  backgroundColor: 'black',
                  transition: 'width 0.4s ease-in-out',
                  zIndex: -1,
                },
                "&:hover": {
                  color: "white",
                  "&::before": {
                    width: '100%',
                  },
                  "& .MuiListItemIcon-root": { color: "white" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Connect With Us Section */}
        <Divider sx={{ my: 3, opacity: 0.5 }} />
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary', textAlign: 'center' }}>
          Connect with us
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.04)',
                color: social.color,
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${social.color}15`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'}
            >
              {social.icon}
            </motion.a>
          ))}
        </Box>
      </Box>

    </Box>
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="lg:px-8 xl:px-16 py-4 md:px-8 sm:px-6 px-5 grid grid-cols-2 lg:grid-cols-3 sticky top-0 z-[100] bg-white/80 dark:bg-neutral-900/80 border-b border-white/20 dark:border-neutral-800/50 items-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-start">
        <Link to={"/"} className="group">
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            src={isDarkMode ? darkLogo : logo}
            className="w-40 object-contain object-left filter drop-shadow-sm transition-all duration-300 group-hover:brightness-110"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Desktop Links - Centered */}
      <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 whitespace-nowrap">
        {[
          { name: "ABOUT US", path: "/about" },
          { name: "COMMUNITY", path: "/community-main" },
          { name: "EVENTS", path: "/events" },
          { name: "PROJECTS", path: "/projects" },
        ].map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(`${item.path}/`));
          return (
            <Link key={item.name} to={item.path} className="group px-3.5 xl:px-5 py-2.5 whitespace-nowrap shrink-0">
              <div className="relative inline-block whitespace-nowrap">
                <motion.span 
                  whileHover={{ scale: 1.02 }}
                  className={`relative z-10 text-sm font-bold tracking-wider transition-colors duration-300 whitespace-nowrap ${
                    isActive 
                      ? "text-red-600 dark:text-red-500" 
                      : "text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-500"
                  }`}
                >
                  {item.name}
                </motion.span>
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 flex items-center justify-center"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-700" />}
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
          onClick={toggleDrawer(!isDrawerOpen)}
        >
          {isDrawerOpen ? (
            <RiCloseLine size={24} className="text-black dark:text-white" />
          ) : (
            <RiMenu3Line size={24} className="text-black dark:text-white" />
          )}
        </motion.div>
      </div>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        transitionDuration={{ enter: 500, exit: 400 }}
        sx={{
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box",
            m: { xs: 1, sm: 2 },
            height: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 32px)' },
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(202, 0, 25, 0.1)',
            border: '1px solid rgba(202, 0, 25, 0.05)',
            background: isDarkMode ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.98), rgba(20, 20, 20, 0.95))' : 'linear-gradient(135deg, rgba(255, 252, 252, 0.98), rgba(255, 245, 245, 0.95))',
            overflow: "hidden",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          },

          "& .MuiBackdrop-root": {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
        PaperProps={{
          "data-lenis-prevent": true,
        }}
      >
        <motion.div
          initial={{ x: 300, opacity: 0, rotate: 5, scale: 0.9 }}
          animate={isDrawerOpen ? { x: 0, opacity: 1, rotate: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        >
          {drawerContent}
        </motion.div>
      </Drawer>
    </motion.nav>
  );
};

export default Navbar;
