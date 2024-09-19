import React from "react";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Login from "./components/User/Auth/Login";
import Register from "./components/User/Auth/Register";
import AdminLogin from "./components/Admin/AdminLogin";
import PublicRoutes from "./components/User/publicRoutes";
import CreateUser from "./components/Admin/User/CreateUser";
import UpdateUser from "./components/Admin/User/UpdateUser";
import PrivateRoutes from "./components/Admin/PrivateRoutes";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoutes from "./components/User/protectedRoutes";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />

        <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />

        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<PrivateRoutes> <AdminDashboard /></PrivateRoutes>} />

        <Route path="/admin/create-user" element={<PrivateRoutes><CreateUser /></PrivateRoutes>} />
        <Route path="/admin/update-user/:id" element={<PrivateRoutes><UpdateUser /></PrivateRoutes>} />
      </Routes>
    </Router>
  );
};

export default App;
