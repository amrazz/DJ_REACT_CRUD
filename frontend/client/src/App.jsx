import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/User/Auth/Register";
import Home from "./pages/Home/Home";
import Login from "./components/User/Auth/Login";
import NotFound from "./pages/NotFound";
import PublicRoutes from "./components/User/publicRoutes";
import ProtectedRoutes from "./components/User/protectedRoutes";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Protected route for home */}
        <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />

        {/* Public routes for login and register */}
        <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />

        {/* Logout and fallback routes */}
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
