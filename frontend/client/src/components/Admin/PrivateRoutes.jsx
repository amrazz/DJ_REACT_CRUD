import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const isAdmin = localStorage.getItem("ADMIN_TOKEN");
    if (!isAdmin){
        return <Navigate to="/admin/login" />
    }

    return children;
};

export default PrivateRoutes;
