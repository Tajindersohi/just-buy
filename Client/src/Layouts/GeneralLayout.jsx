import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom"; // ✅ Import this

const GeneralLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Container 
            maxWidth="xl"  
            disableGutters 
            sx={{
                px: isMobile ? 2 : 4, 
            }}
        >
            <Header />

            <Grid 
                container 
                spacing={isMobile ? 1 : 2} 
                mt={isMobile ? 1 : 2} 
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <Outlet />
                </Grid>
            </Grid>

            <Box mt={isMobile ? 2 : 4}>
                <Footer />
            </Box>
        </Container>
    );
};

export default GeneralLayout;
