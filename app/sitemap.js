import { getAllPosts, getCategories } from '@/lib/wordpress';

export default async function sitemap() {
    const baseUrl = 'https://devfixer.com'; // Replace with actual domain

    // Fetch all contents
    const posts = await getAllPosts();
    const categories = await getCategories();

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/errors/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Also map to snippets/tools/learn if we knew their category, 
    // but for SEO it's safer to expose the canonical path. 
    // Since we map everything to /errors/[slug] or similar in dynamic routes...
    // Actually, we haven't created /snippets/[slug] yet.
    // For now, let's assume everything resolves via /errors/[slug] or we add logic.
    // Simpler: Just map main pages and posts.

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

    return [...staticRoutes, ...postUrls];
}
