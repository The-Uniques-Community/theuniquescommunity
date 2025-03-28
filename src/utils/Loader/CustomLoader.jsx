import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const CustomLoader = () => (
  <Box sx={{ position: "fixed", top: 0, left: 0, zIndex: 1301, width: "100%" }}>
    <LinearProgress color="primary" />
  </Box>
);

export default CustomLoader;
