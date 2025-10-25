# ✅ Quick Start Checklist - Story Haven

## Before You Start
- [ ] Node.js installed (v18 or higher)
- [ ] Code editor (VS Code recommended)
- [ ] Internet connection

---

## 🗄️ Supabase Setup (FREE - No Credit Card)

### Create Account
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Sign up (GitHub or Email)
- [ ] Create new project named "story-haven"
- [ ] Save your database password somewhere safe

### Set Up Database
- [ ] Open SQL Editor in Supabase
- [ ] Copy all code from `supabase-schema.sql`
- [ ] Paste and run in SQL Editor
- [ ] See "Success" message

### Get Your Keys
- [ ] Go to Settings → API
- [ ] Copy Project URL
- [ ] Copy anon/public key
- [ ] Save both keys

---

## 📸 Cloudinary Setup (FREE - No Credit Card)

### Create Account
- [ ] Go to [cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
- [ ] Sign up
- [ ] Verify email

### Get Your Keys
- [ ] Go to Dashboard
- [ ] Copy Cloud Name
- [ ] Copy API Key
- [ ] Click eye icon and copy API Secret
- [ ] Save all three

---

## 💻 Local Setup

### Install Dependencies
- [ ] Open terminal in project folder
- [ ] Run: `npm install`
- [ ] Wait for installation to complete

### Configure Environment
- [ ] Create file named `.env.local` in project root
- [ ] Copy template from `FREE_TIER_SETUP.md`
- [ ] Replace all `your_xxx` with your actual keys
- [ ] Save file

### Test Locally
- [ ] Run: `npm run dev`
- [ ] Open browser: `http://localhost:3000`
- [ ] Homepage loads without errors
- [ ] Go to `/stories` - shows "No stories found"
- [ ] Go to `/admin` - login page appears
- [ ] Login with: admin / storyhaven2024
- [ ] Admin dashboard loads

---

## 🚀 Deploy to Vercel (FREE - No Credit Card)

### Create Account
- [ ] Go to [vercel.com/signup](https://vercel.com/signup)
- [ ] Sign up with GitHub

### Deploy Site
- [ ] Click "Add New..." → "Project"
- [ ] Import your repository
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Site is live!

### Add Environment Variables
- [ ] Go to project Settings → Environment Variables
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase URL
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase key
- [ ] Add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` with your Cloudinary name
- [ ] Add `CLOUDINARY_API_KEY` with your Cloudinary key
- [ ] Add `CLOUDINARY_API_SECRET` with your Cloudinary secret
- [ ] Add `NEXT_PUBLIC_ADMIN_USER` = admin
- [ ] Add `NEXT_PUBLIC_ADMIN_HASH` = storyhaven2024
- [ ] Add `NEXT_PUBLIC_SITE_URL` with your Vercel URL
- [ ] Click "Redeploy" in Deployments tab

---

## 🎨 Upload Your First Story

### Prepare Files
- [ ] Cover image (JPEG, under 500KB)
- [ ] Story PDF (under 10MB)
- [ ] Compress if needed

### Upload via Admin
- [ ] Go to your-site.vercel.app/admin
- [ ] Login with admin credentials
- [ ] Click "Stories" tab
- [ ] Click "Add New Story"
- [ ] Fill in title, genre, description, price
- [ ] Upload cover image
- [ ] Upload PDF file
- [ ] Click "Publish"
- [ ] Go to `/stories` page
- [ ] Your story appears! 🎉

---

## 🔍 Verify Everything Works

### Test Stories Page
- [ ] Stories load from database
- [ ] Images display correctly
- [ ] Search works
- [ ] Genre filters work
- [ ] Click story opens detail page

### Test Admin Dashboard
- [ ] Can create new stories
- [ ] Can upload images to Cloudinary
- [ ] Can upload PDFs to Cloudinary
- [ ] Can edit existing stories
- [ ] Can delete stories
- [ ] Can view sales stats

### Test Payment (When Ready)
- [ ] Add Paystack test keys to environment variables
- [ ] Try test purchase
- [ ] Payment modal opens
- [ ] Can complete test transaction

---

## 📊 Monitor Your Usage

### Weekly Checks
- [ ] Check Supabase database size (should be under 500MB)
- [ ] Check Cloudinary storage (should be under 25GB)
- [ ] Check Vercel bandwidth (should be under 100GB/month)

### Monthly Tasks
- [ ] Delete old test data
- [ ] Optimize large images
- [ ] Review and remove unused files from Cloudinary

---

## 🎯 Optional Enhancements

### When You're Ready
- [ ] Add custom domain ($10-15/year)
- [ ] Set up Paystack live keys
- [ ] Set up MTN MoMo integration
- [ ] Add Google Analytics
- [ ] Set up email notifications
- [ ] Create social media accounts
- [ ] Add more content

---

## ✅ You're Done!

Your Story Haven website is:
- ✅ Live on the internet
- ✅ Connected to database
- ✅ Storing media files
- ✅ Ready to accept content
- ✅ 100% FREE (no billing accounts needed)

**Your site URL:** `https://your-project.vercel.app`

**Share it with the world!** 🌟

---

## 🆘 Need Help?

If you get stuck:
1. Check `FREE_TIER_SETUP.md` for detailed instructions
2. Check browser console for errors (F12)
3. Check Vercel deployment logs
4. Check Supabase logs
5. Make sure all environment variables are correct

**Common Issues:**
- Site works locally but not online → Check environment variables in Vercel
- Images not loading → Check Cloudinary credentials
- Database errors → Make sure SQL schema was run in Supabase
- Admin login fails → Check admin credentials in environment variables

---

**You've got this! 💪**
