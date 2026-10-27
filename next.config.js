const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/posts/we-cant-feel-our-own-speed', destination: '/posts/slot-machine-coding', permanent: true }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Public-domain photos served through Vercel's image optimiser from Wikimedia Commons
    remotePatterns: [{ protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/wikipedia/commons/**' }],
  },
}

module.exports = withContentlayer(nextConfig)
