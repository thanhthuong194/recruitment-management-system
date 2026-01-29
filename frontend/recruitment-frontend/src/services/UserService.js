/**
 * @fileoverview Service xử lý các API liên quan đến thông tin cá nhân người dùng
 * @module services/UserService
 * @description Cung cấp các phương thức để lấy và cập nhật profile người dùng đang đăng nhập
 */

import ApiClient from '../api-client/src/ApiClient';
import UsersApi from '../api-client/src/api/UsersApi';

/**
 * Instance UsersApi sử dụng singleton ApiClient
 * @type {UsersApi}
 * @description Quan trọng: Phải import 'ApiClient.instance' để đảm bảo dùng chung 1 đối tượng
 * đã được ApiService cài đặt token.
 */
const usersApiInstance = new UsersApi(ApiClient.instance);

/**
 * Chuyển đổi callback-based API call thành Promise
 * @function promisifyApiCall
 * @param {Function} apiMethod - Method của API cần gọi
 * @param {...*} args - Các tham số truyền vào API method
 * @returns {Promise<*>} Promise resolve với data từ API hoặc reject với Error
 * @private
 */
const promisifyApiCall = (apiMethod, ...args) => {
    return new Promise((resolve, reject) => {
        // Dùng .call() để đảm bảo 'this' là 'usersApiInstance'
        apiMethod.call(usersApiInstance, ...args, (error, data, response) => {
            if (error) {
                console.error('[UserService] API Error:', error);
                console.error('[UserService] Response:', response);
                
                let message = "Lỗi kết nối máy chủ.";
                
                if (error.response) {
                    if (error.response.body) {
                        // Try to extract error message from body
                        if (typeof error.response.body === 'string') {
                            message = error.response.body;
                        } else if (error.response.body.message) {
                            message = error.response.body.message;
                        } else if (error.response.body.error) {
                            message = error.response.body.error;
                        } else {
                            message = JSON.stringify(error.response.body);
                        }
                    } else if (error.response.text) {
                        message = error.response.text;
                    } else if (error.status) {
                        message = `Lỗi ${error.status}: ${error.statusText || 'Yêu cầu thất bại'}`;
                    }
                } else if (error.message) {
                    message = error.message;
                }
                
                reject(new Error(message)); 
                return;
            }
            resolve(data);
        });
    });
};

/**
 * Lấy thông tin cá nhân của người dùng hiện tại
 * @async
 * @function getUserProfile
 * @returns {Promise<Object>} Thông tin profile đã được map sang format frontend
 * @returns {string} returns.id - ID người dùng
 * @returns {string} returns.username - Tên đăng nhập
 * @returns {string} returns.email - Email
 * @returns {string} returns.phone - Số điện thoại
 * @returns {string} returns.fullName - Họ và tên
 * @returns {string} returns.role - Vai trò
 * @returns {string} returns.dateOfBirth - Ngày sinh
 * @returns {string} returns.address - Địa chỉ
 * @returns {string} returns.sex - Giới tính
 * @returns {string} returns.department - Phòng ban
 * @returns {string} returns.position - Chức vụ
 * @throws {Error} Nếu không thể lấy thông tin
 * 
 * @description Gọi GET /api/users/me và map response từ backend format sang frontend format
 * Backend sử dụng: userID, phoneNumber
 * Frontend sử dụng: id, phone
 */
export const getUserProfile = async () => {
    try {
        console.debug('[UserService] Đang gọi getMyProfile...');
        
        // Gọi hàm API (getMyProfile) đã được auto-gen
        const data = await promisifyApiCall(usersApiInstance.getMyProfile);
        
        console.debug('[UserService] Nhận được profile:', data);
        
        if (!data) {
            throw new Error('Không nhận được dữ liệu từ server');
        }
        
        // Map backend response to frontend format
        // Backend uses: userID, phoneNumber
        // Frontend expects: id, phone
        const mappedData = {
            id: data.userID || data.id,
            username: data.username,
            email: data.email,
            phone: data.phoneNumber || data.phone,
            fullName: data.fullName,
            role: data.role,
            dateOfBirth: data.dateOfBirth,
            address: data.address,
            sex: data.sex,
            department: data.department,
            position: data.position
        };
        
        console.debug('[UserService] Mapped data:', mappedData);
        return mappedData;
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

/**
 * Cập nhật thông tin cá nhân của người dùng hiện tại
 * @async
 * @function updateUserProfile
 * @param {Object} updateData - Dữ liệu cập nhật
 * @param {string} [updateData.email] - Email mới
 * @param {string} [updateData.phone] - Số điện thoại mới
 * @param {string} [updateData.fullName] - Họ tên mới
 * @param {string} [updateData.address] - Địa chỉ mới
 * @param {string} [updateData.dateOfBirth] - Ngày sinh mới (ISO format)
 * @returns {Promise<Object>} Thông tin đã cập nhật từ server
 * @throws {Error} Nếu cập nhật thất bại
 * 
 * @example
 * await updateUserProfile({
 *   email: 'newemail@example.com',
 *   phone: '0123456789'
 * });
 */
export const updateUserProfile = async (updateData) => {
    try {
        console.debug('[UserService] Đang gọi updateMyProfile với:', updateData);
        
        // Gọi hàm API (updateMyProfile) đã được auto-gen
        const data = await promisifyApiCall(usersApiInstance.updateMyProfile, updateData);
        
        console.debug('[UserService] Cập nhật response:', data);
        if (!data) {
            throw new Error('Không nhận được phản hồi từ server');
        }
        return data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};