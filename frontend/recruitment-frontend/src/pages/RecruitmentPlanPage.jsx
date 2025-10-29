import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import RecruitmentPlanModal from '../components/recruitment/RecruitmentPlanModal';
// import { PlansApi } from '../api-client'; // Tạm thời không cần import API

// --- Giữ nguyên các styled components ---
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
    /* Điều chỉnh cursor dựa trên quyền edit hoặc approve */
    cursor: ${props => (props.canEdit || props.canApprove) ? 'pointer' : 'default'};
    cursor: ${props => (props.canEdit || props.canApprove) ? 'pointer' : 'default'};

    &:hover {
        transform: ${props => (props.canEdit || props.canApprove) ? 'translateY(-3px)' : 'none'};
        box-shadow: ${props => (props.canEdit || props.canApprove) ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};
    cursor: ${props => props.isHeadmaster ? 'pointer' : 'default'};

    &:hover {
        transform: ${props => (props.canEdit || props.canApprove) ? 'translateY(-3px)' : 'none'};
        box-shadow: ${props => (props.canEdit || props.canApprove) ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};
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
        return '#1877f2'; // Edit color
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
            case 'approved': return 'background: #e6f4ea; color: #1e7e34;';
            case 'pending': return 'background: #fff3e0; color: #f57c00;';
            case 'rejected': return 'background: #feeced; color: #d32f2f;';
            default: return 'background: #f8f9fa; color: #666;';
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
// --- Kết thúc styled components ---


// const plansApi = new PlansApi(); // Tạm thời không tạo instance API

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
    // Không dùng state cho plans, loading, error nữa
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

    // Dữ liệu giả (mock data)
    const mockPlans = [
        {
            id: 1,
            title: 'Tuyển dụng giảng viên khoa CNTT',
            department: 'Khoa Công nghệ thông tin',
            positions: 3,
            status: 'approved',
            deadline: '2025-12-31',
            createdBy: 'admin-id-placeholder' // Thêm ID người tạo giả định
        },
        {
            id: 2,
            title: 'Tuyển dụng nhân viên phòng đào tạo',
            department: 'Phòng Đào tạo',
            positions: 2,
            status: 'pending',
            deadline: '2025-11-30',
            createdBy: 'admin-id-placeholder'
        },
        {
            id: 3,
            title: 'Tuyển dụng giảng viên khoa Điện-Điện tử',
            department: 'Khoa Điện-Điện tử',
            positions: 4,
            status: 'rejected',
            deadline: '2025-11-15',
            createdBy: 'admin-id-placeholder'
        },
    ];

    // Không cần fetchPlans nữa
    // useEffect(() => { fetchPlans(); }, []);
    // const fetchPlans = async () => { /* ... */ };

    // Kiểm tra role và quyền (Giữ nguyên)
    const isAdmin = user?.role === 'admin';
    
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
    const canCreatePlan = isAdmin;
    const canEditPlan = isAdmin;
    const canDeletePlan = isAdmin || isHeadmaster;
    const canApprovePlan = isHeadmaster;
    const canRejectPlan = isHeadmaster;

    // Các hàm xử lý sự kiện (Giữ nguyên nhưng chỉ log hoặc alert)
    const handlePlanClick = (plan) => {
        if (canEditPlan || canApprovePlan) {
            console.log("Clicked plan:", plan);
            setEditingPlan(plan);
            setIsModalOpen(true);
        } else {
             console.log("Clicked plan (read-only):", plan);
             // Có thể hiển thị chi tiết plan ở đây nếu muốn
        }
    };

    const handleAddPlan = () => {
        if (canCreatePlan) {
            setEditingPlan(null);
            setIsModalOpen(true);
        } else {
            alert("Bạn không có quyền thêm kế hoạch mới.");
        }
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
        // Chỉ log, không gọi API
        if (editingPlan) {
            console.log('Updating mock plan (simulation):', { ...editingPlan, ...data });
        } else {
            console.log('Creating new mock plan (simulation):', { id: Date.now(), ...data, status: 'pending', createdBy: user?.id });
        }
        setIsModalOpen(false);
        alert('Lưu ý: Chức năng này chỉ mô phỏng, dữ liệu thực tế chưa được lưu.');
    };

    const handleDelete = (planId) => {
        if (canDeletePlan && window.confirm('Bạn có chắc muốn xóa kế hoạch này?')) {
            console.log('Deleting mock plan (simulation):', planId);
            alert('Lưu ý: Chức năng này chỉ mô phỏng, dữ liệu thực tế chưa được xóa.');
        }
    };

    const handleApprove = (planId) => {
        if (canApprovePlan) {
            console.log('Approving mock plan (simulation):', planId);
            alert('Lưu ý: Chức năng này chỉ mô phỏng, trạng thái thực tế chưa được cập nhật.');
        }
    };

    const handleReject = (planId) => {
        if (canRejectPlan) {
            console.log('Rejecting mock plan (simulation):', planId);
            alert('Lưu ý: Chức năng này chỉ mô phỏng, trạng thái thực tế chưa được cập nhật.');
        }
    };

    return (
        <MainLayout>
            <Container>
                <PageHeader>
                    <Title>Lập kế hoạch tuyển dụng</Title>
                    {/* Nút thêm kế hoạch chỉ hiển thị nếu có quyền */}
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

                {/* Bỏ qua loading, error, plans.length === 0 check */}
                {/* Trực tiếp render PlanGrid với mockPlans */}
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
                    {/* Thêm bộ lọc tìm kiếm đơn giản */}
                    {mockPlans
                        .filter(plan => plan.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(plan => (
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

                            {/* Nút Duyệt/Từ chối cho Headmaster */}
                            {plan.status === 'pending' && canApprovePlan && (
                                <CardActions>
                                    <CardActionButton
                                        approve
                                        onClick={(e) => { e.stopPropagation(); handleApprove(plan.id); }}
                                        title="Phê duyệt"
                                    > <FaCheck /> </CardActionButton>
                                    <CardActionButton
                                        reject
                                        onClick={(e) => { e.stopPropagation(); handleReject(plan.id); }}
                                        title="Từ chối"
                                    > <FaTimes /> </CardActionButton>
                                </CardActions>
                            )}

                            {/* Nút Sửa/Xóa */}
                            {/* Điều kiện: Chưa duyệt VÀ (là admin HOẶC (người tạo VÀ có quyền sửa) HOẶC có quyền xóa) */}
                            {plan.status !== 'approved' && (isAdmin || (user?.id === plan.createdBy && canEditPlan) || canDeletePlan) && (
                                <CardActions>
                                    {/* Chỉ hiện nút Sửa nếu là admin HOẶC (người tạo VÀ có quyền sửa) */}
                                    {(isAdmin || (user?.id === plan.createdBy && canEditPlan)) && (
                                         <CardActionButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingPlan(plan);
                                                setIsModalOpen(true);
                                            }}
                                            title="Chỉnh sửa"
                                        > <FaEdit /> </CardActionButton>
                                    )}
                                    {/* Chỉ hiện nút Xóa nếu có quyền xóa */}
                                    {canDeletePlan && (
                                        <CardActionButton
                                            delete
                                            onClick={(e) => { e.stopPropagation(); handleDelete(plan.id); }}
                                            title="Xóa"
                                        > <FaTrash /> </CardActionButton>
                                    )}
                                </CardActions>
                            )}
                        </PlanCard>
                    ))}
                </PlanGrid>

                {/* Modal vẫn giữ nguyên */}
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