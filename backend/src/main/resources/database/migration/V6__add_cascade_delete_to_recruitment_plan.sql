-- Drop existing foreign key constraints
ALTER TABLE job_positions DROP CONSTRAINT FKfver8hwtmi6yatc1wxlqxgsb6;
ALTER TABLE job_postings DROP CONSTRAINT FKnljjsljqwfngdk8wde8ftmymd;
ALTER TABLE recruitment_results DROP CONSTRAINT FK2itvesa82hvrml2hm1iqnla10;

-- Add foreign key constraints with CASCADE DELETE
ALTER TABLE job_positions 
    ADD CONSTRAINT FKfver8hwtmi6yatc1wxlqxgsb6 
    FOREIGN KEY (planid) 
    REFERENCES recruitment_plan(planid)
    ON DELETE CASCADE;

ALTER TABLE job_postings 
    ADD CONSTRAINT FKnljjsljqwfngdk8wde8ftmymd 
    FOREIGN KEY (planid) 
    REFERENCES recruitment_plan(planid)
    ON DELETE CASCADE;

ALTER TABLE recruitment_results 
    ADD CONSTRAINT FK2itvesa82hvrml2hm1iqnla10 
    FOREIGN KEY (planid) 
    REFERENCES recruitment_plan(planid)
    ON DELETE CASCADE;
