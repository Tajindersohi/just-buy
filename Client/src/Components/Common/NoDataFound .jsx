import React from "react";
import { Box, Typography } from "@mui/material";

const NoDataFound = ({ message = "No items found.", icon = "🛒" }) => {
  return (
    <Box textAlign="center" py={4}>
      <Typography variant="h3" fontSize={48}>
        {icon}
      </Typography>
      <Typography variant="h6" color="text.secondary" mt={1}>
        {message}
      </Typography>
    </Box>
  );
};

export default NoDataFound;
