import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Box, Container, Grid } from "@mui/material";

const GeneralLayout = ({ children }) => {
    return (
            <Container fixed>
            <Header />
            {/* Main Layout */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                  {children}
              </Grid>
            </Grid>
      
            <Box mt={4}>
              <Footer />
            </Box>
          </Container>
    );
};

export default GeneralLayout;
