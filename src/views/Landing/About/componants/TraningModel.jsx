import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import InceptionTab from "../../../Landing/homComponents/InceptionTab";
import useMediaQuery from "@mui/material/useMediaQuery";
import WebDevTab from "../../homComponents/WebDevTab";
import MernTab from "../../homComponents/MernTab";
import AndroidTab from "../../homComponents/AndroidTab";
import { useThemeContext } from "../../../../theme/ThemeProvider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Typography component="div" variant="body2">{children}</Typography>
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
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
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
    <div className={`flex justify-center items-center py-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#161616]' : 'bg-white'}`}>
      <div className="w-[90%] md:w-[85%] flex flex-col items-center">
    
        <div className="flex mb-5 items-center">
          <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
          <h1 className={`text-sm md:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>TRAINING MODULES</h1>
        </div>
        <h1 className={`text-2xl md:text-5xl font-black text-center mb-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Elevate Your Skills with
          <span className="text-[#ca0019] block mt-2">
            Expert-Led Programs
          </span>
        </h1>
      

        <Box sx={{ 
          width: "100%", 
          bgcolor: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", 
          borderRadius: "20px",
          p: 1,
          display: "flex", 
          justifyContent: "center",
          mb: 6,
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
        }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Training Rounds"
            variant={isSmallScreen ? "scrollable" : "standard"}
            scrollButtons="auto"
            TabIndicatorProps={{
              style: { backgroundColor: "#CA0019", height: "3px", borderRadius: "3px" }
            }}
            sx={{
              '& .MuiTabs-flexContainer': {
                gap: { xs: 1, md: 3 },
              }
            }}
          >
            <Tab
              icon={<SettingsIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Round-I"
              sx={{ 
                minWidth: { xs: "120px", md: "160px" }, 
                color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                '&.Mui-selected': {
                  color: "#CA0019",
                },
                '&:hover': {
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }
              }}
              {...a11yProps(0)}
            />
            <Tab
              icon={<SettingsIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Round-II"
              sx={{ 
                minWidth: { xs: "120px", md: "160px" }, 
                color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                '&.Mui-selected': {
                  color: "#CA0019",
                },
                '&:hover': {
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }
              }}
              {...a11yProps(1)}
            />
            <Tab
              icon={<SettingsIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Round-III"
              sx={{ 
                minWidth: { xs: "120px", md: "160px" }, 
                color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                '&.Mui-selected': {
                  color: "#CA0019",
                },
                '&:hover': {
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }
              }}
              {...a11yProps(2)}
            />
            <Tab
              icon={<SettingsIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Round-IV"
              sx={{ 
                minWidth: { xs: "120px", md: "160px" }, 
                color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                '&.Mui-selected': {
                  color: "#CA0019",
                },
                '&:hover': {
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }
              }}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <div className="w-full">
          <TabPanel value={value} index={0}>
            <div className="transform transition-all duration-500">
              <InceptionTab />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="transform transition-all duration-500">
              <WebDevTab />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="transform transition-all duration-500">
              <MernTab />
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="transform transition-all duration-500">
              <AndroidTab />
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
