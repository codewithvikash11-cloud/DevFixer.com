"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Layout,
    Edit,
    Globe,
    CheckCircle,
    AlertCircle,
    ArrowUpRight
} from 'lucide-react';
import { getPostBySlug } from '@/lib/posts';

// Defined system pages that we want to be editable
const SYSTEM_PAGES = [
    { id: 'home', title: 'Home Page', path: '/', description: 'Hero section, features, and trust bar.' },
    { id: 'tools', title: 'Tools Hub', path: '/tools', description: 'Header text and SEO settings.' },
    { id: 'compiler', title: 'Online Compiler', path: '/compiler', description: 'Editor defaults and layouts.' },
    { id: 'api-tester', title: 'API Tester', path: '/api-tester', description: 'Initial state and proxy settings.' },
    { id: 'pricing', title: 'Pricing Page', path: '/pricing', description: 'Plans, prices, and features table.' },
    { id: 'about', title: 'About / Learn', path: '/learn', description: 'Platform mission and content.' },
];

export default function PagesManager() {
    // We'll fetch status to see if a custom config exists for each page
    const [pageStatuses, setPageStatuses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkPageStatuses();
    }, []);

    const checkPageStatuses = async () => {
        const statuses = {};
        await Promise.all(SYSTEM_PAGES.map(async (page) => {
            try {
                // standardized slug format: page-[id]
                const data = await getPostBySlug(`page-${page.id}`);
                statuses[page.id] = !!data;
            } catch (e) {
                statuses[page.id] = false;
            }
        }));
        setPageStatuses(statuses);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight">Pages Manager</h1>
                    <p className="text-text-secondary">Edit content, SEO, and layouts for core system pages.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SYSTEM_PAGES.map((page) => {
                    const isCustomized = pageStatuses[page.id];

                    return (
                        <div key={page.id} className="bg-panel border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group relative">
                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4">
                                {loading ? (
                                    <div className="w-2 h-2 rounded-full bg-text-tertiary animate-pulse"></div>
                                ) : isCustomized ? (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-wider border border-green-500/20">
                                        <CheckCircle size={10} /> Customized
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface text-text-tertiary text-[10px] font-black uppercase tracking-wider border border-border">
                                        <Globe size={10} /> Default
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Layout size={24} />
                                </div>

                                <h3 className="text-xl font-bold text-text-primary mb-1">{page.title}</h3>
                                <p className="text-sm text-text-secondary mb-6 h-10">{page.description}</p>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/pages/${page.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-text-primary text-background rounded-xl font-bold hover:opacity-90 transition-opacity"
                                    >
                                        <Edit size={16} />
                                        Edit Content
                                    </Link>
                                    <Link
                                        href={page.path}
                                        target="_blank"
                                        className="p-2.5 bg-surface border border-border rounded-xl text-text-secondary hover:text-text-primary hover:border-accent-primary/30 transition-colors"
                                        title="View Live Page"
                                    >
                                        <ArrowUpRight size={18} />
                                    </Link>
                                </div>
                            </div>

                            {/* Decorative gradient */}
                            <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
