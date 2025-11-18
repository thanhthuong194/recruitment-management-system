import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class UsersManagementService {
    // Get auth headers with Basic Auth
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

    // Get all users
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

    // Get user by ID
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

    // Create new user
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

    // Update existing user
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

    // Delete user
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
