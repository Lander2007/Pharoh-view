/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.BUILD_STANDALONE === 'true' ? { output: 'standalone' } : {}),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/pharoview.apk',
        destination: '/app-release.apk',
      },
      {
        source: '/PHAROVIEW%20%20Web.apk',
        destination: '/app-release.apk',
      },
    ]
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
