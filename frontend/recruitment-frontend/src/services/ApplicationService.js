/**
 * @fileoverview Service xử lý các API liên quan đến hồ sơ ứng tuyển
 * @module services/ApplicationService
 * @description Cung cấp các phương thức để gửi hồ sơ, lấy danh sách và cập nhật trạng thái hồ sơ ứng tuyển
 */

import axios from 'axios';

/** @constant {string} API_URL - Base URL cho API endpoints */
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Service class quản lý hồ sơ ứng tuyển
 * @class ApplicationService
 * @description Cung cấp các phương thức CRUD cho hồ sơ ứng tuyển
 * 
 * @example
 * // Gửi hồ sơ ứng tuyển
 * await ApplicationService.submitApplication(formData);
 * 
 * // Lấy tất cả hồ sơ (đã xác thực)
 * const applications = await ApplicationService.getAllApplications();
 */
class ApplicationService {
    /**
     * Gửi hồ sơ ứng tuyển (Public - không cần xác thực)
     * @async
     * @method submitApplication
     * @param {Object} applicationData - Dữ liệu hồ sơ ứng tuyển
     * @param {string} applicationData.fullName - Họ và tên
     * @param {string} applicationData.email - Email
     * @param {string} applicationData.phone - Số điện thoại
     * @param {string} applicationData.jobId - ID của vị trí ứng tuyển
     * @param {string} applicationData.cvUrl - URL của CV đã upload
     * @returns {Promise<Object>} Kết quả từ server
     * @throws {Error} Nếu gửi hồ sơ thất bại
     */
    async submitApplication(applicationData) {
        try {
            const response = await axios.post(`${API_URL}/applications/submit`, applicationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting application:', error);
            throw error;
        }
    }

    /**
     * Lấy tất cả hồ sơ ứng tuyển (Chỉ HR/Admin/Rector)
     * @async
     * @method getAllApplications
     * @returns {Promise<Array>} Danh sách tất cả hồ sơ
     * @throws {Error} Nếu không có quyền hoặc lỗi server
     * @requires Authentication
     */
    async getAllApplications() {
        try {
            const response = await axios.get(`${API_URL}/applications`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    }

    /**
     * Lấy hồ sơ theo trạng thái
     * @async
     * @method getApplicationsByStatus
     * @param {string} status - Trạng thái cần lọc (pending|approved|rejected)
     * @returns {Promise<Array>} Danh sách hồ sơ theo trạng thái
     * @throws {Error} Nếu có lỗi
     * @requires Authentication
     */
    async getApplicationsByStatus(status) {
        try {
            const response = await axios.get(`${API_URL}/applications/status/${status}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching applications by status:', error);
            throw error;
        }
    }

    /**
     * Cập nhật trạng thái hồ sơ (Chỉ HR)
     * @async
     * @method updateApplicationStatus
     * @param {number|string} id - ID của hồ sơ
     * @param {string} status - Trạng thái mới (Đang xét|Đã duyệt|Từ chối)
     * @param {string} [rejectionReason] - Lý do từ chối (bắt buộc khi status = Từ chối)
     * @returns {Promise<Object>} Hồ sơ đã cập nhật
     * @throws {Error} Nếu cập nhật thất bại
     * @requires Authentication
     */
    async updateApplicationStatus(id, status, rejectionReason = null) {
        try {
            const payload = { status };
            if (rejectionReason) {
                payload.rejectionReason = rejectionReason;
            }
            const response = await axios.put(
                `${API_URL}/applications/${id}/status`,
                payload,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating application status:', error);
            throw error;
        }
    }
}

export default new ApplicationService();
