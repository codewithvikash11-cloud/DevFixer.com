"use client";

import React, { useState, useEffect, useMemo } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    Search,
    Terminal,
    Zap,
    ChevronRight,
    Filter,
    CheckCircle2,
    SlidersHorizontal,
    Code2,
    Layers,
    ArrowUpRight,
    TrendingUp,
    Clock
} from 'lucide-react';
import Link from 'next/link';

// MOCK DATA - To be replaced or merged with API data
const MOCK_POSTS = [
    {
        title: "Hydration failed because the initial UI does not match what was rendered on the server",
        slug: "hydration-failed-react-nextjs",
        language: "React",
        framework: "Next.js",
        description: "This error occurs when the HTML generated on the server does not exactly match the HTML generated on the client during the first render.",
        difficulty: "Intermediate",
        verified: true,
        fixReady: true,
        likes: 124,
        views: '12k',
        date: '2d ago'
    },
    {
        title: "RuntimeError: Event loop is closed",
        slug: "python-asyncio-event-loop-closed",
        language: "Python",
        framework: "Asyncio",
        description: "Frequently encountered in Python asyncio applications when attempting to access the event loop after it has been shut down.",
        difficulty: "Advanced",
        verified: true,
        fixReady: true,
        likes: 89,
        views: '8.5k',
        date: '1w ago'
    },
    {
        title: "TypeError: Cannot read properties of undefined (reading 'map')",
        slug: "js-typeerror-undefined-map",
        language: "JavaScript",
        framework: "Vanilla",
        description: "Occurs when attempting to call .map() on a variable that is currently undefined or null, usually due to async data fetching delays.",
        difficulty: "Beginner",
        verified: true,
        fixReady: true,
        likes: 450,
        views: '45k',
        date: '3d ago'
    },
    {
        title: "Cargo.lock is not up to date",
        slug: "rust-cargo-lock-mismatch",
        language: "Rust",
        framework: "Cargo",
        description: "This error happens when your Cargo.lock file does not match the dependency versions specified in your Cargo.toml.",
        difficulty: "Intermediate",
        verified: true,
        fixReady: true,
        likes: 34,
        views: '2k',
        date: '5d ago'
    },
    {
        title: "Docker daemon is not running",
        slug: "docker-daemon-connection-refused",
        language: "Docker",
        framework: "Docker",
        description: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Ensure the service is started.",
        difficulty: "Beginner",
        verified: true,
        fixReady: true,
        likes: 210,
        views: '15k',
        date: '1d ago'
    }
];

export default function ErrorsListingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters State
    const [selectedLanguage, setSelectedLanguage] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [sortBy, setSortBy] = useState('trending'); // trending, latest, popular

    useEffect(() => {
        // Fetch real data but fallback to mock for "Premium Feel" demonstration
        fetch('/api/posts?status=published')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Merge/Map real data to ensure all fields exist
                    const mappedData = data.map(p => ({
                        ...p,
                        framework: p.framework || p.language,
                        views: p.views || '100+',
                        date: new Date(p.createdAt).toLocaleDateString()
                    }));
                    setPosts(mappedData);
                } else {
                    setPosts(MOCK_POSTS);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load posts', err);
                setPosts(MOCK_POSTS);
                setLoading(false);
            });
    }, []);

    // Filter Logic
    const filteredPosts = useMemo(() => {
        let result = [...posts];

        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(lowerQ) ||
                p.description?.toLowerCase().includes(lowerQ) ||
                p.language.toLowerCase().includes(lowerQ)
            );
        }

        if (selectedLanguage !== 'All') {
            result = result.filter(p => p.language === selectedLanguage);
        }

        if (selectedDifficulty !== 'All') {
            result = result.filter(p => p.difficulty === selectedDifficulty);
        }

        // Sorting
        if (sortBy === 'popular') {
            result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        } else if (sortBy === 'latest') {
            // Mock date sort or real date sort (createdAt)
            // Assuming MOCK_POSTS doesn't have real dates, we skip for now or use 'date' string
        }

        return result;
    }, [posts, searchQuery, selectedLanguage, selectedDifficulty, sortBy]);

    // Derived lists for filters
    const languages = ['All', ...new Set(posts.map(p => p.language))];
    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    return (
        <LayoutWrapper>
            <div className="min-h-screen bg-background text-text-primary">

                {/* Header Section */}
                <div className="border-b border-border bg-panel/50 backdrop-blur-md sticky top-16 md:top-20 z-30">
                    <div className="container mx-auto px-4 py-4 md:py-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Error Database</h1>
                                <p className="text-sm text-text-secondary">Search {posts.length > 0 ? posts.length : '500+'} verified solutions</p>
                            </div>

                            {/* Mobile Search - Visible only on mobile */}
                            <div className="md:hidden">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search errors..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar - Desktop Filters */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-8 h-fit sticky top-40">

                        {/* Search (Desktop) */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                            <input
                                type="text"
                                placeholder="Search errors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all"
                            />
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Code2 size={14} /> Language
                            </h3>
                            <div className="space-y-1">
                                {languages.map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => setSelectedLanguage(lang)}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${selectedLanguage === lang
                                                ? 'bg-accent-primary/10 text-accent-primary'
                                                : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                                            }`}
                                    >
                                        {lang}
                                        {selectedLanguage === lang && <CheckCircle2 size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Layers size={14} /> Difficulty
                            </h3>
                            <div className="space-y-1">
                                {difficulties.map(diff => (
                                    <button
                                        key={diff}
                                        onClick={() => setSelectedDifficulty(diff)}
                                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${selectedDifficulty === diff
                                                ? 'bg-accent-primary/10 text-accent-primary'
                                                : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                                            }`}
                                    >
                                        {diff}
                                        {selectedDifficulty === diff && <CheckCircle2 size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-primary/5 to-accent-success/5 border border-accent-primary/10">
                                <h4 className="text-sm font-bold mb-2">Can't find it?</h4>
                                <p className="text-xs text-text-secondary mb-3">Our community of senior engineers can help debug your issue.</p>
                                <Link href="/editor" className="block w-full text-center py-2 bg-text-primary text-background rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
                                    Post Error
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Results */}
                    <div className="flex-1">

                        {/* Filters & Sorting Bar (Mobile/Active Filters) */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-sm text-text-secondary">
                                Showing <span className="font-bold text-text-primary">{filteredPosts.length}</span> results
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-secondary hidden sm:inline">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-surface border border-border text-sm rounded-lg px-2 py-1 focus:outline-none"
                                >
                                    <option value="trending">Trending</option>
                                    <option value="popular">Most Liked</option>
                                    <option value="latest">Latest</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-40 bg-surface animate-pulse rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/errors/${post.slug}`}
                                        className="group block bg-panel border border-border rounded-xl p-6 hover:border-accent-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/5 relative overflow-hidden"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface border border-border text-text-secondary group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary transition-colors">
                                                        {post.language}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                                                    <span className="text-xs text-text-secondary flex items-center gap-1">
                                                        {post.difficulty}
                                                    </span>
                                                    {post.verified && (
                                                        <span className="flex items-center gap-1 text-[10px] text-accent-success font-bold bg-accent-success/10 px-2 py-0.5 rounded-full">
                                                            <CheckCircle2 size={10} /> Verified
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2 line-clamp-2 leading-tight group-hover:text-accent-primary transition-colors">
                                                    {post.title}
                                                </h3>

                                                <p className="text-sm text-text-secondary line-clamp-2 md:line-clamp-1 mb-4">
                                                    {post.description}
                                                </p>

                                                <div className="flex items-center gap-4 text-xs text-text-tertiary">
                                                    <div className="flex items-center gap-1">
                                                        <TrendingUp size={12} />
                                                        <span>{post.views || '120'} views</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        <span>{post.date || 'Recently'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="hidden sm:flex flex-col items-center justify-center h-full w-16 border-l border-border pl-4 gap-1">
                                                <ArrowUpRight className="text-text-tertiary group-hover:text-accent-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {filteredPosts.length === 0 && (
                                    <div className="text-center py-20 bg-surface/50 rounded-xl border border-dashed border-border">
                                        <Terminal className="mx-auto h-12 w-12 text-text-tertiary mb-4" />
                                        <h3 className="text-lg font-bold text-text-primary">No results found</h3>
                                        <p className="text-sm text-text-secondary">Try adjusting your filters or search query.</p>
                                        <button
                                            onClick={() => { setSearchQuery(''); setSelectedLanguage('All'); setSelectedDifficulty('All'); }}
                                            className="mt-4 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surface-highlight"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
