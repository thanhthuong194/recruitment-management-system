-- Migration: Thêm cột rejection_reason vào bảng Applications
-- Author: Recruitment Team
-- Date: 2026-01-02
-- Description: Lưu lý do từ chối khi HR từ chối hồ sơ ứng viên

ALTER TABLE Applications
ADD rejection_reason NVARCHAR(500) NULL;
