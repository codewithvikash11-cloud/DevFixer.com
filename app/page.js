"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import AuroraBackground from '@/components/hero/AuroraBackground';
import GlassEcosystem from '@/components/hero/GlassEcosystem';
import Link from 'next/link';
import { ArrowRight, Search, Terminal } from 'lucide-react';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import RecentPostsSection from '@/components/home/RecentPostsSection';
import LanguagesSection from '@/components/home/LanguagesSection';
import TrustSection from '@/components/home/TrustSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
    return (
        <LayoutWrapper>
            {/* SEO Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "DevFixer",
                        "url": "https://devfixer.com",
                        "description": "The elite knowledge base for developers.",
                    })
                }}
            />

            {/* HERO SECTION */}
            <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
                <AuroraBackground />

                <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-24 md:pt-32">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* Left Column: Typography */}
                        <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                            {/* Version Chip */}
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface border border-border/50 shadow-sm backdrop-blur-sm hover:border-accent-primary/50 transition-colors cursor-default">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-text-secondary">DevFixer v2.0</span>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-text-primary leading-[1.05]">
                                    Master every <br className="hidden lg:block" />
                                    <span className="text-gradient-cosmic">exception.</span>
                                </h1>

                                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium tracking-wide">
                                    The intelligent knowledge base that turns cryptic error logs into instant solutions. Stop debugging, start shipping.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <Link
                                    href="/errors"
                                    className="group w-full sm:w-auto h-12 px-8 bg-text-primary text-background rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/20 hover:-translate-y-1 flex items-center justify-center space-x-2 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    <span>Start Fixing</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/languages"
                                    className="group w-full sm:w-auto h-12 px-8 bg-transparent border border-border text-text-primary rounded-full font-bold text-sm tracking-wide hover:bg-surface transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Search size={16} className="text-text-tertiary group-hover:text-text-primary transition-colors" />
                                    <span>Browse Library</span>
                                </Link>
                            </div>

                            <TrustSection />
                        </div>

                        {/* Right Column: Visuals */}
                        <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative animate-in fade-in zoom-in duration-1000 delay-200 lg:h-[600px] flex items-center">
                            <GlassEcosystem />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTIONS */}
            <FeaturesSection />
            <LanguagesSection />
            <HowItWorksSection />
            <div className="relative z-10 bg-background">
                <RecentPostsSection />
            </div>
            <CTASection />
        </LayoutWrapper>
    );
}
