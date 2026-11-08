const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/posts/we-cant-feel-our-own-speed', destination: '/posts/gettier-code', permanent: true },
      { source: '/posts/the-last-programmers', destination: '/posts/gettier-code', permanent: true },
      { source: '/posts/slot-machine-coding', destination: '/posts/gettier-code', permanent: true },
      { source: '/posts/after-us', destination: '/posts/gettier-code', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Public-domain photos served through Vercel's image optimiser from Wikimedia Commons
    remotePatterns: [{ protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/wikipedia/commons/**' }],
  },
}

module.exports = withContentlayer(nextConfig)
