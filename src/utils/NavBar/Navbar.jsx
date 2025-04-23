import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logos/theuniquesCommunity.png";
import { RiMenu3Line } from "react-icons/ri";
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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LogIn, LogOut } from "lucide-react"; // Add LogOut import
// Add this to your imports at the top
import DashboardIcon from "@mui/icons-material/Dashboard";
import axios from "axios"; // For logout API call
import { set } from "date-fns";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState("");
  const [user, setUser] = useState({}); // State to hold user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check if user is logged in
  const checkAuthStatus = async () => {
    // Check for token in localStorage or sessionStorage
    try {
      // Call the backend endpoint that verifies the role using the verifyRole middleware
     const response = await axios.get(`https://theuniquesbackend.vercel.app/auth/verify_user`, {
        withCredentials: true,
      });
      setUser(response?.data.user); // Set user data from response
      console.log(response?.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      // If the error is due to token expiry or invalid token, automatically log out
      setUser({}); // Clear user data
      await handleLogout();

      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://theuniquesbackend.vercel.app/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser({}); // Clear user data
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Dynamically generate navItems based on auth status
  const generateNavItems = () => {
    // Base navigation items that are always shown
    const baseItems = [
      { text: "Home", icon: <HomeIcon />, link: "/" },
      { text: "About Us", icon: <InfoIcon />, link: "/about" },
      { text: "How it started", icon: <WorkIcon />, link: "/howitstarted" },
      { text: "Batches", icon: <SchoolIcon />, link: "/batches" },
      { text: "Training Model", icon: <ScienceIcon />, link: "/training" },
      { text: "Success Stories", icon: <CheckCircleIcon />, link: "/success-stories" },
      { text: "Events", icon: <EventIcon />, link: "/events" },
      { text: "Community", icon: <GroupsIcon />, link: "/community-main" },
      { text: "Blogs", icon: <ArticleIcon />, link: "/blogs" },
      { text: "Contact", icon: <ContactMailIcon />, link: "/contact" },
    ];

    if (isLoggedIn) {
      baseItems.push({
        text: "Dashboard",
        icon: <DashboardIcon />,
        link: `/${user?.role}`,
      });

      // Add logout button after dashboard
      baseItems.push({
        text: "Logout",
        icon: <LogOut />,
        onClick: handleLogout,
        link: "#", // Dummy link as we'll handle with onClick
      });
    } else {
      baseItems.push({
        text: "Login",
        icon: <LogIn />,
        link: "/auth/login",
      });
    }

    return baseItems;
  };

  // Get nav items based on auth status
  const navItems = generateNavItems();

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
      link: "https://www.instagram.com/theuniquesofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      color: "#E4405F",
      name: "Instagram",
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: 270,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <List
        sx={{ flexGrow: 1 }}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {navItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                component={item.onClick ? "button" : Link}
                to={!item.onClick ? item.link : undefined}
                onClick={() => {
                  handleLinkClick(item.text);
                  if (item.onClick) item.onClick();
                }}
                sx={{
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  pl: 2,
                  "&:hover": {
                    backgroundColor: "#CA0019",
                    color: "#fff",
                    pl: 3,
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                    "& .MuiTypography-root": {
                      transform: "translateX(10px)",
                      transition: "transform 0.3s ease",
                    },
                  },
                  ...(activeLink === item.text && {
                    backgroundColor: "#CA0019",
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                    "& .MuiTypography-root": {
                      transform: "translateX(10px)",
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "45px",
                    color: activeLink === item.text ? "#fff" : "inherit",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    transition: "transform 0.3s ease",
                    transform:
                      activeLink === item.text
                        ? "translateX(10px)"
                        : "translateX(0)",
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* Add divider after Contact item */}
            {item.text === "Contact" && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </List>

      {/* Social Media Section at Bottom */}
      <Box sx={{ p: 2, mt: "auto" }}>
        <Divider sx={{ mb: 2 }} />
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1.5,
            paddingLeft: 1,
            fontWeight: 500,
            color: "text.secondary",
            textAlign: "start",
          }}
        >
          Connect With Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            gap: 2,
          }}
        >
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50%",

                  color: social.color,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: social.color,
                    color: "white",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {social.icon}
              </Box>
            </a>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <div className="lg:px-12 py-4 md:px-12 sm:px-8 px-5 flex justify-between sticky top-0 z-[100] bg-white bg-opacity-90 items-center shadow-sm backdrop-blur-sm">
      <div>
        <div className="grid grid-cols-6 gap-x-5">
          <div className="lg:col-span-2 md:col-span-2 sm:col-span-4 col-span-5">
            <Link to={"/"}>
              <img
                src={logo}
                className="w-40 object-contain object-left"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="col-span-1"></div>
          <Link to="/about">
            <div className="lg:block md:block lg:col-span-1 md:col-span-1 sm:hidden hidden text-center self-center px-3 py-2 rounded-full hover:bg-slate-100 duration-75">
              <span>ABOUT US</span>
            </div>
          </Link>
          <Link to="/community-main">
            <div className="lg:block md:block lg:col-span-1 md:col-span-1 sm:hidden hidden text-center self-center px-3 py-2 rounded-full hover:bg-slate-100 duration-75">
              <span>COMMUNITY</span>
            </div>
          </Link>
          <Link to="/events">
            <div className="lg:block md:block lg:col-span-1 md:col-span-1 sm:hidden hidden text-center self-center px-3 py-2 rounded-full hover:bg-slate-100 duration-75">
              <span>EVENTS</span>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div
          className="rounded-full hover:bg-slate-100 duration-75 cursor-pointer"
          onClick={toggleDrawer(true)}
        >
          <div className="h-12 w-12 flex items-center justify-center">
            <RiMenu3Line
              size={30}
              className="inline-block mx-auto"
              color="black"
            />
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
          "& .MuiPaper-root": { boxShadow: "0 0 15px rgba(0,0,0,0.1)" },
          overflow: "hidden",
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Navbar;