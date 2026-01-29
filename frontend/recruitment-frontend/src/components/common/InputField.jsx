/**
 * @fileoverview Component InputField tái sử dụng cho forms
 * @module components/common/InputField
 * @description Input field với label, icon và hỗ trợ ẩn/hiện password
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

/** @constant {string} ACCENT_COLOR - Màu nhấn mạnh cho focus state */
const ACCENT_COLOR = '#1877f2';

const InputGroup = styled.div`
    text-align: left;
    margin-bottom: 1rem;
    
    label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        margin-bottom: 0.3rem;
    }
`;

const InputFieldWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    input {
        width: 100%;
        padding: 0.4rem 0.7rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 0.9rem;
        transition: border-color 0.2s;
        
        &:focus {
            border-color: ${ACCENT_COLOR};
            outline: none;
            box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.2);
        }
    }

    .toggle-password {
        position: absolute;
        right: 0.7rem;
        cursor: pointer;
        color: #999;
        font-size: 0.9rem;
        
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

    let inputType = type;
    if (isPassword) {
        inputType = showPassword ? 'text' : 'password';
    }
    
    return (
        <InputGroup>
            <label htmlFor={props.id}>
                {Icon && <Icon size={12} />} {label}
            </label>
            <InputFieldWrapper>
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