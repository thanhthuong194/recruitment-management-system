-- Add reject_reason column to recruitment_plan table
ALTER TABLE recruitment_plan ADD reject_reason NVARCHAR(500) NULL;
