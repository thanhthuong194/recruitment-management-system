import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import RegisterForm from '../components/auth/RegisterForm'; 
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext'; 

const initialRegisterState = {
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
};

const RegisterPage = () => {
    const navigate = useNavigate();
    
    const { register } = useContext(AuthContext);

    // Hàm callback chuyển hướng khi đăng ký thành công
    const handleRegisterSuccess = (result) => {
        // Sau khi đăng ký thành công, thường sẽ chuyển người dùng về trang đăng nhập
        // và hiển thị thông báo thành công.
        
        // Bạn có thể thêm logic lưu trữ thông tin nếu API trả về token sau khi đăng ký
        if (result && result.token) {
             // Nếu API trả về token, chuyển thẳng đến trang chủ (ít dùng)
             navigate('/home'); 
        } else {
             // Nếu API chỉ trả về tin nhắn thành công, chuyển về trang Đăng nhập
             navigate('/login?success=registered');
        }
    };

    // 💡 SỬ DỤNG useAuth: Truyền initialState, Callback, và Hàm API (register)
    const { 
        formData, 
        handleChange, 
        handleSubmit, 
        isLoading, 
        error 
        // success // Bạn có thể thêm 'success' nếu muốn hiển thị thông báo thành công ngay tại đây
    } = useAuth(
        initialRegisterState, 
        handleRegisterSuccess, // Callback: Xử lý Navigation
        register               // Hàm API: Sử dụng context.register
    );

    return (
        <AuthLayout>
            <AuthCard 
                type="register" 
                title="Đăng ký tài khoản" 
                tagline="Vui lòng nhập thông tin để tạo tài khoản mới"
            >
                <RegisterForm 
                    formData={formData} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                    // success={success} // Nếu dùng, cần truyền success vào RegisterForm
                />
            </AuthCard>
        </AuthLayout>
    );
};

export default RegisterPage;