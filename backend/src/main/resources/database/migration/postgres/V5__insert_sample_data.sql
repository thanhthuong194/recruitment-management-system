-- Insert sample data for testing
-- Note: ADMIN, RECTOR, PERSONNEL_MANAGER are created in other migrations
-- This file only creates sample UNIT_MANAGER and demo data

INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1985-06-22', 'Nam', '0909876543', 'UNIT_MANAGER', 'unit1', 'unit1@university.edu', 'Trần Minh Bảo', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', 'Hà Nội');

-- Insert corresponding record in unit_managers table
INSERT INTO unit_managers (userid, department, position)
SELECT userid, 'Khoa Kinh tế', 'Trưởng khoa'
FROM users 
WHERE username = 'unit1';

-- Get the first UNIT_MANAGER for demo data
INSERT INTO recruitment_plan (approv_date, approved_by, cpa, creat_date, created_by, quantity, status, title, position, school)
SELECT 
    '2025-01-10'::DATE,
    (SELECT userid FROM rector LIMIT 1),
    2.5,
    '2025-01-01'::DATE,
    (SELECT userid FROM unit_managers LIMIT 1),
    3,
    'Approved',
    'Kế hoạch tuyển dụng 2025',
    'Giảng viên CNTT',
    'ĐH Bách Khoa';

-- Insert job position for the plan
INSERT INTO job_positions (planid, position, title)
VALUES (1, 'Giảng viên CNTT', 'Lập trình Java');

-- Insert sample candidates
INSERT INTO candidates (cpa, date_of_birth, sex, phone, department, email, full_name, position, address, cv_path)
VALUES
(3.4, '2000-05-10', 'Nam', '0911222333', 'CNTT', 'candidate1@gmail.com', 'Nguyen D', 'Giảng viên CNTT', 'Hải Phòng', '/cv/nguyend.pdf'),
(3.6, '1999-08-20', 'Nữ', '0911777888', 'CNTT', 'candidate2@gmail.com', 'Tran E', 'Giảng viên CNTT', 'Hà Nội', '/cv/trane.pdf');

-- Insert applications
INSERT INTO applications (apply_date, candidateid, positionid, status)
VALUES
('2025-02-15', 1, 1, 'Đang xét'),
('2025-02-16', 2, 1, 'Đã duyệt');

-- Insert recruitment results
INSERT INTO recruitment_results (planid, final_decision)
VALUES (1, 'Đã tuyển');

-- Insert job posting
INSERT INTO job_postings (created_by, created_date, deadline, planid, status, title)
VALUES (
    (SELECT userid FROM personnel_manager LIMIT 1),
    '2025-01-02',
    '2025-03-01',
    1,
    'Đang mở',
    'Tuyển Giảng viên CNTT'
);

-- Insert notification
INSERT INTO notifications (candidateid, senderid, sent_date, position, title)
VALUES (
    1,
    (SELECT userid FROM personnel_manager LIMIT 1),
    '2025-03-05',
    'Giảng viên CNTT',
    'Thông báo phỏng vấn'
);
