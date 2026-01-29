/**
 * @fileoverview Service xử lý các API liên quan đến kế hoạch tuyển dụng
 * @module services/PlansService
 * @description Cung cấp các phương thức CRUD cho kế hoạch tuyển dụng
 * bao gồm tạo, sửa, xóa, duyệt và từ chối kế hoạch
 */

import axios from 'axios';

/** @constant {string} API_URL - Base URL cho API endpoints */
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Service class quản lý kế hoạch tuyển dụng
 * @class PlansService
 * @description Cung cấp đầy đủ các chức năng quản lý kế hoạch tuyển dụng
 * 
 * Quy trình xử lý kế hoạch:
 * 1. Trưởng bộ phận (UM) tạo kế hoạch (createPlan)
 * 2. Hiệu trưởng (Rector) duyệt/từ chối (approvePlan/rejectPlan)
 * 3. HR đăng thông báo tuyển dụng cho kế hoạch đã duyệt
 * 
 * @example
 * // Tạo kế hoạch mới
 * await PlansService.createPlan({ title: '...', position: '...' });
 * 
 * // Duyệt kế hoạch
 * await PlansService.approvePlan(planId);
 */
class PlansService {
    /**
     * Lấy headers xác thực với Basic Auth
     * @method getAuthHeaders
     * @returns {Object} Headers object chứa Content-Type và Authorization
     * @private
     * @description Tạo Basic Auth header từ username/password trong localStorage
     */
    getAuthHeaders() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const password = localStorage.getItem('userPassword');
        if (user.username && password) {
            // Use Basic Auth with username and password from localStorage
            const credentials = btoa(`${user.username}:${password}`);
            return {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            };
        }
        return {
            'Content-Type': 'application/json'
        };
    }

    /**
     * Lấy danh sách tất cả kế hoạch
     * @async
     * @method getAllPlans
     * @returns {Promise<Array>} Danh sách kế hoạch (pending, approved, rejected)
     * @throws {Error} Nếu có lỗi kết nối
     * @requires Authentication
     */
    async getAllPlans() {
        try {
            const response = await axios.get(`${API_URL}/plans`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching plans:', error);
            throw error;
        }
    }

    /**
     * Lấy chi tiết kế hoạch theo ID
     * @async
     * @method getPlanById
     * @param {number|string} id - ID của kế hoạch
     * @returns {Promise<Object>} Thông tin chi tiết kế hoạch
     * @throws {Error} Nếu không tìm thấy
     * @requires Authentication
     */
    async getPlanById(id) {
        try {
            const response = await axios.get(`${API_URL}/plans/${id}`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching plan:', error);
            throw error;
        }
    }

    /**
     * Tạo kế hoạch tuyển dụng mới
     * @async
     * @method createPlan
     * @param {Object} planData - Dữ liệu kế hoạch
     * @param {string} planData.title - Tiêu đề kế hoạch
     * @param {string} planData.position - Vị trí tuyển dụng
     * @param {string} planData.school - Khoa/đơn vị
     * @param {number} planData.quantity - Số lượng cần tuyển
     * @param {number} planData.cpa - Yêu cầu CPA
     * @param {string} [planData.createdBy] - Người tạo
     * @returns {Promise<Object>} Kế hoạch đã tạo
     * @throws {Error} Nếu tạo thất bại
     * @requires Authentication - Role UNIT_MANAGER
     */
    async createPlan(planData) {
        try {
            const response = await axios.post(`${API_URL}/plans`, planData, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating plan:', error);
            throw error;
        }
    }

    /**
     * Cập nhật kế hoạch tuyển dụng
     * @async
     * @method updatePlan
     * @param {number|string} id - ID kế hoạch cần cập nhật
     * @param {Object} planData - Dữ liệu cập nhật
     * @returns {Promise<Object>} Kế hoạch đã cập nhật
     * @throws {Error} Nếu cập nhật thất bại (không quyền hoặc kế hoạch đã duyệt)
     * @requires Authentication - Role UNIT_MANAGER (chỉ kế hoạch pending)
     */
    async updatePlan(id, planData) {
        try {
            const response = await axios.put(`${API_URL}/plans/${id}`, planData, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating plan:', error);
            throw error;
        }
    }

    /**
     * Xóa kế hoạch (chỉ trạng thái pending)
     * @async
     * @method deletePlan
     * @param {number|string} id - ID kế hoạch cần xóa
     * @returns {Promise<boolean>} true nếu xóa thành công
     * @throws {Error} Nếu không quyền hoặc kế hoạch không ở trạng thái pending
     * @requires Authentication - Role RECTOR
     */
    async deletePlan(id) {
        try {
            await axios.delete(`${API_URL}/plans/${id}`, {
                headers: this.getAuthHeaders()
            });
            return true;
        } catch (error) {
            console.error('Error deleting plan:', error);
            throw error;
        }
    }

    /**
     * Duyệt kế hoạch tuyển dụng
     * @async
     * @method approvePlan
     * @param {number|string} id - ID kế hoạch cần duyệt
     * @returns {Promise<Object>} Kế hoạch đã duyệt (status = 'approved')
     * @throws {Error} Nếu duyệt thất bại
     * @requires Authentication - Role RECTOR (Hiệu trưởng)
     */
    async approvePlan(id) {
        try {
            const response = await axios.put(`${API_URL}/plans/${id}/approve`, {}, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error approving plan:', error);
            throw error;
        }
    }

    /**
     * Từ chối kế hoạch tuyển dụng với lý do
     * @async
     * @method rejectPlan
     * @param {number|string} id - ID kế hoạch cần từ chối
     * @param {string} [rejectReason=''] - Lý do từ chối
     * @returns {Promise<Object>} Kế hoạch đã từ chối (status = 'rejected')
     * @throws {Error} Nếu từ chối thất bại
     * @requires Authentication - Role RECTOR (Hiệu trưởng)
     */
    async rejectPlan(id, rejectReason = '') {
        try {
            const response = await axios.put(`${API_URL}/plans/${id}/reject`, 
                { rejectReason: rejectReason },
                { headers: this.getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Error rejecting plan:', error);
            throw error;
        }
    }

    /**
     * Xóa vĩnh viễn kế hoạch (approved/rejected)
     * @async
     * @method deletePlanPermanently
     * @param {number|string} id - ID kế hoạch cần xóa vĩnh viễn
     * @returns {Promise<boolean>} true nếu xóa thành công
     * @throws {Error} Nếu xóa thất bại
     * @requires Authentication - Role PERSONNEL_MANAGER (HR)
     * @warning Hành động này KHÔNG THỂ HOÀN TÁC!
     */
    async deletePlanPermanently(id) {
        try {
            await axios.delete(`${API_URL}/plans/${id}/permanent`, {
                headers: this.getAuthHeaders()
            });
            return true;
        } catch (error) {
            console.error('Error permanently deleting plan:', error);
            throw error;
        }
    }
}

export default new PlansService();
