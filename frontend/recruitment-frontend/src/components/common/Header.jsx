import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaDoorOpen } from 'react-icons/fa';
import Logo from '../common/Logo'; 
import useScrollDirection from '../../hooks/useScrollDirection';

const HeaderContainer = styled.header`
    width: 100%;
    height: 5rem;
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
    transition: transform 0.3s ease-in-out;
    transform: translateY(${props => (props.$hidden ? '-100%' : '0')});
`;

const HeaderContent = styled.div`
    width: 90%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center; 
    position: relative;
    padding: 0 10rem;
`;

const LogoLinkWrapper = styled(Link)`
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    /* Loại bỏ gạch chân của Link */
    text-decoration: none; 
    /* Tăng độ tương tác khi hover */
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.85;
    }
`;

const Title = styled.div`
    text-align: center; 

    h1 {
        font-size: 2rem;
        margin: 0;
        font-weight: bold;
        letter-spacing: 1px;
        line-height: 1.4;
    }

    h2 {
        font-size: 1.5rem;
        margin: 0;
        font-weight: normal;
        opacity: 0.9;
        line-height: 1.4;
    }
`;

const RightAction = styled.div`
    position: absolute;
    right: 1.5rem;   /* 🔽 đẩy nút vào trong một chút */
    top: 50%;
    transform: translateY(-50%);  /* căn giữa theo chiều dọc */
`;

const AuthActionLink = styled(Link)`
    background-color: white;
    color: #1877f2;
    border: none;
    border-radius: 0.5rem; 
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    padding: 0.35rem 0.7rem;
    
    display: flex;
    align-items: center;
    gap: 0.3rem; 
    font-size: 0.9rem; 
    text-decoration: none;

    &:hover {
        background-color: #f0f0f0;
        opacity: 1;
        transform: translateY(-1px); 
    }
`;

const Header = ({ isAuthenticated, onLogout }) => {
    const location = useLocation();

    const { isHidden, scrollDir: scrollDirection } = useScrollDirection(80);    
    console.log(`Scroll Direction: ${scrollDirection} | Is Hidden: ${isHidden}`);
    
    const isAuthPage = location.pathname.startsWith('/login') || 
                       location.pathname.startsWith('/register') || 
                       location.pathname.startsWith('/forgot-password');

    const shouldShowLogout = isAuthenticated && !isAuthPage;

    return (
        <HeaderContainer $hidden={isHidden}>
            <HeaderContent>
                <LogoLinkWrapper to="/home">
                    <Logo />
                </LogoLinkWrapper>
                <Title>
                    <h1>TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</h1>
                    <h2>PHÒNG TỔ CHỨC HÀNH CHÍNH</h2>
                </Title>
                {(isAuthPage || shouldShowLogout) && (
                    <RightAction>
                        {isAuthPage ? (
                            <AuthActionLink to="/">
                                <FaArrowLeft size={10} /> Về trang chủ
                            </AuthActionLink>
                        ) : (
                            <AuthActionLink to="/" onClick={onLogout}>
                                <FaDoorOpen size={10} />Đăng xuất
                            </AuthActionLink>
                        )}
                    </RightAction>
                )}
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;