"use client";

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    Search,
    Terminal,
    Zap,
    ChevronRight,
    Star,
    Clock,
    Filter,
    AlertTriangle,
    Flame,
    Globe
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ErrorsListingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                // Only show published posts
                const published = data.filter(post => post.status === 'published');
                setPosts(published);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load posts', err);
                setLoading(false);
            });
    }, []);

    const filteredErrors = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.language.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <LayoutWrapper>
            <div className="mb-10 md:mb-24 text-center max-w-4xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-accent-blue/5 border-2 border-accent-blue/20 rounded-2xl text-accent-blue text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-6 md:mb-8 shadow-xl">
                    <Globe size={14} className="md:w-4 md:h-4" />
                    <span>Universal Solution Database</span>
                </div>
                <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-none">The Error Archive</h1>
                <p className="text-base md:text-2xl text-text-secondary leading-relaxed font-medium">
                    Access thousands of verified solutions, technical breakdowns, and preventative guidelines
                    curated by senior software architects.
                </p>
            </div>

            {/* Global Search Interface */}
            <div className="max-w-3xl mx-auto mb-10 md:mb-16 px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="relative group">
                    <div className="absolute inset-0 bg-accent-blue/10 blur-[60px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
                    <div className="relative flex items-center bg-panel border border-border group-focus-within:border-accent-blue/50 rounded-xl md:rounded-2xl p-1.5 md:p-2 pr-3 md:pr-4 shadow-xl transition-all h-12 md:h-14 hover:border-accent-blue/30 overflow-hidden">
                        <div className="w-10 md:w-12 h-full flex items-center justify-center text-text-secondary group-focus-within:text-accent-blue transition-colors shrink-0">
                            <Search size={18} className="md:w-5 md:h-5" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by error message..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm md:text-base font-medium placeholder:text-text-secondary/50 min-w-0"
                        />
                        <div className="hidden md:flex items-center space-x-2 shrink-0">
                            <div className="text-[9px] font-bold text-text-secondary/50 border border-border px-1.5 py-0.5 rounded uppercase tracking-widest">
                                CMD+K
                            </div>
                            <button className="p-2 bg-background border border-border rounded-lg text-text-secondary hover:text-accent-blue hover:border-accent-blue/20 transition-all active:scale-95">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-6 md:mt-10 px-2 transition-all">
                    <span className="text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] w-full md:w-auto text-center md:text-left mb-2 md:mb-0">Hot Topics:</span>
                    {['React Hooks', 'Python Async', 'Docker Compose', 'Tailwind Config', 'Next.js Routing'].map(tag => (
                        <button key={tag} className="px-4 md:px-6 py-2 md:py-2.5 bg-panel border-2 border-border hover:border-accent-blue/30 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black text-text-secondary hover:text-accent-blue transition-all active:scale-95 group uppercase tracking-widest">
                            <span>#{tag}</span>
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 animate-pulse text-text-secondary">Loading archive...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-2 md:px-4">
                    {filteredErrors.map((error, index) => (
                        <Link
                            key={error.slug}
                            href={`/errors/${error.slug}`}
                            className="group flex flex-col p-6 md:p-10 bg-panel border-2 border-border/80 rounded-[2rem] md:rounded-[3rem] hover:border-accent-blue/50 hover:bg-panel shadow-xl transition-all duration-500 hover:-translate-y-1 active:scale-95 animate-in fade-in slide-in-from-bottom-12"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start justify-between mb-6 md:mb-8">
                                <div className="px-3 py-1 md:px-4 md:py-1.5 bg-accent-blue text-white text-[9px] md:text-[10px] font-black rounded-full shadow-lg shadow-accent-blue/20 uppercase tracking-widest">
                                    {error.language}
                                </div>
                                <div className="flex items-center space-x-1.5 text-accent-yellow">
                                    <Star size={14} className="md:w-4 md:h-4 fill-current" />
                                    <span className="text-xs md:text-sm font-black text-text-primary">4.9</span>
                                </div>
                            </div>

                            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 leading-tight group-hover:text-accent-blue transition-colors tracking-tight line-clamp-2 md:min-h-[4rem]">
                                {error.title}
                            </h3>

                            <p className="text-xs md:text-sm text-text-secondary mb-8 md:mb-10 line-clamp-2 md:line-clamp-3 leading-relaxed font-medium opacity-80">
                                {error.description}
                            </p>

                            <div className="mt-auto pt-6 md:pt-8 border-t border-border/50 flex items-center justify-between">
                                <div className="flex items-center space-x-4 md:space-x-6">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-50">Lvl</span>
                                        <span className="text-[10px] md:text-xs font-black uppercase text-text-primary">{error.difficulty || 'Intermediate'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-50">Fixes</span>
                                        <span className="text-[10px] md:text-xs font-black text-accent-green uppercase tracking-tight">Verified</span>
                                    </div>
                                </div>

                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-border flex items-center justify-center text-text-secondary group-hover:bg-accent-blue group-hover:text-white group-hover:border-accent-blue transition-all duration-500 group-hover:shadow-lg group-hover:shadow-accent-blue/30 group-hover:rotate-6">
                                    <ChevronRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {!loading && filteredErrors.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-center opacity-30">
                    <Terminal size={48} className="md:w-16 md:h-16 mb-6" />
                    <h3 className="text-lg md:text-2xl font-black uppercase tracking-widest">No results found</h3>
                    <p className="mt-2 text-sm">Try adjusting your search filters.</p>
                </div>
            )}

            <div className="mt-16 md:mt-20 py-10 md:py-12 border-t border-border/50 text-center">
                <h3 className="text-xl font-bold mb-6 md:mb-8 font-black uppercase tracking-tight">Can't find your issue?</h3>
                <Link href="/editor" className="inline-flex items-center space-x-3 px-8 md:px-10 py-4 md:py-5 bg-accent-blue text-white rounded-2xl font-black text-base md:text-lg shadow-2xl shadow-accent-blue/20 active-scale uppercase tracking-widest">
                    <Zap size={20} className="md:w-6 md:h-6" fill="currentColor" />
                    <span>Open Diagnostic Tool</span>
                </Link>
            </div>
        </LayoutWrapper>
    );
}
