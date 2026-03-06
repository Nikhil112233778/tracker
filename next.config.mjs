/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empty turbopack config to allow webpack config for production builds
  turbopack: {},
  // Webpack alias for libsql client compatibility (used in production builds)
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
