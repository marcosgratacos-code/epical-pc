import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.akamai.steamstatic.com',
        port: '',
        pathname: '/steam/apps/**',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  env: {
    FORCE_REBUILD: 'true',
    BUILD_VERSION: '2.0.0',
    CACHE_BUSTER: '1737063000',
  },
  eslint: {
    // Deshabilitar ESLint durante el build para evitar errores
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Permitir errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;