import ApiClient from '../api-client/src/ApiClient';

class ApiService {
    constructor() {
        this.apiClient = ApiClient.instance;
        // Cấu hình chung cho ApiClient, ví dụ: basePath
        this.apiClient.basePath = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
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
     * Khởi tạo service, lấy token từ localStorage (nếu có)
     */
    init() {
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