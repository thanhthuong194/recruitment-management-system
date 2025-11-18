-- Create RMS database if not exists
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'RMS')
BEGIN
    CREATE DATABASE RMS;
END
GO
