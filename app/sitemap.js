import { getAllPosts } from '@/lib/wordpress';

export default async function sitemap() {
    const posts = await getAllPosts();
    const baseUrl = 'https://devfixer.com'; // Replace with actual site URL if different

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...blogPosts,
    ];
}
