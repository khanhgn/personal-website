const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Public-domain photos served through Vercel's image optimiser from Wikimedia Commons
    remotePatterns: [{ protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/wikipedia/commons/**' }],
  },
}

module.exports = withContentlayer(nextConfig)
