CREATE TABLE recruitment_notifications (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    content NVARCHAR(MAX),
    created_date DATETIME2 NOT NULL,
    is_active BIT NOT NULL DEFAULT 1,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(userid)
);
