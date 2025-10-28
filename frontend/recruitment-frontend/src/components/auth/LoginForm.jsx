import React from 'react';
import styled from 'styled-components';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';

const ACCENT_COLOR = '#1877f2';

const PrimaryButton = styled.button`
    width: 100%;
    padding: 0.4rem;
    border: none;
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.6rem;
    
    background: linear-gradient(90deg, ${ACCENT_COLOR}, #4ac4d3);
    box-shadow: 0 4px 10px rgba(24, 119, 242, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background: linear-gradient(90deg, #166fe5, #45b3c0);
    }
`;

const FooterLinks = styled.div`
    margin-top: 0.9rem;
    font-size: 0.9rem;
    
    .forgot-password {
        display: block;
        color: ${ACCENT_COLOR};
        text-decoration: none;
        margin-bottom: 0.9rem;
        
        &:hover {
            text-decoration: underline;
        }
    }

    .register-link {
        color: #666;
        
        a {
            color: ${ACCENT_COLOR};
            text-decoration: none;
            font-weight: 600;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;


const LoginForm = ({ formData, handleChange, handleSubmit, isLoading, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red', marginBottom: '0.9rem' }}>{error}</p>}

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
            
            <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? 'Đang xử lý....' : <><FaSignInAlt /> ĐĂNG NHẬP</>}
            </PrimaryButton>

            <FooterLinks>
                <Link to="/forgot-password" className="forgot-password">Quên mật khẩu?</Link>
            </FooterLinks>
        </form>
    );
};

export default LoginForm;