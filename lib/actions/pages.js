'use server';

import { databases, Query, DATABASE_ID, getCollection } from '@/lib/server-appwrite';
import { cache } from 'react';

const { col: COLLECTION_ID } = getCollection('pages');

// --- Helper: Transform Appwrite Doc to Page Object ---
const transformPage = (doc) => ({
    id: doc.$id,
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    status: doc.isPublished ? 'published' : 'draft',
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    publishedAt: doc.publishedAt,
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt
});

// Cache the fetch for 60 seconds or until revalidated
export const getPageBySlug = cache(async (slug) => {
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('slug', slug),
            Query.equal('isPublished', true), // Only fetch published pages
            Query.limit(1)
        ]);

        if (documents.length === 0) return null;
        return transformPage(documents[0]);
    } catch (error) {
        console.error('getPageBySlug error:', error);
        return null;
    }
});

export const getPages = cache(async () => {
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('isPublished', true),
            Query.orderDesc('publishedAt')
        ]);
        return documents.map(transformPage);
    } catch (error) {
        return [];
    }
});
