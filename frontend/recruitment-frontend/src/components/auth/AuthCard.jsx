/**
 * @fileoverview Component thẻ chứa form xác thực
 * @module components/auth/AuthCard
 * @description Card wrapper cho các form login, register, forgot password
 */

    import React from 'react';
    import styled from 'styled-components';
    import { FaUserLock, FaUserPlus, FaQuestionCircle } from 'react-icons/fa';

    /** @constant {string} ACCENT_COLOR - Màu nhấn mạnh chính */
    const ACCENT_COLOR = '#1877f2';

    const FormCard = styled.div`
        width: 100%;
        max-width: 20rem;
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 0.6rem 1.8rem rgba(0, 0, 0, 0.2);
        padding: 1rem;
        text-align: center;
    `;

    const FormHeader = styled.div`
        margin-bottom: 2rem;

        .icon-wrapper {
            font-size: 3rem; 
            color: ${ACCENT_COLOR}; 
            margin-bottom: 0.6rem;
            display: flex;
            justify-content: center;
        }
        
        h2 {
            font-size: 1.6rem;
            margin: 0;
            font-weight: 700;
            color: #333;
        }

        p {
            font-size: 0.9rem;
            color: #666;
            margin-top: 0.5rem;
        }
    `;

    /**
     * Map loại form với icon tương ứng
     * @constant {Object}
     */
    const ICON_MAP = {
        login: FaUserLock,
        register: FaUserPlus,
        forgot: FaQuestionCircle
    };

    /**
     * Component thẻ chứa form xác thực
     * @component
     * @param {Object} props - Props của component
     * @param {string} props.type - Loại form ('login' | 'register' | 'forgot')
     * @param {string} props.title - Tiêu đề hiển thị
     * @param {string} props.tagline - Mô tả ngắn dưới tiêu đề
     * @param {React.ReactNode} props.children - Form component con
     * @returns {JSX.Element} Card chứa form
     * 
     * @example
     * <AuthCard type="login" title="Đăng nhập" tagline="Vui lòng nhập thông tin">
     *   <LoginForm {...formProps} />
     * </AuthCard>
     */
    const AuthCard = ({ type, title, tagline, children }) => {
        const Icon = ICON_MAP[type] || FaUserLock; 

        return (
            <FormCard>
                <FormHeader>
                    <div className="icon-wrapper">
                        <Icon />
                    </div>
                    <h2>{title}</h2>
                    <p>{tagline}</p>
                </FormHeader>
                {children}
            </FormCard>
        );
    };

    export default AuthCard;