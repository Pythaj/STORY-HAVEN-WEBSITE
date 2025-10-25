# 🎨 Watermark Management System - User Guide

## Overview
You now have complete control over watermarks for all your content. This prevents unauthorized copying and protects your work until payment is made.

## Access Watermark Settings

1. Go to **Admin Panel**: `http://localhost:3001/admin`
2. Click on the **"Watermark"** tab in the sidebar
3. You'll see three sections:
   - **Story Watermark**
   - **Audio Watermark**  
   - **Animation Watermark**

## Features

### 1. Enable/Disable Watermarks
- Toggle the switch at the top of each section
- When enabled, watermarks appear on preview content
- When disabled, content shows without watermarks

### 2. Custom Watermark Image
**Perfect for your logo or brand image!**

- Click **"Upload Image"** button
- Select a PNG or SVG file (transparent background works best)
- Image uploads to Cloudinary automatically
- Click the checkbox to activate custom image
- Watermark will use your image instead of text

**Recommended:**
- Use PNG with transparent background
- Size: 500x500px or similar
- Keep file size under 1MB

### 3. Text Watermark (If not using custom image)

**Main Text:**
- Default: "STORY HAVEN"
- Change to your brand name or custom text

**Subtitle:**
- Default: "PREVIEW"
- Shows below main text

### 4. Opacity Control
- Slider from 5% to 50%
- **Lower opacity** (5-15%): Subtle, less intrusive
- **Higher opacity** (30-50%): Very visible, strong protection
- **Recommended**: 15% for stories, 20% for audio, 10% for animations

### 5. Position Options
Four position choices:
1. **Center**: Middle of content (most common)
2. **Top Right**: Corner placement
3. **Bottom Right**: Bottom corner
4. **Diagonal**: Rotated across content (-12°)

### 6. Size Options
Three size options:
1. **Small**: Subtle watermark
2. **Medium**: Balanced visibility
3. **Large**: Very prominent (best for images/PDFs)

## How Watermarks Protect Your Content

### Stories (PDF/Images)
- Watermark appears on every page
- Visible when reader previews
- Removed after purchase
- Prevents screenshot copying

### Audio Stories
- Visual watermark on thumbnail/cover
- Can add audio watermark (coming soon)
- Shows "PREVIEW" during playback
- Full audio without watermark after purchase

### Animations (Videos)
- Watermark overlays video
- Appears throughout preview
- Cannot be removed by viewer
- Clean video after purchase

## Saving Settings

1. Adjust all your watermark settings
2. Click **"Save Settings"** button (top-right)
3. Settings save to browser localStorage
4. Apply to all future uploads automatically

## Best Practices

### For Testing Phase:
- Use **medium opacity** (15-20%)
- **Center position** works well
- **Large size** for maximum visibility
- Enable watermarks on all content types

### For Production:
- Use **custom logo image** for branding
- **Lower opacity** (10-15%) for better UX
- Keep **subtitle** as "PREVIEW" to inform users
- Test on different devices

## Upload Process with Watermarks

When you upload new content:

1. Go to Stories/Audio/Animations tab
2. Click "Upload New [Type]"
3. Fill in details (title, price, etc.)
4. Upload your files
5. **Watermark automatically applied** based on saved settings
6. Preview shows watermarked version
7. After payment, users get clean version

## Customization Examples

### Professional Look:
```
Text: "YOUR BRAND NAME"
Subtitle: "PREVIEW"
Opacity: 15%
Position: Center
Size: Large
```

### Minimal Watermark:
```
Text: "PREVIEW"
Subtitle: ""
Opacity: 10%
Position: Bottom Right
Size: Small
```

### Strong Protection:
```
Use Custom Image: ✓
Opacity: 30%
Position: Diagonal
Size: Large
```

## Troubleshooting

**Watermark not showing?**
- Check if watermark is **enabled** for that content type
- Verify opacity is not too low (< 5%)
- Clear browser cache and reload

**Custom image not uploading?**
- Check internet connection
- Ensure file is PNG/JPG/SVG
- File size should be under 2MB
- Check Cloudinary credentials in .env.local

**Watermark too strong?**
- Reduce opacity to 10-15%
- Use smaller size
- Try bottom-right position instead of center

**Want to change watermark after upload?**
- Update settings in Watermark tab
- Re-upload the content
- Previous uploads keep old watermark
- New uploads use new settings

## Security Notes

✅ **Watermarks provide:**
- Visual deterrent against copying
- Brand visibility
- Professional appearance
- Purchase incentive

❌ **Watermarks DON'T provide:**
- 100% copy protection (screenshots still possible)
- Audio watermarking (visual only for now)
- Automatic removal (requires payment system)

## Support

For watermark issues or questions:
1. Check this guide first
2. Test with default settings
3. Verify Cloudinary integration
4. Check browser console for errors

---

**Remember**: Watermarks are for preview/testing. After payment, users receive clean, watermark-free content!
