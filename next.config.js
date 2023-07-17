const path = require('path');

const withBundleAnalyzer = () => process.env.NEXT_ANALYZE ? process.env.NEXT_ANALYZE.trim() === 'true' : false
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config;

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
  swcMinify: true
});
