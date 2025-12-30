import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaCheck, FaTimes, FaBullhorn } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import RecruitmentPlanModal from '../components/recruitment/RecruitmentPlanModal';
import PlansService from '../services/PlansService';
import NotificationService from '../services/NotificationService';

const Container = styled.div`
    width: 95%;
    max-width: 1400px;
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

const TabsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e9ecef;
`;

const Tab = styled.button`
    padding: 0.8rem 1.5rem;
    border: none;
    background: transparent;
    color: #666;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;

    &:hover {
        color: #1877f2;
        background: #f8f9fa;
    }

    ${props => props.active && `
        color: #1877f2;
        font-weight: 600;
        
        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: #1877f2;
        }
    `}
`;

const TabBadge = styled.span`
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0.2rem 0.6rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    ${props => {
        switch(props.type) {
            case 'pending':
                return `background: #fff3cd; color: #856404;`;
            case 'approved':
                return `background: #d4edda; color: #155724;`;
            case 'rejected':
                return `background: #f8d7da; color: #721c24;`;
            default:
                return `background: #e9ecef; color: #495057;`;
        }
    }}
`;

const TableContainer = styled.div`
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHead = styled.thead`
    background: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
`;

const Th = styled.th`
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #495057;
    font-size: 0.9rem;
    white-space: nowrap;
`;

const Td = styled.td`
    padding: 1rem;
    border-bottom: 1px solid #e9ecef;
    color: #666;
    font-size: 0.9rem;
`;

const Tr = styled.tr`
    &:hover {
        background: #f8f9fa;
    }
    
    &:last-child td {
        border-bottom: none;
    }
`;

const StatusBadge = styled.span`
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    ${props => {
        switch(props.status) {
            case 'Approved':
            case 'approved':
                return `background: #d4edda; color: #155724;`;
            case 'Pending':
            case 'pending':
                return `background: #fff3cd; color: #856404;`;
            case 'Rejected':
            case 'rejected':
                return `background: #f8d7da; color: #721c24;`;
            default:
                return `background: #e9ecef; color: #495057;`;
        }
    }}
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
`;

const Btn = styled.button`
    padding: 0.4rem 0.7rem;
    border: none;
    border-radius: 0.3rem;
    font-size: 0.85rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }

    ${props => props.approve && `background: #28a745;`}
    ${props => props.reject && `background: #dc3545;`}
    ${props => props.edit && `background: #007bff;`}
    ${props => props.delete && `background: #dc3545;`}
    ${props => props.post && `background: #17a2b8;`}
`;

const NotificationModal = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
`;

const NotificationModalContent = styled.div`
    background-color: #fefefe;
    margin: 5% auto;
    padding: 2rem;
    border: 1px solid #888;
    border-radius: 0.5rem;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const NotificationModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h2 {
        margin: 0;
        color: #333;
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    
    &:hover {
        color: #333;
    }
`;

const NotificationForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-weight: 500;
    color: #333;
`;

const Input = styled.input`
    padding: 0.7rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 1rem;
`;

const TextArea = styled.textarea`
    padding: 0.7rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 1rem;
    min-height: 200px;
    resize: vertical;
    font-family: inherit;
`;

const SubmitButton = styled.button`
    padding: 0.7rem 1.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 0.3rem;
    font-size: 1rem;
    cursor: pointer;
    align-self: flex-end;
    
    &:hover {
        background: #0056b3;
    }
`;

const PostedBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.4rem 0.7rem;
    background: #28a745;
    color: white;
    border-radius: 0.3rem;
    font-size: 0.85rem;
    font-weight: 500;
`;


const RecruitmentPlanPage = () => {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('pending'); // pending, approved, rejected
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationFormData, setNotificationFormData] = useState({ title: '', content: '', planID: null });
    const [postedPlans, setPostedPlans] = useState(new Set()); // Track which plans have been posted
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectingPlanId, setRejectingPlanId] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
    const [viewingRejectReason, setViewingRejectReason] = useState({ title: '', reason: '' });

    // Define roles first before using in useEffect
    const isAdmin = user?.role === 'ADMIN';
    const isRector = user?.role === 'RECTOR'; // Hiệu trưởng
    const isHR = user?.role === 'PERSONNEL_MANAGER'; // HR
    const isUM = user?.role === 'UNIT_MANAGER'; // Trưởng bộ phận
    const canCreatePlan = isUM; // Chỉ UM được tạo kế hoạch
    const canEditPlan = isUM; // Chỉ UM được sửa kế hoạch
    const canDeletePlan = isRector; // Chỉ Rector được xóa kế hoạch chờ duyệt
    const canPermanentDelete = isHR; // Chỉ HR mới được xóa vĩnh viễn
    const canApprovePlan = isRector; // Chỉ Rector được phê duyệt

    useEffect(() => {
        fetchPlans();
    }, []);

    useEffect(() => {
        // Check posted status for approved plans
        if (plans.length > 0 && isHR) {
            checkPostedStatus();
        }
    }, [plans, isHR]);

    const checkPostedStatus = async () => {
        const approvedPlans = plans.filter(p => (p.status || '').toLowerCase() === 'approved');
        const posted = new Set();
        
        for (const plan of approvedPlans) {
            const isPosted = await NotificationService.isPlanPosted(plan.planid);
            if (isPosted) {
                posted.add(plan.planid);
            }
        }
        
        setPostedPlans(posted);
    };

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const data = await PlansService.getAllPlans();
            setPlans(data);
            setError(null);
        } catch (err) {
            console.error('Error loading plans:', err);
            setError('Không thể tải danh sách kế hoạch');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPlan = () => {
        setEditingPlan(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data) => {
        try {
            if (editingPlan) {
                await PlansService.updatePlan(editingPlan.planid, data);
            } else {
                await PlansService.createPlan({
                    ...data,
                    createdBy: user?.username || 'unknown'
                });
            }
            await fetchPlans();
            setIsModalOpen(false);
            setEditingPlan(null);
        } catch (err) {
            console.error('Error saving plan:', err);
            alert('Không thể lưu kế hoạch. Vui lòng thử lại.');
        }
    };

    const handleDelete = async (planId) => {
        if (window.confirm('Bạn có chắc muốn xóa kế hoạch này?')) {
            try {
                await PlansService.deletePlan(planId);
                await fetchPlans();
            } catch (err) {
                console.error('Error deleting plan:', err);
                const errorMsg = err.response?.data?.error || 'Không thể xóa kế hoạch. Vui lòng thử lại.';
                alert(errorMsg);
            }
        }
    };

    const handleApprove = async (planId) => {
        if (window.confirm('Bạn có chắc muốn duyệt kế hoạch này?')) {
            try {
                await PlansService.approvePlan(planId);
                await fetchPlans();
                alert('Đã duyệt kế hoạch thành công!');
            } catch (err) {
                console.error('Error approving plan:', err);
                alert('Không thể duyệt kế hoạch. Vui lòng thử lại.');
            }
        }
    };

    const handleReject = async (planId) => {
        setRejectingPlanId(planId);
        setRejectReason('');
        setShowRejectModal(true);
    };

    const handleConfirmReject = async () => {
        if (!rejectReason.trim()) {
            alert('Vui lòng nhập lý do từ chối!');
            return;
        }
        try {
            await PlansService.rejectPlan(rejectingPlanId, rejectReason);
            await fetchPlans();
            setShowRejectModal(false);
            setRejectingPlanId(null);
            setRejectReason('');
            alert('Đã từ chối kế hoạch!');
        } catch (err) {
            console.error('Error rejecting plan:', err);
            alert('Không thể từ chối kế hoạch. Vui lòng thử lại.');
        }
    };

    const handleViewRejectReason = (plan) => {
        setViewingRejectReason({
            title: plan.title,
            reason: plan.rejectReason || 'Không có lý do cụ thể'
        });
        setShowRejectReasonModal(true);
    };

    const handlePermanentDelete = async (planId) => {
        if (window.confirm('⚠️ CẢNH BÁO: Xóa vĩnh viễn kế hoạch này khỏi hệ thống?\n\nHành động này KHÔNG THỂ HOÀN TÁC!')) {
            try {
                await PlansService.deletePlanPermanently(planId);
                await fetchPlans();
                alert('Đã xóa vĩnh viễn kế hoạch!');
            } catch (err) {
                console.error('Error permanently deleting plan:', err);
                const errorMsg = err.response?.data?.error || 'Không thể xóa kế hoạch. Vui lòng thử lại.';
                alert(errorMsg);
            }
        }
    };

    const filteredPlans = plans.filter(plan => {
        const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase());
        const planStatus = (plan.status || 'pending').toLowerCase();
        
        let matchesTab = false;
        if (activeTab === 'pending') {
            matchesTab = planStatus === 'pending';
        } else if (activeTab === 'approved') {
            matchesTab = planStatus === 'approved';
        } else if (activeTab === 'rejected') {
            matchesTab = planStatus === 'rejected';
        }
        
        return matchesSearch && matchesTab;
    });

    const pendingCount = plans.filter(p => (p.status || 'pending').toLowerCase() === 'pending').length;
    const approvedCount = plans.filter(p => (p.status || 'pending').toLowerCase() === 'approved').length;
    const rejectedCount = plans.filter(p => (p.status || 'pending').toLowerCase() === 'rejected').length;

    const handlePostNotification = (plan) => {
        // Tạo nội dung thông báo từ thông tin kế hoạch
        const notificationTitle = `Thông báo tuyển dụng: ${plan.title}`;
        const notificationContent = `
${plan.title}

Vị trí tuyển dụng: ${plan.position}
Đơn vị: ${plan.school}
Số lượng cần tuyển: ${plan.quantity} người
Yêu cầu về chuyên ngành: ${plan.cpa || 'Không yêu cầu'}

Mô tả công việc:
${plan.description || 'Vui lòng liên hệ để biết thêm chi tiết'}

Thời gian bắt đầu dự kiến: ${plan.creatDate ? new Date(plan.creatDate).toLocaleDateString('vi-VN') : 'Sớm nhất có thể'}

Ứng viên quan tâm vui lòng nộp hồ sơ theo hướng dẫn.
        `.trim();

        setNotificationFormData({
            title: notificationTitle,
            content: notificationContent,
            planID: plan.planid // Lưu planID
        });
        setShowNotificationModal(true);
    };

    const handleSubmitNotification = async (e) => {
        e.preventDefault();
        try {
            await NotificationService.createNotification(notificationFormData);
            alert('Đã đăng thông báo tuyển dụng thành công!');
            setShowNotificationModal(false);
            setNotificationFormData({ title: '', content: '', planID: null });
            // Cập nhật trạng thái đã đăng
            setPostedPlans(prev => new Set([...prev, notificationFormData.planID]));
        } catch (error) {
            console.error('Error creating notification:', error);
            const errorMsg = error.response?.data || 'Không thể đăng thông báo. Vui lòng thử lại.';
            alert(errorMsg);
        }
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

                <TabsContainer>
                    <Tab 
                        active={activeTab === 'pending'} 
                        onClick={() => setActiveTab('pending')}
                    >
                        Chờ duyệt
                        <TabBadge type="pending">{pendingCount}</TabBadge>
                    </Tab>
                    <Tab 
                        active={activeTab === 'approved'} 
                        onClick={() => setActiveTab('approved')}
                    >
                        Đã duyệt
                        <TabBadge type="approved">{approvedCount}</TabBadge>
                    </Tab>
                    <Tab 
                        active={activeTab === 'rejected'} 
                        onClick={() => setActiveTab('rejected')}
                    >
                        Từ chối
                        <TabBadge type="rejected">{rejectedCount}</TabBadge>
                    </Tab>
                </TabsContainer>

                {loading && <div>Đang tải...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {!loading && !error && plans.length === 0 && <div>Chưa có kế hoạch nào</div>}
                
                {!loading && !error && plans.length > 0 && (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <Tr>
                                    <Th>STT</Th>
                                    <Th>Tiêu đề</Th>
                                    <Th>Vị trí</Th>
                                    <Th>Khoa</Th>
                                    <Th>Số lượng</Th>
                                    <Th>CPA</Th>
                                    <Th>Trạng thái</Th>
                                    <Th>Ngày tạo</Th>
                                    <Th style={{ textAlign: 'center' }}>Hành động</Th>
                                </Tr>
                            </TableHead>
                            <tbody>
                                {filteredPlans.map((plan, index) => (
                                    <Tr key={plan.planid}>
                                        <Td>{index + 1}</Td>
                                        <Td><strong>{plan.title}</strong></Td>
                                        <Td>{plan.position}</Td>
                                        <Td>{plan.school}</Td>
                                        <Td>{plan.quantity}</Td>
                                        <Td>{plan.cpa}</Td>
                                        <Td>
                                            <StatusBadge status={plan.status || 'pending'}>
                                                {plan.status === 'Approved' || plan.status === 'approved' ? 'Đã duyệt' : 
                                                 plan.status === 'Pending' || plan.status === 'pending' ? 'Chờ duyệt' : 
                                                 plan.status === 'Rejected' || plan.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'}
                                            </StatusBadge>
                                        </Td>
                                        <Td>
                                            {plan.creatDate ? new Date(plan.creatDate).toLocaleDateString('vi-VN') : 'N/A'}
                                        </Td>
                                        <Td>
                                            <ActionButtons>
                                                {activeTab === 'approved' && isHR && (
                                                    postedPlans.has(plan.planid) ? (
                                                        <PostedBadge>
                                                            <FaBullhorn /> Đã đăng tin
                                                        </PostedBadge>
                                                    ) : (
                                                        <Btn post onClick={() => handlePostNotification(plan)}>
                                                            <FaBullhorn /> Đăng tin
                                                        </Btn>
                                                    )
                                                )}
                                                
                                                {activeTab === 'pending' && canApprovePlan && (
                                                    <>
                                                        <Btn approve onClick={() => handleApprove(plan.planid)}>
                                                            <FaCheck /> Duyệt
                                                        </Btn>
                                                        <Btn reject onClick={() => handleReject(plan.planid)}>
                                                            <FaTimes /> Từ chối
                                                        </Btn>
                                                    </>
                                                )}

                                                {activeTab === 'pending' && canEditPlan && (isAdmin || user?.username === plan.createdBy) && (
                                                    <Btn edit onClick={() => {
                                                        setEditingPlan(plan);
                                                        setIsModalOpen(true);
                                                    }}>
                                                        <FaEdit /> Sửa
                                                    </Btn>
                                                )}

                                                {activeTab === 'pending' && canDeletePlan && (
                                                    <Btn delete onClick={() => handleDelete(plan.planid)}>
                                                        <FaTrash /> Xóa
                                                    </Btn>
                                                )}
                                                
                                                {activeTab === 'rejected' && plan.rejectReason && (
                                                    <Btn edit onClick={() => handleViewRejectReason(plan)}>
                                                        <FaSearch /> Xem lý do
                                                    </Btn>
                                                )}
                                                
                                                {activeTab !== 'pending' && !canDeletePlan && !isHR && !plan.rejectReason && (
                                                    <span style={{ color: '#999', fontSize: '0.85rem' }}>-</span>
                                                )}
                                            </ActionButtons>
                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                )}

                <RecruitmentPlanModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialData={editingPlan}
                    onSubmit={handleSubmit}
                />

                <NotificationModal show={showNotificationModal}>
                    <NotificationModalContent>
                        <NotificationModalHeader>
                            <h2>Đăng thông báo tuyển dụng</h2>
                            <CloseButton onClick={() => setShowNotificationModal(false)}>
                                ×
                            </CloseButton>
                        </NotificationModalHeader>
                        <NotificationForm onSubmit={handleSubmitNotification}>
                            <FormGroup>
                                <Label>Tiêu đề *</Label>
                                <Input
                                    type="text"
                                    value={notificationFormData.title}
                                    onChange={(e) => setNotificationFormData({
                                        ...notificationFormData,
                                        title: e.target.value
                                    })}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Nội dung *</Label>
                                <TextArea
                                    value={notificationFormData.content}
                                    onChange={(e) => setNotificationFormData({
                                        ...notificationFormData,
                                        content: e.target.value
                                    })}
                                    required
                                />
                            </FormGroup>
                            <SubmitButton type="submit">Đăng thông báo</SubmitButton>
                        </NotificationForm>
                    </NotificationModalContent>
                </NotificationModal>

                {/* Modal nhập lý do từ chối */}
                <NotificationModal show={showRejectModal}>
                    <NotificationModalContent>
                        <NotificationModalHeader>
                            <h2>Từ chối kế hoạch</h2>
                            <CloseButton onClick={() => {
                                setShowRejectModal(false);
                                setRejectingPlanId(null);
                                setRejectReason('');
                            }}>
                                ×
                            </CloseButton>
                        </NotificationModalHeader>
                        <NotificationForm onSubmit={(e) => { e.preventDefault(); handleConfirmReject(); }}>
                            <FormGroup>
                                <Label>Lý do từ chối *</Label>
                                <TextArea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Nhập lý do từ chối kế hoạch tuyển dụng này..."
                                    required
                                    style={{ minHeight: '150px' }}
                                />
                            </FormGroup>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <SubmitButton type="button" onClick={() => {
                                    setShowRejectModal(false);
                                    setRejectingPlanId(null);
                                    setRejectReason('');
                                }} style={{ background: '#6c757d' }}>
                                    Hủy
                                </SubmitButton>
                                <SubmitButton type="submit" style={{ background: '#dc3545' }}>
                                    Xác nhận từ chối
                                </SubmitButton>
                            </div>
                        </NotificationForm>
                    </NotificationModalContent>
                </NotificationModal>

                {/* Modal xem lý do từ chối */}
                <NotificationModal show={showRejectReasonModal}>
                    <NotificationModalContent>
                        <NotificationModalHeader>
                            <h2>Lý do từ chối</h2>
                            <CloseButton onClick={() => setShowRejectReasonModal(false)}>
                                ×
                            </CloseButton>
                        </NotificationModalHeader>
                        <div style={{ padding: '1rem 0' }}>
                            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Kế hoạch: {viewingRejectReason.title}</p>
                            <div style={{ 
                                background: '#f8d7da', 
                                padding: '1rem', 
                                borderRadius: '0.5rem', 
                                border: '1px solid #f5c6cb',
                                color: '#721c24'
                            }}>
                                <strong>Lý do từ chối:</strong>
                                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{viewingRejectReason.reason}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <SubmitButton type="button" onClick={() => setShowRejectReasonModal(false)}>
                                Đóng
                            </SubmitButton>
                        </div>
                    </NotificationModalContent>
                </NotificationModal>
            </Container>
        </MainLayout>
    );
};

export default RecruitmentPlanPage;
