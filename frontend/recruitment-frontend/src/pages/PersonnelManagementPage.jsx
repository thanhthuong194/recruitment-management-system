import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
    margin-bottom: 2rem; /* mb-8 */
    padding-bottom: 1rem; /* pb-4 */
    border-bottom: 1px solid #e5e7eb; /* border-b */
`;

const Title = styled.h1`
    font-size: 1.875rem; /* text-3xl */
    font-weight: 800; /* font-extrabold */
    color: #111827; /* text-gray-900 */
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem; /* space-x-2 */
    padding: 0.5rem 1rem; /* px-4 py-2 */
    background-color: #3b82f6; /* bg-blue-500 */
    color: white;
    border-radius: 0.5rem; /* rounded-lg */
    transition: background-color 0.15s ease-in-out;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    cursor: pointer;
    border: none;

    &:hover {
        background-color: #2563eb; /* hover:bg-blue-600 */
    }

    svg {
        width: 1.25rem; /* w-5 */
        height: 1.25rem; /* h-5 */
    }
`;

const TabNavigation = styled.div`
    margin-bottom: 1.5rem; /* mb-6 */
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
`;

const TabButton = styled.button`
    padding: 0.75rem 1.5rem; /* px-6 py-3 */
    font-size: 0.875rem; /* text-sm */
    font-weight: 500; /* font-medium */
    line-height: 1.25rem; /* leading-5 */
    transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    border: none;
    background: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;

    ${props => props.$active ? `
        color: #2563eb; /* text-blue-600 */
        border-bottom-color: #2563eb; /* border-blue-600 */
    ` : `
        color: #4b5563; /* text-gray-600 */
        &:hover {
            color: #2563eb; /* hover:text-blue-600 */
            border-bottom-color: #93c5fd; /* hover:border-blue-300 */
        }
    `}
`;

const ContentContainer = styled.div`
    background: white;
    padding: 1rem; /* p-4 */
    @media (min-width: 768px) {
        padding: 2rem;
    }
    border-radius: 0.75rem; /* rounded-xl */
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    min-height: 80vh;
`;

const SubTitle = styled.h3`
    font-size: 1.5rem; /* text-2xl */
    font-weight: 600; /* font-semibold */
    margin-bottom: 1rem; /* mb-4 */
    color: #1f2937; /* text-gray-800 */
`;

const TableWrapper = styled.div`
    overflow-x: auto;
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (max-width: 767px) {
        display: none; /* Ẩn trên mobile */
    }
`;

const StyledTable = styled.table`
    min-width: 100%;
    border-collapse: collapse;
    background-color: white;

    thead {
        background-color: #f9fafb; /* bg-gray-50 */
    }

    th, td {
        padding: 0.75rem 1.5rem;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }

    th {
        font-size: 0.75rem; /* text-xs */
        font-weight: 500; /* font-medium */
        color: #6b7280; /* text-gray-500 */
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    td {
        font-size: 0.875rem; /* text-sm */
        color: #1f2937;
        white-space: nowrap;
    }

    tbody tr:hover {
        background-color: #eff6ff; /* hover:bg-blue-50 */
        transition: background-color 0.1s ease-in-out;
    }
`;

const MobileCardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;

    @media (min-width: 768px) {
        display: none; /* Ẩn trên desktop */
    }
`;

const MobileCard = styled.div`
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border-left: 4px solid #3b82f6; /* border-blue-500 */

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.25rem;
    }

    h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }

    p { margin-bottom: 0.25rem; }
`;

const CandidateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
`;

const CandidateCard = styled.div`
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-left: 4px solid #f59e0b; /* border-yellow-500 */
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .position-tag {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #b45309; /* text-yellow-600 */
        background-color: #fef3c7; /* bg-yellow-100 */
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
    }

    .id-text {
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
    }

    h4 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1f2937;
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
    }

    .date-text {
        font-size: 0.875rem;
        color: #4b5563;
        margin-bottom: 0.75rem;
    }

    .status-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }

    .status-icon {
        width: 1rem;
        height: 1rem;
        color: #22c55e;
    }

    .status-text {
        font-weight: 500;
    }

    .status-divider {
        color: #9ca3af;
    }

    .detail-text {
        color: #4b5563;
    }

    .manage-button {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
        color: #3b82f6;
        &:hover { color: #2563eb; }
        font-size: 0.875rem;
        font-weight: 600;
        border-top: 1px solid #e5e7eb;
        padding-top: 0.75rem;
        background: none;
        border: none;
        cursor: pointer;
    }
`;

// --- Mock Data ---
const personnelData = {
    admin: [
        { id: 'AD001', name: 'Nguyễn Văn An', email: 'an.nv@hr.com', phone: '0901xxxxxx', role: 'Quản trị viên Hệ thống' },
        { id: 'AD002', name: 'Phạm Thị Thúy', email: 'thuy.pt@hr.com', phone: '0903xxxxxx', role: 'Quản trị viên Tài khoản' }
    ],
    manager: [
        { id: 'MG001', name: 'Trần Thị Bình', department: 'Tuyển dụng', email: 'binh.tt@hr.com', phone: '0902xxxxxx', role: 'Trưởng phòng' },
        { id: 'MG002', name: 'Lê Văn Chính', department: 'Đào tạo', email: 'chinh.lv@hr.com', phone: '0904xxxxxx', role: 'Phó phòng' },
        { id: 'MG003', name: 'Võ Thanh Đạt', department: 'Kỹ thuật', email: 'dat.vt@hr.com', phone: '0905xxxxxx', role: 'Trưởng nhóm' }
    ],
    candidates: [
        { id: 'C001', name: 'Huỳnh Văn Giang', position: 'Frontend Dev', status: 'Đã phỏng vấn', date: '2024-10-25', detail: 'Vòng 2' },
        { id: 'C002', name: 'Đặng Thị Hòa', position: 'Backend Dev', status: 'Chờ phỏng vấn', date: '2024-10-28', detail: 'Vòng 1' },
        { id: 'C003', name: 'Kiều Minh Khoa', position: 'Data Analyst', status: 'Đã tuyển', date: '2024-10-20', detail: 'Báo cáo thử việc' }
    ]
};

const PersonnelManagementPage = () => {
    const navigate = useNavigate();
    const [currentCategory, setCurrentCategory] = useState('admin');

    const data = personnelData[currentCategory];
    const isManager = currentCategory === 'manager';
    const roleOrDeptHeader = isManager ? 'PHÒNG/BAN' : 'VAI TRÒ';

    return (
        <MainLayout>
            <Container>
                <ContentContainer>
                    <PageHeader>
                        <Title>Quản Lý Nhân Sự Toàn Diện</Title>
                        <BackButton onClick={() => navigate('/home')}>
                            <FaArrowLeft />
                            <span>Quay lại Dashboard</span>
                        </BackButton>
                    </PageHeader>

                    <TabNavigation>
                        <TabButton $active={currentCategory === 'admin'} onClick={() => setCurrentCategory('admin')}>Admin</TabButton>
                        <TabButton $active={currentCategory === 'manager'} onClick={() => setCurrentCategory('manager')}>Quản Lý</TabButton>
                        <TabButton $active={currentCategory === 'candidates'} onClick={() => setCurrentCategory('candidates')}>Ứng Viên</TabButton>
                    </TabNavigation>

                    {(currentCategory === 'admin' || currentCategory === 'manager') && (
                        <>
                            <SubTitle>Danh sách {isManager ? 'Cán bộ Quản lý' : 'Quản trị viên'} ({data.length} người)</SubTitle>
                            <TableWrapper>
                                <StyledTable>
                                    <thead>
                                        <tr>
                                            <th>ID</th><th>HỌ & TÊN</th><th>EMAIL</th><th>ĐIỆN THOẠI</th><th>{roleOrDeptHeader}</th><th style={{textAlign: 'center'}}>HÀNH ĐỘNG</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td><td>{item.name}</td><td>{item.email}</td><td>{item.phone}</td><td>{isManager ? item.department : item.role}</td>
                                                <td style={{textAlign: 'center'}}><button onClick={() => alert(`Chi tiết ${item.name}`)} style={{color: '#6d28d9', fontWeight: '600', cursor: 'pointer', background: 'none', border: 'none'}}>Xem</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </StyledTable>
                            </TableWrapper>

                            <MobileCardGrid>
                                {data.map(item => (
                                    <MobileCard key={item.id}>
                                        <div className="card-header">
                                            <h4>{item.name}</h4>
                                            <span className="id-text">{item.id}</span>
                                        </div>
                                        <p style={{fontSize: '0.875rem', color: '#374151'}}><strong>{roleOrDeptHeader}:</strong> {isManager ? item.department : item.role}</p>
                                        <p style={{fontSize: '0.875rem', color: '#2563eb'}}><strong>Email:</strong> {item.email}</p>
                                        <button onClick={() => alert(`Chi tiết ${item.name}`)} className="manage-button">
                                            Xem Chi tiết
                                        </button>
                                    </MobileCard>
                                ))}
                            </MobileCardGrid>
                        </>
                    )}

                    {currentCategory === 'candidates' && (
                        <>
                            <SubTitle>Danh sách Ứng viên ({data.length} người)</SubTitle>
                            <CandidateGrid>
                                {data.map(candidate => (
                                    <CandidateCard key={candidate.id}>
                                        <div className="header">
                                            <span className="position-tag">{candidate.position}</span>
                                            <span className="id-text">{candidate.id}</span>
                                        </div>
                                        <h4>{candidate.name}</h4>
                                        <p className="date-text">Ngày nộp: {candidate.date}</p>
                                        <div className="status-info">
                                            <FaCheckCircle className="status-icon" />
                                            <span className="status-text" style={{color: candidate.status.includes('tuyển') ? '#16a34a' : '#f97316'}}>{candidate.status}</span>
                                            <span className="status-divider">|</span>
                                            <span className="detail-text">{candidate.detail}</span>
                                        </div>
                                        <button onClick={() => alert(`Sửa thông tin ${candidate.name}`)} className="manage-button">
                                            Quản lý Hồ sơ
                                        </button>
                                    </CandidateCard>
                                ))}
                            </CandidateGrid>
                        </>
                    )}
                </ContentContainer>
            </Container>
        </MainLayout>
    );
};

export default PersonnelManagementPage;