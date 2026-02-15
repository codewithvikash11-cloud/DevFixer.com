import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID || 'posts';

if (!API_KEY) {
    console.error("API Key missing!");
    process.exit(1);
}

console.log(`Endpoint: ${ENDPOINT}`);
console.log(`Project: ${PROJECT_ID}`);
console.log(`Database: ${DATABASE_ID}`);
console.log(`Table: ${TABLE_ID}`);

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function testConnection() {
    try {
        console.log("Fetching posts...");
        const queries = [
            Query.limit(5)
        ];
        // Use table ID from env or default 'posts'
        // In server-appwrite.js we used helper, here we simulate it.
        const { documents } = await databases.listDocuments(DATABASE_ID, TABLE_ID, queries);
        console.log(`Success! Found ${documents.length} posts.`);
        documents.forEach(doc => console.log(`- [${doc.status}] ${doc.title} (${doc.$id})`));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        process.exit(1);
    }
}

testConnection();
