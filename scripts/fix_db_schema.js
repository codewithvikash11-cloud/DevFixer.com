const { Client, Databases, Permission, Role } = require('appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.error('Missing Appwrite credentials.');
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

const fixSchema = async () => {
    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'devfixer';
    const collId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID || 'posts';

    console.log(`Using Database ID: ${dbId}`);
    console.log(`Using Collection ID: ${collId}`);

    if (!dbId || !collId) {
        console.error('Missing Database or Collection ID (and defaults failed).');
        process.exit(1);
    }

    try {
        console.log(`Updating Collection Permissions for ${collId}...`);

        // Update Collection to enable Document Security and set Permissions
        // Document Security = True ensures that document permissions (set on creation) rule.
        // Collection Permissions = default fallback.
        // We want:
        // CREATE: Authenticated Users (Role.users())
        // READ: Any (Role.any())
        // UPDATE/DELETE: Owner (Managed by Document Security) or Users?
        // Actually, if Document Security is ON, we usually rely on document-level permissions for Update/Delete.
        // But we need to allow Create for users.

        await databases.updateCollection(
            dbId,
            collId,
            'posts',
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()), // If Doc Security is ON, this allows users to TRY, but specific doc permissions will block others.
                Permission.delete(Role.users())
            ],
            true // documentSecurity: true
        );
        console.log('Collection permissions updated. Document Security Enabled.');

        console.log('Checking Attributes...');
        const attributes = [
            { key: 'userId', type: 'string', size: 255, required: false }, // Use false for migration compatibility
            { key: 'authorName', type: 'string', size: 255, required: false },
            { key: 'likedBy', type: 'string', size: 255, required: false, array: true },
            { key: 'dislikedBy', type: 'string', size: 255, required: false, array: true },
        ];

        for (const attr of attributes) {
            try {
                if (attr.array) {
                    await databases.createStringAttribute(dbId, collId, attr.key, attr.size, attr.required, undefined, true);
                } else {
                    await databases.createStringAttribute(dbId, collId, attr.key, attr.size, attr.required);
                }
                console.log(`Created attribute: ${attr.key}`);
                await new Promise(r => setTimeout(r, 1000)); // Sleep to avoid rate limits
            } catch (e) {
                if (e.code === 409) {
                    console.log(`Attribute ${attr.key} already exists.`);
                } else {
                    console.error(`Error creating attribute ${attr.key}:`, e.message);
                }
            }
        }

        console.log('Creating Indexes...');
        try {
            await databases.createIndex(dbId, collId, 'idx_userId', 'key', ['userId']);
            console.log('Created index: idx_userId');
        } catch (e) {
            console.log('Index idx_userId skipped/exists.');
        }

        console.log('Schema Fix Complete.');

    } catch (error) {
        console.error('Schema Fix Failed:', error);
    }
};

fixSchema();
