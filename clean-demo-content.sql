-- ========================================
-- CLEAN DEMO CONTENT FROM STORY HAVEN DATABASE
-- ========================================
-- Run this SQL in your Supabase SQL Editor to remove all demo content
-- and start fresh with your own content uploads
--
-- ⚠️ WARNING: This will DELETE ALL existing content!
-- Make sure you have backups if needed before running this script.
--
-- After running this script, your database will be clean and ready
-- to accept new content through the admin panel.
-- ========================================

-- Delete all demo stories
DELETE FROM stories;

-- Delete all demo audio stories
DELETE FROM audio_stories;

-- Delete all demo animations
DELETE FROM animations;

-- Delete all demo purchases (optional - comment out if you want to keep purchase history)
DELETE FROM purchases;

-- Reset auto-increment sequences (if you want fresh IDs)
-- Note: Supabase uses UUIDs by default, so this may not be necessary
-- But if you're using integer IDs, you can reset sequences like this:
-- ALTER SEQUENCE stories_id_seq RESTART WITH 1;
-- ALTER SEQUENCE audio_stories_id_seq RESTART WITH 1;
-- ALTER SEQUENCE animations_id_seq RESTART WITH 1;

-- Verify deletion
SELECT 'Stories remaining:' as table_name, COUNT(*) as count FROM stories
UNION ALL
SELECT 'Audio remaining:' as table_name, COUNT(*) as count FROM audio_stories
UNION ALL
SELECT 'Animations remaining:' as table_name, COUNT(*) as count FROM animations
UNION ALL
SELECT 'Purchases remaining:' as table_name, COUNT(*) as count FROM purchases;

-- ========================================
-- RESULT: Your database is now clean!
-- ========================================
-- You can now:
-- 1. Go to your admin panel at /admin
-- 2. Upload your own stories, audio, and animations
-- 3. Each upload will include cover images and content files
-- 4. All files will be stored in Cloudinary
-- 5. Only metadata will be stored in Supabase (keeping you in free tier!)
-- ========================================
