/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack config (required for Next.js 16)
  turbopack: {},
  // Webpack alias for libsql client compatibility (fallback)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@libsql/client': '@libsql/client/node',
      }
    }
    return config
  },
}

export default nextConfig
