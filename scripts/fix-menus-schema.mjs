import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

async function fixSchema() {
    try {
        console.log("Fixing Menus Schema (Relaxed)...");

        // Find collection
        const { collections } = await databases.listCollections(DATABASE_ID, [
            Query.equal('name', 'Menus')
        ]);
        if (collections.length === 0) {
            console.error("Menus collection not found.");
            return;
        }
        const col = collections[0];
        const COLLECTION_ID = col.$id;
        console.log(`Found Collection: ${col.name} (${col.$id})`);

        console.log("Ensuring 'type' attribute...");
        // Make it NOT required initially to avoid issues
        try {
            await databases.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'type', 50, false, 'header');
            console.log(" - Created 'type' (optional)");
        } catch (e) {
            console.log(" - 'type' error/exists:", e.message);
        }

        console.log("Ensuring 'order' attribute...");
        try {
            await databases.createIntegerAttribute(DATABASE_ID, COLLECTION_ID, 'order', false, 0, 1000, 0);
            console.log(" - Created 'order' (optional)");
        } catch (e) {
            console.log(" - 'order' error/exists:", e.message);
        }

        // Wait for attributes to be available (Appwrite is async)
        console.log("Waiting for attributes to settle...");
        await new Promise(r => setTimeout(r, 3000));

    } catch (error) {
        console.error("Fix Schema Failed:", error);
    }
}

fixSchema();
