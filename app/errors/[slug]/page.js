import React from 'react';
import { notFound } from 'next/navigation';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getErrorBySlug } from '@/lib/wordpress';
import CodeBlock from '@/components/CodeBlock';
import {
    ArrowLeft,
    Tag,
    Clock,
    CheckCircle,
    MessageSquare,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SocialShare from '@/components/SocialShare';
import VoteButtons from '@/components/VoteButtons';

export async function generateMetadata(props) {
    const params = await props.params;
    const post = await getErrorBySlug(params.slug);

    if (!post) {
        return {
            title: 'Error Not Found | DevFixer',
        };
    }

    return {
        title: `${post.title.rendered} | DevFixer`,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
        alternates: {
            canonical: `https://dev-fixer-com.vercel.app/errors/${params.slug}`,
        },
        openGraph: {
            title: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
            type: 'article',
            publishedTime: post.date,
        }
    };
}

export default async function ErrorDetailPage(props) {
    const params = await props.params;
    const { slug } = params;
    const post = await getErrorBySlug(slug);

    if (!post) {
        notFound();
    }

    // Heuristics for Language/Category
    const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General';
    const languageConfig = { name: categoryName, color: 'text-accent-primary', icon: Tag };
    const Icon = languageConfig.icon;

    // Simple heuristic to extract code block if present in WP content, 
    // OR just render the whole content if formatted.
    // Since user wants "Same layout", we'll verify if we can extract "Analysis" vs "Solution".
    // For now, we put the full WP content in the "Analysis" section 
    // and if there's a code block, we might try to extract it or just let it be part of the HTML.
    // Given the constraints, rendering the WP content faithfully is safer than parsing it too aggressively.

    // However, the UI has a "Verified Solution" code block. 
    // If the WP post is just one blob of HTML, we might need to rely on the editor putting code in pre tags.
    // We will render the content in the "Analysis" section.

    return (
        <LayoutWrapper>
            <div className="max-w-4xl mx-auto px-4 pb-20">
                {/* Breadcrumb */}
                <div className="mb-8 pt-4">
                    <Link href="/errors" className="inline-flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors text-xs font-bold uppercase tracking-widest group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Solutions</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-10 md:mb-16">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className={`inline-flex items-center space-x-2 px-3 py-1 bg-panel border-2 border-border/50 rounded-lg text-[10px] font-black uppercase tracking-widest ${languageConfig.color}`}>
                            {Icon && <Icon size={14} />}
                            <span>{languageConfig.name}</span>
                        </span>
                        {post.date && (
                            <span className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-text-secondary font-bold">
                                <Clock size={14} />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </span>
                        )}
                        <span className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-accent-green font-bold">
                            <CheckCircle size={14} />
                            <span>Verified Fix</span>
                        </span>
                    </div>

                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <div
                        className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium border-l-4 border-accent-blue pl-6"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* Discussion / Explanation */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-3">
                                <MessageSquare size={24} className="text-accent-blue" />
                                <span>Analysis & Solution</span>
                            </h2>
                            <div
                                className="space-y-4 text-text-secondary"
                                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                            />
                        </div>

                        {/* MOCK: Prevention Tips - Keeping consistent UI elements even if static for now */}
                        <div className="p-6 bg-accent-blue/5 border border-accent-blue/20 rounded-2xl">
                            <h2 className="text-xl font-bold mb-3 flex items-center space-x-2 text-accent-blue">
                                <ShieldCheck size={20} />
                                <span>Best Practices</span>
                            </h2>
                            <p className="text-text-secondary mb-3">To avoid this error in the future:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Ensure your dependencies are up to date.</li>
                                <li>Check for similar issues in the underlying framework repository.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Metadata Card */}
                        <div className="p-6 spotlight-card rounded-3xl space-y-6 shadow-2xl">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary font-bold text-xl border border-accent-primary/20">
                                    {(post._embedded?.author?.[0]?.name?.[0] || 'D').toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Contributor</p>
                                    <p className="font-bold text-lg text-text-primary">{post._embedded?.author?.[0]?.name || 'Admin'}</p>
                                </div>
                            </div>

                            <VoteButtons
                                slug={params.slug}
                                initialLikes={0}
                                initialDislikes={0}
                                likedBy={[]}
                                dislikedBy={[]}
                            />

                            <div className="h-px bg-border group-hover:bg-border-hover transition-colors" />

                            <SocialShare title={post.title.rendered} />
                        </div>
                    </aside>
                </div>
            </div>
        </LayoutWrapper>
    );
}
