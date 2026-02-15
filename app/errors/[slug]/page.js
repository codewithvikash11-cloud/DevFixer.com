import React from 'react';
import { getPostBySlug } from '@/lib/actions/posts';
import { notFound } from 'next/navigation';
import LayoutWrapper from '@/components/LayoutWrapper';
// import ReactMarkdown from 'react-markdown'; // Assuming we have this or similar renderer
// CodeBlock component from components/CodeBlock.js

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};
    return {
        title: `${post.title} | DevFixer`,
        description: post.description || post.title,
    };
}

export default async function ErrorDetailPage({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <LayoutWrapper>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <header className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-text-tertiary mb-4">
                        <span className="bg-accent-primary/10 text-accent-primary px-2 py-1 rounded">{post.language || 'General'}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">{post.title}</h1>
                </header>

                <article className="prose prose-invert max-w-none text-text-secondary">
                    {/* Only render humanized content if available, else raw methods */}
                    {post.humanizedContent ? (
                        <div dangerouslySetInnerHTML={{ __html: post.humanizedContent.replace(/\n/g, '<br/>') }} />
                        /* SECURITY NOTE: In production, sanitize this or use proper markdown renderer. */
                        /* For now, just dumping it as requested simple replacement */
                    ) : (
                        <div>
                            <h3>Error:</h3>
                            <pre className="bg-black/50 p-4 rounded">{post.errorText}</pre>
                            <h3>Fix:</h3>
                            <pre className="bg-black/50 p-4 rounded">{post.aiFixExplanation}</pre>
                        </div>
                    )}
                </article>
            </div>
        </LayoutWrapper>
    );
}
