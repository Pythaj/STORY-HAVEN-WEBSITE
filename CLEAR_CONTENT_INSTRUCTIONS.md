# 🧹 How to Clear Demo Content from Story Haven

## Step-by-Step Instructions

### 1. Access Your Supabase Dashboard
- Go to [https://app.supabase.com](https://app.supabase.com)
- Log in with your credentials
- Select your Story Haven project

### 2. Open the SQL Editor
- In the left sidebar, click on **SQL Editor**
- This will open the query interface

### 3. Run the Safe Clear Script
- Copy the contents of `clear-demo-content-safe.sql`
- Paste it into the SQL Editor
- Click **Run** or press Ctrl+Enter

### 4. Verify the Results
- The script will show you counts before and after
- All content tables should show 0 items remaining
- Your database schema is preserved

## ✅ What This Script Does

- **Counts existing content** before deletion
- **Removes all demo stories** from the stories table
- **Removes all demo audio** from the audio_stories table
- **Removes all demo animations** from the animations table
- **Preserves user accounts** and other important data
- **Verifies deletion** was successful

## ⚠️ Safety Features

- **Does NOT drop tables** - preserves your schema
- **Does NOT affect users table** - your accounts are safe
- **Does NOT affect settings** - all configurations preserved
- **Shows before/after counts** - you can verify what was removed

## 🔄 After Running the Script

1. **Go to your admin panel** at `http://localhost:3000/admin`
2. **Upload your own content** - stories, audio, and animations
3. **See your content live** - it will appear immediately on the site
4. **Manage everything** - edit, delete, or add more content anytime

## 🎯 Ready to Add Your Content?

Your database is now clean and ready for your own stories!

Just navigate to the admin panel and start uploading:
- **Stories** with PDF files and cover images
- **Audio** with MP3 files and album art
- **Animations** with MP4 files and thumbnails

All your uploads will be beautifully displayed with covers and titles!
