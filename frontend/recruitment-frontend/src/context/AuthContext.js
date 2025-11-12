import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/ApiService';
import { 
    loginService, 
    registerService, 
    forgotPasswordService 
} from '../services/AuthService'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

            if (typeof authResponse === 'string') {
                const username = formData.username;
                const tempToken = 'Bearer dummy-token'; 

                localStorage.setItem('accessToken', tempToken);
                const userData = {
                    username: username, 
                    role: 'admin',
                    name: username 
                };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                
                setIsLoading(false);
                return { success: true, user: userData, token: tempToken };
            }
            setUser(authResponse.user);
            
            const token = authResponse.token;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(authResponse.user));
            
            apiService.setupToken(token);
            
            setIsLoading(false);
            return authResponse;
            
        } catch (err) {
            setError(err.message || "Đăng nhập thất bại.");
            setIsLoading(false);
            throw err; 
        }
    };
    
    // --- 2. FORGOT PASSWORD ---
    const forgotPassword = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const forgotResponse = await forgotPasswordService(formData); 

            setIsLoading(false);
            return { message: forgotResponse.message || "Đã gửi yêu cầu đặt lại mật khẩu.", ...forgotResponse }; 
            
        } catch (err) {
            setError(err.message || "Không thể gửi yêu cầu đặt lại mật khẩu.");
            setIsLoading(false);
            throw err;
        }
    };
    
    // --- 3. LOGOUT ---
    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        apiService.setupToken(null);
    };

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