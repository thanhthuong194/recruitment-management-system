import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaUsers, FaClipboardList } from 'react-icons/fa';
import JobPostingService from '../services/JobPostingService';
import PublicLayout from '../layouts/PublicLayout';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    
    h1 {
        font-size: 2.5rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
    
    p {
        font-size: 1.1rem;
        color: #7f8c8d;
    }
`;

const JobsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
`;

const JobCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
    
    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        transform: translateY(-4px);
        border-color: #1877f2;
    }
`;

const JobTitle = styled.h2`
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
`;

const JobInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
    color: #555;
    font-size: 0.95rem;
    
    svg {
        color: #1877f2;
        flex-shrink: 0;
    }
`;

const Deadline = styled.div`
    display: inline-block;
    background: ${props => props.urgent ? '#ff4757' : '#ffa502'};
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 1rem;
`;

const ApplyButton = styled.button`
    width: 100%;
    padding: 0.8rem;
    background: #1877f2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1.5rem;
    transition: background 0.3s ease;
    
    &:hover {
        background: #0d6efd;
    }
`;

const NoJobs = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    color: #7f8c8d;
    font-size: 1.2rem;
`;

const Loading = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    font-size: 1.2rem;
    color: #555;
`;

const StatusBadge = styled.span`
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
    background: #d4edda;
    color: #155724;
    margin-bottom: 1rem;
`;

const PublicJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const data = await JobPostingService.getActiveJobPostings();
            setJobs(data);
        } catch (err) {
            console.error('Error loading jobs:', err);
            setError('Không thể tải danh sách tuyển dụng');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (jobId) => {
        navigate(`/apply/${jobId}`);
    };

    const isDeadlineUrgent = (deadline) => {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        return daysLeft <= 7;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('vi-VN');
    };

    if (loading) {
        return (
            <PublicLayout>
                <Container>
                    <Loading>Đang tải danh sách tuyển dụng...</Loading>
                </Container>
            </PublicLayout>
        );
    }

    if (error) {
        return (
            <PublicLayout>
                <Container>
                    <NoJobs>{error}</NoJobs>
                </Container>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Container>
                <Header>
                    <h1>Thông báo tuyển dụng</h1>
                    <p>Tìm kiếm cơ hội nghề nghiệp tại trường đại học của chúng tôi</p>
                </Header>

                {jobs.length === 0 ? (
                    <NoJobs>
                        Hiện tại chưa có thông báo tuyển dụng nào.
                        <br />
                        Vui lòng quay lại sau!
                    </NoJobs>
                ) : (
                    <JobsGrid>
                        {jobs.map(job => (
                            <JobCard key={job.postid} onClick={() => handleApply(job.postid)}>
                                <StatusBadge>{job.status}</StatusBadge>
                                <JobTitle>{job.title}</JobTitle>
                                
                                <JobInfo>
                                    <FaBriefcase />
                                    <span>Vị trí: {job.position}</span>
                                </JobInfo>
                                
                                <JobInfo>
                                    <FaMapMarkerAlt />
                                    <span>{job.school}</span>
                                </JobInfo>
                                
                                <JobInfo>
                                    <FaUsers />
                                    <span>Số lượng: {job.quantity} người</span>
                                </JobInfo>
                                
                                <JobInfo>
                                    <FaGraduationCap />
                                    <span>GPA yêu cầu: ≥ {job.requiredCpa}</span>
                                </JobInfo>
                                
                                <JobInfo>
                                    <FaCalendarAlt />
                                    <span>Đăng ngày: {formatDate(job.createdDate)}</span>
                                </JobInfo>
                                
                                <Deadline urgent={isDeadlineUrgent(job.deadline)}>
                                    <FaClipboardList style={{ marginRight: '0.5rem' }} />
                                    Hạn nộp: {formatDate(job.deadline)}
                                </Deadline>
                                
                                <ApplyButton onClick={(e) => {
                                    e.stopPropagation();
                                    handleApply(job.postid);
                                }}>
                                    Ứng tuyển ngay
                                </ApplyButton>
                            </JobCard>
                        ))}
                    </JobsGrid>
                )}
            </Container>
        </PublicLayout>
    );
};

export default PublicJobsPage;
