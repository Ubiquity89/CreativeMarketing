import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.peachworlds.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "creativemarketing.peachweb.io",
        pathname: "/**",
      },
    ],
  },
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@payload-config": "./payload.config.ts",
    };
    return config;
  },
};

export default nextConfig;
