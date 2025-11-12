import { useState, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

const useAuth = (initialState, successCallback, apiFunction) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); 

    const authContext = useContext(AuthContext);
    const { isLoading: contextLoading, error: contextError } = authContext;

    if (!apiFunction) {
        throw new Error("useAuth requires an apiFunction argument (e.g., context.login, context.register).");
    }

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
        setSuccessMessage(null); 

    }, []); 

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccessMessage(null);
        
        try {
            const result = await apiFunction(formData); 
            
            if (successCallback) {
                if (result && (result.token || result.user)) {
                    successCallback(result); 
                } 
                else if (result && result.message) {
                    setSuccessMessage(result.message);
                } else {
                    successCallback(result);
                }
            }
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi không xác định."); 
            setSuccessMessage(null);
        }

    }, [formData, successCallback, apiFunction]); 
    
    return { 
        formData, 
        handleChange, 
        handleSubmit, 
        isLoading: contextLoading, 
        error: error || contextError, 
        success: successMessage
    };
};

export default useAuth;