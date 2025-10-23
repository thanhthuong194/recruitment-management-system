import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isInitializing } = useContext(AuthContext);

  if (isInitializing) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Đang tải...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
