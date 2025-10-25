# 🆓 FREE TIER SETUP GUIDE - No Billing Required!

This guide shows you how to set up Story Haven using **100% FREE services** without needing any billing accounts.

## 📊 What Goes Where (FREE TIER STRATEGY)

### Supabase (FREE: 500MB Database)
✅ **Stores ONLY text data:**
- Story titles, descriptions, genres
- Audio metadata
- Animation metadata
- Purchase records
- User information

❌ **Does NOT store:**
- Images
- PDFs
- Audio files
- Video files

### Cloudinary (FREE: 25GB Storage, 25GB Bandwidth/month)
✅ **Stores ALL media files:**
- Book cover images
- PDF story files
- Audio files (MP3)
- Video files (MP4)
- Thumbnails

---

## 🚀 Quick Setup (30 Minutes)

### Step 1: Create Supabase Account (5 min)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"Start your project"**
3. Sign up with GitHub or Email (FREE - no credit card needed!)
4. Click **"New Project"**
5. Fill in:
   - **Name**: `story-haven`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: FREE (already selected)
6. Click **"Create new project"** (takes 2-3 minutes)

### Step 2: Set Up Database (5 min)

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase-schema.sql` from your project folder
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **"Run"** or press `Ctrl+Enter`
7. You should see: ✅ "Success. No rows returned"

### Step 3: Get Supabase Keys (2 min)

1. Click **Settings** (gear icon) → **API**
2. Copy these 2 values:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **DO NOT** copy the `service_role` key - you don't need it for free tier!

### Step 4: Create Cloudinary Account (5 min)

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up (FREE - no credit card needed!)
3. Verify your email
4. Complete the quick survey (optional)

### Step 5: Get Cloudinary Keys (2 min)

1. Go to your Dashboard (automatically opens after signup)
2. You'll see your credentials at the top:

```
Cloud name: dxxxxxxxx
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz
```

3. Click the **"eye" icon** to reveal API Secret
4. Copy all three values

### Step 6: Configure Your Project (5 min)

1. Open your project folder
2. Create a file named `.env.local` (note the dot at the start!)
3. Copy this template:

```env
# Supabase (FREE - Database only)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Cloudinary (FREE - All media files)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Login
NEXT_PUBLIC_ADMIN_USER=admin
NEXT_PUBLIC_ADMIN_HASH=storyhaven2024

# Payment (Add later when ready)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Replace the `your_xxx` values with your actual keys from Steps 3 and 5
5. Save the file

### Step 7: Test Locally (5 min)

Open terminal in your project folder:

```bash
# Install dependencies (if not done yet)
npm install

# Start development server
npm run dev
```

Open browser: [http://localhost:3000](http://localhost:3000)

**Test checklist:**
- ✅ Homepage loads
- ✅ Go to `/stories` - should show "No stories found"
- ✅ Go to `/admin` - login with `admin` / `storyhaven2024`
- ✅ No errors in browser console (F12)

### Step 8: Deploy to Vercel (FREE) (5 min)

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub (FREE - no credit card!)
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository (or upload folder)
5. Click **"Deploy"** (Vercel auto-detects Next.js)
6. Wait 2-3 minutes for deployment

### Step 9: Add Environment Variables to Vercel (3 min)

1. In Vercel, go to your project
2. Click **Settings** → **Environment Variables**
3. Add each variable from your `.env.local` file:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project.supabase.co`
   - Click **"Add"**
4. Repeat for ALL variables
5. After adding all, click **"Redeploy"** in Deployments tab

---

## 📦 Free Tier Limits

### Supabase FREE Tier
- ✅ 500MB Database Storage
- ✅ 5GB Bandwidth
- ✅ 50,000 Monthly Active Users
- ✅ 500MB File Storage (we're NOT using this)
- ✅ Unlimited API requests

**Perfect for:** Thousands of stories with text data!

### Cloudinary FREE Tier
- ✅ 25 GB Storage
- ✅ 25 GB Bandwidth/month
- ✅ 25,000 Transformations/month
- ✅ Unlimited uploads

**Perfect for:** Hundreds of stories with images, PDFs, audio, and videos!

### Vercel FREE Tier
- ✅ 100 GB Bandwidth
- ✅ Unlimited websites
- ✅ Automatic HTTPS
- ✅ Global CDN

**Perfect for:** Hosting your entire website!

---

## 💡 Tips to Stay Within Free Limits

### For Supabase:
1. ✅ Only store text data (titles, descriptions, prices)
2. ✅ Store URLs to Cloudinary (not actual files)
3. ✅ Regularly check database size in Supabase dashboard
4. ✅ Delete old test data

### For Cloudinary:
1. ✅ Optimize images before upload (compress to <500KB)
2. ✅ Use appropriate formats (JPEG for photos, PNG for graphics)
3. ✅ For PDFs: Keep under 10MB per file
4. ✅ For audio: Use MP3 format, 128kbps quality
5. ✅ For videos: Compress to 720p, use MP4 format
6. ✅ Delete unused/test files regularly

### For Vercel:
1. ✅ Enable caching (automatic with Next.js)
2. ✅ Use Image Optimization (automatic)
3. ✅ Monitor bandwidth in Vercel dashboard

---

## 🎯 How to Upload Your First Story

1. **Login to Admin Dashboard**
   - Go to `your-site.vercel.app/admin`
   - Login: `admin` / `storyhaven2024`

2. **Prepare Your Files**
   - Cover image: JPEG, max 500KB
   - Story PDF: max 10MB
   - Compress if needed: [tinypng.com](https://tinypng.com) for images

3. **Upload Story**
   - Click **"Stories"** tab
   - Click **"Add New Story"**
   - Fill in details:
     - Title: "My First Story"
     - Genre: "Adventure"
     - Description: "An amazing tale..."
     - Price: 5.00
   - Upload cover image → Goes to Cloudinary ✅
   - Upload PDF file → Goes to Cloudinary ✅
   - Click **"Publish"**

4. **View Live**
   - Go to `/stories` page
   - Your story appears! 🎉

---

## 🔍 How to Check Your Usage

### Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click your project
3. Click **"Database"** → See database size
4. Click **"Settings"** → **"Usage"** → See all metrics

### Cloudinary Dashboard
1. Go to [https://cloudinary.com/console](https://cloudinary.com/console)
2. See usage at top:
   - Storage used
   - Bandwidth used this month
   - Transformations used

### Vercel Dashboard
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click **"Analytics"** → See bandwidth usage

---

## ❓ Common Questions

**Q: Will I be charged automatically?**
A: NO! Free tiers don't require credit cards. You'll never be charged.

**Q: What happens if I exceed free limits?**
A: Services will stop working until next month OR you can upgrade. You'll get warnings before hitting limits.

**Q: Can I use this for a real business?**
A: YES! Many successful sites start on free tiers. Upgrade when you grow.

**Q: How many stories can I host?**
A: With free tiers:
- **Text data**: Thousands of stories (Supabase 500MB)
- **Media files**: ~500 stories with images and PDFs (Cloudinary 25GB)
- **Traffic**: ~50,000 visitors/month (Vercel 100GB bandwidth)

**Q: Do I need a custom domain?**
A: No! Vercel gives you `your-site.vercel.app` for free. Custom domains cost $10-15/year separately.

**Q: Can I monetize my site on free tier?**
A: YES! You can accept payments with Paystack/MTN MoMo. The hosting is free, but payment processors charge small fees per transaction.

---

## 🎉 You're All Set!

Your Story Haven website is now running on 100% FREE infrastructure:
- ✅ Supabase: Database (no billing account needed)
- ✅ Cloudinary: Media storage (no billing account needed)
- ✅ Vercel: Hosting (no billing account needed)

**Next steps:**
1. Upload your stories
2. Share your site URL
3. Start selling!
4. Monitor your usage
5. Upgrade when you grow 🚀

---

## 🆘 Troubleshooting

**Problem: "Failed to fetch stories"**
- Check Supabase URL and key in `.env.local`
- Make sure you ran the SQL schema
- Check browser console for errors

**Problem: "Failed to upload image"**
- Check Cloudinary credentials
- Make sure image is under 10MB
- Try a different image format

**Problem: Site works locally but not on Vercel**
- Make sure ALL environment variables are added in Vercel
- Redeploy after adding variables
- Check Vercel deployment logs for errors

**Problem: "Database connection failed"**
- Supabase project might be paused (free tier pauses after 7 days of inactivity)
- Go to Supabase dashboard and click "Resume project"

---

**Built with ❤️ for creators who want to start FREE!**
