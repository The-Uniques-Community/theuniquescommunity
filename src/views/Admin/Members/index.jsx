import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MemberCardDashboard } from "@/utils/Card/MemberCardDashboard";
import { members } from "@/assets/dummyData/memberData";
const index = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Members" value="1" />
            <Tab label="The Uniques 1.0" value="2" />
            <Tab label="The Uniques 2.0" value="3" />
            <Tab label="The Uniques 3.0" value="4" />
            <Tab label="The Uniques 4.0" value="5" />
            <Tab label="Blocked Members" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="flex flex-wrap xl:justify-start lg:justify-start justify-center items-center gap-4">
            {
              members.map((member,index)=>{
                return(
                  <MemberCardDashboard user={member} key={index} />
                )
              })
            }
          </div>

          
        </TabPanel>
        <TabPanel value="2">The Uniques 1.0</TabPanel>
        <TabPanel value="3">The Uniques 2.0</TabPanel>
        <TabPanel value="4">The Uniques 3.0</TabPanel>
        <TabPanel value="5">The Uniques 4.0</TabPanel>
        <TabPanel value="6">Blocked Members</TabPanel>
      </TabContext>
    </Box>
  );
};

export default index;
