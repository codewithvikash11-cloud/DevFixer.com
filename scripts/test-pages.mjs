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
const COLLECTION_ID = 'pages';

if (!API_KEY) {
    console.error("API Key missing!");
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function testPages() {
    try {
        console.log("1. Creating Test Page (Admin Logic)...");
        const slug = `test-page-${Date.now()}`;
        const page = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            title: 'Test Page',
            slug: slug,
            content: '<h1>Hello World</h1><p>This is a test page.</p>',
            isPublished: true,
            publishedAt: new Date().toISOString()
        });
        console.log(`   Created Page: ${page.title} (${page.$id})`);

        console.log("2. Fetching Page by Slug (Website Logic)...");
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('slug', slug),
            Query.equal('isPublished', true),
            Query.limit(1)
        ]);

        if (documents.length > 0) {
            console.log(`   SUCCESS! Page found: ${documents[0].title}`);
        } else {
            console.error("   FAILED! Page not found.");
        }

        console.log("3. Cleanup...");
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, page.$id);
        console.log("   Cleanup complete.");

    } catch (error) {
        console.error("Test Failed (Writing to test_pages_error.json)");
        fs.writeFileSync('test_pages_error.json', JSON.stringify(error, null, 2));
    }
}

testPages();
