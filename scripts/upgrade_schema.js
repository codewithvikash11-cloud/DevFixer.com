
const { Client, Databases, Permission, Role } = require('appwrite');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.error('Missing Appwrite credentials in .env.local');
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);
const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'devfixer';
const collId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID || 'posts';

const upgrade = async () => {
    console.log('Starting Schema Upgrade...');

    const simpleAttributes = [
        { key: 'userId', type: 'string', size: 255, required: false }, // required: false for backward compat
        { key: 'authorName', type: 'string', size: 255, required: false },
    ];

    // Arrays need explicit type
    // Appwrite Node SDK: createStringAttribute(dbId, collId, key, size, required, default, array?)
    // Note: The SDK method signature might vary by version.
    // Usually: createStringAttribute(databaseId, collectionId, key, size, required, xdefault, array)

    for (const attr of simpleAttributes) {
        try {
            await databases.createStringAttribute(dbId, collId, attr.key, attr.size, attr.required);
            console.log(`Created attribute: ${attr.key}`);
            await new Promise(r => setTimeout(r, 500));
        } catch (e) {
            if (e.code === 409) console.log(`Attribute ${attr.key} exists.`);
            else console.error(`Error ${attr.key}:`, e.message);
        }
    }

    // Creating Array Attributes for voting
    const arrayAttributes = [
        { key: 'likedBy' },
        { key: 'dislikedBy' }
    ];

    for (const attr of arrayAttributes) {
        try {
            // Size 255 (User ID), Required False, Default null, Array True
            await databases.createStringAttribute(dbId, collId, attr.key, 255, false, null, true);
            console.log(`Created array attribute: ${attr.key}`);
            await new Promise(r => setTimeout(r, 500));
        } catch (e) {
            if (e.code === 409) console.log(`Attribute ${attr.key} exists.`);
            else console.error(`Error ${attr.key}:`, e.message);
        }
    }

    // Creating Indexes for Dashboard filtering
    try {
        // Index on userId to fetch "My Posts" fast
        await databases.createIndex(dbId, collId, 'idx_userid', 'key', ['userId']);
        console.log('Created index: idx_userid');
    } catch (e) {
        if (e.code === 409) console.log(`Index idx_userid exists.`);
        else console.log(`Index creation failed (might be optional): ${e.message}`);
    }

    console.log('Upgrade Complete.');
};

upgrade();
