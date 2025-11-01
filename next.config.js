/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['aromathaispa.zenoti.com'], // Add any external image domains if needed
  },
}

module.exports = nextConfig