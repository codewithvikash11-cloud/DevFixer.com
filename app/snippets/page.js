import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getPosts } from '@/lib/actions/posts';
import { getCategories } from '@/lib/actions/categories';
import ErrorsList from '@/components/ErrorsList';

export const metadata = {
    title: 'Code Snippets | DevFixer',
    description: 'Useful code snippets for everyday development.',
};

export default async function SnippetsPage() {
    const [snippets, categories] = await Promise.all([
        getPosts(100, 'published', 'Snippets'),
        getCategories()
    ]);

    const posts = snippets.map(p => ({
        title: p.title,
        slug: p.slug,
        language: p.language || 'Snippet',
        categories: [p.category],
        description: p.description || '',
        date: new Date(p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        views: p.views || 0,
        difficulty: 'Easy',
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
                        <p className="text-text-secondary">Admin: Create a category named "Snippets" and add posts to it.</p>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
