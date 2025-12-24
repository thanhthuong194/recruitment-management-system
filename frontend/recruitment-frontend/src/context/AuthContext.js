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

            if (typeof authResponse === 'string') {
                const username = formData.username;
                const password = formData.password;
                const tempToken = 'Bearer dummy-token'; 

                localStorage.setItem('accessToken', tempToken);
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                
                apiService.setupCredentials(username, password);
                
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
            localStorage.setItem('username', formData.username);
            localStorage.setItem('password', formData.password);
            localStorage.setItem('user', JSON.stringify(authResponse.user));
            
            apiService.setupToken(token);
            apiService.setupCredentials(formData.username, formData.password);
            
            setIsLoading(false);
            return authResponse;
            
        } catch (err) {
            setError(err.message || "Đăng nhập thất bại.");
            setIsLoading(false);
            throw err; 
        }
    };

    // --- 1.b REGISTER (nếu có) ---
    const register = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const resp = await registerService(formData);
            setIsLoading(false);
            return resp;
        } catch (err) {
            setError(err.message || 'Đăng ký thất bại.');
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
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        
        apiService.setupToken(null);
        apiService.setupCredentials(null, null);
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