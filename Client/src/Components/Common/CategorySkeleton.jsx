import { Grid, Skeleton, Typography, Box } from "@mui/material";

const CategorySkeleton = ({ count = 8 }) => {
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {Array.from({ length: count }).map((_, i) => (
        <Grid item xs={3} sm={2} md={1.5} key={i}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Skeleton variant='rectangular' width={130} height={120} sx={{borderRadius:1}}/>
            <Skeleton variant="text" width={130} height={18} sx={{ mt: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySkeleton;
