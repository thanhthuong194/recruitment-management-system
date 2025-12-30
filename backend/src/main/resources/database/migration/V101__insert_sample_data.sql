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
-- (Sample candidates removed)

-- ====== APPLICATIONS ======
-- (Sample applications removed)

-- ====== RECRUITMENT RESULTS ======
INSERT INTO recruitment_results (planid, final_decision)
VALUES (1, 'Đã tuyển');

-- ====== JOB POSTINGS ======
INSERT INTO job_postings (created_by, created_date, deadline, planid, status, title)
VALUES (3, '2025-01-02', '2025-03-01', 1, N'Đang mở', N'Tuyển Giảng viên CNTT');

-- ====== NOTIFICATIONS ======
-- (Sample notification referencing candidate removed)