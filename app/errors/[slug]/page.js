"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import LayoutWrapper from '@/components/LayoutWrapper';
import CodeBlock from '@/components/CodeBlock';
import {
    AlertCircle,
    CheckCircle2,
    BookOpen,
    Share2,
    MessageSquare,
    ThumbsUp,
    ChevronRight,
    ArrowLeft,
    Zap,
    ShieldCheck,
    Award
} from 'lucide-react';
import Link from 'next/link';

export default function ErrorDetailPage() {
    const { slug } = useParams();
    const router = useRouter();

    const mockError = {
        title: "TypeError: Cannot read property 'map' of undefined",
        summary: "This error occurs when you attempt to iterate over a variable that is supposed to be an array but is instead undefined.",
        language: "JavaScript",
        difficulty: "Beginner",
        author: { name: "Sarah Drasner", role: "Sr. Engineer", avatar: "SD" },
        explanation: "In JavaScript, the .map() function is a method of the Array prototype. If you call it on a variable that has not been initialized, or a variable that was expected to be returned as an array (e.g., from an API call) but resulted in undefined, the engine throws this TypeError.",
        commonCauses: [
            "API data hasn't loaded yet",
            "Filtering an array resulted in undefined",
            "Object property is missing",
            "Initial state in React is not an empty array"
        ],
        badCode: "// This will crash if data is null\nconst list = data.map(item => item.name);",
        goodCode: "// Solution 1: Optional Chaining\nconst list = data?.map(item => item.name);\n\n// Solution 2: Default Value\nconst list = (data || []).map(item => item.name);\n\n// Solution 3: Guard Clause\nif (!data) return null;",
        related: [
            "Uncaught TypeError: Cannot read property 'id' of null",
            "ReferenceError: data is not defined",
            "TypeError: data.push is not a function"
        ]
    };

    return (
        <LayoutWrapper>
            <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors group px-3 py-1.5 hover:bg-white/5 rounded-xl border border-transparent hover:border-border w-fit"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-black text-[10px] uppercase tracking-widest">Return to Archive</span>
                </button>
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue shadow-lg shadow-accent-blue/10">
                        <ShieldCheck size={14} />
                    </div>
                    <span className="text-[9px] font-black font-mono text-text-secondary uppercase tracking-[0.2em]">Verified Documentation</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-8 space-y-8 md:space-y-12">
                    {/* Header */}
                    <section className="space-y-6">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-[9px] md:text-[10px] font-black rounded-full uppercase tracking-widest border border-accent-blue/20">
                                {mockError.language}
                            </span>
                            <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple text-[9px] md:text-[10px] font-black rounded-full uppercase tracking-widest border border-accent-purple/20">
                                {mockError.difficulty}
                            </span>
                            <div className="flex items-center space-x-2 sm:ml-auto text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center text-white text-[9px]">
                                    {mockError.author.avatar}
                                </div>
                                <span>By {mockError.author.name}</span>
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-6xl font-black leading-tight tracking-tight text-text-primary uppercase md:normal-case">
                            {mockError.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 md:gap-8 py-4 md:py-6 border-y border-border/50">
                            <button className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-all group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent-blue/10">
                                    <ThumbsUp size={14} className="md:w-4 md:h-4 group-active:scale-125 transition-transform" />
                                </div>
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">4.2k Helpful</span>
                            </button>
                            <button className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-all group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent-blue/10">
                                    <MessageSquare size={14} className="md:w-4 md:h-4" />
                                </div>
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">128 Logs</span>
                            </button>
                            <button className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-all group sm:ml-auto">
                                <Share2 size={14} className="md:w-4 md:h-4" />
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Node Export</span>
                            </button>
                        </div>
                    </section>

                    {/* Quick Summary */}
                    <section className="bg-panel/30 backdrop-blur-md border border-border/50 rounded-3xl p-6 md:p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <AlertCircle size={80} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 text-red-400 font-mono text-[9px] md:text-xs mb-3 md:mb-4">
                                <AlertCircle size={14} className="fill-red-400/10" />
                                <span className="uppercase tracking-[0.2em] font-black">Diagnostic Summary</span>
                            </div>
                            <p className="text-lg md:text-2xl font-bold text-text-primary leading-relaxed italic opacity-90">
                                "{mockError.summary}"
                            </p>
                        </div>
                    </section>

                    {/* Explanation */}
                    <section className="space-y-4 md:space-y-6">
                        <h2 className="text-xl md:text-3xl font-black flex items-center space-x-3 uppercase tracking-tight">
                            <BookOpen className="text-accent-blue" size={24} />
                            <span>Technical Breakdown</span>
                        </h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium first-letter:text-4xl first-letter:font-black first-letter:text-accent-blue first-letter:mr-2 first-letter:float-left">
                                {mockError.explanation}
                            </p>
                        </div>
                    </section>

                    {/* Causes */}
                    <section className="space-y-4 md:space-y-6">
                        <h3 className="text-[10px] md:text-xs font-black text-accent-purple uppercase tracking-[0.3em]">Probable Causes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {mockError.commonCauses.map((cause, i) => (
                                <div key={i} className="flex items-center space-x-4 p-4 md:p-5 bg-background border border-border/80 rounded-2xl hover:border-accent-purple/30 transition-all group shadow-inner">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-purple group-hover:scale-150 transition-transform shrink-0" />
                                    <span className="text-xs md:text-sm font-black uppercase tracking-tight text-text-secondary group-hover:text-text-primary">{cause}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Code Examples */}
                    <section className="space-y-8 md:space-y-10">
                        <div>
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                <h3 className="text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Hazardous Implementation</h3>
                                <span className="text-[8px] md:text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-lg border border-red-500/20 font-black tracking-widest uppercase">Broken</span>
                            </div>
                            <CodeBlock code={mockError.badCode} language="javascript" fileName="broken.js" />
                        </div>

                        <div className="bg-panel/20 border border-border/50 rounded-3xl p-6 md:p-10">
                            <div className="flex items-center justify-between mb-6 md:mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center text-accent-green shadow-lg shadow-accent-green/10">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">Standard Resolution</h3>
                                </div>
                                <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-accent-green/5 text-accent-green text-[10px] font-black rounded-full border border-accent-green/10 uppercase tracking-widest">
                                    <Award size={10} />
                                    <span>Architect Approved</span>
                                </div>
                            </div>
                            <p className="text-text-secondary mb-6 md:mb-8 text-sm md:text-base leading-relaxed font-medium">
                                Implementing one of the following protective measures ensures your application remains resilient even when data structures are incomplete.
                            </p>
                            <CodeBlock code={mockError.goodCode} language="javascript" fileName="resilient_code.js" />
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6 md:space-y-8">
                    <div className="p-6 md:p-8 bg-panel/30 border border-border/50 rounded-3xl lg:sticky lg:top-24 shadow-2xl">
                        <div className="flex items-center space-x-2 text-accent-blue font-mono text-[10px] md:text-xs mb-6 uppercase tracking-[0.2em] font-black">
                            <Zap size={14} className="fill-current" />
                            <span>Neural Links</span>
                        </div>
                        <h3 className="font-black text-xl md:text-2xl mb-6 md:mb-8 uppercase tracking-tight">Related Issues</h3>
                        <div className="space-y-4 md:space-y-6">
                            {mockError.related.map((err, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="flex items-start space-x-4 group py-1"
                                >
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-background border border-border flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all shrink-0">
                                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                    <span className="text-xs md:text-sm font-black uppercase tracking-tight text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
                                        {err}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-10 md:mt-12 space-y-3 md:space-y-4">
                            <button className="w-full py-4 bg-accent-blue active-scale text-white rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-accent-blue/20">
                                <span>Submit Quick Fix</span>
                            </button>
                            <button className="w-full py-4 bg-background border border-border hover:border-white/20 text-text-primary rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest active-scale">
                                <span>Report Inaccuracy</span>
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col items-center">
                            <div className="flex items-center space-x-1.5 opacity-40">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                                <span className="text-[9px] font-black font-mono">AI_VAL: 0.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
