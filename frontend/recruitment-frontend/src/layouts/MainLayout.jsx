/**
 * @fileoverview Layout chính cho các trang đã xác thực
 * @module layouts/MainLayout
 * @description Wrapper layout bao gồm Header, nội dung chính và Footer
 * Sử dụng cho các trang sau khi đăng nhập
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import Header from '../components/common/Header'; 
import Footer from '../components/common/Footer';
import { AuthContext } from '../context/AuthContext';
import useScrollDirection from '../hooks/useScrollDirection';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentArea = styled.main`
    padding-top: 3.5rem; 
    flex-grow: 1; 
    background-color: #f8f9fa;
`;

/**
 * Layout chính cho các trang authenticated
 * @component
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Nội dung trang
 * @returns {JSX.Element} Layout với Header, content area và Footer
 * 
 * @description
 * - Header tự động ẩn/hiện theo scroll
 * - Nút đăng xuất trên Header
 * - Content area với background màu xám nhạt
 * 
 * @example
 * <MainLayout>
 *   <HomePage />
 * </MainLayout>
 */
const MainLayout = ({ children }) => {
    const { isHidden } = useScrollDirection(80);
    const { user, logout } = useContext(AuthContext);
    const isAuthenticated = !!user;

    const handleLogout = () => {
        logout(); 
    }; 

    return (
        <PageWrapper>
            <Header 
                isAuthenticated={isAuthenticated} 
                $hidden={isHidden}
                onLogout={handleLogout}/> 
            <ContentArea>
                {children}
            </ContentArea>
            <Footer />
        </PageWrapper>
    );
};

export default MainLayout;