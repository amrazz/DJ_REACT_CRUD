import React, { useState, useEffect, useCallback } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Use `jwt-decode` to decode the token
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const ProtectedRoutes = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh: refreshToken,
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      setIsAuthorized(true);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      localStorage.clear();
      setIsAuthorized(false);
    }
  }, [refreshToken]);

  const checkTokenValidity = useCallback(() => {
    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp < currentTime) {
        refreshAccessToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthorized(false);
    }
  }, [accessToken, refreshAccessToken]);

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  if (isAuthorized === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : null;
};

export default ProtectedRoutes;
