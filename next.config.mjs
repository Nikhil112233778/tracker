import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: true,
  cacheOnNavigation: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack config (required for Next.js 16)
  turbopack: {
    resolveAlias: {
      '@libsql/client': '@libsql/client/node',
    },
  },
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
  // Ensure API routes work correctly
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
}

export default withSerwist(nextConfig)
