# Public Assets

This folder contains static assets for the Story Haven website.

## Files

- `Logo.jpg` - Main Story Haven logo (used in navbar, footer, admin)
- `Watermark.jpg` - Watermark/alternative logo (used as placeholder for story covers)

## Usage

These files are automatically served from the `/public` directory and can be referenced in the code as:

```tsx
<Image src="/Logo.jpg" alt="Story Haven" />
<Image src="/Watermark.jpg" alt="Story Cover" />
```

## Adding New Assets

1. Place files directly in this folder
2. Reference them with a leading slash: `/filename.ext`
3. Optimize images before uploading for better performance

## Recommended Image Sizes

- **Logo**: 512x512px (square, transparent background preferred)
- **Story Covers**: 800x1200px (portrait, 2:3 aspect ratio)
- **Audio Thumbnails**: 800x800px (square)
- **Animation Thumbnails**: 1920x1080px (16:9 aspect ratio)
