-- Create ADMIN user account
-- Password: 123 (bcrypt hashed)
INSERT INTO users (date_of_birth, sex, phone_number, role, username, email, full_name, password, address)
VALUES ('1990-01-15', 'Nam', '0912345678', 'ADMIN', 'admin', 'admin@hcmute.edu.vn', 'Quản trị viên hệ thống', '$2a$12$kuloSxR74V/OE0qNuZZJJ.5VlPNJH4Hu7xbT6A/Xi7kpfal/1D9F.', 'TP. Hồ Chí Minh');

-- Insert corresponding record in admin table
INSERT INTO admin (userid)
SELECT userid FROM users WHERE username = 'admin';
