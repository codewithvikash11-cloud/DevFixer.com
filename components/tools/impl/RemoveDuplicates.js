"use client";

import React, { useState } from 'react';
import { Copy, Check, Filter, ArrowRight } from 'lucide-react';

export default function RemoveDuplicates() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
    const [copied, setCopied] = useState(false);

    const processText = () => {
        if (!input.trim()) return;

        const lines = input.split('\n');
        const uniqueLines = [...new Set(lines.map(line => line.trim()).filter(line => line !== ''))];

        setStats({
            original: lines.length,
            unique: uniqueLines.length,
            removed: lines.length - uniqueLines.length
        });

        setOutput(uniqueLines.join('\n'));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Original List</span>
                    {stats.original > 0 && <span className="text-xs bg-surface border border-border px-2 py-1 rounded text-text-tertiary">{stats.original} lines</span>}
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste your list here (one item per line)..."
                    className="w-full h-96 bg-surface border border-border rounded-xl p-6 font-mono text-sm text-text-primary outline-none focus:border-accent-primary/50 resize-none transition-all placeholder:text-text-tertiary"
                ></textarea>
                <button
                    onClick={processText}
                    disabled={!input.trim()}
                    className="w-full py-3 bg-accent-primary hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Filter size={18} />
                    Remove Duplicates
                    <ArrowRight size={18} />
                </button>
            </div>

            {/* Output */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Unique Items</span>
                    {stats.unique > 0 && <span className="text-xs bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded font-bold">{stats.removed} Removed</span>}
                </div>
                <div className="relative group flex-1">
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Cleaned list will appear here..."
                        className="w-full h-96 bg-black/30 border border-border/50 rounded-xl p-6 font-mono text-sm text-text-primary outline-none resize-none transition-all placeholder:text-text-tertiary"
                    ></textarea>
                    {output && (
                        <div className="absolute bottom-4 right-4">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-highlight border border-border text-text-primary rounded-lg transition-colors shadow-lg"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                <span className="font-bold text-xs">{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>
                    )}
                </div>
                {/* Stats Bar */}
                <div className="p-4 bg-surface border border-border rounded-xl flex items-center justify-around text-center">
                    <div>
                        <div className="text-2xl font-bold text-text-primary">{stats.original}</div>
                        <div className="text-[10px] uppercase text-text-tertiary font-bold tracking-wider">Input</div>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div>
                        <div className="text-2xl font-bold text-accent-primary">{stats.unique}</div>
                        <div className="text-[10px] uppercase text-text-tertiary font-bold tracking-wider">Unique</div>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div>
                        <div className="text-2xl font-bold text-red-400">{stats.removed}</div>
                        <div className="text-[10px] uppercase text-text-tertiary font-bold tracking-wider">Duplicates</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
