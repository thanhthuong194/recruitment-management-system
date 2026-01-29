/**
 * @fileoverview Trang chủ sau đăng nhập
 * @module pages/HomePage
 * @description Trang dashboard hiển thị các chức năng chính của hệ thống
 * tùy theo role của người dùng
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaBullhorn, FaIdCard, FaClipboardCheck, FaUsers, FaUser } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 0;
`;

const WelcomeSection = styled.div`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 3rem;
    border-left: 6px solid #ffd700;
`;

const WelcomeTitle = styled.h1`
    font-size: 2rem;
    color: white;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const WelcomeText = styled.p`
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    color: #1877f2;
    margin-bottom: 2rem;
    font-weight: 600;
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 4px solid #1877f2;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
`;

const IconWrapper = styled.div`
    font-size: 3rem;
    color: #1877f2;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
`;

const CardTitle = styled.h3`
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 0.8rem;
    text-align: center;
    font-weight: 600;
`;

const CardDescription = styled.p`
    font-size: 1rem;
    color: #666;
    text-align: center;
    line-height: 1.6;
`;

/**
 * Component trang chủ sau đăng nhập
 * @component
 * @returns {JSX.Element} Trang dashboard
 * 
 * @description
 * - Hiển thị welcome message với tên người dùng
 * - Hiển thị các feature cards tùy theo role:
 *   + RECTOR: Kế hoạch, Thông báo, Hồ sơ, Kết quả, Cá nhân
 *   + UNIT_MANAGER: Kế hoạch, Cá nhân
 *   + PERSONNEL_MANAGER: Thông báo, Hồ sơ, Kết quả, Cá nhân
 *   + ADMIN: Quản lý người dùng, Cá nhân
 * - Navigate đến trang tương ứng khi click card
 */
const HomePage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const features = [
        {
            icon: FaCalendarAlt,
            title: 'Lập kế hoạch tuyển dụng',
            description: 'Để xuất và phê duyệt nhu cầu tuyển dụng của đơn vị.',
            path: '/recruitment/plan',
            roles: ['RECTOR', 'UNIT_MANAGER', 'PERSONNEL_MANAGER']
        },
        {
            icon: FaBullhorn,
            title: 'Thông báo kế hoạch tuyển dụng',
            description: 'Đăng tải các thông báo và tin tuyển dụng chính thức.',
            path: '/recruitment/notifications',
            roles: ['PERSONNEL_MANAGER', 'ADMIN', 'RECTOR']
        },
        {
            icon: FaIdCard,
            title: 'Hồ sơ',
            description: 'Hồ sơ của ứng viên ứng tuyển.',
            path: '/candidates',
            roles: ['ADMIN', 'PERSONNEL_MANAGER', 'RECTOR']
        },
        {
            icon: FaUsers,
            title: 'Người dùng',
            description: 'Quản lý người dùng hệ thống.',
            path: '/users',
            roles: ['ADMIN']
        },
        {
            icon: FaUser,
            title: 'Cá nhân',
            description: 'Thông tin và cài đặt cá nhân.',
            path: '/profile',
            roles: ['ADMIN', 'RECTOR', 'UNIT_MANAGER', 'PERSONNEL_MANAGER']
        }
    ];

    const handleCardClick = (path) => {
        navigate(path);
    };

    const visibleFeatures = features.filter(feature => 
        !feature.roles || feature.roles.includes(user?.role)
    );

    return (
        <MainLayout>
            <Container>
                <WelcomeSection>
                    <WelcomeTitle>
                        Hi! Welcome, {user?.username}! 👋
                    </WelcomeTitle>
                    <WelcomeText>
                        Chào mừng bạn đã đăng nhập vào hệ thống Quản lý Tuyển dụng của Trường Đại học Sư phạm Kỹ thuật TP.HCM.
                    </WelcomeText>
                </WelcomeSection>

                <SectionTitle>Danh Mục Chức Năng Chính</SectionTitle>

                <FeaturesGrid>
                    {visibleFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <FeatureCard key={index} onClick={() => handleCardClick(feature.path)}>
                                <IconWrapper>
                                    <Icon />
                                </IconWrapper>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </FeatureCard>
                        );
                    })}
                </FeaturesGrid>
            </Container>
        </MainLayout>
    );
};

export default HomePage;
