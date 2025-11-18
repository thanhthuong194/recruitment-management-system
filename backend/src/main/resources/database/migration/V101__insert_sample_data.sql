-- ====== USERS ======
-- Note: ADMIN, RECTOR, PERSONNEL_MANAGER are created in other migrations
-- This file only creates sample UNIT_MANAGER and demo data
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES
('1985-06-22', N'Nam', '0909876543', 'UNIT_MANAGER', 'unit1', 'unit1@university.edu', N'Trần Minh Bảo', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', N'Hà Nội');

-- ====== UNIT MANAGER ======
INSERT INTO unit_managers (userid, department, position)
SELECT userid, N'Khoa Kinh tế', N'Trưởng khoa'
FROM users 
WHERE username = 'unit1';

-- ====== RECRUITMENT PLAN ======
-- Get the first UNIT_MANAGER for demo data
DECLARE @unitManagerId INT;
SELECT TOP 1 @unitManagerId = userid FROM unit_managers;

DECLARE @rectorId INT;
SELECT TOP 1 @rectorId = userid FROM rector;

INSERT INTO recruitment_plan (approv_date, approved_by, cpa, creat_date, created_by, quantity, status, title, position, school)
VALUES
('2025-01-10', @rectorId, 2.5, '2025-01-01', @unitManagerId, 3, 'Approved', N'Kế hoạch tuyển dụng 2025', N'Giảng viên CNTT', N'ĐH Bách Khoa');

-- ====== JOB POSITIONS ======
INSERT INTO job_positions (planid, position, title)
VALUES (1, N'Giảng viên CNTT', N'Lập trình Java');

-- ====== CANDIDATES ======
INSERT INTO candidates (cpa, date_of_birth, sex, phone, department, email, full_name, position, address, cv_path)
VALUES
(3.4, '2000-05-10', 'Nam', '0911222333', 'CNTT', 'candidate1@gmail.com', 'Nguyen D', 'Giảng viên CNTT', 'Hải Phòng', '/cv/nguyend.pdf'),
(3.6, '1999-08-20', 'Nữ', '0911777888', 'CNTT', 'candidate2@gmail.com', 'Tran E', 'Giảng viên CNTT', 'Hà Nội', '/cv/trane.pdf');

-- ====== APPLICATIONS ======
INSERT INTO applications (apply_date, candidateid, positionid, status)
VALUES
('2025-02-15', 1, 1, 'Đang xét'),
('2025-02-16', 2, 1, 'Đã duyệt');

-- ====== RECRUITMENT RESULTS ======
INSERT INTO recruitment_results (planid, final_decision)
VALUES (1, 'Đã tuyển');

-- ====== JOB POSTINGS ======
INSERT INTO job_postings (created_by, created_date, deadline, planid, status, title)
VALUES (3, '2025-01-02', '2025-03-01', 1, 'Đang mở', 'Tuyển Giảng viên CNTT');

-- ====== NOTIFICATIONS ======
INSERT INTO notifications (candidateid, senderid, sent_date, position, title)
VALUES (1, 3, '2025-03-05', 'Giảng viên CNTT', 'Thông báo phỏng vấn');