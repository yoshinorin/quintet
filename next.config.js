const path = require("path");
const { execSync } = require("child_process");
const pkg = require("./package.json");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NEXT_ANALYZE
    ? process.env.NEXT_ANALYZE === "true"
    : "false"
});

let commitHash = "N/A";
let commitUrl = "N/A";
try {
  commitHash = execSync("git show --format='%h' --no-patch")
    .toString()
    .trim()
    .replaceAll("'", "");
  commitUrl =
    pkg.repository && commitHash
      ? `${pkg.repository}/commit/${commitHash}`
      : "N/A";
} catch {
  // Nothing todo
}

module.exports = withBundleAnalyzer({
  env: {
    QUINTET_PRODUCT_NAME: pkg.name ? pkg.name : "N/A",
    QUINTET_VERSION: pkg.version ? pkg.version : "N/A",
    QUINTET_REPO: pkg.repository ? pkg.repository : "N/A",
    QUINTET_COMMIT_HASH: commitHash,
    QUINTET_COMMIT_URL: commitUrl,
    QUINTET_RUNTIME: "Node.js",
    QUINTET_RUNTIME_VERSION: process.version ? process.version : "N/A",
    QUINTET_BUILD_AT: (Math.floor(Date.now() / 1000)).toString()
  },
  /*
  serverRuntimeConfig: {
    runtime: process.version,
  },
  */
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    // FIXME: delete this option after versionup
    silenceDeprecations: ["legacy-js-api"]
  },
  experimental: {
    scrollRestoration: true
    // optimizePackageImports: ['<packageName>'],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: false // already gzipped with the `HTTP server`. No need with `Next.js`.
});
