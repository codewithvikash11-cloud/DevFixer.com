import { NextResponse } from 'next/server';
import { getPages, savePages } from '@/lib/pages';

export async function GET() {
    const pages = getPages();
    return NextResponse.json(pages);
}

export async function POST(request) {
    const body = await request.json();
    const { slug, title, content, isSystem, sections } = body;

    if (!slug || !title) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pages = getPages();
    const existingIndex = pages.findIndex(p => p.slug === slug);

    const newPage = {
        slug,
        title,
        ...(isSystem ? { isSystem: true, sections } : { isSystem: false, content }),
        updatedAt: new Date().toISOString()
    };

    if (existingIndex > -1) {
        // Update existing
        // Preserve isSystem flag if not passed (though it should be)
        newPage.isSystem = pages[existingIndex].isSystem;
        pages[existingIndex] = { ...pages[existingIndex], ...newPage };
    } else {
        // Create new
        pages.push(newPage);
    }

    savePages(pages);
    return NextResponse.json({ success: true, message: 'Page saved successfully' });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const pages = getPages();
    const pageToDelete = pages.find(p => p.slug === slug);

    if (pageToDelete && pageToDelete.isSystem) {
        return NextResponse.json({ error: 'Cannot delete system pages' }, { status: 403 });
    }

    const newPages = pages.filter(p => p.slug !== slug);
    savePages(newPages);

    return NextResponse.json({ success: true, message: 'Page deleted successfully' });
}
