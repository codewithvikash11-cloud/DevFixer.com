"use client";
import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

export default function Base64Converter() {
    const [text, setText] = useState('');
    const [base64, setBase64] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEncode = (val) => {
        setText(val);
        try {
            setBase64(btoa(val));
        } catch (e) {
            setBase64('Error: Invalid input for Base64 encoding');
        }
    };

    const handleDecode = (val) => {
        setBase64(val);
        try {
            setText(atob(val));
        } catch (e) {
            setText('Error: Invalid Base64 string');
        }
    };

    const copyToClipboard = (content) => {
        if (!content) return;
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6 h-[500px]">
            {/* Text Input */}
            <div className="flex-1 flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">Plain Text</label>
                <textarea
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-blue-500 resize-none"
                    placeholder="Type text to encode..."
                    value={text}
                    onChange={(e) => handleEncode(e.target.value)}
                />
            </div>

            {/* Separator / Action */}
            <div className="flex items-center justify-center">
                <div className="bg-[#334155] p-2 rounded-full">
                    <ArrowLeftRight size={20} className="text-gray-400" />
                </div>
            </div>

            {/* Base64 Input/Output */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-gray-400">Base64 Output</label>
                    <button onClick={() => copyToClipboard(base64)} className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        {copied ? <Check size={14} /> : <Copy size={14} />} Copy
                    </button>
                </div>
                <textarea
                    className="flex-1 bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-sm outline-none focus:border-blue-500 resize-none text-blue-300"
                    placeholder="Or paste Base64 to decode..."
                    value={base64}
                    onChange={(e) => handleDecode(e.target.value)}
                />
            </div>
        </div>
    );
}
