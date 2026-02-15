"use server";

import { databases, Query, DATABASE_ID, getCollection } from '@/lib/appwrite';

const { col: COLLECTION_ID } = getCollection('settings');

export async function getSettings() {
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(100)
        ]);

        const settings = {};
        documents.forEach(doc => {
            settings[doc.key] = doc.value;
        });

        return settings;
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return {
            siteTitle: "ErrorWiki",
            siteDescription: "AI Error Fixing Engine"
        };
    }
}

export async function updateSettings(data) {
    // Frontend should arguably not be updating settings, but keeping for compatibility if needed.
    return { success: false, error: "Read only on frontend" };
}
