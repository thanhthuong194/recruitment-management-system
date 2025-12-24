import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class ApplicationService {
    // Public - Submit application (no auth required)
    async submitApplication(applicationData) {
        try {
            const response = await axios.post(`${API_URL}/applications/submit`, applicationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting application:', error);
            throw error;
        }
    }

    // Get all applications (HR/Admin/Rector only)
    async getAllApplications() {
        try {
            const response = await axios.get(`${API_URL}/applications`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    }

    // Get applications by status
    async getApplicationsByStatus(status) {
        try {
            const response = await axios.get(`${API_URL}/applications/status/${status}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching applications by status:', error);
            throw error;
        }
    }

    // Update application status (HR/Admin/Rector only)
    async updateApplicationStatus(id, status) {
        try {
            const response = await axios.put(
                `${API_URL}/applications/${id}/status`,
                { status },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating application status:', error);
            throw error;
        }
    }
}

export default new ApplicationService();
