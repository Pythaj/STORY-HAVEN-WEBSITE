# Story Haven - Vercel Deployment Guide

This guide will help you deploy your Story Haven website to Vercel successfully.

## 🚀 Quick Deployment Steps

### Step 1: Prepare Your Repository
1. Make sure all your code is committed and pushed to GitHub
2. Ensure your repository is public or Vercel has access to your private repo

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will automatically detect it's a Next.js project

### Step 3: Configure Build Settings
- **Framework Preset**: Next.js (automatically detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Step 4: Add Environment Variables
Add these environment variables in the Vercel dashboard:

#### Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key

NEXT_PUBLIC_ADMIN_USER=your_admin_username
NEXT_PUBLIC_ADMIN_HASH=your_admin_password_hash
NEXT_PUBLIC_SALT=your_password_salt
ADMIN_SECRET_KEY=your_admin_secret_key

NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
```

#### Optional Variables (for enhanced features):
```
MTN_MOMO_API_KEY=your_mtn_momo_api_key
MTN_MOMO_USER_ID=your_momo_user_id
MTN_MOMO_SUBSCRIPTION_KEY=your_subscription_key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at the provided URL!

## 🔧 Configuration Files Created

### vercel.json
- Optimized for Next.js deployment
- Proper routing configuration
- Function timeout settings for API routes

### Environment Variables Setup
- Graceful handling of missing variables during build
- Proper validation for runtime
- Build-time fallbacks to prevent deployment failures

## 🐛 Troubleshooting Common Issues

### Build Fails with "Missing Environment Variables"
- This is normal! The build will succeed with placeholder values
- Add the real environment variables in the Vercel dashboard
- Redeploy after adding variables

### API Routes Not Working
- Check that environment variables are properly set in Vercel
- Verify API route paths match your requests
- Check Vercel function logs for errors

### Images Not Loading
- Ensure Cloudinary configuration is correct
- Check that images are being served from allowed domains
- Verify NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set

### Admin Panel Issues
- Verify all admin environment variables are set
- Check that the admin credentials match your setup
- Ensure NEXT_PUBLIC_SITE_URL is correct

## 📊 Performance Optimizations

### Automatic Optimizations by Vercel:
- Image optimization
- Static asset compression
- Edge caching
- Serverless function optimization

### Manual Optimizations Applied:
- Optimized Next.js configuration for serverless
- Proper webpack fallbacks for Node.js modules
- External packages configuration for better tree-shaking

## 🔒 Security Notes

1. **Never commit real environment variables** to your repository
2. **Use Vercel's environment variable encryption** for sensitive data
3. **Set up proper CORS** if needed for API routes
4. **Enable Vercel Analytics** for monitoring

## 🚨 Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Admin panel works (if applicable)
- [ ] API routes respond properly
- [ ] Images load from Cloudinary
- [ ] Forms submit correctly
- [ ] Database connections work
- [ ] Email functionality works (if configured)

## 📞 Support

If you encounter issues:
1. Check Vercel's deployment logs
2. Verify all environment variables are set correctly
3. Test the build locally with `npm run build`
4. Check the Vercel documentation for Next.js specific issues

## 🎉 Success!

Your Story Haven website should now be successfully deployed on Vercel! The free tier includes:
- 100GB bandwidth per month
- 1000 serverless function executions
- Global CDN
- Automatic HTTPS
- Custom domains (paid feature)
