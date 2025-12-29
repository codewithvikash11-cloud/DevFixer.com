"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import AuroraBackground from '@/components/hero/AuroraBackground';
import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle, Search, Terminal, Cpu } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import TrustSection from '@/components/home/TrustSection';

export default function SolutionsPage() {
    return (
        <LayoutWrapper>

            {/* HERO SECTION */}
            <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
                <AuroraBackground />
                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center pt-20">

                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface border border-border/50 shadow-sm backdrop-blur-sm mb-6 animate-float-slow">
                        <span className="w-2 h-2 rounded-full bg-accent-warning animate-pulse" />
                        <span className="text-xs font-bold tracking-widest uppercase text-text-secondary">Instant Resolution Engine</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-8">
                        Stop Debugging. <br />
                        <span className="text-gradient-cosmic">Start Shipping.</span>
                    </h1>

                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12">
                        Get verified, peer-reviewed solutions for your specific error logs in milliseconds. Powered by the world's largest database of structural code fixes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/errors"
                            className="w-full sm:w-auto px-8 py-4 bg-text-primary text-background rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            <span>Search Error Logs</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* TRUST */}
            <TrustSection />

            {/* VISUAL DEMO SECTION */}
            <section className="py-24 bg-surface border-y border-border relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Text Content */}
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl font-bold tracking-tight text-text-primary">
                                The <span className="text-accent-primary">Fix Engine</span> Architecture
                            </h2>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                Unlike generic AI chat, DevFixer uses a deterministic structural matching engine. We analyze the AST (Abstract Syntax Tree) of your error to find exact matches, not just probable guesses.
                            </p>

                            <ul className="space-y-4">
                                <FeatureItem icon={<Terminal className="text-accent-secondary" />} title="Stack Trace Analysis" desc="We parse depth-first to find the root cause." />
                                <FeatureItem icon={<Cpu className="text-accent-success" />} title="Context Awareness" desc="Solutions adapt to your framework version (Next.js 13 vs 14)." />
                                <FeatureItem icon={<Zap className="text-accent-warning" />} title="Zero-Hallucination" desc="We only serve verified, compilable code patches." />
                            </ul>
                        </div>

                        {/* Visual */}
                        <div className="flex-1 w-full relative perspective-[2000px]">
                            <div className="relative z-10 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 w-full max-w-lg mx-auto">
                                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-xs font-mono text-gray-500">Analysis Output</div>
                                </div>

                                <div className="space-y-4 font-mono text-sm">
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-300 text-xs">
                                        Error: Hydration failed because the initial UI does not match...
                                    </div>

                                    <div className="flex justify-center my-2">
                                        <ArrowRight className="text-gray-600 rotate-90" size={20} />
                                    </div>

                                    <div className="p-4 bg-accent-success/10 border border-accent-success/20 rounded relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-1 bg-accent-success text-[#0A0A0A] text-[10px] font-bold rounded-bl-lg">
                                            VERIFIED FIX
                                        </div>
                                        <pre className="text-gray-300 text-xs overflow-x-auto">
                                            <code>
                                                <span className="text-purple-400">export</span> <span className="text-purple-400">default</span> <span className="text-blue-400">dynamic</span>(() ={'>'} <span className="text-blue-400">import</span>(...), {'{'} <br />
                                                <span className="text-yellow-400">ssr</span>: <span className="text-orange-400">false</span> <br />
                                                {'}'});
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* Glow behind */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-primary/20 blur-[100px] pointer-events-none -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS GRID */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-text-primary">
                            Why engineers trust <span className="text-gradient">DevFixer</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <BenefitCard
                            title="Deterministic"
                            desc="No 'probably' or 'maybe'. We give you the exact line number and the exact fix."
                        />
                        <BenefitCard
                            title="Secure by Design"
                            desc="All solutions are scanned for CVEs and malicious patterns before being indexed."
                        />
                        <BenefitCard
                            title="Team Sync"
                            desc="Share common error patterns within your organization to prevent regression."
                        />
                    </div>
                </div>
            </section>

            <CTASection />
        </LayoutWrapper>
    );
}

const FeatureItem = ({ icon, title, desc }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-surface transition-colors cursor-default">
        <div className="mt-1 p-2 bg-surface-highlight rounded-lg border border-border text-text-primary">
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-text-primary text-lg mb-1">{title}</h3>
            <p className="text-sm text-text-secondary">{desc}</p>
        </div>
    </div>
);

const BenefitCard = ({ title, desc }) => (
    <div className="p-8 rounded-2xl bg-surface border border-border hover:border-accent-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{desc}</p>
    </div>
);
