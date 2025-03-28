import React, { useState, useEffect } from "react";
import { NewMember } from "./dashboardComponents/NewMember";
import StatCard from "./dashboardComponents/StatCard";
import { Groups2 } from "@mui/icons-material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Calender from "./dashboardComponents/Calender";
import Banner from "./dashboardComponents/Banner";
import EventOverView from "./dashboardComponents/EventOverView";
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Chip, 
  CircularProgress, 
  Tabs, 
  Tab, 
  Box,
  Avatar,
  Typography,
  Modal,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Card,
  CardContent
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ClassIcon from '@mui/icons-material/Class';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import SubjectIcon from '@mui/icons-material/Subject';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import PendingIcon from '@mui/icons-material/Pending';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const index = () => {
  // State for storing fetched data
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalFine: 0,
    totalEvents: 0,
    totalCampus: 1
  });
  const [events, setEvents] = useState([]);
  const [tableView, setTableView] = useState(0);
  const [fineMembers, setFineMembers] = useState([]);
  const [supplementaryMembers, setSupplementaryMembers] = useState([]);
  const [currentSemester, setCurrentSemester] = useState(1);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  
  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all members
        const membersRes = await axios.get('https://theuniquesbackend.vercel.app/api/admin/member?page=1&limit=10');
        
        // Get recently added members (sorted by creation date)
        const sortedMembers = [...membersRes.data.data].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMembers(sortedMembers.slice(0, 3));
        
        // Fetch total members count
        const totalMembers = membersRes.data.pagination?.total || membersRes.data.data.length;
        
        // Fetch members with fines
        const fineRes = await axios.get('https://theuniquesbackend.vercel.app/api/admin/member/fines/all');
        setFineMembers(fineRes.data.data);
        
        // Calculate total fine amount - improved calculation
        let totalFineAmount = 0;
        if (Array.isArray(fineRes.data.data)) {
          totalFineAmount = fineRes.data.data.reduce((total, member) => {
            // Make sure fineStatus is converted to a number and has a default of 0
            const fineAmount = member.fineStatus ? Number(member.fineStatus) : 0;
            return total + (isNaN(fineAmount) ? 0 : fineAmount);
          }, 0);
        }
        
        // Alternative: fetch total fine directly if API supports it
        try {
          // Try to get the total fine from a dedicated API endpoint
          const fineStatsRes = await axios.get('https://theuniquesbackend.vercel.app/api/admin/fine/fines/statistics');
          if (fineStatsRes.data && fineStatsRes.data.success && fineStatsRes.data.data) {
            // Use the total pending amount as the fine amount for the dashboard
            totalFineAmount = fineStatsRes.data.data.totalPendingAmount || totalFineAmount;
          }
        } catch (error) {
          console.log("Using calculated fine total instead of API stats");
          // Continue with the calculated total if the API call fails
        }
        
        // Fetch events from the correct API endpoint
        try {
          const eventsRes = await axios.get('https://theuniquesbackend.vercel.app/api/events');
          // Handle API response based on its structure (data property or direct array)
          const eventsList = eventsRes.data.data || eventsRes.data;
          setEvents(eventsList.slice(0, 3));
          
          // Update total events count from API response
          const totalEventsCount = eventsRes.data.pagination?.total || eventsList.length;
          setStats(prev => ({
            ...prev,
            totalEvents: totalEventsCount
          }));
        } catch (error) {
          console.error("Error fetching events:", error);
          // Fallback to mock data if API fails
          setEvents([
            {
              eventName: "Tech Workshop",
              eventStatus: "upcoming",
              eventDate: "2025-04-15",
              eventTime: "10:00 AM"
            },
            {
              eventName: "Alumni Meet",
              eventStatus: "upcoming",
              eventDate: "2025-05-20",
              eventTime: "2:00 PM"
            },
            {
              eventName: "Coding Competition",
              eventStatus: "completed",
              eventDate: "2025-02-10",
              eventTime: "9:00 AM"
            }
          ]);
          
          // Keep the stats value for events if API fails
          setStats(prev => ({
            ...prev,
            totalEvents: 6 // Default fallback
          }));
        }
        
        // Update remaining stats
        setStats(prev => ({
          ...prev,
          totalMembers,
          totalFine: totalFineAmount,
          totalCampus: 1
        }));
        
        // Fetch members with supplementary exams for semester 1
        const supplementaryRes = await axios.get(`https://theuniquesbackend.vercel.app/api/admin/member/supplementary/semester/${currentSemester}`);
        setSupplementaryMembers(supplementaryRes.data.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle semester change for supplementary data
  const handleSemesterChange = async (semester) => {
    try {
      setLoading(true);
      setCurrentSemester(semester);
      const res = await axios.get(`https://theuniquesbackend.vercel.app/api/admin/member/supplementary/semester/${semester}`);
      setSupplementaryMembers(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching supplementary data:", error);
      setLoading(false);
    }
  };
  
  const handleTableViewChange = (event, newValue) => {
    setTableView(newValue);
  };
  
  // Handle view details button click
  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="w-full">
      {/* Main Dashboard Layout */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 md:px-3 px-1 py-5 mb-5">
        <div className="col-span-4">
          <Banner />
          <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            <StatCard
              icon={<Groups2 fontSize="large" />}
              title="Total Members"
              value={stats.totalMembers}
              link="/admin/members-overview"
            />
            <StatCard
              icon={<CurrencyRupeeIcon fontSize="large" />}
              title="Total Fine"
              value={stats.totalFine}
              link="/admin/accounts"
            />
            <StatCard
              icon={<EventAvailableIcon fontSize="large" />}
              title="Total Events"
              value={stats.totalEvents}
              link="/admin/events-overview"
            />
            <StatCard
              icon={<LocationCityIcon fontSize="large" />}
              title="Total Campus"
              value={stats.totalCampus}
            />
          </div>

          <div className="px-1 py-5 my-5">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Newly Added Members
            </h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-start gap-3">
                {members.length > 0 ? (
                  members.map((member) => (
                    <NewMember key={member._id} user={member} />
                  ))
                ) : (
                  <p className="text-gray-500">No new members found</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-5">
            <Calender />
          </div>
          <div className="mb-5">
            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress size={24} />
              </div>
            ) : (
              events.map((event, index) => (
                <EventOverView
                  key={index}
                  event={event}
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Member Filters Section */}
      <div className="mx-3 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Member Filters
        </h2>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tableView} onChange={handleTableViewChange} aria-label="member filter tabs">
            <Tab label="Members with Fines" icon={<CurrencyRupeeIcon />} iconPosition="start" />
            <Tab label="Members with Supplementary" icon={<SchoolIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {tableView === 0 ? (
          // Fines Table
          <>
            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <TableContainer component={Paper} className="shadow-md rounded-md">
                <Table>
                  <TableHead className="bg-gray-100">
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell>Admission No</TableCell>
                      <TableCell>Batch</TableCell>
                      <TableCell align="right">Fine Amount</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fineMembers.length > 0 ? (
                      fineMembers.map((member) => (
                        <TableRow key={member._id} hover>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar src={member.profilePic} alt={member.fullName} />
                              <div>
                                <div className="font-medium">{member.fullName}</div>
                                <div className="text-xs text-gray-500">{member.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.admno}</TableCell>
                          <TableCell>{member.batch}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={`₹${member.fineStatus}`} 
                              color="error" 
                              variant="outlined" 
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Button 
                              variant="contained" 
                              size="small" 
                              style={{ backgroundColor: '#ca0019' }}
                              onClick={() => handleViewDetails(member)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" className="py-8">
                          <Typography variant="body1" color="textSecondary">
                            No members with fines found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        ) : (
          // Supplementary Table
          <>
            <div className="flex mb-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <Button 
                  key={sem}
                  variant={currentSemester === sem ? "contained" : "outlined"}
                  size="small"
                  onClick={() => handleSemesterChange(sem)}
                  style={{ 
                    backgroundColor: currentSemester === sem ? '#ca0019' : 'transparent',
                    borderColor: '#ca0019',
                    color: currentSemester === sem ? 'white' : '#ca0019'
                  }}
                >
                  Sem {sem}
                </Button>
              ))}
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <TableContainer component={Paper} className="shadow-md rounded-md">
                <Table>
                  <TableHead className="bg-gray-100">
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell>Admission No</TableCell>
                      <TableCell>Batch</TableCell>
                      <TableCell>Subjects</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {supplementaryMembers.length > 0 ? (
                      supplementaryMembers.map((member) => (
                        <TableRow key={member._id} hover>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar src={member.profilePic} alt={member.fullName} />
                              <div>
                                <div className="font-medium">{member.fullName}</div>
                                <div className="text-xs text-gray-500">{member.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.admno}</TableCell>
                          <TableCell>{member.batch}</TableCell>
                          <TableCell>
                            {member.semesterSupplementary
                              .find(sem => sem.semester === currentSemester)?.subjects.length || 0} subjects
                          </TableCell>
                          <TableCell align="center">
                            {member.semesterSupplementary
                              .find(sem => sem.semester === currentSemester)?.subjects.some(subj => subj.status === 'pending') && (
                              <Chip 
                                icon={<WarningAmberIcon />}
                                label="Pending" 
                                color="warning" 
                                size="small"
                                style={{ marginRight: 4 }}
                              />
                            )}
                            {member.semesterSupplementary
                              .find(sem => sem.semester === currentSemester)?.subjects.some(subj => subj.status === 'failed') && (
                              <Chip 
                                label="Failed" 
                                color="error" 
                                size="small"
                              />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Button 
                              variant="contained" 
                              size="small" 
                              style={{ backgroundColor: '#ca0019' }}
                              onClick={() => handleViewDetails(member)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" className="py-8">
                          <Typography variant="body1" color="textSecondary">
                            No members with supplementary exams in semester {currentSemester}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </div>
      
      {/* Member Details Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="member-details-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMember && (
            <>
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" component="h2" className="font-bold text-slate-800">
                  {tableView === 0 ? "Fine Details" : "Supplementary Exam Details"}
                </Typography>
                <IconButton onClick={handleCloseModal} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </div>
              
              {/* Member Basic Info */}
              <div className="flex items-center gap-4 mb-6">
                <Avatar 
                  src={selectedMember.profilePic} 
                  alt={selectedMember.fullName}
                  sx={{ width: 64, height: 64 }}
                  className="border-2 border-[#ca0019]"
                />
                <div>
                  <Typography variant="h6" className="font-bold">{selectedMember.fullName}</Typography>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Chip 
                      icon={<BadgeIcon />} 
                      label={selectedMember.admno} 
                      size="small" 
                      className="bg-gray-100"
                    />
                    <Chip 
                      icon={<ClassIcon />} 
                      label={selectedMember.batch} 
                      size="small" 
                      className="bg-blue-100 text-blue-800"
                    />
                  </div>
                </div>
              </div>
              
              <Divider className="my-4" />
              
              {/* Tab-specific content */}
              {tableView === 0 ? (
                // Fine Details Content
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CurrencyRupeeIcon className="text-red-600" />
                        <Typography variant="h6" className="font-semibold">Fine Amount</Typography>
                      </div>
                      <Chip 
                        label={`₹${selectedMember.fineStatus}`} 
                        color="error" 
                        className="text-lg font-bold"
                      />
                    </div>
                  </div>
                  
                  <Card variant="outlined" className="border-red-200">
                    <CardContent>
                      <Typography variant="subtitle1" className="font-semibold mb-3 flex items-center gap-2">
                        <AccountBalanceWalletIcon fontSize="small" /> 
                        Payment Status
                      </Typography>
                      
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <div className="flex justify-between items-center">
                          <Typography variant="body2">Fine Status:</Typography>
                          <Chip 
                            label="Unpaid" 
                            color="error" 
                            size="small" 
                            icon={<PaidIcon />}
                          />
                        </div>
                      </div>
                      
                      <Typography variant="body2" className="text-gray-600 italic">
                        Fine must be paid before the end of the semester to avoid exam restrictions.
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Typography variant="subtitle1" className="font-semibold mb-2">Member Contact</Typography>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Typography variant="body2" className="text-gray-500">Email</Typography>
                        <Typography variant="body2">{selectedMember.email}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className="text-gray-500">Contact</Typography>
                        <Typography variant="body2">{selectedMember.contact || "Not provided"}</Typography>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outlined" 
                      onClick={handleCloseModal}
                      style={{ borderColor: '#ca0019', color: '#ca0019' }}
                    >
                      Close
                    </Button>
                    <Button 
                      variant="contained" 
                      style={{ backgroundColor: '#ca0019' }}
                    >
                      Mark as Paid
                    </Button>
                  </div>
                </div>
              ) : (
                // Supplementary Exam Details Content
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <SchoolIcon className="text-blue-600" />
                      <Typography variant="h6" className="font-semibold">
                        Semester {currentSemester} Supplementary Exams
                      </Typography>
                    </div>
                    
                    {selectedMember.semesterSupplementary
                      .find(sem => sem.semester === currentSemester) ? (
                      <List className="bg-white rounded-lg">
                        {selectedMember.semesterSupplementary
                          .find(sem => sem.semester === currentSemester)
                          .subjects.map((subject, idx) => (
                          <ListItem key={idx} divider={idx !== selectedMember.semesterSupplementary.find(sem => sem.semester === currentSemester).subjects.length - 1}>
                            <ListItemAvatar>
                              {subject.status === 'pending' ? (
                                <Avatar className="bg-amber-100">
                                  <PendingIcon className="text-amber-600" />
                                </Avatar>
                              ) : subject.status === 'passed' ? (
                                <Avatar className="bg-green-100">
                                  <DoneIcon className="text-green-600" />
                                </Avatar>
                              ) : (
                                <Avatar className="bg-red-100">
                                  <ClearIcon className="text-red-600" />
                                </Avatar>
                              )}
                            </ListItemAvatar>
                            <ListItemText 
                              primary={
                                <div className="flex justify-between">
                                  <span>{subject.subjectName}</span>
                                  <Chip 
                                    label={subject.status.toUpperCase()} 
                                    size="small"
                                    className={`${
                                      subject.status === 'passed' ? 'bg-green-100 text-green-800' : 
                                      subject.status === 'failed' ? 'bg-red-100 text-red-800' : 
                                      'bg-amber-100 text-amber-800'
                                    }`}
                                  />
                                </div>
                              }
                              secondary={`Subject Code: ${subject.subjectCode}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" className="text-center text-gray-500 py-2">
                        No supplementary exams found for this semester
                      </Typography>
                    )}
                  </div>
                  
                  <Card variant="outlined" className="border-blue-200">
                    <CardContent>
                      <Typography variant="subtitle1" className="font-semibold mb-3 flex items-center gap-2">
                        <SubjectIcon fontSize="small" /> 
                        Exam Information
                      </Typography>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <Typography variant="body2">Total Supplementary Subjects:</Typography>
                          <Chip 
                            label={selectedMember.semesterSupplementary
                              .find(sem => sem.semester === currentSemester)?.subjects.length || 0} 
                            color="primary" 
                            size="small"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography variant="body2">Pending Exams:</Typography>
                          <Chip 
                            label={selectedMember.semesterSupplementary
                              .find(sem => sem.semester === currentSemester)?.subjects.filter(subj => subj.status === 'pending').length || 0} 
                            color="warning" 
                            size="small"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Typography variant="subtitle1" className="font-semibold mb-2">Academic Information</Typography>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Typography variant="body2" className="text-gray-500">Semester SGPA</Typography>
                        <Typography variant="body2">
                          {selectedMember.semesterSGPA?.find(sem => sem.semester === currentSemester)?.sgpa.toFixed(2) || "N/A"}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className="text-gray-500">Course</Typography>
                        <Typography variant="body2">{selectedMember.course || "B.Tech CSE"}</Typography>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outlined" 
                      onClick={handleCloseModal}
                      style={{ borderColor: '#ca0019', color: '#ca0019' }}
                    >
                      Close
                    </Button>
                    <Button 
                      variant="contained" 
                      style={{ backgroundColor: '#ca0019' }}
                    >
                      Update Status
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default index;