/**
 * @fileoverview Layout cho các trang xác thực (login, register, forgot password)
 * @module layouts/AuthLayout
 * @description Layout với background hình ảnh, dùng cho các form xác thực
 */

import React from "react";
import styled from "styled-components";

import Header from '../components/common/Header';
import AuthBackground from '../assets/background.png';


const AuthContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    background-image: url(${AuthBackground});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    background-color: #3080c9;
    
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    padding-top: 0;
    padding-bottom: 2rem;
`;

const ContentWrapper = styled.div`
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
`;



/**
 * Layout cho các trang xác thực
 * @component
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Form xác thực (AuthCard)
 * @returns {JSX.Element} Layout với background và Header
 * 
 * @description
 * - Background hình ảnh toàn màn hình
 * - Header phía trên
 * - Content được căn giữa
 * 
 * @example
 * <AuthLayout>
 *   <AuthCard type="login" title="Đăng nhập">
 *     <LoginForm />
 *   </AuthCard>
 * </AuthLayout>
 */
const AuthLayout = ({ children }) => {
    return (
        <AuthContainer>
            <Header /> 
            <ContentWrapper>
                 {children}
            </ContentWrapper>
        </AuthContainer>
    );
};

export default AuthLayout;