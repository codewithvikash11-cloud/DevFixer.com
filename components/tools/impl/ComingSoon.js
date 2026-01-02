"use client";

import React from 'react';
import { Construction, Bell } from 'lucide-react';

export default function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
            <div className="w-20 h-20 bg-[#1e293b] rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Construction size={40} className="text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Work in Progress</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
                This tool is currently being built by our engineering team.
                We are crafting a premium experience for you.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-violet-500/25">
                <Bell size={18} />
                Notify me when ready
            </button>
        </div>
    );
}
