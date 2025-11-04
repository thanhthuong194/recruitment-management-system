import React, { createContext, useState, useEffect } from 'react';

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
    const login = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const authResponse = await loginService(formData); 
            
            // =========================================================================
            // ✅ PHẦN SỬA CHỮA: XỬ LÝ KHI BACKEND TRẢ VỀ CHUỖI VĂN BẢN (STRING)
            // =========================================================================
            if (typeof authResponse === 'string' && authResponse.startsWith("✅")) {
                // Backend trả về chuỗi thành công, không có token/user. 
                const username = formData.username; 
                const tempToken = 'logged_in'; 
                
                // 1. Lưu token và user tạm thời (token/user/role giả)
                localStorage.setItem('accessToken', tempToken);
                // Lưu role admin để logic FE phân quyền có thể hoạt động
                localStorage.setItem('user', JSON.stringify({username: username, role: 'admin'})); 
                setUser({username: username, role: 'admin'});
                
                setIsLoading(false);
                return { success: true }; // Trả về thành công và NGẮT LUỒNG Ở ĐÂY
            }
            // =========================================================================

            // Cập nhật trạng thái và lưu thông tin (Chỉ chạy nếu Backend trả về JSON chuẩn)
            // (Nếu khối if trên chạy, luồng sẽ không bao giờ tới đây)
            setUser(authResponse.user);
            localStorage.setItem('accessToken', authResponse.token);
            localStorage.setItem('user', JSON.stringify(authResponse.user));
            setIsLoading(false);
            return authResponse;
            
        } catch (err) {
            setError(err.message || "Đăng nhập thất bại.");
            setIsLoading(false);
            throw err; 
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
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                const userData = JSON.parse(userStr);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            }
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