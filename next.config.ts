import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.inside.com.tw',
        pathname: '**',
      },
              {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://localhost:5065/:path*',
        basePath: false,
        locale: false,
      },
      {
        source: '/api/news',
        destination: `${process.env.NEWS_API_URL}?language=zh&q=%E7%BE%8E%E9%A3%9F&apiKey=${process.env.NEWS_API_KEY}`,
      }
    ];
  },
};

export default nextConfig;
