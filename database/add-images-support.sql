-- Additional SQL to add image support to existing tables
-- Run this AFTER creating the main schema

-- Add image fields to events table (if not already present)
ALTER TABLE events ADD COLUMN IF NOT EXISTS banner_image_url TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery_images TEXT[]; -- Array of image URLs

-- Add profile image to ministry join requests
ALTER TABLE ministry_join_requests ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Add church photos table for gallery
CREATE TABLE IF NOT EXISTS church_gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- events, ministries, services, building, youth, children, womens, mens, worship, discipleship
    ministry_type VARCHAR(50), -- youth, children, womens, mens, worship, discipleship (NULL for non-ministry images)
    folder_path VARCHAR(200), -- Store the folder path (e.g., 'youth/', 'children/', etc.)
    upload_date DATE DEFAULT CURRENT_DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for gallery
ALTER TABLE church_gallery ENABLE ROW LEVEL SECURITY;

-- Allow public to read gallery images
CREATE POLICY "Allow public to read gallery" ON church_gallery
    FOR SELECT USING (true);

-- Create indexes for gallery
CREATE INDEX idx_church_gallery_category ON church_gallery(category);
CREATE INDEX idx_church_gallery_ministry_type ON church_gallery(ministry_type);
CREATE INDEX idx_church_gallery_folder_path ON church_gallery(folder_path);
CREATE INDEX idx_church_gallery_featured ON church_gallery(is_featured);