import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MemberCardDashboard } from '@/utils/Card/MemberCardDashboard';

const index=()=> {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const pendingUser = {
		fullName: "Ralph Edwards",
		admno: "2021BTCS001",
		email: "ralph@example.com",
		batch: "The Uniques 2.0",
		contact: "9876543210",
		whatsappContact: "9876543210",
		address: "123 Street",
		city: "New York",
		state: "NY",
		bio: "Passionate about tech and development.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet nam vitae, facere maxime repudiandae dicta veniam similique quae culpa quidem.",
		profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
		leaveType: "Sick Leave",
	  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
          <MemberCardDashboard user={pendingUser}/>
        </TabPanel>
        <TabPanel value="2">The Uniques 1.0</TabPanel>
        <TabPanel value="3">The Uniques 2.0</TabPanel>
        <TabPanel value="4">The Uniques 3.0</TabPanel>
        <TabPanel value="5">The Uniques 4.0</TabPanel>
        <TabPanel value="6">Blocked Members</TabPanel>
      </TabContext>
    </Box>
  );
}

export default index;