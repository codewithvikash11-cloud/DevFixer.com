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
            <div className="mb-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors group px-4 py-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-border"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm">Return to Archive</span>
                </button>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                        <ShieldCheck size={16} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em]">Verified Documentation</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-8 space-y-12">
                    {/* Header */}
                    <section className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-[10px] font-bold rounded-full uppercase tracking-widest border border-accent-blue/20">
                                {mockError.language}
                            </span>
                            <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple text-[10px] font-bold rounded-full uppercase tracking-widest border border-accent-purple/20">
                                Level: {mockError.difficulty}
                            </span>
                            <div className="flex items-center space-x-2 ml-auto text-xs font-medium text-text-secondary">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center text-white text-[10px]">
                                    {mockError.author.avatar}
                                </div>
                                <span>Contribution by {mockError.author.name}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight text-text-primary">
                            {mockError.title}
                        </h1>

                        <div className="flex items-center space-x-6 py-6 border-y border-border/50">
                            <button className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-all group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent-blue/10">
                                    <ThumbsUp size={16} className="group-active:scale-125 transition-transform" />
                                </div>
                                <span className="text-sm font-bold">4.2k Helpful</span>
                            </button>
                            <button className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-all group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent-blue/10">
                                    <MessageSquare size={16} />
                                </div>
                                <span className="text-sm font-bold">128 Debug Logs</span>
                            </button>
                            <button className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-all group ml-auto">
                                <Share2 size={16} />
                                <span className="text-sm font-bold">Node Export</span>
                            </button>
                        </div>
                    </section>

                    {/* Quick Summary */}
                    <section className="bg-panel/40 backdrop-blur-sm border-2 border-border/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <AlertCircle size={80} />
                        </div>
                        <div className="relative">
                            <div className="flex items-center space-x-3 text-red-400 font-mono text-xs mb-4">
                                <AlertCircle size={14} className="fill-red-400/10" />
                                <span className="uppercase tracking-[0.2em] font-bold">Diagnostic Summary</span>
                            </div>
                            <p className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed italic opacity-90">
                                "{mockError.summary}"
                            </p>
                        </div>
                    </section>

                    {/* Explanation */}
                    <section className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-4">
                            <BookOpen className="text-accent-blue" size={28} />
                            <span>Technical Breakdown</span>
                        </h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-text-secondary leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-accent-blue first-letter:mr-3 first-letter:float-left">
                                {mockError.explanation}
                            </p>
                        </div>
                    </section>

                    {/* Causes */}
                    <section className="space-y-6">
                        <h3 className="text-lg font-mono text-accent-purple uppercase tracking-[0.3em] font-bold">Probable Causes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockError.commonCauses.map((cause, i) => (
                                <div key={i} className="flex items-center space-x-4 p-5 bg-background border border-border rounded-2xl hover:border-accent-purple/30 transition-all group shadow-inner">
                                    <div className="w-2 h-2 rounded-full bg-accent-purple group-hover:scale-150 transition-transform shrink-0" />
                                    <span className="text-sm font-medium">{cause}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Code Examples */}
                    <section className="space-y-10">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-mono text-text-secondary uppercase tracking-[0.2em] font-bold">Hazardous Implementation</h3>
                                <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-bold">RUNTIME_CRASH</span>
                            </div>
                            <CodeBlock code={mockError.badCode} language="javascript" fileName="broken.js" />
                        </div>

                        <div className="bg-panel border border-border rounded-[2.5rem] p-8 md:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center text-accent-green shadow-lg shadow-accent-green/10">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold">Standard Resolution</h3>
                                </div>
                                <div className="hidden md:flex items-center space-x-1 px-3 py-1 bg-accent-green/5 text-accent-green text-[10px] font-bold rounded-full border border-accent-green/10">
                                    <Award size={10} />
                                    <span className="uppercase tracking-widest">Architect Approved</span>
                                </div>
                            </div>
                            <p className="text-text-secondary mb-8 leading-relaxed">
                                Implementing one of the following protective measures ensures your application remains resilient even when data structures are incomplete.
                            </p>
                            <CodeBlock code={mockError.goodCode} language="javascript" fileName="resilient_code.js" />
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="p-8 bg-panel border-2 border-border/50 rounded-[2.5rem] lg:sticky lg:top-24 shadow-2xl shadow-black/20">
                        <div className="flex items-center space-x-2 text-accent-blue font-mono text-xs mb-6 px-1">
                            <Zap size={14} className="fill-current" />
                            <span className="uppercase tracking-[0.2em] font-bold">Neural Links</span>
                        </div>
                        <h3 className="font-bold text-2xl mb-8">Related Pathologies</h3>
                        <div className="space-y-6">
                            {mockError.related.map((err, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="flex items-start space-x-4 group py-2"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all shrink-0">
                                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
                                        {err}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12 space-y-4">
                            <button className="w-full py-4 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-2xl font-bold transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center space-x-2 active:scale-95">
                                <Zap size={18} fill="currentColor" />
                                <span>Submit Quick Fix</span>
                            </button>
                            <button className="w-full py-4 bg-background border border-border hover:border-white/50 text-text-primary rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 active:scale-95">
                                <ShieldCheck size={18} />
                                <span>Report Inaccuracy</span>
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border flex flex-col items-center">
                            <div className="flex items-center space-x-1.5 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                                <span className="text-[10px] font-mono text-text-secondary">AI_VALIDATED_DATA: 0.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
