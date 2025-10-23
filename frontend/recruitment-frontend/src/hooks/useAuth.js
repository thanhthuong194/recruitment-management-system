// File: src/hooks/useAuth.js (ĐÃ SỬA LỖI)

import { useState, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

/**
 * Hook tùy chỉnh để quản lý form và luồng xác thực (Login, Register, Forgot Password).
 * ...
 */
const useAuth = (initialState, successCallback, apiFunction) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); 

    const authContext = useContext(AuthContext);
    const { isLoading: contextLoading, error: contextError } = authContext;

    if (!apiFunction) {
        throw new Error("useAuth requires an apiFunction argument (e.g., context.login, context.register).");
    }

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
        setSuccessMessage(null); // Xóa thông báo thành công khi người dùng nhập lại

        // ❌ XÓA DÒNG NÀY: Việc gọi successCallback trong handleChange gây ra lỗi điều hướng không mong muốn.
        // if (successCallback) {
        //     successCallback(null); 
        // }
    }, []); // 💡 DEPENDECY ĐÃ ĐƯỢC CẬP NHẬT

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccessMessage(null);
        
        try {
            const result = await apiFunction(formData); 
            
            if (successCallback) {
                // Xử lý thành công (Đăng nhập/Đăng ký)
                if (result && (result.token || result.user)) {
                    successCallback(result); // GỌI ĐIỀU HƯỚNG CHỈ KHI THÀNH CÔNG API
                } 
                // Xử lý tin nhắn thành công (Quên mật khẩu)
                else if (result && result.message) {
                    setSuccessMessage(result.message);
                } else {
                    successCallback(result);
                }
            }
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi không xác định."); 
            setSuccessMessage(null);
        }

    }, [formData, successCallback, apiFunction]); 
    
    return { 
        formData, 
        handleChange, 
        handleSubmit, 
        isLoading: contextLoading, 
        error: error || contextError, 
        success: successMessage
    };
};

export default useAuth;