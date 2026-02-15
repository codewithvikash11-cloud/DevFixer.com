"use server";

import { databases, Query, DATABASE_ID, getCollection } from '../server-appwrite';
import { ID } from 'node-appwrite';

const { col: COLLECTION_ID } = getCollection('posts');

export async function getPosts(limit = 100, status = 'published', categoryId = null) {
    try {
        const queries = [
            Query.orderDesc('$createdAt'),
            Query.limit(limit)
        ];

        if (status && status !== 'all') {
            queries.push(Query.equal('status', status));
        }

        if (categoryId) {
            queries.push(Query.equal('category', categoryId));
        }

        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);

        return documents.map(doc => ({
            id: doc.$id,
            ...doc
        }));
    } catch (error) {
        console.error('Appwrite getPosts error:', error);
        return [];
    }
}

export async function getPostById(id) {
    try {
        const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        return { id: doc.$id, ...doc };
    } catch (error) {
        console.error('Appwrite getPostById error:', error);
        return null;
    }
}

export const getPost = getPostById;

export const getPostBySlug = async (slug) => {
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('slug', slug),
            Query.limit(1)
        ]);

        if (documents.length === 0) return null;
        return { id: documents[0].$id, ...documents[0] };
    } catch (error) {
        console.error('Appwrite getPostBySlug error:', error);
        return null;
    }
};

// HELPER FOR COMPONENT COMPATIBILITY
// Some components might still expect the old JSON structure or need specific fields.
// The mapping above { id: doc.$id, ...doc } should suffice.


