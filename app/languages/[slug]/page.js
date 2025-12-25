import React from 'react';
import { notFound } from 'next/navigation';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getLanguageBySlug } from '@/lib/languages';
import { getPosts } from '@/lib/posts'; // Import data fetcher
import {
    ArrowLeft,
    TrendingUp,
    Clock,
    Zap,
    ArrowRight,
    Star,
    ChevronRight,
    Search,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(props) {
    const params = await props.params;
    const language = getLanguageBySlug(params.slug);

    if (!language) return { title: 'Language Not Found' };

    return {
        title: `${language.name} Error Solutions & Debugging`,
        description: `Fix common ${language.name} errors instantly. Browse our comprehensive database of ${language.name} debugging guides and performance tips.`,
        keywords: [`${language.name} errors`, `fix ${language.name}`, `${language.name} debugging`, 'programming solutions'],
        openGraph: {
            title: `${language.name} Error Solutions | DevFixer`,
            description: `Master ${language.name} debugging with DevFixer.`,
            type: 'website',
        }
    };
}

export default async function LanguagePage(props) {
    const params = await props.params;
    const { slug } = params;
    const language = getLanguageBySlug(slug);

    if (!language) {
        notFound();
    }

    const Icon = language.icon;

    // Fetch and filter posts for this language
    const allPosts = getPosts();
    const posts = allPosts.filter(p =>
        (p.language.toLowerCase() === language.name.toLowerCase() || p.language.toLowerCase() === language.slug.toLowerCase()) &&
        p.status === 'published'
    );

    // Schema.org Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${language.name} Error Solutions`,
        description: `A collection of debugging guides and error fixes for ${language.name}.`,
        publisher: {
            '@type': 'Organization',
            name: 'DevFixer'
        },
        about: {
            '@type': 'ComputerLanguage',
            name: language.name
        },
        hasPart: posts.map(post => ({
            '@type': 'TechArticle',
            headline: post.title,
            description: post.description,
            difficulty: 'Intermediate' // Default if not in post
        }))
    };

    return (
        <LayoutWrapper>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="mb-8 md:mb-12">
                <Link href="/languages" className="inline-flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors mb-6 text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} />
                    <span>Back to Languages</span>
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 mb-10 md:mb-16">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-8">
                        <div className={`p-5 md:p-6 bg-panel border-2 border-border/50 rounded-2xl md:rounded-[2rem] ${language.bg} border-white/5 shadow-xl shadow-black/10`}>
                            <Icon size={40} className={`md:w-16 md:h-16 ${language.color}`} />
                        </div>
                        <div>
                            <div className="flex items-center justify-center sm:justify-start space-x-2 text-text-secondary font-mono text-[9px] md:text-xs mb-2">
                                <Star size={10} className="text-accent-yellow fill-accent-yellow" />
                                <span className="uppercase tracking-widest">{language.category} Stack</span>
                            </div>
                            <h1 className="text-3xl md:text-6xl font-black mb-3 tracking-tight">{language.name}</h1>
                            <p className="text-text-secondary max-w-xl text-base md:text-lg leading-relaxed font-medium">{language.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-8 space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h2 className="text-xl md:text-2xl font-black flex items-center space-x-3 uppercase tracking-tight">
                            <AlertCircle size={24} className="text-accent-blue" />
                            <span>Latest Solutions</span>
                        </h2>
                    </div>

                    {posts.length > 0 ? (
                        <div className="space-y-3 md:space-y-4">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/errors/${post.slug}`}
                                    className="group flex items-center justify-between p-4 md:p-6 bg-panel/20 border border-border/50 rounded-2xl hover:border-accent-blue/40 hover:bg-panel/40 transition-all active:scale-95 duration-200"
                                >
                                    <div className="flex items-center space-x-4 md:space-x-5 flex-1 min-w-0">
                                        <div className="hidden sm:flex w-12 h-12 bg-background border border-border rounded-xl items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/20 transition-all shadow-inner shrink-0">
                                            <Clock size={24} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-base md:text-lg font-black group-hover:text-accent-blue transition-colors mb-1 truncate">{post.title}</h3>
                                            <div className="flex items-center space-x-3 md:space-x-4">
                                                <span className="text-[9px] font-black px-2 py-0.5 bg-border/50 rounded uppercase tracking-widest text-text-secondary">Intermediate</span>
                                                <span className="text-[10px] md:text-xs text-accent-green font-black flex items-center space-x-1 uppercase tracking-widest">
                                                    <Zap size={10} className="fill-current" />
                                                    <span>Verified</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-border flex items-center justify-center text-text-secondary group-hover:bg-accent-blue group-hover:text-white group-hover:border-accent-blue transition-all shrink-0 ml-4">
                                        <ChevronRight size={18} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center border-2 border-dashed border-border rounded-3xl bg-panel/30">
                            <Search size={48} className="mx-auto mb-4 text-text-secondary/20" />
                            <h3 className="text-xl font-bold mb-2">No solutions yet</h3>
                            <p className="text-text-secondary">Be the first to contribute a fix for {language.name}.</p>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4 space-y-6 md:space-y-8 mt-6 lg:mt-0">
                    <div className="p-6 md:p-8 bg-accent-blue/5 border border-accent-blue/10 rounded-3xl relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-blue/10 rounded-full blur-[40px] group-hover:scale-125 transition-transform duration-700" />

                        <h3 className="font-black text-lg md:text-xl mb-6 flex items-center space-x-3 uppercase tracking-tight">
                            <Zap size={18} className="text-accent-blue fill-accent-blue/20" />
                            <span>Pro Guidelines</span>
                        </h3>
                        <ul className="space-y-4 md:space-y-6 relative z-10">
                            {[
                                { text: "Always enforce strict type checking where applicable.", icon: "01" },
                                { text: "Prefer functional components and hooks for cleaner state.", icon: "02" },
                                { text: "Minimize side effects in core business logic.", icon: "03" }
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start space-x-4">
                                    <span className="text-[10px] font-black text-accent-blue/50 mt-1 tracking-widest">{tip.icon}</span>
                                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
                                        {tip.text}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <button className="mt-8 w-full py-4 bg-accent-blue active-scale text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent-blue/20">
                            Download PDF Guide
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-panel to-background border border-border rounded-2xl">
                            <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-text-secondary text-[10px]">Documentation</h3>
                            <Link href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <span className="font-medium text-sm">Official Docs</span>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <span className="font-medium text-sm">Community Forum</span>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
