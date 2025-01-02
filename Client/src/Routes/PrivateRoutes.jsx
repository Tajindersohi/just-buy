import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="admin/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
