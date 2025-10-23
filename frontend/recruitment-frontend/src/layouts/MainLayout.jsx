import React, { useContext } from 'react';
import styled from 'styled-components';

import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar'; 
import Footer from '../components/common/Footer';
import { AuthContext } from '../context/AuthContext';
import useScrollDirection from '../hooks/useScrollDirection';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentArea = styled.main`
    padding-top: 3.5rem; 
    flex-grow: 1; 
    background-color: #f8f9fa;
`;

const MainLayout = ({ children }) => {
    const { isHidden } = useScrollDirection(80);
    const { user, logout } = useContext(AuthContext);
    const isAuthenticated = !!user;

    const handleLogout = () => {
        logout(); 
    }; 

    return (
        <PageWrapper>
            <Header 
                isAuthenticated={isAuthenticated} 
                $hidden={isHidden}
                onLogout={handleLogout}/> 
            <Navbar isAuthenticated={isAuthenticated} $hidden={isHidden}/> 
            <ContentArea>
                {children}
            </ContentArea>
            <Footer />
        </PageWrapper>
    );
};

export default MainLayout;