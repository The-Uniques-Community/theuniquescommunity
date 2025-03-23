import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Chip,
  Pagination,
  Modal,
  IconButton,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  InputAdornment,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import tu from '@/assets/logos/tu.png';

// PDF Export component would be defined separately

const FineTable = () => {
  // State management
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage] = useState(5);
  
  // Modal states
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddFineModal, setOpenAddFineModal] = useState(false);
  const [selectedFine, setSelectedFine] = useState(null);
  
  // Search members modal
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  
  // New fine state
  const [selectedMember, setSelectedMember] = useState(null);
  const [fineAmount, setFineAmount] = useState("");
  const [fineReason, setFineReason] = useState("");
  
  // Alert state
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch fine data
  const fetchFines = async () => {
    try {
      setLoading(true);
      // You'll need to implement this API endpoint to get fine records
      const response = await axios.get(`http://localhost:5000/api/admin/member/fines/all`, {
        params: {
          page,
          limit: rowsPerPage,
          batch: batchFilter !== "All Batches" ? batchFilter : undefined,
          search
        }
      });
      
      setFines(response.data.data || []);
      setTotalPages(Math.ceil((response.data.pagination?.total || response.data.data.length) / rowsPerPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fines:", error);
      setAlert({
        open: true,
        message: "Failed to fetch fine records",
        severity: "error"
      });
      setLoading(false);
    }
  };

  // Search members
  const searchMembers = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setSearchLoading(true);
      const response = await axios.get(`http://localhost:5000/api/admin/fine/search`, {
        params: {
          query: searchQuery,
          batch: batchFilter !== "All Batches" ? batchFilter : undefined,
          limit: 10
        }
      });
      
      setSearchResults(response.data.data || []);
      setSearchLoading(false);
    } catch (error) {
      console.error("Error searching members:", error);
      setAlert({
        open: true,
        message: "Failed to search members",
        severity: "error"
      });
      setSearchLoading(false);
    }
  };

  // Add fine to member
  const addFine = async () => {
    if (!selectedMember || !fineAmount || !fineReason) {
      setAlert({
        open: true,
        message: "Please complete all fields",
        severity: "warning"
      });
      return;
    }
    
    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/admin/fine/${selectedMember._id}/impose`, {
        amount: fineAmount,
        reason: fineReason
      });
      
      setAlert({
        open: true,
        message: `Fine of ₹${fineAmount} imposed successfully`,
        severity: "success"
      });
      
      // Reset form and close modal
      setSelectedMember(null);
      setFineAmount("");
      setFineReason("");
      setOpenAddFineModal(false);
      
      // Refresh data
      fetchFines();
    } catch (error) {
      console.error("Error imposing fine:", error);
      setAlert({
        open: true,
        message: "Failed to impose fine",
        severity: "error"
      });
      setLoading(false);
    }
  };

  // Clear fine
  const clearFine = async (memberId) => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/admin/fine/${memberId}/clear`);
      
      setAlert({
        open: true,
        message: "Fine cleared successfully",
        severity: "success"
      });
      
      // Refresh data
      fetchFines();
    } catch (error) {
      console.error("Error clearing fine:", error);
      setAlert({
        open: true,
        message: "Failed to clear fine",
        severity: "error"
      });
      setLoading(false);
    }
  };

  // Get fine details
  const viewFineDetails = async (member) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/admin/fine/${member._id}/history`);
      
      setSelectedFine({
        ...response.data.data,
        member: member
      });
      
      setOpenViewModal(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fine details:", error);
      setAlert({
        open: true,
        message: "Failed to fetch fine details",
        severity: "error"
      });
      setLoading(false);
    }
  };

  // Load data when component mounts or filters change
  useEffect(() => {
    fetchFines();
  }, [page, batchFilter, search]);

  // Status Chip component
  const getStatusChip = (status) => {
    switch (status) {
      case "Completed":
        return <Chip label="Completed" color="success" />;
      case "Pending":
        return <Chip label="Pending" color="warning" />;
      case "Waived":
        return <Chip label="Waived" color="default" />;
      default:
        return <Chip label={status} />;
    }
  };

  // Export to CSV function
  const exportToCSV = () => {
    // Implementation for CSV export
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        color: "#333",
        minHeight: "80vh",
        p: 3,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Fine Records
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenSearchModal(true)}
          sx={{ bgcolor: "#ca0019" }}
        >
          Add New Fine
        </Button>
      </Box>

      {/* Filters & Search */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search by Name or Reason"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "#555" }} />,
          }}
          sx={{ bgcolor: "#fff", borderRadius: 1, input: { color: "#333" } }}
        />
        <div>
          <div className="flex gap-x-4">
            <Button 
              variant="contained" 
              startIcon={<FileDownloadIcon />}
              onClick={exportToCSV}
              sx={{ bgcolor: "#ca0019" }}
            >
              Export CSV
            </Button>
            <Select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              sx={{ bgcolor: "#fff", color: "#333" }}
            >
              <MenuItem value="All Batches">All Batches</MenuItem>
              <MenuItem value="The Uniques 1.0">The Uniques 1.0</MenuItem>
              <MenuItem value="The Uniques 2.0">The Uniques 2.0</MenuItem>
              <MenuItem value="The Uniques 3.0">The Uniques 3.0</MenuItem>
            </Select>
          </div>
        </div>
      </Box>

      {/* Fines Table */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#fff", minHeight: "50vh" }}
      >
        <Table>
          <TableHead sx={{ padding: 2 }}>
            <TableRow sx={{ bgcolor: "#fff", borderBottom: 2 }}>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Member
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Batch
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Fine Amount
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Imposed Date
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Payment Status
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={40} sx={{ color: "#ca0019" }} />
                </TableCell>
              </TableRow>
            ) : fines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">No fine records found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              fines.map((fine, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ color: "#333" }}>
                    <div className="flex items-center gap-2">
                      <Avatar src={fine.profilePic} alt={fine.fullName} />
                      <div>
                        <Typography variant="body1">{fine.fullName}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {fine.admno}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <div className="flex gap-x-1 items-center"> 
                      <img className="h-5 w-5 object-center object-contain inline" src={tu} alt="TU"/> 
                      {fine.batch}
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    ₹{fine.fineStatus}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {new Date(fine.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {parseInt(fine.fineStatus) > 0 ? (
                      <Chip label="Unpaid" color="warning" />
                    ) : (
                      <Chip label="Paid" color="success" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton 
                        color="primary" 
                        onClick={() => viewFineDetails(fine)}
                        size="small"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        color="error"
                        onClick={() => clearFine(fine._id)}
                        size="small"
                        disabled={parseInt(fine.fineStatus) === 0}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{
            display: "flex",
            gap: "8px",
            "& button": {
              color: "black",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "#ca0019 !important",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#ca0019 !important",
              },
            },
          }}
        />
      </Box>

      {/* View Fine Details Modal */}
      <Modal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        aria-labelledby="fine-details-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" component="h2">
              Fine Details
            </Typography>
            <IconButton onClick={() => setOpenViewModal(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          
          {selectedFine && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <Avatar 
                  src={selectedFine.member.profilePic} 
                  alt={selectedFine.member.fullName}
                  sx={{ width: 56, height: 56 }}
                />
                <div>
                  <Typography variant="h6">{selectedFine.member.fullName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedFine.member.admno} • {selectedFine.member.batch}
                  </Typography>
                </div>
              </div>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  Current Fine Status
                </Typography>
                <div className="flex justify-between items-center">
                  <Typography variant="body1">Amount Due:</Typography>
                  <Chip 
                    label={`₹${selectedFine.currentFine}`} 
                    color={parseInt(selectedFine.currentFine) > 0 ? "error" : "success"}
                    sx={{ fontWeight: 'bold' }}
                  />
                </div>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  Contact Information
                </Typography>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Typography variant="body2" color="textSecondary">Email:</Typography>
                    <Typography variant="body2">{selectedFine.member.email}</Typography>
                  </div>
                  {selectedFine.member.contact && (
                    <div>
                      <Typography variant="body2" color="textSecondary">Phone:</Typography>
                      <Typography variant="body2">{selectedFine.member.contact}</Typography>
                    </div>
                  )}
                </div>
              </Box>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outlined" 
                  onClick={() => setOpenViewModal(false)}
                >
                  Close
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    clearFine(selectedFine.member._id);
                    setOpenViewModal(false);
                  }}
                  disabled={parseInt(selectedFine.currentFine) === 0}
                  sx={{ bgcolor: "#ca0019" }}
                >
                  Mark as Paid
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>

      {/* Search Members Modal */}
      <Dialog
        open={openSearchModal}
        onClose={() => setOpenSearchModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <Typography variant="h6">Search Members</Typography>
            <IconButton onClick={() => setOpenSearchModal(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="mb-4 mt-2">
            <TextField
              fullWidth
              label="Search by Name, Email or Admission No"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={searchMembers}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchMembers();
                }
              }}
            />
          </div>

          {searchLoading ? (
            <div className="flex justify-center my-4">
              <CircularProgress />
            </div>
          ) : (
            <List>
              {searchResults.length === 0 ? (
                <Typography variant="body2" align="center" sx={{ py: 2, color: 'text.secondary' }}>
                  {searchQuery ? 'No members found' : 'Search for members to add a fine'}
                </Typography>
              ) : (
                searchResults.map((member) => (
                  <ListItem 
                    key={member._id}
                    button
                    onClick={() => {
                      setSelectedMember(member);
                      setOpenSearchModal(false);
                      setOpenAddFineModal(true);
                    }}
                    sx={{ 
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={member.profilePic} />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={member.fullName}
                      secondary={
                        <React.Fragment>
                          <span>{member.admno}</span>
                          <span className="mx-1">•</span>
                          <span>{member.batch}</span>
                          {member.fineStatus && parseInt(member.fineStatus) > 0 && (
                            <Chip 
                              size="small" 
                              label={`₹${member.fineStatus} due`} 
                              color="error"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Fine Modal */}
      <Dialog
        open={openAddFineModal}
        onClose={() => setOpenAddFineModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <Typography variant="h6">Add Fine</Typography>
            <IconButton onClick={() => setOpenAddFineModal(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {selectedMember && (
            <>
              <div className="flex items-center gap-3 mb-4 mt-2">
                <Avatar 
                  src={selectedMember.profilePic} 
                  alt={selectedMember.fullName}
                  sx={{ width: 56, height: 56 }}
                />
                <div>
                  <Typography variant="h6">{selectedMember.fullName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedMember.admno} • {selectedMember.batch}
                  </Typography>
                </div>
              </div>
              
              <Divider sx={{ mb: 3 }} />
              
              {selectedMember.fineStatus && parseInt(selectedMember.fineStatus) > 0 && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  This member already has an existing fine of ₹{selectedMember.fineStatus}
                </Alert>
              )}
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="Fine Amount"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  value={fineAmount}
                  onChange={(e) => setFineAmount(e.target.value)}
                  fullWidth
                />
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="Reason for Fine"
                  multiline
                  rows={3}
                  value={fineReason}
                  onChange={(e) => setFineReason(e.target.value)}
                  fullWidth
                />
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddFineModal(false)}>Cancel</Button>
          <Button 
            onClick={addFine} 
            variant="contained" 
            sx={{ bgcolor: "#ca0019" }}
          >
            Add Fine
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({...alert, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setAlert({...alert, open: false})} 
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FineTable;