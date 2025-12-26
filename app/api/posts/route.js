import { NextResponse } from 'next/server';
import { getPosts, createPost, updatePost, deletePost, getPostBySlug } from '@/lib/posts';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 100;
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    const posts = await getPosts(limit, status, userId);
    return NextResponse.json(posts);
}

// POST and DELETE are handled Client-Side in Dashboard to verify Appwrite Session (RLS).
// API Proxying loses session context unless cookies are forwarded.

// export async function POST(request) {
//     return NextResponse.json({ error: 'Use Client SDK for writes' }, { status: 405 });
// }

// export async function DELETE(request) {
//     return NextResponse.json({ error: 'Use Client SDK for deletes' }, { status: 405 });
// }
