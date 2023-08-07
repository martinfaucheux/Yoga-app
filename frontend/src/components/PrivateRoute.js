// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { useAuth } from "../utils/AuthService";
import { Navigate, Outlet } from "react-router-dom";

const LOGIN_ROUTE = "/login";

const PrivateRoute = () => {
  const { isAuthenticated, login, logout } = useAuth();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />;
};

export default PrivateRoute;
