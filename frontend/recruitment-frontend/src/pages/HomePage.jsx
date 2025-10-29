import React, { useContext } from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
    FaUserFriends, 
    FaClipboardCheck, 
    FaBullhorn,
    FaUser,
    FaIdCard,
    FaCalendarAlt } from 'react-icons/fa'; 
import MainLayout from '../layouts/MainLayout'; 
import { AuthContext } from '../context/AuthContext'; 

const Container = styled.div`
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0rem 0;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    color: #3080c9;
    margin-bottom: 1rem;
    font-weight: 600;
`;

const DashboardCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 0.6rem;
    box-shadow: 0 0.2rem 0.7rem rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
`;

const WelcomeMessage = styled(DashboardCard)`
    border-left: 5px solid #4ac4d3;
    h3 {
        color: #3080c9;
        font-size: 1.5rem;
        margin-bottom: 0.6rem;
    }
    p {
        color: #555;
        line-height: 1.6;
    }
`;

const FunctionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

const FunctionItem = styled(DashboardCard)`
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    border-bottom: 5px solid #1877f2;
    text-decoration: none;
    p {
        text-decoration: none;
    }
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    
    svg {
        color: #1877f2;
        margin-bottom: 10px;
    }
    
    h4 {
        font-size: 1.1rem;
        color: #333;
    }
`;


const HomePage = () => {
    const { user } = useContext(AuthContext); 
    const userName = user?.name || user?.username || "Người dùng";
    
    return (
        <MainLayout>
            <Container>
                <WelcomeMessage>
                    <h3>Hi! Welcome, {userName}! 👋</h3>
                    <p>Chào mừng bạn đã đăng nhập vào hệ thống Quản lý Tuyển dụng của Trường Đại học Sư phạm Kỹ thuật TP.HCM.</p>
                </WelcomeMessage>

                <SectionTitle>Danh Mục Chức Năng Chính</SectionTitle>
                
                <FunctionGrid>
                    <FunctionItem as={Link} to="/recruitment/plan">
                        <FaCalendarAlt size={36} />
                        <h4>Lập kế hoạch tuyển dụng</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Đề xuất và phê duyệt nhu cầu tuyển dụng của đơn vị.</p>
                    </FunctionItem>
                    
                    <FunctionItem>
                        <FaBullhorn size={36} />
                        <h4>Thông báo kế hoạch tuyển dụng</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Đăng tải các thông báo và tin tuyển dụng chính thức.</p>
                    </FunctionItem>
                    
                    <FunctionItem>
                        <FaIdCard size={36} />
                        <h4>Hồ sơ</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Hồ sơ của ứng viên ứng tuyển.</p>
                    </FunctionItem>
                    
                    <FunctionItem>
                        <FaClipboardCheck size={36} />
                        <h4>Kết quả</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Tổng hợp kết quả tuyển dụng.</p>
                    </FunctionItem>

                    <FunctionItem>
                        <FaUserFriends size={36} />
                        <h4>Quản lý nhân sự</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Thêm, sửa, xóa, tra cứu thông tin nhân viên.</p>
                    </FunctionItem>

                    <FunctionItem as={Link} to="/profile">
                        <FaUser size={36} />
                        <h4>Cá nhân</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Thông tin và hồ sơ cá nhân.</p>
                    </FunctionItem>
                </FunctionGrid>

            </Container>
        </MainLayout>
    );
};

export default HomePage;