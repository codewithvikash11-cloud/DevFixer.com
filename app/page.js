"use client";

import React, { useEffect, useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import AuroraBackground from '@/components/hero/AuroraBackground';
import GlassEcosystem from '@/components/hero/GlassEcosystem';
import Link from 'next/link';
import {
    Terminal,
    Search,
    ArrowRight
} from 'lucide-react';

export default function Home() {
    // Generate structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "DevFixer",
        "url": "https://devfixer.com",
        "description": "The world's most comprehensive database of developer solutions.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://devfixer.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <LayoutWrapper>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section - The "Aurora" Concept */}
            <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#030303] transition-colors duration-500">

                {/* 1. Aurora Mesh Background */}
                <AuroraBackground />

                {/* Content Grid */}
                <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* Left Column: Typographic Mastery */}
                        <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                            {/* Premium Status Chip */}
                            <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full shadow-sm hover:scale-105 transition-transform cursor-default">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-600 dark:text-gray-300">DevFixer v2.0</span>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                                    Master every <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
                                        exception.
                                    </span>
                                </h1>

                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium tracking-wide">
                                    The intelligent knowledge base that turns cryptic error logs into instant solutions. Stop debugging, start shipping.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <Link
                                    href="/errors"
                                    className="w-full sm:w-auto h-12 px-8 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm tracking-wide hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <span>Start Fixing</span>
                                    <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/languages"
                                    className="w-full sm:w-auto h-12 px-8 bg-transparent border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white rounded-full font-bold text-sm tracking-wide hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Search size={16} />
                                    <span>Browse Languages</span>
                                </Link>
                            </div>

                            {/* Trust Badge */}
                            <div className="pt-8 flex items-center justify-center lg:justify-start space-x-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-gray-300 dark:bg-gray-700" />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Trusted by 10,000+ developers</span>
                            </div>
                        </div>

                        {/* Right Column: Glass Ecosystem */}
                        <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative animate-in fade-in zoom-in duration-1000 delay-200">
                            <GlassEcosystem />
                        </div>
                    </div>
                </div>
            </section>
        </LayoutWrapper>
    );
}
