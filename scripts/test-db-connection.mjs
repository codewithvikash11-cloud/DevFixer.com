import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing in .env.local');
    process.exit(1);
}

async function testConnection() {
    console.log('Testing MongoDB connection...');
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });

        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const result = await admin.ping();

        if (result.ok === 1) {
            console.log('✅ MongoDB connection SUCCESSFUL');
        } else {
            console.log('❌ MongoDB connection FAILED: Ping returned', result);
        }

    } catch (error) {
        console.error('❌ MongoDB connection FAILED');
        console.error(error);
    } finally {
        await mongoose.connection.close();
    }
}

testConnection();
