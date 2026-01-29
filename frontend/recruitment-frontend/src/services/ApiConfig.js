/**
 * @fileoverview Cấu hình ApiClient cho toàn bộ ứng dụng
 * @module services/ApiConfig
 * @description File này khởi tạo và cấu hình ApiClient instance
 * được sử dụng bởi tất cả các service trong ứng dụng
 */

import ApiClient from '../api-client/src/ApiClient';

/**
 * Instance ApiClient được cấu hình sẵn
 * @type {ApiClient}
 */
const apiClient = new ApiClient();

/**
 * Xử lý và xác định base URL cho API
 * @description Ưu tiên sử dụng biến môi trường REACT_APP_API_BASE_URL
 * Nếu không có, mặc định sử dụng localhost:8080/api
 */
let baseEnv = process.env.REACT_APP_API_BASE_URL || "";
let base = "";
if (baseEnv.startsWith('http')) {
    base = baseEnv;
} else if (baseEnv === '/api') {
    base = '';
} else if (baseEnv) {
    base = '';
} else {
    base = "http://localhost:8080/api";
}

/** @description Base path cho tất cả API calls */
apiClient.basePath = base;

/**
 * Default headers được gửi kèm với mọi request
 * @type {Object}
 */
apiClient.defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

/** @description Cho phép gửi cookies với request */
apiClient.enableCookies = true;
/** @description Cho phép gửi credentials (cookies, auth headers) cross-origin */
apiClient.withCredentials = true;

/**
 * ApiClient instance đã được cấu hình
 * @exports apiClient
 */
export default apiClient;