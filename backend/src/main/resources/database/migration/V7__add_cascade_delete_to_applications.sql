-- Drop existing foreign key constraint from applications to job_positions
ALTER TABLE applications DROP CONSTRAINT FKcduqwdxhagcwt46hkljdf1s6m;

-- Add foreign key constraint with CASCADE DELETE
ALTER TABLE applications 
    ADD CONSTRAINT FKcduqwdxhagcwt46hkljdf1s6m 
    FOREIGN KEY (positionid) 
    REFERENCES job_positions(positionid)
    ON DELETE CASCADE;
