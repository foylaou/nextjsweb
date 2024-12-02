// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://localhost:5065/:path*',
        // 加入以下設定試試看
        basePath: false,
        locale: false
      },
    ];
  },
};

export default nextConfig;
