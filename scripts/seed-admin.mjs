import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env.local from project root
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env.local') });

import mongoose from 'mongoose';
import AdminUser from '../lib/models/AdminUser.js';
import crypto from 'crypto';

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

async function seed() {
    console.log("Starting seed...");
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI missing in .env.local");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");

        const email = "admin@devfixer.com";
        const password = "Admin@12345";
        const hashedPassword = hashPassword(password);

        const existing = await AdminUser.findOne({ email });
        if (existing) {
            console.log("Admin already exists. Updating password.");
            existing.hashedPassword = hashedPassword;
            await existing.save();
        } else {
            await AdminUser.create({
                email,
                hashedPassword,
                role: 'admin'
            });
            console.log("Admin created.");
        }

        console.log("Login with:", email, password);
        process.exit(0);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seed();
