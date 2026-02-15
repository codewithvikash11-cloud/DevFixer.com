import { Client, Storage, ID, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

async function setupStorage() {
    try {
        console.log("Setting up Storage Bucket...");

        const bucketId = 'media';
        const bucketName = 'Media Library';

        try {
            await storage.getBucket(bucketId);
            console.log(`Bucket '${bucketId}' already exists.`);
        } catch (e) {
            if (e.code === 404) {
                console.log(`Creating bucket '${bucketId}'...`);
                await storage.createBucket(bucketId, bucketName, [
                    Permission.read(Role.any()), // Public Read
                    Permission.create(Role.users()), // Authenticated Users Create
                    Permission.update(Role.users()), // Authenticated Users Update
                    Permission.delete(Role.users()), // Authenticated Users Delete
                ], true, undefined, undefined, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);
                console.log("Bucket created successfully.");
            } else {
                throw e;
            }
        }

        console.log("Storage Setup Complete.");

    } catch (error) {
        console.error("Storage Setup Failed:", error);
    }
}

setupStorage();
