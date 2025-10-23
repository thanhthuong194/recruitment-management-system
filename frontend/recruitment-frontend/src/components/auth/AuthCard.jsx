import React from 'react';
import styled from 'styled-components';
import { FaUserLock, FaUserPlus, FaQuestionCircle } from 'react-icons/fa';

const ACCENT_COLOR = '#1877f2';

const FormCard = styled.div`
    width: 100%;
    max-width: 440px; 
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 30px;
    text-align: center;
`;

const FormHeader = styled.div`
    margin-bottom: 30px;

    .icon-wrapper {
        font-size: 3rem; 
        color: ${ACCENT_COLOR}; 
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
    }
    
    h2 {
        font-size: 1.6rem;
        margin: 0;
        font-weight: 700;
        color: #333;
    }

    p {
        font-size: 0.9rem;
        color: #666;
        margin-top: 5px;
    }
`;

const ICON_MAP = {
    login: FaUserLock,
    register: FaUserPlus,
    forgot: FaQuestionCircle
};

const AuthCard = ({ type, title, tagline, children }) => {
    const Icon = ICON_MAP[type] || FaUserLock; 

    return (
        <FormCard>
            <FormHeader>
                <div className="icon-wrapper">
                    <Icon />
                </div>
                <h2>{title}</h2>
                <p>{tagline}</p>
            </FormHeader>
            {children}
        </FormCard>
    );
};

export default AuthCard;