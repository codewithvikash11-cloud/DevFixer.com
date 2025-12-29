"use client";

import React from 'react';

const TrustSection = () => {
    return (
        <section className="py-20 relative overflow-hidden border-t border-border">
            <div className="absolute inset-0 bg-surface/30 mix-blend-overlay pointer-events-none" />
            <div className="container mx-auto px-6 text-center relative z-10">
                <p className="text-sm font-bold text-text-tertiary uppercase tracking-widest mb-10">
                    Powering development teams at
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {/* Logos using font for now, but cleaner */}
                    <span className="text-2xl font-black text-text-primary hover:scale-105 transition-transform cursor-default">Next.js</span>
                    <span className="text-2xl font-black text-text-primary hover:scale-105 transition-transform cursor-default">Vercel</span>
                    <span className="text-2xl font-black text-text-primary hover:scale-105 transition-transform cursor-default">Stripe</span>
                    <span className="text-2xl font-black text-text-primary hover:scale-105 transition-transform cursor-default">Supabase</span>
                    <span className="text-2xl font-black text-text-primary hover:scale-105 transition-transform cursor-default">Linear</span>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
