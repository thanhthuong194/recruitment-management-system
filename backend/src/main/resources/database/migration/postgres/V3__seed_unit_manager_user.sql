-- Insert UNIT_MANAGER user account
-- Password: 123 (bcrypt hashed)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1985-05-15', 'Nam', '0987654321', 'UNIT_MANAGER', 'um', 'um@hcmute.edu.vn', 'Lê Hoàng Nam', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', 'TP. Hồ Chí Minh');

-- Insert corresponding record in unit_managers table
INSERT INTO unit_managers (userid, department, position)
SELECT userid, 'Khoa Công Nghệ Thông Tin', 'Trưởng Khoa' 
FROM users 
WHERE username = 'um';
