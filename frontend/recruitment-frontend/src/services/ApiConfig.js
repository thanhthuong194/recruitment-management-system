import ApiClient from '../api-client/src/ApiClient';

// Tạo sẵn instance chung cho toàn app
const apiClient = new ApiClient();

// Gán URL mock server (đổi thành backend thật sau này cũng dễ)
apiClient.basePath = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default apiClient;
