/**
 * @fileoverview Component Logo trường HCMUTE
 * @module components/common/Logo
 * @description Hiển thị logo của Trường Đại học Sư phạm Kỹ thuật TP.HCM
 */

import React from 'react';
import styled from 'styled-components';
import HcmuteLogo from '../../assets/logo_hcmute.png';

const LogoImage = styled.img`
  height: 5.7rem;
  width: auto;
  object-fit: contain;
`;

/**
 * Component Logo HCMUTE
 * @component
 * @returns {JSX.Element} Hình ảnh logo trường
 * 
 * @description Hiển thị logo trường với kích thước chuẩn 5.7rem
 */
const Logo = () => {
  return <LogoImage src={HcmuteLogo} alt="HCMUTE Logo" />;
};

export default Logo;