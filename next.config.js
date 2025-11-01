/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['aromathaispa.zenoti.com', 'res.cloudinary.com'], // Add Cloudinary domain for uploaded images
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
}

module.exports = nextConfig