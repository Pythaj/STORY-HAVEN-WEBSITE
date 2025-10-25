# 🔑 **GET VERCEL CREDENTIALS**

## 📋 **WHERE TO FIND YOUR VALUES**

---

## 🎯 **PROJECT ID (starts with prj_)**

### **📍 How to Find:**
1. **Go to:** https://vercel.com/dashboard
2. **Sign in** to your Vercel account
3. **Click on your project** (story-haven)
4. **Click "Settings"** tab (top of the page)
5. **Click "General"** (in the left sidebar)
6. **Scroll down** until you see **"Project ID"**
7. **Copy the Project ID** (starts with `prj_`)

### **📍 What it Looks Like:**
```
Project ID: prj_abc123def456789
```

---

## 🎯 **VERCEL TOKEN**

### **📍 How to Find:**
1. **Go to:** https://vercel.com/dashboard
2. **Sign in** to your Vercel account
3. **Click your profile** (top right corner)
4. **Click "Settings"**
5. **Click "Tokens"** (in the left sidebar)
6. **Find your token:** "Story Haven Deployment"
7. **Copy the token** (long string of letters/numbers)

### **📍 What it Looks Like:**
```
vau_1234567890abcdef1234567890abcdef
```

---

## ✅ **AFTER GETTING BOTH:**

### **📍 Add to GitHub Secrets:**
1. **Go to GitHub repository** settings
2. **Secrets and variables** → Actions
3. **Add:** `VERCEL_TOKEN` = [your token]
4. **Add:** `VERCEL_PROJECT_ID` = [your project ID]

### **📍 Final Deployment:**
```bash
git add . && git commit -m "Deploy to Vercel" && git push origin main
```

---

**Copy both values from Vercel and add them to GitHub!** 🚀

**Questions about finding your credentials?** 🤔
