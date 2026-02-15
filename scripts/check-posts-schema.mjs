import { Client, Databases } from 'node-appwrite';
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
const POSTS_COL_ID = 'posts';

if (!API_KEY) {
    console.error("API Key missing!");
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function checkSchema() {
    try {
        console.log(`Checking schema for collection: ${POSTS_COL_ID}`);
        const { attributes } = await databases.listAttributes(DATABASE_ID, POSTS_COL_ID);
        console.log("Attributes found:");
        attributes.forEach(attr => {
            console.log(`Attribute: ${attr.key}`);
            console.log(`  Type: ${attr.type}`);
            console.log(`  Required: ${attr.required}`);
            console.log(`  Array: ${attr.array}`);
        });

        const categoryAttr = attributes.find(a => a.key === 'category');
        if (!categoryAttr) {
            console.error("!! 'category' attribute is MISSING !!");
        } else {
            console.log("OK: 'category' attribute exists.");
        }

    } catch (error) {
        console.error("Failed to check schema:", error);
    }
}

checkSchema();
