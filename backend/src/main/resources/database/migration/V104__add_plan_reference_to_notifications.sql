-- Add planID to recruitment_notifications to track which plan was posted
ALTER TABLE recruitment_notifications
ADD planID INT NULL;

-- Add foreign key constraint
ALTER TABLE recruitment_notifications
ADD CONSTRAINT FK_notifications_plan 
FOREIGN KEY (planID) REFERENCES recruitment_plan(planID) 
ON DELETE CASCADE;
