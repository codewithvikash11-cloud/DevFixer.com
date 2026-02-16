import React, { Suspense } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getPosts } from '@/lib/actions/posts';
import { getCategories } from '@/lib/actions/categories';
import ErrorsList from '@/components/ErrorsList';

export const metadata = {
    title: 'Blog | DevFixer',
    description: 'Latest updates and articles.',
};

export default async function BlogPage() {
    const [blogPosts, categories] = await Promise.all([
        getPosts(100, 'published'), // Show all for now, or filter by 'Blog'
        getCategories()
    ]);

    const posts = blogPosts.map(p => ({
        title: p.title,
        slug: p.slug,
        language: p.language || 'Article',
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
                <h1 className="text-3xl font-bold mb-6 text-accent-primary">Blog</h1>
                <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
                    <ErrorsList initialPosts={posts} categories={categories} />
                </Suspense>
            </div>
        </LayoutWrapper>
    );
}
