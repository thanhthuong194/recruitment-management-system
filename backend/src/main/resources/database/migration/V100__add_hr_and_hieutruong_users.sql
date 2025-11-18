-- Add user accounts with friendly usernames
-- Password: 123 (bcrypt hashed - same as other users)

-- Add HR user (PERSONNEL_MANAGER)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1990-03-20', N'Nữ', '0905551234', 'PERSONNEL_MANAGER', 'hr', 'hr@hcmute.edu.vn', N'Quản lý nhân sự', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', N'TP.HCM');

-- Add Rector user (RECTOR)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1975-10-15', N'Nam', '0901234999', 'RECTOR', 'hieutruong', 'hieutruong@hcmute.edu.vn', N'Hiệu trưởng', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', N'TP.HCM');
