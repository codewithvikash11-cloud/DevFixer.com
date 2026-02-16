import React, { Suspense } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getPosts } from '@/lib/actions/posts';
import { getCategories } from '@/lib/actions/categories';
import ErrorsList from '@/components/ErrorsList';

export const metadata = {
    title: 'Developer Tools | DevFixer',
    description: 'Essential tools for developers.',
};

export default async function ToolsPage() {
    // Fetch tools
    const [tools, categories] = await Promise.all([
        getPosts(100, 'published', 'Tools'), // Assumes 'Tools' category exists
        getCategories()
    ]);

    const posts = tools.map(p => ({
        title: p.title,
        slug: p.slug,
        language: p.language || 'Tool',
        categories: [p.category],
        description: p.description || '',
        date: new Date(p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        views: p.views || 0,
        difficulty: 'N/A',
        verified: true,
        likes: 0
    }));

    return (
        <LayoutWrapper>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-accent-primary">Developer Tools</h1>
                {posts.length > 0 ? (
                    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading tools...</div>}>
                        <ErrorsList initialPosts={posts} categories={categories} />
                    </Suspense>
                ) : (
                    <div className="text-center py-20 bg-surface/50 rounded-xl border border-dashed border-border">
                        <h3 className="text-lg font-bold">No tools found</h3>
                        <p className="text-text-secondary">Admin: Create a category named "tool" and add posts to it.</p>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
