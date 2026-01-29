/**
 * @fileoverview Custom hook xử lý xác thực người dùng (đăng nhập, đăng ký, quên mật khẩu)
 * @module hooks/useAuth
 */

import { useState, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

/**
 * Custom hook quản lý logic xác thực người dùng
 * 
 * @description Hook này cung cấp các chức năng:
 * - Quản lý state của form (formData)
 * - Xử lý thay đổi input (handleChange)
 * - Xử lý submit form với API function được truyền vào (handleSubmit)
 * - Quản lý trạng thái loading và error
 * 
 * @param {Object} initialState - Giá trị khởi tạo cho form (VD: { username: '', password: '' })
 * @param {Function} successCallback - Hàm callback được gọi khi xác thực thành công
 * @param {Function} apiFunction - Hàm API để thực hiện xác thực (login, register, forgotPassword từ AuthContext)
 * 
 * @returns {Object} Object chứa các giá trị và hàm xử lý:
 * @returns {Object} returns.formData - Dữ liệu form hiện tại
 * @returns {Function} returns.handleChange - Hàm xử lý thay đổi input
 * @returns {Function} returns.handleSubmit - Hàm xử lý submit form
 * @returns {boolean} returns.isLoading - Trạng thái đang tải
 * @returns {string|null} returns.error - Thông báo lỗi (nếu có)
 * @returns {string|null} returns.success - Thông báo thành công (nếu có)
 * 
 * @example
 * // Sử dụng cho trang đăng nhập
 * const { formData, handleChange, handleSubmit, isLoading, error } = useAuth(
 *   { username: '', password: '' },
 *   (result) => navigate('/home'),
 *   login
 * );
 * 
 * @throws {Error} Ném lỗi nếu apiFunction không được cung cấp
 */
const useAuth = (initialState, successCallback, apiFunction) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); 

    const authContext = useContext(AuthContext);
    const { isLoading: contextLoading, error: contextError } = authContext;

    // Kiểm tra xem apiFunction có được truyền vào không
    if (!apiFunction) {
        throw new Error("useAuth requires an apiFunction argument (e.g., context.login, context.register).");
    }

    /**
     * Xử lý thay đổi giá trị input trong form
     * @param {Event} e - Event từ input element
     * @description Cập nhật formData với giá trị mới và reset error/success messages
     */
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
        setSuccessMessage(null); 

    }, []); 

    /**
     * Xử lý submit form xác thực
     * @param {Event} e - Event từ form submit
     * @description Gọi apiFunction với formData, xử lý kết quả và gọi successCallback nếu thành công
     * @async
     */
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccessMessage(null);
        
        try {
            const result = await apiFunction(formData); 
            
            if (successCallback) {
                if (result && (result.token || result.user)) {
                    successCallback(result); 
                } 
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