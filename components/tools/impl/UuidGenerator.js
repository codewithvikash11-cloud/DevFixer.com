"use client";
import React, { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function UuidGenerator() {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState(null); // Index of copied item

    const generate = () => {
        const newUuids = Array(Math.min(count, 50)).fill(0).map(() => crypto.randomUUID());
        setUuids(newUuids);
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 1500);
    };

    React.useEffect(() => {
        generate();
    }, []);

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-[#1e293b] p-4 rounded-xl border border-[#334155]">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-400">Count:</span>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-16 h-9 bg-[#0f172a] border border-[#334155] rounded-lg px-2 text-center text-sm font-bold outline-none focus:border-green-500"
                    />
                </div>
                <button
                    onClick={generate}
                    className="flex-1 h-9 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <RefreshCw size={16} /> Generate UUIDs
                </button>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {uuids.map((uuid, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#1e293b] border border-[#334155] rounded-xl group hover:border-green-500/50 transition-colors">
                        <code className="font-mono text-green-400 text-base">{uuid}</code>
                        <button
                            onClick={() => copyToClipboard(uuid, i)}
                            className="p-2 text-gray-500 hover:text-white transition-colors"
                        >
                            {copied === i ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
