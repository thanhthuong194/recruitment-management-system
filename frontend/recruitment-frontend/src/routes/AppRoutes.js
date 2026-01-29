/**
 * @fileoverview Cấu hình routing chính của ứng dụng
 * @module routes/AppRoutes
 * @description Định nghĩa tất cả các routes của ứng dụng,
 * bao gồm cả public routes và protected routes
 */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Pages imports
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import RecruitmentPlanPage from "../pages/RecruitmentPlanPage";
import ProfilePage from "../pages/ProfilePage";
import NotificationManagementPage from "../pages/NotificationManagementPage";
import PublicNotificationsPage from "../pages/PublicNotificationsPage";
import UserManagementPage from "../pages/UserManagementPage";
import PublicJobsPage from "../pages/PublicJobsPage";
import ApplicationFormPage from "../pages/ApplicationFormPage";
import CandidatesManagementPage from "../pages/CandidatesManagementPage";

/**
 * Component chứa tất cả các routes của ứng dụng
 * @component
 * @returns {JSX.Element} Routes configuration
 * 
 * @description
 * Public routes (không cần đăng nhập):
 * - / : Landing page
 * - /login : Trang đăng nhập
 * - /forgot-password : Trang quên mật khẩu
 * - /notifications : Thông báo tuyển dụng công khai
 * - /jobs : Danh sách việc làm công khai
 * - /apply/:jobId : Form nộp hồ sơ
 * 
 * Protected routes (cần đăng nhập):
 * - /home : Trang chủ sau đăng nhập
 * - /recruitment/plan : Quản lý kế hoạch tuyển dụng
 * - /recruitment/notifications : Quản lý thông báo
 * - /profile : Trang cá nhân
 * - /users : Quản lý người dùng (Admin)
 * - /candidates : Quản lý ứng viên
 * 
 * @example
 * // Sử dụng trong App.js
 * function App() {
 *   return <AppRoutes />;
 * }
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/notifications" element={<PublicNotificationsPage />} />
      
      {/* Public routes for job applications */}
      <Route path="/jobs" element={<PublicJobsPage />} />
      <Route path="/apply/:jobId" element={<ApplicationFormPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/recruitment/plan"
        element={
          <ProtectedRoute>
            <RecruitmentPlanPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruitment/notifications"
        element={
          <ProtectedRoute>
            <NotificationManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <CandidatesManagementPage />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
