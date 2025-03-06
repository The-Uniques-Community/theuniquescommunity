import React, { useState } from "react";
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
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { fineData } from "@/assets/dummyData/fineData";
import tu from '@/assets/logos/tu.png'

// Status Colors
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

const FineTable = () => {
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Filtered fineData
  const filteredfineData = fineData.filter(
    (fine) =>
      (batchFilter === "All Batches" || fine.batch === batchFilter) &&
      (fine.name.toLowerCase().includes(search.toLowerCase()) ||
        fine.reason.toLowerCase().includes(search.toLowerCase()))
  );

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
            <Button variant="contained" startIcon={<FileDownloadIcon />}>
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
              <MenuItem value="The Uniques 4.0">The Uniques 4.0</MenuItem>
            </Select>
          </div>
        </div>
      </Box>

      {/* fineData Table */}
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
                Imposed On
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Reason
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Fine Status
              </TableCell>
              <TableCell sx={{ color: "#555", fontWeight: "bold" }}>
                Paid Via
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredfineData
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((fine, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#333" }}>{fine.name}</TableCell>
                  <TableCell sx={{ color: "#333" }}><div className="flex gap-x-1 items-center"> <img className="h-5 w-5 object-center object-contain inline" src={tu} alt="TU"/> {fine.batch}</div></TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {fine.fineAmount}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>{fine.imposedOn}</TableCell>
                  <TableCell sx={{ color: "#333" }}>{fine.reason}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                    }}
                  >
                    {getStatusChip(fine.status)}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>{fine.paidVia}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
  <Pagination
    count={Math.ceil(filteredfineData.length / rowsPerPage)}
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

    </Box>
  );
};

export default FineTable;
