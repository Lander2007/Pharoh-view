/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      // Disable eval-based source maps — eval() is blocked by iframe CSP in Figma Make
      config.devtool = 'cheap-module-source-map'
      // Use memory cache to avoid Node ArrayBuffer allocation crash with disk pack files
      config.cache = { type: 'memory' }
    }
    return config
  },
}

export default nextConfig
