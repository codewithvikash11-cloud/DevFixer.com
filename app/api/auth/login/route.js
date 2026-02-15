import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';
// import { hashPassword } from '@/lib/utils'; // Need to define this or reuse
import crypto from 'crypto';
import { createSession } from '@/lib/auth-token';

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await dbConnect();

        const user = await AdminUser.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const hashed = hashPassword(password);
        if (hashed !== user.hashedPassword) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create Session
        await createSession({ userId: user._id, email: user.email, role: user.role });

        return NextResponse.json({
            success: true,
            user: { _id: user._id, email: user.email, role: user.role }
        });

    } catch (e) {
        console.error("Login error", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
