import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/authContext";
import React from "react";
export const PrivateRoute = ({ children }) => {
    const { login } = useAuth();
    return login ? children : <Navigate to="/login" />;
};
