# 🚀 STORY HAVEN - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- A code editor (VS Code recommended)
- Git (optional, for version control)

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Framer Motion (animations)
- TailwindCSS (styling)
- Lucide React (icons)

### Step 2: Move Logo Files

The logo files are already in the root directory. Move them to the `public` folder:

**Windows:**
```bash
move Logo.jpg public\
move Watermark.jpg public\
```

**Mac/Linux:**
```bash
mv Logo.jpg public/
mv Watermark.jpg public/
```

### Step 3: Start Development Server

```bash
npm run dev
```

The website will open at **http://localhost:3000**

You'll see:
1. ✨ **Dramatic opening animation** (plays once per session)
2. 🏠 **Homepage** with all sections
3. 📚 **Story library** with flipbook reader
4. 🎧 **Audio hub** with player
5. 🎬 **Animation gallery**
6. 👑 **Admin dashboard** (login: admin / storyhaven2024)

## 🎨 Key Features Implemented

### ✅ Opening Animation
- **Dramatic 5-second intro** with:
  - Floating particles
  - Rotating rings
  - Logo reveal with bounce effect
  - Letter-by-letter title animation
  - Loading bar
  - Expanding circle transition
- **Plays once per session** (uses sessionStorage)

### ✅ Watermark System
- **Automatically applied** to all story pages
- **Multiple positions**: diagonal, center, corners, repeated
- **Adjustable opacity**
- **Removed automatically** when payment is successful
- **Notice badge** shows "Purchase to remove watermark"

### ✅ Advanced Visual Effects
- **3D card transforms** on hover
- **Neon glow text** with flicker animation
- **Pulse glow** effects
- **Shimmer** animations
- **Morphing borders**
- **Floating** elements
- **Gradient borders** with animation
- **Hover lift** effects
- **Perspective cards**
- **Glitch** effects on hover

### ✅ Payment Integration
- **MTN Mobile Money** (primary)
- **Paystack** (backup)
- **Secure modal** with animations
- **Success confirmation**
- **Auto-unlock** content after payment

### ✅ Admin Dashboard
- **Secure login** (demo: admin/storyhaven2024)
- **Dashboard stats** with charts
- **Content management** (upload stories, audio, animations)
- **Sales tracking**
- **Settings panel**

## 📱 Testing the Website

### 1. Homepage
- ✅ Opening animation plays
- ✅ Hero section with particles
- ✅ Category cards with 3D effects
- ✅ Featured stories grid
- ✅ Audio carousel
- ✅ Animation gallery
- ✅ About section
- ✅ CTA section

### 2. Story Library
- ✅ Search and filters work
- ✅ Genre filtering
- ✅ Sort options
- ✅ Story cards with hover effects

### 3. Story Details (Flipbook Reader)
- ✅ First page is free
- ✅ **Watermark visible** on all pages
- ✅ Page navigation works
- ✅ Light/Dark reading modes
- ✅ Payment modal opens
- ✅ **Watermark disappears** after "purchase"
- ✅ Download button appears after purchase

### 4. Audio Hub
- ✅ Audio visualizers animate
- ✅ Play/pause preview (30 seconds)
- ✅ Purchase modal
- ✅ Duration and price display

### 5. Animations
- ✅ Video thumbnails
- ✅ Play button overlay
- ✅ HD quality badge
- ✅ Purchase flow

### 6. Admin Dashboard
- ✅ Login page
- ✅ Dashboard with stats
- ✅ Content upload forms
- ✅ Sales table
- ✅ Settings page

## 🎨 Customization Guide

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    gold: '#YOUR_COLOR',  // Change main gold color
  },
  accent: {
    orange: '#YOUR_COLOR',  // Change accent color
  },
}
```

### Modify Opening Animation

Edit `components/OpeningAnimation.tsx`:

```typescript
// Change animation duration
setTimeout(() => setAnimationStage(1), 500),  // Adjust timing

// Disable opening animation
const hasSeenAnimation = true  // Always skip
```

### Adjust Watermark

Edit `components/ContentWatermark.tsx`:

```typescript
// Change watermark position
<ContentWatermark 
  isPurchased={false} 
  position="center"  // Options: center, diagonal, corners, repeated
  opacity={0.15}     // Adjust transparency (0.1 - 0.3)
/>
```

### Add New Stories

1. Go to **Admin Dashboard** (http://localhost:3000/admin)
2. Login with: `admin` / `storyhaven2024`
3. Click **Stories** tab
4. Click **Upload New**
5. Fill in details:
   - Title
   - Description
   - Genre
   - Price
   - Upload PDF file
   - Upload cover image
6. Click **Publish Now**

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts and your site will be live!

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod
```

### Environment Variables

Create `.env.local` file:

```env
# Payment Keys
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx
MTN_MOMO_API_KEY=your_key

# Admin
ADMIN_PASSWORD_HASH=your_hashed_password

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🔧 Troubleshooting

### Issue: Opening animation doesn't play
**Solution**: Clear browser cache or open in incognito mode

### Issue: Watermark not showing
**Solution**: Check that `isPurchased` is set to `false`

### Issue: Payment modal doesn't open
**Solution**: Check browser console for errors

### Issue: Images not loading
**Solution**: Ensure Logo.jpg and Watermark.jpg are in `/public` folder

### Issue: Styles not applying
**Solution**: Run `npm run dev` again to rebuild

## 📊 Performance Optimization

### Image Optimization
- Use WebP format for better compression
- Recommended sizes:
  - Logo: 512x512px
  - Story covers: 800x1200px
  - Thumbnails: 400x600px

### Animation Performance
- Opening animation uses `sessionStorage` to play once
- Framer Motion optimized for 60fps
- CSS animations use GPU acceleration

### Loading Speed
- Next.js automatic code splitting
- Images lazy-loaded
- Fonts preloaded

## 🎯 Next Steps

1. ✅ **Test all features** thoroughly
2. ✅ **Add your own content** via admin dashboard
3. ✅ **Configure payment keys** in `.env.local`
4. ✅ **Customize colors** and branding
5. ✅ **Deploy to production**
6. ✅ **Share with the world!**

## 📞 Support

For issues or questions:
- Email: contact@storyhaven.art
- Check README.md for more details

## 🎉 You're All Set!

Your Story Haven website is now ready with:
- ✨ Dramatic opening animation
- 🔒 Automatic watermark system
- 💳 Payment integration
- 👑 Admin dashboard
- 📱 Fully responsive design
- 🎨 Modern visual effects

**Enjoy your beautiful storytelling platform!** 🚀
