# Image Directory Structure

## 📁 /public/images/

### Required Images (Place your images here):

#### Pastors:
- `pastors/pastor-john.jpg` - Pastor John Mwakasege (used in homepage, about, contact)

#### Ministries:
- `ministries/youth.jpg` - Youth Ministry
- `ministries/worship.jpg` - Worship Team
- `ministries/children.jpg` - Children Ministry
- `ministries/prayer.jpg` - Prayer Ministry
- `ministries/outreach.jpg` - Community Outreach

#### Church:
- `logo.png` - Church logo (transparent background preferred)
- `church-building.jpg` - Main church building
- `hero-background.jpg` - Hero section background

#### Events:
- `events/conference.jpg` - Church conferences
- `events/baptism.jpg` - Baptism ceremonies
- `events/fellowship.jpg` - Fellowship events

#### Gallery:
- `gallery/service1.jpg` - Sunday services
- `gallery/service2.jpg` - Worship moments
- `gallery/community1.jpg` - Community events

## 📱 Image Specifications:

### Recommended Sizes:
- **Logo**: 200x200px (PNG with transparent background)
- **Pastor Photos**: 400x500px (Portrait orientation)
- **Ministry Images**: 600x400px (Landscape)
- **Hero Background**: 1920x1080px (High resolution)
- **Event Images**: 800x600px
- **Gallery Images**: 600x400px

### Format Guidelines:
- **JPEG**: For photos (smaller file size)
- **PNG**: For logos and images needing transparency
- **WebP**: For modern browsers (optional, better compression)

## 🔧 How to Use:

1. Place your images in the appropriate folders
2. Images are automatically accessible at `/images/folder/filename.jpg`
3. No imports needed, just use the path directly in your components

Example:
```jsx
<img src="/images/pastors/pastor-john.jpg" alt="Pastor John" />
```