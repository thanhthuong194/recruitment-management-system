import React, { useContext } from 'react'; 
import styled from 'styled-components';
import { FaUserFriends, FaRegCalendarAlt, FaChartLine, FaCogs } from 'react-icons/fa'; 
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
                    <h3>Hi bro, {userName}! 👋</h3>
                    <p>Chào mừng bạn đã đăng nhập vào hệ thống Quản lý Tổ chức Hành chính của Trường Đại học Sư phạm Kỹ thuật TP.HCM.</p>
                </WelcomeMessage>

                <SectionTitle>Danh Mục Chức Năng Chính</SectionTitle>
                
                <FunctionGrid>
                    <FunctionItem>
                        <FaUserFriends size={36} />
                        <h4>Quản lý Nhân sự</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Thêm, sửa, xóa, tra cứu thông tin nhân viên.</p>
                    </FunctionItem>
                    
                    <FunctionItem>
                        <FaCogs size={36} />
                        <h4>Quản lý Tài sản</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Theo dõi, kiểm kê và phân bổ tài sản cố định.</p>
                    </FunctionItem>
                    
                    <FunctionItem>
                        <FaRegCalendarAlt size={36} />
                        <h4>Lịch Công tác</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Xem và duyệt lịch công tác, nghỉ phép của phòng ban.</p>
                    </FunctionItem>
                    
                    <FunctionItem>
                        <FaChartLine size={36} />
                        <h4>Báo cáo & Thống kê</h4>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Xem các báo cáo hoạt động và thống kê hiệu suất.</p>
                    </FunctionItem>
                </FunctionGrid>

            </Container>
        </MainLayout>
    );
};

export default HomePage;