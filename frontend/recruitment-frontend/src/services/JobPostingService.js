import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class JobPostingService {
    // Public - Get active job postings (no auth required)
    async getActiveJobPostings() {
        try {
            const response = await axios.get(`${API_URL}/jobs/public`);
            return response.data;
        } catch (error) {
            console.error('Error fetching active job postings:', error);
            throw error;
        }
    }

    // Public - Get job posting by ID (no auth required)
    async getJobPostingById(id) {
        try {
            const response = await axios.get(`${API_URL}/jobs/public/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching job posting:', error);
            throw error;
        }
    }

    // Public - Get job posting by Plan ID (no auth required)
    async getJobPostingByPlanId(planId) {
        try {
            const response = await axios.get(`${API_URL}/jobs/public/by-plan/${planId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching job posting by plan:', error);
            throw error;
        }
    }

    // Public - Get approved plan by ID (fallback for application form)
    async getApprovedPlanById(planId) {
        try {
            const response = await axios.get(`${API_URL}/plans/public/${planId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching approved plan:', error);
            throw error;
        }
    }

    // Get all job postings (authenticated)
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
