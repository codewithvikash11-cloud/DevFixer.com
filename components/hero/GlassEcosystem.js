"use client";

import React from 'react';
import { Check, Bug, Activity, Terminal } from 'lucide-react';

const GlassEcosystem = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-[1000px]">
            {/* Main Code Window (Center) */}
            <div className="absolute z-20 w-[300px] md:w-[420px] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-xl shadow-2xl transform transition-transform hover:scale-105 duration-500 animate-float-soft">
                {/* Window Header */}
                <div className="flex items-center px-4 py-3 border-b border-gray-200/50 dark:border-white/5 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-2 text-xs text-gray-400 font-mono">fix_engine.tsx</div>
                </div>
                {/* Code Content */}
                <div className="p-5 font-mono text-xs md:text-sm space-y-2">
                    <div className="flex">
                        <span className="text-purple-500 w-6">1</span>
                        <span className="text-pink-500">const</span> <span className="text-blue-500 mx-1">analyzeError</span> = <span className="text-gray-500">(</span><span className="text-orange-400">err</span><span className="text-gray-500">)</span> <span className="text-pink-500">=&gt;</span> <span className="text-gray-500">{`{`}</span>
                    </div>
                    <div className="flex pl-6">
                        <span className="text-gray-400 w-6">2</span>
                        <span className="text-gray-400">// Automatically detected issue</span>
                    </div>
                    <div className="flex pl-6">
                        <span className="text-gray-400 w-6">3</span>
                        <span className="text-pink-500">return</span> <span className="text-blue-500 mx-1">DevFixer</span>.<span className="text-yellow-400">resolve</span>(<span className="text-orange-400">err</span>);
                    </div>
                    <div className="flex">
                        <span className="text-gray-400 w-6">4</span>
                        <span className="text-gray-500">{`}`}</span>
                    </div>
                </div>
            </div>

            {/* Success Toast (Floating Top Right) */}
            <div className="absolute z-30 -right-4 top-10 md:top-20 md:right-0 bg-white dark:bg-gray-900 border border-emerald-500/30 rounded-lg shadow-lg p-3 flex items-center space-x-3 animate-float delay-700">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Check size={16} />
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-800 dark:text-gray-100">Fixed instantly</div>
                    <div className="text-[10px] text-gray-500">Just now</div>
                </div>
            </div>

            {/* Error Detected Widget (Floating Bottom Left) */}
            <div className="absolute z-10 -left-6 bottom-20 md:bottom-24 md:-left-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-red-500/20 rounded-lg shadow-xl p-4 w-48 animate-float delay-1000">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500">Error Rate</span>
                    <Bug size={14} className="text-red-500" />
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[80%] rounded-full" />
                </div>
                <div className="mt-2 text-[10px] text-red-500 font-medium">- Decreasing (98% match)</div>
            </div>

            {/* Performance Widget (Floating Bottom Right) */}
            <div className="absolute z-10 -right-8 bottom-10 md:bottom-12 md:-right-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-blue-500/20 rounded-lg shadow-xl p-3 flex flex-col items-center animate-float delay-500">
                <Activity size={20} className="text-blue-500 mb-1" />
                <span className="text-xs font-bold text-gray-800 dark:text-white">High Perf</span>
            </div>
        </div>
    );
};

export default GlassEcosystem;
