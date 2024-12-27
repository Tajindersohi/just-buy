import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import GeneralLayout from "../Layouts/GeneralLayout";
import LoadingIndicator from "../Components/Common/LoadingIndicator";

const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));
const Contact = lazy(() => import("../Pages/Contact"));
const NotFound = lazy(() => import("../Pages/NotFound"));

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingIndicator/>}>
            <Routes>
                <Route path="/" element={<GeneralLayout><Home /></GeneralLayout>} />
                <Route path="/about" element={<GeneralLayout><About /></GeneralLayout>} />
                <Route path="/contact" element={<GeneralLayout><Contact /></GeneralLayout>} />
                <Route path="*" element={<GeneralLayout><NotFound /></GeneralLayout>} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
