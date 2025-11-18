-- Add HR and Rector user accounts
-- Password: 123 (bcrypt hashed)

-- Add HR user (PERSONNEL_MANAGER)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1990-03-20', 'Nữ', '0905551234', 'PERSONNEL_MANAGER', 'hr', 'hr@hcmute.edu.vn', 'Nguyễn Thị Lan Anh', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', 'TP. Hồ Chí Minh');

-- Insert corresponding record in personnel_manager table
INSERT INTO personnel_manager (userid, department, position)
SELECT userid, 'Phòng Tổ chức Cán bộ', 'Trưởng phòng' 
FROM users 
WHERE username = 'hr';

-- Add Rector user (RECTOR)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1975-10-15', 'Nam', '0901234999', 'RECTOR', 'hieutruong', 'hieutruong@hcmute.edu.vn', 'Trần Văn Minh', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', 'TP. Hồ Chí Minh');

-- Insert corresponding record in rector table
INSERT INTO rector (userid)
SELECT userid
FROM users 
WHERE username = 'hieutruong';
