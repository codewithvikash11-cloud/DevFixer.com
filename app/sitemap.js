import { LANGUAGES } from '@/lib/languages';
import { getPosts } from '@/lib/actions/posts';
import { getPosts as getBlogPosts } from '@/lib/wordpress';

const BASE_URL = 'https://errorwiki.com';

export default async function sitemap() {
    // Static routes
    const routes = ['', '/languages', '/errors', '/blog'].map((route) => ({
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

    // Dynamic Error Post routes
    let postRoutes = [];
    try {
        const posts = await getPosts(1000); // Fetch up to 1000 posts
        postRoutes = posts.map((post) => ({
            url: `${BASE_URL}/error/${post.slug}`,
            lastModified: new Date(post.updatedAt || new Date()),
            changeFrequency: 'weekly',
            priority: 0.9
        }));
    } catch (error) {
        console.error("Sitemap generation error (Error Posts):", error);
    }

    // Dynamic Blog Post routes
    let blogRoutes = [];
    try {
        const { posts: blogPosts } = await getBlogPosts(1, 100); // Fetch recent 100 blog posts
        blogRoutes = blogPosts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.modified || post.date),
            changeFrequency: 'weekly',
            priority: 0.8
        }));
    } catch (error) {
        console.error("Sitemap generation error (Blog Posts):", error);
    }

    return [...routes, ...languageRoutes, ...postRoutes, ...blogRoutes];
}
