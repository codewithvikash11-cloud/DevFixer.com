import { getPosts } from '@/lib/actions/posts';
import { getPages } from '@/lib/actions/pages';

export default async function sitemap() {
    const baseUrl = 'https://devfixer.com'; // Replace with actual domain

    // Fetch all contents
    const posts = await getPosts(1000, 'published');
    const pages = await getPages();

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/errors/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const pageUrls = pages.map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.9,
    }));

    const staticRoutes = [
        '',
        '/errors',
        '/snippets',
        '/tools',
        '/learn',
        '/about',
        '/contact',
        '/privacy-policy',
        '/login',
        '/signup',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));

    return [...staticRoutes, ...postUrls, ...pageUrls];
}
