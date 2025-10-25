-- Fix Image URLs in Supabase Database
-- Run this script in the Supabase SQL Editor to repair broken cover images

-- Update stories to use the local Watermark image
UPDATE stories
SET cover_url = '/Watermark.jpg'
WHERE cover_url ILIKE '%placeholder%' OR cover_url ILIKE '%example.com%';

-- Update audio stories to use the local Watermark image
UPDATE audio_stories
SET cover_url = '/Watermark.jpg'
WHERE cover_url ILIKE '%placeholder%' OR cover_url ILIKE '%example.com%';

-- Update animations to use the local Watermark image
UPDATE animations
SET thumbnail_url = '/Watermark.jpg'
WHERE thumbnail_url ILIKE '%placeholder%' OR thumbnail_url ILIKE '%example.com%';

-- Verify the updates
SELECT id, title, cover_url FROM stories ORDER BY title;
SELECT id, title, cover_url FROM audio_stories ORDER BY title;
SELECT id, title, thumbnail_url FROM animations ORDER BY title;
