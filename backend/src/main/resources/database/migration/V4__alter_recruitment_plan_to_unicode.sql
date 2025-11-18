-- Alter recruitment_plan columns to support Unicode (nvarchar)
ALTER TABLE recruitment_plan 
ALTER COLUMN title NVARCHAR(30) NOT NULL;

ALTER TABLE recruitment_plan 
ALTER COLUMN position NVARCHAR(50) NOT NULL;

ALTER TABLE recruitment_plan 
ALTER COLUMN school NVARCHAR(255) NOT NULL;
