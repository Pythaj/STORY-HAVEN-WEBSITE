-- ========================================
-- HARDEN RLS: SERVICE-ROLE-ONLY WRITE ACCESS
-- ========================================
-- Run this in Supabase SQL Editor.
-- It will:
-- 1) Enable RLS (if not already)
-- 2) Drop any permissive dev policies
-- 3) Create strict policies so only service_role can write (insert/update/delete)
-- 4) Keep public read access for published content
-- ========================================

-- 1) Ensure RLS is enabled
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- 2) Drop permissive dev policies if present
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='App can manage stories (dev)' AND tablename='stories') THEN
    EXECUTE 'DROP POLICY "App can manage stories (dev)" ON stories';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='App can manage audio (dev)' AND tablename='audio_stories') THEN
    EXECUTE 'DROP POLICY "App can manage audio (dev)" ON audio_stories';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='App can manage animations (dev)' AND tablename='animations') THEN
    EXECUTE 'DROP POLICY "App can manage animations (dev)" ON animations';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='App can manage users (dev)' AND tablename='users') THEN
    EXECUTE 'DROP POLICY "App can manage users (dev)" ON users';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='App can manage purchases (dev)' AND tablename='purchases') THEN
    EXECUTE 'DROP POLICY "App can manage purchases (dev)" ON purchases';
  END IF;

  -- Drop older service policies if they exist to avoid duplicates
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Service role can manage stories' AND tablename='stories') THEN
    EXECUTE 'DROP POLICY "Service role can manage stories" ON stories';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Service role can manage audio' AND tablename='audio_stories') THEN
    EXECUTE 'DROP POLICY "Service role can manage audio" ON audio_stories';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Service role can manage animations' AND tablename='animations') THEN
    EXECUTE 'DROP POLICY "Service role can manage animations" ON animations';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Service role can manage users' AND tablename='users') THEN
    EXECUTE 'DROP POLICY "Service role can manage users" ON users';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Service role can manage purchases' AND tablename='purchases') THEN
    EXECUTE 'DROP POLICY "Service role can manage purchases" ON purchases';
  END IF;
END $$;

-- 3) Create strict service_role-only manage policies
-- These allow SELECT/INSERT/UPDATE/DELETE only when auth.role() = 'service_role'
CREATE POLICY "Service role can manage stories" ON stories
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can manage audio" ON audio_stories
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can manage animations" ON animations
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can manage users" ON users
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can manage purchases" ON purchases
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- 4) Keep or create public read policies for published content (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public can view published stories' AND tablename='stories') THEN
    EXECUTE 'CREATE POLICY "Public can view published stories" ON stories FOR SELECT USING (published = true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public can view published audio' AND tablename='audio_stories') THEN
    EXECUTE 'CREATE POLICY "Public can view published audio" ON audio_stories FOR SELECT USING (published = true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public can view published animations' AND tablename='animations') THEN
    EXECUTE 'CREATE POLICY "Public can view published animations" ON animations FOR SELECT USING (published = true)';
  END IF;
END $$;

-- 5) Verify
SELECT tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('stories','audio_stories','animations','users','purchases')
ORDER BY tablename, policyname;
