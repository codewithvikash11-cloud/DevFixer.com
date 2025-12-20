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
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Error Analyze Tool</h1>
                <p className="text-text-secondary max-w-2xl text-lg leading-relaxed">
                    Paste your stack traces, console logs, or buggy code snippets below. Our compiler-grade
                    analysis engine will identify the root cause instantly.
                </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 mb-12">
                {/* Input area */}
                <div className="flex flex-col h-[500px] md:h-[600px] group">
                    <div className="flex items-center justify-between px-6 py-3 bg-panel border border-border border-b-0 rounded-t-2xl group-focus-within:border-accent-blue/50 transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className="flex space-x-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <span className="text-xs font-mono text-text-secondary font-semibold">input.terminal</span>
                        </div>
                        <button
                            onClick={handleClear}
                            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-text-secondary hover:text-red-400 active:scale-95"
                            title="Clear all"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="// Paste your error message here..."
                        className="flex-1 w-full bg-background/50 border border-border p-6 font-mono text-sm focus:outline-none focus:border-accent-blue/50 transition-all resize-none rounded-b-2xl group-focus-within:shadow-[0_0_30px_rgba(37,99,235,0.05)] border-opacity-60"
                        spellCheck="false"
                    />
                    <div className="mt-6">
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !content.trim()}
                            className="w-full bg-accent-blue hover:bg-accent-blue/90 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-accent-blue/10 active:scale-[0.98]"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Compiling Analysis...</span>
                                </>
                            ) : (
                                <>
                                    <Play size={20} className="fill-current" />
                                    <span>Run Diagnostic</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Output area */}
                <div className="flex flex-col h-[500px] md:h-[600px] mt-8 lg:mt-0">
                    <div className="h-full bg-panel/50 backdrop-blur-sm border border-border rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/20">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Zap size={18} className="text-accent-yellow fill-accent-yellow/20" />
                                <h2 className="font-bold text-sm uppercase tracking-wider">Analysis Engine v1.0</h2>
                            </div>
                            {result && (
                                <span className="text-[10px] font-mono bg-accent-green/10 text-accent-green px-2 py-0.5 rounded-full border border-accent-green/20">Success</span>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {!result && !isAnalyzing && (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-text-secondary mb-6 mb-4 animate-pulse">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">System Idle</h3>
                                    <p className="text-sm text-text-secondary max-w-[240px] leading-relaxed">
                                        Input your code or error logs in the terminal to begin debugging process.
                                    </p>
                                </div>
                            )}

                            {isAnalyzing && (
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-white/5 rounded-full animate-pulse" />
                                        <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
                                        <div className="h-3 bg-white/5 rounded animate-pulse w-[95%]" />
                                        <div className="h-3 bg-white/5 rounded animate-pulse w-[80%]" />
                                    </div>
                                    <div className="h-48 bg-white/5 rounded-xl animate-pulse" />
                                </div>
                            )}

                            {result && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                                    <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
                                        <div className="flex items-center space-x-2 text-red-400 text-xs font-mono mb-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            <span>CRITICAL_ERROR_DETECTED</span>
                                        </div>
                                        <p className="font-mono text-base md:text-lg font-bold text-text-primary break-words">
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
