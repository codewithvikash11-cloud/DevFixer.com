import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Features({ data }) {
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {data.title && (
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">{data.title}</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.items?.map((item, i) => (
                        <div key={i} className="bg-[#111] border border-[#222] p-6 rounded-2xl hover:border-[#008000]/50 transition-colors group">
                            <div className="w-12 h-12 bg-[#008000]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#008000]/20 transition-colors">
                                <CheckCircle2 className="text-[#008000]" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
