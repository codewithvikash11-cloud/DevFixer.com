import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth-token';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';

export async function GET() {
    const session = await verifySession();
    if (!session) {
        return NextResponse.json(null);
    }

    await dbConnect();
    const user = await AdminUser.findById(session.userId).select('-hashedPassword');

    if (!user) {
        return NextResponse.json(null);
    }

    return NextResponse.json(user);
}
