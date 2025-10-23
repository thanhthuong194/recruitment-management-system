import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Pages
import HomePage from '../pages/HomePage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
// import ProfilePage from '../pages/ProfilePage';

const AppRoutes = () => {
  const { user } = useContext(AuthContext); 

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route 
        path="/home" 
        element={user ? <HomePage /> : <Navigate to="/login" />} 
      />

      <Route 
        path="/login" 
        element={!user ? <LoginPage /> : <Navigate to="/home" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <RegisterPage /> : <Navigate to="/home" />} 
      />
      <Route 
        path="/forgot-password" 
        element={!user ? <ForgotPasswordPage /> : <Navigate to="/home" />} 
      />

      {/* <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} /> */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
