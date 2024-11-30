import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { IsAuthenticated } = useAuth();

  const shoudlRedirect = !IsAuthenticated;
  return shoudlRedirect ? <Navigate to={redirectTo} /> : Component;
};
