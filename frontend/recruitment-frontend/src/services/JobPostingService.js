/**
 * @fileoverview Service xử lý các API liên quan đến tin tuyển dụng
 * @module services/JobPostingService
 * @description Cung cấp các phương thức để lấy thông tin các vị trí tuyển dụng
 */

import axios from 'axios';

/** @constant {string} API_URL - Base URL cho API endpoints */
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Service class quản lý tin tuyển dụng
 * @class JobPostingService
 * @description Cung cấp các phương thức lấy thông tin tin tuyển dụng
 * Bao gồm cả API public (không cần xác thực) và private
 * 
 * @example
 * // Lấy danh sách tin tuyển dụng đang hoạt động
 * const jobs = await JobPostingService.getActiveJobPostings();
 */
class JobPostingService {
    /**
     * Lấy danh sách tin tuyển dụng đang hoạt động (Public)
     * @async
     * @method getActiveJobPostings
     * @returns {Promise<Array>} Danh sách các tin tuyển dụng đang active
     * @throws {Error} Nếu có lỗi kết nối
     */
    async getActiveJobPostings() {
        try {
            const response = await axios.get(`${API_URL}/jobs/public`);
            return response.data;
        } catch (error) {
            console.error('Error fetching active job postings:', error);
            throw error;
        }
    }

    /**
     * Lấy chi tiết tin tuyển dụng theo ID (Public)
     * @async
     * @method getJobPostingById
     * @param {number|string} id - ID của tin tuyển dụng
     * @returns {Promise<Object>} Thông tin chi tiết tin tuyển dụng
     * @throws {Error} Nếu không tìm thấy
     */
    async getJobPostingById(id) {
        try {
            const response = await axios.get(`${API_URL}/jobs/public/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching job posting:', error);
            throw error;
        }
    }

    /**
     * Lấy tin tuyển dụng theo Plan ID (Public)
     * @async
     * @method getJobPostingByPlanId
     * @param {number|string} planId - ID của kế hoạch tuyển dụng
     * @returns {Promise<Object>} Tin tuyển dụng liên quan đến kế hoạch
     * @throws {Error} Nếu không tìm thấy
     */
    async getJobPostingByPlanId(planId) {
        try {
            const response = await axios.get(`${API_URL}/jobs/public/by-plan/${planId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching job posting by plan:', error);
            throw error;
        }
    }

    /**
     * Lấy kế hoạch đã duyệt theo ID (Public - fallback cho form ứng tuyển)
     * @async
     * @method getApprovedPlanById
     * @param {number|string} planId - ID của kế hoạch
     * @returns {Promise<Object>} Thông tin kế hoạch đã duyệt
     * @throws {Error} Nếu không tìm thấy hoặc chưa duyệt
     */
    async getApprovedPlanById(planId) {
        try {
            const response = await axios.get(`${API_URL}/plans/public/${planId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching approved plan:', error);
            throw error;
        }
    }

    /**
     * Lấy tất cả tin tuyển dụng (Cần xác thực)
     * @async
     * @method getAllJobPostings
     * @returns {Promise<Array>} Danh sách tất cả tin tuyển dụng
     * @throws {Error} Nếu không có quyền
     * @requires Authentication
     */
    async getAllJobPostings() {
        try {
            const response = await axios.get(`${API_URL}/jobs`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching all job postings:', error);
            throw error;
        }
    }
}

export default new JobPostingService();
