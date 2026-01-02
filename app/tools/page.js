"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CodeOrbitFooter from '@/components/compiler/CodeOrbitFooter';
import { TOOLS_REGISTRY, TOOLS_CATEGORIES } from '@/components/tools/ToolsRegistry';
import ToolModal from '@/components/tools/ToolModal';
import { Sparkles, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic imports for tool implementations to keep bundle size small
const JsonFormatter = dynamic(() => import('@/components/tools/impl/JsonFormatter'), { loading: () => <ToolLoader /> });
const Base64Converter = dynamic(() => import('@/components/tools/impl/Base64Converter'), { loading: () => <ToolLoader /> });
const JwtDecoder = dynamic(() => import('@/components/tools/impl/JwtDecoder'), { loading: () => <ToolLoader /> });
const UuidGenerator = dynamic(() => import('@/components/tools/impl/UuidGenerator'), { loading: () => <ToolLoader /> });
const HashGenerator = dynamic(() => import('@/components/tools/impl/HashGenerator'), { loading: () => <ToolLoader /> });
const ColorConverter = dynamic(() => import('@/components/tools/impl/ColorConverter'), { loading: () => <ToolLoader /> });
const RegexTester = dynamic(() => import('@/components/tools/impl/RegexTester'), { loading: () => <ToolLoader /> });
const CurlConverter = dynamic(() => import('@/components/tools/impl/CurlConverter'), { loading: () => <ToolLoader /> });
const Minifier = dynamic(() => import('@/components/tools/impl/Minifier'), { loading: () => <ToolLoader /> });
const MarkdownPreview = dynamic(() => import('@/components/tools/impl/MarkdownPreview'), { loading: () => <ToolLoader /> });

const ToolLoader = () => <div className="flex items-center justify-center p-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

export default function ToolsPage() {
    const [selectedToolId, setSelectedToolId] = useState(null);

    const activeTool = TOOLS_REGISTRY.find(t => t.id === selectedToolId);

    const renderToolComponent = () => {
        switch (selectedToolId) {
            case 'json-formatter': return <JsonFormatter />;
            case 'base64': return <Base64Converter />;
            case 'jwt-decoder': return <JwtDecoder />;
            case 'uuid-generator': return <UuidGenerator />;
            case 'hash-generator': return <HashGenerator />;
            case 'color-converter': return <ColorConverter />;
            case 'regex-tester': return <RegexTester />;
            case 'curl-converter': return <CurlConverter />;
            case 'minifier': return <Minifier />;
            case 'markdown-preview': return <MarkdownPreview />;
            default: return null;
        }
    };

    // Group tools by category
    const groupedTools = Object.values(TOOLS_CATEGORIES).reduce((acc, category) => {
        acc[category] = TOOLS_REGISTRY.filter(tool => tool.category === category);
        return acc;
    }, {});

    return (
        <div className="flex flex-col min-h-screen bg-black font-sans text-white">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-24 md:py-32">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold mb-6">
                        <Sparkles size={12} />
                        <span>Developer Utilities</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
                        Essential <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Tools</span>
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        A curated collection of offline-capable developer utilities. No backend calls, purely client-side for maximum speed and privacy.
                    </p>
                </div>

                {/* Tool Grid by Category */}
                <div className="space-y-16">
                    {Object.entries(groupedTools).map(([category, tools]) => (
                        tools.length > 0 && (
                            <section key={category} className="animate-in fade-in duration-700">
                                <h3 className="text-xl font-bold text-gray-200 mb-6 pl-2 border-l-4 border-violet-500">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tools.map((tool) => {
                                        const Icon = tool.icon;
                                        return (
                                            <button
                                                key={tool.id}
                                                onClick={() => setSelectedToolId(tool.id)}
                                                className="group relative flex flex-col items-start p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] hover:border-violet-500/50 hover:bg-[#1e293b] transition-all duration-300 text-left overflow-hidden"
                                            >
                                                <div className={`
                                                    p-3 rounded-xl mb-4 transition-colors duration-300
                                                    bg-[#1e293b] border border-[#334155] group-hover:bg-[#0f172a]
                                                    ${tool.color}
                                                `}>
                                                    <Icon size={24} />
                                                </div>

                                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                                                    {tool.title}
                                                </h4>
                                                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                                    {tool.description}
                                                </p>

                                                <div className="mt-auto flex items-center text-xs font-bold text-gray-500 group-hover:text-white transition-colors">
                                                    Use Tool <ArrowRight size={14} className="ml-1 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    ))}
                </div>
            </main>

            <CodeOrbitFooter />

            {/* Tool Modal */}
            <ToolModal
                isOpen={!!selectedToolId}
                onClose={() => setSelectedToolId(null)}
                tool={activeTool}
            >
                {renderToolComponent()}
            </ToolModal>
        </div>
    );
}
