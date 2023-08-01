const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_ANALYZE ? process.env.NEXT_ANALYZE === 'true' : 'false',
});

module.exports = withBundleAnalyzer({
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  experimental: {
    scrollRestoration: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: false,         // already gzipped with the `HTTP server`. No need with `Next.js`.
});
