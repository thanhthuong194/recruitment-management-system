import React, { useContext } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';

const ProfileCard = styled.div`
  background: #fff;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.2rem 1.5rem;
  margin-bottom: 2.5rem;
  align-items: center;
`;

const InfoLabel = styled.label`
  font-weight: 600;
  color: #555;
  text-align: right;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const EditButton = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #166fe5;
  }
`;

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const profileData = {
    fullName: user?.name || "Chưa có thông tin",
    dob: "01/01/1990",
    gender: "Nam",
    hometown: "TP. Hồ Chí Minh",
    department: "Khoa Công nghệ thông tin", // New field
    email: user?.email || "Chưa có thông tin",
    phone: "0123-456-789",
    position: "Nhân viên",
  };

  return (
    <MainLayout>
      <ProfileCard>
        <Title>Thông tin cá nhân</Title>
        <InfoGrid>
          <InfoLabel htmlFor="fullName">Họ và tên:</InfoLabel>
          <StyledInput id="fullName" readOnly value={profileData.fullName} />

          <InfoLabel htmlFor="dob">Ngày / tháng năm sinh:</InfoLabel>
          <StyledInput id="dob" readOnly value={profileData.dob} />

          <InfoLabel htmlFor="gender">Giới tính:</InfoLabel>
          <StyledInput id="gender" readOnly value={profileData.gender} />

          <InfoLabel htmlFor="hometown">Quê quán:</InfoLabel>
          <StyledInput id="hometown" readOnly value={profileData.hometown} />

          <InfoLabel htmlFor="department">Phòng ban:</InfoLabel>
          <StyledInput id="department" readOnly value={profileData.department} />

          <InfoLabel htmlFor="email">Email:</InfoLabel>
          <StyledInput id="email" readOnly value={profileData.email} />

          <InfoLabel htmlFor="phone">Số điện thoại:</InfoLabel>
          <StyledInput id="phone" readOnly value={profileData.phone} />

          <InfoLabel htmlFor="position">Vị trí:</InfoLabel>
          <StyledInput id="position" readOnly value={profileData.position} />
        </InfoGrid>
        <EditButton>Chỉnh sửa thông tin</EditButton>
      </ProfileCard>
    </MainLayout>
  );
};

export default ProfilePage;
