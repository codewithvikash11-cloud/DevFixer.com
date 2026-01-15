import { LANGUAGES } from '@/lib/languages';
import { getPosts } from '@/lib/actions/posts';

const BASE_URL = 'https://errorwiki.com';

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

    // Dynamic Post routes
    let postRoutes = [];
    try {
        const posts = await getPosts(1000); // Fetch up to 1000 posts
        postRoutes = posts.map((post) => ({
            url: `${BASE_URL}/error/${post.slug}`, // Assuming /error structure based on audit
            lastModified: new Date(post.updatedAt || new Date()),
            changeFrequency: 'weekly',
            priority: 0.9
        }));
    } catch (error) {
        console.error("Sitemap generation error:", error);
    }

    return [...routes, ...languageRoutes, ...postRoutes];
}
