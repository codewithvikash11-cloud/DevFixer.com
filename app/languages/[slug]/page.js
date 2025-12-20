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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 mb-10 md:mb-16">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-8">
                    <div className={`p-5 md:p-6 bg-panel border-2 border-border/50 rounded-2xl md:rounded-[2rem] ${info.color} shadow-xl shadow-black/10`}>
                        <Icon size={40} className="md:w-16 md:h-16" />
                    </div>
                    <div>
                        <div className="flex items-center justify-center sm:justify-start space-x-2 text-text-secondary font-mono text-[9px] md:text-xs mb-2">
                            <Star size={10} className="text-accent-yellow fill-accent-yellow" />
                            <span className="uppercase tracking-widest">{info.level} Stack</span>
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black mb-3 tracking-tight">{info.name}</h1>
                        <p className="text-text-secondary max-w-xl text-base md:text-lg leading-relaxed font-medium">{info.desc}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                    <div className="px-5 py-3 bg-panel/30 border-2 border-border/50 rounded-xl flex items-center space-x-3 shadow-sm">
                        <TrendingUp size={16} className="text-accent-green" />
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60">Active Fixes</p>
                            <p className="text-xs font-black tracking-tight">852 this week</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-8 space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h2 className="text-xl md:text-2xl font-black flex items-center space-x-3 uppercase tracking-tight">
                            <span className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue font-mono text-xs md:text-sm">01</span>
                            <span>Common {info.name} Pitfalls</span>
                        </h2>
                        <div className="h-px flex-1 bg-border/50 ml-6 hidden md:block"></div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        {mockErrors.map((error) => (
                            <Link
                                key={error.id}
                                href={`/errors/detail`}
                                className="group flex items-center justify-between p-4 md:p-6 bg-panel/20 border border-border/50 rounded-2xl hover:border-accent-blue/40 hover:bg-panel/40 transition-all active:scale-95 duration-200"
                            >
                                <div className="flex items-center space-x-4 md:space-x-5 flex-1 min-w-0">
                                    <div className="hidden sm:flex w-12 h-12 bg-background border border-border rounded-xl items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/20 transition-all shadow-inner shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base md:text-lg font-black group-hover:text-accent-blue transition-colors mb-1 truncate">{error.title}</h3>
                                        <div className="flex items-center space-x-3 md:space-x-4">
                                            <span className="text-[9px] font-black px-2 py-0.5 bg-border/50 rounded uppercase tracking-widest text-text-secondary">{error.difficulty}</span>
                                            <span className="text-[10px] md:text-xs text-accent-green font-black flex items-center space-x-1 uppercase tracking-widest">
                                                <Zap size={10} className="fill-current" />
                                                <span>{error.solved} Solved</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-border flex items-center justify-center text-text-secondary group-hover:bg-accent-blue group-hover:text-white group-hover:border-accent-blue transition-all shrink-0 ml-4">
                                    <ChevronRight size={18} />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="pt-6 md:pt-8">
                        <button className="w-full py-4 border-2 border-dashed border-border hover:border-accent-blue/50 hover:bg-accent-blue/5 rounded-2xl text-[10px] md:text-xs text-text-secondary hover:text-accent-blue font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 group">
                            <span>Load More Documentation</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6 md:space-y-8 mt-6 lg:mt-0">
                    <div className="p-6 md:p-8 bg-accent-blue/5 border border-accent-blue/10 rounded-3xl relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-blue/10 rounded-full blur-[40px] group-hover:scale-125 transition-transform duration-700" />

                        <h3 className="font-black text-lg md:text-xl mb-6 flex items-center space-x-3 uppercase tracking-tight">
                            <Zap size={18} className="text-accent-blue fill-accent-blue/20" />
                            <span>Pro Guidelines</span>
                        </h3>
                        <ul className="space-y-4 md:space-y-6 relative z-10">
                            {[
                                { text: "Always enforce strict type checking where applicable.", icon: "01" },
                                { text: "Prefer functional components and hooks for cleaner state.", icon: "02" },
                                { text: "Minimize side effects in core business logic.", icon: "03" }
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start space-x-4">
                                    <span className="text-[10px] font-black text-accent-blue/50 mt-1 tracking-widest">{tip.icon}</span>
                                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
                                        {tip.text}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <button className="mt-8 w-full py-4 bg-accent-blue active-scale text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent-blue/20">
                            Download PDF Guide
                        </button>
                    </div>

                    <div className="p-6 md:p-8 bg-panel/30 border border-border/50 rounded-3xl">
                        <h3 className="font-black text-lg md:text-xl mb-6 uppercase tracking-tight">Explore Ecosystem</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Module Federation', 'ES Build', 'TypeScript 5.0', 'Turbopack', 'Vite', 'SWC'].map((tag) => (
                                <span key={tag} className="px-3 py-2 bg-background border border-border rounded-xl text-[10px] font-black tracking-widest text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all cursor-pointer uppercase">
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
