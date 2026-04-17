# PHAROVIEW Landing Page - Getting Started

Welcome to the PHAROVIEW landing page project! This guide will help you get up and running in minutes.

---

## 🎯 What You're Building

A premium, high-end landing page for PHAROVIEW - an AR furniture visualization app that solves the "buying without seeing" problem in the furniture industry.

**Key Highlights:**
- 🎨 Dark mode with neon accents (Pharo-Tech brand)
- 🔄 Interactive 3D model with mouse tracking
- ✨ Smooth scroll animations
- 📱 Fully responsive design
- 🌍 UN Sustainability Goals integration

---

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Your browser will automatically open to `http://localhost:3000`

### 3. Start Editing
Edit any file in `src/` and see changes instantly!

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Hero.jsx        # 3D interactive hero
│   ├── Problem.jsx     # Pain points section
│   ├── Solution.jsx    # Features & how-it-works
│   ├── ValueProposition.jsx  # Bento grid
│   ├── Sustainability.jsx    # UN SDGs
│   ├── CTA.jsx         # Call-to-action
│   ├── Footer.jsx      # Footer
│   └── 3d/
│       └── FloatingChair.jsx # 3D model
├── styles/             # CSS files
│   ├── global.css      # Global styles & variables
│   ├── hero.css
│   ├── problem.css
│   ├── solution.css
│   ├── value-proposition.css
│   ├── sustainability.css
│   ├── cta.css
│   └── footer.css
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

---

## 🎨 Customization

### Change Colors
Edit `src/styles/global.css`:
```css
:root {
  --dark-void: #0a0a0a;        /* Main background */
  --pharo-gold: #D4AF37;       /* Gold accent */
  --tech-cyan: #00f3ff;        /* Cyan glow */
  /* ... more colors */
}
```

### Update Content
Each component has its own content. For example:

**Hero Section** (`src/components/Hero.jsx`):
```jsx
<h1>Before you pay... see it in your home</h1>
<p>The smart AR application for visualizing products in real-time</p>
```

**Problem Section** (`src/components/Problem.jsx`):
```jsx
const problems = [
  {
    icon: '📏',
    title: 'Wrong Measurements',
    description: 'Furniture arrives and doesn\'t fit your space',
  },
  // ... more problems
]
```

### Replace 3D Model
Edit `src/components/3d/FloatingChair.jsx` to use your own model or geometry.

---

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

Output goes to `dist/` folder.

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

See `DEPLOYMENT.md` for more options.

---

## 📚 Documentation

- **README.md** - Comprehensive documentation
- **QUICKSTART.md** - Quick setup guide
- **PROJECT_SUMMARY.md** - Detailed architecture
- **DEPLOYMENT.md** - Deployment options
- **FEATURES_CHECKLIST.md** - Complete feature list

---

## 🎯 Key Features

### 1. Interactive 3D Hero
- Mouse-tracking rotation
- Floating animation
- Glassmorphic container
- Responsive sizing

### 2. Scroll Animations
- Staggered reveals
- Smooth transitions
- Viewport triggers
- Performance optimized

### 3. Bento Grid
- Mixed-size cards
- Responsive layout
- Container queries
- Ultra-responsive

### 4. Glassmorphism
- Frosted glass effect
- Subtle borders
- Backdrop blur
- Depth layering

### 5. Responsive Design
- Mobile-first
- Touch-friendly
- Optimized typography
- Flexible layouts

---

## 🔧 Common Tasks

### Add a New Section
1. Create component in `src/components/NewSection.jsx`
2. Create styles in `src/styles/new-section.css`
3. Import in `src/App.jsx`
4. Add to JSX

Example:
```jsx
// src/components/NewSection.jsx
import React from 'react'
import '../styles/new-section.css'

export default function NewSection() {
  return (
    <section className="new-section section-padding">
      <div className="max-width-container">
        <h2>Your Content Here</h2>
      </div>
    </section>
  )
}
```

### Change Fonts
Edit `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

Then update `src/styles/global.css`:
```css
body {
  font-family: 'YourFont', sans-serif;
}
```

### Add Images
Place images in `public/` folder and reference:
```jsx
<img src="/image-name.jpg" alt="Description" />
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### 3D Model Not Rendering
- Check browser console for errors
- Ensure WebGL is supported
- Try a different browser

### Animations Not Smooth
- Check GPU acceleration
- Reduce animation complexity
- Use Chrome DevTools Performance tab

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Performance Tips

1. **Optimize Images**
   - Use modern formats (WebP)
   - Compress before uploading
   - Use appropriate sizes

2. **Lazy Load Components**
   - Already implemented with Suspense
   - 3D model loads on demand

3. **Enable Compression**
   - Gzip on server
   - Brotli for better compression

4. **Use CDN**
   - Cloudflare (recommended)
   - AWS CloudFront
   - Vercel CDN (automatic)

---

## 🔐 Security

- No sensitive data in code
- Dependencies are up to date
- HTTPS enabled on deployment
- Security headers configured
- CORS properly set

---

## 📱 Testing

### Desktop
- Chrome, Firefox, Safari, Edge
- Test all screen sizes
- Check animations

### Mobile
- iOS Safari
- Chrome Mobile
- Test touch interactions
- Check responsive layout

### 3D
- WebGL support
- Performance on mobile
- Fallback for unsupported browsers

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 💡 Next Steps

1. ✅ Install and run locally
2. ✅ Customize colors and content
3. ✅ Replace 3D model
4. ✅ Test on mobile
5. ✅ Deploy to production
6. ✅ Set up analytics
7. ✅ Monitor performance

---

## 📞 Need Help?

1. Check the documentation files
2. Review component comments
3. Check browser console for errors
4. Test in different browsers
5. Review Framer Motion docs
6. Review Three.js docs

---

## 🎉 You're Ready!

You now have a production-ready landing page. Customize it, deploy it, and watch it shine!

**Happy coding! 🚀**

---

## 📋 Checklist Before Launch

- [ ] Content updated
- [ ] Colors customized
- [ ] 3D model replaced
- [ ] Links working
- [ ] Mobile responsive
- [ ] Animations smooth
- [ ] No console errors
- [ ] Performance optimized
- [ ] Analytics configured
- [ ] Deployed to production

---

**Built with ❤️ for the future of furniture shopping**
