/**
 * @fileoverview Component Navbar chính của ứng dụng
 * @module components/common/Navbar
 * @description Thanh điều hướng hiển thị các menu khác nhau
 * tùy theo trạng thái xác thực của người dùng
 */

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
        FaNewspaper,
        FaBullhorn } from 'react-icons/fa';

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

/**
 * Links hiển thị cho người dùng chưa đăng nhập
 * @component
 * @returns {JSX.Element} Các navigation links cho guest
 */
const GuestLinks = () => (
    <>
        <NavLinkItem to="/" active="true">
            <FaHome /> Trang chủ
        </NavLinkItem>

        <NavLinkItem to="/gioi-thieu">
            <FaInfoCircle /> Giới thiệu
        </NavLinkItem>

        <NavLinkItem to="/notifications">
            <FaBriefcase /> Thông báo tuyển dụng
        </NavLinkItem>

        <NavLinkItem to="/bieu-mau">
            <FaFileAlt /> Biểu mẫu
        </NavLinkItem>

        <NavLinkItem to="/tin-tuc">
            <FaNewspaper /> Tin tức
        </NavLinkItem>
    </>
);

/**
 * Links hiển thị cho người dùng đã đăng nhập
 * @component
 * @returns {JSX.Element} Các navigation links cho authenticated user
 */
const AuthLinks = () => (
    <>
        <NavLinkItem to="/" active="true">
            <FaHome /> Trang chủ
        </NavLinkItem>

        <NavLinkItem to="/ke-hoach-tuyen-dung">
            <FaCalendarAlt /> Kế hoạch tuyển dụng
        </NavLinkItem>

        <NavLinkItem to="/notifications">
            <FaBullhorn /> Thông báo tuyển dụng
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

/**
 * Component Navbar
 * @component
 * @param {Object} props - Props của component
 * @param {boolean} [props.isAuthenticated=false] - Trạng thái đăng nhập
 * @param {boolean} [props.$hidden] - Ẩn navbar khi scroll
 * @returns {JSX.Element} Navbar với menu tương ứng
 * 
 * @description Hiển thị:
 * - GuestLinks khi chưa đăng nhập (Trang chủ, Giới thiệu, Thông báo, etc.)
 * - AuthLinks khi đã đăng nhập (Kế hoạch, Hồ sơ, Kết quả, etc.)
 * 
 * @example
 * <Navbar isAuthenticated={true} $hidden={isHidden} />
 */
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