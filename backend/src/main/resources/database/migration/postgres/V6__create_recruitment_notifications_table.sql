-- Create recruitment_notifications table for HR announcements
CREATE TABLE IF NOT EXISTS recruitment_notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_date TIMESTAMP NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by INTEGER,
    CONSTRAINT fk_recruitment_notifications_created_by 
        FOREIGN KEY (created_by) REFERENCES users(userid)
);

-- Create index for faster queries
CREATE INDEX idx_recruitment_notifications_active ON recruitment_notifications(is_active);
CREATE INDEX idx_recruitment_notifications_created_date ON recruitment_notifications(created_date DESC);
