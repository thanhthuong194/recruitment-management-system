/**
 * @fileoverview Context quản lý xác thực người dùng trong ứng dụng
 * @module context/AuthContext
 * @description Cung cấp state và methods liên quan đến authentication cho toàn bộ ứng dụng
 */

import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/ApiService';
import { 
    loginService, 
    registerService, 
    forgotPasswordService 
} from '../services/AuthService'; 

/**
 * Context chứa thông tin xác thực người dùng
 * @type {React.Context}
 * @description Sử dụng với useContext(AuthContext) để truy cập state và methods
 */
export const AuthContext = createContext();

/**
 * Provider component cung cấp authentication context cho ứng dụng
 * 
 * @component
 * @description Component này wrap toàn bộ ứng dụng và cung cấp:
 * - State: user, isLoading, error
 * - Methods: login, register, forgotPassword, logout
 * 
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Các component con được wrap
 * 
 * @example
 * // Trong App.js hoặc index.js
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * 
 * // Sử dụng trong component con
 * const { user, login, logout } = useContext(AuthContext);
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Xử lý đăng nhập người dùng
     * @async
     * @function login
     * @param {Object} formData - Dữ liệu đăng nhập
     * @param {string} formData.username - Tên đăng nhập
     * @param {string} formData.password - Mật khẩu
     * @returns {Promise<Object>} Object chứa { success, user, token }
     * @throws {Error} Ném lỗi nếu đăng nhập thất bại
     * 
     * @description Quy trình xử lý:
     * 1. Gọi loginService với formData
     * 2. Lưu token và thông tin user vào localStorage
     * 3. Cấu hình apiService với credentials
     * 4. Cập nhật user state
     */
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

    /**
     * Xử lý đăng ký tài khoản mới
     * @async
     * @function register
     * @param {Object} formData - Dữ liệu đăng ký
     * @param {string} formData.username - Tên đăng nhập
     * @param {string} formData.password - Mật khẩu
     * @param {string} formData.email - Email
     * @param {string} formData.fullname - Họ và tên
     * @returns {Promise<Object>} Kết quả đăng ký từ server
     * @throws {Error} Ném lỗi nếu đăng ký thất bại
     */
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
    
    /**
     * Xử lý yêu cầu đặt lại mật khẩu
     * @async
     * @function forgotPassword
     * @param {Object} formData - Dữ liệu yêu cầu
     * @param {string} formData.email - Email đã đăng ký
     * @returns {Promise<Object>} Object chứa message thông báo
     * @throws {Error} Ném lỗi nếu yêu cầu thất bại
     * 
     * @description Gửi yêu cầu reset password đến server,
     * server sẽ gửi email với link đặt lại mật khẩu
     */
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
    
    /**
     * Đăng xuất người dùng
     * @function logout
     * @description Thực hiện các bước:
     * 1. Reset user state về null
     * 2. Xóa token và thông tin user khỏi localStorage
     * 3. Reset credentials trong apiService
     */
    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        
        apiService.setupToken(null);
        apiService.setupCredentials(null, null);
    };

    /**
     * Effect khôi phục session từ localStorage khi app khởi động
     * @description Kiểm tra và khôi phục user session nếu có token và user data trong localStorage
     */
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

    /**
     * Object state được cung cấp cho các component con
     * @type {Object}
     * @property {Object|null} user - Thông tin người dùng đã đăng nhập
     * @property {Function} login - Hàm đăng nhập
     * @property {Function} register - Hàm đăng ký
     * @property {Function} forgotPassword - Hàm quên mật khẩu
     * @property {Function} logout - Hàm đăng xuất
     * @property {boolean} isLoading - Trạng thái đang xử lý
     * @property {string|null} error - Thông báo lỗi
     */
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