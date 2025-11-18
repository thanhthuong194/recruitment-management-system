import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBullhorn } from 'react-icons/fa';
import PublicLayout from '../layouts/PublicLayout';
import NotificationService from '../services/NotificationService';

const Container = styled.div`
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0;
    min-height: 60vh;
`;

const PageHeader = styled.div`
    text-align: center;
    margin-bottom: 3rem;
`;

const Title = styled.h1`
    font-size: 2.2rem;
    color: #1877f2;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
    font-size: 1.1rem;
    color: #666;
`;

const NotificationsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const NotificationCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-left: 5px solid #1877f2;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
    font-weight: 600;
`;

const CardContent = styled.div`
    color: #555;
    line-height: 1.8;
    font-size: 1rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
`;

const CardMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
    font-size: 0.9rem;
    color: #999;
`;

const MetaItem = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 3rem;
    font-size: 1.1rem;
    color: #666;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 1rem;
`;

const EmptyText = styled.p`
    font-size: 1.2rem;
    color: #999;
    font-style: italic;
`;

const PublicNotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const data = await NotificationService.getPublicNotifications();
            setNotifications(data);
        } catch (error) {
            console.error('Error loading notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PublicLayout>
            <Container>
                <PageHeader>
                    <Title>
                        <FaBullhorn />
                        Thông báo tuyển dụng
                    </Title>
                    <Subtitle>
                        Cập nhật các thông tin tuyển dụng mới nhất từ Trường Đại học Sư phạm Kỹ thuật TP.HCM
                    </Subtitle>
                </PageHeader>

                {loading && (
                    <LoadingMessage>Đang tải thông báo...</LoadingMessage>
                )}

                {!loading && notifications.length === 0 && (
                    <EmptyMessage>
                        <EmptyIcon>
                            <FaBullhorn />
                        </EmptyIcon>
                        <EmptyText>Hiện tại chưa có thông báo tuyển dụng mới</EmptyText>
                    </EmptyMessage>
                )}

                {!loading && notifications.length > 0 && (
                    <NotificationsList>
                        {notifications.map(notification => (
                            <NotificationCard key={notification.id}>
                                <CardTitle>{notification.title}</CardTitle>
                                <CardContent>{notification.content}</CardContent>
                                <CardMeta>
                                    <MetaItem>
                                        📅 {new Date(notification.createdDate).toLocaleDateString('vi-VN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </MetaItem>
                                    <MetaItem>
                                        🕒 {new Date(notification.createdDate).toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </MetaItem>
                                </CardMeta>
                            </NotificationCard>
                        ))}
                    </NotificationsList>
                )}
            </Container>
        </PublicLayout>
    );
};

export default PublicNotificationsPage;
