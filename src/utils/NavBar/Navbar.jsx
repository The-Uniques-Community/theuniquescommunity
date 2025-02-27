import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logos/theuniquesCommunity.png";
import { RiMenu3Line } from "react-icons/ri";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import ArticleIcon from "@mui/icons-material/Article";
import ScienceIcon from "@mui/icons-material/Science";

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 270 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          { text: "Home", icon: <HomeIcon />, link: "/" },
          { text: "About Us", icon: <InfoIcon />, link: "/about" },
          { text: "How it started", icon: <WorkIcon />, link: "/howitstarted" },
          { text: "Batches", icon: <SchoolIcon />, link: "/batches" },
          { text: "Training Model", icon: <ScienceIcon />, link: "/training" },
          { text: "Events", icon: <EventIcon />, link: "/events" },
          { text: "Community", icon: <GroupsIcon />, link: "/community-page" },
          { text: "Blogs", icon: <ArticleIcon />, link: "/blogs" },
          { text: "Contact", icon: <ContactMailIcon />, link: "/contact" },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="lg:px-12 py-4 md:px-12 sm:px-8 px-5 flex justify-between items-center shadow-sm">
      {/* <div className='w-full h-full bg-transparent blur-lg absolute'></div> */}
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
          <Link to="/community-page">
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
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Navbar;
