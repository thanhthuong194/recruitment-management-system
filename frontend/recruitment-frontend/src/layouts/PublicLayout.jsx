import React from 'react';
import styled from 'styled-components';

import VideoBackground from '../components/background/VideoBackground';
import Overlay from '../components/background/Overlay';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainContent = styled.main`
    position: relative;
    z-index: 10;
    padding-top: 190px; 
    min-height: calc(100vh - 80px); 
    background-color: transparent;
    display: flex;
    justify-content: center; 
    align-items: center; 
`;

const PublicLayout = ({ children }) => {
    return (
        <>
            <VideoBackground />
            <Overlay />           
            <Header /> 
            <Navbar isAuthenticated={false} />     
            <MainContent>
                {children}
            </MainContent>
            <Footer />
        </>
    );
};

export default PublicLayout;