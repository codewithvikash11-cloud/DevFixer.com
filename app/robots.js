export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://dev-fixer-com.vercel.app/sitemap.xml',
    }
}
