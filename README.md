# 🌟 STORY HAVEN - Premium Storytelling Platform

![Story Haven](./Logo.jpg)

A professional, fully-functional storytelling platform built for **Dray Harmony** to host, sell, and stream original stories, audio tales, and animations.

## ✨ Features

### 🎯 Core Functionality
- **📚 Story Library** - Browse and purchase original stories with interactive flipbook reader
- **🎧 Audio Hub** - Stream and download narrated audio stories with preview functionality
- **🎬 Animation Gallery** - Watch and purchase animated tales in HD quality
- **💰 Payment Integration** - Secure payments via MTN Mobile Money and Paystack
- **👑 Admin Dashboard** - Complete content management system for Dray Harmony
- **📱 Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)

### 🎨 Design Features
- **Afro-Luxury Theme** - Gold, black, and orange color palette with glowing effects
- **Smooth Animations** - Framer Motion for elegant transitions
- **Interactive Flipbook** - Page-turning reading experience with light/dark modes
- **Audio Visualizers** - Animated waveforms for audio content
- **Video Previews** - Thumbnail previews with play overlays

### 🔐 Security & Business
- **Anti-Piracy Protection** - Disabled right-click and content watermarking
- **Secure Payments** - SSL encryption for all transactions
- **User Authentication** - Admin login with secure credentials
- **Content Protection** - First page free, pay-to-unlock model

## 🚀 Getting Started

### 🆓 NEW: 100% FREE Setup (No Billing Account Required!)

**Quick Start:** Follow `FREE_TIER_SETUP.md` for complete setup with:
- ✅ Supabase (FREE database - no credit card)
- ✅ Cloudinary (FREE media storage - no credit card)
- ✅ Vercel (FREE hosting - no credit card)

**Checklist:** Use `QUICK_START_CHECKLIST.md` to track your progress

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free)
- Cloudinary account (free)

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment Variables**
Create `.env.local` file (see `FREE_TIER_SETUP.md` for details):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

3. **Set Up Database**
- Run SQL from `supabase-schema.sql` in your Supabase SQL Editor

4. **Run Development Server**
```bash
npm run dev
```

5. **Open Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
STORY HAVEN WEBSITE/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── stories/                  # Stories section
│   │   ├── page.tsx              # Story library
│   │   └── [id]/page.tsx         # Story details with flipbook
│   ├── audio/                    # Audio section
│   │   └── page.tsx              # Audio hub
│   ├── animations/               # Animations section
│   │   └── page.tsx              # Animation gallery
│   ├── shop/                     # Shop page
│   │   └── page.tsx              # All products
│   ├── admin/                    # Admin dashboard
│   │   └── page.tsx              # Dashboard & management
│   ├── contact/                  # Contact page
│   ├── terms/                    # Terms of use
│   └── privacy/                  # Privacy policy
├── components/                   # Reusable components
│   ├── Navbar.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer
│   ├── FeaturedStories.tsx       # Featured stories grid
│   ├── AudioCarousel.tsx         # Audio stories carousel
│   ├── AnimationGrid.tsx         # Animation grid
│   ├── PaymentModal.tsx          # Payment processing modal
│   ├── AdminLogin.tsx            # Admin authentication
│   ├── DashboardStats.tsx        # Dashboard statistics
│   └── ContentManager.tsx        # Content upload/management
├── public/                       # Static assets
│   ├── Logo.jpg                  # Main logo
│   └── Watermark.jpg             # Watermark/thumbnail
├── package.json                  # Dependencies
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS config
└── tsconfig.json                 # TypeScript config
```

## 🎨 Design System

### Colors
- **Primary Gold**: `#D4AF37`
- **Gold Light**: `#F4E4B7`
- **Gold Dark**: `#B8941F`
- **Accent Orange**: `#FF8C42`
- **Dark Background**: `#0A0A0A`, `#1A1A1A`, `#2A2A2A`

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Poppins (sans-serif)

### Key Components
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Dark backgrounds with gold borders
- **Inputs**: Dark with gold focus states

## 💳 Payment Integration

### MTN Mobile Money
- Primary payment method for local users
- Direct mobile money integration
- Instant payment confirmation

### Paystack
- Backup payment gateway
- Supports cards and digital payments
- International payment support

### Implementation Notes
```typescript
// Payment flow in PaymentModal.tsx
1. User selects payment method
2. Enters payment details
3. Payment processed securely
4. Content unlocked on success
```

## 👑 Admin Dashboard

### Access Credentials
- **Username**: `admin`
- **Password**: `storyhaven2024`

### Features
- 📊 Dashboard with analytics
- 📚 Upload and manage stories
- 🎧 Upload and manage audio
- 🎬 Upload and manage animations
- 💰 View sales and revenue
- ⚙️ Settings and configuration

## 🔒 Security Features

1. **Content Protection**
   - Right-click disabled
   - Text selection disabled (except inputs)
   - Watermarked content

2. **Payment Security**
   - SSL encryption
   - Secure payment gateways
   - No stored payment details

3. **Admin Security**
   - Password-protected dashboard
   - Session management
   - Secure API endpoints

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adjusted layouts for tablets
- **Desktop**: Full-featured desktop experience
- **Touch Optimized**: Swipe gestures and touch controls

## 🎯 Business Model

### Freemium Reading
- First page of every story is free
- Pay to unlock full content
- One-time purchase, lifetime access

### Pricing
- **Stories**: ₵5.00 each
- **Audio**: ₵3.00 each
- **Animations**: ₵7.00 each

### Revenue Streams
1. Story sales
2. Audio sales
3. Animation sales
4. Future: Subscriptions, bundles

## 🚀 Deployment

### 🆓 Deploy to Vercel (FREE - Recommended)

**✅ Complete Setup:** Follow `Vercel-Deployment-Guide.md` for detailed instructions

**✅ Quick Deploy:**
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

**✅ Environment Variables:** See `.env.vercel.example` for required variables

**✅ What You Get FREE:**
- Next.js hosting with global CDN
- Automatic HTTPS and SSL
- 100GB bandwidth per month
- 1000 serverless function executions
- Image optimization
- Edge caching

**✅ Services Used:**
- **Supabase (FREE)**: Database (500MB storage)
- **Cloudinary (FREE)**: Media hosting (25GB storage, 25GB bandwidth)
- **Vercel (FREE)**: Website hosting

### 🔧 Configuration Files Created

- ✅ `vercel.json` - Optimized Vercel deployment configuration
- ✅ `Vercel-Deployment-Guide.md` - Step-by-step deployment guide
- ✅ `.env.vercel.example` - Environment variables template
- ✅ Updated build scripts for Vercel compatibility

### Important Notes

1. **Environment Variables**: Must be added in Vercel dashboard after deployment
2. **Build Time**: First deployment may take 2-3 minutes
3. **Domain**: Your site will be available at `your-app-name.vercel.app`
4. **Custom Domain**: Can be added later in Vercel settings

## 📊 Analytics Integration

Add Google Analytics in `app/layout.tsx`:
```typescript
// Add Google Analytics script
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
```

## 🔧 Customization

### Adding New Stories
1. Login to admin dashboard
2. Navigate to "Stories" tab
3. Click "Upload New"
4. Fill in details and upload files
5. Publish or save as draft

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    gold: '#YOUR_COLOR',
  }
}
```

### Adding Payment Methods
Edit `components/PaymentModal.tsx` to add new payment options.

## 📞 Support

- **Email**: contact@storyhaven.art
- **Support**: support@storyhaven.art
- **Legal**: legal@storyhaven.art

## 📄 License

All content © 2024 Dray Harmony. All rights reserved.

## 🙏 Credits

**Created by**: Dray Harmony  
**Platform**: Story Haven  
**Purpose**: Premium storytelling platform for African narratives

---

## 🎉 Quick Start Checklist

- [x] Install dependencies (`npm install`)
- [x] Run development server (`npm run dev`)
- [x] Access at `http://localhost:3000`
- [ ] Configure payment keys in `.env.local`
- [ ] Upload your first story via admin dashboard
- [ ] Test payment flow
- [ ] Deploy to production
- [ ] Share with the world!

---

**Built with ❤️ for storytellers everywhere**
