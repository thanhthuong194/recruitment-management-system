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
    align-items: center;
    position: relative;
    padding-top: 0;
    padding-bottom: 50px;
`;

const ContentWrapper = styled.div`
    /* Bù đắp chiều cao Header cố định (140px) */
    padding-top: 140px; 
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* Đảm bảo nội dung căn giữa và không bị trôi */
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