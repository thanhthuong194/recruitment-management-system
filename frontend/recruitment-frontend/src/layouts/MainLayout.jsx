import React, { useContext } from 'react';
import styled from 'styled-components';

import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar'; 
import Footer from '../components/common/Footer';
import { AuthContext } from '../context/AuthContext';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentArea = styled.main`
    padding-top: 190px; 
    flex-grow: 1; 
    background-color: #f8f9fa;
`;

const MainLayout = ({ children }) => {
    const { user } = useContext(AuthContext);
    const isAuthenticated = !!user; 

    return (
        <PageWrapper>
            <Header isAuthenticated={isAuthenticated} /> 
            <Navbar isAuthenticated={isAuthenticated} /> 
            <ContentArea>
                {children}
            </ContentArea>
            <Footer />
        </PageWrapper>
    );
};

export default MainLayout;