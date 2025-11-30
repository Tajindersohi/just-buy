import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom"; // ✅ Import this
import PageLoader from "../Components/Common/PageLoader";
import { useSelector } from "react-redux";

const GeneralLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { userLoaded,isFetching } = useSelector((state) => state.user);
    if (!userLoaded) {
        return <PageLoader type="circular" />;
    }

    return (
        <Container maxWidth="xl" disableGutters>
            <Header />
            <Box 
            sx={{
                px: { xs: 2, sm: 4, md: 8 },
                py: { xs: 2, sm: 4 },
            }}      
            >
                <Outlet />
            </Box>
            <Footer />
        </Container>
    );
};



export default GeneralLayout;
