import React from 'react';
import styled, {keyframes} from 'styled-components';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';
import BaseButton from '../common/Button';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.label`
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Input = styled.input`
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
        border-color: #1877f2;
        outline: none;
        box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
    }
`;

const ErrorMessage = styled.p`
    color: #d9534f;
    font-size: 0.85rem;
    text-align: center;
    margin-top: 10px;
`;

const SuccessMessage = styled.p`
    color: #5cb85c;
    font-size: 0.95rem;
    text-align: center;
    font-weight: 600;
    margin-top: 10px;
`;

const StyledSubmitButton = styled(BaseButton)`
    width: 100%;
    
    background: linear-gradient(to right, #1877f2, #4ac4d3); 
    color: white;
    border: none;
    border-radius: 8px; 
    font-size: 1.1rem;
    font-weight: 600;
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 

    &:hover:not([disabled]) {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
        opacity: 0.95;
        transform: translateY(-2px);
    }
    
    &[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    
    .spinner {
        animation: spin 1s linear infinite;
    }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


const ForgotPasswordForm = ({ formData, handleChange, handleSubmit, isLoading, error, success }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="email">
                    <FaEnvelope size={14} /> Email đăng ký
                </Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </FormGroup>

            <StyledSubmitButton type="submit" disabled={isLoading}>
                {isLoading ? (
                    <FaSpinner className="spinner" />
                ) : (
                    'GỬI YÊU CẦU'
                )}
            </StyledSubmitButton>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </Form>
    );
};

export default ForgotPasswordForm;