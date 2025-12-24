import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/UserService';
import apiService from '../services/ApiService';

const PageContainer = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
`;

const CardBody = styled.div`
  padding: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.label`
  font-weight: 600;
  color: #6c757d;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.isEditing ? '#667eea' : '#e9ecef'};
  border-radius: 8px;
  background-color: ${props => props.isEditing ? '#fff' : '#f8f9fa'};
  color: #495057;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.isEditing ? '#667eea' : '#e9ecef'};
  border-radius: 8px;
  background-color: ${props => props.isEditing ? '#fff' : '#f8f9fa'};
  color: #495057;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const InfoValue = styled.div`
  padding: 12px 16px;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  color: #495057;
  font-size: 16px;
  min-height: 48px;
  display: flex;
  align-items: center;
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background-color: ${props => {
    switch (props.role) {
      case 'ADMIN': return '#e74c3c';
      case 'PERSONNEL_MANAGER': return '#3498db';
      case 'UNIT_MANAGER': return '#f39c12';
      case 'RECTOR': return '#9b59b6';
      default: return '#95a5a6';
    }
  }};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
`;

const Button = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => props.primary && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  `}

  ${props => props.secondary && `
    background: white;
    color: #667eea;
    border: 2px solid #667eea;

    &:hover {
      background: #f8f9fa;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #c33;
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #3c3;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #3c3;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #667eea;
`;

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: "",
    fullName: "",
    dateOfBirth: "",
    sex: "",
    address: "",
    department: "",
    email: "",
    phone: "",
    position: "",
    role: ""
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Reinitialize API service with credentials from localStorage
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      
      console.log('Loading profile for user:', username);
      
      if (!username || !password) {
        throw new Error('Chưa đăng nhập. Vui lòng đăng nhập lại.');
      }
      
      // Ensure API client has credentials
      apiService.setupCredentials(username, password);
      
      const userData = await getUserProfile();
      console.log('Loaded user data:', userData);
      
      // Convert dateOfBirth to string if it's a Date object
      const dateOfBirth = userData.dateOfBirth 
        ? (typeof userData.dateOfBirth === 'string' 
            ? userData.dateOfBirth 
            : new Date(userData.dateOfBirth).toISOString().split('T')[0]
          )
        : "";
      
      setProfileData({
        username: userData.username || "",
        fullName: userData.fullName || "",
        dateOfBirth: dateOfBirth,
        sex: userData.sex || "",
        address: userData.address || "",
        department: userData.department || "",
        email: userData.email || "",
        phone: userData.phone || "",
        position: userData.position || "",
        role: userData.role || ""
      });
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError("Không thể tải thông tin người dùng: " + (err.message || "Lỗi không xác định"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      setError("");
      setSuccess("");
      
      await updateUserProfile({
        email: profileData.email,
        phoneNumber: profileData.phone,
        address: profileData.address
      });

      setSuccess("Cập nhật thông tin thành công!");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Không thể cập nhật thông tin: " + (err.message || "Lỗi không xác định"));
    }
  };

  const getRoleLabel = (role) => {
    const roleMap = {
      'ADMIN': 'Quản trị viên hệ thống',
      'PERSONNEL_MANAGER': 'Nhân viên phòng tổ chức',
      'UNIT_MANAGER': 'Trưởng đơn vị',
      'RECTOR': 'Hiệu trưởng'
    };
    return roleMap[role] || role;
  };

  if (isLoading) {
    return (
      <MainLayout>
        <PageContainer>
          <LoadingSpinner>Đang tải thông tin...</LoadingSpinner>
        </PageContainer>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageContainer>
        <ProfileCard>
          <CardHeader>
            <Title>Thông tin cá nhân</Title>
            <Subtitle>Quản lý và cập nhật thông tin của bạn</Subtitle>
          </CardHeader>

          <CardBody>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <SectionTitle>Thông tin tài khoản</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Tên đăng nhập</InfoLabel>
                <InfoValue>{profileData.username}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Vai trò</InfoLabel>
                <InfoValue>
                  <RoleBadge role={profileData.role}>
                    {getRoleLabel(profileData.role)}
                  </RoleBadge>
                </InfoValue>
              </InfoItem>
            </InfoGrid>

            <SectionTitle>Thông tin cá nhân</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Họ và tên</InfoLabel>
                <InfoValue>{profileData.fullName}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Ngày sinh</InfoLabel>
                <InfoValue>
                  {profileData.dateOfBirth ? 
                    (typeof profileData.dateOfBirth === 'string' 
                      ? profileData.dateOfBirth 
                      : new Date(profileData.dateOfBirth).toLocaleDateString('vi-VN')
                    ) 
                    : 'Chưa cập nhật'
                  }
                </InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Giới tính</InfoLabel>
                {isEditing ? (
                  <StyledSelect
                    name="sex"
                    value={profileData.sex}
                    onChange={handleInputChange}
                    isEditing={isEditing}
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </StyledSelect>
                ) : (
                  <InfoValue>{profileData.sex}</InfoValue>
                )}
              </InfoItem>

              <InfoItem>
                <InfoLabel>Địa chỉ</InfoLabel>
                {isEditing ? (
                  <StyledInput
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    isEditing={isEditing}
                    placeholder="Nhập địa chỉ"
                  />
                ) : (
                  <InfoValue>{profileData.address || "Chưa cập nhật"}</InfoValue>
                )}
              </InfoItem>
            </InfoGrid>

            {(profileData.department || profileData.position) && (
              <>
                <SectionTitle>Thông tin công việc</SectionTitle>
                <InfoGrid>
                  {profileData.department && (
                    <InfoItem>
                      <InfoLabel>Phòng ban / Đơn vị</InfoLabel>
                      <InfoValue>{profileData.department}</InfoValue>
                    </InfoItem>
                  )}

                  {profileData.position && (
                    <InfoItem>
                      <InfoLabel>Chức vụ</InfoLabel>
                      <InfoValue>{profileData.position}</InfoValue>
                    </InfoItem>
                  )}
                </InfoGrid>
              </>
            )}

            <SectionTitle>Thông tin liên hệ</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Email</InfoLabel>
                {isEditing ? (
                  <StyledInput
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    isEditing={isEditing}
                    placeholder="Nhập email"
                  />
                ) : (
                  <InfoValue>{profileData.email || "Chưa cập nhật"}</InfoValue>
                )}
              </InfoItem>

              <InfoItem>
                <InfoLabel>Số điện thoại</InfoLabel>
                {isEditing ? (
                  <StyledInput
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    isEditing={isEditing}
                    placeholder="Nhập số điện thoại"
                  />
                ) : (
                  <InfoValue>{profileData.phone || "Chưa cập nhật"}</InfoValue>
                )}
              </InfoItem>
            </InfoGrid>

            <ButtonGroup>
              {isEditing ? (
                <>
                  <Button secondary onClick={() => {
                    setIsEditing(false);
                    loadUserProfile();
                    setError("");
                    setSuccess("");
                  }}>
                    Hủy
                  </Button>
                  <Button primary onClick={handleUpdate}>
                    Lưu thay đổi
                  </Button>
                </>
              ) : (
                <Button primary onClick={() => setIsEditing(true)}>
                  Chỉnh sửa thông tin
                </Button>
              )}
            </ButtonGroup>
          </CardBody>
        </ProfileCard>
      </PageContainer>
    </MainLayout>
  );
};

export default ProfilePage;
