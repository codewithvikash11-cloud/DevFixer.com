import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getPostsByCategory, getCategories } from '../../lib/wordpress';
import ErrorsList from '@/components/ErrorsList'; // Reusing generic list component for consistency

export const metadata = {
    title: 'Code Snippets | DevFixer',
    description: 'Useful code snippets for React, Python, JavaScript, and more.',
};

export default async function SnippetsPage() {
    // Fetch snippets category posts
    const [snippets, categories] = await Promise.all([
        getPostsByCategory('snippet', 1, 100),
        getCategories()
    ]);

    // Mapper function
    const posts = snippets.map(p => ({
        title: p.title.rendered,
        slug: p.slug,
        language: p._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
        categories: p.categories,
        description: p.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
        date: new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        views: '100+',
        difficulty: 'Intermediate',
        verified: true,
        likes: 0
    }));

    return (
        <LayoutWrapper>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-accent-primary">Code Snippets</h1>
                {posts.length > 0 ? (
                    <ErrorsList initialPosts={posts} categories={categories} />
                ) : (
                    <div className="text-center py-20 bg-surface/50 rounded-xl border border-dashed border-border">
                        <h3 className="text-lg font-bold">No snippets found</h3>
                        <p className="text-text-secondary">Admin: Create a category named "snippet" and add posts to it.</p>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
