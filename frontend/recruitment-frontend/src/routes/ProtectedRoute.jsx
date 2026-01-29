/**
 * @fileoverview Component bảo vệ routes cần xác thực
 * @module routes/ProtectedRoute
 * @description HOC kiểm tra xác thực trước khi cho phép truy cập route
 */

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Component bảo vệ route cần xác thực
 * @component
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Component cần bảo vệ
 * @returns {JSX.Element} Children nếu đã đăng nhập, hoặc redirect đến /login
 * 
 * @description
 * - Kiểm tra user trong AuthContext
 * - Hiển thị loading khi đang khởi tạo
 * - Redirect đến /login nếu chưa đăng nhập
 * - Render children nếu đã đăng nhập
 * 
 * @example
 * <Route
 *   path="/home"
 *   element={
 *     <ProtectedRoute>
 *       <HomePage />
 *     </ProtectedRoute>
 *   }
 * />
 */
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
