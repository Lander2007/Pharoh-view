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
    }
    return config
  },
}

export default nextConfig
