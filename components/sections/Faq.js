'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Faq({ data }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto">
                {data.title && (
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">{data.title}</h2>
                )}
                <div className="space-y-4">
                    {data.items?.map((item, i) => (
                        <div key={i} className="border border-[#222] rounded-xl overflow-hidden bg-[#111]">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1a1a1a] transition-colors"
                            >
                                <span className="font-bold text-white">{item.question}</span>
                                {openIndex === i ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>
                            {openIndex === i && (
                                <div className="p-4 pt-0 text-gray-400 text-sm leading-relaxed border-t border-[#222] mt-2">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
