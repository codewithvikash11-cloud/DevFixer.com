"use client";

import React from 'react';
import { X, Check, Palette, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const themes = [
    {
        id: 'dark',
        name: 'VS Code Dark',
        desc: 'Productivity focused environment',
        colors: { bg: '#1E1E1E', panel: '#111827', accent: '#2563EB' }
    },
    {
        id: 'tokyo-night',
        name: 'Tokyo Night',
        desc: 'Vibrant neon developer setup',
        colors: { bg: '#1A1B26', panel: '#16161E', accent: '#7AA2F7' }
    },
    {
        id: 'light',
        name: 'VS Code Light',
        desc: 'High clarity diurnal workspace',
        colors: { bg: '#FFFFFF', panel: '#F3F4F6', accent: '#2563EB' }
    },
    {
        id: 'solarized-light',
        name: 'Solarized Light',
        desc: 'Eye-strain reduction palette',
        colors: { bg: '#FDF6E3', panel: '#EEE8D5', accent: '#859900' }
    }
];

const ThemeSelector = ({ onClose }) => {
    const { theme: currentTheme, changeTheme } = useTheme();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative bg-panel border-2 border-border/80 rounded-[2.5rem] w-full max-w-xl shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-500 scale-100 ring-1 ring-white/10">
                <div className="flex items-center justify-between px-10 py-8 border-b border-border/50">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-accent-blue/10 rounded-xl text-accent-blue">
                            <Palette size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">System Interface</h2>
                            <p className="text-xs text-text-secondary font-medium">Select your preferred visual engine</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-white/5 rounded-2xl text-text-secondary hover:text-white transition-all active:scale-90"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => changeTheme(theme.id)}
                            className={`group text-left p-6 rounded-3xl border-2 transition-all relative overflow-hidden ${currentTheme === theme.id
                                    ? 'border-accent-blue bg-accent-blue/10 shadow-[inner_0_0_20px_rgba(37,99,235,0.1)]'
                                    : 'border-border/50 hover:border-accent-blue/30 bg-background/30'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <span className="font-black text-sm tracking-tight">{theme.name}</span>
                                {currentTheme === theme.id ? (
                                    <div className="p-1.5 bg-accent-blue rounded-lg shadow-lg shadow-accent-blue/40">
                                        <Check size={14} className="text-white" />
                                    </div>
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-border group-hover:bg-accent-blue/50 transition-colors" />
                                )}
                            </div>

                            <div className="flex space-x-1.5 h-16 rounded-2xl overflow-hidden mb-4 border border-white/5 relative z-10">
                                <div className="flex-1" style={{ backgroundColor: theme.colors.bg }} />
                                <div className="flex-1" style={{ backgroundColor: theme.colors.panel }} />
                                <div className="flex-1" style={{ backgroundColor: theme.colors.accent }} />
                            </div>

                            <div className="flex items-center space-x-2 relative z-10">
                                <Sparkles size={12} className={currentTheme === theme.id ? 'text-accent-blue' : 'text-text-secondary opacity-50'} />
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${currentTheme === theme.id ? 'text-accent-blue' : 'text-text-secondary opacity-60'
                                    }`}>
                                    {theme.desc}
                                </p>
                            </div>

                            {/* Hover highlight effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/0 via-transparent to-accent-blue/0 group-hover:from-accent-blue/5 transition-all duration-700 pointer-events-none" />
                        </button>
                    ))}
                </div>

                <div className="px-10 py-8 bg-background/50 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Global scaling: 100%</p>
                    <button
                        onClick={onClose}
                        className="w-full md:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white px-10 py-3.5 rounded-2xl text-sm font-black transition-all shadow-2xl shadow-accent-blue/20 active:scale-95"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;
