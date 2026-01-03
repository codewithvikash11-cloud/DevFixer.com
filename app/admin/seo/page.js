"use client";

import React, { useState } from 'react';
import { Search, Globe, Save } from 'lucide-react';

export default function SeoManager() {
    // Mock SEO Config
    const [globalSeo, setGlobalSeo] = useState({
        siteTitle: 'DevFixer | Ultimate Developer Ecosystem',
        description: 'Fix errors, build projects, test APIs, and master new skills.',
        ogImage: 'https://devfixer.com/og.png',
        twitterHandle: '@devfixer'
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">SEO Manager</h1>
                <p className="text-gray-500 text-sm">Optimize search engine visibility and social preview cards.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <Globe size={18} /> Global Metadata
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Detailed Site Title</label>
                                <input
                                    className="w-full bg-[#111] border border-[#222] rounded-xl p-3 text-white focus:border-accent-primary outline-none"
                                    value={globalSeo.siteTitle}
                                    onChange={e => setGlobalSeo({ ...globalSeo, siteTitle: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Meta Description</label>
                                <textarea
                                    className="w-full bg-[#111] border border-[#222] rounded-xl p-3 text-white focus:border-accent-primary outline-none min-h-[100px]"
                                    value={globalSeo.description}
                                    onChange={e => setGlobalSeo({ ...globalSeo, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-mono text-gray-500 uppercase block mb-1">OpenGraph Image URL</label>
                                <input
                                    className="w-full bg-[#111] border border-[#222] rounded-xl p-3 text-white focus:border-accent-primary outline-none"
                                    value={globalSeo.ogImage}
                                    onChange={e => setGlobalSeo({ ...globalSeo, ogImage: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-black font-bold rounded-xl hover:opacity-90 transition-opacity">
                                <Save size={18} /> Save SEO Config
                            </button>
                        </div>
                    </section>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Search Preview</h3>
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                        <div className="text-[#1a0dab] text-xl font-medium truncate hover:underline cursor-pointer">
                            {globalSeo.siteTitle}
                        </div>
                        <div className="text-[#006621] text-sm truncate">
                            https://devfixer.com
                        </div>
                        <div className="text-[#545454] text-sm mt-1 line-clamp-2">
                            {globalSeo.description}
                        </div>
                    </div>

                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mt-6">Social Share</h3>
                    <div className="bg-[#0A0A0A] border border-[#222] rounded-xl overflow-hidden">
                        <div className="h-40 bg-[#111] flex items-center justify-center text-gray-600 font-mono text-xs border-b border-[#222]">
                            [ OG IMAGE PREVIEW ]
                        </div>
                        <div className="p-4">
                            <div className="text-gray-400 text-xs uppercase font-bold mb-1">devfixer.com</div>
                            <div className="text-white font-bold truncate mb-1">{globalSeo.siteTitle}</div>
                            <div className="text-gray-500 text-xs line-clamp-2">{globalSeo.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
