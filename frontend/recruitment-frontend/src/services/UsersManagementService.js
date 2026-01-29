/**
 * @fileoverview Service xử lý các API quản lý người dùng (Admin)
 * @module services/UsersManagementService
 * @description Cung cấp các phương thức CRUD để quản lý tất cả người dùng trong hệ thống
 * Dành cho Admin để quản lý tài khoản nhân sự
 */

import axios from 'axios';

/** @constant {string} API_URL - Base URL cho API endpoints */
const API_URL = 'http://localhost:8080/api';

/**
 * Service class quản lý người dùng hệ thống
 * @class UsersManagementService
 * @description Cung cấp các phương thức CRUD cho quản lý người dùng
 * Chỉ dành cho Admin sử dụng
 * 
 * @example
 * // Lấy danh sách người dùng
 * const users = await UsersManagementService.getAllUsers();
 * 
 * // Tạo người dùng mới
 * await UsersManagementService.createUser({ username: '...', role: 'UNIT_MANAGER' });
 */
class UsersManagementService {
    /**
     * Lấy headers xác thực với Basic Auth
     * @method getAuthHeaders
     * @returns {Object} Headers object chứa Content-Type và Authorization
     * @private
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
     * Lấy danh sách tất cả người dùng
     * @async
     * @method getAllUsers
     * @returns {Promise<Array>} Danh sách người dùng trong hệ thống
     * @throws {Error} Nếu không có quyền Admin
     * @requires Authentication - Role ADMIN
     */
    async getAllUsers() {
        try {
            const response = await axios.get(`${API_URL}/users`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    /**
     * Lấy thông tin người dùng theo ID
     * @async
     * @method getUserById
     * @param {number|string} id - ID của người dùng
     * @returns {Promise<Object>} Thông tin chi tiết người dùng
     * @throws {Error} Nếu không tìm thấy
     * @requires Authentication - Role ADMIN
     */
    async getUserById(id) {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    /**
     * Tạo người dùng mới
     * @async
     * @method createUser
     * @param {Object} userData - Dữ liệu người dùng mới
     * @param {string} userData.username - Tên đăng nhập
     * @param {string} userData.password - Mật khẩu
     * @param {string} userData.fullName - Họ và tên
     * @param {string} userData.email - Email
     * @param {string} userData.phoneNumber - Số điện thoại
     * @param {string} userData.role - Role (ADMIN|RECTOR|UNIT_MANAGER|PERSONNEL_MANAGER)
     * @param {string} [userData.sex] - Giới tính
     * @param {string} [userData.dateOfBirth] - Ngày sinh
     * @param {string} [userData.address] - Địa chỉ
     * @returns {Promise<Object>} Người dùng đã tạo
     * @throws {Error} Nếu tạo thất bại
     * @requires Authentication - Role ADMIN
     */
    async createUser(userData) {
        try {
            const response = await axios.post(`${API_URL}/users`, userData, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    /**
     * Cập nhật thông tin người dùng
     * @async
     * @method updateUser
     * @param {number|string} id - ID người dùng cần cập nhật
     * @param {Object} userData - Dữ liệu cập nhật
     * @returns {Promise<Object>} Người dùng đã cập nhật
     * @throws {Error} Nếu cập nhật thất bại
     * @requires Authentication - Role ADMIN
     */
    async updateUser(id, userData) {
        try {
            const response = await axios.put(`${API_URL}/users/${id}`, userData, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    /**
     * Xóa người dùng
     * @async
     * @method deleteUser
     * @param {number|string} id - ID người dùng cần xóa
     * @returns {Promise<boolean>} true nếu xóa thành công
     * @throws {Error} Nếu xóa thất bại
     * @requires Authentication - Role ADMIN
     */
    async deleteUser(id) {
        try {
            await axios.delete(`${API_URL}/users/${id}`, {
                headers: this.getAuthHeaders()
            });
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}

export default new UsersManagementService();
