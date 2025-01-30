import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import Constant from "./Constant"; 

const Footer = () => {
  const [usefulLinks, categories] = Constant; 

  return (
    <Box sx={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
      <Grid container spacing={4}>
        {/* Useful Links Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight={700} color="primary">
            Useful Links
          </Typography>
          <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "10px 30px",
                marginTop: "10px",
                gridAutoRows: "auto",
                alignItems: "start", // Align items to the top
            }}
            >
            {usefulLinks.map((link, index) => (
                <Link key={index} href="#" color="inherit" underline="none" sx={{ fontSize: "14px" }}>
                {link}
                </Link>
            ))}
            </Box>

        </Grid>

        {/* Categories Section */}
        <Grid item xs={12} sm={6} md={8}>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
            <Typography variant="h6" fontWeight={700}>
              Categories
            </Typography>
            <Link href="#" color="success.main" underline="none" sx={{ fontSize: "14px" }}>
              see all
            </Link>
          </Box>
          <Box sx={{ display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",gap: "10px 30px" }}>
            {categories.map((category, index) => (
              <Link key={index} href="#" color="inherit" underline="none" sx={{ fontSize: "14px" }}>
                {category}
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
