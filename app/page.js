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
            <section className="relative w-full flex items-center justify-center overflow-hidden bg-background py-16 md:py-20 lg:py-24">
                <AuroraBackground />

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                        {/* Left Column: Typography */}
                        <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                            <div className="space-y-6">
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-text-primary leading-[1.05]">
                                    The Ultimate <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008000] to-[#004d00] animate-gradient">
                                        Developer Playground
                                    </span>
                                </h1>

                                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium tracking-tight">
                                    The intelligent knowledge base that turns cryptic error logs into instant solutions. Stop debugging, start shipping.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <Link
                                    href="/errors"
                                    className="group w-full sm:w-auto h-12 px-8 bg-text-primary text-background rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:opacity-90 hover:-translate-y-1 flex items-center justify-center space-x-2 shadow-lg shadow-accent-glow"
                                >
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
                        </div>

                        {/* Right Column: Visuals */}
                        <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative animate-in fade-in zoom-in duration-1000 delay-200 flex items-center justify-center">
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
