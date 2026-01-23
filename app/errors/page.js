import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getErrorsPosts, getCategories } from '@/lib/wordpress';
import ErrorsList from '@/components/ErrorsList';

export const metadata = {
    title: 'Error Database | DevFixer',
    description: 'Search hundreds of verified solutions for React, Next.js, Python, and more.',
    alternates: {
        canonical: 'https://dev-fixer-com.vercel.app/errors',
    },
};

export default async function ErrorsListingPage() {
    // Fetch a large batch to allow initial client-side filtering similar to previous "mock" behavior
    // Ideally we would implement server-side search params, but retaining exact UI/UX often suggests keeping the immediate feedback loop of client-side filter if the dataset is manageable.
    // Fetch Posts and Categories in parallel
    const [rawPosts, categories] = await Promise.all([
        getErrorsPosts(1, 100),
        getCategories()
    ]);

    const posts = rawPosts.map(p => {
        // Map Tags/Categories to "Language" or "Difficulty"
        // This is heuristic based on what WP API returns.
        // Assuming categories[0] might be language.
        const language = p._embedded?.['wp:term']?.[0]?.[0]?.name || 'General';

        return {
            title: p.title.rendered,
            slug: p.slug,
            language: language, // Display purpose
            categories: p.categories, // Array of Category IDs for filtering
            description: p.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
            date: new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            views: '100+', // Placeholder as WP standard API doesn't allow view counting without plugins
            difficulty: 'Intermediate', // Placeholder
            verified: true, // Placeholder
            likes: 0 // Placeholder
        };
    });

    return (
        <LayoutWrapper>
            <ErrorsList initialPosts={posts} categories={categories} />
        </LayoutWrapper>
    );
}
