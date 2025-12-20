"use client";

import React from 'react';
import { useParams } from 'next/navigation';
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
    ChevronRight,
    TrendingUp,
    Clock,
    Zap,
    ArrowRight,
    Star
} from 'lucide-react';
import Link from 'next/link';

const langInfo = {
    javascript: { name: 'JavaScript', icon: FileJson, color: 'text-yellow-400', desc: 'The language of the web. From frontend interactivity to backend scalability.', level: 'Universal' },
    python: { name: 'Python', icon: Code2, color: 'text-blue-400', desc: 'Powerful, clear, and readable. Used for data science, AI, and web backend.', level: 'Multi-purpose' },
    html: { name: 'HTML', icon: Layout, color: 'text-orange-400', desc: 'The backbone of every website. Structure and semantics.', level: 'Foundation' },
    css: { name: 'CSS', icon: Palette, color: 'text-blue-500', desc: 'Bringing style and beauty to the web. Layouts, animations, and typography.', level: 'Presentation' },
    nodejs: { name: 'Node.js', icon: Server, color: 'text-green-500', desc: 'JavaScript on the server. Efficient, event-driven, and lightning fast.', level: 'Backend' },
    react: { name: 'React', icon: Atom, color: 'text-cyan-400', desc: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.', level: 'Frontend' },
    sql: { name: 'SQL', icon: Database, color: 'text-indigo-400', desc: 'Structured Query Language. The standard for managing relational databases.', level: 'Storage' },
    git: { name: 'Git', icon: GitBranch, color: 'text-orange-600', desc: 'Distributed version control system. Essential for collaboration.', level: 'VCS' },
};

const mockErrors = [
    { id: 1, title: "Uncaught ReferenceError: x is not defined", difficulty: "Beginner", solved: "12k+" },
    { id: 2, title: "TypeError: Cannot set property 'id' of undefined", difficulty: "Intermediate", solved: "45k+" },
    { id: 3, title: "SyntaxError: Unexpected token 'export'", difficulty: "Intermediate", solved: "8k+" },
    { id: 4, title: "RangeError: Maximum call stack size exceeded", difficulty: "Advanced", solved: "2k+" },
    { id: 5, title: "Promise { <pending> } - Why my async function is not returning data?", difficulty: "Beginner", solved: "30k+" },
    { id: 6, title: "CORS policy: No 'Access-Control-Allow-Origin' header", difficulty: "Advanced", solved: "100k+" },
];

export default function LanguagePage() {
    const { slug } = useParams();
    const info = langInfo[slug] || { name: slug, icon: Code2, color: 'text-text-primary', desc: 'Documentation and errors for this technology.', level: 'Community' };
    const Icon = info.icon;

    return (
        <LayoutWrapper>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 md:mb-16">
                <div className="flex items-center space-x-6 md:space-x-8">
                    <div className={`p-6 bg-panel border border-border rounded-[2rem] ${info.color} shadow-xl shadow-black/10`}>
                        <Icon size={56} className="md:w-16 md:h-16" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 text-text-secondary font-mono text-xs mb-2">
                            <Star size={12} className="text-accent-yellow fill-accent-yellow" />
                            <span className="uppercase tracking-widest">{info.level} Stack</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight">{info.name}</h1>
                        <p className="text-text-secondary max-w-xl text-lg leading-relaxed">{info.desc}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="px-6 py-3 bg-panel border-2 border-border/50 rounded-2xl flex items-center space-x-3 shadow-sm">
                        <TrendingUp size={20} className="text-accent-green" />
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-tighter text-text-secondary">Active Fixes</p>
                            <p className="text-sm font-bold tracking-tight">852 this week</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold flex items-center space-x-3">
                            <span className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue font-mono text-sm leading-6">01</span>
                            <span>Common {info.name} Pitfalls</span>
                        </h2>
                        <div className="h-px flex-1 bg-border/50 ml-6 hidden md:block"></div>
                    </div>

                    <div className="space-y-4">
                        {mockErrors.map((error) => (
                            <Link
                                key={error.id}
                                href={`/errors/detail`}
                                className="group flex items-center justify-between p-6 bg-panel/30 border border-border rounded-2xl hover:border-accent-blue/50 hover:bg-panel/50 hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-95 duration-200"
                            >
                                <div className="flex items-center space-x-5">
                                    <div className="w-12 h-12 bg-background border border-border rounded-xl flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/20 transition-all shadow-inner">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold group-hover:text-accent-blue transition-colors mb-1">{error.title}</h3>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-[10px] font-mono px-2 py-0.5 bg-border/50 rounded uppercase tracking-tighter">{error.difficulty}</span>
                                            <span className="text-xs text-accent-green font-bold flex items-center space-x-1">
                                                <Zap size={10} className="fill-current" />
                                                <span>{error.solved} Solved</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary group-hover:bg-accent-blue group-hover:text-white group-hover:border-accent-blue transition-all">
                                    <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="pt-8">
                        <button className="w-full py-4 border-2 border-dashed border-border hover:border-accent-blue/50 hover:bg-accent-blue/5 rounded-2xl text-text-secondary hover:text-accent-blue font-bold transition-all flex items-center justify-center space-x-2 group">
                            <span>Load More Documentation</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="p-8 bg-accent-blue/5 border-2 border-accent-blue/10 rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-blue/10 rounded-full blur-[40px] group-hover:scale-125 transition-transform duration-700" />

                        <h3 className="font-bold text-xl mb-6 flex items-center space-x-3">
                            <Zap size={22} className="text-accent-blue fill-accent-blue/20" />
                            <span>Pro Guidelines</span>
                        </h3>
                        <ul className="space-y-6">
                            {[
                                { text: "Always enforce strict type checking where applicable.", icon: "01" },
                                { text: "Prefer functional components and hooks for cleaner state.", icon: "02" },
                                { text: "Minimize side effects in core business logic.", icon: "03" }
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start space-x-4 group/tip">
                                    <span className="text-[10px] font-mono text-accent-blue/50 font-bold mt-1 tracking-tighter">{tip.icon}</span>
                                    <p className="text-sm text-text-secondary leading-relaxed group-hover/tip:text-text-primary transition-colors">
                                        {tip.text}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <button className="mt-8 w-full py-3 bg-accent-blue text-white rounded-xl font-bold text-sm shadow-lg shadow-accent-blue/20 active:scale-95 transition-all">
                            Download PDF Guide
                        </button>
                    </div>

                    <div className="p-8 bg-panel border-2 border-border/50 rounded-[2rem]">
                        <h3 className="font-bold text-xl mb-6">Explore Ecosystem</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Module Federation', 'ES Build', 'TypeScript 5.0', 'Turbopack', 'Vite', 'SWC'].map((tag) => (
                                <span key={tag} className="px-4 py-2 bg-background border border-border rounded-xl text-xs font-semibold text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all cursor-pointer hover:shadow-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
