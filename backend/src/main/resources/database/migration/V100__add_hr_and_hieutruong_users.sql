-- Add user accounts with friendly usernames
-- Password: 123 (bcrypt hashed - same as other users)

-- Add HR user (PERSONNEL_MANAGER)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1990-03-20', N'Nữ', '0905551234', 'PERSONNEL_MANAGER', 'hr', 'hr@hcmute.edu.vn', N'Nguyễn Thị Lan Anh', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', N'TP. Hồ Chí Minh');

-- Insert corresponding record in personnel_manager table
INSERT INTO personnel_manager (userid, department, position)
SELECT userid, N'Phòng Tổ chức Cán bộ', N'Trưởng phòng' 
FROM users 
WHERE username = 'hr';

-- Add Rector user (RECTOR)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1975-10-15', N'Nam', '0901234999', 'RECTOR', 'hieutruong', 'hieutruong@hcmute.edu.vn', N'Trần Văn Minh', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', N'TP. Hồ Chí Minh');

-- Insert corresponding record in rector table
INSERT INTO rector (userid)
SELECT userid
FROM users 
WHERE username = 'hieutruong';
