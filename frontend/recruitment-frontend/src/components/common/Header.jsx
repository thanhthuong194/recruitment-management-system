import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Logo from '../common/Logo'; 

const HeaderContainer = styled.header`
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, #3080c9, #4ac4d3);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
`;

const HeaderContent = styled.div`
    width: 90%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center; 
    position: relative;
    padding: 0 150px;
`;

const LogoWrapper = styled.div`
    /* GIỮ NGUYÊN CẤU TRÚC CŨ CỦA BẠN */
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    /* GIỮ NGUYÊN CẤU TRÚC CŨ CỦA BẠN */
    text-align: center; 

    h1 {
        font-size: 2.5rem;
        margin: 0;
        font-weight: bold;
        letter-spacing: 1px;
        line-height: 1.4;
    }

    h2 {
        font-size: 2.1rem;
        margin: 0;
        font-weight: normal;
        opacity: 0.9;
        line-height: 1.4;
    }
`;

const RightAction = styled.div`
    position: absolute;
    right: 0; // Đẩy sát góc phải
    /* Có thể điều chỉnh vị trí dọc (top/bottom) nếu cần, nhưng căn giữa mặc định là đủ */
`;

const AuthActionLink = styled(Link)`
    background-color: white;
    color: #1877f2;
    border: none;
    border-radius: 8px; 
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    padding: 10px 15px; 
    
    display: flex;
    align-items: center;
    gap: 8px; 
    font-size: 1rem;
    text-decoration: none;

    &:hover {
        background-color: #f0f0f0;
        opacity: 1;
        transform: translateY(-1px); 
    }
`;

const Header = () => {
    const location = useLocation();
    
    const isAuthPage = location.pathname.startsWith('/login') || 
                       location.pathname.startsWith('/register') || 
                       location.pathname.startsWith('/forgot-password');

    return (
        <HeaderContainer>
            <HeaderContent>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
                <Title>
                    <h1>TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</h1>
                    <h2>PHÒNG TỔ CHỨC HÀNH CHÍNH</h2>
                </Title>
                {isAuthPage && (
                    <RightAction>
                        <AuthActionLink to="/">
                            <FaArrowLeft size={14} /> Về trang chủ
                        </AuthActionLink>
                    </RightAction>
                )}
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;