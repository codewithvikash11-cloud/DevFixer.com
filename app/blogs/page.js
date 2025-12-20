"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    BookOpen,
    Clock,
    ArrowRight,
    User,
    Tag,
    MessageSquare,
    Flame,
    Award,
    Zap
} from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
    {
        id: 1,
        title: "The State of JavaScript in 2026: What to Expect?",
        excerpt: "As we move further into the decade, JavaScript continues to evolve with proposals like Signal and decorators moving closer to stabilization...",
        author: "Sarah Drasner",
        date: "Dec 18, 2025",
        readTime: "8 min",
        category: "Trends",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Architecting React Apps for Massive Scale",
        excerpt: "Lessons learned from building and maintaining production-grade React applications with thousands of components and millions of weekly users...",
        author: "Dan Abramov",
        date: "Dec 15, 2025",
        readTime: "12 min",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Micro-features: Why Small UI Improvements Matter",
        excerpt: "Exploring the psychological impact of micro-interactions and subtle design choices on developer productivity and satisfaction...",
        author: "Josh W. Comeau",
        date: "Dec 10, 2025",
        readTime: "6 min",
        category: "UI/UX",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function BlogListingPage() {
    return (
        <LayoutWrapper>
            <div className="mb-20">
                <div className="flex items-center space-x-2 text-accent-purple font-mono text-xs mb-4">
                    <BookOpen size={16} />
                    <span className="uppercase tracking-[0.2em] font-bold">Editorial System</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight">Technical Blogs</h1>
                <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                    In-depth articles, architectural patterns, and industry insights written by
                    the engineers who build the future of the web.
                </p>
            </div>

            {/* Featured Post */}
            <section className="mb-32">
                <div className="group relative bg-panel/30 border border-border rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl hover:border-accent-purple/30 transition-all duration-500">
                    <div className="lg:w-1/2 h-[300px] lg:h-auto relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent-purple/20 group-hover:bg-accent-purple/10 transition-colors z-10" />
                        <img
                            src={blogPosts[1].image}
                            alt="Featured post"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 shadow-inner"
                        />
                        <div className="absolute top-8 left-8 z-20">
                            <span className="px-4 py-2 bg-accent-purple text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-xl">Featured Article</span>
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                        <div className="flex items-center space-x-4 text-xs font-bold text-text-secondary mb-6">
                            <span className="flex items-center space-x-1">
                                <Tag size={12} className="text-accent-purple" />
                                <span>{blogPosts[1].category}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                                <Clock size={12} />
                                <span>{blogPosts[1].readTime} read</span>
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight group-hover:text-accent-purple transition-colors">
                            {blogPosts[1].title}
                        </h2>
                        <p className="text-lg text-text-secondary mb-10 leading-relaxed line-clamp-3">
                            {blogPosts[1].excerpt}
                        </p>
                        <Link href="/blogs/1" className="inline-flex items-center space-x-2 text-accent-purple font-black group/link">
                            <span className="text-lg">Read full article</span>
                            <ArrowRight size={20} className="group-hover/link:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {blogPosts.map((post) => (
                    <div key={post.id} className="group space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="relative h-[280px] rounded-[2.5rem] overflow-hidden border border-border group-hover:border-accent-blue/30 transition-all duration-500">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="space-y-4 px-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-secondary">
                                <span className="px-3 py-1 bg-white/5 border border-border rounded-full">{post.category}</span>
                                <div className="flex items-center space-x-1">
                                    <Award size={12} className="text-accent-yellow" />
                                    <span>Verified Insight</span>
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black leading-tight group-hover:text-accent-blue transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed line-clamp-3 italic">
                                "{post.excerpt}"
                            </p>

                            <div className="pt-6 flex items-center justify-between border-t border-border/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue text-[10px] font-bold">
                                        {post.author.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold">{post.author}</span>
                                        <span className="text-[10px] text-text-secondary font-medium">{post.date}</span>
                                    </div>
                                </div>
                                <Link href={`/blogs/${post.id}`} className="p-3 rounded-full bg-panel border border-border hover:bg-accent-blue hover:text-white hover:border-accent-blue transition-all group-hover:scale-110 active:scale-90 shadow-xl">
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-32 p-12 md:p-20 bg-accent-purple/5 border-2 border-accent-purple/10 rounded-[4rem] text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-purple/20 blur-[100px] rounded-full" />
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Join our Engineering Newsletter</h2>
                    <p className="text-lg text-text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
                        Get weekly architecture breakdowns and high-end coding tips directly in your terminal/inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="engineer@company.com"
                            className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-purple/50 font-medium"
                        />
                        <button className="w-full sm:w-auto px-8 py-4 bg-accent-purple text-white rounded-2xl font-black shadow-2xl shadow-accent-purple/20 hover:scale-105 active:scale-95 transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
