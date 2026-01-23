/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ]
            }
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's0.wp.com',
            },
            {
                protocol: 'https',
                hostname: 's1.wp.com',
            },
            {
                protocol: 'https',
                hostname: 's2.wp.com',
            },
            {
                protocol: 'https',
                hostname: 'savemedevcom.wordpress.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/errors',
                permanent: true,
            },
            {
                source: '/blog/:slug',
                destination: '/errors/:slug',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
