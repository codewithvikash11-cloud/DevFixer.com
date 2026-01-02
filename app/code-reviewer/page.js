"use client";

import React, { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { ShieldCheck, Sparkles, Zap, Bug, Check, Loader2 } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function CodeReviewerPage() {
    const [code, setCode] = useState('');
    const [isReviewing, setIsReviewing] = useState(false);
    const [review, setReview] = useState(null);

    const startReview = () => {
        if (!code.trim()) return;
        setIsReviewing(true);
        setReview(null);

        // Simulated Analysis
        setTimeout(() => {
            setReview({
                score: 85,
                issues: [
                    { type: 'Security', message: 'Avoid using dangerouslySetInnerHTML to prevent XSS attacks.', severity: 'high' },
                    { type: 'Performance', message: 'useMemo could optimize the heavy calculation on line 12.', severity: 'medium' },
                    { type: 'Style', message: 'Consistent indentation required (2 vs 4 spaces).', severity: 'low' }
                ],
                refactor: `// Refactored Version
import React, { useMemo } from 'react';
import { sanitize } from 'dompurify'; // Added sanitization

export const SecureComponent = ({ data }) => {
    // Optimized calculation
    const processedData = useMemo(() => heavyProcess(data), [data]);

    return (
        <div 
            dangerouslySetInnerHTML={{ __html: sanitize(processedData) }} 
        />
    );
};`
            });
            setIsReviewing(false);
        }, 2500);
    };

    return (
        <LayoutWrapper>
            <div className="min-h-screen bg-black pb-20 pt-24">
                <div className="container mx-auto px-4 max-w-6xl">

                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-6">
                            <ShieldCheck size={12} />
                            <span>Automated Code Audit</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            AI Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Reviewer</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Check your code for security vulnerabilities, performance bottlenecks, and dirty code practices before you push.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
                        {/* Editor Side */}
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-bold text-gray-400">Source Code</label>
                                <button
                                    onClick={startReview}
                                    disabled={isReviewing || !code.trim()}
                                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
                                >
                                    {isReviewing && <Loader2 size={14} className="animate-spin" />}
                                    {isReviewing ? 'Auditing...' : 'Run Review'}
                                </button>
                            </div>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="// Paste your component or function here..."
                                className="flex-1 bg-[#0f172a] border border-[#334155] rounded-2xl p-6 font-mono text-sm text-gray-300 outline-none focus:border-green-500/50 resize-none transition-all placeholder:text-gray-600 leading-relaxed"
                            ></textarea>
                        </div>

                        {/* Analysis Side */}
                        <div className="flex flex-col h-full relative">
                            {!review && !isReviewing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 border-2 border-dashed border-[#334155] rounded-2xl bg-[#0f172a]/30">
                                    <ShieldCheck size={48} className="mb-4 opacity-20" />
                                    <p className="text-sm">Ready to audit.</p>
                                </div>
                            )}

                            {isReviewing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f172a] border border-[#334155] rounded-2xl z-10 glass">
                                    <Loader2 size={48} className="text-green-500 animate-spin mb-4" />
                                    <h3 className="text-lg font-bold text-white">Analyzing AST...</h3>
                                    <p className="text-xs text-gray-500 mt-2">Connecting to Security Database...</p>
                                </div>
                            )}

                            {review && (
                                <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500">
                                    {/* Score Card */}
                                    <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Quality Score</h3>
                                            <p className="text-xs text-gray-500">Based on standard linting rules</p>
                                        </div>
                                        <div className="relative w-16 h-16 flex items-center justify-center">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                                <circle cx="32" cy="32" r="28" stroke="#334155" strokeWidth="4" fill="transparent" />
                                                <circle cx="32" cy="32" r="28" stroke="#22c55e" strokeWidth="4" fill="transparent" strokeDasharray="175.929" strokeDashoffset={175.929 - (175.929 * review.score) / 100} strokeLinecap="round" />
                                            </svg>
                                            <span className="text-lg font-black text-white">{review.score}</span>
                                        </div>
                                    </div>

                                    {/* Issues List */}
                                    <div className="flex-1 bg-[#1e293b] border border-[#334155] rounded-2xl p-6 overflow-y-auto">
                                        <h4 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2"><Bug size={16} /> Detected Issues</h4>
                                        <div className="space-y-3">
                                            {review.issues.map((issue, i) => (
                                                <div key={i} className={`p-3 rounded-lg border text-xs font-medium ${issue.severity === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-300' :
                                                        issue.severity === 'medium' ? 'bg-orange-500/10 border-orange-500/20 text-orange-300' :
                                                            'bg-blue-500/10 border-blue-500/20 text-blue-300'
                                                    }`}>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-bold">{issue.type}</span>
                                                        <span className="uppercase text-[8px] opacity-70">{issue.severity}</span>
                                                    </div>
                                                    {issue.message}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Refactor Preview */}
                                    <div className="flex-1 min-h-0 bg-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden flex flex-col">
                                        <div className="px-4 py-2 bg-[#0f172a] border-b border-[#334155] text-xs font-bold text-green-400 flex items-center gap-2">
                                            <Sparkles size={12} /> Suggested Refactor
                                        </div>
                                        <div className="flex-1 overflow-auto bg-[#0f172a] p-0 text-xs">
                                            <CodeBlock code={review.refactor} language="javascript" showLineNumbers={false} />
                                        </div>
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
