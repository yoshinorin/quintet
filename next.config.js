const path = require('path');
const { execSync } = require('child_process');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_ANALYZE ? process.env.NEXT_ANALYZE === 'true' : 'false',
});

let commitHash = "N/A"
try {
  commitHash = execSync("git show --format='%h' --no-patch").toString().trim().replaceAll("'","");
} catch {
  // Nothing todo
}

module.exports = withBundleAnalyzer({
  env: {
    commitHash: commitHash
  },
  serverRuntimeConfig: {
    runtime: process.version,
  },
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
