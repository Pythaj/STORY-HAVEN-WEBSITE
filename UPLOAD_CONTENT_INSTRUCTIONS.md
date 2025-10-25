# 📤 How to Upload Your Content to Story Haven

## 🎯 Recommended Approach: Use the Admin Panel

The **easiest and safest** way to add your content is through the admin panel:

### 1. Access the Admin Panel
- Go to: `http://localhost:3000/admin`
- Log in with your admin credentials

### 2. Choose Content Type
- Click on **Stories**, **Audio**, or **Animations** tab

### 3. Upload New Content
- Click **Upload New** button
- Fill in all required fields:
  - **Title** (required)
  - **Description** (recommended)
  - **Genre** (select from dropdown)
  - **Price** (adjust if needed)
  - **Pages/Duration** (for stories/audio/animations respectively)

### 4. Add Media Files
- **Cover Image/Thumbnail**: Click or drag to upload
- **Content File**: 
  - Stories: PDF file
  - Audio: MP3 file
  - Animations: MP4 file

### 5. Publish
- Click **Publish Now** to make it live immediately
- Or click **Save as Draft** to save for later

## 🛠️ Advanced Approach: Direct SQL (NOT Recommended)

Only use this if you have Cloudinary URLs ready:

### 1. Upload Files to Cloudinary First
- Upload all images, PDFs, MP3s, and MP4s to Cloudinary
- Get the URLs and Public IDs for each file

### 2. Edit the Template File
- Open `my-content-template.sql`
- Replace all placeholder values with your actual content

### 3. Run in Supabase SQL Editor
- Copy your edited INSERT statements
- Paste and run in Supabase SQL Editor

## 📋 Content Requirements

### Stories
- **Title**: Descriptive story title
- **Genre**: Romance, Adventure, African Legends, Thriller, Drama, or Fantasy
- **Description**: Engaging story summary (1-3 sentences)
- **Cover Image**: High-quality JPG or PNG (recommended: 1200x800px)
- **PDF File**: Your complete story in PDF format
- **Price**: Default ₵5.00 (adjust as needed)
- **Pages**: Number of pages in your story

### Audio Stories
- **Title**: Descriptive audio title
- **Genre**: Romance, Adventure, African Legends, Thriller, Drama, or Fantasy
- **Description**: Engaging audio summary (1-3 sentences)
- **Cover Image**: Album art JPG or PNG (recommended: 1200x1200px)
- **Audio File**: MP3 format
- **Price**: Default ₵3.00 (adjust as needed)
- **Duration**: In seconds (e.g., 1800 for 30 minutes)

### Animations
- **Title**: Descriptive animation title
- **Genre**: Romance, Adventure, African Legends, Thriller, Drama, or Fantasy
- **Description**: Engaging animation summary (1-3 sentences)
- **Thumbnail**: Video thumbnail JPG or PNG (recommended: 1200x800px)
- **Video File**: MP4 format
- **Price**: Default ₵7.00 (adjust as needed)
- **Duration**: In seconds (e.g., 300 for 5 minutes)

## ✅ Best Practices

### File Preparation
1. **Cover Images**: 
   - Size: 1200x800px (3:2 ratio) for stories/animations
   - Size: 1200x1200px (1:1 ratio) for audio
   - Format: JPG or PNG
   - Quality: High resolution

2. **Content Files**:
   - Stories: PDF, optimized for web (under 50MB)
   - Audio: MP3, good quality (under 100MB)
   - Animations: MP4, H.264 codec (under 500MB)

### Metadata
1. **Titles**: Clear and descriptive
2. **Descriptions**: Engaging, 50-200 words
3. **Genres**: Accurate categorization
4. **Prices**: Consistent with content type
5. **Publishing**: Only publish when complete and tested

## 🎨 What Readers Will See

After uploading, your content will appear beautifully on:
- **Homepage**: Featured content carousels
- **Stories Page**: Grid with cover images and titles
- **Audio Page**: Cards with album art and play buttons
- **Animations Page**: Video thumbnails with play icons

Each piece will display:
- ✅ Cover image prominently
- ✅ Title in large, readable font
- ✅ Genre tag
- ✅ Price clearly marked
- ✅ Description preview
- ✅ Stats (views/plays, duration/pages)

## 🔄 Content Management

### Editing Content
1. Go to admin panel
2. Find your content in the grid
3. Click **Edit** button
4. Update any fields
5. Save changes

### Deleting Content
1. Go to admin panel
2. Find your content
3. Click red **Delete** button
4. Confirm deletion
5. Content is removed from database AND Cloudinary

## ⚠️ Important Notes

1. **Admin Panel is Easiest**: Handles all Cloudinary uploads automatically
2. **No Direct SQL Needed**: Unless you have special requirements
3. **Files Stored in Cloudinary**: Not in your database (keeps you in free tier)
4. **Metadata in Supabase**: Only text information is stored in database
5. **Live Preview**: Content appears immediately after publishing

## 🚀 Ready to Start?

1. Go to `http://localhost:3000/admin`
2. Click **Stories**, **Audio**, or **Animations**
3. Click **Upload New**
4. Add your first piece of content!

Your readers will love the beautiful presentation with cover images and clear titles!
