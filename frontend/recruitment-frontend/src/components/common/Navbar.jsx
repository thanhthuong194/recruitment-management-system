import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
        FaHome, 
        FaInfoCircle, 
        FaBriefcase, 
        FaCalendarAlt, 
        FaFileAlt, 
        FaFileSignature, 
        FaUser,
        FaUsers,
        FaClipboardCheck,
        FaIdCard,
        FaNewspaper } from 'react-icons/fa';

const NavWrapper = styled.nav`
    position: fixed; 
    top: 5rem; 
    width: 100%;
    height: 2rem; 
    z-index: 90; 
    background-color: white; 
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    display: flex;
    justify-content: center; 
    transition: transform 0.3s ease-in-out;
    transform: translateY(${props => (props.$hidden ? '-7rem' : '0')});
`;

const NavContent = styled.div`
    display: flex;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    padding: 0 0.5rem;
    justify-content: center;
    gap: 1.5rem;
`;

const NavLinkItem = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0 0.2rem;
    height: 100%; 
    color: #333;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.2s;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.25rem;
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

        <NavLinkItem to="/bieu-mau">
            <FaFileAlt /> Biểu mẫu
        </NavLinkItem>

        <NavLinkItem to="/tin-tuc">
            <FaNewspaper /> Tin tức
        </NavLinkItem>

        <NavLinkItem to="/ung-tuyen">
            <FaFileSignature /> Ứng tuyển
        </NavLinkItem>
    </>
);

const AuthLinks = () => (
    <>
        <NavLinkItem to="/" active="true">
            <FaHome /> Trang chủ
        </NavLinkItem>

        <NavLinkItem to="/ke-hoach-tuyen-dung">
            <FaCalendarAlt /> Kế hoạch tuyển dụng
        </NavLinkItem>

        <NavLinkItem to="/ho-so">
            <FaIdCard /> Hồ sơ
        </NavLinkItem>

        <NavLinkItem to="/ket-qua">
            <FaClipboardCheck /> Kết quả
        </NavLinkItem>

        <NavLinkItem to="/nguoi-dung">
            <FaUsers /> Người dùng
        </NavLinkItem>

        <NavLinkItem to="/ca-nhan">
            <FaUser /> Cá nhân
        </NavLinkItem>
    </>
);

const Navbar = ({ isAuthenticated = false, $hidden }) => {
    return (
        <NavWrapper $hidden={$hidden}>
            <NavContent>
                {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
            </NavContent>
        </NavWrapper>
    );
};

export default Navbar;