import React, { useState, useContext /*, useEffect */ } from 'react'; // Bỏ useEffect nếu không dùng fetch
import styled from 'styled-components';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import RecruitmentPlanModal from '../components/recruitment/RecruitmentPlanModal';
import { AuthContext } from '../context/AuthContext';

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

const Title = styled.h1`
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

const TableWrapper = styled.div`
    overflow-x: auto;
    background: white;
    border-radius: 0.6rem;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const StyledTable = styled.table`
    min-width: 100%;
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

const StatusBadge = styled.span`
    padding: 0.3rem 0.6rem;
    border-radius: 1rem;
    font-weight: 500;
    font-size: 0.8rem;
    color: white;
    background-color: ${props => {
        switch (props.status) {
            case 'Đã duyệt': return '#28a745'; // Green
            case 'Chờ duyệt': return '#ffc107'; // Yellow
            case 'Từ chối': return '#dc3545'; // Red
            default: return '#6c757d'; // Gray
        }
    }};
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
const mockPlans = [
    { id: 1, position: 'Giảng viên Khoa CNTT', quantity: 2, department: 'Khoa Công nghệ thông tin', status: 'Đã duyệt' },
    { id: 2, position: 'Chuyên viên Phòng Đào tạo', quantity: 1, department: 'Phòng Đào tạo', status: 'Chờ duyệt' },
    { id: 3, position: 'Kỹ sư phòng thí nghiệm', quantity: 3, department: 'Khoa Điện - Điện tử', status: 'Từ chối' },
];

const RecruitmentPlanPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [plans, setPlans] = useState(mockPlans);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useContext(AuthContext);

    const handleOpenModal = (plan = null) => {
        setEditingPlan(plan);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPlan(null);
    };

    const handleSubmitPlan = (data) => {
        if (editingPlan) {
            // Logic to update plan
            setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...data, department: user.department } : p));
        } else {
            // Logic to add new plan
            const newPlan = { ...data, id: plans.length + 1, department: user.department, status: 'Chờ duyệt' };
            setPlans([...plans, newPlan]);
        }
        handleCloseModal();
    };

    const filteredPlans = plans.filter(p =>
        p.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout>
            <Container>
                <PageHeader>
                    <Title>Lập Kế Hoạch Tuyển Dụng</Title>
                    <ActionButton onClick={() => handleOpenModal()}>
                        <FaPlus />
                        Tạo kế hoạch
                    </ActionButton>
                </PageHeader>

                <SearchBar>
                    <SearchInput>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo chức vụ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchInput>
                    <FilterButton>
                        <FaFilter />
                        Bộ lọc
                    </FilterButton>
                </SearchBar>

                <TableWrapper>
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Chức vụ</th>
                                <th>Số lượng</th>
                                <th>Đơn vị/Phòng ban</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlans.map(plan => (
                                <tr key={plan.id}>
                                    <td>{plan.position}</td>
                                    <td>{plan.quantity}</td>
                                    <td>{plan.department}</td>
                                    <td><StatusBadge status={plan.status}>{plan.status}</StatusBadge></td>
                                    <td>
                                        <ActionButtons>
                                            <button title="Duyệt" onClick={() => alert('Duyệt kế hoạch')}><FaCheck /></button>
                                            <button title="Từ chối" onClick={() => alert('Từ chối kế hoạch')}><FaTimes /></button>
                                            <button title="Chỉnh sửa" onClick={() => handleOpenModal(plan)}><FaEdit /></button>
                                            <button title="Xóa" className="delete" onClick={() => window.confirm('Xóa kế hoạch?')}><FaTrash /></button>
                                        </ActionButtons>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </TableWrapper>
            </Container>
            <RecruitmentPlanModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editingPlan}
                onSubmit={handleSubmitPlan}
            />
        </MainLayout>
    );
};

export default RecruitmentPlanPage;