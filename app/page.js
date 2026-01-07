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


import QuickAccessGrid from '@/components/home/QuickAccessGrid';
import TrustSection from '@/components/home/TrustSection';

export default function Home() {
    // CMS Integration State
    const [heroContent, setHeroContent] = React.useState({
        title: <>The Ultimate <br className="hidden lg:block" /><span className="text-accent-primary">Developer Ecosystem</span></>,
        description: "Fix errors, build projects, test APIs, and master new skills. The all-in-one platform engineered for modern developers.",
        ctaPrimary: { label: "Start Fixing Now", href: "/errors" },
        ctaSecondary: { label: "Try Playground", href: "/compiler" }
    });

    React.useEffect(() => {
        // Hydrate from CMS
        const loadCmsContent = async () => {
            try {
                // Dynamically import to avoid server-side issues if any
                const { getPostBySlug } = await import('@/lib/posts');
                const post = await getPostBySlug('page-home');
                if (post && post.content) {
                    const data = JSON.parse(post.content);

                    // Map JSON data to Component State
                    if (data.hero) {
                        setHeroContent(prev => ({
                            ...prev,
                            title: <span dangerouslySetInnerHTML={{ __html: data.hero.title.replace('Developer Ecosystem', '<span class="text-accent-primary">Developer Ecosystem</span>') }} />,
                            // Note: Real parsing would be safer/more complex, here we do simple replacement or direct string usage
                            // Ideally, we just set the string and let the component handle styling, but for now we simplisticly map.
                            description: data.hero.description || prev.description,
                            ctaPrimary: data.hero.ctaPrimary || prev.ctaPrimary,
                            ctaSecondary: data.hero.ctaSecondary || prev.ctaSecondary
                        }));
                    }
                }
            } catch (e) {
                console.error("CMS Load Failed", e);
            }
        };
        loadCmsContent();
    }, []);

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
                        "description": "The elite knowledge base and toolkit for developers.",
                    })
                }}
            />

            {/* HERO SECTION */}
            <section className="relative w-full flex items-center justify-center overflow-hidden bg-background py-12 lg:py-24">
                <AuroraBackground />

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                        {/* Left Column: Typography */}
                        <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                            <div className="space-y-6">

                                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-text-primary leading-[1.05]">
                                    {/* Handle both string and React Node title */}
                                    {typeof heroContent.title === 'string' ? (
                                        <span dangerouslySetInnerHTML={{ __html: heroContent.title }} />
                                    ) : (
                                        heroContent.title
                                    )}
                                </h1>

                                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium tracking-tight">
                                    {heroContent.description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <Link
                                    href={heroContent.ctaPrimary.href}
                                    className="group w-full sm:w-auto h-14 px-8 bg-accent-primary text-white rounded-full font-bold text-base tracking-wide transition-all duration-300 hover:bg-accent-hover hover:-translate-y-1 flex items-center justify-center space-x-2 shadow-lg shadow-accent-primary/25"
                                >
                                    <span>{heroContent.ctaPrimary.label}</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href={heroContent.ctaSecondary.href}
                                    className="group w-full sm:w-auto h-14 px-8 bg-surface border border-border text-accent-primary rounded-full font-bold text-base tracking-wide hover:bg-surface-highlight transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Terminal size={18} className="text-accent-primary group-hover:text-accent-primary transition-colors" />
                                    <span>{heroContent.ctaSecondary.label}</span>
                                </Link>
                            </div>

                            <div className="pt-2 text-sm text-text-tertiary flex items-center justify-center lg:justify-start gap-6 font-medium">
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent-success" /> Free for everyone</span>
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent-info" /> No login required</span>
                            </div>
                        </div>

                        {/* Right Column: Visuals */}
                        <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative animate-in fade-in zoom-in duration-1000 delay-200 flex items-center justify-center">
                            <GlassEcosystem />
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTIONS */}
            <TrustSection />
            <QuickAccessGrid />

            {/* EXISTING SECTIONS */}
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
