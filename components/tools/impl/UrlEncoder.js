"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check, ArrowRightLeft, RefreshCw } from 'lucide-react';

export default function UrlEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (e) {
            setOutput('Error: Invalid URL encoding');
        }
    }, [input, mode]);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleMode = () => {
        setMode(prev => prev === 'encode' ? 'decode' : 'encode');
        setInput(output); // Swap input/output for quick toggle
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Controls */}
            <div className="flex justify-center">
                <div className="bg-surface border border-border p-1 rounded-xl flex items-center">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'encode' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={toggleMode}
                        className="p-2 text-text-tertiary hover:text-accent-primary transition-colors"
                        title="Swap Mode"
                    >
                        <ArrowRightLeft size={18} />
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'decode' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-text-secondary uppercase">
                        {mode === 'encode' ? 'Decoded Text' : 'Encoded Text'}
                    </label>
                    <div className="relative group flex-1">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter URL to decode..."}
                            className="w-full h-80 bg-surface border border-border rounded-xl p-6 font-mono text-sm text-text-primary outline-none focus:border-accent-primary/50 resize-none transition-all placeholder:text-text-tertiary"
                        ></textarea>
                        <button
                            onClick={() => setInput('')}
                            className="absolute top-4 right-4 p-2 text-text-tertiary hover:text-red-400 bg-background/50 border border-border rounded-lg transition-colors"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-text-secondary uppercase">
                        {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                    </label>
                    <div className="relative group flex-1">
                        <textarea
                            value={output}
                            readOnly
                            placeholder="Result will appear here..."
                            className="w-full h-80 bg-black/30 border border-border/50 rounded-xl p-6 font-mono text-sm text-text-primary outline-none resize-none transition-all placeholder:text-text-tertiary"
                        ></textarea>
                        <div className="absolute bottom-4 right-4">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-highlight border border-border text-text-primary rounded-lg transition-colors shadow-lg"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                <span className="font-bold text-xs">{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
