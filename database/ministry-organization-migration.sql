-- Database Migration: Add Ministry Organization Support
-- Run this SQL in your Supabase SQL Editor if you already have the church_gallery table

-- Add new columns to church_gallery table
ALTER TABLE church_gallery 
ADD COLUMN IF NOT EXISTS ministry_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS folder_path VARCHAR(200);

-- Update category field to support ministry types
-- (Expand the possible values for category)

-- Create new indexes for better performance
CREATE INDEX IF NOT EXISTS idx_church_gallery_ministry_type ON church_gallery(ministry_type);
CREATE INDEX IF NOT EXISTS idx_church_gallery_folder_path ON church_gallery(folder_path);

-- Add comments for documentation
COMMENT ON COLUMN church_gallery.ministry_type IS 'Specific ministry type: youth, children, womens, mens, worship, discipleship';
COMMENT ON COLUMN church_gallery.folder_path IS 'Storage folder path for organization (e.g., youth/, children/)';
COMMENT ON COLUMN church_gallery.category IS 'General category: events, ministries, services, building, or specific ministry types';

-- Update existing ministry images to have proper ministry_type
-- (You can customize these based on your existing data)
UPDATE church_gallery 
SET ministry_type = 'youth', folder_path = 'youth/'
WHERE category = 'ministries' AND (title ILIKE '%youth%' OR description ILIKE '%youth%');

UPDATE church_gallery 
SET ministry_type = 'children', folder_path = 'children/'
WHERE category = 'ministries' AND (title ILIKE '%children%' OR description ILIKE '%children%');

UPDATE church_gallery 
SET ministry_type = 'womens', folder_path = 'womens/'
WHERE category = 'ministries' AND (title ILIKE '%women%' OR description ILIKE '%women%');

UPDATE church_gallery 
SET ministry_type = 'mens', folder_path = 'mens/'
WHERE category = 'ministries' AND (title ILIKE '%men%' OR description ILIKE '%men%');

UPDATE church_gallery 
SET ministry_type = 'worship', folder_path = 'worship/'
WHERE category = 'ministries' AND (title ILIKE '%worship%' OR description ILIKE '%worship%');

UPDATE church_gallery 
SET ministry_type = 'discipleship', folder_path = 'discipleship/'
WHERE category = 'ministries' AND (title ILIKE '%discipleship%' OR description ILIKE '%discipleship%');

-- Create a view for easy ministry image access
CREATE OR REPLACE VIEW ministry_images_view AS
SELECT 
    id,
    title,
    description,
    image_url,
    ministry_type,
    folder_path,
    is_featured,
    created_at,
    COALESCE(ministry_type, 'general') as ministry_category
FROM church_gallery
WHERE category = 'ministries' OR ministry_type IS NOT NULL
ORDER BY ministry_type, created_at DESC;

-- Grant access to the view
GRANT SELECT ON ministry_images_view TO anon, authenticated;