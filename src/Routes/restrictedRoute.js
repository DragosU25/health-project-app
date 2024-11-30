import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const { IsAuthenticated } = useAuth();

  return IsAuthenticated ? <Navigate to={redirectTo} /> : Component;
};
