import React, { createContext, useState, useEffect } from "react";
import {
  loginService,
  registerService,
  forgotPasswordService,
  verifyTokenService,
} from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true); // Trạng thái kiểm tra token

  // 🟢 Đăng nhập
  const login = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const authResponse = await loginService(formData);
      setUser(authResponse.user);
      localStorage.setItem("accessToken", authResponse.token);
      return authResponse;
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 Đăng ký
  const register = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const registerResponse = await registerService(formData);
      return registerResponse;
    } catch (err) {
      setError(err.message || "Đăng ký thất bại.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 Quên mật khẩu
  const forgotPassword = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await forgotPasswordService(formData);
      return response;
    } catch (err) {
      setError(err.message || "Không thể gửi yêu cầu đặt lại mật khẩu.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  // 🟢 Kiểm tra token khi app khởi động
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const userData = await verifyTokenService(token);
        setUser(userData);
      } catch (err) {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        forgotPassword,
        logout,
        isLoading,
        error,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
