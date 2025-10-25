/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow all origins for production (Vercel handles this automatically)
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'via.placeholder.com'],
    // Remove unoptimized for better performance on Vercel
    // unoptimized: true,
    // Enable remote patterns for Cloudinary
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;

    // Handle node modules that need special treatment for serverless
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
  // Optimize for serverless deployment
  serverExternalPackages: ['@supabase/supabase-js', 'cloudinary'],
  // Suppress warnings for optional dependencies
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
