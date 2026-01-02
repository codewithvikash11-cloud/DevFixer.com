"use client";
import React, { useState } from 'react';
import { Copy, AlertCircle, Check } from 'lucide-react';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 4));
            setError(null);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const handleMinify = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">Input JSON</label>
                <textarea
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-violet-500 resize-none"
                    placeholder="Paste messy JSON here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-gray-400">Output</label>
                    <div className="flex gap-2">
                        <button onClick={handleMinify} className="px-3 py-1 text-xs font-bold bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors">Minify</button>
                        <button onClick={handleFormat} className="px-3 py-1 text-xs font-bold bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">Format</button>
                        {output && (
                            <button onClick={copyToClipboard} className="p-1 hover:text-white text-gray-400 transition-colors">
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        )}
                    </div>
                </div>

                <div className={`flex-1 relative bg-[#1e293b] border ${error ? 'border-red-500/50' : 'border-[#334155]'} rounded-xl overflow-hidden`}>
                    {error ? (
                        <div className="absolute inset-0 p-4 bg-red-500/10 text-red-500 font-mono text-sm overflow-auto">
                            <div className="flex items-center gap-2 font-bold mb-2"><AlertCircle size={16} /> Invalid JSON</div>
                            {error}
                        </div>
                    ) : (
                        <textarea
                            readOnly
                            className="w-full h-full bg-transparent p-4 font-mono text-sm outline-none resize-none text-green-400"
                            value={output}
                            placeholder="Result will appear here..."
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
