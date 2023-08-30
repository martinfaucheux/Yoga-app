import React from "react";
import { useAuth } from "../utils/AuthService";
import { Navigate, Outlet } from "react-router-dom";

const LOGIN_ROUTE = "/login";
const VERIFY_REQUEST_ROUTE = "/verify-request";

const PrivateRoute = () => {
  const { isAuthenticated, userData } = useAuth();
  const isVerified = userData?.is_verified;

  if (isAuthenticated) {
    if (!isVerified) {
      return <Navigate to={VERIFY_REQUEST_ROUTE} />;
    }
    return <Outlet />;
  }
  return <Navigate to={LOGIN_ROUTE} />;
};

export default PrivateRoute;
