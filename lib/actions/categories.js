"use server";

import { databases, Query, DATABASE_ID, getCollection } from '../server-appwrite';

// We assume collection name is 'categories' based on our setup script
const COLLECTION_ID = 'categories';

export async function getCategories() {
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderAsc('name'),
            Query.limit(100)
        ]);
        return documents.map(doc => ({
            id: doc.$id,
            name: doc.name,
            slug: doc.slug,
            count: doc.count
        }));
    } catch (error) {
        console.error('Appwrite getCategories error:', error);
        return [];
    }
}
