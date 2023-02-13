/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: false,
    // appDir: true,
  },
}

module.exports = nextConfig
