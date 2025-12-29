"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { LANGUAGES, CATEGORIES, getLanguagesByCategory } from '@/lib/languages';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LanguagesPage() {
    return (
        <LayoutWrapper>
            <div className="mb-12 md:mb-16 text-center">
                <h1 className="text-3xl md:text-5xl font-black mb-4">Technologies</h1>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    Browse our comprehensive collection of debugging guides and error solutions
                    for every major programming language and tool.
                </p>
            </div>

            <div className="space-y-16 pb-12">
                {CATEGORIES.map((category) => (
                    <section key={category}>
                        <div className="flex items-center space-x-4 mb-6 md:mb-8 px-2 md:px-0">
                            <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
                            <div className="h-px bg-border flex-1" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
                            {getLanguagesByCategory(category).map((lang) => (
                                <Link
                                    key={lang.slug}
                                    href={`/languages/${lang.slug}`}
                                    className="group p-6 bg-panel border border-border rounded-2xl hover:border-accent-blue/50 hover:shadow-2xl hover:shadow-accent-blue/5 transition-all flex items-center space-x-4 active:scale-95"
                                >
                                    <div className={`p-3 rounded-xl ${lang.bg} border border-transparent group-hover:border-white/10 transition-colors flex items-center justify-center`}>
                                        {lang.image ? (
                                            <div className="w-6 h-6 relative">
                                                <Image
                                                    src={lang.image}
                                                    alt={`${lang.name} logo`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <lang.icon size={24} className={`${lang.color} group-hover:scale-110 transition-transform`} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg truncate">{lang.name}</h3>
                                        <div className="flex items-center text-xs text-text-secondary mt-1 group-hover:text-accent-blue transition-colors">
                                            <span>View Solutions</span>
                                            <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </LayoutWrapper>
    );
}
