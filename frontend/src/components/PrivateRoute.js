import React from "react";
import { useAuth } from "../utils/AuthService";
import { useUserData } from "../utils/UserDataService";
import { Navigate, Outlet } from "react-router-dom";

const LOGIN_ROUTE = "/login";
const VERIFY_REQUEST_ROUTE = "/verify-request";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const { userData } = useUserData();
  const isVerified = userData !== null ? userData.is_verified : null;

  if (isAuthenticated) {
    if (!isVerified) {
      return <Navigate to={VERIFY_REQUEST_ROUTE} />;
    }
    return <Outlet />;
  }
  return <Navigate to={LOGIN_ROUTE} />;
};

export default PrivateRoute;
