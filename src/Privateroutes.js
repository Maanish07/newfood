import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Privateroutes = () => {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/admin" />;
};

export default Privateroutes;