# PHAROVIEW Landing Page - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The site will automatically open at `http://localhost:3000`

### Step 3: Start Developing
Edit files in `src/` and see changes instantly with hot module replacement.

---

## 📋 What You Get

### ✅ Complete Landing Page with:
- **Hero Section** with interactive 3D model (mouse-tracking rotation)
- **Problem Section** highlighting furniture shopping pain points
- **Solution Section** showcasing AR features
- **Value Proposition** with Bento Grid layout
- **Sustainability Goals** aligned with UN SDGs
- **Call-to-Action** section
- **Footer** with navigation and links

### ✅ Advanced Features:
- 🎨 Glassmorphism design with blur effects
- ✨ Framer Motion scroll animations
- 🔄 React Three Fiber 3D rendering
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎯 Container queries for ultra-responsive design
- 🌙 Dark mode with neon accents

### ✅ 2026 Design Standards:
- Modern color palette (Dark Void, Pharo Gold, Tech Cyan)
- Smooth transitions and micro-interactions
- Optimized performance
- Accessibility compliant

---

## 🎨 Customization Tips

### Change Colors
Edit `src/styles/global.css`:
```css
:root {
  --dark-void: #0a0a0a;
  --pharo-gold: #D4AF37;
  --tech-cyan: #00f3ff;
}
```

### Update Content
- **Hero**: `src/components/Hero.jsx`
- **Problem**: `src/components/Problem.jsx`
- **Solution**: `src/components/Solution.jsx`
- **Sustainability**: `src/components/Sustainability.jsx`

### Replace 3D Model
Edit `src/components/3d/FloatingChair.jsx` to use your own model or geometry.

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Traditional Hosting
Upload the `dist/` folder to your web server.

---

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── Hero.jsx
│   ├── Problem.jsx
│   ├── Solution.jsx
│   ├── ValueProposition.jsx
│   ├── Sustainability.jsx
│   ├── CTA.jsx
│   ├── Footer.jsx
│   └── 3d/
│       └── FloatingChair.jsx
├── styles/             # CSS files
│   ├── global.css
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

## 🎯 Key Features Explained

### 1. Interactive 3D Hero
- Mouse movement controls chair rotation
- Floating animation
- Glassmorphic container
- Responsive canvas sizing

### 2. Scroll Animations
- Staggered reveal animations
- Smooth transitions
- Viewport-triggered animations
- No animation on mobile for performance

### 3. Bento Grid
- Mixed-size cards in Value Proposition
- Responsive grid that adapts to screen size
- Container queries for component-level responsiveness

### 4. Glassmorphism
- Frosted glass effect on all cards
- Subtle borders with gold/cyan accents
- Backdrop blur for depth

### 5. Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px
- Touch-friendly buttons
- Optimized typography

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
- Check GPU acceleration in browser settings
- Reduce animation complexity on lower-end devices
- Use Chrome DevTools Performance tab to profile

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Vite Documentation](https://vitejs.dev/)

---

## 💡 Next Steps

1. Customize colors and branding
2. Replace placeholder content with real copy
3. Add your own 3D models
4. Integrate with backend services
5. Set up analytics
6. Deploy to production

---

**Happy coding! 🚀**
