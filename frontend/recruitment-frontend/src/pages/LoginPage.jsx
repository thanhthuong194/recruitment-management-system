import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import AuthCard from '../components/auth/AuthCard'; 
import LoginForm from '../components/auth/LoginForm'; 
import useAuth from '../hooks/useAuth'; 
import { AuthContext } from '../context/AuthContext'; 

const initialLoginState = {
    username: '',
    password: ''
};

const LoginPage = () => {

    const navigate = useNavigate();
    // Lấy hàm login từ AuthContext
    // AuthContext chứa state và hàm liên quan đến xác thực người dùng : user, login, logout
    // useContext(AuthContext): Truy cập giá trị hiện tại của AuthContext
    const { login } = useContext(AuthContext);

    const handleLoginSuccess = (result) => {
        if (result && result.token) {
            navigate('/home'); 
        }
    };

    const { 
        formData, 
        handleChange, 
        handleSubmit, 
        isLoading, 
        error 
    } = useAuth(
        initialLoginState, 
        handleLoginSuccess, 
        login          
    );

    return (
        <AuthLayout>
            <AuthCard 
                type="login" 
                title="Đăng nhập hệ thống" 
                tagline="Vui lòng nhập thông tin đăng nhập của bạn"
            >
                <LoginForm 
                    formData={formData} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                />
            </AuthCard>
        </AuthLayout>
    );
};

export default LoginPage;