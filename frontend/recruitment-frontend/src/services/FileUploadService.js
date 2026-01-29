/**
 * @fileoverview Service xử lý upload file
 * @module services/FileUploadService
 * @description Cung cấp các phương thức để upload CV và các file khác
 */

import axios from 'axios';

/** @constant {string} API_URL - Base URL cho API endpoints */
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Service class xử lý upload file
 * @class FileUploadService
 * @description Cung cấp các phương thức upload file lên server
 * 
 * @example
 * // Upload CV
 * const result = await FileUploadService.uploadCV(file);
 * console.log(result.url); // URL của file đã upload
 */
class FileUploadService {
    /**
     * Upload CV (Public - không cần xác thực)
     * @async
     * @method uploadCV
     * @param {File} file - File CV cần upload (PDF, DOC, DOCX)
     * @returns {Promise<Object>} Object chứa URL của file đã upload
     * @throws {Error} Nếu upload thất bại (file quá lớn, sai định dạng, etc.)
     * 
     * @example
     * const fileInput = document.querySelector('input[type="file"]');
     * const result = await FileUploadService.uploadCV(fileInput.files[0]);
     */
    async uploadCV(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${API_URL}/files/upload-cv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}

export default new FileUploadService();
