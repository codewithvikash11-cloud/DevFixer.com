const fs = require('fs');
const path = require('path');
const { Client, Databases } = require('node-appwrite');

// Manual .env parser
try {
    const envPath = path.join(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envFile = fs.readFileSync(envPath, 'utf8');
        envFile.split('\n').forEach(line => {
            const [key, ...values] = line.split('=');
            if (key && values.length > 0) {
                const val = values.join('=').trim().replace(/^["']|["']$/g, '');
                process.env[key.trim()] = val;
            }
        });
        console.log("Loaded .env.local manually");
    } else {
        console.warn(".env.local not found at:", envPath);
    }
} catch (e) {
    console.warn("Could not read .env.local", e.message);
}

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID;

console.log("Config Check:");
console.log("- Endpoint:", endpoint);
console.log("- Project:", projectId);
console.log("- Database:", databaseId);
console.log("- Collection:", collectionId);
console.log("- API Key Length:", apiKey ? apiKey.length : 0);

if (!endpoint || !projectId || !apiKey || !databaseId || !collectionId) {
    console.error("MISSING CONFIGURATION VALUES. Please check .env.local");
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

async function checkAndConfigIndexes() {
    console.log("Checking indexes for collection:", collectionId);

    try {
        const indexes = await databases.listIndexes(databaseId, collectionId);
        const existingKeys = indexes.indexes.map(i => i.key);

        console.log("Existing Indexes:", existingKeys);

        const requiredIndexes = [
            { key: 'userId', type: 'key', attributes: ['userId'] },
            { key: 'status', type: 'key', attributes: ['status'] },
            { key: 'slug', type: 'unique', attributes: ['slug'] },
            { key: 'createdAt', type: 'key', attributes: ['createdAt'] }, // For sorting
            // Composite indexes if we sort by createdAt AND filter by status
            { key: 'status_createdAt', type: 'key', attributes: ['status', 'createdAt'] }
        ];

        for (const idx of requiredIndexes) {
            if (!existingKeys.includes(idx.key)) {
                console.log(`Creating missing index: ${idx.key}`);
                await databases.createIndex(
                    databaseId,
                    collectionId,
                    idx.key,
                    idx.type,
                    idx.attributes,
                    ['DESC'] // For createdAt mostly
                );
                console.log(`Created index: ${idx.key}. Note: It may take time to build.`);
            } else {
                console.log(`Index ${idx.key} already exists.`);
            }
        }

    } catch (error) {
        console.error("Error managing indexes:", error);
    }
}

checkAndConfigIndexes();
