# Images Directory

This directory contains all the images used in the Filadelfia Christian Centre website.

## Directory Structure

- **`/logos/`** - Church logos, TAG logos, and brand assets
- **`/pastors/`** - Photos of pastors and church leadership
- **`/church/`** - Church building, sanctuary, and facility photos
- **`/events/`** - Event photos and promotional images
- **`/ministries/`** - Ministry-specific images and photos

## How to Use

1. **Upload your images** to the appropriate directory
2. **Reference them in code** using the path `/images/[folder]/[filename]`

### Examples:

```jsx
// For a pastor photo
<img src="/images/pastors/pastor-john.jpg" alt="Pastor John" />

// For a logo
<img src="/images/logos/tag-logo.png" alt="TAG Logo" />

// For church photos
<img src="/images/church/sanctuary.jpg" alt="Church Sanctuary" />
```

## Recommended Image Formats

- **Logos**: PNG (with transparency) or SVG
- **Photos**: JPG or WebP
- **Icons**: SVG or PNG

## Image Optimization Tips

- Keep file sizes reasonable (under 1MB for photos)
- Use descriptive filenames (e.g., `pastor-john-mwakasege.jpg`)
- Consider using WebP format for better compression
- Optimize images before uploading

## Current Image Placeholders to Replace

1. **Pastor Photo**: Upload to `/pastors/` and update `src/app/page.jsx` line ~523
2. **TAG Logo**: Upload to `/logos/` and update navigation components
3. **Church Photos**: Upload to `/church/` for hero sections and about page
