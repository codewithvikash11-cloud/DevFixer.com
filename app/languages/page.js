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
            <div className="mb-20">
                <div className="flex items-center space-x-2 text-accent-blue font-mono text-xs mb-4">
                    <Monitor size={16} />
                    <span className="uppercase tracking-[0.2em] font-bold">Tech Stack Index</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight">Ecosystems</h1>
                <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                    Select a technology to explore indexed errors, architectural guidelines,
                    and production-ready code snippets.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {languages.map((lang) => (
                    <Link
                        key={lang.slug}
                        href={`/languages/${lang.slug}`}
                        className="group flex flex-col p-8 bg-panel/30 border border-border rounded-[2.5rem] hover:border-accent-blue/50 hover:bg-panel/50 transition-all transform hover:scale-[1.02] hover:shadow-2xl duration-300 active:scale-95"
                    >
                        <div className={`w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-8 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/20 transition-all`}>
                            <lang.icon size={32} className={`${lang.color} group-hover:scale-110 transition-transform`} />
                        </div>

                        <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-blue transition-colors">
                            {lang.name}
                        </h3>

                        <div className="flex items-center space-x-2 text-text-secondary text-sm font-medium mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                            <span>{lang.count}</span>
                        </div>

                        <div className="mt-auto flex items-center space-x-2 text-xs font-bold text-accent-blue opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                            <span>EXPLORE DOCS</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-24 p-12 bg-panel/20 border border-dashed border-border rounded-[3rem] text-center">
                <h3 className="text-xl font-bold mb-4 italic opacity-50">More technologies arriving soon...</h3>
                <p className="text-sm text-text-secondary">Our team is working on indexing Rust, Go, and C# diagnostic data.</p>
            </div>
        </LayoutWrapper>
    );
}
