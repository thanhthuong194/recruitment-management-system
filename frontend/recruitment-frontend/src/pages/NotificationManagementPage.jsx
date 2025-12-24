import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaBullhorn, FaTrash } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import NotificationService from '../services/NotificationService';

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
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

const NotificationsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const NotificationCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-left: 4px solid ${props => props.active ? '#28a745' : '#dc3545'};
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
    font-size: 1.2rem;
    color: #333;
    margin: 0;
    flex: 1;
`;

const CardActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const IconButton = styled.button`
    padding: 0.5rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: background 0.2s;
    background: ${props => props.delete ? '#dc3545' : '#007bff'};
    color: white;

    &:hover {
        opacity: 0.8;
    }
`;

const CardContent = styled.p`
    color: #666;
    line-height: 1.6;
    margin-bottom: 0.5rem;
`;

const CardMeta = styled.div`
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #999;
`;

const StatusBadge = styled.span`
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    background: ${props => props.active ? '#d4edda' : '#f8d7da'};
    color: ${props => props.active ? '#155724' : '#721c24'};
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 600px;
`;

const ModalTitle = styled.h3`
    margin-bottom: 1.5rem;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 0.7rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const TextArea = styled.textarea`
    padding: 0.7rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 1rem;
    min-height: 150px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #1877f2;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const Button = styled.button`
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 0.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }

    ${props => props.primary && `
        background: #1877f2;
        color: white;
    `}

    ${props => props.secondary && `
        background: #6c757d;
        color: white;
    `}
`;

const NotificationManagementPage = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const isHR = user?.role === 'PERSONNEL_MANAGER';

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const data = await NotificationService.getAllNotifications();
            setNotifications(data);
        } catch (error) {
            console.error('Error loading notifications:', error);
            alert('Không thể tải danh sách thông báo');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa thông báo này?')) {
            try {
                await NotificationService.deleteNotification(id);
                alert('Đã xóa thông báo!');
                fetchNotifications();
            } catch (error) {
                console.error('Error deleting notification:', error);
                alert('Không thể xóa thông báo. Vui lòng thử lại.');
            }
        }
    };

    return (
        <MainLayout>
            <Container>
                <PageHeader>
                    <Title>
                        <FaBullhorn />
                        Quản lý thông báo tuyển dụng
                    </Title>
                </PageHeader>

                {loading && <div>Đang tải...</div>}

                {!loading && notifications.length === 0 && (
                    <div>Chưa có thông báo nào</div>
                )}

                {!loading && notifications.length > 0 && (
                    <NotificationsList>
                        {notifications.map(notification => (
                            <NotificationCard key={notification.id} active={notification.isActive}>
                                <CardHeader>
                                    <CardTitle>{notification.title}</CardTitle>
                                    {isHR && (
                                        <CardActions>
                                            <IconButton delete onClick={() => handleDelete(notification.id)}>
                                                <FaTrash />
                                            </IconButton>
                                        </CardActions>
                                    )}
                                </CardHeader>
                                <CardContent>{notification.content}</CardContent>
                                <CardMeta>
                                    <span>Đăng bởi: {notification.createdBy}</span>
                                    <span>
                                        {new Date(notification.createdDate).toLocaleDateString('vi-VN')}
                                    </span>
                                    <StatusBadge active={notification.isActive}>
                                        {notification.isActive ? 'Đang hiển thị' : 'Đã ẩn'}
                                    </StatusBadge>
                                </CardMeta>
                            </NotificationCard>
                        ))}
                    </NotificationsList>
                )}


            </Container>
        </MainLayout>
    );
};

export default NotificationManagementPage;
