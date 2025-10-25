# 💳 PAYMENT & SECURITY SETTINGS - Complete Guide

## 🎉 **NEW FEATURES ADDED!**

Your admin panel now includes **complete payment and security settings** that you can configure easily!

---

## ✨ **What's New:**

### **1. MTN Mobile Money Settings** 📱
- ✅ **MoMo Number** - Your payment receiving number
- ✅ **Account Name** - Name on your MoMo account
- ✅ **Orange highlight** - Easy to spot
- ✅ **Format validation** - Helps you enter correctly

### **2. Paystack Integration** 💳
- ✅ **Public Key** - For frontend payments
- ✅ **Secret Key** - For backend verification (password protected)
- ✅ **Direct link** - To Paystack dashboard
- ✅ **Security notice** - Reminds you to keep keys safe

### **3. Admin Profile** 👤
- ✅ **Admin Name** - Your display name
- ✅ **Admin Email** - Your contact email
- ✅ **Green highlight** - Profile section

### **4. Security Settings** 🔐
- ✅ **Current Password** - Verification
- ✅ **New Password** - Change your password
- ✅ **Confirm Password** - Double-check
- ✅ **Red highlight** - Security importance

---

## 📋 **Settings Overview:**

### **Layout (8 Cards Total):**
```
┌────────────────────────────────────────┐
│  Site Settings      [✓ Saved!] [Reset] │
├────────────────────────────────────────┤
│  Row 1:                                │
│  ┌─────────────┐  ┌─────────────┐     │
│  │  General    │  │  Homepage   │     │
│  │  Settings   │  │  Content    │     │
│  └─────────────┘  └─────────────┘     │
├────────────────────────────────────────┤
│  Row 2:                                │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ Appearance  │  │   Social    │     │
│  │             │  │   Media     │     │
│  └─────────────┘  └─────────────┘     │
├────────────────────────────────────────┤
│  Row 3: PAYMENT SETTINGS               │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ 📱 MTN MoMo │  │ 💳 Paystack │     │
│  │ (Orange)    │  │ (Gold)      │     │
│  └─────────────┘  └─────────────┘     │
├────────────────────────────────────────┤
│  Row 4: ADMIN & SECURITY               │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ 👤 Profile  │  │ 🔐 Security │     │
│  │ (Green)     │  │ (Red)       │     │
│  └─────────────┘  └─────────────┘     │
├────────────────────────────────────────┤
│  [💾 Save All Changes]                 │
└────────────────────────────────────────┘
```

---

## 💳 **MTN Mobile Money Setup:**

### **Card Details:**
- **Border:** Orange (accent color)
- **Icon:** 💰 Dollar sign
- **Fields:** 2 inputs

### **Field 1: MoMo Number**
```
Label: MoMo Number
Type: Tel (phone number)
Placeholder: 024XXXXXXX
Format: 024XXXXXXX or 055XXXXXXX
Font: Monospace (easy to read)
Size: Large text (18px)
```

**Example Values:**
- ✅ `0244567890`
- ✅ `0551234567`
- ✅ `0201234567`
- ❌ `24567890` (missing 0)
- ❌ `+233244567890` (no +233)

### **Field 2: Account Name**
```
Label: Account Name
Type: Text
Placeholder: Dray Harmony
Default: Dray Harmony
Purpose: Name on MoMo account
```

### **Info Box:**
```
💡 Important: Your MoMo number will be used 
to receive payments from customers
```

---

## 💳 **Paystack Integration:**

### **Card Details:**
- **Border:** Gold (primary color)
- **Icon:** 💰 Dollar sign
- **Fields:** 2 inputs (Public & Secret)

### **Field 1: Public Key**
```
Label: Public Key
Type: Text
Placeholder: pk_test_xxxxxxxxxxxxx
Font: Monospace
Purpose: Frontend payment processing
Link: Paystack Dashboard
```

**How to Get:**
1. Go to: https://dashboard.paystack.com
2. Login to your account
3. Settings → API Keys & Webhooks
4. Copy **Public Key** (starts with `pk_test_` or `pk_live_`)

**Example:**
```
pk_test_abc123def456ghi789jkl012mno345
```

### **Field 2: Secret Key**
```
Label: Secret Key
Type: Password (hidden)
Placeholder: sk_test_xxxxxxxxxxxxx
Font: Monospace
Purpose: Backend verification
Security: NEVER share this!
```

**How to Get:**
1. Same Paystack dashboard
2. Copy **Secret Key** (starts with `sk_test_` or `sk_live_`)
3. **IMPORTANT:** Keep this secret!

**Example:**
```
sk_test_xyz987wvu654tsr321qpo098nml765
```

### **Info Box:**
```
🔒 Secure: Your API keys are stored locally 
and never shared
```

### **Test vs Live Keys:**
- **Test Keys:** For development/testing
  - Start with: `pk_test_` and `sk_test_`
  - Use fake card: 4084084084084081
  - No real money charged
  
- **Live Keys:** For production
  - Start with: `pk_live_` and `sk_live_`
  - Real transactions
  - Real money charged

---

## 👤 **Admin Profile:**

### **Card Details:**
- **Border:** Green
- **Icon:** 👤 User
- **Fields:** 2 inputs

### **Field 1: Admin Name**
```
Label: Admin Name
Type: Text
Default: Dray Harmony
Purpose: Display name in admin panel
Updates: Sidebar greeting
```

### **Field 2: Admin Email**
```
Label: Admin Email
Type: Email
Default: admin@storyhaven.art
Purpose: Contact email
Updates: Footer contact info
```

---

## 🔐 **Security Settings:**

### **Card Details:**
- **Border:** Red (danger color)
- **Icon:** ⚙️ Settings
- **Fields:** 3 password inputs + button

### **Password Change Flow:**

**Step 1: Current Password**
```
Label: Current Password
Type: Password
Purpose: Verify it's you
Demo: storyhaven2024
```

**Step 2: New Password**
```
Label: New Password
Type: Password
Purpose: Your new password
Requirements:
  - At least 8 characters
  - Mix of letters & numbers
  - Special characters recommended
```

**Step 3: Confirm Password**
```
Label: Confirm New Password
Type: Password
Purpose: Prevent typos
Must match: New Password
```

**Step 4: Change Button**
```
Button: Change Password
Color: Red
Action: Update password
Note: For demo, this is visual only
```

### **Info Box:**
```
🔐 Password Change: For demo purposes, 
password is: storyhaven2024
```

---

## 🎯 **How to Use:**

### **Setup MTN MoMo:**
1. Go to: http://localhost:3000/admin
2. Login: `admin` / `storyhaven2024`
3. Click **"Settings"** tab
4. Scroll to **"MTN Mobile Money"** (orange card)
5. Enter your MoMo number: `0244567890`
6. Enter account name: `Dray Harmony`
7. Scroll to bottom → Click **"Save All Changes"**
8. See green checkmark ✓

### **Setup Paystack:**
1. Get your keys from Paystack dashboard
2. In Settings, scroll to **"Paystack Integration"** (gold card)
3. Paste **Public Key**: `pk_test_...`
4. Paste **Secret Key**: `sk_test_...`
5. Click **"Save All Changes"**
6. Keys are now saved locally

### **Update Profile:**
1. Scroll to **"Admin Profile"** (green card)
2. Change **Admin Name** if needed
3. Change **Admin Email** if needed
4. Click **"Save All Changes"**
5. Name updates in sidebar immediately

### **Change Password:**
1. Scroll to **"Security"** (red card)
2. Enter **Current Password**: `storyhaven2024`
3. Enter **New Password**: `mynewpassword123`
4. Confirm **New Password**: `mynewpassword123`
5. Click **"Change Password"**
6. (Demo: Visual only, doesn't actually change)

---

## 💾 **Data Storage:**

### **LocalStorage Structure:**
```json
{
  "siteSettings": {
    // ... other settings ...
    
    "momoNumber": "0244567890",
    "momoName": "Dray Harmony",
    "paystackPublicKey": "pk_test_abc123...",
    "paystackSecretKey": "sk_test_xyz987...",
    "adminEmail": "admin@storyhaven.art",
    "adminName": "Dray Harmony"
  }
}
```

### **Security Notes:**
- ✅ Stored in browser LocalStorage
- ✅ Never sent to any server
- ✅ Only accessible on your device
- ✅ Secret key is password-protected input
- ⚠️ For production, use backend storage
- ⚠️ Encrypt sensitive data
- ⚠️ Use environment variables

---

## 🎨 **Visual Design:**

### **Color Coding:**
- **Orange Border** → Payment (MTN MoMo)
- **Gold Border** → Payment (Paystack)
- **Green Border** → Profile/Account
- **Red Border** → Security/Danger

### **Icons:**
- 💰 **Dollar Sign** → Payment settings
- 👤 **User** → Profile settings
- ⚙️ **Settings** → Security settings
- 💡 **Lightbulb** → Info/Tips
- 🔒 **Lock** → Security notice
- 🔐 **Locked Key** → Password

### **Info Boxes:**
- **Orange Background** → Important notice
- **Gold Background** → Security reminder
- **Red Background** → Critical info

---

## 📱 **Payment Integration:**

### **How Payments Work:**

**MTN MoMo Flow:**
```
1. Customer clicks "Buy" on story
2. Payment modal opens
3. Customer selects "MTN MoMo"
4. Enters their number: 0241234567
5. System uses YOUR MoMo number (from settings)
6. Customer approves on phone
7. Money sent to YOUR number
8. Story unlocks automatically
```

**Paystack Flow:**
```
1. Customer clicks "Buy" on story
2. Payment modal opens
3. Customer selects "Paystack"
4. Redirects to Paystack
5. Uses YOUR Public Key (from settings)
6. Customer enters card details
7. Paystack processes payment
8. Webhook confirms to YOUR Secret Key
9. Story unlocks automatically
```

---

## ✅ **Testing Checklist:**

### **MTN MoMo:**
- [ ] Enter valid MoMo number (10 digits)
- [ ] Enter account name
- [ ] Click Save
- [ ] See green checkmark
- [ ] Refresh page
- [ ] Settings still there ✓

### **Paystack:**
- [ ] Get test keys from Paystack
- [ ] Paste public key
- [ ] Paste secret key
- [ ] Click Save
- [ ] See green checkmark
- [ ] Keys saved ✓

### **Admin Profile:**
- [ ] Change admin name
- [ ] Change admin email
- [ ] Click Save
- [ ] Check sidebar → Name updated ✓

### **Security:**
- [ ] Enter current password
- [ ] Enter new password
- [ ] Confirm new password
- [ ] Click Change Password
- [ ] See confirmation ✓

---

## 🚀 **Production Deployment:**

### **Before Going Live:**

1. **Get Live Keys:**
   - Replace `pk_test_` with `pk_live_`
   - Replace `sk_test_` with `sk_live_`

2. **Verify MoMo:**
   - Test with small amount
   - Confirm you receive payment
   - Check transaction history

3. **Security Hardening:**
   - Move keys to backend
   - Use environment variables
   - Encrypt sensitive data
   - Add rate limiting
   - Enable 2FA for admin

4. **Testing:**
   - Test full payment flow
   - Test refunds
   - Test error handling
   - Test on mobile devices

---

## 🎉 **Summary:**

You can now configure:

✅ **MTN MoMo Number** - Receive payments  
✅ **MoMo Account Name** - Your name  
✅ **Paystack Public Key** - Frontend payments  
✅ **Paystack Secret Key** - Backend verification  
✅ **Admin Name** - Your display name  
✅ **Admin Email** - Your contact  
✅ **Password** - Change security  

**All settings save instantly and persist in your browser!**

---

## 📞 **Support:**

### **Paystack Help:**
- Dashboard: https://dashboard.paystack.com
- Docs: https://paystack.com/docs
- Support: support@paystack.com

### **MTN MoMo Help:**
- Dial: *170#
- Customer Care: 100
- Website: mtn.com.gh

---

**Your payment system is now fully configurable!** 💳✨

**Go to Settings and add your payment details now!** 🚀
