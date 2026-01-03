"use client";

import React, { useState } from 'react';
import { Copy, Shuffle, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RandomString() {
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useLowercase, setUseLowercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(false);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const generate = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let chars = "";
        if (useUppercase) chars += uppercase;
        if (useLowercase) chars += lowercase;
        if (useNumbers) chars += numbers;
        if (useSymbols) chars += symbols;

        if (!chars) {
            setOutput('Please select at least one character type.');
            return;
        }

        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setOutput(result);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Shuffle className="text-accent-primary" />
                Random String Generator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Length: {length}</label>
                        <input
                            type="range"
                            min="4"
                            max="128"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-accent-primary h-2 bg-surface-highlight rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Toggle label="Uppercase (A-Z)" checked={useUppercase} onChange={setUseUppercase} />
                        <Toggle label="Lowercase (a-z)" checked={useLowercase} onChange={setUseLowercase} />
                        <Toggle label="Numbers (0-9)" checked={useNumbers} onChange={setUseNumbers} />
                        <Toggle label="Symbols (!@#)" checked={useSymbols} onChange={setUseSymbols} />
                    </div>

                    <button
                        onClick={generate}
                        className="w-full py-3 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-primary/90 transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Generate String
                    </button>
                </div>

                {/* Output */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Result</label>
                    <div className="relative">
                        <textarea
                            className="w-full h-48 p-4 rounded-xl bg-surface-highlight border border-border outline-none font-mono text-lg resize-none text-text-primary break-all"
                            readOnly
                            value={output}
                            placeholder="Generated string..."
                        />
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="absolute top-4 right-4 p-2 bg-surface border border-border rounded-lg hover:border-accent-primary text-text-secondary hover:text-accent-primary transition-all"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Toggle = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className={cn(
            "w-10 h-6 rounded-full transition-colors relative flex-shrink-0",
            checked ? "bg-accent-primary" : "bg-surface-highlight border border-border"
        )}>
            <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <div className={cn(
                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
                checked ? "translate-x-4" : "translate-x-0"
            )} />
        </div>
        <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors select-none">{label}</span>
    </label>
);
