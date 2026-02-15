import { Client, Databases, Query } from 'node-appwrite';

// Appwrite Configuration
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY; // Secret API Key for server-side actions
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

if (!API_KEY) {
    console.warn("Appwrite API Key is missing. Database operations will fail.");
}

// Initialize Admin Client (Server-side only)
const client = new Client();
client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

// Helper to get collection config
// We can hardcode collection IDs if they are constant, or use env vars if preferred.
// Based on admin panel, 'posts' seems to generally map to a specific collection ID or name.
// For now, we'll assume the env var NEXT_PUBLIC_APPWRITE_TABLE_ID is the posts collection ID, 
// or we can use a helper similar to the admin panel if we know the mapping.
// Admin panel used: const { col: COLLECTION_ID } = getCollection('posts');
// And getCollection returned { db: DATABASE_ID, col: collectionName }. 
// BUT wait, admin panel's getCollection just returned the name passed to it? 
// Let's re-read admin panel's appwrite.js carefully.
// const getCollection = (collectionName) => { return { db: DATABASE_ID, col: collectionName }; };
// So it expects the collection ID to BE the name 'posts' OR 'posts' is being mapped elsewhere?
// Actually in admin posts.js: const { col: COLLECTION_ID } = getCollection('posts');
// So it seems the Collection ID IS 'posts' (or the variable value).
// The .env.local in admin says: NEXT_PUBLIC_APPWRITE_TABLE_ID=posts
// So it seems likely the collection ID is "posts".

const getCollection = (collectionName) => {
    return { db: DATABASE_ID, col: collectionName };
};

export { client, databases, Query, DATABASE_ID, getCollection };
