import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'istuffcr.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // El que te dio el error ahora
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Tus futuras fotos propias
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