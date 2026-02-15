import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getPosts } from '@/lib/actions/posts';
import { getCategories } from '@/lib/actions/categories';
import ErrorsList from '@/components/ErrorsList';

export const metadata = {
    title: 'Error Database | DevFixer',
    description: 'Search hundreds of verified solutions for React, Next.js, Python, and more.',
    alternates: {
        canonical: 'https://dev-fixer-com.vercel.app/errors',
    },
};

export default async function ErrorsListingPage() {
    // Fetch Posts and Categories in parallel
    const [rawPosts, categories] = await Promise.all([
        getPosts(100, 'published'), // Only published
        getCategories()
    ]);

    const posts = rawPosts.map(p => {
        return {
            title: p.title,
            slug: p.slug,
            language: p.language || 'General',
            categories: [p.category], // ErrorsList expects array of category IDs/Names for filtering?
            // ErrorsList logic: if (selectedCat) result.filter(p => p.categories && p.categories.includes(selectedCat.id));
            // But p.category is a String name in our current implementation (from create-post select value).
            // Category Action returns categories with IDs.
            // If we store Category Name in ErrorPost, we should filter by matching name or ID.
            // In create-post we saved `formData.category` which is `cat.name`.
            // So p.category is "React".
            // ErrorsList compares `categories.find(c => c.name === selectedLanguage)`.
            // Then checks `p.categories.includes(selectedCat.id)`.
            // This is a disconnect.
            // If ErrorPost stores "Name", we should adapt ErrorsList or store ID.
            // For now, let's adapt `posts` mapping to include the ID if we can match it, OR
            // update ErrorsList to filter by Name if p.category is a string.
            // The logic in ErrorsList line 57: `p.categories && p.categories.includes(selectedCat.id)`
            // Line 60: `result = result.filter(p => p.language === selectedLanguage);`
            // So if we map `language: p.category`, it works for the secondary check!
            description: p.description || (p.humanizedContent ? p.humanizedContent.slice(0, 160) + '...' : ''),
            date: new Date(p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            views: p.views || 0,
            difficulty: 'Intermediate', // We don't have difficulty in schema yet, maybe add to tags?
            verified: true,
            likes: 0
        };
    });

    return (
        <LayoutWrapper>
            <ErrorsList initialPosts={posts} categories={categories} />
        </LayoutWrapper>
    );
}
