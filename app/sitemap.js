import { LANGUAGES } from '@/lib/languages';

const BASE_URL = 'https://devfixer.com';

export default async function sitemap() {
    // Static routes
    const routes = ['', '/languages', '/errors', '/blogs'].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));

    // Language routes
    const languageRoutes = LANGUAGES.map((lang) => ({
        url: `${BASE_URL}/languages/${lang.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // Error routes (Mock data for now, would fetch from DB/Files)
    // As we don't have a real DB of errors yet, we'll map a few example ones if we had them or skip.
    // Ideally this would be: 
    // const posts = await getAllPosts(); 
    // const postRoutes = posts.map(...)
    // For now we will include the static ones referenced in the UI or leave generic.

    return [...routes, ...languageRoutes];
}
