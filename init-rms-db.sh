#!/bin/bash
# Wait for SQL Server to start
sleep 20

# Create RMS database
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Password@2025" -C -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'RMS') CREATE DATABASE RMS"

echo "RMS database created successfully"
