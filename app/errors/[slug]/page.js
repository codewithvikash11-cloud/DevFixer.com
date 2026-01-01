import React from 'react';
import { notFound } from 'next/navigation';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getPostBySlug } from '@/lib/posts';
import CodeBlock from '@/components/CodeBlock';
import {
    ArrowLeft,
    Tag,
    Clock,
    User,
    CheckCircle,
    Copy,
    Share2,
    MessageSquare,
    ThumbsUp,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LANGUAGES } from '@/lib/languages';
import SocialShare from '@/components/SocialShare';
import VoteButtons from '@/components/VoteButtons';

export async function generateMetadata(props) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Error Not Found | DevFixer',
        };
    }

    return {
        title: `${post.title} | DevFixer`,
        description: post.description || post.title,
    };
}

export default async function ErrorDetailPage(props) {
    const params = await props.params;
    const { slug } = params;
    const post = getPostBySlug(slug);

    if (!post || post.status === 'draft') {
        notFound();
    }

    const languageConfig = LANGUAGES.find(l => l.slug === post.language) || { name: post.language, color: 'text-gray-400', icon: Tag };
    const Icon = languageConfig.icon;

    // Split content into sentences/paragraphs for better reading if it's a long block
    const contentParagraphs = post.content ? post.content.split('\n').filter(p => p.trim() !== '') : [];

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
                            {languageConfig.image ? (
                                <div className="relative w-4 h-4">
                                    <Image
                                        src={languageConfig.image}
                                        alt={`${languageConfig.name} icon`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                Icon && <Icon size={14} />
                            )}
                            <span>{languageConfig.name}</span>
                        </span>
                        {post.createdAt && (
                            <span className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-text-secondary font-bold">
                                <Clock size={14} />
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </span>
                        )}
                        <span className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-accent-green font-bold">
                            <CheckCircle size={14} />
                            <span>Verified Fix</span>
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
                        {post.title}
                    </h1>

                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium border-l-4 border-accent-blue pl-6">
                        {post.description}
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* Discussion / Explanation */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-3">
                                <MessageSquare size={24} className="text-accent-blue" />
                                <span>Analysis</span>
                            </h2>
                            <div className="space-y-4 text-text-secondary">
                                {contentParagraphs.map((paragraph, idx) => (
                                    <p key={idx} className="leading-relaxed">{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* MOCK: Root Cause - New Feature Enhancement */}
                        <div className="p-6 bg-accent-warning/5 border border-accent-warning/20 rounded-2xl">
                            <h2 className="text-xl font-bold mb-3 flex items-center space-x-2 text-accent-warning">
                                <Tag size={20} />
                                <span>Possible Root Cause</span>
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Incorrect environment configuration variables.</li>
                                <li>Version mismatch between dependencies (e.g., peer dependency issues).</li>
                                <li>Race conditions in async data fetching logic.</li>
                            </ul>
                        </div>

                        {/* Solution Code */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-3">
                                <CheckCircle size={24} className="text-accent-green" />
                                <span>Verified Solution</span>
                            </h2>
                            <CodeBlock
                                code={post.code || '// No code solution provided.'}
                                language={post.language || 'javascript'}
                                fileName={`solution.${post.language === 'python' ? 'py' : 'js'}`}
                            />
                        </div>

                        {/* MOCK: Prevention Tips - New Feature Enhancement */}
                        <div className="p-6 bg-accent-blue/5 border border-accent-blue/20 rounded-2xl">
                            <h2 className="text-xl font-bold mb-3 flex items-center space-x-2 text-accent-blue">
                                <ShieldCheck size={20} />
                                <span>Best Practices & Prevention</span>
                            </h2>
                            <p className="text-text-secondary mb-3">To avoid this error in the future:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Always use clear version pegging in your `package.json`.</li>
                                <li>Implement proper error boundaries to catch this gracefully.</li>
                                <li>Unit test your async functions for edge cases.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Metadata Card */}
                        <div className="p-6 spotlight-card rounded-3xl space-y-6 shadow-2xl">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary font-bold text-xl border border-accent-primary/20">
                                    {(post.authorName?.[0] || 'D').toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Contributor</p>
                                    <p className="font-bold text-lg text-text-primary">{post.authorName || 'DevFixer Admin'}</p>
                                </div>
                            </div>

                            <VoteButtons
                                slug={post.slug}
                                initialLikes={post.likes || 0}
                                initialDislikes={post.dislikes || 0}
                                likedBy={post.likedBy || []}
                                dislikedBy={post.dislikedBy || []}
                            />

                            <div className="h-px bg-border group-hover:bg-border-hover transition-colors" />

                            <SocialShare title={post.title} />
                        </div>

                        {/* Related and Best Practices Mock */}
                        <div className="p-6 glass rounded-3xl border border-border">
                            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-text-secondary flex items-center gap-2">
                                <Tag size={14} /> Context
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-3 py-1 bg-surface border border-border rounded-lg text-xs font-bold text-text-secondary hover:border-accent-primary/50 transition-colors cursor-default">
                                    #{post.language}
                                </span>
                                <span className="px-3 py-1 bg-surface border border-border rounded-lg text-xs font-bold text-text-secondary hover:border-accent-primary/50 transition-colors cursor-default">
                                    #debugging
                                </span>
                                <span className="px-3 py-1 bg-surface border border-border rounded-lg text-xs font-bold text-text-secondary hover:border-accent-primary/50 transition-colors cursor-default">
                                    #production
                                </span>
                            </div>

                            <h3 className="font-bold text-sm uppercase tracking-widest mb-2 text-text-secondary">Difficulty</h3>
                            <div className="w-full bg-surface rounded-full h-2 mb-1 overflow-hidden">
                                <div className="bg-accent-warning h-full rounded-full w-[60%] animate-pulse" />
                            </div>
                            <span className="text-xs text-text-tertiary">Intermediate Level</span>
                        </div>
                    </aside>
                </div>
            </div>
        </LayoutWrapper>
    );
}
