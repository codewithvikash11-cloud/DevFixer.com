"use client";

import React, { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Terminal, Trash2, Zap, Play, Search, Code, ArrowRight } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function EditorPage() {
    const [content, setContent] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = () => {
        if (!content.trim()) return;

        setIsAnalyzing(true);
        setResult(null);
        // Simulate analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                error: "TypeError: Cannot read property 'id' of undefined",
                explanation: "You are attempting to access 'id' on an object that is presently 'undefined'. This often happens when fetching data asynchronously or when a function expected an object but received nothing.",
                fix: "Check if the object exists before accessing its properties using optional chaining: object?.id",
                code: "// Use Optional Chaining\nconst id = userData?.user?.id;\n\n// Or verify existence\nif (userData && userData.user) {\n  const id = userData.user.id;\n}"
            });
        }, 1500);
    };

    const handleClear = () => {
        setContent('');
        setResult(null);
    };

    return (
        <LayoutWrapper>
            <div className="mb-8 md:mb-12">
                <div className="flex items-center space-x-2 text-accent-blue font-mono text-sm mb-2">
                    <Code size={16} />
                    <span className="uppercase tracking-widest">Workspace</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-4">Error Analyze Tool</h1>
                <p className="text-text-secondary max-w-2xl text-base md:text-lg leading-relaxed">
                    Paste your stack traces, console logs, or buggy code snippets below. Our compiler-grade
                    analysis engine will identify the root cause instantly.
                </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 px-2 md:px-0">
                {/* Input area */}
                <div className="flex flex-col h-[500px] md:h-[600px] group">
                    <div className="flex-1 min-h-[400px] md:min-h-0 bg-[#1E1E1E] flex flex-col group/editor transition-all duration-500 overflow-hidden rounded-3xl border border-border">
                        <div className="flex items-center justify-between px-5 py-4 bg-[#2D2D2D]/50 border-b border-white/5">
                            <div className="flex items-center space-x-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                                <span className="ml-3 text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">input.terminal</span>
                            </div>
                            <button
                                onClick={handleClear}
                                className="p-2 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all active:scale-90"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <div className="flex-1 relative font-mono text-sm md:text-base selection:bg-accent-blue/40">
                            <div className="absolute left-0 top-0 bottom-0 w-10 md:w-12 bg-[#1E1E1E] border-r border-white/5 flex flex-col items-center py-4 text-white/10 select-none z-10 text-[10px] md:text-xs">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <div key={i} className="leading-relaxed md:leading-6 h-6">{i + 1}</div>
                                ))}
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="// Paste your error message or stack trace here..."
                                className="w-full h-full bg-transparent text-[#9CDCFE] p-4 pl-14 md:pl-16 focus:outline-none resize-none leading-relaxed md:leading-6 placeholder:text-white/10 min-h-[400px]"
                                spellCheck="false"
                            />
                            {content.trim() && (
                                <div className="absolute bottom-4 right-4 animate-in fade-in zoom-in duration-300">
                                    <div className="px-3 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded-lg text-[9px] text-accent-blue font-black tracking-widest uppercase backdrop-blur-md">
                                        UTF-8 • CRLF
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 md:mt-6">
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !content.trim()}
                            className="w-full bg-accent-blue hover:bg-accent-blue/90 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black py-4 md:py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-accent-blue/10 active:scale-[0.98] uppercase tracking-widest text-xs"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-4 h-4 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Compiling Analysis...</span>
                                </>
                            ) : (
                                <>
                                    <Play size={18} className="fill-current" />
                                    <span>Run Diagnostic</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Output area */}
                <div className="flex flex-col h-[500px] md:h-[600px] mt-4 lg:mt-0">
                    <div className="h-full bg-panel/30 backdrop-blur-md border border-border rounded-3xl flex flex-col overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-panel/20">
                            <div className="flex items-center space-x-3">
                                <Zap size={16} className="text-accent-yellow fill-accent-yellow/20" />
                                <h2 className="font-black text-[10px] uppercase tracking-[0.2em] text-text-secondary">Analysis Engine v1.0</h2>
                            </div>
                            {result && (
                                <span className="text-[9px] font-black bg-accent-green/10 text-accent-green px-3 py-1 rounded-full border border-accent-green/20 tracking-widest uppercase">Success</span>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-10">
                            {!result && !isAnalyzing && (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-text-secondary mb-6 group-hover:scale-110 transition-transform">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="font-black text-xl mb-3 tracking-tight">System Idle</h3>
                                    <p className="text-sm text-text-secondary max-w-[280px] leading-relaxed font-medium">
                                        Input your code or error logs in the terminal to begin the debugging process.
                                    </p>
                                </div>
                            )}

                            {isAnalyzing && (
                                <div className="space-y-8 animate-pulse">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl" />
                                        <div className="h-4 bg-white/5 rounded-full w-3/4" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-3 bg-white/5 rounded-full w-full" />
                                        <div className="h-3 bg-white/5 rounded-full w-[95%]" />
                                        <div className="h-3 bg-white/5 rounded-full w-[80%]" />
                                    </div>
                                    <div className="h-48 bg-white/5 rounded-3xl" />
                                </div>
                            )}

                            {result && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                                    <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
                                        <div className="flex items-center space-x-2 text-red-400 text-[10px] font-black mb-4 uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            <span>CRITICAL_ERROR_DETECTED</span>
                                        </div>
                                        <p className="font-mono text-base md:text-lg font-bold text-text-primary break-words leading-relaxed overflow-hidden">
                                            {result.error}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-accent-blue font-mono text-xs mb-3 uppercase tracking-[0.2em] font-bold">Explanation</h3>
                                        <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                                            {result.explanation}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <div className="w-6 h-6 rounded-lg bg-accent-green/10 flex items-center justify-center text-accent-green">
                                                <Zap size={14} className="fill-current" />
                                            </div>
                                            <h3 className="text-accent-green font-mono text-xs uppercase tracking-[0.2em] font-bold">Recommended Patch</h3>
                                        </div>
                                        <p className="text-text-primary leading-relaxed text-sm md:text-base mb-6 font-medium">
                                            {result.fix}
                                        </p>
                                        <CodeBlock code={result.code} language="javascript" fileName="hotfix_01.js" />
                                    </div>

                                    <div className="pt-6 border-t border-border flex justify-between items-center">
                                        <span className="text-[10px] text-text-secondary font-mono italic">Analysis complete in 0.24ms</span>
                                        <button className="text-xs text-accent-blue hover:underline font-bold flex items-center space-x-1 transition-all">
                                            <span>Copy full report</span>
                                            <ArrowRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
