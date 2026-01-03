"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPageSections, createPageSection } from '@/lib/actions/pages'; // Need create/update actions
import { Save, Plus, ArrowUp, ArrowDown, Trash2, Layout } from 'lucide-react';

export default function PageVisualEditor() {
    const { id } = useParams();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock load for now until we fully implement the sections update actions
        // In real impl, would fetch from DB
        setLoading(false);
    }, []);

    const addSection = (type) => {
        setSections([...sections, {
            id: Date.now(),
            type,
            content: { title: 'New Section', body: 'Edit me...' },
            config: { visible: true }
        }]);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between bg-[#0A0A0A] border-b border-[#222] p-6 -mx-6 -mt-6 sticky top-0 z-30">
                <div>
                    <h1 className="text-2xl font-black text-white">Visual Editor</h1>
                    <p className="text-gray-500 text-xs">designing <span className="text-accent-primary font-mono">{id}</span></p>
                </div>
                <div className="flex gap-2">
                    <button className="px-6 py-2 bg-accent-primary text-black font-bold rounded-lg text-sm">
                        <Save size={16} className="inline mr-2" /> Save & Publish
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Canvas */}
                <div className="lg:col-span-3 space-y-4">
                    {sections.length === 0 ? (
                        <div className="border-2 border-dashed border-[#222] rounded-2xl p-20 text-center">
                            <Layout size={40} className="mx-auto text-gray-600 mb-4" />
                            <h3 className="text-gray-400 font-bold">Page is Empty</h3>
                            <p className="text-gray-600 text-sm">Add a section from the right sidebar to start.</p>
                        </div>
                    ) : (
                        sections.map((section, idx) => (
                            <div key={section.id} className="bg-[#111] border border-[#222] rounded-xl p-6 relative group hover:border-[#444]">
                                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-white/10 rounded"><ArrowUp size={14} className="text-gray-400" /></button>
                                    <button className="p-1 hover:bg-white/10 rounded"><ArrowDown size={14} className="text-gray-400" /></button>
                                    <button className="p-1 hover:bg-red-500/20 text-red-500 rounded"><Trash2 size={14} /></button>
                                </div>
                                <div className="text-xs text-accent-primary font-mono uppercase mb-2">{section.type}</div>
                                <input
                                    className="bg-transparent text-xl font-bold text-white w-full outline-none placeholder-gray-600"
                                    placeholder="Section Title"
                                    value={section.content.title}
                                    onChange={(e) => {
                                        const newSecs = [...sections];
                                        newSecs[idx].content.title = e.target.value;
                                        setSections(newSecs);
                                    }}
                                />
                                <div className="mt-2 text-gray-500 text-sm italic">Detailed content editing coming in Phase 3...</div>
                            </div>
                        ))
                    )}
                </div>

                {/* Toolbox */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Components</h3>
                    <div className="grid gap-2">
                        {['Hero', 'Features', 'Text Block', 'CTA', 'Grid'].map(item => (
                            <button
                                key={item}
                                onClick={() => addSection(item)}
                                className="flex items-center gap-3 p-3 bg-[#0A0A0A] border border-[#222] hover:border-accent-primary/50 rounded-xl text-left transition-all group"
                            >
                                <div className="w-8 h-8 rounded bg-[#111] flex items-center justify-center text-gray-500 group-hover:text-white">
                                    <Plus size={16} />
                                </div>
                                <span className="text-sm font-bold text-gray-300 group-hover:text-white">{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
