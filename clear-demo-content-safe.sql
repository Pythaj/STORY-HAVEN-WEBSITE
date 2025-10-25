-- ========================================
-- SAFE DEMO CONTENT CLEARING SCRIPT
-- ========================================
-- This script removes only demo content while preserving:
-- - Database schema
-- - User accounts
-- - Any custom settings
--
-- Run this in your Supabase SQL Editor to prepare for your own content
-- ========================================

-- First, let's see what we have before deleting
SELECT 'Stories' as content_type, COUNT(*) as count FROM stories
UNION ALL
SELECT 'Audio Stories' as content_type, COUNT(*) as count FROM audio_stories
UNION ALL
SELECT 'Animations' as content_type, COUNT(*) as count FROM animations
UNION ALL
SELECT 'Purchases' as content_type, COUNT(*) as count FROM purchases;

-- Delete all demo stories (but preserve the table structure)
DELETE FROM stories;

-- Delete all demo audio stories (but preserve the table structure)
DELETE FROM audio_stories;

-- Delete all demo animations (but preserve the table structure)
DELETE FROM animations;

-- Optional: Delete demo purchases (commented out by default)
-- DELETE FROM purchases;

-- Verify that tables are now empty
SELECT 'Stories remaining:' as table_name, COUNT(*) as count FROM stories
UNION ALL
SELECT 'Audio remaining:' as table_name, COUNT(*) as count FROM audio_stories
UNION ALL
SELECT 'Animations remaining:' as table_name, COUNT(*) as count FROM animations
UNION ALL
SELECT 'Purchases remaining:' as table_name, COUNT(*) as count FROM purchases;

-- ========================================
-- RESULT: Your content tables are now clean!
-- ========================================
-- You can now:
-- 1. Go to your admin panel at /admin
-- 2. Upload your own stories, audio, and animations
-- 3. Each upload will include cover images and content files
-- 4. All files will be stored in Cloudinary
-- 5. Only metadata will be stored in Supabase (keeping you in free tier!)
-- ========================================
