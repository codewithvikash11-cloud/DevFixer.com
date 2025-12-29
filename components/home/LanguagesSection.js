"use client";

import React from 'react';
import Link from 'next/link';

const languages = [
    { name: "JavaScript", count: "2.4k+", color: "#F7DF1E" },
    { name: "Python", count: "1.8k+", color: "#3776AB" },
    { name: "React", count: "1.2k+", color: "#61DAFB" },
    { name: "TypeScript", count: "900+", color: "#3178C6" },
    { name: "Node.js", count: "850+", color: "#339933" },
    { name: "Java", count: "1.5k+", color: "#007396" },
    { name: "C++", count: "600+", color: "#00599C" },
    { name: "Go", count: "400+", color: "#00ADD8" },
    { name: "Rust", count: "300+", color: "#EF4926" },
    { name: "Docker", count: "12k+", color: "#2496ED" },
];

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
                        <Link
                            key={`${lang.name}-${index}`}
                            href={`/languages?q=${lang.name.toLowerCase()}`}
                            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full border border-border bg-surface hover:bg-surface-highlight hover:border-accent-primary/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group/chip"
                        >
                            <span
                                className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                                style={{ backgroundColor: lang.color, boxShadow: `0 0 12px ${lang.color}40` }}
                            />
                            <span className="font-bold text-text-primary text-lg">{lang.name}</span>
                            <span className="text-xs font-mono text-text-tertiary opacity-60 group-hover/chip:opacity-100">{lang.count}</span>
                        </Link>
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
