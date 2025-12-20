"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    FileJson,
    Code2,
    Layout,
    Palette,
    Server,
    Atom,
    Database,
    GitBranch,
    ArrowRight,
    Monitor
} from 'lucide-react';
import Link from 'next/link';

const languages = [
    { name: 'JavaScript', icon: FileJson, color: 'text-yellow-400', slug: 'javascript', count: '1,240 fixes' },
    { name: 'Python', icon: Code2, color: 'text-blue-400', slug: 'python', count: '942 fixes' },
    { name: 'HTML', icon: Layout, color: 'text-orange-400', slug: 'html', count: '420 fixes' },
    { name: 'CSS', icon: Palette, color: 'text-blue-500', slug: 'css', count: '630 fixes' },
    { name: 'Node.js', icon: Server, color: 'text-green-500', slug: 'nodejs', count: '810 fixes' },
    { name: 'React', icon: Atom, color: 'text-cyan-400', slug: 'react', count: '1,500 fixes' },
    { name: 'SQL', icon: Database, color: 'text-indigo-400', slug: 'sql', count: '320 fixes' },
    { name: 'Git', icon: GitBranch, color: 'text-orange-600', slug: 'git', count: '150 fixes' },
];

export default function LanguagesListingPage() {
    return (
        <LayoutWrapper>
            <div className="mb-12 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center space-x-2 text-accent-blue font-mono text-[10px] mb-4 font-black tracking-[0.3em] uppercase">
                    <Monitor size={14} />
                    <span>Tech Stack Index</span>
                </div>
                <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-none">Ecosystems</h1>
                <p className="text-base md:text-2xl text-text-secondary max-w-2xl leading-relaxed font-medium">
                    Select a technology to explore indexed errors, architectural guidelines,
                    and production-ready code snippets.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 px-2 md:px-0">
                {languages.map((lang, index) => (
                    <Link
                        key={lang.slug}
                        href={`/languages/${lang.slug}`}
                        className="group flex flex-col p-6 md:p-10 bg-panel border-2 border-border/50 rounded-[2rem] md:rounded-[3rem] hover:border-accent-blue/50 hover:bg-panel shadow-xl transition-all duration-500 hover:-translate-y-1 active:scale-95 animate-in fade-in slide-in-from-bottom-12"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[1.75rem] bg-background border-2 border-border/80 flex items-center justify-center mb-6 md:mb-10 group-hover:bg-accent-blue/5 group-hover:border-accent-blue/20 transition-all duration-500 shadow-inner group-hover:rotate-6`}>
                            <lang.icon size={28} className={`${lang.color} md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-500`} />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-3 tracking-tight group-hover:text-accent-blue transition-colors">
                            {lang.name}
                        </h3>

                        <div className="flex items-center space-x-2 text-text-secondary text-xs md:text-sm font-medium mb-6 md:mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                            <span>{lang.count}</span>
                        </div>

                        <div className="mt-auto flex items-center space-x-2 text-[10px] md:text-xs font-bold text-accent-blue opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                            <span>EXPLORE DOCS</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-16 md:mt-24 p-8 md:p-12 bg-panel/20 border border-dashed border-border rounded-[2rem] md:rounded-[3rem] text-center">
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 italic opacity-50">More technologies arriving soon...</h3>
                <p className="text-xs md:text-sm text-text-secondary">Our team is working on indexing Rust, Go, and C# diagnostic data.</p>
            </div>
        </LayoutWrapper>
    );
}
