import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/UserService';

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
  background-color: ${props => props.isEditing ? '#fff' : '#f5f5f5'};
  color: #333;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.isEditing ? '#1877f2' : '#d9d9d9'};
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

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #52c41a;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const CancelButton = styled(EditButton)`
  background-color: #fff;
  color: #1877f2;
  border: 1px solid #1877f2;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rawResponse, setRawResponse] = useState(null);
  const [showRaw, setShowRaw] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    dateOfBirth: "",
    sex: "",
    address: "",
    department: "",
    email: "",
    phone: "",
    position: ""
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      setError("");
      const userData = await getUserProfile();
      setRawResponse(userData);
      setProfileData({
        fullName: userData.fullName || "",
        dateOfBirth: userData.dateOfBirth || "",
        sex: userData.sex || "",
        address: userData.address || "",
        department: userData.department || "",
        email: userData.email || "",
        phone: userData.phoneNumber || userData.phone || "",
        position: userData.position || ""
      });
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError("Không thể tải thông tin người dùng: " + (err.message || "Lỗi không xác định"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      setError("");
      setSuccess("");
      
      await updateUserProfile({
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address
      });

      setSuccess("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (err) {
      setError("Không thể cập nhật thông tin: " + (err.message || "Lỗi không xác định"));
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <ProfileCard>
          <Title>Đang tải thông tin...</Title>
        </ProfileCard>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProfileCard>
        <Title>Thông tin cá nhân</Title>
        <div style={{ textAlign: 'right', marginBottom: '0.75rem' }}>
          <button onClick={() => setShowRaw(s => !s)} style={{ fontSize: '0.85rem' }}>
            {showRaw ? 'Ẩn raw response' : 'Hiển thị raw response'}
          </button>
        </div>
        {showRaw && rawResponse && (
          <pre style={{ textAlign: 'left', maxHeight: 200, overflow: 'auto', background: '#fafafa', padding: 12, borderRadius: 6 }}>
            {JSON.stringify(rawResponse, null, 2)}
          </pre>
        )}
        <InfoGrid>
          <InfoLabel htmlFor="fullName">Họ và tên:</InfoLabel>
          <StyledInput 
            id="fullName" 
            readOnly 
            value={profileData.fullName} 
            isEditing={false}
          />

          <InfoLabel htmlFor="dateOfBirth">Ngày sinh:</InfoLabel>
          <StyledInput 
            id="dateOfBirth" 
            readOnly 
            value={profileData.dateOfBirth} 
            isEditing={false}
          />

          <InfoLabel htmlFor="sex">Giới tính:</InfoLabel>
          <StyledInput 
            id="sex" 
            readOnly 
            value={profileData.sex === 'MALE' ? 'Nam' : profileData.sex === 'FEMALE' ? 'Nữ' : ''} 
            isEditing={false}
          />

          <InfoLabel htmlFor="address">Địa chỉ:</InfoLabel>
          <StyledInput 
            id="address" 
            readOnly={!isEditing} 
            value={profileData.address} 
            onChange={handleInputChange}
            isEditing={isEditing}
          />

          <InfoLabel htmlFor="department">Phòng ban:</InfoLabel>
          <StyledInput 
            id="department" 
            readOnly 
            value={profileData.department} 
            isEditing={false}
          />

          <InfoLabel htmlFor="email">Email:</InfoLabel>
          <StyledInput 
            id="email" 
            readOnly={!isEditing} 
            value={profileData.email} 
            onChange={handleInputChange}
            isEditing={isEditing}
          />

          <InfoLabel htmlFor="phone">Số điện thoại:</InfoLabel>
          <StyledInput 
            id="phone" 
            readOnly={!isEditing} 
            value={profileData.phone} 
            onChange={handleInputChange}
            isEditing={isEditing}
          />

          <InfoLabel htmlFor="position">Vị trí:</InfoLabel>
          <StyledInput 
            id="position" 
            readOnly 
            value={profileData.position} 
            isEditing={false}
          />
        </InfoGrid>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <ButtonGroup>
          {isEditing ? (
            <>
              <CancelButton onClick={() => {
                setIsEditing(false);
                loadUserProfile();
              }}>
                Hủy
              </CancelButton>
              <EditButton onClick={handleUpdate}>
                Lưu thay đổi
              </EditButton>
            </>
          ) : (
            <EditButton onClick={() => setIsEditing(true)}>
              Chỉnh sửa thông tin
            </EditButton>
          )}
        </ButtonGroup>
      </ProfileCard>
    </MainLayout>
  );
};

export default ProfilePage;
