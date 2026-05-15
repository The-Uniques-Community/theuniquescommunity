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
import AndroidTab from "./AndroidTab";
import GenAiTab from "./GenAiTab";
import { useThemeContext } from "@/theme/ThemeProvider";

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
        <Box sx={{ p: { xs: 1, md: 3 } }}>
          <Typography component="div">{children}</Typography>
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
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const { isDarkMode } = useThemeContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={`py-16 transition-colors duration-500 ${isDarkMode ? 'bg-[#161616]' : 'bg-white'}`}>
      <div className="w-[85%] mx-auto flex flex-col align-middle justify-start">
        <div className="flex mb-5 items-center">
          <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
          <h1 className={`text-sm md:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>TRAINING MODULES</h1>
        </div>
        <h1 className={`text-2xl md:text-4xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Elevate Your Skills with
          <span className="text-[#ca0019] text-2xl md:text-5xl md:py-2 block mb-5">
            Expert-Led Programs
          </span>
        </h1>
      </div>

      <Box
        sx={{
          bgcolor: "transparent",
          display: "flex",
          justifyContent: isSmallScreen ? "center" : "flex-start",
          flexDirection: isSmallScreen ? "column" : "row",
          px: { xs: 2, md: 8 }
        }}
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Training tabs"
          TabIndicatorProps={{
            style: { backgroundColor: "#CA0019", width: isSmallScreen ? "auto" : "4px", height: isSmallScreen ? "3px" : "auto", borderRadius: "4px" }
          }}
          sx={{
            borderRight: isSmallScreen ? 0 : 1,
            borderBottom: isSmallScreen ? 1 : 0,
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'divider',
            margin: isSmallScreen ? 0 : { md: 5, lg: 10 },
            '& .MuiTab-root': {
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              '&.Mui-selected': {
                color: '#CA0019',
              }
            }
          }}
        >
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2, fontWeight: 700 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-I"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2, fontWeight: 700 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-II"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2, fontWeight: 700 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-III"
            {...a11yProps(2)}
          />
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2, fontWeight: 700 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-IV"
            {...a11yProps(3)}
          />
          <Tab
            sx={{ marginY: isSmallScreen ? 0 : 2, fontWeight: 700 }}
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Round-V"
            {...a11yProps(4)}
          />
        </Tabs>
        <div className="flex-1">
          <TabPanel value={value} index={0}>
            <Box>
              <InceptionTab />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box>
              <WebDevTab />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box>
              <MernTab />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box>
              <AndroidTab />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Box>
              <GenAiTab />
            </Box>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
