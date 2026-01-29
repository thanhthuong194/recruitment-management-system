/**
 * @fileoverview Layout cho các trang công khai (landing page)
 * @module layouts/PublicLayout
 * @description Layout với video background cho trang chủ công khai
 */

import React from 'react';
import styled from 'styled-components';

import VideoBackground from '../components/background/VideoBackground';
import Overlay from '../components/background/Overlay';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import useScrollDirection from '../hooks/useScrollDirection';

const MainContent = styled.main`
    position: relative;
    z-index: 10;
    padding-top: 190px; 
    min-height: calc(100vh - 80px); 
    background-color: transparent;
    display: flex;
    justify-content: center; 
    align-items: center; 
`;

/**
 * Layout cho trang công khai
 * @component
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Nội dung trang (HeroSection)
 * @returns {JSX.Element} Layout với video background
 * 
 * @description
 * - Video background toàn màn hình
 * - Overlay tối để tăng độ tương phản
 * - Header và Navbar cố định, tự động ẩn khi scroll
 * 
 * @example
 * <PublicLayout>
 *   <HeroSection />
 * </PublicLayout>
 */
const PublicLayout = ({ children }) => {
    const { isHidden } = useScrollDirection(80);
    return (
        <>
            <VideoBackground />
            <Overlay />           
            <Header $hidden={isHidden}/> 
            <Navbar isAuthenticated={false} $hidden={isHidden} />     
            <MainContent>
                {children}
            </MainContent>
            <Footer />
        </>
    );
};

export default PublicLayout;