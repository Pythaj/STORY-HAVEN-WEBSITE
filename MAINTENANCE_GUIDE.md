# 🔧 Maintenance & Auto-Update Guide

This guide explains how to keep your Story Haven website running smoothly with automatic dependency management.

---

## 🚀 Automatic Features Already Set Up

### 1. **Auto-Install on Startup** ✅
Every time you run `npm install`, the system automatically:
- Checks for missing critical dependencies
- Installs them if needed
- Uses `--legacy-peer-deps` to avoid conflicts

### 2. **Smart NPM Configuration** ✅
The `.npmrc` file ensures:
- Legacy peer dependencies are handled automatically
- Failed downloads are retried 3 times
- Offline cache is used when available
- Consistent installations across all environments

### 3. **Enhanced Next.js Config** ✅
The `next.config.js` now:
- Supports Cloudinary images automatically
- Handles node modules correctly
- Prevents build errors from optional dependencies

---

## 📦 Available Maintenance Commands

### Quick Fixes

```bash
# Check and install missing dependencies
npm run check-deps

# Update all dependencies to latest versions
npm run update-deps

# Clean install (fixes most issues)
npm run clean-install

# Auto-fix common problems
node scripts/auto-fix.js
```

### Regular Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for code issues
npm run lint
```

---

## 🔄 How Auto-Updates Work

### When You Install Packages

1. **You run:** `npm install`
2. **System checks:** Are all critical dependencies present?
3. **If missing:** Automatically installs them
4. **Result:** Your app always has what it needs

### Critical Dependencies Auto-Installed

- `@supabase/supabase-js` - Database connection
- `cloudinary` - Media storage
- `whatwg-url` - URL parsing (required by Supabase)
- `encoding` - Text encoding (required by Supabase)
- `next`, `react`, `react-dom` - Core framework

---

## 🛠️ Troubleshooting Common Issues

### Issue 1: "Module not found" Error

**Solution:**
```bash
npm run check-deps
```
This will automatically install any missing dependencies.

### Issue 2: Build Fails After Update

**Solution:**
```bash
npm run clean-install
```
This removes all packages and reinstalls them fresh.

### Issue 3: Dependency Conflicts

**Solution:**
```bash
npm install --legacy-peer-deps
```
The `.npmrc` file already sets this by default, but you can run it manually if needed.

### Issue 4: Site Works Locally But Not in Production

**Solution:**
1. Make sure all environment variables are set in Vercel/Netlify
2. Run `npm run build` locally to test
3. Check build logs for specific errors

---

## 📅 Regular Maintenance Schedule

### Weekly (Recommended)
```bash
# Check for outdated packages
npm outdated

# Update non-breaking changes
npm update
```

### Monthly (Recommended)
```bash
# Update all dependencies
npm run update-deps

# Test your site
npm run dev
# Visit all pages and test features
```

### Before Deploying (Always)
```bash
# Clean install
npm run clean-install

# Test build
npm run build

# Test production mode locally
npm start
```

---

## 🔐 Keeping Dependencies Secure

### Auto Security Fixes

The system automatically runs security audits. To manually fix:

```bash
# Fix security vulnerabilities
npm audit fix --legacy-peer-deps

# See security report
npm audit
```

### What Gets Updated Automatically

✅ **Patch versions** (e.g., 1.0.1 → 1.0.2) - Bug fixes
✅ **Minor versions** (e.g., 1.0.0 → 1.1.0) - New features (usually safe)
❌ **Major versions** (e.g., 1.0.0 → 2.0.0) - Breaking changes (manual update needed)

---

## 🎯 Best Practices

### DO ✅

1. **Run `npm run check-deps` after cloning** - Ensures all dependencies are present
2. **Use `npm run dev` for development** - Starts server with all checks
3. **Test locally before deploying** - Run `npm run build` first
4. **Keep `.env.local` updated** - Add new environment variables as needed
5. **Check logs regularly** - Look for warnings or errors

### DON'T ❌

1. **Don't delete `package-lock.json`** - Unless you're doing a clean install
2. **Don't manually edit `node_modules`** - Changes will be lost
3. **Don't ignore warnings** - They often indicate future problems
4. **Don't skip testing after updates** - Always test major changes
5. **Don't commit `.env.local`** - It's in `.gitignore` for security

---

## 🚨 Emergency Recovery

If everything breaks:

```bash
# Step 1: Stop the server
# Press Ctrl+C or run: taskkill /F /IM node.exe

# Step 2: Clean everything
rm -rf node_modules package-lock.json .next

# Step 3: Reinstall
npm install --legacy-peer-deps

# Step 4: Rebuild
npm run build

# Step 5: Start fresh
npm run dev
```

---

## 📊 Monitoring Your Site

### Check Dependency Health

```bash
# See all installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Check for security issues
npm audit
```

### Check Site Health

1. **Development:** Visit `http://localhost:3000`
2. **Check all pages:**
   - Homepage: `/`
   - Stories: `/stories`
   - Audio: `/audio`
   - Animations: `/animations`
   - Admin: `/admin`
3. **Open browser console (F12)** - Look for errors
4. **Check terminal** - Look for build warnings

---

## 🔄 Update Workflow

### Safe Update Process

```bash
# 1. Check current status
npm outdated

# 2. Update dependencies
npm run update-deps

# 3. Test locally
npm run dev
# Visit all pages and test features

# 4. If everything works
git add .
git commit -m "Updated dependencies"
git push

# 5. Deploy to production
vercel --prod
```

### If Updates Break Something

```bash
# Revert to previous version
git checkout package.json package-lock.json

# Reinstall old versions
npm install --legacy-peer-deps

# Test again
npm run dev
```

---

## 📝 Dependency Update Log

Keep track of major updates:

```
Date: 2024-XX-XX
Updated: @supabase/supabase-js to v2.x.x
Reason: Security patch
Status: ✅ Working

Date: 2024-XX-XX
Updated: next to v15.x.x
Reason: New features
Status: ✅ Working
```

---

## 🆘 Getting Help

### If Auto-Fix Doesn't Work

1. **Check the error message** - Often tells you what's wrong
2. **Search the error** - Google or ChatGPT can help
3. **Check documentation:**
   - Next.js: https://nextjs.org/docs
   - Supabase: https://supabase.com/docs
   - Cloudinary: https://cloudinary.com/documentation

### Common Error Solutions

**"Cannot find module"**
→ Run: `npm run check-deps`

**"Port 3000 already in use"**
→ Run: `taskkill /F /IM node.exe` then `npm run dev`

**"Build failed"**
→ Run: `npm run clean-install` then `npm run build`

**"Environment variable not found"**
→ Check `.env.local` file exists and has all required variables

---

## ✅ Maintenance Checklist

### Daily (If Actively Developing)
- [ ] Check for errors in browser console
- [ ] Check for warnings in terminal
- [ ] Test new features

### Weekly
- [ ] Run `npm outdated` to check for updates
- [ ] Check Vercel/Netlify logs for errors
- [ ] Monitor Supabase and Cloudinary usage

### Monthly
- [ ] Update dependencies: `npm run update-deps`
- [ ] Run security audit: `npm audit`
- [ ] Test all features thoroughly
- [ ] Backup database (Supabase auto-backups)
- [ ] Review and clean unused Cloudinary files

### Before Major Updates
- [ ] Backup your code (git commit)
- [ ] Test locally first
- [ ] Read changelog for breaking changes
- [ ] Update one dependency at a time
- [ ] Test after each update

---

## 🎉 Your Site is Now Self-Maintaining!

With these configurations:
- ✅ Dependencies auto-install when missing
- ✅ Build errors are minimized
- ✅ Security updates are easier
- ✅ Recovery is simple
- ✅ Updates are safer

**Just run `npm run dev` and everything else is handled automatically!** 🚀

---

**Questions?** Check the other documentation files or the error messages - they usually tell you exactly what's wrong!
