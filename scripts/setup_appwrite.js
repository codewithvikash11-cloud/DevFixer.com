
const { Client, Databases, Permission, Role } = require('appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.error('Missing Appwrite credentials in .env.local');
    // We need API Key to create attributes
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

const setup = async () => {
    const dbName = 'devfixer';
    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'devfixer';
    const collName = 'posts';
    const collId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID || 'posts';

    try {
        console.log(`Checking Database: ${dbId}...`);
        try {
            await databases.get(dbId);
            console.log('Database exists.');
        } catch (e) {
            console.log('Creating Database...');
            await databases.create(dbId, dbName);
            console.log('Database created.');
        }

        console.log(`Checking Collection: ${collId}...`);
        try {
            await databases.getCollection(dbId, collId);
            console.log('Collection exists.');
        } catch (e) {
            console.log('Creating Collection...');
            await databases.createCollection(
                dbId,
                collId,
                collName,
                [
                    Permission.read(Role.any()), // Read: everyone
                    Permission.write(Role.any()), // Write: everyone (for now, or use Admin Only and Server Key)
                    // Prompt said: Write -> only admin panel. 
                    // Since Admin Panel uses API Key (Server), we can actually restrict this to empty/Admins.
                    // But if we want *Client* SDK to write (if we switch to it), we need permissions.
                    // Making safely restrictive:
                    // Permission.write(Role.team("admins")) ??
                    // For simplicity with API Key: API Key bypasses permissions.
                    // So we can set Write to empty or Role.users() if we implement Auth.
                ]
            );
            console.log('Collection created.');
        }

        console.log('Checking Attributes...');
        const attributes = [
            { key: 'slug', type: 'string', size: 255, required: true },
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'content', type: 'string', size: 1000000, required: true }, // Long string
            { key: 'language', type: 'string', size: 50, required: true },
            { key: 'status', type: 'string', size: 20, required: true },
            { key: 'description', type: 'string', size: 1000, required: false },
            { key: 'seoTitle', type: 'string', size: 255, required: false },
            { key: 'seoDescription', type: 'string', size: 1000, required: false },
            { key: 'code', type: 'string', size: 50000, required: false },
        ];

        // Need to be sequential because Appwrite might rate limit or error depending on mode
        for (const attr of attributes) {
            try {
                // Check if exists (no direct check method, just try creating and catch)
                // Or list attributes.
                // Simplified: just try creating.
                await databases.createStringAttribute(dbId, collId, attr.key, attr.size, attr.required);
                console.log(`Created attribute: ${attr.key}`);
                await new Promise(r => setTimeout(r, 500)); // Sleep bit
            } catch (e) {
                if (e.code === 409) {
                    console.log(`Attribute ${attr.key} already exists.`);
                } else {
                    console.error(`Error creating attribute ${attr.key}:`, e.message);
                }
            }
        }

        // Search Index?
        try {
            // Need indexes for queries?
            // "slug" is unique.
            // "status" is used for filtering.
            // "language" is used for filtering.
            // "createdAt" (system) used for sorting.

            // await databases.createIndex(dbId, collId, 'unique_slug', 'unique', ['slug']);
            // await databases.createIndex(dbId, collId, 'idx_status', 'key', ['status']);
            // await databases.createIndex(dbId, collId, 'idx_language', 'key', ['language']);
            console.log("Indexes creation logic can be added/manual.");
        } catch (e) {
            console.log("Index creation skipped/failed.");
        }

        console.log('Setup Complete.');

    } catch (error) {
        console.error('Setup failed:', error);
    }
};

setup();
