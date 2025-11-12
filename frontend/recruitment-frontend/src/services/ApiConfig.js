import ApiClient from '../api-client/src/ApiClient';

const apiClient = new ApiClient();

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

apiClient.basePath = base;

apiClient.defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

apiClient.enableCookies = true;
apiClient.withCredentials = true;

export default apiClient;