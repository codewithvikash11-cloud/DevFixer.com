"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-indigo-900 dark:bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-900/40 to-black z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.2] z-0" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                    Ready to fix your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">codebase?</span>
                </h2>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Join thousands of developers using DevFixer to solve complex errors in seconds, not hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/errors"
                        className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-900 rounded-full font-black text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <span>Start Fixing Now</span>
                        <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        <Github size={20} />
                        <span>Contribute</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
