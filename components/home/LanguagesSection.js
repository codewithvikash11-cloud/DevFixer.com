"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Code } from 'lucide-react';

import { LANGUAGES } from '@/lib/languages';

const languages = LANGUAGES.filter(l => l.image).map(l => ({
    name: l.name,
    count: "1k+", // Dynamic counts would be better, but static for now
    image: l.image,
    slug: l.slug
}));

const LanguageChip = ({ lang }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <Link
            href={`/languages?q=${lang.slug}`}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full border border-border bg-surface hover:bg-surface-highlight hover:border-accent-primary/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group/chip"
        >
            <div className="relative w-6 h-6 shrink-0 mr-2.5 flex items-center justify-center">
                {!imgError ? (
                    <Image
                        src={lang.image}
                        alt={`${lang.name} icon`}
                        width={24}
                        height={24}
                        className="object-contain rounded-[8px]"
                        onError={() => setImgError(true)}
                        priority={false}
                    />
                ) : (
                    <Code className="w-5 h-5 text-text-tertiary" />
                )}
            </div>

            <span className="font-bold text-text-primary text-lg">{lang.name}</span>
            <span className="text-xs font-mono text-text-tertiary opacity-60 group-hover/chip:opacity-100">{lang.count}</span>
        </Link>
    );
};

const LanguagesSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-background border-y border-border">

            <div className="container mx-auto px-6 text-center mb-16 relative z-10">
                <h2 className="text-3xl font-bold text-text-primary tracking-tight mb-4">Supported <span className="text-gradient-cosmic">Ecosystems</span></h2>
                <p className="text-text-secondary">We track error patterns across the entire modern stack.</p>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks */}
                <div className="absolute top-0 bottom-0 left-0 w-24 z-20 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-24 z-20 bg-gradient-to-l from-background to-transparent" />

                {/* Marquee Content (Duplicated for seamless loop) */}
                <div className="py-12 animate-marquee flex space-x-8 whitespace-nowrap hover:[animation-play-state:paused]">
                    {[...languages, ...languages, ...languages].map((lang, index) => (
                        <LanguageChip key={`${lang.slug}-${index}`} lang={lang} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default LanguagesSection;
