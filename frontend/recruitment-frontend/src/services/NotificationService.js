/**
 * @fileoverview Service xử lý các API liên quan đến thông báo tuyển dụng
 * @module services/NotificationService
 * @description Cung cấp các phương thức CRUD cho thông báo tuyển dụng
 */

import axios from 'axios';

/** @constant {string} API_URL - Base URL cho API endpoints */
const API_URL = process.env.REACT_APP_API_BASE_URL || '/api';

/**
 * Service class quản lý thông báo tuyển dụng
 * @class NotificationService
 * @description Cung cấp các phương thức CRUD cho thông báo
 * Bao gồm API public và private (cần xác thực)
 * 
 * @example
 * // Lấy thông báo công khai
 * const notifications = await NotificationService.getPublicNotifications();
 * 
 * // Tạo thông báo mới (HR)
 * await NotificationService.createNotification({ title: '...', content: '...' });
 */
class NotificationService {
    /**
     * Lấy headers xác thực từ localStorage
     * @method getAuthHeaders
     * @returns {Object} Headers object chứa Content-Type và Authorization
     * @private
     */
    getAuthHeaders() {
        const token = localStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    /**
     * Lấy danh sách thông báo công khai (cho landing page)
     * @async
     * @method getPublicNotifications
     * @returns {Promise<Array>} Danh sách thông báo công khai
     * @throws {Error} Nếu có lỗi kết nối
     */
    async getPublicNotifications() {
        try {
            const response = await axios.get(`${API_URL}/notifications/public`);
            return response.data;
        } catch (error) {
            console.error('Error fetching public notifications:', error);
            throw error;
        }
    }

    /**
     * Lấy tất cả thông báo (cần xác thực)
     * @async
     * @method getAllNotifications
     * @returns {Promise<Array>} Danh sách tất cả thông báo
     * @throws {Error} Nếu không có quyền
     * @requires Authentication
     */
    async getAllNotifications() {
        try {
            const response = await axios.get(`${API_URL}/notifications`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }

    /**
     * Tạo thông báo mới (Chỉ HR)
     * @async
     * @method createNotification
     * @param {Object} data - Dữ liệu thông báo
     * @param {string} data.title - Tiêu đề thông báo
     * @param {string} data.content - Nội dung thông báo
     * @param {number} [data.planID] - ID kế hoạch liên quan (nếu có)
     * @returns {Promise<Object>} Thông báo đã tạo
     * @throws {Error} Nếu tạo thất bại
     * @requires Authentication - Role HR
     */
    async createNotification(data) {
        try {
            const response = await axios.post(`${API_URL}/notifications`, data, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    }

    /**
     * Cập nhật thông báo (Chỉ HR)
     * @async
     * @method updateNotification
     * @param {number|string} id - ID thông báo cần cập nhật
     * @param {Object} data - Dữ liệu cập nhật
     * @param {string} [data.title] - Tiêu đề mới
     * @param {string} [data.content] - Nội dung mới
     * @returns {Promise<Object>} Thông báo đã cập nhật
     * @throws {Error} Nếu cập nhật thất bại
     * @requires Authentication - Role HR
     */
    async updateNotification(id, data) {
        try {
            const response = await axios.put(`${API_URL}/notifications/${id}`, data, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating notification:', error);
            throw error;
        }
    }

    /**
     * Xóa thông báo (Chỉ HR)
     * @async
     * @method deleteNotification
     * @param {number|string} id - ID thông báo cần xóa
     * @returns {Promise<boolean>} true nếu xóa thành công
     * @throws {Error} Nếu xóa thất bại
     * @requires Authentication - Role HR
     */
    async deleteNotification(id) {
        try {
            await axios.delete(`${API_URL}/notifications/${id}`, {
                headers: this.getAuthHeaders()
            });
            return true;
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    }

    /**
     * Kiểm tra xem kế hoạch đã được đăng thông báo chưa
     * @async
     * @method isPlanPosted
     * @param {number|string} planId - ID kế hoạch cần kiểm tra
     * @returns {Promise<boolean>} true nếu kế hoạch đã được đăng
     * @description Dùng để hiển thị trạng thái "Đã đăng tin" trên UI
     */
    async isPlanPosted(planId) {
        try {
            const response = await axios.get(`${API_URL}/notifications/check-plan/${planId}`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error checking plan status:', error);
            return false;
        }
    }
}

export default new NotificationService();
