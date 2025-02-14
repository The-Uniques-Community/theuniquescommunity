import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import InceptionTab from "./InceptionTab";
import useMediaQuery from "@mui/material/useMediaQuery";
import WebDevTab from "./WebDevTab";
import MernTab from "./MernTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function TrainingTabs() {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery("(max-width: 1024px)"); // Breakpoint for switching layout

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="lg:ps-16 px-6">
      <h4 className="text-sm uppercase text-gray-600 mb-2">About Our training</h4>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            A new way to manage your<br /> online money.
          </h2>
      </div>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: isSmallScreen ? "center" : "flex-start",
          flexDirection: isSmallScreen ? "column" : "row", // Change layout based on screen size
        }}
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"} // Switch orientation
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Responsive tabs example"
          sx={{
            borderRight: isSmallScreen ? 0 : 1,
            borderBottom: isSmallScreen ? 1 : 0,
            borderColor: "divider",
            margin: isSmallScreen ? 0 : 10,
          }}
        >
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-I"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-II"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-III"
            {...a11yProps(2)}
          />
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-IV"
            {...a11yProps(3)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <InceptionTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WebDevTab/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MernTab/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Box>
    </div>
  );
}
