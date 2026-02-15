import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth-token';

export async function POST() {
    await deleteSession();
    return NextResponse.json({ success: true });
}
