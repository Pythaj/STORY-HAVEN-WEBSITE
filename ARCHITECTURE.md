# 🏗️ Story Haven Architecture (FREE TIER)

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR USERS (Browsers)                     │
│                   https://your-site.vercel.app               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  VERCEL (FREE HOSTING)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Application (Your Website)            │  │
│  │  • Homepage, Stories, Audio, Animations, Admin       │  │
│  │  • API Routes (/api/stories, /api/audio, etc.)      │  │
│  │  • Server-side rendering                             │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────┬─────────────────────────────────┬───────────────┘
            │                                 │
            │                                 │
            ▼                                 ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│  SUPABASE (FREE DATABASE) │   │ CLOUDINARY (FREE STORAGE) │
│                           │   │                           │
│  📊 TEXT DATA ONLY:       │   │  📁 ALL MEDIA FILES:      │
│  • Story titles           │   │  • Book cover images      │
│  • Descriptions           │   │  • PDF story files        │
│  • Prices                 │   │  • Audio MP3 files        │
│  • Genres                 │   │  • Video MP4 files        │
│  • View counts            │   │  • Thumbnails             │
│  • Ratings                │   │                           │
│  • Purchase records       │   │  Storage: 25GB FREE       │
│  • User data              │   │  Bandwidth: 25GB/month    │
│                           │   │                           │
│  Database: 500MB FREE     │   │  ✅ No billing account    │
│  ✅ No billing account    │   │                           │
└───────────────────────────┘   └───────────────────────────┘
```

---

## Data Flow

### 1. User Visits Stories Page

```
User Browser
    │
    ▼
GET /stories
    │
    ▼
Next.js Page (app/stories/page.tsx)
    │
    ▼
Fetch /api/stories
    │
    ▼
API Route (app/api/stories/route.ts)
    │
    ▼
Database Service (lib/database.ts)
    │
    ▼
Supabase Client (lib/supabase.ts)
    │
    ▼
SUPABASE DATABASE
    │
    ▼
Returns: [
  {
    id: "uuid",
    title: "Story Title",
    cover_url: "https://res.cloudinary.com/...",  ← Cloudinary URL
    pdf_url: "https://res.cloudinary.com/...",    ← Cloudinary URL
    price: 5.00,
    ...
  }
]
    │
    ▼
Next.js renders page with images from Cloudinary URLs
```

### 2. Admin Uploads New Story

```
Admin Dashboard
    │
    ▼
Fill form + Select files
    │
    ▼
POST /api/upload (for cover image)
    │
    ▼
Cloudinary Service (lib/cloudinary.ts)
    │
    ▼
CLOUDINARY
    │
    ▼
Returns: {
  url: "https://res.cloudinary.com/your-cloud/image/upload/v123/story-covers/abc.jpg",
  publicId: "story-covers/abc"
}
    │
    ▼
POST /api/upload (for PDF file)
    │
    ▼
CLOUDINARY
    │
    ▼
Returns: {
  url: "https://res.cloudinary.com/your-cloud/raw/upload/v123/story-pdfs/xyz.pdf",
  publicId: "story-pdfs/xyz"
}
    │
    ▼
POST /api/stories (with Cloudinary URLs)
    │
    ▼
Database Service
    │
    ▼
SUPABASE DATABASE
    │
    ▼
Saves: {
  title: "New Story",
  cover_url: "https://res.cloudinary.com/.../abc.jpg",  ← URL only
  pdf_url: "https://res.cloudinary.com/.../xyz.pdf",    ← URL only
  cloudinary_cover_id: "story-covers/abc",
  cloudinary_pdf_id: "story-pdfs/xyz",
  ...
}
```

### 3. User Purchases Story

```
User clicks "Buy"
    │
    ▼
Payment Modal opens
    │
    ▼
User enters payment details
    │
    ▼
POST to Paystack/MTN MoMo API
    │
    ▼
Payment processed
    │
    ▼
POST /api/purchases
    │
    ▼
SUPABASE DATABASE
    │
    ▼
Saves purchase record:
{
  user_email: "user@example.com",
  content_type: "story",
  content_id: "story-uuid",
  amount: 5.00,
  status: "completed",
  payment_reference: "ref123"
}
    │
    ▼
User gets access to full PDF from Cloudinary
```

---

## File Storage Strategy

### ❌ What NOT to Store in Supabase

```
DON'T STORE:
├── Images (use Cloudinary)
├── PDFs (use Cloudinary)
├── Audio files (use Cloudinary)
├── Video files (use Cloudinary)
└── Any binary data (use Cloudinary)
```

### ✅ What to Store in Supabase

```
STORE IN SUPABASE:
├── Story metadata
│   ├── title (VARCHAR)
│   ├── description (TEXT)
│   ├── genre (VARCHAR)
│   ├── price (DECIMAL)
│   ├── cover_url (TEXT) ← URL to Cloudinary
│   └── pdf_url (TEXT) ← URL to Cloudinary
├── User data
│   ├── email
│   ├── name
│   └── created_at
└── Purchase records
    ├── user_email
    ├── content_id
    ├── amount
    └── payment_reference
```

### ✅ What to Store in Cloudinary

```
STORE IN CLOUDINARY:
├── story-covers/
│   ├── cover1.jpg
│   ├── cover2.jpg
│   └── ...
├── story-pdfs/
│   ├── story1.pdf
│   ├── story2.pdf
│   └── ...
├── audio-covers/
│   ├── audio1.jpg
│   └── ...
├── audio-files/
│   ├── audio1.mp3
│   └── ...
├── video-thumbnails/
│   ├── video1.jpg
│   └── ...
└── video-files/
    ├── video1.mp4
    └── ...
```

---

## Database Schema (Supabase)

### stories table
```sql
┌──────────────────────┬──────────────┬─────────────────────┐
│ Column               │ Type         │ Purpose             │
├──────────────────────┼──────────────┼─────────────────────┤
│ id                   │ UUID         │ Primary key         │
│ title                │ VARCHAR(255) │ Story title         │
│ genre                │ VARCHAR(100) │ Genre/category      │
│ description          │ TEXT         │ Story description   │
│ cover_url            │ TEXT         │ Cloudinary URL      │
│ pdf_url              │ TEXT         │ Cloudinary URL      │
│ cloudinary_cover_id  │ VARCHAR(255) │ For deletion        │
│ cloudinary_pdf_id    │ VARCHAR(255) │ For deletion        │
│ price                │ DECIMAL      │ Price in currency   │
│ views                │ INTEGER      │ View count          │
│ rating               │ DECIMAL      │ Average rating      │
│ language             │ VARCHAR(50)  │ Content language    │
│ pages                │ INTEGER      │ Number of pages     │
│ published            │ BOOLEAN      │ Visibility status   │
│ created_at           │ TIMESTAMP    │ Creation date       │
│ updated_at           │ TIMESTAMP    │ Last update date    │
└──────────────────────┴──────────────┴─────────────────────┘
```

### purchases table
```sql
┌──────────────────────┬──────────────┬─────────────────────┐
│ Column               │ Type         │ Purpose             │
├──────────────────────┼──────────────┼─────────────────────┤
│ id                   │ UUID         │ Primary key         │
│ user_email           │ VARCHAR(255) │ Buyer email         │
│ user_name            │ VARCHAR(255) │ Buyer name          │
│ content_type         │ VARCHAR(50)  │ story/audio/video   │
│ content_id           │ UUID         │ Reference to item   │
│ amount               │ DECIMAL      │ Purchase amount     │
│ payment_method       │ VARCHAR(50)  │ Paystack/MTN        │
│ payment_reference    │ VARCHAR(255) │ Transaction ref     │
│ status               │ VARCHAR(50)  │ pending/completed   │
│ created_at           │ TIMESTAMP    │ Purchase date       │
└──────────────────────┴──────────────┴─────────────────────┘
```

---

## API Routes

```
/api/stories
├── GET     → Fetch all stories (with filters)
├── POST    → Create new story (admin only)

/api/stories/[id]
├── GET     → Fetch single story + increment views
├── PUT     → Update story (admin only)
├── DELETE  → Delete story (admin only)

/api/audio
├── GET     → Fetch all audio stories
├── POST    → Create new audio (admin only)

/api/audio/[id]
├── GET     → Fetch single audio + increment plays
├── PUT     → Update audio (admin only)
├── DELETE  → Delete audio (admin only)

/api/animations
├── GET     → Fetch all animations
├── POST    → Create new animation (admin only)

/api/animations/[id]
├── GET     → Fetch single animation + increment views
├── PUT     → Update animation (admin only)
├── DELETE  → Delete animation (admin only)

/api/purchases
├── GET     → Fetch purchases (by email or all)
├── POST    → Create purchase record

/api/purchases/stats
├── GET     → Get revenue and sales statistics

/api/upload
├── POST    → Upload file to Cloudinary
```

---

## Free Tier Limits & Usage

### Supabase FREE Tier
```
Limit: 500MB database storage
Usage per story: ~2KB (text data only)
Capacity: ~250,000 stories

Limit: 5GB bandwidth/month
Usage per request: ~2KB
Capacity: ~2.5 million requests/month

✅ Perfect for text data!
```

### Cloudinary FREE Tier
```
Limit: 25GB storage
Usage per story:
  • Cover image: 300KB
  • PDF file: 5MB
Capacity: ~4,700 stories with images and PDFs

Limit: 25GB bandwidth/month
Usage per view: ~300KB (image) + 5MB (PDF if downloaded)
Capacity: ~5,000 full story downloads/month

✅ Perfect for media files!
```

### Vercel FREE Tier
```
Limit: 100GB bandwidth/month
Usage per page view: ~500KB
Capacity: ~200,000 page views/month

✅ Perfect for hosting!
```

---

## Security Architecture

### Environment Variables (Never in Code!)
```
.env.local (local development)
    ↓
Vercel Environment Variables (production)
    ↓
Injected at build/runtime
    ↓
Accessed via process.env.VARIABLE_NAME
```

### Admin Authentication
```
User enters password
    ↓
Hashed with bcrypt
    ↓
Compared with stored hash
    ↓
JWT token generated
    ↓
Stored in localStorage
    ↓
Sent with admin API requests
```

### Content Protection
```
Public Routes:
• Homepage
• Stories list (metadata only)
• Audio list (metadata only)
• Animation list (metadata only)

Protected Content:
• Full PDF files (after purchase)
• Full audio files (after purchase)
• Full video files (after purchase)

Admin Routes:
• /admin/* (password protected)
• /api/stories POST/PUT/DELETE (admin only)
• /api/upload (admin only)
```

---

## Deployment Flow

```
Local Development
    ↓
git push to GitHub
    ↓
Vercel detects push
    ↓
Automatic build
    ↓
Inject environment variables
    ↓
Deploy to CDN
    ↓
Live at your-site.vercel.app
```

---

## Monitoring & Maintenance

### Daily Checks
- ✅ Site is accessible
- ✅ No errors in Vercel logs
- ✅ Database connections working

### Weekly Checks
- ✅ Supabase usage (should be <500MB)
- ✅ Cloudinary usage (should be <25GB)
- ✅ Vercel bandwidth (should be <100GB/month)

### Monthly Tasks
- ✅ Delete test data
- ✅ Optimize large images
- ✅ Review and clean unused Cloudinary files
- ✅ Backup database (Supabase auto-backups)

---

**This architecture keeps you 100% FREE while supporting thousands of users!** 🎉
