# Video Setup Guide for Program Management Page

## Adding Your Demo Video

The Program Management page now has a built-in video player section. Follow these steps to add your demo video:

### Step 1: Prepare Your Video Files

1. **Video File**: Your main demo video
   - Supported formats: MP4, WebM, Ogg
   - Recommended format: **MP4** (best browser compatibility)
   - Recommended resolution: 1920x1080 (Full HD)
   - File name: `demo-program.mp4`
   - Maximum recommended size: 50-100 MB

2. **Poster Image** (Optional): The image shown before video plays
   - Format: JPG or PNG
   - Recommended resolution: 1920x1080
   - File name: `video-poster.jpg`

### Step 2: Add Files to Public Folder

1. Copy your video file to: `frontend/public/demo-program.mp4`
2. Copy your poster image to: `frontend/public/video-poster.jpg` (optional)

### Step 3: Update Video Configuration (if needed)

If you want to change the video file name or poster, edit `frontend/pages/ProgramManagement.tsx`:

```tsx
<video 
  className="w-full h-full object-cover"
  controls
  poster="/your-poster-image.jpg"
>
  <source src="/your-video-file.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### Video Player Features

The embedded video player includes:
- ✅ Play/Pause controls
- ✅ Volume control
- ✅ Fullscreen option
- ✅ Progress bar
- ✅ Responsive design
- ✅ Poster image support

### Tips for Best Results

- **Video Duration**: Keep demo videos between 2-5 minutes for optimal engagement
- **File Format**: MP4 offers the best compatibility across all browsers
- **Compression**: Compress your video for faster loading times
- **Poster**: Use an attractive frame from your video as the poster image
- **Captions**: Consider adding captions for accessibility

### Alternative: Using External Video Services

If you prefer to host the video on an external service, you can modify the code to embed:

**YouTube:**
```tsx
<iframe 
  width="100%" 
  height="100%" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen
/>
```

**Vimeo:**
```tsx
<iframe 
  src="https://player.vimeo.com/video/VIDEO_ID" 
  width="100%" 
  height="100%" 
  frameBorder="0" 
  allow="autoplay; fullscreen"
/>
```

---

Once you add your video file, it will automatically display on the Program Management page with full playback controls!
