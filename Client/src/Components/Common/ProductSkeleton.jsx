import React from "react";
import { Grid, Box, Skeleton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ProductSkeleton = ({ count = 6 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Grid container spacing={1}>
      {Array.from({ length: count }, (_, idx) => (
        <Grid
          item
          key={idx}
          xs={6} 
          sm={6} 
          md={2}
        >
          <Box
            p={2}
            border="1px solid #ddd"
            borderRadius="12px"
            boxShadow={1}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={100}
              sx={{ borderRadius: "10px" }}
            />
            <Box mt={1}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={18} />
              <Skeleton variant="text" width="30%" height={18} />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Skeleton variant="text" width="40%" height={22} />
                <Skeleton
                  variant="rectangular"
                  width="60px"
                  height="32px"
                  sx={{ borderRadius: "8px", mt: 1 }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductSkeleton;
