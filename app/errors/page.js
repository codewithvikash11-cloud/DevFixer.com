"use client";

import React, { useState } from 'react';
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

const allErrors = [
    { id: 1, title: "Uncaught ReferenceError: x is not defined", language: "JavaScript", difficulty: "Beginner", solved: "12k+", description: "One of the most common JavaScript errors. Occurs when you try to access a variable that hasn't been declared." },
    { id: 2, title: "TypeError: Cannot set property 'id' of undefined", language: "JavaScript", difficulty: "Intermediate", solved: "45k+", description: "Happens when accessing properties on undefined objects, often during async data fetching." },
    { id: 3, title: "ZeroDivisionError: division by zero", language: "Python", difficulty: "Beginner", solved: "8k+", description: "Python throws this when it encounters a number divided by literals or variables containing zero." },
    { id: 4, title: "RangeError: Maximum call stack size exceeded", language: "JavaScript", difficulty: "Advanced", solved: "2k+", description: "Usually caused by infinite recursion or circular object references during serialization." },
    { id: 5, title: "ImportError: No module named 'django'", language: "Python", difficulty: "Intermediate", solved: "30k+", description: "Occurs when a required package is missing from the environment path or hasn't been installed." },
    { id: 6, title: "CORS policy: No 'Access-Control-Allow-Origin' header", language: "Web", difficulty: "Advanced", solved: "100k+", description: "A browser security mechanism that blocks cross-origin requests unless explicitly allowed by the server." },
];

export default function ErrorsListingPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredErrors = allErrors.filter(err =>
        err.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        err.language.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <LayoutWrapper>
            <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded-full text-accent-blue text-xs font-bold mb-6">
                    <Globe size={14} />
                    <span>Universal Solution Database</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">The Error Archive</h1>
                <p className="text-xl text-text-secondary leading-relaxed">
                    Access thousands of verified solutions, technical breakdowns, and preventative guidelines
                    curated by senior software architects.
                </p>
            </div>

            {/* Global Search Interface */}
            <div className="max-w-4xl mx-auto mb-16 px-4">
                <div className="relative group">
                    <div className="absolute inset-0 bg-accent-blue/20 blur-3xl opacity-0 group-focus-within:opacity-30 transition-opacity duration-700" />
                    <div className="relative flex items-center bg-panel border-2 border-border group-focus-within:border-accent-blue/50 rounded-[2rem] p-2 pr-6 shadow-2xl transition-all h-20">
                        <div className="w-16 h-16 flex items-center justify-center text-text-secondary group-focus-within:text-accent-blue transition-colors">
                            <Search size={28} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by error message, code, or technology..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-xl font-medium placeholder:text-text-secondary/50"
                        />
                        <div className="hidden md:flex items-center space-x-2">
                            <button className="p-3 bg-background border border-border rounded-xl text-text-secondary hover:text-text-primary transition-all">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-[0.2em] mr-2">Hot Topics:</span>
                    {['React Hooks', 'Python Async', 'Docker Compose', 'Tailwind Config', 'Next.js Routing'].map(tag => (
                        <button key={tag} className="px-4 py-2 bg-panel border border-border rounded-xl text-xs font-bold text-text-secondary hover:text-accent-blue hover:border-accent-blue/20 transition-all flex items-center space-x-2 group">
                            <Flame size={12} className="text-orange-500 group-hover:animate-pulse" />
                            <span>{tag}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {filteredErrors.map((error) => (
                    <Link
                        key={error.id}
                        href={`/errors/detail`}
                        className="group flex flex-col p-8 bg-panel/40 border border-border rounded-[2.5rem] hover:border-accent-blue/50 hover:bg-panel/60 transition-all transform hover:scale-[1.02] hover:shadow-2xl active:scale-95 duration-300"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-[10px] font-black rounded-full border border-accent-blue/20 uppercase tracking-widest">
                                {error.language}
                            </div>
                            <div className="flex items-center space-x-1 text-accent-yellow">
                                <Star size={14} className="fill-current" />
                                <span className="text-xs font-bold text-text-primary">4.9</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4 leading-tight min-h-[3.5rem] group-hover:text-accent-blue transition-colors">
                            {error.title}
                        </h3>

                        <p className="text-sm text-text-secondary mb-8 line-clamp-3 leading-relaxed">
                            {error.description}
                        </p>

                        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-text-secondary uppercase tracking-tighter">Difficulty</span>
                                    <span className="text-xs font-bold">{error.difficulty}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-text-secondary uppercase tracking-tighter">Resolved</span>
                                    <span className="text-xs font-bold text-accent-green">{error.solved}</span>
                                </div>
                            </div>

                            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary group-hover:bg-accent-blue group-hover:text-white group-hover:border-accent-blue transition-all">
                                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Placeholder for "Add Empty State" */}
                {filteredErrors.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-30">
                        <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-8">
                            <Terminal size={48} />
                        </div>
                        <h3 className="text-2xl font-bold">No results found for "{searchQuery}"</h3>
                        <p className="mt-4">Try checking your spelling or search for a different error code.</p>
                    </div>
                )}
            </div>

            <div className="mt-20 py-12 border-t border-border/50 text-center">
                <h3 className="text-lg font-bold mb-6">Can't find your specific issue?</h3>
                <Link href="/editor" className="inline-flex items-center space-x-3 px-8 py-4 bg-accent-blue text-white rounded-2xl font-black text-lg shadow-xl shadow-accent-blue/20 hover:scale-105 transition-all active:scale-95">
                    <Zap size={24} fill="currentColor" />
                    <span>Open Diagnostic Tool</span>
                </Link>
            </div>
        </LayoutWrapper>
    );
}
