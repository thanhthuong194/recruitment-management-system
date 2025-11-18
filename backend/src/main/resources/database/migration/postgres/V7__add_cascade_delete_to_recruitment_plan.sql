-- Add CASCADE delete for recruitment_plan foreign keys

-- Drop existing foreign keys
ALTER TABLE job_positions DROP CONSTRAINT IF EXISTS fk_job_positions_planid;
ALTER TABLE job_postings DROP CONSTRAINT IF EXISTS fk_job_postings_planid;
ALTER TABLE recruitment_results DROP CONSTRAINT IF EXISTS fk_recruitment_results_planid;

-- Re-add foreign keys with ON DELETE CASCADE
ALTER TABLE job_positions
    ADD CONSTRAINT fk_job_positions_planid
    FOREIGN KEY (planid) REFERENCES recruitment_plan(planid)
    ON DELETE CASCADE;

ALTER TABLE job_postings
    ADD CONSTRAINT fk_job_postings_planid
    FOREIGN KEY (planid) REFERENCES recruitment_plan(planid)
    ON DELETE CASCADE;

ALTER TABLE recruitment_results
    ADD CONSTRAINT fk_recruitment_results_planid
    FOREIGN KEY (planid) REFERENCES recruitment_plan(planid)
    ON DELETE CASCADE;
