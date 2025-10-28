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

export const loginService = async ({ username, password }, useMock = true) => {
    // Validate input
    if (!username || !password) {
        throw new Error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
    }

    // Kiểm tra với danh sách tài khoản cho phép
    const validAccounts = {
        'admin': { 
            password: 'admin123', 
            role: 'admin',
            id: '001',
            name: 'Administrator',
            email: 'admin@hcmute.edu.vn',
            permissions: ['create_plan', 'edit_plan', 'delete_plan', 'view_all']
        },
        'headmaster': { 
            password: 'head123', 
            role: 'headmaster',
            id: '002',
            name: 'Nguyễn Văn A',
            email: 'headmaster@hcmute.edu.vn',
            permissions: ['approve_plan', 'reject_plan', 'delete_plan', 'view_all']
        },
        'staff': { 
            password: 'staff123', 
            role: 'staff',
            id: '003',
            name: 'Nhân viên',
            email: 'staff@hcmute.edu.vn',
            permissions: ['view_own']
        }
    };

    if (useMock) {
        const account = validAccounts[username];
        if (!account || account.password !== password) {
            throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
        }
        
        const userData = {
            token: `mocked-jwt-token-${account.role}`,
            user: {
                ...account,
                username: username
            }
        };
        
        return Promise.resolve(userData);
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



// ... Thêm các hàm service khác (ví dụ: logoutService, resetPasswordService) nếu cần