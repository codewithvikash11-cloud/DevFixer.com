"use client";

import React, { useState } from 'react';
import { Copy, Check, ArrowRight, RefreshCw } from 'lucide-react';

export default function CaseConverter() {
    const [text, setText] = useState('');
    const [lastCopied, setLastCopied] = useState(null);

    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    };

    const toCamelCase = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    };

    const toPascalCase = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
            return word.toUpperCase();
        }).replace(/\s+/g, '');
    };

    const toSnakeCase = (str) => {
        return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('_');
    };

    const toKebabCase = (str) => {
        return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('-');
    };

    const TRANSFORMATIONS = [
        { label: 'UPPER CASE', fn: (s) => s.toUpperCase() },
        { label: 'lower case', fn: (s) => s.toLowerCase() },
        { label: 'Title Case', fn: toTitleCase },
        { label: 'camelCase', fn: toCamelCase },
        { label: 'PascalCase', fn: toPascalCase },
        { label: 'snake_case', fn: toSnakeCase },
        { label: 'kebab-case', fn: toKebabCase },
        { label: 'InVeRsE cAsE', fn: (s) => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setLastCopied('input');
        setTimeout(() => setLastCopied(null), 2000);
    };

    const applyTransform = (transformFn) => {
        const newText = transformFn(text);
        setText(newText);
    };

    return (
        <div className="flex flex-col gap-6">

            {/* Input Area */}
            <div className="relative group">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full h-64 bg-surface border border-border rounded-xl p-6 font-mono text-sm text-text-primary outline-none focus:border-accent-primary/50 resize-none transition-all placeholder:text-text-tertiary"
                ></textarea>
                <button
                    onClick={() => setText('')}
                    className="absolute top-4 right-4 p-2 text-text-tertiary hover:text-red-400 bg-background/50 border border-border rounded-lg transition-colors"
                >
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Transform Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TRANSFORMATIONS.map((t, i) => (
                    <button
                        key={i}
                        onClick={() => applyTransform(t.fn)}
                        disabled={!text}
                        className="p-3 bg-surface hover:bg-surface-highlight border border-border hover:border-accent-primary/50 rounded-lg text-sm font-bold text-text-secondary hover:text-text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <span className="flex items-center justify-between">
                            {t.label}
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent-primary" />
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex justify-end mt-2">
                <button
                    onClick={handleCopy}
                    disabled={!text}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors shadow-lg shadow-accent-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {lastCopied === 'input' ? <Check size={18} /> : <Copy size={18} />}
                    <span className="font-bold text-sm">Copy Result</span>
                </button>
            </div>
        </div>
    );
}
