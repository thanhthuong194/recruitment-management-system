import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const DARK_SHADOW = 'rgba(0, 0, 0, 0.6)';
const OFF_WHITE_COLOR = '#F5F5F5';

const HeroWrapper = styled.div`
    max-width: 900px;
    text-align: center;
    color: ${OFF_WHITE_COLOR};
    padding: 40px;
    margin-top: -300px; 
    position: relative;
    z-index: 5;
    margin-top: -50px;
`;

const MainTitle = styled.h1`
    font-size: 3.4rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow:
        0 0 5px ${DARK_SHADOW},
        0 0 10px ${DARK_SHADOW};
    color: ${OFF_WHITE_COLOR};
    & span {
        color: ${OFF_WHITE_COLOR};
        text-shadow: inherit;
`;

const Tagline = styled.h2`
    font-size: 2.0rem; 
    font-weight: 500;
    margin-bottom: 25px; 
    color: ${OFF_WHITE_COLOR};
    text-shadow: 0 0 3px ${DARK_SHADOW};
`;

const Description = styled.h2`
    font-size: 1.3rem;
    font-weight: 400; 
    margin-bottom: 40px; 
    line-height: 1.6;
    opacity: 1;
    color: ${OFF_WHITE_COLOR};
    text-shadow: 1px 1px 2px ${DARK_SHADOW};
`;


const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const HeroSection = () => {
    return (
        <HeroWrapper>
            <MainTitle>
                CHÀO MỪNG ĐẾN VỚI HỆ THỐNG QUẢN LÝ TUYỂN DỤNG
            </MainTitle>
            <Tagline>
                Trường Đại học Sư phạm Kỹ thuật TP.HCM
            </Tagline>
            <Description>
                Khám phá những cơ hội nghề nghiệp tuyệt vời dành cho bạn tại trường đại học hàng đầu về đào tạo sư phạm kỹ thuật. Hãy tham gia cũng chúng tôi để xây dựng tương lai giáo dục Việt Nam.
            </Description>
            
            <ButtonGroup>
                <Button to="/login" primary icon={FaSignInAlt}>
                    Đăng nhập
                </Button>
                <Button to="/register" icon={FaUserPlus}>
                    Đăng ký ngay
                </Button>
            </ButtonGroup>
        </HeroWrapper>
    );
};

export default HeroSection;