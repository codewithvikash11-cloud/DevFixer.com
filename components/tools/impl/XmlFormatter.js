"use client";

import React, { useState } from 'react';
import { Copy, FileCode, Check } from 'lucide-react';

export default function XmlFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const formatXml = (xml) => {
        let formatted = '';
        const reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;

        xml.split('\r\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }

            let padding = '';
            for (let i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });

        return formatted;
    };

    const handleFormat = () => {
        try {
            setError('');
            if (!input.trim()) return;
            const res = formatXml(input);
            setOutput(res);
        } catch (err) {
            setError('Invalid XML format');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <FileCode className="text-accent-primary" />
                    XML Formatter
                </h3>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[400px]">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Input XML</label>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl bg-surface border border-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none font-mono text-sm resize-none"
                        placeholder="<root><child>value</child></root>"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-secondary">Formatted Output</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-accent-primary hover:text-accent-hover transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl bg-surface-highlight border border-border outline-none font-mono text-sm resize-none text-text-primary"
                        readOnly
                        value={output}
                        placeholder="Formatted XML will appear here..."
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-accent-error/10 border border-accent-error/20 text-accent-error text-sm">
                    {error}
                </div>
            )}

            <button
                onClick={handleFormat}
                className="w-full py-3 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-primary/90 transition-all shadow-lg shadow-accent-primary/20"
            >
                Format XML
            </button>
        </div>
    );
}
