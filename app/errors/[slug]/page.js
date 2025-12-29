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
    ThumbsUp
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
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Metadata Card */}
                        <div className="p-6 bg-panel border-2 border-border/60 rounded-3xl space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue font-bold text-xl">
                                    {(post.authorName?.[0] || 'D').toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Contributor</p>
                                    <p className="font-bold text-lg">{post.authorName || 'DevFixer Admin'}</p>
                                </div>
                            </div>

                            <VoteButtons
                                slug={post.slug}
                                initialLikes={post.likes || 0}
                                initialDislikes={post.dislikes || 0}
                                likedBy={post.likedBy || []}
                                dislikedBy={post.dislikedBy || []}
                            />

                            <div className="h-px bg-border/50" />

                            <SocialShare title={post.title} />
                        </div>

                        {/* Related Tags/Info */}
                        <div className="p-6 bg-panel/30 border border-border rounded-3xl">
                            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-text-secondary">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-bold text-text-secondary">
                                    #{post.language}
                                </span>
                                <span className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-bold text-text-secondary">
                                    #debugging
                                </span>
                                <span className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-bold text-text-secondary">
                                    #fix
                                </span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </LayoutWrapper>
    );
}
