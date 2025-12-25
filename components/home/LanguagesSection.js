"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const languages = [
    { name: "JavaScript", count: "2.4k+", color: "bg-yellow-400/10 text-yellow-500 border-yellow-400/20" },
    { name: "Python", count: "1.8k+", color: "bg-blue-400/10 text-blue-500 border-blue-400/20" },
    { name: "React", count: "1.2k+", color: "bg-cyan-400/10 text-cyan-500 border-cyan-400/20" },
    { name: "TypeScript", count: "900+", color: "bg-blue-600/10 text-blue-600 border-blue-600/20" },
    { name: "Node.js", count: "850+", color: "bg-green-500/10 text-green-500 border-green-500/20" },
    { name: "Java", count: "1.5k+", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
    { name: "C++", count: "600+", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
    { name: "Go", count: "400+", color: "bg-cyan-300/10 text-cyan-300 border-cyan-300/20" }
];

const LanguagesSection = () => {
    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Popular Technologies</h2>
                    <Link href="/languages" className="hidden md:flex items-center text-sm font-bold text-indigo-500 hover:text-indigo-400 transition-colors">
                        View all ecosystems <ArrowUpRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {languages.map((lang) => (
                        <Link key={lang.name} href={`/languages?q=${lang.name.toLowerCase()}`} className="group p-6 bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-2xl hover:border-indigo-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 flex items-center justify-between">
                            <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-500 transition-colors">{lang.name}</span>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${lang.color}`}>
                                {lang.count}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/languages" className="inline-flex items-center text-sm font-bold text-indigo-500 hover:text-indigo-400 transition-colors">
                        View all ecosystems <ArrowUpRight size={16} className="ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LanguagesSection;
