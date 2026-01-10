import { NextResponse } from 'next/server';
import { pagesService } from '@/lib/pages';

export async function GET() {
    const pages = await pagesService.getPages();
    return NextResponse.json(pages);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { slug, title, content, isSystem } = body;

        if (!slug || !title) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await pagesService.getPageBySlug(slug);

        if (existing) {
            // Update
            await pagesService.updatePage(slug, { title, content, isSystem });
            return NextResponse.json({ success: true, message: 'Page updated successfully' });
        } else {
            // Create
            await pagesService.createPage({ slug, title, content, isSystem });
            return NextResponse.json({ success: true, message: 'Page created successfully' });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        const page = await pagesService.getPageBySlug(slug);

        if (page && page.isSystem) {
            return NextResponse.json({ error: 'Cannot delete system pages' }, { status: 403 });
        }

        await pagesService.deletePage(slug);
        return NextResponse.json({ success: true, message: 'Page deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
