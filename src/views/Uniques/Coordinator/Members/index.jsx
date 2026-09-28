import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MemberCardDashboard } from "@/utils/Card/MemberCardDashboard";
import axios from "axios";
import { BASE_URL } from "@/config";
import {
  CircularProgress,
  TextField,
  InputAdornment,
  Pagination,
  Typography,
  Alert,
  Button,
  Snackbar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  getStoredBatches,
  addStoredBatch,
  suggestNextBatch,
} from "@/utils/batch/batchesData";

const MembersIndex = () => {
  // State for active batch filter or 'blocked'
  const [value, setValue] = useState("all");

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

  // Add member modal state
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [addMemberLoading, setAddMemberLoading] = useState(false);
  const [newMember, setNewMember] = useState({
    fullName: '',
    email: '',
    batch: '',
    admno: '',
    password: '',
    course: 'B.Tech CSE'
  });
  const [formErrors, setFormErrors] = useState({});
  const [addedMemberInfo, setAddedMemberInfo] = useState(null);

  // Dynamic batches state
  const [batches, setBatches] = useState(() => getStoredBatches());
  const [addBatchDialogOpen, setAddBatchDialogOpen] = useState(false);
  const [newBatchInput, setNewBatchInput] = useState("");
  const [addBatchTarget, setAddBatchTarget] = useState("new");

  useEffect(() => {
    const handleBatchesUpdate = (e) => {
      if (e.detail) {
        setBatches(e.detail);
      } else {
        setBatches(getStoredBatches());
      }
    };
    window.addEventListener("batches-updated", handleBatchesUpdate);
    return () => window.removeEventListener("batches-updated", handleBatchesUpdate);
  }, []);

  const handleOpenAddBatchDialog = (target = "new") => {
    setNewBatchInput(suggestNextBatch(batches));
    setAddBatchTarget(target);
    setAddBatchDialogOpen(true);
  };

  const handleAddNewBatchConfirm = () => {
    if (!newBatchInput.trim()) return;
    const added = addStoredBatch(newBatchInput.trim());
    const updated = getStoredBatches();
    setBatches(updated);
    if (addBatchTarget === "edit") {
      setEditingMember((prev) => ({ ...prev, batch: added }));
    } else if (addBatchTarget === "filter") {
      setValue(added);
      setPage(1);
      setSearch("");
    } else {
      setNewMember((prev) => ({ ...prev, batch: added }));
      if (formErrors.batch) {
        setFormErrors((prev) => ({ ...prev, batch: "" }));
      }
    }
    setNewBatchInput("");
    setAddBatchDialogOpen(false);
  };

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1); // Reset to first page when changing tabs
    setSearch(""); // Clear search when changing tabs
  };

  // Get batch filter based on current tab/selection
  const getBatchFilter = () => {
    if (value === "all" || value === "blocked") return null;
    return value;
  };

  // Fetch tab counts for badges
  const fetchTabCounts = async () => {
    try {
      // Get total count
      const totalResponse = await axios.get(`${BASE_URL}/api/admin/member/count`);

      // Get batch counts
      const batch1Response = await axios.get(`${BASE_URL}/api/admin/member/count`, {
        params: { batch: "The Uniques 1.0" }
      });

      const batch2Response = await axios.get(`${BASE_URL}/api/admin/member/count`, {
        params: { batch: "The Uniques 2.0" }
      });

      const batch3Response = await axios.get(`${BASE_URL}/api/admin/member/count`, {
        params: { batch: "The Uniques 3.0" }
      });

      const batch4Response = await axios.get(`${BASE_URL}/api/admin/member/count`, {
        params: { batch: "The Uniques 4.0" }
      });

      // Get blocked count
      const blockedResponse = await axios.get(`${BASE_URL}/api/admin/member/count`, {
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
      const response = await axios.get(`${BASE_URL}/api/admin/member`, { params });

      // Filter the results again on the client side to ensure only appropriate members are shown
      let filteredMembers = response.data.data || [];

      // Additional client-side filtering to ensure correct members in each tab
      if (value === "blocked") {
        filteredMembers = filteredMembers.filter(member => member.isSuspended === true);
      } else if (batchFilter) {
        filteredMembers = filteredMembers.filter(member => member.batch === batchFilter);
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

  const getProxyImageUrl = (fileId) => {
    if (!fileId) return '/placeholder.svg'; // Fallback image
    return `${BASE_URL}/api/image-proxy/${fileId}`;
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

  // Handle Add Member form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert admission number to uppercase
    const processedValue = name === 'admno' ? value.toUpperCase() : value;

    setNewMember({
      ...newMember,
      [name]: processedValue
    });

    // Clear error for this field if any
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!newMember.fullName.trim()) {
      errors.fullName = 'Name is required';
    }

    if (!newMember.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newMember.email)) {
      errors.email = 'Email is invalid';
    }

    if (!newMember.batch) {
      errors.batch = 'Batch is required';
    }

    if (!newMember.admno.trim()) {
      errors.admno = 'Admission number is required';
    } else if (!/^[0-9]{4}(BTCS|BTCED|BCA|AI|BTAI)[0-9]{2,4}$/i.test(newMember.admno.trim()) && !/^[0-9]{4}[A-Za-z]{2,5}[0-9]{2,4}$/.test(newMember.admno.trim())) {
      errors.admno = 'Invalid format. Expected: ####BTCS###, ####BTCED###, ####BCA### or ####AI###';
    }

    // Password is optional

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Add Member form submission
  const handleAddMemberSubmit = () => {
    if (validateForm()) {
      setConfirmationOpen(true);
    }
  };

  // Handle Add Member API call
  const handleConfirmAddMember = async () => {
    try {
      setAddMemberLoading(true);

      const response = await axios.post(`${BASE_URL}/api/admin/member/add`, newMember);

      if (response.data.success) {
        // Store member info in state
        const memberInfo = {
          member: response.data.data.member || {
            fullName: newMember.fullName,
            email: newMember.email,
            batch: newMember.batch
          },
          temporaryPassword: response.data.data.temporaryPassword || 'Password not available'
        };

        setAddedMemberInfo(memberInfo);

        // Show success message
        setAlert({
          open: true,
          message: 'Member added successfully!',
          severity: 'success'
        });

        // Close confirmation dialog
        setConfirmationOpen(false);

        // Refresh data
        fetchMembers();
        fetchTabCounts();

        // Reset form
        setNewMember({
          fullName: '',
          email: '',
          batch: '',
          admno: '',
          password: '',
          course: 'B.Tech CSE'
        });
      } else {
        throw new Error(response.data.message || 'Failed to add member');
      }
    } catch (err) {
      console.error("Error adding member:", err);

      setAlert({
        open: true,
        message: err.response?.data?.message || 'Failed to add member. Please try again.',
        severity: 'error'
      });

      setConfirmationOpen(false);
    } finally {
      setAddMemberLoading(false);
    }
  };

  // Close the added member info modal and reset
  const handleCloseAddedInfo = () => {
    setAddedMemberInfo(null);
    setAddMemberOpen(false);
  };

  // --- Edit Member State & Handlers ---
  const [editMemberOpen, setEditMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [editMemberLoading, setEditMemberLoading] = useState(false);

  const handleEditClick = (member) => {
    setEditingMember({ ...member }); // Create a copy
    setEditMemberOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMember({
      ...editingMember,
      [name]: name === 'admno' ? value.toUpperCase() : value
    });
  };

  const handleEditSubmit = async () => {
    if (!editingMember) return;

    try {
      setEditMemberLoading(true);
      // Use the appropriate update endpoint
      const response = await axios.put(`${BASE_URL}/api/admin/member/${editingMember._id}`, editingMember);

      if (response.data.success) {
        setAlert({
          open: true,
          message: 'Member updated successfully',
          severity: 'success'
        });
        setEditMemberOpen(false);
        fetchMembers(); // Refresh list
        fetchTabCounts(); // Refresh counts
      }
    } catch (err) {
      console.error("Error updating member:", err);
      setAlert({
        open: true,
        message: err.response?.data?.message || 'Failed to update member',
        severity: 'error'
      });
    } finally {
      setEditMemberLoading(false);
    }
  };

  // --- Delete Member State & Handlers ---
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [deleteMemberLoading, setDeleteMemberLoading] = useState(false);

  const handleDeleteClick = (memberId) => {
    // Find the member object for display name in confirmation
    const member = members.find(m => m._id === memberId);
    setMemberToDelete(member);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteMember = async () => {
    if (!memberToDelete) return;

    try {
      setDeleteMemberLoading(true);
      const response = await axios.delete(`${BASE_URL}/api/admin/member/${memberToDelete._id}`);

      if (response.data.success) {
        setAlert({
          open: true,
          message: 'Member deleted successfully',
          severity: 'success'
        });
        setDeleteConfirmationOpen(false);
        setMemberToDelete(null);
        fetchMembers(); // Refresh list
        fetchTabCounts(); // Refresh counts
      }
    } catch (err) {
      console.error("Error deleting member:", err);
      console.error("Error response:", err.response); // Helper log
      setAlert({
        open: true,
        message: err.response?.data?.message || err.message || 'Failed to delete member',
        severity: 'error'
      });
    } finally {
      setDeleteMemberLoading(false);
    }
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

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          flexWrap: "wrap",
          gap: 2,
        }}>
          {/* Batches Dropdown + Blocked Members button beside it */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={value === "blocked" ? "all" : value}
                displayEmpty
                onChange={(e) => {
                  if (e.target.value === "__add_new_batch__") {
                    handleOpenAddBatchDialog("filter");
                  } else {
                    setValue(e.target.value);
                    setPage(1);
                    setSearch("");
                  }
                }}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: value !== "blocked" ? "rgba(202, 0, 25, 0.04)" : "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: value !== "blocked" ? "#ca0019" : "divider",
                    borderWidth: value !== "blocked" ? "1.5px" : "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ca0019",
                  },
                }}
              >
                <MenuItem value="all" sx={{ fontWeight: value === "all" ? 600 : 400 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 2 }}>
                    <span>All Batches</span>
                    <Badge badgeContent={tabCounts.all} color="primary" max={999} />
                  </Box>
                </MenuItem>
                {batches.map((batch) => (
                  <MenuItem
                    key={batch}
                    value={batch}
                    sx={{ fontWeight: value === batch ? 600 : 400 }}
                  >
                    {batch}
                  </MenuItem>
                ))}
                <MenuItem
                  value="__add_new_batch__"
                  sx={{
                    color: "#ca0019",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderTop: "1px dashed",
                    borderColor: "divider",
                    mt: 0.5,
                    pt: 1,
                    "&:hover": {
                      bgcolor: "rgba(202, 0, 25, 0.08)",
                    },
                  }}
                >
                  <AddCircleOutlineIcon fontSize="small" sx={{ color: "#ca0019" }} />
                  + Add New Batch
                </MenuItem>
              </Select>
            </FormControl>

            {/* Blocked Members side button */}
            <Button
              variant={value === "blocked" ? "contained" : "outlined"}
              onClick={() => {
                setValue("blocked");
                setPage(1);
                setSearch("");
              }}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                borderColor: value === "blocked" ? "#ca0019" : "divider",
                bgcolor: value === "blocked" ? "#ca0019" : "transparent",
                color: value === "blocked" ? "#fff" : "text.secondary",
                "&:hover": {
                  borderColor: "#ca0019",
                  bgcolor: value === "blocked" ? "#a30014" : "rgba(202, 0, 25, 0.04)",
                  color: value === "blocked" ? "#fff" : "#ca0019",
                },
                px: 2,
                py: 0.9,
              }}
            >
              <Badge
                badgeContent={tabCounts.blocked}
                color="error"
                max={999}
                sx={{ "& .MuiBadge-badge": { right: -8, top: 2 } }}
              >
                Blocked Members
              </Badge>
            </Button>
          </Box>

          {/* Add Member Button */}
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setAddMemberOpen(true)}
            sx={{
              bgcolor: "#ca0019",
              "&:hover": { bgcolor: "#a30014" },
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Add Member
          </Button>
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

        {/* Tab panel for members */}
        <TabPanel value={value} sx={{ px: 0 }}>
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
                  : value === "blocked"
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
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
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
      </TabContext>

      {/* Add Member Modal */}
      <Dialog
        open={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 500 }}>Add New Member</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoFocus
              value={newMember.fullName}
              onChange={handleInputChange}
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={newMember.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <FormControl
              fullWidth
              margin="normal"
              required
              error={!!formErrors.batch}
            >
              <InputLabel>Batch</InputLabel>
              <Select
                name="batch"
                value={newMember.batch}
                label="Batch"
                onChange={(e) => {
                  if (e.target.value === "__add_new_batch__") {
                    handleOpenAddBatchDialog("new");
                  } else {
                    handleInputChange(e);
                  }
                }}
              >
                {batches.map((b) => (
                  <MenuItem key={b} value={b}>
                    {b}
                  </MenuItem>
                ))}
                <MenuItem
                  value="__add_new_batch__"
                  sx={{
                    color: "#ca0019",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderTop: "1px dashed",
                    borderColor: "divider",
                    mt: 0.5,
                    pt: 1,
                    "&:hover": {
                      bgcolor: "rgba(202, 0, 25, 0.08)",
                    },
                  }}
                >
                  <AddCircleOutlineIcon fontSize="small" sx={{ color: "#ca0019" }} />
                  + Add New Batch
                </MenuItem>
              </Select>
              {formErrors.batch && <FormHelperText>{formErrors.batch}</FormHelperText>}
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="admno"
              label="Admission Number"
              name="admno"
              placeholder="e.g. 2021BTCS001"
              value={newMember.admno}
              onChange={handleInputChange}
              error={!!formErrors.admno}
              helperText={formErrors.admno || "Format: ####BTCS###, ####BTCED###, ####BCA### or ####AI###"}
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                name="course"
                value={newMember.course}
                label="Course"
                onChange={handleInputChange}
              >
                <MenuItem value="B.Tech CSE">B.Tech CSE</MenuItem>
                <MenuItem value="CSD">CSD</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="AI">AI</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password (Optional)"
              name="password"
              type="password"
              value={newMember.password}
              onChange={handleInputChange}
              helperText="If left blank, a random password will be generated"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddMemberOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddMemberSubmit}
            variant="contained"
            sx={{ bgcolor: "#ca0019", "&:hover": { bgcolor: "#a30014" } }}
          >
            Add Member
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Batch Dialog */}
      <Dialog
        open={addBatchDialogOpen}
        onClose={() => setAddBatchDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Add New Batch</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter batch name or version (e.g. 5.0, 6.0, The Uniques 5.0):
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Batch Name"
            placeholder="e.g. The Uniques 5.0"
            value={newBatchInput}
            onChange={(e) => setNewBatchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddNewBatchConfirm();
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddBatchDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddNewBatchConfirm}
            sx={{ bgcolor: "#ca0019", "&:hover": { bgcolor: "#a30014" } }}
          >
            Add Batch
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog
        open={confirmationOpen}
        onClose={() => !addMemberLoading && setConfirmationOpen(false)}
      >
        <DialogTitle>Confirm New Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to add this member?
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Member Details:</Typography>
            <Typography variant="body2"><strong>Name:</strong> {newMember.fullName}</Typography>
            <Typography variant="body2"><strong>Email:</strong> {newMember.email}</Typography>
            <Typography variant="body2"><strong>Batch:</strong> {newMember.batch}</Typography>
            <Typography variant="body2"><strong>Admission No:</strong> {newMember.admno}</Typography>
            <Typography variant="body2"><strong>Course:</strong> {newMember.course}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmationOpen(false)}
            disabled={addMemberLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAddMember}
            variant="contained"
            color="primary"
            disabled={addMemberLoading}
          >
            {addMemberLoading ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      {addedMemberInfo && (
        <Dialog
          open={!!addedMemberInfo}
          onClose={handleCloseAddedInfo}
        >
          <DialogTitle sx={{ color: 'green' }}>
            Member Added Successfully
          </DialogTitle>
          <DialogContent>
            <Alert severity="success" sx={{ mb: 2 }}>
              The new member has been added! They can now log in with their credentials.
            </Alert>

            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>Member Account Details:</Typography>
              <Typography variant="body2">
                <strong>Name:</strong> {addedMemberInfo.member?.fullName || newMember.fullName}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {addedMemberInfo.member?.email || newMember.email}
              </Typography>
              <Typography variant="body2">
                <strong>Password:</strong> {addedMemberInfo.temporaryPassword}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Please share these credentials with the member. They will be asked to change their password on first login.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseAddedInfo}
              variant="contained"
              color="primary"
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Member Modal */}
      <Dialog
        open={editMemberOpen}
        onClose={() => setEditMemberOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 500 }}>Edit Member</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="edit-fullName"
              label="Full Name"
              name="fullName"
              value={editingMember?.fullName || ''}
              onChange={handleEditInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="edit-email"
              label="Email Address"
              name="email"
              type="email"
              value={editingMember?.email || ''}
              onChange={handleEditInputChange}
              disabled // Email usually shouldn't be changed as it's an identifier
              helperText="Email cannot be changed"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Batch</InputLabel>
              <Select
                name="batch"
                value={editingMember?.batch || ''}
                label="Batch"
                onChange={(e) => {
                  if (e.target.value === "__add_new_batch__") {
                    handleOpenAddBatchDialog("edit");
                  } else {
                    handleEditInputChange(e);
                  }
                }}
              >
                {batches.map((b) => (
                  <MenuItem key={b} value={b}>
                    {b}
                  </MenuItem>
                ))}
                <MenuItem
                  value="__add_new_batch__"
                  sx={{
                    color: "#ca0019",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderTop: "1px dashed",
                    borderColor: "divider",
                    mt: 0.5,
                    pt: 1,
                    "&:hover": {
                      bgcolor: "rgba(202, 0, 25, 0.08)",
                    },
                  }}
                >
                  <AddCircleOutlineIcon fontSize="small" sx={{ color: "#ca0019" }} />
                  + Add New Batch
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="edit-admno"
              label="Admission Number"
              name="admno"
              value={editingMember?.admno || ''}
              onChange={handleEditInputChange}
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                name="course"
                value={editingMember?.course || ''}
                label="Course"
                onChange={handleEditInputChange}
              >
                <MenuItem value="B.Tech CSE">B.Tech CSE</MenuItem>
                <MenuItem value="CSD">CSD</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="AI">AI</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEditMemberOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={editMemberLoading}
            sx={{ bgcolor: "#F59E0B", "&:hover": { bgcolor: "#D97706" } }} // Orange for update
          >
            {editMemberLoading ? <CircularProgress size={24} /> : 'Update Member'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => !deleteMemberLoading && setDeleteConfirmationOpen(false)}
      >
        <DialogTitle sx={{ color: '#dc2626' }}>Delete Member?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete <strong>{memberToDelete?.fullName}</strong>?
            <br /><br />
            <span style={{ color: '#dc2626', fontSize: '0.9rem' }}>
              Warning: This action cannot be undone. All data associated with this member, including their profile picture, will be permanently removed.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationOpen(false)}
            disabled={deleteMemberLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteMember}
            variant="contained"
            color="error"
            disabled={deleteMemberLoading}
            startIcon={deleteMemberLoading && <CircularProgress size={20} color="inherit" />}
          >
            {deleteMemberLoading ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MembersIndex;
