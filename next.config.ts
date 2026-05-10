import { NextConfig } from 'next';

const createNextIntlPlugin = require('next-intl/plugin');

function getBackendRemotePattern() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    return [];
  }

  try {
    const parsed = new URL(backendUrl);
    return [{
      protocol: parsed.protocol.replace(':', '') as 'http' | 'https',
      hostname: parsed.hostname,
      port: parsed.port,
    }];
  } catch {
    return [];
  }
}

function getBackendRewriteDestination() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

  if (!backendUrl) {
    return null;
  }

  return `${backendUrl.replace(/\/$/, "")}/:path*`;
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      ...getBackendRemotePattern(),
    ],
  },
  async rewrites() {
    const backendDestination = getBackendRewriteDestination();

    if (!backendDestination) {
      return [];
    }

    return [
      {
        source: "/api/backend/:path*",
        destination: backendDestination,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
