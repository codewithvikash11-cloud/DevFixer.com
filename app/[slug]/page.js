import React from 'react';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/actions/pages';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageRenderer from '@/components/PageRenderer';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        return {
            title: 'Page Not Found',
        };
    }

    return {
        title: page.seoTitle || page.title,
        description: page.seoDescription || `Read more about ${page.title} on DevFixer.`,
    };
}

export default async function DynamicPage({ params }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#008000] selection:text-white">
            <Navbar />

            <main className="pt-24 min-h-screen">
                {/* Title is rendered by Hero if present, or we can keep a default header if it's text-only mode? 
                    Actually, if it's builder mode, the user puts a Hero. 
                    If it's legacy mode, PageRenderer renders a wrapped Rich Text.
                    
                    The existing header in page.js forces a title. 
                    Let's only show the default header if content is NOT builder mode (heuristic).
                    Or simpler: PageRenderer is fully responsible for content. 
                    We pass the title to PageRenderer? No, the builder HAS a Hero section.
                    
                    However, for existing 'About Us' pages which are text only, we want the title.
                    Let's inspect content string to decide.
                */}

                {/* Only show default header if content is NOT JSON-like (Legacy) */}
                {(!page.content || !page.content.trim().startsWith('[')) && (
                    <article className="max-w-4xl mx-auto px-4 pt-12">
                        <header className="mb-12 text-center">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {page.title}
                            </h1>
                            {page.updatedAt && (
                                <p className="text-sm text-gray-500">
                                    Last Updated: {new Date(page.updatedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                        </header>
                    </article>
                )}

                <PageRenderer content={page.content} />
            </main>

            <Footer />
        </div>
    );
}
