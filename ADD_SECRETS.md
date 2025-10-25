# 🔐 **ADD VERCEL SECRETS TO GITHUB**

## 📋 **EXACT STEPS YOU NEED TO FOLLOW**

---

## 🎯 **STEP 1: GO TO GITHUB REPOSITORY**

### **📍 Find Your Repository:**
1. **Go to:** https://github.com
2. **Sign in** to your GitHub account
3. **Find your repository:** `story-haven-website`
4. **Click on it** to open

---

## 🎯 **STEP 2: OPEN SECRETS SETTINGS**

### **📍 Navigate to Secrets:**
1. **Click "Settings"** tab (near the top)
2. **Scroll down** and click **"Secrets and variables"**
3. **Click "Actions"** (in the left sidebar)
4. **You should see:** "Repository secrets"

---

## 🎯 **STEP 3: ADD VERCEL TOKEN**

### **📍 Add First Secret:**
1. **Click "New repository secret"** (green button)
2. **Name:** `VERCEL_TOKEN`
3. **Secret:** `[paste your Vercel token here]`
4. **Click "Add secret"**

---

## 🎯 **STEP 4: ADD PROJECT ID**

### **📍 Add Second Secret:**
1. **Click "New repository secret"** again
2. **Name:** `VERCEL_PROJECT_ID`
3. **Secret:** `[paste your Project ID here]`
4. **Click "Add secret"**

---

## 🎯 **STEP 5: VERIFY SECRETS ADDED**

### **📍 Check Secrets List:**
- **You should see:** VERCEL_TOKEN and VERCEL_PROJECT_ID
- **Both should show** as added successfully
- **No error messages**

---

## 🎯 **STEP 6: FINAL DEPLOYMENT PUSH**

### **📍 Run This Command:**
```bash
git add . && git commit -m "Deploy to Vercel" && git push origin main
```

---

## ✅ **WHAT HAPPENS NEXT**

### **📍 Automatic Deployment:**
1. **GitHub Actions start** (you'll see checks running)
2. **Build process begins** (code compilation)
3. **Vercel deployment starts** (uploading to hosting)
4. **Site goes live!** 🎉

### **📍 Your Site Will Be:**
```
https://story-haven.vercel.app
```

---

## 🔧 **TROUBLESHOOTING**

### **❓ "Secret name already exists"**
- Make sure spelling is correct
- Check for extra spaces
- Try deleting and re-adding

### **❓ "Invalid token"**
- Double-check you copied the entire token
- No spaces before or after
- Try creating a new token if needed

---

## 💡 **WHAT TO COPY**

### **📋 Your Vercel Token:**
```
[paste your token here - the long string from Vercel]
```

### **📋 Your Project ID:**
```
[paste your project ID here - starts with prj_]
```

---

**Add the secrets to GitHub and your site will deploy automatically!** 🚀

**Tell me when you've added the secrets!** 📋

**Questions about any step?** 🤔
