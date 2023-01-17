import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function PageLoaderLarge() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="600px"
    >
      <CircularProgress size={40} />
    </Box>
  );
}
