// src/components/Common/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    width: 100%;
    background: linear-gradient(to right, #007bff, #00c6ff, #00c776); 
    color: white;
    padding: 0.3rem 0;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1;
    position: relative; 
    z-index: 10;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.25rem;
`;

const FooterText = styled.p`
    margin: 0.3rem 0;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <FooterContent>
                <FooterText>
                    © 2025 Trường Đại học Sư phạm Kỹ thuật TP.HCM. Tất cả quyền được bảo lưu.
                </FooterText>
                <FooterText>
                    Địa chỉ: 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM | Điện thoại: (028) 3896 4046
                </FooterText>
            </FooterContent>
        </FooterWrapper>
    );
};

export default Footer;