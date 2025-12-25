import { NextResponse } from 'next/server';
import { getPosts, savePosts } from '@/lib/posts';

export async function GET() {
    const posts = getPosts();
    return NextResponse.json(posts);
}

export async function POST(request) {
    const body = await request.json();
    const posts = getPosts();

    // Check if updating existing post
    const existingIndex = posts.findIndex(p => p.slug === body.slug);

    if (existingIndex > -1) {
        // Update existing
        posts[existingIndex] = { ...posts[existingIndex], ...body, updatedAt: new Date().toISOString() };
    } else {
        // Create new
        const newPost = {
            ...body,
            status: 'published',
            createdAt: new Date().toISOString(),
            author: "DevFixer Admin"
        };
        posts.push(newPost);
    }

    savePosts(posts);
    return NextResponse.json({ success: true, message: 'Post saved successfully' });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const posts = getPosts();
    const newPosts = posts.filter(p => p.slug !== slug);
    savePosts(newPosts);

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
}
