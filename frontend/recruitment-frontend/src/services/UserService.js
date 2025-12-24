import ApiClient from '../api-client/src/ApiClient';
import UsersApi from '../api-client/src/api/UsersApi';

// Quan trọng: Phải import 'ApiClient.instance' để đảm bảo dùng chung 1 đối tượng
// đã được ApiService cài đặt token.
const usersApiInstance = new UsersApi(ApiClient.instance);

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
};/**
 * Lấy thông tin cá nhân của người dùng hiện tại (gọi GET /api/users/me)
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
 * Cập nhật thông tin cá nhân
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