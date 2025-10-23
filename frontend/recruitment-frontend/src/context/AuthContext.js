// File: src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
// 💡 LƯU Ý: Đảm bảo đường dẫn tới AuthService là chính xác
import { 
    loginService, 
    registerService, 
    forgotPasswordService 
} from '../services/AuthService'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Khai báo State
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- 1. LOGIN ---
    // Nhận đầu vào đơn giản (được trích xuất từ formData của hook useAuth)
    const login = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            // Gọi Service Layer
            const authResponse = await loginService(formData); 

            // Cập nhật trạng thái và lưu token
            setUser(authResponse);
            localStorage.setItem('accessToken', authResponse.token); 
            setIsLoading(false);
            return authResponse;
            
        } catch (err) {
            setError(err.message || "Đăng nhập thất bại.");
            setIsLoading(false);
            throw err; // Ném lỗi để useAuth bắt và hiển thị
        }
    };
    
    // --- 2. REGISTER ---
    const register = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            // Gọi Service Layer
            const registerResponse = await registerService(formData); 
            
            setIsLoading(false);
            // Trả về message để hook useAuth xử lý
            return { message: "Đăng ký thành công. Vui lòng đăng nhập.", ...registerResponse }; 
            
        } catch (err) {
            setError(err.message || "Đăng ký thất bại.");
            setIsLoading(false);
            throw err;
        }
    };

    // --- 3. FORGOT PASSWORD ---
    const forgotPassword = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            // Gọi Service Layer
            const forgotResponse = await forgotPasswordService(formData); 

            setIsLoading(false);
            // Trả về message để hook useAuth hiển thị
            return { message: forgotResponse.message || "Đã gửi yêu cầu đặt lại mật khẩu.", ...forgotResponse }; 
            
        } catch (err) {
            setError(err.message || "Không thể gửi yêu cầu đặt lại mật khẩu.");
            setIsLoading(false);
            throw err;
        }
    };
    
    // --- 4. LOGOUT ---
    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
    };

    // --- 5. INITIAL CHECK (Duy trì trạng thái đăng nhập) ---
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Có thể gọi API refresh token hoặc kiểm tra token tại đây
            // Hiện tại: Tạm thời set user để duy trì trạng thái
            setUser({ token: token, username: 'Authenticated User' });
        }
    }, []);

    const authState = { 
        user, 
        login, 
        register,
        forgotPassword,
        logout, 
        isLoading, 
        error 
    };

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};