
'use client';

import React, { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Search, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // For now, redirect to /errors?search=query
            // Ideally we'd have a dedicated search results generic page or use this page.
            // Let's assume /errors accepts a search param.
            router.push(`/errors?search=${encodeURIComponent(query)}`);
        }
    };

    const suggestions = [
        "React hydration error",
        "Python indentation error",
        "Next.js build failed",
        "MongoDB connection timeout",
        "Tailwind styles not applying"
    ];

    return (
        <LayoutWrapper>
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-3xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        Search <span className="text-accent-primary">Solutions</span>
                    </h1>

                    <form onSubmit={handleSearch} className="relative group w-full">
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary w-6 h-6 group-focus-within:text-accent-primary transition-colors" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for errors, codes, or messages..."
                                className="w-full h-16 pl-14 pr-4 bg-surface rounded-2xl border border-border shadow-lg focus:ring-2 focus:ring-accent-primary/50 text-lg outline-none transition-all"
                            />
                            <button
                                type="submit"
                                aria-label="Search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    <div className="space-y-4">
                        <p className="text-sm font-bold uppercase tracking-widest text-text-secondary">Popular Searches</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {suggestions.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setQuery(item);
                                        // Optional: Auto-submit
                                    }}
                                    className="px-4 py-2 rounded-full bg-surface border border-border hover:border-accent-primary/50 hover:text-accent-primary transition-all text-sm text-text-secondary"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
