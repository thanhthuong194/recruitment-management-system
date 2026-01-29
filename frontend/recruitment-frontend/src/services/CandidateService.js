/**
 * @fileoverview Service xử lý các API liên quan đến ứng viên
 * @module services/CandidateService
 * @description Cung cấp các phương thức để quản lý thông tin ứng viên
 */

import axios from 'axios';

/** @constant {string} API_URL - Base URL cho API endpoints */
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Service class quản lý ứng viên
 * @class CandidateService
 * @description Cung cấp các phương thức CRUD cho ứng viên
 * 
 * @example
 * // Lấy tất cả ứng viên
 * const candidates = await CandidateService.getAllCandidates();
 * 
 * // Lấy ứng viên theo ID
 * const candidate = await CandidateService.getCandidateById(123);
 */
class CandidateService {
    /**
     * Lấy danh sách tất cả ứng viên (Chỉ HR/Admin/Rector)
     * @async
     * @method getAllCandidates
     * @returns {Promise<Array>} Danh sách tất cả ứng viên
     * @throws {Error} Nếu không có quyền hoặc lỗi server
     * @requires Authentication - Cần đăng nhập với role HR/Admin/Rector
     */
    async getAllCandidates() {
        try {
            const response = await axios.get(`${API_URL}/candidates`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching candidates:', error);
            throw error;
        }
    }

    /**
     * Lấy thông tin chi tiết ứng viên theo ID
     * @async
     * @method getCandidateById
     * @param {number|string} id - ID của ứng viên
     * @returns {Promise<Object>} Thông tin chi tiết ứng viên
     * @throws {Error} Nếu ứng viên không tồn tại hoặc lỗi server
     * @requires Authentication
     */
    async getCandidateById(id) {
        try {
            const response = await axios.get(`${API_URL}/candidates/${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching candidate:', error);
            throw error;
        }
    }

    /**
     * Xóa ứng viên (Chỉ Admin)
     * @async
     * @method deleteCandidate
     * @param {number|string} id - ID của ứng viên cần xóa
     * @returns {Promise<Object>} Kết quả xóa
     * @throws {Error} Nếu không có quyền hoặc xóa thất bại
     * @requires Authentication - Cần role Admin
     */
    async deleteCandidate(id) {
        try {
            const response = await axios.delete(`${API_URL}/candidates/${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting candidate:', error);
            throw error;
        }
    }
}

export default new CandidateService();
