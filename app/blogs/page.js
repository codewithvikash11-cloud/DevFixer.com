"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    BookOpen,
    Clock,
    ArrowRight,
    ArrowUpRight,
    User,
    Tag,
    Share2,
    Bookmark,
    Terminal,
    Hash
} from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
    {
        id: 1,
        title: "The State of JavaScript in 2026",
        excerpt: "JavaScript continues to evolve with proposals like Signal and decorators moving closer to stabilization.",
        author: "Sarah Drasner",
        role: "Principal",
        date: "Dec 18",
        readTime: "8m",
        category: "Trends",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Scale React to Millions",
        excerpt: "Lessons learned from building and maintaining production-grade React applications.",
        author: "Dan Abramov",
        role: "Core Team",
        date: "Dec 15",
        readTime: "12m",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Micro-features Matter",
        excerpt: "The psychological impact of micro-interactions on developer productivity.",
        author: "Josh W. Comeau",
        role: "UX Eng",
        date: "Dec 10",
        readTime: "6m",
        category: "UI/UX",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "WASM: The New Frontier",
        excerpt: "Transcending the browser to power edge computing with near-native speeds.",
        author: "Lin Clark",
        role: "Systems",
        date: "Dec 05",
        readTime: "10m",
        category: "Performance",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function BlogListingPage() {
    return (
        <LayoutWrapper>
            {/* Subtle Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                {/* Compact Header - Left Aligned */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-accent-purple font-mono text-xs font-bold tracking-widest uppercase">
                            <Terminal size={12} strokeWidth={3} />
                            <span>Engineering Log</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                            Technical<span className="text-white/40">Insights</span>
                        </h1>
                    </div>

                    {/* Categories Tag Cloud */}
                    <div className="flex flex-wrap gap-2 max-w-md md:justify-end">
                        {['All', 'Architecture', 'Performance', 'UI/UX', 'DevOps'].map((cat, i) => (
                            <button key={cat} className={`mx-0 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider border transition-all ${i === 0 ? 'bg-white text-black border-white' : 'bg-transparent text-text-secondary border-white/10 hover:border-white/30 hover:text-white'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-16">

                    {/* Featured Item - Large (Left) */}
                    <Link href={`/blogs/${blogPosts[1].id}`} className="group relative md:col-span-8 h-[350px] md:h-[450px] bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
                        <div className="absolute inset-0">
                            <img src={blogPosts[1].image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-0.5 bg-accent-purple/20 text-accent-purple border border-accent-purple/20 rounded text-[10px] font-bold uppercase tracking-wider">Featured</span>
                                <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider">{blogPosts[1].readTime} read</span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-accent-purple/80">
                                {blogPosts[1].title}
                            </h2>
                            <p className="text-white/70 text-sm md:text-base max-w-2xl line-clamp-2 md:line-clamp-none">
                                {blogPosts[1].excerpt}
                            </p>
                        </div>
                    </Link>

                    {/* Secondary Items - Stacked (Right) */}
                    <div className="md:col-span-4 flex flex-col gap-4 md:gap-6 h-full">
                        {/* Top Right Card */}
                        <Link href={`/blogs/${blogPosts[0].id}`} className="group relative flex-1 min-h-[160px] bg-neutral-900/50 rounded-2xl p-6 border border-white/10 hover:border-accent-purple/30 transition-all flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-auto">
                                <span className="text-accent-purple text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Hash size={10} /> {blogPosts[0].category}</span>
                                <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                {blogPosts[0].title}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">
                                <span>{blogPosts[0].author}</span>
                                <span>•</span>
                                <span>{blogPosts[0].date}</span>
                            </div>
                        </Link>

                        {/* Bottom Right Card */}
                        <Link href={`/blogs/${blogPosts[2].id}`} className="group relative flex-1 min-h-[160px] bg-neutral-900/50 rounded-2xl p-6 border border-white/10 hover:border-accent-purple/30 transition-all flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-auto">
                                <span className="text-teal-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Hash size={10} /> {blogPosts[2].category}</span>
                                <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                {blogPosts[2].title}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">
                                <span>{blogPosts[2].author}</span>
                                <span>•</span>
                                <span>{blogPosts[2].date}</span>
                            </div>
                        </Link>
                    </div>

                    {/* Third Row - Grid of 3 */}
                    {blogPosts.slice(3).map((post) => (
                        <Link key={post.id} href={`/blogs/${post.id}`} className="md:col-span-4 h-[220px] bg-neutral-900/30 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group relative">
                            <div className="absolute inset-0">
                                <img src={post.image} alt="" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2 block">{post.category}</span>
                                <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-accent-purple transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-white/60 text-xs line-clamp-1">{post.excerpt}</p>
                            </div>
                        </Link>
                    ))}

                    {/* Adding placeholder cards to fill the grid if needed */}
                    <div className="md:col-span-4 h-[220px] bg-neutral-900/20 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center p-6 border-dashed hover:border-solid hover:border-white/20 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-accent-purple/20 group-hover:text-accent-purple transition-colors">
                            <ArrowRight size={18} />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">View Full Archive</h3>
                        <p className="text-xs text-white/40 mt-1">Explore 500+ technical articles</p>
                    </div>

                    <div className="md:col-span-4 h-[220px] bg-gradient-to-br from-accent-purple/20 to-blue-600/10 rounded-2xl border border-accent-purple/20 p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/20 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div>
                            <Bookmark className="text-accent-purple mb-4" size={20} />
                            <h3 className="text-lg font-bold text-white leading-tight">Weekly Digest</h3>
                            <p className="text-xs text-white/60 mt-2 leading-relaxed">System design tips delivered every Monday.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <input type="email" placeholder="Email" className="bg-black/20 text-white text-xs px-3 py-2 rounded w-full border border-white/5 focus:outline-none focus:border-accent-purple/50" />
                            <button className="bg-white text-black text-xs font-bold px-3 py-2 rounded hover:bg-white/90">Join</button>
                        </div>
                    </div>
                </div>

            </div>
        </LayoutWrapper>
    );
}
