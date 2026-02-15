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

if (!API_KEY) {
    console.error("API Key missing!");
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function listCollections() {
    try {
        console.log(`Listing collections in DB: ${DATABASE_ID}...`);
        const { collections } = await databases.listCollections(DATABASE_ID);
        console.log(`Found ${collections.length} collections:`);
        collections.forEach(col => console.log(`- ${col.name} (${col.$id})`));

        // Check if categories exists
        const catCol = collections.find(c => c.name.toLowerCase() === 'categories');
        if (catCol) {
            console.log("Categories collection FOUND.");
            // List attributes
            const attrs = await databases.listAttributes(DATABASE_ID, catCol.$id);
            console.log("Attributes:", attrs.attributes.map(a => a.key).join(', '));
        } else {
            console.log("Categories collection NOT FOUND.");
        }

    } catch (error) {
        console.error("Failed to list collections:", error);
    }
}

listCollections();
