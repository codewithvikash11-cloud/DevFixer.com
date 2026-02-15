import { Client, Databases, Query, ID } from 'node-appwrite';
import fs from 'fs';
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
const POSTS_COL_ID = 'posts'; // Default from env or hardcoded name
const CAT_COL_ID = 'categories';

if (!API_KEY) {
    console.error("API Key missing!");
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function testCategoryFiltering() {
    try {
        console.log("1. Creating Test Category...");
        const cat = await databases.createDocument(DATABASE_ID, CAT_COL_ID, ID.unique(), {
            name: 'Test Cat ' + Date.now(),
            slug: 'test-cat-' + Date.now(),
            count: 0
        });
        console.log(`   Created Category: ${cat.name} (${cat.$id})`);

        console.log("2. Creating Test Post with Category...");
        const post = await databases.createDocument(DATABASE_ID, POSTS_COL_ID, ID.unique(), {
            title: 'Test Post ' + Date.now(),
            slug: 'test-post-' + Date.now(),
            content: 'Test content',
            status: 'published',
            category: cat.$id,
            viewCount: 0,
            userId: 'test-user',
            authorName: 'Test Author',
            authorId: 'test-user',
            createdAt: new Date().toISOString()
        });
        console.log(`   Created Post: ${post.title} (${post.$id})`);

        console.log("3. Fetching Posts with Category Filter...");
        const queries = [
            Query.equal('category', cat.$id)
        ];
        const { documents } = await databases.listDocuments(DATABASE_ID, POSTS_COL_ID, queries);

        if (documents.length > 0 && documents[0].$id === post.$id) {
            console.log("   SUCCESS! Post found by category.");
        } else {
            console.error("   FAILURE! Post NOT found by category.");
            console.log("   Found:", documents.map(d => d.title));
        }

        console.log("4. Cleaning up...");
        await databases.deleteDocument(DATABASE_ID, POSTS_COL_ID, post.$id);
        await databases.deleteDocument(DATABASE_ID, CAT_COL_ID, cat.$id);
        console.log("   Cleanup complete.");

    } catch (error) {
        console.error("Test Failed (Writing to test_error.json)");
        fs.writeFileSync('test_error.json', JSON.stringify(error, null, 2));
    }
}

testCategoryFiltering();
