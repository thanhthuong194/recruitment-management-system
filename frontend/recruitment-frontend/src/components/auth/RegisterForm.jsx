import React from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';

const ACCENT_COLOR = '#1877f2';

const PrimaryButton = styled.button`
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.8rem;
    
    background: linear-gradient(90deg, ${ACCENT_COLOR}, #4ac4d3);
    box-shadow: 0 0.2rem 0.6rem rgba(24, 119, 242, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background: linear-gradient(90deg, #166fe5, #45b3c0);
    }
`;

const FooterLinks = styled.div`
    margin-top: 0.8rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #666;
    
    a {
        color: ${ACCENT_COLOR};
        text-decoration: none;
        font-weight: 600;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;

const RegisterForm = ({ formData, handleChange, handleSubmit, isLoading, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</p>}

            <InputField 
                Icon={FaUser} 
                label="Họ và tên" 
                id="fullname" 
                name="fullname" 
                placeholder="Nhập họ và tên" 
                value={formData.fullname || ''} 
                onChange={handleChange} 
                required 
            />
            
            <InputField 
                Icon={FaEnvelope} 
                label="Email" 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Nhập email" 
                value={formData.email || ''} 
                onChange={handleChange} 
                required 
            />

            <InputField 
                Icon={FaUser} 
                label="Tên đăng nhập" 
                id="username" 
                name="username" 
                placeholder="Nhập tên đăng nhập" 
                value={formData.username || ''} 
                onChange={handleChange} 
                required 
            />

            <InputField 
                Icon={FaLock} 
                label="Mật khẩu" 
                id="password" 
                name="password" 
                placeholder="Nhập mật khẩu" 
                isPassword 
                value={formData.password || ''} 
                onChange={handleChange} 
                required 
            />

            <InputField 
                Icon={FaLock} 
                label="Xác nhận mật khẩu" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Nhập lại mật khẩu" 
                isPassword 
                value={formData.confirmPassword || ''} 
                onChange={handleChange} 
                required 
            />

            <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? 'Đang xử lý...' : <><FaUserPlus /> ĐĂNG KÝ</>}
            </PrimaryButton>

            <FooterLinks>
                Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </FooterLinks>

        </form>
    );
};

export default RegisterForm;