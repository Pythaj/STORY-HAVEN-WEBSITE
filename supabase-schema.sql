-- Story Haven Database Schema for Supabase (FREE TIER OPTIMIZED)
-- Run this SQL in your Supabase SQL Editor
-- 
-- IMPORTANT: This schema stores ONLY text data in Supabase
-- All media files (images, PDFs, audio, videos) are stored in Cloudinary
-- This keeps you within Supabase free tier limits (500MB database)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stories Table (URLs point to Cloudinary)
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  description TEXT,
  cover_url TEXT NOT NULL, -- Cloudinary URL
  pdf_url TEXT NOT NULL, -- Cloudinary URL
  cloudinary_cover_id VARCHAR(255), -- For deletion
  cloudinary_pdf_id VARCHAR(255), -- For deletion
  price DECIMAL(10, 2) DEFAULT 5.00,
  views INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  language VARCHAR(50) DEFAULT 'English',
  pages INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audio Stories Table (URLs point to Cloudinary)
CREATE TABLE IF NOT EXISTS audio_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  description TEXT,
  cover_url TEXT NOT NULL, -- Cloudinary URL
  audio_url TEXT NOT NULL, -- Cloudinary URL
  cloudinary_cover_id VARCHAR(255), -- For deletion
  cloudinary_audio_id VARCHAR(255), -- For deletion
  duration INTEGER DEFAULT 0, -- in seconds
  price DECIMAL(10, 2) DEFAULT 3.00,
  plays INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  language VARCHAR(50) DEFAULT 'English',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Animations Table (URLs point to Cloudinary)
CREATE TABLE IF NOT EXISTS animations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL, -- Cloudinary URL
  video_url TEXT NOT NULL, -- Cloudinary URL
  cloudinary_thumbnail_id VARCHAR(255), -- For deletion
  cloudinary_video_id VARCHAR(255), -- For deletion
  duration INTEGER DEFAULT 0, -- in seconds
  price DECIMAL(10, 2) DEFAULT 7.00,
  views INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  language VARCHAR(50) DEFAULT 'English',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases Table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('story', 'audio', 'animation')),
  content_id UUID NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_reference VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stories_published ON stories(published);
CREATE INDEX IF NOT EXISTS idx_stories_genre ON stories(genre);
CREATE INDEX IF NOT EXISTS idx_audio_published ON audio_stories(published);
CREATE INDEX IF NOT EXISTS idx_audio_genre ON audio_stories(genre);
CREATE INDEX IF NOT EXISTS idx_animations_published ON animations(published);
CREATE INDEX IF NOT EXISTS idx_animations_genre ON animations(genre);
CREATE INDEX IF NOT EXISTS idx_purchases_user_email ON purchases(user_email);
CREATE INDEX IF NOT EXISTS idx_purchases_content ON purchases(content_type, content_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audio_stories_updated_at BEFORE UPDATE ON audio_stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_animations_updated_at BEFORE UPDATE ON animations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to published content
CREATE POLICY "Public can view published stories" ON stories
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view published audio" ON audio_stories
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view published animations" ON animations
  FOR SELECT USING (published = true);

-- Admin can do everything (you'll need to set up admin authentication)
-- For now, we'll allow service role to manage everything
CREATE POLICY "Service role can manage stories" ON stories
  FOR ALL USING (true);

CREATE POLICY "Service role can manage audio" ON audio_stories
  FOR ALL USING (true);

CREATE POLICY "Service role can manage animations" ON animations
  FOR ALL USING (true);

CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (true);

CREATE POLICY "Service role can manage purchases" ON purchases
  FOR ALL USING (true);

-- Insert sample data (optional)
-- Note: Replace these URLs with your actual Cloudinary URLs after uploading
INSERT INTO stories (title, genre, description, cover_url, pdf_url, price, views, rating, language, pages, published) VALUES
  ('The Golden Sunset', 'Romance', 'A tale of love that transcends time and space, set against the backdrop of African sunsets.', '/Watermark.jpg', '/sample.pdf', 5.00, 1234, 4.8, 'English', 120, true),
  ('Whispers of the Ancestors', 'African Legends', 'Ancient wisdom meets modern challenges in this captivating journey through heritage.', '/Watermark.jpg', '/sample.pdf', 5.00, 2156, 4.9, 'English', 150, true),
  ('The Adventurer''s Quest', 'Adventure', 'Join our hero on an epic quest filled with danger, mystery, and unexpected friendships.', '/Watermark.jpg', '/sample.pdf', 5.00, 1876, 4.7, 'English', 180, true);

INSERT INTO audio_stories (title, genre, description, cover_url, audio_url, duration, price, plays, rating, language, published) VALUES
  ('Moonlight Tales', 'Fantasy', 'Enchanting stories told under the moonlight.', '/Watermark.jpg', '/sample.mp3', 1800, 3.00, 543, 4.7, 'English', true),
  ('The Warrior''s Song', 'African Legends', 'Epic tales of bravery and honor.', '/Watermark.jpg', '/sample.mp3', 2400, 3.00, 876, 4.9, 'English', true);

INSERT INTO animations (title, genre, description, thumbnail_url, video_url, duration, price, views, rating, language, published) VALUES
  ('The Dancing Fireflies', 'Fantasy', 'A magical animation about fireflies that dance to ancient rhythms.', '/Watermark.jpg', '/sample.mp4', 300, 7.00, 234, 4.8, 'English', true),
  ('Journey to the Stars', 'Adventure', 'An animated adventure through the cosmos.', '/Watermark.jpg', '/sample.mp4', 420, 7.00, 456, 4.6, 'English', true);
