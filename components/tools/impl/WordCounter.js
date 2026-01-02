"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function WordCounter() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        charsNoSpace: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.trim() === '' ? 0 : text.split(/\n\n+/).filter(Boolean).length;
        const lines = text.trim() === '' ? 0 : text.split(/\n/).length;

        setStats({ words, chars, charsNoSpace, sentences, paragraphs, lines });
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Words', value: stats.words },
                    { label: 'Characters', value: stats.chars },
                    { label: 'No Spaces', value: stats.charsNoSpace },
                    { label: 'Sentences', value: stats.sentences },
                    { label: 'Paragraphs', value: stats.paragraphs },
                    { label: 'Lines', value: stats.lines },
                ].map((stat, i) => (
                    <div key={i} className="bg-surface border border-border rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-accent-primary">{stat.value}</div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider font-bold mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="relative group">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full h-80 bg-surface border border-border rounded-xl p-6 font-mono text-sm text-text-primary outline-none focus:border-accent-primary/50 resize-none transition-all placeholder:text-text-tertiary"
                ></textarea>

                {/* Actions */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        onClick={handleClear}
                        className="p-2 text-text-tertiary hover:text-red-400 bg-background/50 border border-border rounded-lg transition-colors"
                        title="Clear Text"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent-primary/20"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span className="font-bold text-sm">{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
