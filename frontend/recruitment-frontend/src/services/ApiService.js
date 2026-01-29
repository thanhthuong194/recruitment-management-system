/**
 * @fileoverview Service quản lý cấu hình và xác thực cho API Client
 * @module services/ApiService
 * @description Cung cấp singleton service để quản lý credentials và token
 * cho tất cả API calls trong ứng dụng
 */

import ApiClient from '../api-client/src/ApiClient';

/**
 * Service class quản lý ApiClient và authentication
 * @class ApiService
 * @description Singleton pattern - sử dụng một instance duy nhất cho toàn app
 * 
 * @example
 * // Sau khi đăng nhập, cấu hình credentials
 * apiService.setupCredentials(username, password);
 * apiService.setupToken(jwtToken);
 * 
 * // Khi đăng xuất
 * apiService.setupCredentials(null, null);
 * apiService.setupToken(null);
 */
class ApiService {
    /**
     * Khởi tạo ApiService
     * @constructor
     * @description Lấy singleton instance của ApiClient và cấu hình basePath
     */
    constructor() {
        this.apiClient = ApiClient.instance;
        // Cấu hình chung cho ApiClient, ví dụ: basePath
        // Note: API routes already include /api prefix, so basePath should be just the host
        this.apiClient.basePath = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    }

    /**
     * Cài đặt credentials cho HTTP Basic Authentication
     * @method setupCredentials
     * @param {string|null} username - Tên đăng nhập (null để xóa)
     * @param {string|null} password - Mật khẩu (null để xóa)
     * @description Được gọi bởi AuthContext sau khi đăng nhập thành công
     * hoặc sau khi đăng xuất để xóa credentials
     */
    setupCredentials(username, password) {
        if (username && password) {
            this.apiClient.authentications.BasicAuth.username = username;
            this.apiClient.authentications.BasicAuth.password = password;
            console.log('BasicAuth credentials set for user:', username);
        } else {
            delete this.apiClient.authentications.BasicAuth.username;
            delete this.apiClient.authentications.BasicAuth.password;
            console.log('BasicAuth credentials cleared');
        }
    }

    /**
     * Cài đặt Bearer token cho authentication
     * @method setupToken
     * @param {string|null} token - JWT token (null để xóa)
     * @description Được gọi bởi AuthContext sau khi đăng nhập thành công
     * Token sẽ được tự động thêm vào header Authorization
     * @note Tên 'BearerAuth' phải khớp với định nghĩa trong file OpenAPI/Swagger
     */
    setupToken(token) {
        if (token) {
            // Lưu ý: Tên 'BearerAuth' phải khớp với định nghĩa trong file OpenAPI/Swagger
            this.apiClient.authentications.BearerAuth.accessToken = token;
        } else {
            delete this.apiClient.authentications.BearerAuth.accessToken;
        }
    }

    /**
     * Khởi tạo service với credentials từ localStorage
     * @method init
     * @description Được gọi khi app khởi động để khôi phục session
     * Kiểm tra localStorage và tự động cấu hình credentials nếu có
     */
    init() {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        
        if (username && password) {
            this.setupCredentials(username, password);
        }
        
        // Keep token support for backward compatibility
        const token = localStorage.getItem('accessToken');
        if (token) {
            this.setupToken(token);
        }
    }
}

/**
 * Singleton instance của ApiService
 * @type {ApiService}
 * @description Instance này được khởi tạo và export để sử dụng trong toàn bộ app
 */
const apiService = new ApiService();
apiService.init();

export default apiService;