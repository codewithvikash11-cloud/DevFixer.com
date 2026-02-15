import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

async function debugSchema(name) {
    try {
        console.log(`Debugging Schema for ${name}...`);
        // Find collection
        const { collections } = await databases.listCollections(DATABASE_ID);
        const col = collections.find(c => c.name.toLowerCase() === name.toLowerCase());

        if (!col) {
            console.log(`Collection ${name} not found.`);
            return;
        }

        console.log(`Found Collection: ${col.name} (${col.$id})`);

        // List Attributes
        const { attributes } = await databases.listAttributes(DATABASE_ID, col.$id);
        console.log("Attributes:");
        attributes.forEach(attr => {
            console.log(JSON.stringify(attr, null, 2));
        });

    } catch (error) {
        console.error("Debug failed:", error);
    }
}

debugSchema('Menus');
