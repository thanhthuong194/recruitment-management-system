import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import UsersManagementService from '../services/UsersManagementService';

const PageContainer = styled.div`
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #2c3e50;
  margin: 0;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background: #f8f9fa;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  white-space: nowrap;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:hover {
    background: #f8f9fa;
  }
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  color: #495057;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.3s;

  ${props => props.edit && `
    background: #f39c12;
    color: white;
    &:hover { background: #e67e22; }
  `}

  ${props => props.delete && `
    background: #e74c3c;
    color: white;
    &:hover { background: #c0392b; }
  `}
`;

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;

  ${props => {
    switch(props.role) {
      case 'ADMIN':
        return 'background: #e74c3c; color: white;';
      case 'RECTOR':
        return 'background: #9b59b6; color: white;';
      case 'UNIT_MANAGER':
        return 'background: #3498db; color: white;';
      case 'PERSONNEL_MANAGER':
        return 'background: #27ae60; color: white;';
      default:
        return 'background: #95a5a6; color: white;';
    }
  }}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #95a5a6;
  padding: 0;
  
  &:hover {
    color: #2c3e50;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #dfe6e9;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #dfe6e9;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  ${props => props.primary && `
    background: #3498db;
    color: white;
    &:hover { background: #2980b9; }
  `}

  ${props => props.secondary && `
    background: #95a5a6;
    color: white;
    &:hover { background: #7f8c8d; }
  `}
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c00;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #95a5a6;
  font-size: 16px;
`;

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
    role: 'UNIT_MANAGER',
    sex: 'Nam'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UsersManagementService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Không thể tải danh sách người dùng');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingUser) {
        await UsersManagementService.updateUser(editingUser.userID, formData);
      } else {
        await UsersManagementService.createUser(formData);
      }

      await fetchUsers();
      handleCloseModal();
    } catch (error) {
      setError(error.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '',
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      email: user.email,
      address: user.address,
      role: user.role,
      sex: user.sex
    });
    setShowModal(true);
  };

  const handleDelete = async (userId, userRole) => {
    // Only allow deleting UNIT_MANAGER
    if (userRole !== 'UNIT_MANAGER') {
      setError('Chỉ được phép xóa tài khoản Trưởng đơn vị');
      return;
    }

    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      return;
    }

    try {
      await UsersManagementService.deleteUser(userId);
      await fetchUsers();
    } catch (error) {
      setError(error.message || 'Không thể xóa người dùng');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setError('');
    setFormData({
      username: '',
      password: '',
      fullName: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      address: '',
      role: 'UNIT_MANAGER',
      sex: 'Nam'
    });
  };

  const getRoleText = (role) => {
    const roleMap = {
      'ADMIN': 'Quản trị viên',
      'RECTOR': 'Hiệu trưởng',
      'UNIT_MANAGER': 'Trưởng đơn vị',
      'PERSONNEL_MANAGER': 'Trưởng phòng Tổ chức Cán bộ'
    };
    return roleMap[role] || role;
  };

return (
  <MainLayout>
    <PageContainer>
      <Header>
        <Title>Quản lý người dùng</Title>
        <AddButton onClick={() => setShowModal(true)}>
          <FaPlus /> Thêm người dùng
        </AddButton>
      </Header>      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tên đăng nhập</Th>
              <Th>Họ tên</Th>
              <Th>Ngày sinh</Th>
              <Th>Giới tính</Th>
              <Th>Quê quán</Th>
              <Th>Chức vụ</Th>
              <Th>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.length === 0 ? (
              <Tr>
                <Td colSpan="8">
                  <EmptyState>Chưa có người dùng nào</EmptyState>
                </Td>
              </Tr>
            ) : (
              users.map(user => (
                <Tr key={user.userID}>
                  <Td>{user.userID}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.fullName}</Td>
                  <Td>{new Date(user.dateOfBirth).toLocaleDateString('vi-VN')}</Td>
                  <Td>{user.sex}</Td>
                  <Td>{user.address}</Td>
                  <Td>
                    <Badge role={user.role}>{getRoleText(user.role)}</Badge>
                  </Td>
                  <Td>
                    <ActionButtons>
                      {user.role === 'UNIT_MANAGER' && (
                        <>
                          <IconButton edit onClick={() => handleEdit(user)}>
                            <FaEdit /> Sửa
                          </IconButton>
                          <IconButton delete onClick={() => handleDelete(user.userID, user.role)}>
                            <FaTrash /> Xóa
                          </IconButton>
                        </>
                      )}
                      {user.role !== 'UNIT_MANAGER' && (
                        <span style={{ color: '#95a5a6', fontSize: '13px' }}>Không thể sửa/xóa</span>
                      )}
                    </ActionButtons>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingUser ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}
              </ModalTitle>
              <CloseButton onClick={handleCloseModal}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Tên đăng nhập *</Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={editingUser}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Mật khẩu {!editingUser && '*'}</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingUser}
                  placeholder={editingUser ? 'Để trống nếu không đổi' : ''}
                />
              </FormGroup>

              <FormGroup>
                <Label>Họ tên *</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Ngày sinh *</Label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Giới tính *</Label>
                <Select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại *</Label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Quê quán *</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              {!editingUser && (
                <FormGroup>
                  <Label>Chức vụ</Label>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    disabled
                  >
                    <option value="UNIT_MANAGER">Trưởng đơn vị</option>
                  </Select>
                  <small style={{ color: '#95a5a6', fontSize: '12px', marginTop: '4px' }}>
                    * Chỉ có thể tạo tài khoản Trưởng đơn vị
                  </small>
                </FormGroup>
              )}

              <ButtonGroup>
                <Button type="button" secondary onClick={handleCloseModal}>
                  Hủy
                </Button>
                <Button type="submit" primary>
                  {editingUser ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </ButtonGroup>
            </Form>
        </ModalContent>
      </ModalOverlay>
    )}
  </PageContainer>
  </MainLayout>
);
};export default UserManagementPage;
