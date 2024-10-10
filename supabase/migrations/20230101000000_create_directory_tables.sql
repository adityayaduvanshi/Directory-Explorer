-- Directories table
CREATE TABLE directories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255),
  logo_url VARCHAR(255),
  monthly_traffic INTEGER,
  dr_da INTEGER,
  pricing VARCHAR(10) CHECK (pricing IN ('paid', 'free')),
  website_link VARCHAR(255) NOT NULL,
  contact_info VARCHAR(255),
  is_owner BOOLEAN DEFAULT FALSE,
  submission_link VARCHAR(255),
   primary_category_id UUID REFERENCES categories(id),
  message TEXT,
    status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected', 'deleted', 'suspended', 'under_review')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Directory_Categories junction table
CREATE TABLE directory_categories (
  directory_id UUID REFERENCES directories(id),
  category_id UUID REFERENCES categories(id),
  PRIMARY KEY (directory_id, category_id)
);

-- Add some initial categories
INSERT INTO categories (name) VALUES
  ('Websites'),
  ('Newsletters'),
  ('Podcasts'),
  ('YouTube Channels'),
  ('Developer Tools'),
  ('Marketing'),
  ('Open Source'),
  ('Technology'),
  ('AI'),
  ('Indie Makers'),
  ('Startups'),
  ('Health'),
  ('Browser Extension'),
  ('Gaming'),
  ('Education'),
  ('SaaS'),
  ('Jobs');


