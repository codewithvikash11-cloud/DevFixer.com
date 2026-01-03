"use client";

import React, { useEffect, useState } from 'react';
import { getAllPages, createPage } from '@/lib/actions/pages';
import { Plus, Layout, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PagesManager() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setLoading(true);
        const data = await getAllPages();
        setPages(data);
        setLoading(false);
    };

    const handleCreate = async () => {
        const title = prompt("Enter page title:");
        if (!title) return;
        const slug = title.toLowerCase().replace(/ /g, '-');

        const res = await createPage({ title, slug });
        if (res.success) load();
        else alert("Failed: " + res.error);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Pages & Layout</h1>
                    <p className="text-gray-500 text-sm">Visually edit site structure and SEO.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20"
                >
                    <Plus size={18} /> Add New Page
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Seed Default Pages Card */}
                {pages.length === 0 && !loading && (
                    <div onClick={handleCreate} className="border border-[#222] border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-gray-500 cursor-pointer transition-all">
                        <Plus size={32} className="mb-4" />
                        <span className="font-bold">Initialize System Pages</span>
                    </div>
                )}

                {pages.map(page => (
                    <div key={page.$id} className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6 group hover:border-[#444] transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-white transition-colors">
                                <Layout size={24} />
                            </div>
                            <div className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${page.isPublished ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                {page.isPublished ? 'Published' : 'Draft'}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{page.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
                            <Globe size={12} />
                            <span>/{page.slug}</span>
                        </div>

                        <Link
                            href={`/admin/pages/${page.$id}`}
                            className="flex items-center justify-between w-full p-3 bg-[#111] rounded-xl text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <span>Open Visual Editor</span>
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
