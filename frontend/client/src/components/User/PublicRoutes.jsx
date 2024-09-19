import React, { useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";

const PublicRoutes = ({ children }) => {
  const location = useLocation();

  const token = useMemo(() => localStorage.getItem(ACCESS_TOKEN), []);

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default PublicRoutes;
