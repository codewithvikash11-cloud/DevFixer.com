"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, Star, Clock, Flame, ChevronRight } from 'lucide-react';
import LayoutWrapper from '@/components/LayoutWrapper';

const CATEGORIES = [
    "JavaScript", "React", "Node.js", "Python", "PHP", "WordPress", "Next.js", "Docker"
];

const ErrorCard = ({ post }) => {
    return (
        <Link href={`/errors/${post.slug}`} className="group relative">
            <div className="h-full p-6 bg-panel border border-border rounded-2xl transition-all duration-300 hover:border-accent-primary/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-background border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-accent-primary">
                        {post.language || post.category || "General"}
                    </span>
                    <div className="flex items-center gap-1 text-text-tertiary">
                        <Clock size={12} />
                        <span className="text-[10px]">Verified recently</span>
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 leading-tight group-hover:text-accent-primary transition-colors">
                    {post.title}
                </h3>
                
                <p className="text-sm text-text-secondary line-clamp-3 mb-6 leading-relaxed">
                    {post.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                        {post.tags && post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-text-tertiary border-b border-white/10 italic">#{tag}</span>
                        ))}
                    </div>
                    <button className="flex items-center gap-1 text-xs font-bold text-accent-primary group-hover:gap-2 transition-all">
                        View Solution <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, trendingRes] = await Promise.all([
                    fetch('/api/posts?status=published&limit=8'),
                    fetch('/api/posts?status=published&limit=4&sort=views')
                ]);
                const postsData = await postsRes.json();
                const trendingData = await trendingRes.json();
                setPosts(postsData);
                setTrending(trendingData);
            } catch (err) {
                console.error("Data fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredPosts = activeCategory === "All" 
        ? posts 
        : posts.filter(p => p.language?.toLowerCase() === activeCategory.toLowerCase() || p.category?.toLowerCase() === activeCategory.toLowerCase());

    return (
        <LayoutWrapper>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* HERO SECTION */}
                <section className="relative pt-16 pb-24 text-center overflow-hidden">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-accent-primary/5 blur-[120px] pointer-events-none" />
                    
                    <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-panel/50 border border-border rounded-full text-xs font-medium text-text-secondary mb-4 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                            Over 50,000 Verified Fixes
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-text-primary leading-[1.05]">
                            Find & Fix Errors <br />
                            <span className="text-accent-primary">Instantly</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium">
                            Browse verified solutions for real developer errors. 
                            Minimal, fast, and optimized for developers.
                        </p>

                        <div className="flex justify-center pt-4">
                            <Link
                                href="/errors"
                                className="group h-14 px-10 bg-accent-primary text-black rounded-full font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-[0_0_40px_rgba(0,255,136,0.3)] hover:shadow-[0_0_60px_rgba(0,255,136,0.5)]"
                            >
                                <span>Browse Errors</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CATEGORIES SECTION */}
                <section className="pb-16 animate-in fade-in duration-700 delay-300">
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        <button 
                            onClick={() => setActiveCategory("All")}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === "All" ? 'bg-accent-primary text-black shadow-[0_0_20px_rgba(0,255,136,0.2)]' : 'bg-panel border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary/30'}`}
                        >
                            All Errors
                        </button>
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-accent-primary text-black shadow-[0_0_20px_rgba(0,255,136,0.2)]' : 'bg-panel border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary/30'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* MAIN ERROR LISTING SECTION */}
                    <section className="lg:col-span-8 animate-in fade-in slide-in-from-left-8 duration-1000 delay-500">
                        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                            <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
                                <Terminal className="text-accent-primary" size={24} />
                                Error Solutions Feed
                            </h2>
                            <Link href="/errors" className="text-xs font-bold text-text-tertiary hover:text-accent-primary transition-colors flex items-center gap-1">
                                VIEW ALL <ChevronRight size={14} />
                            </Link>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className="h-64 bg-panel/50 border border-border rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredPosts.map(post => (
                                    <ErrorCard key={post.slug} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-panel rounded-3xl border border-dashed border-border">
                                <p className="text-text-secondary">No errors found in this category.</p>
                                <button onClick={() => setActiveCategory("All")} className="mt-4 text-accent-primary font-bold">Show all errors</button>
                            </div>
                        )}
                    </section>

                    {/* TRENDING ERRORS SECTION (SIDEBAR STYLE) */}
                    <aside className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700">
                        <div className="p-8 bg-panel border-l-4 border-accent-primary rounded-2xl">
                            <h2 className="text-xl font-black text-text-primary flex items-center gap-3 mb-6">
                                <Flame className="text-orange-500" size={20} fill="currentColor" />
                                Trending Now
                            </h2>
                            <div className="space-y-6">
                                {loading ? (
                                    [1,2,3,4].map(i => <div key={i} className="h-20 bg-background/50 rounded-xl animate-pulse" />)
                                ) : trending.map((post, idx) => (
                                    <Link key={post.slug} href={`/errors/${post.slug}`} className="group flex gap-4">
                                        <span className="text-3xl font-black text-white/5 group-hover:text-accent-primary/20 transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                                                {post.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1 text-[10px] text-text-tertiary font-bold uppercase tracking-widest">
                                                <span>{post.language}</span>
                                                <span>•</span>
                                                <span>{post.views || 0} VIEWS</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* PROMO CARD */}
                        <div className="p-8 bg-gradient-to-br from-accent-primary/20 to-transparent border border-accent-primary/20 rounded-2xl relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Terminal size={120} className="text-accent-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Contribute a Solution</h3>
                            <p className="text-sm text-text-secondary mb-6 relative z-10">
                                Help the community by sharing your verified error fixes. Earn developer points!
                            </p>
                            <Link href="/admin/posts/new" className="px-6 py-2 bg-white text-black rounded-full text-xs font-black hover:bg-accent-primary transition-colors">
                                SUBMIT FIX
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </LayoutWrapper>
    );
}
