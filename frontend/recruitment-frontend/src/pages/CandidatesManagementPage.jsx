import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaTrash, FaSearch, FaFilter, FaDownload } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import CandidateService from '../services/CandidateService';
import ApplicationService from '../services/ApplicationService';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h1 {
        font-size: 2rem;
        color: #2c3e50;
    }
`;

const Controls = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const SearchBox = styled.div`
    position: relative;
    flex: 1;
    min-width: 300px;
    
    input {
        width: 100%;
        padding: 0.8rem 2.5rem 0.8rem 1rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        
        &:focus {
            outline: none;
            border-color: #1877f2;
        }
    }
    
    svg {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #7f8c8d;
    }
`;

const FilterSelect = styled.select`
    padding: 0.8rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    
    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

const StatCard = styled.div`
    background: ${props => props.color || '#1877f2'};
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    
    h3 {
        font-size: 2rem;
        margin: 0;
    }
    
    p {
        margin: 0.5rem 0 0 0;
        opacity: 0.9;
    }
`;

const TableContainer = styled.div`
    background: white;
    border-radius: 8px;
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
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 2px solid #e0e0e0;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
    &:hover {
        background: #f8f9fa;
    }
    
    &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }
`;

const Td = styled.td`
    padding: 1rem;
    color: #555;
`;

const StatusBadge = styled.span`
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
    ${props => {
        switch(props.status?.toLowerCase()) {
            case 'đang xét':
            case 'pending':
                return `background: #fff3cd; color: #856404;`;
            case 'đã duyệt':
            case 'approved':
                return `background: #d4edda; color: #155724;`;
            case 'từ chối':
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
`;

const IconButton = styled.button`
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${props => props.view && `
        background: #e3f2fd;
        color: #1976d2;
        &:hover { background: #bbdefb; }
    `}
    
    ${props => props.download && `
        background: #e8f5e9;
        color: #388e3c;
        &:hover { background: #c8e6c9; }
    `}
    
    ${props => props.delete && `
        background: #ffebee;
        color: #c62828;
        &:hover { background: #ffcdd2; }
    `}
`;

const StatusSelect = styled.select`
    padding: 0.3rem 0.6rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    
    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const Loading = styled.div`
    text-align: center;
    padding: 3rem;
    color: #7f8c8d;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 3rem;
    color: #7f8c8d;
`;

const Modal = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`;

const ModalContent = styled.div`
    background-color: white;
    margin: 5% auto;
    padding: 2rem;
    border-radius: 8px;
    width: 80%;
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h2 {
        margin: 0;
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

const DetailRow = styled.div`
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    
    strong {
        color: #2c3e50;
    }
    
    span {
        color: #555;
    }
`;

const CandidatesManagementPage = () => {
    const { user } = useContext(AuthContext);
    const [candidates, setCandidates] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const isAdmin = user?.role === 'ADMIN';
    const isHR = user?.role === 'PERSONNEL_MANAGER';
    const isRector = user?.role === 'RECTOR';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [candidatesData, applicationsData] = await Promise.all([
                CandidateService.getAllCandidates(),
                ApplicationService.getAllApplications()
            ]);
            setCandidates(candidatesData);
            setApplications(applicationsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const handleDelete = async (candidateId) => {
        if (!isAdmin) {
            alert('Chỉ Admin mới có quyền xóa ứng viên');
            return;
        }

        if (window.confirm('Bạn có chắc muốn xóa ứng viên này?')) {
            try {
                await CandidateService.deleteCandidate(candidateId);
                await fetchData();
                alert('Đã xóa ứng viên thành công');
            } catch (error) {
                console.error('Error deleting candidate:', error);
                alert('Không thể xóa ứng viên. Vui lòng thử lại.');
            }
        }
    };

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await ApplicationService.updateApplicationStatus(applicationId, newStatus);
            await fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Không thể cập nhật trạng thái. Vui lòng thử lại.');
        }
    };

    const handleDownloadCV = (cvPath) => {
        if (!cvPath) {
            alert('Không tìm thấy CV');
            return;
        }
        // Extract filename from path and use the download endpoint
        const fileName = cvPath.split('/').pop();
        const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
        // Remove /api from base URL if present, then add the download endpoint
        const apiBase = baseUrl.replace('/api', '');
        window.open(`${apiBase}/api/files/download/${fileName}`, '_blank');
    };

    // Merge candidates with applications
    const mergedData = candidates.map(candidate => {
        const candidateApplications = applications.filter(
            app => app.candidate?.candidateID === candidate.candidateID
        );
        return {
            ...candidate,
            applications: candidateApplications,
            latestApplication: candidateApplications[0] || null
        };
    });

    // Filter data
    const filteredData = mergedData.filter(item => {
        const matchesSearch = 
            item.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone?.includes(searchQuery) ||
            item.position?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || 
            item.latestApplication?.status?.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    // Calculate stats
    const stats = {
        total: candidates.length,
        pending: applications.filter(app => app.status?.toLowerCase() === 'đang xét').length,
        approved: applications.filter(app => app.status?.toLowerCase() === 'đã duyệt').length,
        rejected: applications.filter(app => app.status?.toLowerCase() === 'từ chối').length
    };

    if (loading) {
        return (
            <MainLayout>
                <Container>
                    <Loading>Đang tải dữ liệu...</Loading>
                </Container>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Container>
                <Header>
                    <h1>Quản lý hồ sơ ứng viên</h1>
                </Header>

                <Stats>
                    <StatCard color="#1877f2">
                        <h3>{stats.total}</h3>
                        <p>Tổng ứng viên</p>
                    </StatCard>
                    <StatCard color="#ffa502">
                        <h3>{stats.pending}</h3>
                        <p>Đang xét</p>
                    </StatCard>
                    <StatCard color="#28a745">
                        <h3>{stats.approved}</h3>
                        <p>Đã duyệt</p>
                    </StatCard>
                    <StatCard color="#dc3545">
                        <h3>{stats.rejected}</h3>
                        <p>Từ chối</p>
                    </StatCard>
                </Stats>

                <Controls>
                    <SearchBox>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, SĐT, vị trí..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch />
                    </SearchBox>
                    
                    <FilterSelect 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="đang xét">Đang xét</option>
                        <option value="đã duyệt">Đã duyệt</option>
                        <option value="từ chối">Từ chối</option>
                    </FilterSelect>
                </Controls>

                <TableContainer>
                    {filteredData.length === 0 ? (
                        <EmptyState>
                            Không tìm thấy ứng viên nào
                        </EmptyState>
                    ) : (
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Họ tên</Th>
                                    <Th>Email</Th>
                                    <Th>SĐT</Th>
                                    <Th>Vị trí</Th>
                                    <Th>GPA</Th>
                                    <Th>Ngày nộp</Th>
                                    <Th>Trạng thái</Th>
                                    <Th>Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredData.map(candidate => (
                                    <Tr key={candidate.candidateID}>
                                        <Td>{candidate.fullName}</Td>
                                        <Td>{candidate.email}</Td>
                                        <Td>{candidate.phone}</Td>
                                        <Td>{candidate.position}</Td>
                                        <Td>{candidate.cpa}</Td>
                                        <Td>
                                            {candidate.latestApplication?.applyDate 
                                                ? new Date(candidate.latestApplication.applyDate).toLocaleDateString('vi-VN')
                                                : '-'
                                            }
                                        </Td>
                                        <Td>
                                            {candidate.latestApplication ? (
                                                <StatusSelect
                                                    value={candidate.latestApplication.status}
                                                    onChange={(e) => handleStatusChange(
                                                        candidate.latestApplication.applicationID,
                                                        e.target.value
                                                    )}
                                                    disabled={!isHR && !isRector && !isAdmin}
                                                >
                                                    <option value="Đang xét">Đang xét</option>
                                                    <option value="Đã duyệt">Đã duyệt</option>
                                                    <option value="Từ chối">Từ chối</option>
                                                </StatusSelect>
                                            ) : (
                                                <StatusBadge status="pending">Chưa nộp</StatusBadge>
                                            )}
                                        </Td>
                                        <Td>
                                            <ActionButtons>
                                                <IconButton 
                                                    view 
                                                    onClick={() => handleViewDetails(candidate)}
                                                    title="Xem chi tiết"
                                                >
                                                    <FaEye />
                                                </IconButton>
                                                <IconButton 
                                                    download 
                                                    onClick={() => handleDownloadCV(candidate.cvPath)}
                                                    title="Tải CV"
                                                >
                                                    <FaDownload />
                                                </IconButton>
                                                {isAdmin && (
                                                    <IconButton 
                                                        delete 
                                                        onClick={() => handleDelete(candidate.candidateID)}
                                                        title="Xóa"
                                                    >
                                                        <FaTrash />
                                                    </IconButton>
                                                )}
                                            </ActionButtons>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </TableContainer>

                <Modal show={showModal} onClick={() => setShowModal(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <h2>Chi tiết ứng viên</h2>
                            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
                        </ModalHeader>
                        
                        {selectedCandidate && (
                            <div>
                                <DetailRow>
                                    <strong>Họ tên:</strong>
                                    <span>{selectedCandidate.fullName}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>Ngày sinh:</strong>
                                    <span>{new Date(selectedCandidate.dateOfBirth).toLocaleDateString('vi-VN')}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>Giới tính:</strong>
                                    <span>{selectedCandidate.sex}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>Email:</strong>
                                    <span>{selectedCandidate.email}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>Số điện thoại:</strong>
                                    <span>{selectedCandidate.phone}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>Địa chỉ:</strong>
                                    <span>{selectedCandidate.address}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>Vị trí ứng tuyển:</strong>
                                    <span>{selectedCandidate.position}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>Khoa/Bộ môn:</strong>
                                    <span>{selectedCandidate.department}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>GPA/CPA:</strong>
                                    <span>{selectedCandidate.cpa}</span>
                                </DetailRow>
                                <DetailRow>
                                    <strong>CV:</strong>
                                    <span>
                                        <IconButton 
                                            download 
                                            onClick={() => handleDownloadCV(selectedCandidate.cvPath)}
                                        >
                                            <FaDownload /> Tải xuống
                                        </IconButton>
                                    </span>
                                </DetailRow>
                            </div>
                        )}
                    </ModalContent>
                </Modal>
            </Container>
        </MainLayout>
    );
};

export default CandidatesManagementPage;
