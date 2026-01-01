
const { Client, Databases } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
    console.error("Could not read .env.local");
    process.exit(1);
}

const getEnv = (key) => {
    const match = envContent.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim() : null;
};

const endpoint = getEnv('NEXT_PUBLIC_APPWRITE_ENDPOINT');
const projectId = getEnv('NEXT_PUBLIC_APPWRITE_PROJECT_ID');
const apiKey = getEnv('APPWRITE_API_KEY');
const databaseId = getEnv('NEXT_PUBLIC_APPWRITE_DATABASE_ID') || 'devfixer';
const collectionId = getEnv('NEXT_PUBLIC_APPWRITE_TABLE_ID') || 'posts';

if (!endpoint || !projectId || !apiKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

const upgrade = async () => {
    console.log('Starting Schema Upgrade (Robust Mode)...');

    const simpleAttributes = [
        { key: 'userId', type: 'string', size: 255, required: false },
        { key: 'authorName', type: 'string', size: 255, required: false },
    ];

    for (const attr of simpleAttributes) {
        try {
            await databases.createStringAttribute(databaseId, collectionId, attr.key, attr.size, attr.required);
            console.log(`Created attribute: ${attr.key}`);
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
            if (e.code === 409) console.log(`Attribute ${attr.key} exists.`);
            else console.log(`Error ${attr.key}: ${e.message}`);
        }
    }

    const arrayAttributes = [
        { key: 'likedBy' },
        { key: 'dislikedBy' }
    ];

    for (const attr of arrayAttributes) {
        try {
            await databases.createStringAttribute(databaseId, collectionId, attr.key, 255, false, null, true);
            console.log(`Created array attribute: ${attr.key}`);
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
            if (e.code === 409) console.log(`Attribute ${attr.key} exists.`);
            else console.log(`Error ${attr.key}: ${e.message}`);
        }
    }

    // Index for dashboard
    try {
        await databases.createIndex(databaseId, collectionId, 'idx_userid', 'key', ['userId']);
        console.log('Created index: idx_userid');
    } catch (e) {
        if (e.code === 409) console.log(`Index idx_userid exists.`);
        else console.log(`Index failed: ${e.message}`);
    }

    console.log('Upgrade Complete.');
};

upgrade();
