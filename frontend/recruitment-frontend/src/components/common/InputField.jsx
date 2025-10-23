import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ACCENT_COLOR = '#1877f2';

const InputGroup = styled.div`
    text-align: left;
    margin-bottom: 20px;
    
    label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        color: #333;
        margin-bottom: 8px;
    }
`;

const InputFieldWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    input {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;
        
        &:focus {
            border-color: ${ACCENT_COLOR};
            outline: none;
            box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.2);
        }
    }

    .toggle-password {
        position: absolute;
        right: 15px;
        cursor: pointer;
        color: #999;
        font-size: 1.1rem;
        
        &:hover {
            color: #333;
        }
    }
`;

/**
 * Component InputField chung cho form.
 * @param {object} props - Bao gồm Icon, label, isPassword, và các thuộc tính input tiêu chuẩn (name, id, value, onChange).
 */
const InputField = ({ Icon, label, isPassword, type = 'text', ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    // Xác định type của input
    let inputType = type;
    if (isPassword) {
        inputType = showPassword ? 'text' : 'password';
    }

    // 💡 LƯU Ý QUAN TRỌNG:
    // Thuộc tính 'name', 'value', 'onChange' được truyền qua ...props.
    // Đảm bảo rằng trong component cha (LoginForm.jsx), bạn đã truyền name="username"
    
    return (
        <InputGroup>
            <label htmlFor={props.id}>
                {Icon && <Icon size={12} />} {label}
            </label>
            <InputFieldWrapper>
                {/* Sử dụng toán tử spread {...props} để truyền name, value, onChange, 
                  và các thuộc tính input khác (placeholder, required) vào thẻ <input> 
                */}
                <input 
                    type={inputType} 
                    {...props} 
                />
                
                {isPassword && (
                    <span 
                        className="toggle-password" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )}
            </InputFieldWrapper>
        </InputGroup>
    );
};

export default InputField;