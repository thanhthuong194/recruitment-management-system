import React from 'react';
import styled from 'styled-components';
import HcmuteLogo from '../../assets/logo_hcmute.png';

const LogoImage = styled.img`
  height: 120px;
  width: auto;
  object-fit: contain;
`;

const Logo = () => {
  return <LogoImage src={HcmuteLogo} alt="HCMUTE Logo" />;
};

export default Logo;