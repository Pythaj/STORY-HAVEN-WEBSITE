# 📋 **VERCEL SETUP CHECKLIST - KEEP THIS OPEN!**

## 🎯 **FOLLOW ALONG AS YOU GO**

---

## ✅ **STEP 1: CREATE ACCOUNT**
- [ ] Open https://vercel.com
- [ ] Click "Sign Up" (top right)
- [ ] Choose "Continue with GitHub"
- [ ] Sign in with GitHub account
- [ ] Select Hobby plan (free)
- [ ] Verify email if needed

---

## ✅ **STEP 2: CREATE PROJECT**
- [ ] Click "Import Project"
- [ ] Connect GitHub account
- [ ] Find "story-haven-website" repository
- [ ] Click "Import"
- [ ] Project name: `story-haven`
- [ ] Framework: Next.js (auto-detected)
- [ ] Click "Deploy"

---

## ✅ **STEP 3: GET TOKEN**
- [ ] Wait for deployment to complete
- [ ] Click profile (top right) → Settings
- [ ] Click "Tokens" → "Create Token"
- [ ] Name: "Story Haven Deployment"
- [ ] Copy token (save safely!)

---

## ✅ **STEP 4: GET PROJECT ID**
- [ ] Go to your project (story-haven)
- [ ] Click "Settings" → "General"
- [ ] Scroll to "Project ID"
- [ ] Copy ID (starts with prj_)

---

## ✅ **STEP 5: ADD TO GITHUB**
- [ ] Open GitHub repository
- [ ] Settings → Secrets and variables → Actions
- [ ] New repository secret
- [ ] Name: VERCEL_TOKEN, Value: [paste token]
- [ ] Name: VERCEL_PROJECT_ID, Value: [paste ID]

---

## ✅ **STEP 6: FINAL PUSH**
- [ ] Terminal: git add . && git commit -m "Deploy"
- [ ] Terminal: git push origin main
- [ ] Wait for GitHub Actions
- [ ] Site goes live! 🎉

---

## 📝 **COPY THESE VALUES:**

### **VERCEL_TOKEN:** [paste here when you get it]
### **PROJECT_ID:** [paste here when you get it]

---

## 🔍 **WHAT TO LOOK FOR:**

### **✅ Success Signs:**
- Green checkmark in Vercel
- URL loads your website
- All pages working
- Admin panel accessible

### **❌ If Issues:**
- Check GitHub Actions logs
- Verify all secrets added
- Try creating new token

---

**Keep this checklist open while setting up Vercel!** 📋

**Mark each box as you complete it!** ✅
