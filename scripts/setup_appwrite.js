
const { Client, Databases, Permission, Role } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.error('Missing Appwrite credentials in .env.local');
    process.exit(1);
}

client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

const databases = new Databases(client);

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'devfixer';

const COLLECTIONS = [
    // 1. Pages (Core Pages Metadata)
    {
        id: 'pages',
        name: 'Pages',
        attributes: [
            { key: 'slug', type: 'string', size: 255, required: true },
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'isPublished', type: 'boolean', required: true },
            { key: 'seoTitle', type: 'string', size: 255, required: false },
            { key: 'seoDescription', type: 'string', size: 1000, required: false },
            { key: 'ogImage', type: 'string', size: 1000, required: false },
        ]
    },
    // 2. Page Sections (The CMS Content Blocks)
    {
        id: 'page_sections',
        name: 'Page Sections',
        attributes: [
            { key: 'pageId', type: 'string', size: 50, required: true }, // Foreign Key to Pages
            { key: 'type', type: 'string', size: 50, required: true }, // hero, features, etc.
            { key: 'order', type: 'integer', required: true },
            { key: 'content', type: 'string', size: 1000000, required: true }, // JSON String
            { key: 'config', type: 'string', size: 1000000, required: false }, // JSON String (styles, visibility)
        ]
    },
    // 3. Snippets (Code Snippets Database)
    {
        id: 'snippets',
        name: 'Code Snippets',
        attributes: [
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'code', type: 'string', size: 50000, required: true },
            { key: 'language', type: 'string', size: 50, required: true },
            { key: 'description', type: 'string', size: 1000, required: false },
            { key: 'authorId', type: 'string', size: 50, required: true },
            { key: 'status', type: 'string', size: 20, required: true }, // pending/approved/rejected
            { key: 'aiScore', type: 'integer', required: false },
        ]
    },
    // 4. Solutions (Errors Database)
    {
        id: 'solutions',
        name: 'Error Solutions',
        attributes: [
            { key: 'errorCode', type: 'string', size: 255, required: true },
            { key: 'errorMsg', type: 'string', size: 1000, required: true },
            { key: 'solution', type: 'string', size: 50000, required: true }, // Markdown/RichText
            { key: 'language', type: 'string', size: 50, required: true },
            { key: 'tags', type: 'string', size: 1000, required: false }, // Comma separated
            { key: 'status', type: 'string', size: 20, required: true },
            { key: 'verified', type: 'boolean', required: false },
        ]
    },
    // 5. Tools (Enhanced) - Ensuring these exist
    {
        id: 'tools',
        name: 'Tools Registry',
        attributes: [
            { key: 'toolId', type: 'string', size: 50, required: true },
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'description', type: 'string', size: 1000, required: false },
            { key: 'category', type: 'string', size: 50, required: true },
            { key: 'isEnabled', type: 'boolean', required: true },
            { key: 'isFeatured', type: 'boolean', required: false },
            { key: 'icon', type: 'string', size: 1000, required: false },
            { key: 'usageCount', type: 'integer', required: false },
        ]
    },
    // 6. Settings (Global Config)
    {
        id: 'settings',
        name: 'Platform Settings',
        attributes: [
            { key: 'key', type: 'string', size: 255, required: true },
            { key: 'value', type: 'string', size: 1000000, required: true }, // JSON Value
        ]
    }
];

const setup = async () => {
    try {
        console.log(`[Database] Connecting to ${DB_ID}...`);
        try {
            await databases.get(DB_ID);
        } catch {
            await databases.create(DB_ID, DB_ID);
            console.log('[Database] Created.');
        }

        for (const col of COLLECTIONS) {
            console.log(`\n[Collection] Processing ${col.name}...`);
            try {
                await databases.getCollection(DB_ID, col.id);
                console.log(`   - Exists.`);
            } catch {
                await databases.createCollection(DB_ID, col.id, col.name, [
                    Permission.read(Role.any()),
                    Permission.write(Role.any()) // Adjust for prod
                ]);
                console.log(`   - Created.`);
            }

            for (const attr of col.attributes) {
                try {
                    await new Promise(r => setTimeout(r, 200)); // Rate limit buffer
                    if (attr.type === 'string') {
                        await databases.createStringAttribute(DB_ID, col.id, attr.key, attr.size, attr.required);
                    } else if (attr.type === 'integer') {
                        await databases.createIntegerAttribute(DB_ID, col.id, attr.key, attr.required);
                    } else if (attr.type === 'boolean') {
                        await databases.createBooleanAttribute(DB_ID, col.id, attr.key, attr.required);
                    }
                    console.log(`     + Attr: ${attr.key}`);
                } catch (e) {
                    if (e.code !== 409) console.error(`     ! Error ${attr.key}:`, e.message);
                }
            }
        }
        console.log('\n[Setup] CMS Migration Complete! 🚀');
    } catch (e) {
        console.error('Setup Failed:', e);
    }
};

setup();
