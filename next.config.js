/** @type {import('next').NextConfig} */
const nextConfig = {
    // Empty turbopack config to silence the warning
    turbopack: {},
    // Image configuration for external domains
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    // Webpack configuration to handle SSL/TLS issues
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Ignore TLS warnings in development
            config.externals = config.externals || [];
        }
        return config;
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

module.exports = nextConfig;
