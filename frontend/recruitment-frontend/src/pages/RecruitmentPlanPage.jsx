import React, { useState, useContext, useEffect } from 'react';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import RecruitmentPlanModal from '../components/recruitment/RecruitmentPlanModal';
import { PlansApi } from '../api-client';

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

const PlanGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const PlanCard = styled.div`
    background: white;
    border-radius: 0.6rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: ${props => (props.canEdit || props.canApprove) ? 'pointer' : 'default'};

    &:hover {
        transform: ${props => (props.canEdit || props.canApprove) ? 'translateY(-3px)' : 'none'};
        box-shadow: ${props => (props.canEdit || props.canApprove) ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};
    cursor: ${props => props.isHeadmaster ? 'pointer' : 'default'};

    &:hover {
        transform: ${props => props.isHeadmaster ? 'translateY(-3px)' : 'none'};
        box-shadow: ${props => props.isHeadmaster ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};
    }
`;

const CardActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const CardActionButton = styled.button`
    padding: 0.4rem;
    border: none;
    background: none;
    color: ${props => {
        if (props.approve) return '#28a745';
        if (props.reject) return '#dc3545';
        if (props.delete) return '#dc3545';
        return '#1877f2';
    }};
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

const PlanStatus = styled.span`
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 1rem;
    
    ${({ status }) => {
        switch (status) {
            case 'approved':
                return 'background: #e6f4ea; color: #1e7e34;';
            case 'pending':
                return 'background: #fff3e0; color: #f57c00;';
            case 'rejected':
                return 'background: #feeced; color: #d32f2f;';
            default:
                return 'background: #f8f9fa; color: #666;';
        }
    }}
`;

const PlanTitle = styled.h3`
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const PlanInfo = styled.div`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.3rem;
`;



const plansApi = new PlansApi();

const RecruitmentPlanPage = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const mockPlans = [
    {
        id: 1,
        title: 'Tuyển dụng giảng viên khoa CNTT',
        department: 'Khoa Công nghệ thông tin',
        positions: 3,
        status: 'approved',
        deadline: '2025-12-31',
    },
    {
        id: 2,
        title: 'Tuyển dụng nhân viên phòng đào tạo',
        department: 'Phòng Đào tạo',
        positions: 2,
        status: 'pending',
        deadline: '2025-11-30',
    },
    {
        id: 3,
        title: 'Tuyển dụng giảng viên khoa Điện-Điện tử',
        department: 'Khoa Điện-Điện tử',
        positions: 4,
        status: 'rejected',
        deadline: '2025-11-15',
    },
];

const RecruitmentPlanPage = () => {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    
    // Fetch plans on component mount
    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await plansApi.getPlans();
            setPlans(response);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách kế hoạch');
            console.error('Error fetching plans:', err);
        } finally {
            setLoading(false);
        }
    };

    // Kiểm tra role
    const isAdmin = user?.role === 'admin';
    const isHeadmaster = user?.role === 'headmaster';
    const isStaff = user?.role === 'staff';

    // Define permissions based on role
    const canCreatePlan = isAdmin;
    const canEditPlan = isAdmin;
    const canDeletePlan = isAdmin || isHeadmaster;
    const canApprovePlan = isHeadmaster;
    const canRejectPlan = isHeadmaster;

    const handlePlanClick = (plan) => {
        if (canEditPlan || canApprovePlan) {
    // Kiểm tra người dùng có phải là hiệu trưởng
    const isHeadmaster = user?.role === 'headmaster';

    const handlePlanClick = (plan) => {
        if (isHeadmaster) {
            setEditingPlan(plan);
            setIsModalOpen(true);
        }
    };

    const handleAddPlan = () => {
        if (canCreatePlan) {
            setEditingPlan(null);
            setIsModalOpen(true);
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (editingPlan && canEditPlan) {
                await plansApi.updatePlan(editingPlan.id, data);
            } else if (canCreatePlan) {
                await plansApi.createPlan(data);
            }
            await fetchPlans(); // Refresh the list
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error submitting plan:', err);
            alert('Có lỗi xảy ra khi lưu kế hoạch');
        }
    };

    const handleDelete = async (planId) => {
        if (canDeletePlan && window.confirm('Bạn có chắc muốn xóa kế hoạch này?')) {
            try {
                await plansApi.deletePlan(planId);
                await fetchPlans(); // Refresh the list
            } catch (err) {
                console.error('Error deleting plan:', err);
                alert('Có lỗi xảy ra khi xóa kế hoạch');
            }
        }
    };

    const handleApprove = async (planId) => {
        if (canApprovePlan) {
            try {
                await plansApi.updatePlanStatus(planId, { status: 'approved' });
                await fetchPlans(); // Refresh the list
            } catch (err) {
                console.error('Error approving plan:', err);
                alert('Có lỗi xảy ra khi phê duyệt kế hoạch');
            }
        }
    };

    const handleReject = async (planId) => {
        if (canRejectPlan) {
            try {
                await plansApi.updatePlanStatus(planId, { status: 'rejected' });
                await fetchPlans(); // Refresh the list
            } catch (err) {
                console.error('Error rejecting plan:', err);
                alert('Có lỗi xảy ra khi từ chối kế hoạch');
            }
        }
        setEditingPlan(null);
        setIsModalOpen(true);
    };

    const handleSubmit = (data) => {
        if (editingPlan) {
            // Cập nhật kế hoạch hiện có
            console.log('Updating plan:', { ...editingPlan, ...data });
        } else {
            // Tạo kế hoạch mới
            console.log('Creating new plan:', data);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (planId) => {
        if (window.confirm('Bạn có chắc muốn xóa kế hoạch này?')) {
            console.log('Deleting plan:', planId);
        }
    };

    const handleApprove = (planId) => {
        console.log('Approving plan:', planId);
    };

    const handleReject = (planId) => {
        console.log('Rejecting plan:', planId);
    };

    return (
        <MainLayout>
            <Container>
                <PageHeader>
                    <Title>Lập kế hoạch tuyển dụng</Title>
                    {canCreatePlan && (
                        <ActionButton onClick={handleAddPlan}>
                            <FaPlus />
                            Thêm kế hoạch mới
                        </ActionButton>
                    )}
                    <ActionButton onClick={handleAddPlan}>
                        <FaPlus />
                        Thêm kế hoạch mới
                    </ActionButton>
                </PageHeader>

                <SearchBar>
                    <SearchInput>
                        <FaSearch />
                        <input 
                            type="text"
                            placeholder="Tìm kiếm kế hoạch tuyển dụng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchInput>
                    <FilterButton>
                        <FaFilter />
                        Bộ lọc
                    </FilterButton>
                </SearchBar>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        Đang tải dữ liệu...
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#dc3545' }}>
                        {error}
                    </div>
                ) : plans.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                        Chưa có kế hoạch tuyển dụng nào
                    </div>
                ) : (
                    <PlanGrid>
                        {plans.map(plan => (
                            <PlanCard 
                                key={plan.id}
                                canEdit={canEditPlan}
                                canApprove={canApprovePlan}
                                onClick={() => handlePlanClick(plan)}
                            >
                                <PlanStatus status={plan.status}>
                                    {plan.status === 'approved' && 'Đã duyệt'}
                                    {plan.status === 'pending' && 'Chờ duyệt'}
                                    {plan.status === 'rejected' && 'Từ chối'}
                                </PlanStatus>
                                <PlanTitle>{plan.title}</PlanTitle>
                                <PlanInfo>Đơn vị: {plan.department}</PlanInfo>
                                <PlanInfo>Số lượng: {plan.positions} vị trí</PlanInfo>
                                <PlanInfo>Hạn nộp: {new Date(plan.deadline).toLocaleDateString('vi-VN')}</PlanInfo>
                                
                                {/* Hiển thị nút phê duyệt/từ chối cho hiệu trưởng */}
                                {plan.status === 'pending' && canApprovePlan && (
                                    <CardActions>
                                        <CardActionButton
                                            approve
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleApprove(plan.id);
                                            }}
                                            title="Phê duyệt"
                                        >
                                            <FaCheck />
                                        </CardActionButton>
                                        <CardActionButton
                                            reject
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReject(plan.id);
                                            }}
                                            title="Từ chối"
                                        >
                                            <FaTimes />
                                        </CardActionButton>
                                    </CardActions>
                                )}
                                
                                {/* Hiển thị nút chỉnh sửa/xóa cho admin */}
                                {(isAdmin || (user?.id === plan.createdBy && canEditPlan)) && plan.status !== 'approved' && (
                                    <CardActions>
                                        {canEditPlan && (
                                            <CardActionButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingPlan(plan);
                                                    setIsModalOpen(true);
                                                }}
                                                title="Chỉnh sửa"
                                            >
                                                <FaEdit />
                                            </CardActionButton>
                                        )}
                                        {canDeletePlan && (
                                            <CardActionButton
                                                delete
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(plan.id);
                                                }}
                                                title="Xóa"
                                            >
                                                <FaTrash />
                                            </CardActionButton>
                                        )}
                                    </CardActions>
                                )}
                            </PlanCard>
                        ))}
                    </PlanGrid>
                )}
                <PlanGrid>
                    {mockPlans.map(plan => (
                        <PlanCard 
                            key={plan.id} 
                            isHeadmaster={isHeadmaster}
                            onClick={() => handlePlanClick(plan)}
                        >
                            <PlanStatus status={plan.status}>
                                {plan.status === 'approved' && 'Đã duyệt'}
                                {plan.status === 'pending' && 'Chờ duyệt'}
                                {plan.status === 'rejected' && 'Từ chối'}
                            </PlanStatus>
                            <PlanTitle>{plan.title}</PlanTitle>
                            <PlanInfo>Đơn vị: {plan.department}</PlanInfo>
                            <PlanInfo>Số lượng: {plan.positions} vị trí</PlanInfo>
                            <PlanInfo>Hạn nộp: {new Date(plan.deadline).toLocaleDateString('vi-VN')}</PlanInfo>
                            
                            {plan.status === 'pending' && isHeadmaster && (
                                <CardActions>
                                    <CardActionButton
                                        approve
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApprove(plan.id);
                                        }}
                                        title="Phê duyệt"
                                    >
                                        <FaCheck />
                                    </CardActionButton>
                                    <CardActionButton
                                        reject
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReject(plan.id);
                                        }}
                                        title="Từ chối"
                                    >
                                        <FaTimes />
                                    </CardActionButton>
                                </CardActions>
                            )}
                            
                            {(user?.id === plan.createdBy || isHeadmaster) && plan.status !== 'approved' && (
                                <CardActions>
                                    <CardActionButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingPlan(plan);
                                            setIsModalOpen(true);
                                        }}
                                        title="Chỉnh sửa"
                                    >
                                        <FaEdit />
                                    </CardActionButton>
                                    <CardActionButton
                                        delete
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(plan.id);
                                        }}
                                        title="Xóa"
                                    >
                                        <FaTrash />
                                    </CardActionButton>
                                </CardActions>
                            )}
                        </PlanCard>
                    ))}
                </PlanGrid>

                <RecruitmentPlanModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialData={editingPlan}
                    onSubmit={handleSubmit}
                />
            </Container>
        </MainLayout>
    );
};

export default RecruitmentPlanPage;