import AuthApi from '../api-client/src/api/AuthApi';
import LoginRequest from '../api-client/src/model/LoginRequest'; 
import RegisterRequest from '../api-client/src/model/RegisterRequest';
import ForgotPasswordRequest from '../api-client/src/model/ForgotPasswordRequest';
import ApiClient from '../api-client/src/ApiClient'; 
import apiClient from './ApiConfig'; // Đảm bảo đường dẫn này đúng

const authApiInstance = new AuthApi(ApiClient.instance); 

const promisifyApiCall = (apiMethod, requestData) => {
    return new Promise((resolve, reject) => {
        // Hàm callback của API được cung cấp bởi thư viện tự tạo (ApiClient)
        apiMethod(requestData, (error, data, response) => {
            if (error) {
                // Xử lý lỗi API
                const message = error.response 
                                ? (error.response.body || error.response.text || `Lỗi ${error.status}: Yêu cầu thất bại.`) 
                                : (error.message || "Lỗi kết nối máy chủ.");
                reject(new Error(message)); 
                return;
            }
            resolve(data);
        });
    });
};

export const verifyTokenService = async (token) => {
    if (token) {
        return Promise.resolve({
            token: token,
            id: 'mock-id-001',
            username: 'mock_user_restored',
        });
    }
    return Promise.reject(new Error("Token không tồn tại hoặc đã hết hạn."));
};

// Hàm loginService đã được dọn dẹp, chỉ gọi API thật
export const loginService = async ({ username, password }) => {
    // Validate input
    if (!username || !password) {
        throw new Error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
    }
    
    // Tạo đối tượng yêu cầu đăng nhập
    const loginReq = new LoginRequest(username, password); 
    
    // Gọi API Backend
    return promisifyApiCall(authApiInstance.loginUser.bind(authApiInstance), loginReq); 
};

export const registerService = async (formData) => {
    const registerReq = new RegisterRequest(
        formData.username, 
        formData.password, 
        formData.email, 
        formData.fullname
    );
    return promisifyApiCall(authApiInstance.registerUser.bind(authApiInstance), registerReq);
};

export const forgotPasswordService = async ({ email }) => {
    const forgotReq = new ForgotPasswordRequest(email);
    return promisifyApiCall(authApiInstance.forgotPassword.bind(authApiInstance), forgotReq);
};