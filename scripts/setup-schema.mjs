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

async function setupSchema() {
    try {
        console.log(`Checking schema for: ${POSTS_COL_ID}`);

        // viewCount
        try {
            await databases.createIntegerAttribute(DATABASE_ID, POSTS_COL_ID, 'viewCount', false, 0, 10000000, 0);
            console.log("Created attribute: viewCount");
        } catch (e) {
            if (e.code === 409) console.log("Attribute viewCount exists.");
            else console.error("Failed to create viewCount:", e.message);
        }

    } catch (error) {
        console.error("Setup failed:", error);
    }
}

setupSchema();
