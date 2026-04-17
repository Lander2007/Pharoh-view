# PHAROVIEW - AR Furniture Visualization Landing Page

A high-end, modern landing page for PHAROVIEW, an Augmented Reality mobile application that revolutionizes furniture shopping by allowing users to visualize products in their own spaces before purchase.

## 🎨 Design Philosophy

**Brand Identity: Pharo-Tech** - A fusion of Ancient Egyptian symbols (Eye of Horus, Pyramids) with futuristic neon circuitry.

### Color Palette
- **Dark Void**: `#0a0a0a` - Primary background
- **Pharo Gold**: `#D4AF37` - Premium accents
- **Tech Cyan**: `#00f3ff` - Futuristic glow effects

## ✨ Key Features

### 1. **Interactive 3D Hero Section**
- React Three Fiber integration for real-time 3D chair model
- Mouse-tracking rotation system
- Floating animation with ambient lighting
- Glassmorphism container with blur effects

### 2. **Advanced CSS Techniques**
- **Glassmorphism**: Frosted glass effect with `backdrop-filter: blur(12px)`
- **Container Queries**: Ultra-responsive micro-interactions
- **CSS Parent Selectors**: `:has()` for dynamic styling
- **Glow Effects**: Neon cyan and gold text/box shadows

### 3. **Framer Motion Animations**
- Scroll-triggered reveal animations
- Staggered children animations
- Hover interactions with smooth transitions
- Page transition effects

### 4. **Bento Grid Layout**
- Value Proposition section with mixed-size cards
- Responsive grid that adapts to screen size
- Container queries for ultra-responsive behavior

### 5. **Sections**

#### Hero
- Headline: "Before you pay... see it in your home"
- Dual CTA buttons (iOS/Android)
- Live 3D model visualization
- Key statistics

#### Problem
- Visual representation of furniture shopping frustrations
- 4 key pain points with icons
- Industry statistic highlight

#### Solution
- 6 core features with icons
- How-it-works step-by-step guide
- Technical capabilities overview

#### Value Proposition
- Bento grid with 5 value cards
- Mixed sizing for visual interest
- Confidence, time, cost, fit, and design freedom

#### Sustainability (SDGs)
- UN Sustainable Development Goals alignment
- Goals 12, 11, 9, and 13
- Impact metrics for each goal
- Call-to-action for sustainability

#### CTA
- Strong call-to-action section
- Download buttons for both platforms
- Feature highlights

#### Footer
- Brand information
- Navigation links
- Social media
- Legal links
- Sustainability badges

## 🚀 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **CSS3** - Advanced styling with container queries and glassmorphism

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pharoview-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
pharoview-landing/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Problem.jsx
│   │   ├── Solution.jsx
│   │   ├── ValueProposition.jsx
│   │   ├── Sustainability.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   └── 3d/
│   │       └── FloatingChair.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── hero.css
│   │   ├── problem.css
│   │   ├── solution.css
│   │   ├── value-proposition.css
│   │   ├── sustainability.css
│   │   ├── cta.css
│   │   └── footer.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎯 2026 Design Standards

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1200px
- Container queries for component-level responsiveness

### Performance
- Lazy loading for 3D models
- Optimized animations with GPU acceleration
- Efficient CSS with minimal repaints

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --dark-void: #0a0a0a;
  --pharo-gold: #D4AF37;
  --tech-cyan: #00f3ff;
  /* ... more variables */
}
```

### 3D Model
Replace the chair model in `src/components/3d/FloatingChair.jsx` with your own Three.js geometry or GLTF model.

### Content
Update text content in individual component files (Hero.jsx, Problem.jsx, etc.)

## 📱 Mobile Optimization

The landing page is fully responsive with:
- Touch-friendly buttons (min 48px)
- Optimized font sizes for mobile
- Flexible grid layouts
- Reduced animation complexity on mobile devices

## 🌍 Sustainability Features

- Optimized for low-bandwidth connections
- Minimal JavaScript bundle size
- Efficient CSS animations
- Lazy loading of non-critical assets

## 📄 License

This project is proprietary to PHAROVIEW. All rights reserved.

## 🤝 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for the future of furniture shopping**
