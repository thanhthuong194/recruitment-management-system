import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom'; 


const PRIMARY_COLOR_BG = '#1877f2'; 
const PRIMARY_COLOR_HOVER = '#166fe5';
const SECONDARY_COLOR_BG = 'rgba(255, 255, 255, 0.15)';
const SECONDARY_COLOR_HOVER = 'rgba(255, 255, 255, 0.25)';
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

const Button = ({ children, primary, to, onClick, type = 'button', icon: IconComponent, ...props }) => {
    const ButtonContent = (
        <>
            {/* 💡 Hiển thị Icon nếu có */}
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