import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingIndicator from "../Components/Common/LoadingIndicator";
import PrivateRoute from "./PrivateRoutes";
import AdminRoute from "./AdminRoutes";
import GeneralLayout from "../Layouts/GeneralLayout";
import AdminLayout from "../Pages/Admin/AdminLayout";
import ProfileView from "../Components/Common/ProfileView";
import CategoryProductsPage from "../Pages/Home/CategoryProductsPage";
import CategoriesPage from "../Pages/Home/CategoriesPage";
import AddressModal from "../Pages/Address";
import ThankYouPage from "../Pages/ThankYouPage";
import MyAccount from "../Pages/Account";

// Lazy-loaded Pages
const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));
const Contact = lazy(() => import("../Pages/Contact"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const Login = lazy(() => import("../Pages/Admin/Login"));
const Logout = lazy(() => import("../Pages/Admin/Logout/Logout"));
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard"));
const CategoryManager = lazy(() => import("../Pages/Admin/Products"));
const ProductDetails = lazy(() => import("../Pages/Admin/Products/ProductDetails"));
const Users = lazy(() => import("../Pages/Admin/Users"));

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Routes>

        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            user
              ? user.userRole === "admin"
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/" />
              : <Login />
          }
        />

        <Route element={<PrivateRoute />}>
          <Route element={<GeneralLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/addresses" element={<AddressModal />} />
            {/* <Route path="/orders" element={<Orders />} /> */}
            <Route path="/account" element={<MyAccount />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/logout" element={<Logout />} />
            <Route path="/admin/categories" element={<CategoryManager />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
