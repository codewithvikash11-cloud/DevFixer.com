"use client";

import React from 'react';

const TrustSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-white/5">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-10">
                    Powering development teams at
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    {/* Placeholder Developer Tech Logos - Using Text for now but styled like logos */}
                    <span className="text-2xl font-black text-gray-800 dark:text-white">Next.js</span>
                    <span className="text-2xl font-black text-gray-800 dark:text-white">Vercel</span>
                    <span className="text-2xl font-black text-gray-800 dark:text-white">Stripe</span>
                    <span className="text-2xl font-black text-gray-800 dark:text-white">Supabase</span>
                    <span className="text-2xl font-black text-gray-800 dark:text-white">Linear</span>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
