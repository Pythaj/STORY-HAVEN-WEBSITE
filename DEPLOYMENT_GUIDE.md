# 🚀 Story Haven Deployment Guide

This guide will help you deploy your Story Haven website with Supabase (database) and Cloudinary (media storage).

## 📋 Prerequisites

Before deploying, you need:
1. **Supabase Account** (free tier available)
2. **Cloudinary Account** (free tier available)
3. **Vercel/Netlify Account** (for hosting)
4. **Payment Gateway Accounts** (Paystack, MTN MoMo)

---

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Project Name**: story-haven
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**

### 1.2 Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase-schema.sql` from your project
3. Copy all the SQL code
4. Paste it into the SQL Editor
5. Click **"Run"**

This will create all necessary tables:
- `stories` - For written stories
- `audio_stories` - For audio content
- `animations` - For video content
- `purchases` - For tracking sales
- `users` - For user management

### 1.3 Get Your Supabase Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this SECRET!

---

## 📸 Step 2: Set Up Cloudinary

### 2.1 Create Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Verify your email

### 2.2 Get Your Cloudinary Credentials

1. Go to your **Dashboard**
2. Copy these values:
   - **Cloud Name** (e.g., `dxxxxxx`)
   - **API Key** (numeric value)
   - **API Secret** (alphanumeric string) - Keep this SECRET!

### 2.3 Create Upload Presets (Optional)

1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click **"Add upload preset"**
4. Create presets for:
   - `story-covers` (for book covers)
   - `audio-covers` (for audio thumbnails)
   - `video-thumbnails` (for animation thumbnails)

---

## 🔐 Step 3: Configure Environment Variables

### 3.1 Create `.env.local` File

In your project root, create a file named `.env.local` and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Configuration
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
MTN_MOMO_API_KEY=your_mtn_momo_api_key
MTN_MOMO_USER_ID=your_momo_user_id
MTN_MOMO_SUBSCRIPTION_KEY=your_subscription_key

# Admin Configuration
NEXT_PUBLIC_ADMIN_USER=admin
NEXT_PUBLIC_ADMIN_HASH=your_hashed_password_here
NEXT_PUBLIC_SALT=your_unique_salt_here_change_this
ADMIN_SECRET_KEY=your_secret_key_for_encryption

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3.2 Replace Placeholder Values

Replace all `your_xxx` values with your actual credentials from Steps 1 and 2.

⚠️ **IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`.

---

## 🌐 Step 4: Deploy to Vercel (Recommended)

### 4.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 4.2 Login to Vercel

```bash
vercel login
```

### 4.3 Deploy

```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

### 4.4 Add Environment Variables in Vercel

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **Settings** → **Environment Variables**
3. Add all variables from your `.env.local` file
4. Make sure to add them for **Production**, **Preview**, and **Development**

### 4.5 Redeploy

After adding environment variables:
```bash
vercel --prod
```

---

## 🎯 Alternative: Deploy to Netlify

### 4.1 Install Netlify CLI

```bash
npm install -g netlify-cli
```

### 4.2 Login to Netlify

```bash
netlify login
```

### 4.3 Initialize and Deploy

```bash
# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### 4.4 Add Environment Variables

1. Go to your site on [netlify.com](https://netlify.com)
2. Click **Site settings** → **Environment variables**
3. Add all variables from your `.env.local` file

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Database Connection

1. Visit your deployed site
2. Go to `/stories` page
3. You should see "No stories found" (if database is empty)
4. No errors in browser console = Success! ✅

### 5.2 Test Admin Dashboard

1. Go to `/admin`
2. Login with your admin credentials
3. Try uploading a test story

### 5.3 Upload Your First Story

1. Login to admin dashboard
2. Click **"Stories"** tab
3. Fill in story details:
   - Title
   - Genre
   - Description
   - Price
4. Upload cover image (will go to Cloudinary)
5. Upload PDF file (will go to Cloudinary)
6. Click **"Publish"**
7. Visit `/stories` to see it live!

---

## 🔧 Step 6: Configure Custom Domain (Optional)

### For Vercel:

1. Go to your project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

### For Netlify:

1. Go to **Domain settings**
2. Add custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

---

## 📊 Step 7: Monitor Your Site

### Supabase Dashboard

- View database tables
- Monitor API usage
- Check logs

### Cloudinary Dashboard

- View uploaded media
- Monitor bandwidth usage
- Check storage

### Vercel/Netlify Dashboard

- View deployment logs
- Monitor site performance
- Check analytics

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: "Failed to fetch stories"

**Solution**:
1. Check Supabase URL and keys in environment variables
2. Verify database schema was created successfully
3. Check Supabase dashboard for errors

### Cloudinary Upload Issues

**Problem**: "Failed to upload file"

**Solution**:
1. Verify Cloudinary credentials
2. Check file size limits (free tier: 10MB)
3. Ensure correct resource type (image/video/raw)

### Build Errors

**Problem**: Build fails during deployment

**Solution**:
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run lint
```

### Environment Variables Not Working

**Problem**: Site works locally but not in production

**Solution**:
1. Verify all environment variables are added in hosting platform
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

---

## 🔒 Security Checklist

Before going live:

- [ ] All API keys are in environment variables (not hardcoded)
- [ ] `.env.local` is in `.gitignore`
- [ ] Supabase Row Level Security (RLS) is enabled
- [ ] Admin password is strong and hashed
- [ ] HTTPS is enabled (automatic with Vercel/Netlify)
- [ ] Payment webhooks are configured
- [ ] CORS is properly configured

---

## 📈 Post-Deployment Tasks

1. **Add Content**: Upload your stories, audio, and animations
2. **Test Payments**: Make test purchases with test payment keys
3. **Set Up Analytics**: Add Google Analytics or similar
4. **Configure Email**: Set up SMTP for notifications
5. **Backup Database**: Set up regular Supabase backups
6. **Monitor Performance**: Use Vercel/Netlify analytics

---

## 🆘 Need Help?

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Cloudinary Docs**: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)

---

## 🎉 You're Live!

Congratulations! Your Story Haven website is now live and ready to share your stories with the world! 🌟

**Next Steps**:
- Share your site URL
- Start uploading content
- Promote on social media
- Gather user feedback
- Keep creating amazing stories!

---

**Built with ❤️ for Dray Harmony**
