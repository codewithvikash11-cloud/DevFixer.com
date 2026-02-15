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

async function ensureCollection(id, name) {
    try {
        await databases.getCollection(DATABASE_ID, id);
        console.log(`Collection ${name} (${id}) exists.`);
        return id;
    } catch (e) {
        if (e.code === 404) {
            console.log(`Creating collection ${name}...`);
            await databases.createCollection(DATABASE_ID, id, name, [
                Permission.read(Role.any()),
                Permission.write(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]);
            return id;
        }
        throw e;
    }
}

async function ensureAttribute(colId, type, key, ...args) {
    try {
        if (type === 'string') await databases.createStringAttribute(DATABASE_ID, colId, key, ...args);
        if (type === 'integer') await databases.createIntegerAttribute(DATABASE_ID, colId, key, ...args);
        if (type === 'boolean') await databases.createBooleanAttribute(DATABASE_ID, colId, key, ...args);
        if (type === 'datetime') await databases.createDatetimeAttribute(DATABASE_ID, colId, key, ...args);
        console.log(` - Attribute ${key} created/exists.`);
    } catch (e) {
        if (e.code === 409) {
            // console.log(` - Attribute ${key} already exists.`);
        } else {
            console.error(` - Failed to create ${key}: ${e.message}`);
        }
    }
}

async function setupCMS() {
    try {
        console.log("Setting up CMS Schemas...");

        // 1. PAGES
        await ensureCollection('pages', 'Pages');
        await ensureAttribute('pages', 'string', 'title', 255, true);
        await ensureAttribute('pages', 'string', 'slug', 255, true);
        await ensureAttribute('pages', 'string', 'content', 1000000, true); // Large content
        await ensureAttribute('pages', 'string', 'status', 50, true, 'draft');
        await ensureAttribute('pages', 'string', 'seoTitle', 255, false);
        await ensureAttribute('pages', 'string', 'seoDescription', 1000, false);
        await ensureAttribute('pages', 'datetime', 'publishedAt', false);

        // 2. MENUS
        await ensureCollection('menus', 'Menus');
        await ensureAttribute('menus', 'string', 'label', 100, true);
        await ensureAttribute('menus', 'string', 'path', 500, true);
        await ensureAttribute('menus', 'string', 'type', 50, true, 'header'); // header, footer, both
        await ensureAttribute('menus', 'integer', 'order', true, 0, 1000, 0);
        await ensureAttribute('menus', 'string', 'parentId', 255, false);
        await ensureAttribute('menus', 'boolean', 'isExternal', false, false);
        await ensureAttribute('menus', 'boolean', 'isOpenNewTab', false, false);

        console.log("CMS Setup Complete.");

    } catch (error) {
        console.error("Setup failed:", error);
    }
}

setupCMS();
