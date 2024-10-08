-- Enable RLS on the directories table
ALTER TABLE directories ENABLE ROW LEVEL SECURITY;

-- Ensure this policy exists and is correctly applied
CREATE POLICY "Allow public to submit directories"
ON directories FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to see only approved directories
CREATE POLICY "Allow users to view approved directories"
ON directories FOR SELECT
TO public
USING (status = 'approved');

-- Allow admin to see all directories
CREATE POLICY "Allow admin to view all directories"
ON directories FOR SELECT
TO authenticated
USING (auth.uid() IN (SELECT id FROM auth.users WHERE is_admin = true));

-- Allow admin to update directory status
CREATE POLICY "Allow admin to update directory status"
ON directories FOR UPDATE
TO authenticated
USING (auth.uid() IN (SELECT id FROM auth.users WHERE is_admin = true))
WITH CHECK (true);





-- Enable RLS on the directory_categories table
ALTER TABLE directory_categories ENABLE ROW LEVEL SECURITY;

-- Allow any user to insert into directory_categories
CREATE POLICY "Allow users to submit directory categories"
ON directory_categories FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to see categories for approved directories
CREATE POLICY "Allow users to view approved directory categories"
ON directory_categories FOR SELECT
TO public
USING (
  directory_id IN (
    SELECT id FROM directories WHERE status = 'approved'
  )
);

-- Allow admin to see all directory categories
CREATE POLICY "Allow admin to view all directory categories"
ON directory_categories FOR SELECT
TO authenticated
USING (auth.uid() IN (SELECT id FROM auth.users WHERE is_admin = true));