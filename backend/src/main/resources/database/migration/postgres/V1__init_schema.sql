-- PostgreSQL Schema Creation
-- Converted from SQL Server schema

CREATE TABLE IF NOT EXISTS admin (
    userid INT NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS applications (
    applicationid SERIAL PRIMARY KEY,
    apply_date DATE NOT NULL,
    candidateid INT NOT NULL,
    positionid INT NOT NULL,
    status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS candidates (
    candidateid SERIAL PRIMARY KEY,
    cpa DECIMAL(3,2) NOT NULL,
    date_of_birth DATE NOT NULL,
    sex VARCHAR(10) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    cv_path VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS job_positions (
    planid INT NOT NULL,
    positionid SERIAL PRIMARY KEY,
    position VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS job_postings (
    created_by INT NOT NULL,
    created_date DATE NOT NULL,
    deadline DATE NOT NULL,
    planid INT NOT NULL UNIQUE,
    postid SERIAL PRIMARY KEY,
    status VARCHAR(20),
    title VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications (
    candidateid INT NOT NULL UNIQUE,
    notifid SERIAL PRIMARY KEY,
    senderid INT NOT NULL,
    sent_date DATE NOT NULL,
    position VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS personnel_manager (
    userid INT NOT NULL PRIMARY KEY,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS recruitment_plan (
    approv_date DATE,
    approved_by INT,
    cpa DECIMAL(3,2) NOT NULL,
    creat_date DATE NOT NULL,
    created_by INT NOT NULL,
    planid SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    status VARCHAR(10),
    title VARCHAR(30) NOT NULL,
    position VARCHAR(50) NOT NULL,
    school VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS recruitment_results (
    planid INT NOT NULL UNIQUE,
    resultid SERIAL PRIMARY KEY,
    final_decision VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS rector (
    userid INT NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS unit_managers (
    userid INT NOT NULL PRIMARY KEY,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    date_of_birth DATE NOT NULL,
    userid SERIAL PRIMARY KEY,
    sex VARCHAR(10) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    address VARCHAR(255) NOT NULL
);

-- Foreign Keys
ALTER TABLE admin 
    ADD CONSTRAINT fk_admin_userid 
    FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE applications 
    ADD CONSTRAINT fk_applications_candidateid 
    FOREIGN KEY (candidateid) REFERENCES candidates(candidateid);

ALTER TABLE applications 
    ADD CONSTRAINT fk_applications_positionid 
    FOREIGN KEY (positionid) REFERENCES job_positions(positionid);

ALTER TABLE job_positions 
    ADD CONSTRAINT fk_job_positions_planid 
    FOREIGN KEY (planid) REFERENCES recruitment_plan(planid);

ALTER TABLE job_postings 
    ADD CONSTRAINT fk_job_postings_created_by 
    FOREIGN KEY (created_by) REFERENCES personnel_manager(userid);

ALTER TABLE job_postings 
    ADD CONSTRAINT fk_job_postings_planid 
    FOREIGN KEY (planid) REFERENCES recruitment_plan(planid);

ALTER TABLE notifications 
    ADD CONSTRAINT fk_notifications_candidateid 
    FOREIGN KEY (candidateid) REFERENCES candidates(candidateid);

ALTER TABLE notifications 
    ADD CONSTRAINT fk_notifications_senderid 
    FOREIGN KEY (senderid) REFERENCES personnel_manager(userid);

ALTER TABLE personnel_manager 
    ADD CONSTRAINT fk_personnel_manager_userid 
    FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE recruitment_plan 
    ADD CONSTRAINT fk_recruitment_plan_approved_by 
    FOREIGN KEY (approved_by) REFERENCES rector(userid);

ALTER TABLE recruitment_plan 
    ADD CONSTRAINT fk_recruitment_plan_created_by 
    FOREIGN KEY (created_by) REFERENCES unit_managers(userid);

ALTER TABLE recruitment_results 
    ADD CONSTRAINT fk_recruitment_results_planid 
    FOREIGN KEY (planid) REFERENCES recruitment_plan(planid);

ALTER TABLE rector 
    ADD CONSTRAINT fk_rector_userid 
    FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE unit_managers 
    ADD CONSTRAINT fk_unit_managers_userid 
    FOREIGN KEY (userid) REFERENCES users(userid);

-- Indexes for better performance
CREATE INDEX idx_applications_candidateid ON applications(candidateid);
CREATE INDEX idx_applications_positionid ON applications(positionid);
CREATE INDEX idx_job_positions_planid ON job_positions(planid);
CREATE INDEX idx_recruitment_plan_created_by ON recruitment_plan(created_by);
CREATE INDEX idx_recruitment_plan_approved_by ON recruitment_plan(approved_by);
