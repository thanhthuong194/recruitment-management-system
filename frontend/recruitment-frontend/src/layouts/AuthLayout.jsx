import React from "react";
import styled from "styled-components";

import Header from '../components/common/Header';
import AuthBackground from '../assets/background.png';


const AuthContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    background-image: url(${AuthBackground});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    background-color: #3080c9;
    
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    padding-top: 0;
    padding-bottom: 2rem;
`;

const ContentWrapper = styled.div`
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
`;



const AuthLayout = ({ children }) => {
    return (
        <AuthContainer>
            <Header /> 
            <ContentWrapper>
                 {children}
            </ContentWrapper>
        </AuthContainer>
    );
};

export default AuthLayout;