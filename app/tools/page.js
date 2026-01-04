"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOOLS_REGISTRY, TOOLS_CATEGORIES } from '@/components/tools/ToolsRegistry';
import { Search, Sparkles, Zap } from 'lucide-react';

export default function ToolsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredTools = useMemo(() => {
        return TOOLS_REGISTRY.filter(tool => {
            const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    // Group tools by category for the 'All' view
    const groupedTools = useMemo(() => {
        if (activeCategory !== 'All') return { [activeCategory]: filteredTools };

        const groups = {};
        // Initialize groups order
        Object.values(TOOLS_CATEGORIES).forEach(cat => groups[cat] = []);

        filteredTools.forEach(tool => {
            if (groups[tool.category]) {
                groups[tool.category].push(tool);
            }
        });

        // Remove empty groups
        Object.keys(groups).forEach(key => {
            if (groups[key].length === 0) delete groups[key];
        });

        return groups;
    }, [filteredTools, activeCategory]);

    return (
        <div className="flex flex-col gap-10 pb-20">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] uppercase font-bold tracking-wider">
                    <Sparkles size={12} />
                    <span>Developer Utilities</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-accent-primary tracking-tight">
                    Tools for Builders
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4">
                    A collection of 70+ powerful tools to help you develop, debug, and ship faster. Open source and free forever.
                </p>
            </div>

            {/* Mobile Search (Desktop has Sidebar) */}
            <div className="lg:hidden">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search tools..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all placeholder:text-text-tertiary"
                    />
                </div>
            </div>

            {/* Content Grid */}
            <div className="space-y-12">
                {Object.entries(groupedTools).map(([category, tools]) => (
                    <div key={category} className="space-y-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                {category}
                                <span className="bg-surface-highlight text-text-tertiary text-[10px] px-1.5 py-0.5 rounded-md font-mono">{tools.length}</span>
                            </h2>
                            <div className="h-px bg-border flex-1"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {tools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={`/tools/${tool.id}`}
                                    className="group flex flex-col p-4 bg-surface border border-border rounded-xl hover:border-accent-primary/30 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-lg ${tool.bg} ${tool.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                            <tool.icon size={20} />
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
                                            <div className="p-2 text-text-tertiary hover:text-accent-primary">
                                                <Zap size={14} className="fill-current" />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-1 truncate pr-2">
                                        {tool.title}
                                    </h3>
                                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                                        {tool.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {Object.keys(groupedTools).length === 0 && (
                <div className="text-center py-20 bg-surface/30 border border-border dashed border-2 rounded-2xl">
                    <p className="text-text-secondary font-medium">No tools found matching your search.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                        className="mt-2 text-sm text-accent-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
