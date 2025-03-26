import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MemberCardDashboard } from "@/utils/Card/MemberCardDashboard";
import axios from "axios";
import { 
  CircularProgress, 
  TextField, 
  InputAdornment, 
  Pagination, 
  Typography, 
  Alert, 
  Button,
  Snackbar,
  Badge
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";

const MembersIndex = () => {
  // State for active tab
  const [value, setValue] = useState("1");
  
  // State for members data
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  
  // Search state
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  // Tab counts (for badges)
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    batch1: 0,
    batch2: 0,
    batch3: 0,
    batch4: 0,
    blocked: 0
  });
  
  // Alert state
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  
  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1); // Reset to first page when changing tabs
    setSearch(""); // Clear search when changing tabs
  };
  
  // Get batch filter based on current tab
  const getBatchFilter = () => {
    switch (value) {
      case "2": return "The Uniques 1.0";
      case "3": return "The Uniques 2.0";
      case "4": return "The Uniques 3.0";
      case "5": return "The Uniques 4.0";
      case "6": return null; // Blocked members tab
      default: return null; // All members tab
    }
  };
  
  // Fetch tab counts for badges
  const fetchTabCounts = async () => {
    try {
      // Get total count
      const totalResponse = await axios.get("http://localhost:5000/api/admin/member/count");
      
      // Get batch counts
      const batch1Response = await axios.get("http://localhost:5000/api/admin/member/count", {
        params: { batch: "The Uniques 1.0" }
      });
      
      const batch2Response = await axios.get("http://localhost:5000/api/admin/member/count", {
        params: { batch: "The Uniques 2.0" }
      });
      
      const batch3Response = await axios.get("http://localhost:5000/api/admin/member/count", {
        params: { batch: "The Uniques 3.0" }
      });
      
      const batch4Response = await axios.get("http://localhost:5000/api/admin/member/count", {
        params: { batch: "The Uniques 4.0" }
      });
      
      // Get blocked count
      const blockedResponse = await axios.get("http://localhost:5000/api/admin/member/count", {
        params: { isSuspended: true }
      });
      
      setTabCounts({
        all: totalResponse.data.count || 0,
        batch1: batch1Response.data.count || 0,
        batch2: batch2Response.data.count || 0,
        batch3: batch3Response.data.count || 0,
        batch4: batch4Response.data.count || 0,
        blocked: blockedResponse.data.count || 0
      });
    } catch (err) {
      console.error("Error fetching tab counts:", err);
    }
  };
  
  // Fetch members data
  const fetchMembers = async () => {
    try {
      setLoading(true);
      
      // Build params object
      const params = {
        page,
        limit,
        search: search || undefined
      };
      
      // Add batch filter if on batch-specific tab
      const batchFilter = getBatchFilter();
      if (batchFilter) {
        params.batch = batchFilter;
      }
      
      // If on blocked members tab, set isSuspended filter
      if (value === "6") {
        params.isSuspended = true;
      }
      
      // Make API call with proper filtering
      const response = await axios.get("http://localhost:5000/api/admin/member", { params });
      
      // Filter the results again on the client side to ensure only appropriate members are shown
      let filteredMembers = response.data.data || [];
      
      // Additional client-side filtering to ensure correct members in each tab
      if (value === "2") {
        filteredMembers = filteredMembers.filter(member => member.batch === "The Uniques 1.0");
      } else if (value === "3") {
        filteredMembers = filteredMembers.filter(member => member.batch === "The Uniques 2.0");
      } else if (value === "4") {
        filteredMembers = filteredMembers.filter(member => member.batch === "The Uniques 3.0");
      } else if (value === "5") {
        filteredMembers = filteredMembers.filter(member => member.batch === "The Uniques 4.0");
      } else if (value === "6") {
        filteredMembers = filteredMembers.filter(member => member.isSuspended === true);
      }
      
      // Update state with filtered data
      setMembers(filteredMembers);
      setTotalPages(Math.ceil((response.data.pagination?.total || 0) / limit));
      setError(null);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Failed to load members. Please try again.");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout to delay API call while typing
    const timeout = setTimeout(() => {
      setPage(1); // Reset to first page when searching
      fetchMembers();
    }, 500);
    
    setSearchTimeout(timeout);
  };
  
  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  // Initialize data on component mount
  useEffect(() => {
    fetchTabCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Fetch members when tab, page changes, or after a search
  useEffect(() => {
    fetchMembers();
    
    // Cleanup function to cancel any pending requests
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, page]);
  console.log(members)
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList 
            onChange={handleChange} 
            aria-label="members tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 500,
                transition: '0.3s',
                '&.Mui-selected': {
                  color: '#ca0019',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#ca0019',
              }
            }}
          >
            <Tab 
              label={
                <Badge badgeContent={tabCounts.all} color="primary" max={999}>
                  All Members
                </Badge>
              } 
              value="1" 
            />
            <Tab 
              label={
                <Badge badgeContent={tabCounts.batch1} color="primary" max={999}>
                  The Uniques 1.0
                </Badge>
              } 
              value="2" 
            />
            <Tab 
              label={
                <Badge badgeContent={tabCounts.batch2} color="primary" max={999}>
                  The Uniques 2.0
                </Badge>
              } 
              value="3" 
            />
            <Tab 
              label={
                <Badge badgeContent={tabCounts.batch3} color="primary" max={999}>
                  The Uniques 3.0
                </Badge>
              } 
              value="4" 
            />
            <Tab 
              label={
                <Badge badgeContent={tabCounts.batch4} color="primary" max={999}>
                  The Uniques 4.0
                </Badge>
              } 
              value="5" 
            />
            <Tab 
              label={
                <Badge badgeContent={tabCounts.blocked} color="error" max={999}>
                  Blocked Members
                </Badge>
              } 
              value="6" 
            />
          </TabList>
        </Box>
        
        {/* Search and filter controls */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search members..."
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ width: '300px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <div className="flex gap-2">
            <Button 
              startIcon={<FilterListIcon />} 
              onClick={() => {
                setSearch("");
                fetchMembers();
              }}
              variant="outlined"
              color="secondary"
            >
              Clear Filters
            </Button>
            <Button 
              startIcon={<RefreshIcon />} 
              onClick={() => {
                fetchMembers();
                fetchTabCounts();
              }}
              variant="contained"
              sx={{ bgcolor: "#ca0019", "&:hover": { bgcolor: "#a30014" } }}
            >
              Refresh
            </Button>
          </div>
        </Box>
        
        {/* Tab panels for different batches */}
        {["1", "2", "3", "4", "5", "6"].map((tabValue) => (
          <TabPanel value={tabValue} key={tabValue} sx={{ px: 0 }}>
            {/* Loading indicator */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress sx={{ color: '#ca0019' }} />
              </Box>
            )}
            
            {/* Error message */}
            {error && !loading && (
              <Alert severity="error" sx={{ mb: 2, mx: 2 }}>
                {error}
              </Alert>
            )}
            
            {/* No results message */}
            {!loading && !error && members.length === 0 && (
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No members found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {search 
                    ? `No results matching "${search}". Try a different search term.` 
                    : tabValue === "6" 
                      ? "There are no blocked members." 
                      : "No members in this batch yet."}
                </Typography>
              </Box>
            )}
            
            {/* Member cards */}
            {!loading && !error && members.length > 0 && (
              <div className="px-4">
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                  Showing {members.length} {members.length === 1 ? 'member' : 'members'}
                  {search && ` matching "${search}"`}
                </Typography>
                
                <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-1  gap-4">
                  {members.map((member, index) => (
                    <MemberCardDashboard 
                      user={member} 
                      key={member._id || index} 
                      refreshData={() => {
                        fetchMembers();
                        fetchTabCounts();
                      }}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      sx={{
                        "& .Mui-selected": {
                          backgroundColor: "#ca0019 !important",
                          color: "white",
                        },
                      }}
                    />
                  </Box>
                )}
              </div>
            )}
          </TabPanel>
        ))}
      </TabContext>
      
      {/* Snackbar for alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({...alert, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setAlert({...alert, open: false})} 
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MembersIndex;