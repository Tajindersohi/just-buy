import React from "react";
import { Grid, Skeleton, Card, Box, CardContent } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const ProductSkeleton = ({ count = 6 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const getImageHeight = () => {
    if (isMobile) return 100;
    if (isTablet) return 130;
    return 150;
  };

  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid item xs={4} sm={4} md={3} lg={2} key={i}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 1,
              backgroundColor: theme.palette.background.paper,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ p: 1 }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={getImageHeight()}
                sx={{ borderRadius: 2 }}
              />
            </Box>

            <CardContent sx={{ pt: 1, px: 1.5 }}>
              <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="50%" height={15} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={20} />
            </CardContent>

            <Box px={1.5} pb={2}>
              <Skeleton variant="rectangular" height={32} width="100%" sx={{ borderRadius: 1 }} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductSkeleton;
