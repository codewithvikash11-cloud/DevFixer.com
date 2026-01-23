export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://devfixer.com/sitemap.xml', // Replace with actual domain
    }
}
