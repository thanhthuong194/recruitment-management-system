import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class PlansService {
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

    // Get all plans
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

    // Get plan by ID
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

    // Create new plan
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

    // Update existing plan
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

    // Delete plan
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

    // Approve plan
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

    // Reject plan with reason
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

    // Permanently delete approved/rejected plan
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
