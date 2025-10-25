-- ========================================
-- YOUR CONTENT TEMPLATE FOR STORY HAVEN
-- ========================================
-- Use this template to add your own content to the database
-- 
-- INSTRUCTIONS:
-- 1. Replace all placeholder values with your actual content
-- 2. For media files, upload them through the admin panel first
-- 3. The admin panel will automatically populate the database
-- 4. ONLY use direct SQL if you have Cloudinary URLs ready
--
-- TABLE STRUCTURE REFERENCE:
-- stories: id, title, genre, description, cover_url, pdf_url, cloudinary_cover_id, cloudinary_pdf_id, price, views, rating, language, pages, published, created_at, updated_at
-- audio_stories: id, title, genre, description, cover_url, audio_url, cloudinary_cover_id, cloudinary_audio_id, duration, price, plays, rating, language, published, created_at, updated_at
-- animations: id, title, genre, description, thumbnail_url, video_url, cloudinary_thumbnail_id, cloudinary_video_id, duration, price, views, rating, language, published, created_at, updated_at
-- ========================================

-- ========================================
-- INSERT YOUR STORIES
-- ========================================
-- Replace placeholders with your actual story information:
-- - 'Your Story Title' with the actual title
-- - 'Your Genre' with one of: Romance, Adventure, African Legends, Thriller, Drama, Fantasy
-- - 'Your story description here...' with actual description
-- - 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-cover-path.jpg' with actual Cloudinary cover URL
-- - 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-pdf-path.pdf' with actual Cloudinary PDF URL
-- - 'your-cover-public-id' with actual Cloudinary public ID for cover
-- - 'your-pdf-public-id' with actual Cloudinary public ID for PDF
-- - Adjust price, pages, and published status as needed

INSERT INTO stories (
  title, 
  genre, 
  description, 
  cover_url, 
  pdf_url, 
  cloudinary_cover_id, 
  cloudinary_pdf_id,
  price, 
  pages, 
  published,
  language,
  views,
  rating
) VALUES 
  (
    'Your Story Title', 
    'Your Genre', 
    'Your story description here...',
    'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-cover-path.jpg',
    'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-pdf-path.pdf',
    'your-cover-public-id',
    'your-pdf-public-id',
    5.00,  -- price in ₵
    120,   -- number of pages
    true,  -- published status (true/false)
    'English',  -- language
    0,     -- initial views
    0.0    -- initial rating
  );
-- Add more stories with additional INSERT statements as needed
-- Copy the entire VALUES block for each new story

-- ========================================
-- INSERT YOUR AUDIO STORIES
-- ========================================
-- Replace placeholders with your actual audio information:
-- - 'Your Audio Title' with the actual title
-- - 'Your Genre' with one of: Romance, Adventure, African Legends, Thriller, Drama, Fantasy
-- - 'Your audio description here...' with actual description
-- - 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-cover-path.jpg' with actual Cloudinary cover URL
-- - 'https://res.cloudinary.com/your-cloud-name/video/upload/v1/your-audio-path.mp3' with actual Cloudinary audio URL
-- - 'your-cover-public-id' with actual Cloudinary public ID for cover
-- - 'your-audio-public-id' with actual Cloudinary public ID for audio
-- - Adjust price, duration, and published status as needed

INSERT INTO audio_stories (
  title, 
  genre, 
  description, 
  cover_url, 
  audio_url, 
  cloudinary_cover_id, 
  cloudinary_audio_id,
  duration,
  price, 
  plays,
  published,
  language,
  rating
) VALUES 
  (
    'Your Audio Title', 
    'Your Genre', 
    'Your audio description here...',
    'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-cover-path.jpg',
    'https://res.cloudinary.com/your-cloud-name/video/upload/v1/your-audio-path.mp3',
    'your-cover-public-id',
    'your-audio-public-id',
    1800,  -- duration in seconds (e.g., 1800 = 30 minutes)
    3.00,  -- price in ₵
    0,     -- initial plays
    true,  -- published status (true/false)
    'English',  -- language
    0.0    -- initial rating
  );
-- Add more audio stories with additional INSERT statements as needed
-- Copy the entire VALUES block for each new audio story

-- ========================================
-- INSERT YOUR ANIMATIONS
-- ========================================
-- Replace placeholders with your actual animation information:
-- - 'Your Animation Title' with the actual title
-- - 'Your Genre' with one of: Romance, Adventure, African Legends, Thriller, Drama, Fantasy
-- - 'Your animation description here...' with actual description
-- - 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-thumbnail-path.jpg' with actual Cloudinary thumbnail URL
-- - 'https://res.cloudinary.com/your-cloud-name/video/upload/v1/your-video-path.mp4' with actual Cloudinary video URL
-- - 'your-thumbnail-public-id' with actual Cloudinary public ID for thumbnail
-- - 'your-video-public-id' with actual Cloudinary public ID for video
-- - Adjust price, duration, and published status as needed

INSERT INTO animations (
  title, 
  genre, 
  description, 
  thumbnail_url, 
  video_url, 
  cloudinary_thumbnail_id, 
  cloudinary_video_id,
  duration,
  price, 
  views,
  published,
  language,
  rating
) VALUES 
  (
    'Your Animation Title', 
    'Your Genre', 
    'Your animation description here...',
    'https://res.cloudinary.com/your-cloud-name/image/upload/v1/your-thumbnail-path.jpg',
    'https://res.cloudinary.com/your-cloud-name/video/upload/v1/your-video-path.mp4',
    'your-thumbnail-public-id',
    'your-video-public-id',
    300,   -- duration in seconds (e.g., 300 = 5 minutes)
    7.00,  -- price in ₵
    0,     -- initial views
    true,  -- published status (true/false)
    'English',  -- language
    0.0    -- initial rating
  );
-- Add more animations with additional INSERT statements as needed
-- Copy the entire VALUES block for each new animation

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Run these to verify your content was added correctly

SELECT 'Stories' as content_type, COUNT(*) as count FROM stories WHERE published = true
UNION ALL
SELECT 'Audio Stories' as content_type, COUNT(*) as count FROM audio_stories WHERE published = true
UNION ALL
SELECT 'Animations' as content_type, COUNT(*) as count FROM animations WHERE published = true;

-- View your newly added stories
SELECT title, genre, price, pages FROM stories WHERE published = true ORDER BY created_at DESC LIMIT 5;

-- View your newly added audio
SELECT title, genre, price, duration FROM audio_stories WHERE published = true ORDER BY created_at DESC LIMIT 5;

-- View your newly added animations
SELECT title, genre, price, duration FROM animations WHERE published = true ORDER BY created_at DESC LIMIT 5;

-- ========================================
-- IMPORTANT NOTES
-- ========================================
-- 1. It's RECOMMENDED to use the admin panel for uploads instead of direct SQL
-- 2. The admin panel handles Cloudinary uploads and URL management automatically
-- 3. Direct SQL should ONLY be used if you already have Cloudinary URLs
-- 4. All media files must be uploaded to Cloudinary first before adding to database
-- 5. The website will only display content with published = true
-- ========================================
