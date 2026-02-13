
'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, Shield, Link as LinkIcon, Copy, RotateCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '@/components/CodeBlock'; // Assuming this exists based on file list

export default function SolutionView({ solution, onRegenerate }) {
    if (!solution) return null;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {solution.title}
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                    {solution.summary}
                </p>
            </div>

            <div className="grid gap-6">
                {/* Root Cause */}
                <div className="p-6 rounded-xl bg-surface border border-border hover:border-red-500/30 transition-colors">
                    <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-red-500">
                        <AlertTriangle className="w-5 h-5" />
                        Why It Happens
                    </h3>
                    <div className="prose prose-invert max-w-none text-text-secondary">
                        <ReactMarkdown>{solution.rootCause}</ReactMarkdown>
                    </div>
                </div>

                {/* The Fix */}
                <div className="p-6 rounded-xl bg-surface border border-border ring-1 ring-green-500/20">
                    <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-green-500">
                        <CheckCircle className="w-5 h-5" />
                        How To Fix It
                    </h3>
                    <div className="prose prose-invert max-w-none text-text-secondary">
                        {/* We use a custom renderer or just Markdown. 
                             If solution.fix contains code blocks, ReactMarkdown handles them. 
                             Ideally we map code blocks to our CodeBlock component. */}
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <div className="not-prose my-4">
                                            <CodeBlock
                                                code={String(children).replace(/\n$/, '')}
                                                language={match[1]}
                                            />
                                        </div>
                                    ) : (
                                        <code className={`${className} bg-surface-hover px-1 py-0.5 rounded text-sm`} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {solution.fix}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Prevention */}
                <div className="p-6 rounded-xl bg-surface border border-border hover:border-blue-500/30 transition-colors">
                    <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-blue-400">
                        <Shield className="w-5 h-5" />
                        Prevention Tips
                    </h3>
                    <div className="prose prose-invert max-w-none text-text-secondary">
                        <ReactMarkdown>{solution.prevention}</ReactMarkdown>
                    </div>
                </div>

                {/* Related Errors */}
                {solution.related && solution.related.length > 0 && (
                    <div className="pt-6 border-t border-border">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
                            Related Errors
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {solution.related.map((item, i) => (
                                <span key={i} className="px-3 py-1 text-sm rounded-full bg-surface-hover border border-border text-text-secondary flex items-center gap-2">
                                    <LinkIcon className="w-3 h-3" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-center pt-8">
                <button
                    onClick={onRegenerate}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-surface border border-border hover:bg-surface-hover text-text-secondary transition-colors"
                >
                    <RotateCw className="w-4 h-4" />
                    Fix Another Error
                </button>
            </div>
        </div>
    );
}
