# PHAROVIEW Landing Page - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Free tier available
- Automatic deployments from Git

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts** and your site will be live

**Environment Setup:**
- No environment variables needed for this project
- Automatic builds on git push

---

### Option 2: Netlify

**Advantages:**
- Easy Git integration
- Automatic deployments
- Free SSL certificates
- Form handling
- Serverless functions

**Steps:**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

**Or connect via Git:**
1. Push to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

---

### Option 3: GitHub Pages

**Advantages:**
- Free hosting
- Git-based workflow
- No build configuration needed

**Steps:**

1. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/pharoview-landing/', // Replace with your repo name
     plugins: [react()],
   })
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Select "Pages"
   - Choose "Deploy from a branch"
   - Select `main` branch and `/root` folder

---

### Option 4: Traditional Hosting (Shared/VPS)

**Steps:**

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload dist folder**
   - Use FTP/SFTP to upload `dist/` folder contents
   - Or use your hosting provider's file manager

3. **Configure web server**
   - Point domain to `dist/` folder
   - Ensure 404 errors redirect to `index.html` (for SPA routing)

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/pharoview/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache Configuration:**
```apache
<Directory /var/www/pharoview/dist>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</Directory>
```

---

### Option 5: Docker Deployment

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build and run:**
```bash
docker build -t pharoview-landing .
docker run -p 3000:3000 pharoview-landing
```

---

## 🔧 Pre-Deployment Checklist

- [ ] Test locally: `npm run dev`
- [ ] Build successfully: `npm run build`
- [ ] No console errors
- [ ] All links working
- [ ] Mobile responsive
- [ ] 3D model loads
- [ ] Animations smooth
- [ ] Images optimized
- [ ] Meta tags updated
- [ ] Analytics configured

---

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Use tools like ImageOptim or TinyPNG
   ```

2. **Enable Compression**
   - Gzip compression on server
   - Brotli for better compression

3. **Minify Assets**
   - Vite does this automatically
   - Check `dist/` folder size

4. **Lazy Load Components**
   - Already implemented with Suspense
   - 3D model loads on demand

### After Deployment

1. **Monitor Performance**
   - Use Google PageSpeed Insights
   - Check Core Web Vitals
   - Monitor error rates

2. **Set Up Analytics**
   - Google Analytics
   - Hotjar for heatmaps
   - Sentry for error tracking

---

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data in code
- [ ] Dependencies up to date
- [ ] CSP headers set
- [ ] CORS configured if needed
- [ ] Rate limiting enabled
- [ ] DDoS protection active

### Security Headers (Nginx)
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

---

## 🌍 CDN Configuration

### Cloudflare (Recommended)

1. **Add domain to Cloudflare**
2. **Update nameservers** at domain registrar
3. **Enable caching**
   - Page Rules for aggressive caching
   - Browser cache TTL: 1 month
4. **Enable security**
   - DDoS protection
   - WAF rules
   - Bot management

### AWS CloudFront

1. **Create S3 bucket**
   ```bash
   aws s3 mb s3://pharoview-landing
   ```

2. **Upload dist folder**
   ```bash
   aws s3 sync dist/ s3://pharoview-landing/
   ```

3. **Create CloudFront distribution**
   - Origin: S3 bucket
   - Default root object: index.html
   - Enable compression

---

## 📈 Monitoring & Analytics

### Google Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Error Tracking (Sentry)
```javascript
// Add to src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3D Model Not Loading
- Check browser console for errors
- Verify WebGL support
- Check network tab for failed requests

### Slow Performance
- Check Core Web Vitals
- Optimize images
- Enable compression
- Use CDN
- Check for memory leaks

### CORS Issues
- Configure CORS headers on server
- Check API endpoints
- Verify domain whitelist

---

## 📞 Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://react.dev/learn/deployment)

---

**Ready to deploy? Choose your platform and go live! 🚀**
