import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../Pages/Admin/AdminLayout";

const PrivateRoute = ({ user }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="admin/login" />;
  }
  return <AdminLayout><Outlet /></AdminLayout>;
};

export default PrivateRoute;
