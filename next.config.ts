import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/blog',
  assetPrefix: '/blog',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;