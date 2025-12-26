import { NextResponse } from 'next/server';
import { toggleVote } from '@/lib/posts';

export async function POST(request) {
    try {
        const body = await request.json();
        const { slug, userId, type } = body;

        if (!slug || !userId || !type) {
            return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
        }

        const updatedPost = await toggleVote(slug, userId, type);
        return NextResponse.json({ success: true, data: updatedPost });

    } catch (error) {
        console.error("Vote API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
