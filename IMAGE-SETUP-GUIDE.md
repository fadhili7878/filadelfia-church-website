# 🖼️ Complete Image Setup Guide

## 📁 Part 1: Static Images (Immediate Fix)

### 1. Create Your Image Folders
I've already created these folders for you:
```
/public/images/
├── pastors/          # Pastor photos
├── ministries/       # Ministry images  
├── events/          # Event photos
├── gallery/         # General gallery
└── IMAGE-GUIDE.md   # Reference guide
```

### 2. Add Your Images
Place your images in the appropriate folders:

**Required Images:**
- `/public/images/pastors/pastor-john.jpg` (your website is looking for this)
- `/public/images/logo.png` (church logo)
- `/public/images/church-building.jpg` (main building)

### 3. Test Static Images
Your website should now display images correctly at paths like:
```jsx
<img src="/images/pastors/pastor-john.jpg" alt="Pastor John" />
```

---

## 🚀 Part 2: Supabase Storage Setup (Dynamic Images)

### 1. Run Storage Setup SQL
In your Supabase SQL Editor, run:
```sql
-- Copy contents from: database/storage-setup.sql
```
This creates 5 storage buckets:
- `church-images` - Church building, logo, etc.
- `ministry-images` - Ministry photos
- `event-images` - Event photos
- `gallery-images` - General gallery
- `user-uploads` - User-submitted images

### 2. Run Enhanced Database Schema
In Supabase SQL Editor, run:
```sql
-- Copy contents from: database/add-images-support.sql
```
This adds the `church_gallery` table for dynamic image management.

### 3. Test Image Upload
1. Start your dev server: `npm run dev`
2. Go to: `http://localhost:3000/admin/images`
3. Upload test images to different categories
4. Verify they appear in Supabase Storage dashboard

---

## 🔧 Part 3: Using the Image System

### Static Images (Recommended for Fixed Content)
```jsx
// Logo, pastor photos, etc.
<img src="/images/logo.png" alt="Church Logo" />
<img src="/images/pastors/pastor-john.jpg" alt="Pastor John" />
```

### Dynamic Images (User Uploads)
```jsx
import ImageUpload from '@/components/ImageUpload'
import { imageStorage } from '@/lib/storage'

// Upload component
<ImageUpload 
  bucketType="events" 
  folder="conference-2024"
  multiple={true}
  onUpload={(result) => console.log('Uploaded:', result)}
/>

// Get uploaded images
const images = await imageStorage.listImages('events', 'conference-2024')
```

### Gallery Database
```jsx
import { gallery } from '@/lib/database'

// Add to gallery
await gallery.addImage({
  title: "Sunday Service",
  description: "Morning worship",
  image_url: "https://supabase-url/storage/v1/object/public/...",
  category: "services",
  is_featured: true
})

// Get gallery images
const result = await gallery.getImages('services', true) // featured services
```

---

## 📱 Part 4: Image Management Features

### Admin Panel
- **URL**: `/admin/images`
- **Features**: Upload, view, delete, download images
- **Categories**: Church, Ministry, Events, Gallery, User Uploads

### Image Upload Component
- **Drag & drop** file upload
- **Multiple file** support
- **Image preview** before upload
- **File validation** (type & size)
- **Progress indicators**

### Storage Utilities
- **Automatic thumbnails**
- **File compression**
- **Batch uploads**
- **URL generation**
- **Image optimization**

---

## 🎯 Quick Start Checklist

### Immediate (Static Images):
- [ ] Add `pastor-john.jpg` to `/public/images/pastors/`
- [ ] Add your church logo to `/public/images/logo.png`
- [ ] Test website - images should appear

### Advanced (Dynamic Storage):
- [ ] Run `database/storage-setup.sql` in Supabase
- [ ] Run `database/add-images-support.sql` in Supabase  
- [ ] Visit `/admin/images` and test upload
- [ ] Upload images to different categories

### Production Ready:
- [ ] Optimize all images (compress, resize)
- [ ] Set up image CDN (optional)
- [ ] Configure proper backup strategy
- [ ] Add admin authentication to `/admin/images`

---

## 🔍 Troubleshooting

**Images not showing?**
1. Check file paths match exactly
2. Ensure images are in `/public/images/` folder
3. Verify file extensions (`.jpg`, `.png`, etc.)

**Upload not working?**
1. Check Supabase storage buckets are created
2. Verify environment variables are set
3. Check browser console for errors

**Storage errors?**
1. Confirm storage policies are created
2. Check file size limits (5MB max)
3. Verify file types are allowed

---

Your image system is now ready! 🎉