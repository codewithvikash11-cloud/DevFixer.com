"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import LayoutWrapper from '@/components/LayoutWrapper';
import { TOOLS_REGISTRY, TOOLS_CATEGORIES } from '@/components/tools/ToolsRegistry';
import ToolModal from '@/components/tools/ToolModal';
import { Search, Briefcase, Command } from 'lucide-react';
import ComingSoon from '@/components/tools/impl/ComingSoon';

// Dynamic Imports for Performance
const JsonFormatter = dynamic(() => import('@/components/tools/impl/JsonFormatter'), { loading: () => <p>Loading...</p> });
const Base64Converter = dynamic(() => import('@/components/tools/impl/Base64Converter'), { loading: () => <p>Loading...</p> });
const JwtDecoder = dynamic(() => import('@/components/tools/impl/JwtDecoder'), { loading: () => <p>Loading...</p> });
const UuidGenerator = dynamic(() => import('@/components/tools/impl/UuidGenerator'), { loading: () => <p>Loading...</p> });
const HashGenerator = dynamic(() => import('@/components/tools/impl/HashGenerator'), { loading: () => <p>Loading...</p> });
const ColorConverter = dynamic(() => import('@/components/tools/impl/ColorConverter'), { loading: () => <p>Loading...</p> });
const RegexTester = dynamic(() => import('@/components/tools/impl/RegexTester'), { loading: () => <p>Loading...</p> });
const CurlConverter = dynamic(() => import('@/components/tools/impl/CurlConverter'), { loading: () => <p>Loading...</p> });
const Minifier = dynamic(() => import('@/components/tools/impl/Minifier'), { loading: () => <p>Loading...</p> });
const MarkdownPreview = dynamic(() => import('@/components/tools/impl/MarkdownPreview'), { loading: () => <p>Loading...</p> });

// Newly Implemented Tools
const WordCounter = dynamic(() => import('@/components/tools/impl/WordCounter'), { loading: () => <p>Loading...</p> });
const CaseConverter = dynamic(() => import('@/components/tools/impl/CaseConverter'), { loading: () => <p>Loading...</p> });
const RemoveDuplicates = dynamic(() => import('@/components/tools/impl/RemoveDuplicates'), { loading: () => <p>Loading...</p> });
const PasswordGenerator = dynamic(() => import('@/components/tools/impl/PasswordGenerator'), { loading: () => <p>Loading...</p> });
const LoremIpsum = dynamic(() => import('@/components/tools/impl/LoremIpsum'), { loading: () => <p>Loading...</p> });
const UrlEncoder = dynamic(() => import('@/components/tools/impl/UrlEncoder'), { loading: () => <p>Loading...</p> });
const HtmlEntity = dynamic(() => import('@/components/tools/impl/HtmlEntity'), { loading: () => <p>Loading...</p> });


const COMPONENT_MAP = {
    'json-formatter': JsonFormatter,
    'base64': Base64Converter,
    'jwt-decoder': JwtDecoder,
    'uuid-generator': UuidGenerator,
    'hash-generator': HashGenerator,
    'color-converter': ColorConverter,
    'regex-tester': RegexTester,
    'curl-converter': CurlConverter,
    'code-beautifier': Minifier,
    'markdown-preview': MarkdownPreview,

    // New mappings
    'word-counter': WordCounter,
    'case-converter': CaseConverter,
    'remove-duplicates': RemoveDuplicates,
    'password-generator': PasswordGenerator,
    'lorem-ipsum': LoremIpsum,
    'url-encoder': UrlEncoder,
    'html-entity': HtmlEntity,
};

export default function ToolsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTool, setSelectedTool] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const ActiveComponent = selectedTool ? (COMPONENT_MAP[selectedTool.id] || ComingSoon) : null;

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
        // Initialize groups order based on Categories object to maintain sort order
        Object.values(TOOLS_CATEGORIES).forEach(cat => groups[cat] = []);

        filteredTools.forEach(tool => {
            if (!groups[tool.category]) groups[tool.category] = [];
            groups[tool.category].push(tool);
        });

        // Remove empty groups
        Object.keys(groups).forEach(key => {
            if (groups[key].length === 0) delete groups[key];
        });

        return groups;
    }, [filteredTools, activeCategory]);

    return (
        <LayoutWrapper>

            <div className="min-h-screen bg-background pb-20">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* Header Section */}
                    <div className="text-center mb-10 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] md:text-xs font-bold mb-4 md:mb-6">
                            <Briefcase size={12} />
                            <span>Developer Utilities Hub</span>
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
                            The <span className="text-accent-primary">Swiss Army Knife</span> <br className="hidden md:block" /> for Developers.
                        </h1>
                        <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg leading-relaxed px-4">
                            30+ powerful tools to format, convert, generate, and debug. <br className="hidden md:block" />
                            Everything you need, right in your browser.
                        </p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="sticky top-16 md:top-20 z-40 bg-background/80 backdrop-blur-xl py-3 md:py-4 mb-6 md:mb-8 border-b border-white/5 -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative w-full md:max-w-md group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Search size={18} className="text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search tools..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-surface border border-border text-text-primary text-sm rounded-xl pl-12 pr-4 py-3 outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-text-tertiary shadow-sm"
                                />
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none hidden md:flex">
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-panel text-[10px] text-text-secondary font-mono">
                                        <Command size={10} /> K
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide mask-fade-right">
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className={`px-3 py-2 md:px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === 'All' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-surface text-text-secondary hover:bg-surface-highlight hover:text-text-primary border border-border'}`}
                                >
                                    All Tools
                                </button>
                                {Object.values(TOOLS_CATEGORIES).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3 py-2 md:px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === cat ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-surface text-text-secondary hover:bg-surface-highlight hover:text-text-primary border border-border'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="space-y-12 md:space-y-16 pb-20">
                        {Object.entries(groupedTools).map(([category, tools], groupIndex) => (
                            <div key={category} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${groupIndex * 100}ms` }}>
                                <div className="flex items-center gap-4 mb-4 md:mb-6 sticky top-[135px] md:static z-30 py-2 bg-background/95 md:bg-transparent backdrop-blur md:backdrop-filter-none">
                                    <h2 className="text-lg md:text-xl font-bold text-text-primary tracking-tight flex-shrink-0">{category}</h2>
                                    <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                    {tools.map((tool) => (
                                        <button
                                            key={tool.id}
                                            onClick={() => setSelectedTool(tool)}
                                            className="group relative flex flex-row sm:flex-col items-center sm:items-start text-left bg-surface hover:bg-surface-highlight border border-border hover:border-accent-primary/30 rounded-xl md:rounded-2xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-primary/10"
                                        >
                                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mr-4 sm:mr-0 sm:mb-4 transition-transform group-hover:scale-110 duration-300 flex-shrink-0`}>
                                                <tool.icon size={20} className="md:w-6 md:h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm md:text-base font-bold text-text-primary group-hover:text-accent-primary mb-0.5 md:mb-1 transition-colors truncate">{tool.title}</h3>
                                                <p className="text-[10px] md:text-xs text-text-secondary group-hover:text-text-secondary line-clamp-2 leading-relaxed">
                                                    {tool.description}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {Object.keys(groupedTools).length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-text-secondary text-lg">No tools found matching your search.</p>
                                <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} className="mt-4 text-accent-primary hover:text-accent-hover underline font-medium">
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Modal */}
            <ToolModal
                isOpen={!!selectedTool}
                onClose={() => setSelectedTool(null)}
                tool={selectedTool}
            >
                {ActiveComponent && <ActiveComponent />}
            </ToolModal>
        </LayoutWrapper>
    );
}
