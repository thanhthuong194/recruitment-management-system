-- Convert all VARCHAR columns to NVARCHAR for Unicode support
-- This is required for proper Vietnamese character storage

-- ====== USERS TABLE ======
-- Drop unique constraints first
ALTER TABLE users DROP CONSTRAINT UK9q63snka3mdh91as4io72espi; -- phone_number
ALTER TABLE users DROP CONSTRAINT UKr43af9ap4edm43mmtq01oddj6; -- username
ALTER TABLE users DROP CONSTRAINT UK6dotkott2kjsp8vw4d0m25fb7; -- email

-- Alter columns to NVARCHAR
ALTER TABLE users ALTER COLUMN sex NVARCHAR(10) NOT NULL;
ALTER TABLE users ALTER COLUMN phone_number NVARCHAR(15) NOT NULL;
ALTER TABLE users ALTER COLUMN role NVARCHAR(20) NOT NULL;
ALTER TABLE users ALTER COLUMN username NVARCHAR(30) NOT NULL;
ALTER TABLE users ALTER COLUMN email NVARCHAR(50) NOT NULL;
ALTER TABLE users ALTER COLUMN full_name NVARCHAR(50) NOT NULL;
ALTER TABLE users ALTER COLUMN password NVARCHAR(60) NOT NULL;
ALTER TABLE users ALTER COLUMN address NVARCHAR(255) NOT NULL;

-- Re-add unique constraints
ALTER TABLE users ADD CONSTRAINT UK9q63snka3mdh91as4io72espi UNIQUE (phone_number);
ALTER TABLE users ADD CONSTRAINT UKr43af9ap4edm43mmtq01oddj6 UNIQUE (username);
ALTER TABLE users ADD CONSTRAINT UK6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);

-- ====== UNIT_MANAGERS TABLE ======
ALTER TABLE unit_managers ALTER COLUMN department NVARCHAR(100) NOT NULL;
ALTER TABLE unit_managers ALTER COLUMN position NVARCHAR(100) NOT NULL;

-- ====== PERSONNEL_MANAGER TABLE ======
ALTER TABLE personnel_manager ALTER COLUMN department NVARCHAR(100) NOT NULL;
ALTER TABLE personnel_manager ALTER COLUMN position NVARCHAR(100) NOT NULL;

-- ====== RECRUITMENT_PLAN TABLE ======
ALTER TABLE recruitment_plan ALTER COLUMN status NVARCHAR(10);
ALTER TABLE recruitment_plan ALTER COLUMN title NVARCHAR(30) NOT NULL;
ALTER TABLE recruitment_plan ALTER COLUMN position NVARCHAR(50) NOT NULL;
ALTER TABLE recruitment_plan ALTER COLUMN school NVARCHAR(255) NOT NULL;

-- ====== JOB_POSITIONS TABLE ======
ALTER TABLE job_positions ALTER COLUMN position NVARCHAR(50) NOT NULL;
ALTER TABLE job_positions ALTER COLUMN title NVARCHAR(50) NOT NULL;

-- ====== JOB_POSTINGS TABLE ======
ALTER TABLE job_postings ALTER COLUMN status NVARCHAR(20);
ALTER TABLE job_postings ALTER COLUMN title NVARCHAR(100) NOT NULL;

-- ====== CANDIDATES TABLE ======
-- Drop unique constraints first
ALTER TABLE candidates DROP CONSTRAINT UK5ilb7049i3j8efmvh4w7adqxk; -- phone
ALTER TABLE candidates DROP CONSTRAINT UKnm2ss73jii2hdupmpphl6agry; -- email

-- Alter columns to NVARCHAR
ALTER TABLE candidates ALTER COLUMN sex NVARCHAR(10) NOT NULL;
ALTER TABLE candidates ALTER COLUMN phone NVARCHAR(15) NOT NULL;
ALTER TABLE candidates ALTER COLUMN department NVARCHAR(50) NOT NULL;
ALTER TABLE candidates ALTER COLUMN email NVARCHAR(50) NOT NULL;
ALTER TABLE candidates ALTER COLUMN full_name NVARCHAR(50) NOT NULL;
ALTER TABLE candidates ALTER COLUMN position NVARCHAR(50) NOT NULL;
ALTER TABLE candidates ALTER COLUMN address NVARCHAR(255) NOT NULL;
ALTER TABLE candidates ALTER COLUMN cv_path NVARCHAR(255) NOT NULL;

-- Re-add unique constraints
ALTER TABLE candidates ADD CONSTRAINT UK5ilb7049i3j8efmvh4w7adqxk UNIQUE (phone);
ALTER TABLE candidates ADD CONSTRAINT UKnm2ss73jii2hdupmpphl6agry UNIQUE (email);

-- ====== APPLICATIONS TABLE ======
ALTER TABLE applications ALTER COLUMN status NVARCHAR(20);

-- ====== NOTIFICATIONS TABLE ======
ALTER TABLE notifications ALTER COLUMN position NVARCHAR(50) NOT NULL;
ALTER TABLE notifications ALTER COLUMN title NVARCHAR(50) NOT NULL;

-- ====== RECRUITMENT_RESULTS TABLE ======
ALTER TABLE recruitment_results ALTER COLUMN final_decision NVARCHAR(20) NOT NULL;
