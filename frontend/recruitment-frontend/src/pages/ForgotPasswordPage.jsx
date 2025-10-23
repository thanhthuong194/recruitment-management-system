import React, { useContext } from 'react'; 
import AuthLayout from '../layouts/AuthLayout';
import AuthCard from '../components/auth/AuthCard'; 
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext'; 

const initialForgotPasswordState = {
    email: '',
};

const ForgotPasswordPage = () => {
    const { forgotPassword } = useContext(AuthContext);

    const handleForgotSuccess = (result) => {
        // Có thể thêm logic điều hướng nếu cần, nhưng thường thì không cần.
        console.log('Forgot Password request successful, showing message.');
    };

    // 💡 SỬ DỤNG useAuth: Hook đã tự quản lý 'success' state bên trong
    const { 
        formData, 
        handleChange, 
        handleSubmit, 
        isLoading, 
        error,
        success // 💡 LẤY 'success' state trực tiếp từ hook
    } = useAuth(
        initialForgotPasswordState, 
        handleForgotSuccess, // Callback: Chỉ để log hoặc xử lý phụ
        forgotPassword       // Hàm API: Sử dụng context.forgotPassword
    );

    return (
        <AuthLayout>
            <AuthCard 
                type="forgot-password" 
                title="Quên mật khẩu" 
                tagline="Vui lòng nhập email để nhận lại mật khẩu mới"
            >
                <ForgotPasswordForm 
                    formData={formData} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                    success={success} 
                />
            </AuthCard>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;