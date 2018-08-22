CREATE OR REPLACE FUNCTION create_category_training_job(category_id integer) 
  RETURNS integer 
AS
$BODY$
-- check if a job for this category is already queued and not started
DECLARE 
  job_id Integer := (SELECT id FROM category_training_jobs WHERE startdate IS NULL);
BEGIN --

  -- if a not started job is present return the id it
  IF job_id IS NOT NULL THEN
      RETURN job_id;
  -- if id is not present create a new job and return its id
  ELSE    
      INSERT INTO 
          category_training_jobs (category_id, submissiondate, startdate, enddate)
       VALUES
          (category_id, NOW(), NULL, NULL)
       RETURNING id;
  END IF;

END; --
$BODY$
LANGUAGE plpgsql;