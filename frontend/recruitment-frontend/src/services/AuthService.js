/**
 * @fileoverview Service xử lý các API liên quan đến xác thực người dùng
 * @module services/AuthService
 * @description Cung cấp các hàm gọi API cho đăng nhập, đăng ký, quên mật khẩu
 */

import AuthApi from '../api-client/src/api/AuthApi';
import LoginRequest from '../api-client/src/model/LoginRequest'; 
import RegisterRequest from '../api-client/src/model/RegisterRequest';
import ForgotPasswordRequest from '../api-client/src/model/ForgotPasswordRequest';
import ApiClient from '../api-client/src/ApiClient'; 
import apiClient from './ApiConfig'; 

/**
 * Instance của AuthApi để gọi các endpoint xác thực
 * @type {AuthApi}
 */
const authApiInstance = new AuthApi(apiClient);

/**
 * Chuyển đổi callback-based API call thành Promise
 * @function promisifyApiCall
 * @param {Function} apiMethod - Method của API cần gọi
 * @param {Object} requestData - Dữ liệu request
 * @returns {Promise<*>} Promise resolve với data từ API hoặc reject với Error
 * 
 * @description Wrapper function để chuyển đổi pattern callback của auto-generated API client
 * thành Promise pattern để sử dụng với async/await
 * 
 * @example
 * const result = await promisifyApiCall(authApiInstance.loginUser, loginRequest);
 */
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

/**
 * Xác thực token hiện có
 * @async
 * @function verifyTokenService
 * @param {string} token - JWT token cần xác thực
 * @returns {Promise<Object>} Object chứa thông tin user nếu token hợp lệ
 * @throws {Error} Nếu token không tồn tại hoặc hết hạn
 * 
 * @description Kiểm tra xem token có còn hiệu lực không
 * @todo Implement thực tế với API backend
 */
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

/**
 * Đăng nhập người dùng
 * @async
 * @function loginService
 * @param {Object} credentials - Thông tin đăng nhập
 * @param {string} credentials.username - Tên đăng nhập
 * @param {string} credentials.password - Mật khẩu
 * @returns {Promise<Object>} Object chứa token và thông tin user
 * @throws {Error} Nếu thông tin đăng nhập không hợp lệ hoặc thiếu
 * 
 * @example
 * const result = await loginService({ username: 'admin', password: '123456' });
 * console.log(result.token); // JWT token
 */
export const loginService = async ({ username, password }) => {

    if (!username || !password) {
        throw new Error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
    }

    const loginReq = new LoginRequest(username, password); 

    return promisifyApiCall(authApiInstance.loginUser.bind(authApiInstance), loginReq); 
};

/**
 * Đăng ký tài khoản mới
 * @async
 * @function registerService
 * @param {Object} formData - Thông tin đăng ký
 * @param {string} formData.username - Tên đăng nhập
 * @param {string} formData.password - Mật khẩu
 * @param {string} formData.email - Email
 * @param {string} formData.fullname - Họ và tên đầy đủ
 * @returns {Promise<Object>} Kết quả đăng ký từ server
 * @throws {Error} Nếu đăng ký thất bại
 */
export const registerService = async (formData) => {
    const registerReq = new RegisterRequest(
        formData.username, 
        formData.password, 
        formData.email, 
        formData.fullname
    );
    return promisifyApiCall(authApiInstance.registerUser.bind(authApiInstance), registerReq);
};

/**
 * Gửi yêu cầu đặt lại mật khẩu
 * @async
 * @function forgotPasswordService
 * @param {Object} data - Dữ liệu yêu cầu
 * @param {string} data.email - Email đã đăng ký
 * @returns {Promise<Object>} Kết quả từ server (thường chứa message)
 * @throws {Error} Nếu email không tồn tại hoặc có lỗi
 * 
 * @description Server sẽ gửi email với link đặt lại mật khẩu
 */
export const forgotPasswordService = async ({ email }) => {
    const forgotReq = new ForgotPasswordRequest(email);
    return promisifyApiCall(authApiInstance.forgotPassword.bind(authApiInstance), forgotReq);
};