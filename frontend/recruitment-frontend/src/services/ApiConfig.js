import ApiClient from '../api-client/src/ApiClient';

const apiClient = new ApiClient();

apiClient.basePath = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
export default apiClient;