import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaBriefcase, FaCalendarAlt, FaFileAlt, FaPhone } from 'react-icons/fa';

const NavWrapper = styled.nav`
    position: fixed; 
    top: 140px; 
    width: 100%;
    height: 50px; 
    z-index: 90; 
    
    background-color: white; 
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);

    display: flex;
    justify-content: center; 
`;

const NavContent = styled.div`
    display: flex;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    justify-content: space-around;
`;

const NavLinkItem = styled(Link)`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 15px;
    height: 100%; 
    color: #333;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.4rem;
    transition: all 0.2s;
    
    /* Hiệu ứng gạch dưới cho mục đang được chọn (active) */
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: ${props => props.active ? '#007bff' : 'transparent'};
        transition: background-color 0.2s;
    }

    &:hover {
        color: #007bff;
        &::after {
            background-color: #007bff;
        }
    }
`;

const GuestLinks = () => (
    <>
        <NavLinkItem to="/" active="true">
            <FaHome /> Trang chủ
        </NavLinkItem>
        <NavLinkItem to="/gioi-thieu">
            <FaInfoCircle /> Giới thiệu
        </NavLinkItem>
        <NavLinkItem to="/co-hoi-viec-lam">
            <FaBriefcase /> Cơ hội việc làm
        </NavLinkItem>
        <NavLinkItem to="/ke-hoach-tuyen-dung">
            <FaCalendarAlt /> Kế hoạch tuyển dụng
        </NavLinkItem>
        <NavLinkItem to="/bieu-mau">
            <FaFileAlt /> Biểu mẫu
        </NavLinkItem>
        <NavLinkItem to="/tin-tuc">
            <FaFileAlt /> Tin tức
        </NavLinkItem>
        <NavLinkItem to="/lien-he">
            <FaPhone /> Liên hệ
        </NavLinkItem>
    </>
);

const Navbar = ({ isAuthenticated = false }) => {
    return (
        <NavWrapper>
            <NavContent>
                {/* 💡 Logic phân biệt nội dung (Hiện tại chỉ hiển thị Guest Links) */}
                {!isAuthenticated && <GuestLinks />}

                {/* {isAuthenticated && <UserLinks />}  <- Nếu đã đăng nhập */}
            </NavContent>
        </NavWrapper>
    );
};

export default Navbar;