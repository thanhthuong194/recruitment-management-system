-- Insert UNIT_MANAGER user account
-- Password: 123 (bcrypt hashed - same as other users)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1985-05-15', N'Nam', '0987654321', 'UNIT_MANAGER', 'um', 'um@hcmute.edu.vn', N'Lê Hoàng Nam', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', N'TP. Hồ Chí Minh');

-- Insert corresponding record in unit_managers table
-- Note: userid will be auto-generated, but typically for the 'um' user it should be 5 (after admin=4)
-- Adjust the userid value based on your actual database state
INSERT INTO unit_managers (userid, department, position)
SELECT userid, N'Khoa Công Nghệ Thông Tin', N'Trưởng Khoa' 
FROM users 
WHERE username = 'um';
