import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userState = useSelector((state) => state.user);
  const authState = useSelector((state) => state.auth);
  const user = authState.user || userState.user;
  console.log("useruseruseruseruseruseruseruseruser",user)
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
