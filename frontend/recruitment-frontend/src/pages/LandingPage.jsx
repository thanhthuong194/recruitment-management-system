/**
 * @fileoverview Trang chủ công khai (Landing Page)
 * @module pages/LandingPage
 * @description Trang giới thiệu hệ thống tuyển dụng với video background
 */

import React from 'react';
import PublicLayout from '../layouts/PublicLayout';
import HeroSection from '../components/home/HeroSection';

/**
 * Component trang chủ công khai
 * @component
 * @returns {JSX.Element} Landing page với HeroSection
 * 
 * @description
 * - Sử dụng PublicLayout với video background
 * - Hiển thị HeroSection với nút đăng nhập
 */
const LandingPage = () => {
    return (
        <PublicLayout>
            <HeroSection /> 
        </PublicLayout>
    );
};

export default LandingPage;