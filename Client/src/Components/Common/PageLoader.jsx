import { Box, CircularProgress } from "@mui/material";

export default function PageLoader() {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}
