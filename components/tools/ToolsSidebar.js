"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ChevronDown, ChevronRight, Hash } from 'lucide-react';
import { TOOLS_REGISTRY, TOOLS_CATEGORIES } from './ToolsRegistry';
import { cn } from '@/lib/utils';

export default function ToolsSidebar({ onItemClick }) {
    const pathname = usePathname();
    const [search, setSearch] = useState('');
    const [openCategories, setOpenCategories] = useState(Object.values(TOOLS_CATEGORIES));

    // Filter tools based on search
    const filteredTools = useMemo(() => {
        if (!search) return TOOLS_REGISTRY;
        return TOOLS_REGISTRY.filter(tool =>
            tool.title.toLowerCase().includes(search.toLowerCase()) ||
            tool.category.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    // Group filtered tools
    const groupedTools = useMemo(() => {
        const groups = {};
        // Initialize with predefined order
        Object.values(TOOLS_CATEGORIES).forEach(cat => groups[cat] = []);

        filteredTools.forEach(tool => {
            if (groups[tool.category]) {
                groups[tool.category].push(tool);
            }
        });
        return groups;
    }, [filteredTools]);

    const toggleCategory = (cat) => {
        setOpenCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="p-4 space-y-6">
            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" size={16} />
                <input
                    type="text"
                    placeholder="Find a tool..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all placeholder:text-text-tertiary"
                />
            </div>

            {/* Categories */}
            <div className="space-y-1">
                {Object.values(TOOLS_CATEGORIES).map(category => {
                    const tools = groupedTools[category];
                    if (!tools?.length) return null;

                    const isOpen = openCategories.includes(category) || search.length > 0;

                    return (
                        <div key={category} className="pb-2">
                            <button
                                onClick={() => toggleCategory(category)}
                                className="flex items-center gap-2 w-full text-left px-2 py-2 text-[11px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors group"
                            >
                                <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                                    {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                </span>
                                {category}
                                <span className="ml-auto bg-surface-highlight text-text-tertiary px-1.5 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                                    {tools.length}
                                </span>
                            </button>

                            {isOpen && (
                                <div className="space-y-0.5 relative ml-2 pl-2 border-l border-border/50">
                                    {tools.map(tool => {
                                        const isActive = pathname === `/tools/${tool.id}`;
                                        return (
                                            <Link
                                                key={tool.id}
                                                href={`/tools/${tool.id}`}
                                                onClick={onItemClick}
                                                className={cn(
                                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative overflow-hidden",
                                                    isActive
                                                        ? "bg-accent-primary/10 text-accent-primary font-medium"
                                                        : "text-text-secondary hover:text-text-primary hover:bg-surface/80"
                                                )}
                                            >
                                                {isActive && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent-primary rounded-r-full" />
                                                )}
                                                <tool.icon size={16} className={cn("flex-shrink-0 transition-colors", isActive ? "text-accent-primary" : "text-text-tertiary group-hover:text-text-secondary")} />
                                                <span className="truncate">{tool.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

                {Object.values(groupedTools).every(g => g.length === 0) && (
                    <div className="text-center py-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-border mb-3">
                            <Hash size={20} className="text-text-tertiary" />
                        </div>
                        <p className="text-sm text-text-secondary font-medium">No tools found</p>
                        <p className="text-xs text-text-tertiary mt-1">Try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    );
}
