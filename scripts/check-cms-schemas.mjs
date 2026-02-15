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

async function checkSchema(colId, colName) {
    try {
        console.log(`\n--- Checking Schema: ${colName} (${colId}) ---`);
        const { attributes } = await databases.listAttributes(DATABASE_ID, colId);
        attributes.forEach(attr => {
            console.log(`- [${attr.type}] ${attr.key} (Req: ${attr.required}, Array: ${attr.array})`);
        });
    } catch (error) {
        console.error(`Failed to check ${colName}:`, error.message);
    }
}

async function run() {
    await checkSchema('pages', 'Pages');
    await checkSchema('page_sections', 'Page Sections');
    await checkSchema('site_content', 'Site Content'); // Checking if this is for Menus

    // Check for 'menus' just in case
    await checkSchema('menus', 'Menus (Potential)');
}

run();
