import AuthApi from '../api-client/src/api/AuthApi';
import LoginRequest from '../api-client/src/model/LoginRequest'; 
import RegisterRequest from '../api-client/src/model/RegisterRequest';
import ForgotPasswordRequest from '../api-client/src/model/ForgotPasswordRequest';
import ApiClient from '../api-client/src/ApiClient'; 
import apiClient from './ApiConfig';
import { mockData } from '../mock-overrides/mockData';

const authApiInstance = new AuthApi(ApiClient.instance); 

const promisifyApiCall = (apiMethod, requestData) => {
    return new Promise((resolve, reject) => {
        apiMethod(requestData, (error, data, response) => {
            if (error) {
                const message = error.response ? 
                                (error.response.data?.message || `Lỗi ${error.status}: Yêu cầu thất bại.`) :
                                (error.message || "Lỗi kết nối máy chủ.");
                reject(new Error(message)); 
                return;
            }
            resolve(data);
        });
    });
};


export const loginService = async ({ username, password }, useMock = true) => {
    if (useMock) return Promise.resolve(mockData.login(username)); // dữ liệu mock
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



// ... Thêm các hàm service khác (ví dụ: logoutService, resetPasswordService) nếu cần