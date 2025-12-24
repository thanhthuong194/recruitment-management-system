import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class CandidateService {
    // Get all candidates (HR/Admin/Rector only)
    async getAllCandidates() {
        try {
            const response = await axios.get(`${API_URL}/candidates`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching candidates:', error);
            throw error;
        }
    }

    // Get candidate by ID
    async getCandidateById(id) {
        try {
            const response = await axios.get(`${API_URL}/candidates/${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching candidate:', error);
            throw error;
        }
    }

    // Delete candidate (Admin only)
    async deleteCandidate(id) {
        try {
            const response = await axios.delete(`${API_URL}/candidates/${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting candidate:', error);
            throw error;
        }
    }
}

export default new CandidateService();
