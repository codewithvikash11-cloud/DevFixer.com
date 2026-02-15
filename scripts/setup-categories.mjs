import { Client, Databases, Permission, Role } from 'node-appwrite';
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

async function setupCategories() {
    try {
        console.log("Checking for Categories collection...");
        const { collections } = await databases.listCollections(DATABASE_ID);
        const existing = collections.find(c => c.name.toLowerCase() === 'categories');

        let collectionId;

        if (existing) {
            console.log(`Categories collection exists (${existing.$id}).`);
            collectionId = existing.$id;
        } else {
            console.log("Creating Categories collection...");
            const col = await databases.createCollection(
                DATABASE_ID,
                'categories', // ID
                'Categories', // Name
                [
                    Permission.read(Role.any()), // Public read
                    Permission.write(Role.users()), // Authenticated write (or admin only)
                    Permission.update(Role.users()),
                    Permission.delete(Role.users())
                ]
            );
            collectionId = col.$id;
            console.log(`Created collection: ${collectionId}`);
        }

        console.log("Ensuring attributes...");

        // Helper to check and create attribute
        const ensureString = async (key, size, required, def) => {
            try {
                await databases.createStringAttribute(DATABASE_ID, collectionId, key, size, required, def);
                console.log(`Created attribute: ${key}`);
            } catch (e) {
                if (e.code === 409) console.log(`Attribute ${key} exists.`);
                else console.error(`Failed to create ${key}:`, e.message);
            }
        };

        const ensureInteger = async (key, required, min, max, def) => {
            try {
                await databases.createIntegerAttribute(DATABASE_ID, collectionId, key, required, min, max, def);
                console.log(`Created attribute: ${key}`);
            } catch (e) {
                if (e.code === 409) console.log(`Attribute ${key} exists.`);
                else console.error(`Failed to create ${key}:`, e.message);
            }
        };

        await ensureString('name', 128, true);
        await ensureString('slug', 128, true);
        await ensureString('description', 512, false);
        await ensureInteger('count', false, 0, 1000000, 0);

        console.log("Categories setup complete.");

    } catch (error) {
        console.error("Setup failed:", error);
    }
}

setupCategories();
