/**
 * @fileoverview Component Button tái sử dụng
 * @module components/common/Button
 * @description Button với 2 variants: primary và secondary
 * Hỗ trợ cả nút thường và Link navigation
 */

import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom'; 

/** @constant {string} PRIMARY_COLOR_BG - Màu nền primary */
const PRIMARY_COLOR_BG = '#1877f2'; 
/** @constant {string} PRIMARY_COLOR_HOVER - Màu hover primary */
const PRIMARY_COLOR_HOVER = '#166fe5';
/** @constant {string} SECONDARY_COLOR_BG - Màu nền secondary */
const SECONDARY_COLOR_BG = 'rgba(255, 255, 255, 0.15)';
/** @constant {string} SECONDARY_COLOR_HOVER - Màu hover secondary */
const SECONDARY_COLOR_HOVER = 'rgba(255, 255, 255, 0.25)';
/** @constant {string} SECONDARY_TEXT_COLOR - Màu chữ secondary */
const SECONDARY_TEXT_COLOR = '#F5F5F5';

const StyledButton = styled.button`
    padding: 12px 28px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    /* Primary Style (Đăng nhập) */
    ${props => props.primary && css`
        background: ${PRIMARY_COLOR_BG};
        color: white;
        border: none;
        box-shadow: 0 4px 15px rgba(0, 119, 255, 0.4); 

        &:hover {
            background-color: ${PRIMARY_COLOR_HOVER};
            box-shadow: 0 6px 20px rgba(0, 119, 255, 0.6);
            transform: translateY(-2px); /* Hiệu ứng nhấc nhẹ khi hover */
        }
    `}

    /* Secondary Style (Đăng ký ngay) */
    ${props => !props.primary && css`
        background: ${SECONDARY_COLOR_BG}; 
        color: ${SECONDARY_TEXT_COLOR};
        border: 1px solid rgba(255, 255, 255, 0.3); /* Viền mỏng trong suốt */
        box-shadow: none;

        &:hover {
            background-color: ${SECONDARY_COLOR_HOVER};
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
        }
    `}
`;

/**
 * Component Button tái sử dụng
 * @component
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Nội dung button
 * @param {boolean} [props.primary=false] - Sử dụng style primary (màu xanh nổi bật)
 * @param {string} [props.to] - URL đích nếu button là Link
 * @param {Function} [props.onClick] - Hàm xử lý click
 * @param {string} [props.type='button'] - Type của button (button|submit|reset)
 * @param {React.ComponentType} [props.icon] - Icon component hiển thị bên trái text
 * @returns {JSX.Element} Button hoặc Link
 * 
 * @example
 * // Button primary
 * <Button primary onClick={handleClick}>Submit</Button>
 * 
 * // Button Link với icon
 * <Button to="/login" icon={FaSignIn}>Login</Button>
 */
const Button = ({ children, primary, to, onClick, type = 'button', icon: IconComponent, ...props }) => {
    const ButtonContent = (
        <>
            {IconComponent && <IconComponent />} 
            {children}
        </>
    );

    if (to) {
        return <StyledButton as={Link} to={to} primary={primary} {...props}>{ButtonContent}</StyledButton>;
    }
    return <StyledButton type={type} primary={primary} onClick={onClick} {...props}>{ButtonContent}</StyledButton>;
};

export default Button;