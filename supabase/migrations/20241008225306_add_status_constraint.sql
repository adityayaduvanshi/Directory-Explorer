-- First, update existing data to ensure all statuses are valid
UPDATE directories
SET status = 'pending'
WHERE status NOT IN ('pending', 'approved', 'rejected', 'deleted', 'suspended', 'under_review');

-- Then, add the CHECK constraint
ALTER TABLE directories
ADD CONSTRAINT check_status 
CHECK (status IN ('pending', 'approved', 'rejected', 'deleted', 'suspended', 'under_review'));

-- Finally, modify the column to set the default
ALTER TABLE directories
ALTER COLUMN status SET DEFAULT 'pending';