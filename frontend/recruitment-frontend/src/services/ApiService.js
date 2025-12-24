import ApiClient from '../api-client/src/ApiClient';

class ApiService {
    constructor() {
        this.apiClient = ApiClient.instance;
        // Cấu hình chung cho ApiClient, ví dụ: basePath
        // Note: API routes already include /api prefix, so basePath should be just the host
        this.apiClient.basePath = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    }

    /**
     * Cài đặt credentials cho HTTP Basic Authentication
     * Sẽ được gọi bởi AuthContext sau khi đăng nhập.
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
     * Cài đặt token vào ApiClient singleton.
     * Sẽ được gọi bởi AuthContext sau khi đăng nhập.
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
     * Khởi tạo service, lấy credentials từ localStorage (nếu có)
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

// Khởi tạo và export một instance duy nhất
const apiService = new ApiService();
apiService.init();

export default apiService;