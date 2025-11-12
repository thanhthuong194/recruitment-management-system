import AuthApi from '../api-client/src/api/AuthApi';
import LoginRequest from '../api-client/src/model/LoginRequest'; 
import RegisterRequest from '../api-client/src/model/RegisterRequest';
import ForgotPasswordRequest from '../api-client/src/model/ForgotPasswordRequest';
import ApiClient from '../api-client/src/ApiClient'; 
import apiClient from './ApiConfig'; 

const authApiInstance = new AuthApi(apiClient);

const promisifyApiCall = (apiMethod, requestData) => {
    return new Promise((resolve, reject) => {
        const callback = (error, data, response) => {
            if (error) {
                if (error.status === 401) {
                    reject(new Error('Tên đăng nhập hoặc mật khẩu không chính xác'));
                    return;
                }
                if (error.message && error.message.includes('Origin is not allowed')) {
                    reject(new Error('Lỗi CORS: Vui lòng kiểm tra cấu hình CORS của server'));
                    return;
                }
                const message = error.response 
                    ? (error.response.body || error.response.text || `Lỗi ${error.status}: Yêu cầu thất bại.`) 
                    : (error.message || "Lỗi kết nối máy chủ.");
                reject(new Error(message));
                return;
            }
            
            if (response && response.status === 401) {
                reject(new Error('Tên đăng nhập hoặc mật khẩu không chính xác'));
                return;
            }

            // Response is already parsed by ApiClient
            resolve(data);
        };

        apiMethod(requestData, callback);
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
export const loginService = async ({ username, password }) => {

    if (!username || !password) {
        throw new Error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
    }

    const loginReq = new LoginRequest(username, password); 

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