-- Supabase Storage Setup SQL
-- Run this in your Supabase SQL Editor to set up storage buckets

-- Create storage buckets for different image types
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('church-images', 'church-images', true),
  ('ministry-images', 'ministry-images', true),
  ('event-images', 'event-images', true),
  ('gallery-images', 'gallery-images', true),
  ('user-uploads', 'user-uploads', true);

-- Create ministry-specific folder structure documentation
-- Folders will be created automatically when uploading:
-- ministry-images/youth/
-- ministry-images/children/
-- ministry-images/womens/
-- ministry-images/mens/
-- ministry-images/worship/
-- ministry-images/discipleship/

-- Create storage policies for public access

-- Policy for church-images bucket
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'church-images');

CREATE POLICY "Allow uploads to church-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'church-images');

-- Policy for ministry-images bucket
CREATE POLICY "Public Access Ministry" ON storage.objects
FOR SELECT USING (bucket_id = 'ministry-images');

CREATE POLICY "Allow uploads to ministry-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'ministry-images');

-- Policy for event-images bucket
CREATE POLICY "Public Access Events" ON storage.objects
FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Allow uploads to event-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'event-images');

-- Policy for gallery-images bucket
CREATE POLICY "Public Access Gallery" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow uploads to gallery-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

-- Policy for user-uploads bucket
CREATE POLICY "Public Access User Uploads" ON storage.objects
FOR SELECT USING (bucket_id = 'user-uploads');

CREATE POLICY "Allow uploads to user-uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'user-uploads');