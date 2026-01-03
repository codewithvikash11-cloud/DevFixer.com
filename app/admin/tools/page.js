"use client";

import React, { useState } from 'react';
import { TOOLS_REGISTRY } from '@/components/tools/ToolsRegistry';
import { Power, Settings, BarChart3, Plus, Image as ImageIcon } from 'lucide-react';

export default function ToolsControl() {
    const [tools, setTools] = useState(TOOLS_REGISTRY);

    // Mock handle add tool
    const handleAdd = () => {
        alert("Launch Modal: Create New Tool\n(Fields: Name, Description, Icon, Category)");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Tools Control Center</h1>
                    <p className="text-gray-500 text-sm">Manage {tools.length} active platform utilities.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20"
                >
                    <Plus size={18} /> New Tool
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map(tool => (
                    <div key={tool.id} className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-5 hover:border-[#333] transition-colors flex flex-col group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-white transition-colors">
                                <tool.icon size={24} />
                            </div>
                            <div className="flex gap-1">
                                <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all"><Settings size={16} /></button>
                                <button className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all"><Power size={16} /></button>
                            </div>
                        </div>

                        <h3 className="text-white font-bold mb-1">{tool.title}</h3>
                        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{tool.description}</p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#222]">
                            <span className="text-[10px] uppercase font-bold text-gray-600">{tool.category}</span>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <BarChart3 size={12} />
                                <span>{(Math.random() * 1000).toFixed(0)} uses</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
