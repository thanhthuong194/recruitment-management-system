import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';

// --- Styled Components ---
const Container = styled.div`
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 0;
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const Title = styled.h2`
    font-size: 1.8rem;
    color: #3080c9;
    font-weight: 600;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.2rem;
    border: none;
    border-radius: 0.5rem;
    background: #1877f2;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background: #1661c6;
    }

    svg {
        font-size: 1rem;
    }
`;

const SearchBar = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const SearchInput = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    input {
        flex: 1;
        border: none;
        padding: 0.3rem;
        font-size: 0.9rem;
        &:focus {
            outline: none;
        }
    }

    svg {
        color: #666;
        margin-right: 0.5rem;
    }
`;

const FilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #f8f9fa;
        border-color: #1877f2;
        color: #1877f2;
    }
`;

const TableContainer = styled.div`
    background: white;
    border-radius: 0.6rem;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow-x: auto; /* For responsive tables */
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    
    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }

    th {
        background-color: #f8f9fa;
        font-weight: 600;
        color: #333;
    }

    tbody tr:hover {
        background-color: #f5f5f5;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.8rem;

    button {
        background: none;
        border: none;
        cursor: pointer;
        color: #555;
        font-size: 1rem;
        transition: color 0.2s;

        &:hover {
            color: #1877f2;
        }
        
        &.delete:hover {
            color: #dc3545;
        }
    }
`;

// --- Mock Data ---
const mockPersonnel = [
    { id: 1, fullName: 'Nguyễn Văn An', email: 'annv@hcmute.edu.vn', department: 'Khoa Công nghệ thông tin', position: 'Giảng viên', phone: '0901234567' },
    { id: 2, fullName: 'Trần Thị Bình', email: 'binhtt@hcmute.edu.vn', department: 'Phòng Đào tạo', position: 'Chuyên viên', phone: '0912345678' },
    { id: 3, fullName: 'Lê Văn Cường', email: 'cuonglv@hcmute.edu.vn', department: 'Khoa Điện-Điện tử', position: 'Trưởng khoa', phone: '0923456789' },
    { id: 4, fullName: 'Phạm Thị Dung', email: 'dungpt@hcmute.edu.vn', department: 'Phòng Tổ chức hành chính', position: 'Nhân viên', phone: '0934567890' },
];

const PersonnelManagementPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPersonnel = mockPersonnel.filter(p =>
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout>
            <Container>
                <PageHeader>
                    <Title>Quản lý nhân sự</Title>
                    <ActionButton onClick={() => alert('Mở modal thêm nhân sự mới!')}>
                        <FaPlus />
                        Thêm nhân sự
                    </ActionButton>
                </PageHeader>

                <SearchBar>
                    <SearchInput>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchInput>
                    <FilterButton>
                        <FaFilter />
                        Bộ lọc
                    </FilterButton>
                </SearchBar>

                <TableContainer>
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Email</th>
                                <th>Phòng ban</th>
                                <th>Vị trí</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPersonnel.map(person => (
                                <tr key={person.id}>
                                    <td>{person.fullName}</td>
                                    <td>{person.email}</td>
                                    <td>{person.department}</td>
                                    <td>{person.position}</td>
                                    <td>
                                        <ActionButtons>
                                            <button title="Chỉnh sửa" onClick={() => alert(`Sửa thông tin ${person.fullName}`)}><FaEdit /></button>
                                            <button title="Xóa" className="delete" onClick={() => window.confirm(`Bạn có chắc muốn xóa ${person.fullName}?`)}><FaTrash /></button>
                                        </ActionButtons>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </TableContainer>
            </Container>
        </MainLayout>
    );
};

export default PersonnelManagementPage;