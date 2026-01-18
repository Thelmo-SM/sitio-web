import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // <--- AGREGA ESTE PARA CLOUDINARY
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'istuffcr.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.apple.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.samsung.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;