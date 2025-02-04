import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import GeneralLayout from "../Layouts/GeneralLayout";
import LoadingIndicator from "../Components/Common/LoadingIndicator";
import Login from "../Pages/Admin/Login";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../Pages/Admin/Dashboard";
import { useSelector } from "react-redux";
import Logout from "../Pages/Admin/Logout/Logout";
import Category from "../Pages/Admin/Category";
const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));
const Contact = lazy(() => import("../Pages/Contact"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const ProductList = lazy(() => import("../Pages/Admin/Products"));

const AppRoutes = () => {
    const user = useSelector((state) => state.auth);
    const token = localStorage.getItem("token");

    const commonRoutes = () => {
        return (
            <>
                <Route
                    element={
                        token ? <Navigate to="/admin/dashboard" /> : <Outlet />
                    }
                >
                    <Route path="/admin/login" element={<Login />} />
                </Route>
                <Route path="/" element={<GeneralLayout><Home /></GeneralLayout>} />
                <Route path="/about" element={<GeneralLayout><About /></GeneralLayout>} />
                <Route path="/contact" element={<GeneralLayout><Contact /></GeneralLayout>} />
                <Route path="*" element={<GeneralLayout><NotFound /></GeneralLayout>} />
            </>
        )
    }

    const adminRoutes = () => {
        return (
            <>
                <Route path="/admin/categories" element={<ProductList />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/logout" element={<Logout />} />
            </>
        )
    }
   
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Routes>
                {/*Admin Routes */}
                <Route
                    element={
                        <PrivateRoute user={user} />
                    }
                >
                    {adminRoutes()}   
                </Route>
                {commonRoutes()}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
