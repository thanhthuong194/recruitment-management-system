import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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
