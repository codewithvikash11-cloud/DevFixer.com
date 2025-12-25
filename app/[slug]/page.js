import React from 'react';
import { notFound } from 'next/navigation';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getPageBySlug } from '@/lib/pages';

export async function generateMetadata(props) {
    const params = await props.params;
    const page = getPageBySlug(params.slug);

    if (!page) {
        return { title: 'Page Not Found' };
    }

    return {
        title: `${page.title} | DevFixer`,
        description: page.content?.substring(0, 150) || 'DevFixer Page'
    };
}

export default async function GenericPage(props) {
    const params = await props.params;
    const { slug } = params;

    // Ignore protected routes if they somehow reach here (though Next.js handles explicit folders first)
    if (['admin', 'api', 'errors', 'languages'].includes(slug)) {
        notFound();
    }

    const page = getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    // Don't render "System" pages like 'home' as generic pages
    if (page.isSystem) {
        notFound();
    }

    return (
        <LayoutWrapper>
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-4xl md:text-6xl font-black mb-8 md:mb-12 tracking-tighter uppercase">{page.title}</h1>
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* 
                       For Markdown content, usually we'd use a parser like 'react-markdown'.
                       Since I can't easily install new packages, I'll do a simple split render 
                       or just display text if it's simple. 
                       For now, I'll assume simple text or implement a basic parser if needed, 
                       but standard practice suggests using a library.
                       "content" field in pages.json is markdown.
                     */}
                    {page.content.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line.startsWith('# ') ? <h1 className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1> :
                                line.startsWith('## ') ? <h2 className="text-2xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2> :
                                    line === '' ? <br /> :
                                        <p className="mb-4 text-text-secondary leading-relaxed">{line}</p>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </LayoutWrapper>
    );
}
