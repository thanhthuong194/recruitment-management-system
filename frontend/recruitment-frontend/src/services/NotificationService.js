import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || '/api';

class NotificationService {
    // Get auth headers
    getAuthHeaders() {
        const token = localStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    // Get public notifications (for landing page)
    async getPublicNotifications() {
        try {
            const response = await axios.get(`${API_URL}/notifications/public`);
            return response.data;
        } catch (error) {
            console.error('Error fetching public notifications:', error);
            throw error;
        }
    }

    // Get all notifications (authenticated)
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

    // Create notification (HR only)
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

    // Update notification (HR only)
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

    // Delete notification (HR only)
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

    // Check if plan is already posted
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
