"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function HashGenerator() {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState({ sha1: '', sha256: '', sha384: '', sha512: '' });
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        const generateHashes = async () => {
            if (!input) {
                setHashes({ sha1: '', sha256: '', sha384: '', sha512: '' });
                return;
            }
            const encoder = new TextEncoder();
            const data = encoder.encode(input);

            const hashBufferToHex = (buffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

            const [sha1, sha256, sha384, sha512] = await Promise.all([
                crypto.subtle.digest('SHA-1', data),
                crypto.subtle.digest('SHA-256', data),
                crypto.subtle.digest('SHA-384', data),
                crypto.subtle.digest('SHA-512', data),
            ]);

            setHashes({
                sha1: hashBufferToHex(sha1),
                sha256: hashBufferToHex(sha256),
                sha384: hashBufferToHex(sha384),
                sha512: hashBufferToHex(sha512)
            });
        };

        generateHashes();
    }, [input]);

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-400 mb-2">Input Text</label>
                <input
                    type="text"
                    className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 text-white outline-none focus:border-red-500"
                    placeholder="Type something to hash..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {Object.entries(hashes).map(([algo, hash]) => (
                    <div key={algo} className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2">{algo}</label>
                        <div className="flex items-center gap-2 bg-[#1e293b] border border-[#334155] rounded-xl p-3">
                            <code className="flex-1 font-mono text-xs text-red-300 break-all">{hash || '...'}</code>
                            <button
                                onClick={() => copyToClipboard(hash, algo)}
                                className="p-2 text-gray-500 hover:text-white transition-colors"
                                disabled={!hash}
                            >
                                {copied === algo ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-500 italic mt-4 text-center">Note: MD5 is not supported by standard Web Crypto API for security reasons.</p>
        </div>
    );
}
