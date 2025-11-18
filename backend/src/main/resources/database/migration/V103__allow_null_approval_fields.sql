-- Allow NULL for approval fields in recruitment_plan
-- These fields should be NULL when plan is first created (Pending status)
-- and filled in later when approved by rector

ALTER TABLE recruitment_plan ALTER COLUMN approv_date DATE NULL;
ALTER TABLE recruitment_plan ALTER COLUMN approved_by INT NULL;
