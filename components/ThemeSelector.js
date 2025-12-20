"use client";

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { X, Palette, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const themes = [
    { id: 'dark', name: 'VS Code Dark', desc: 'The classic pro developer look' },
    { id: 'tokyo-night', name: 'Tokyo Night', desc: 'Clean, modern, and high-contrast' },
    { id: 'light', name: 'VS Code Light', desc: 'Pristine and readable for daytime' },
    { id: 'solarized-light', name: 'Solarized Light', desc: 'Warm palettes for eye comfort' },
];

const ThemeSelector = ({ onClose }) => {
    const { theme: currentTheme, setTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);

    const getThemeColors = (themeId) => {
        switch (themeId) {
            case 'dark': return { accent: '#2563eb', bg: '#0F0F12' };
            case 'tokyo-night': return { accent: '#bb9af7', bg: '#1a1b26' };
            case 'light': return { accent: '#005fb8', bg: '#ffffff' };
            case 'solarized-light': return { accent: '#b58900', bg: '#fdf6e3' };
            default: return { accent: '#2563eb', bg: '#0F0F12' };
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-panel border-2 border-border rounded-[3rem] shadow-[0_0_100px_rgba(37,99,235,0.2)] overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="p-8 border-b border-border flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-2 text-accent-blue mb-1 font-mono text-[10px] font-black tracking-[0.3em] uppercase">
                            <Sparkles size={12} />
                            <span>Appearance</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">Select Theme</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-white/5 rounded-2xl text-text-secondary hover:text-text-primary transition-all active:scale-90"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {themes.map((theme) => {
                            const colors = getThemeColors(theme.id);
                            return (
                                <button
                                    key={theme.id}
                                    onClick={() => setSelectedTheme(theme.id)}
                                    className={cn(
                                        "relative flex flex-col items-center p-4 md:p-6 rounded-[2rem] border-2 transition-all duration-300 group active:scale-95",
                                        selectedTheme === theme.id
                                            ? "bg-accent-blue/5 border-accent-blue shadow-lg shadow-accent-blue/5"
                                            : "bg-background border-border hover:border-accent-blue/20"
                                    )}
                                >
                                    <div
                                        className="w-6 h-6 md:w-5 md:h-5 rounded-lg flex items-center justify-center mb-3 shadow-sm transition-transform group-hover:scale-110 duration-500"
                                        style={{ backgroundColor: colors.accent }}
                                    >
                                        <Palette className="text-white" size={14} />
                                    </div>
                                    <span className={cn(
                                        "text-[10px] md:text-[11px] font-black uppercase tracking-widest text-center",
                                        selectedTheme === theme.id ? "text-accent-blue" : "text-text-primary"
                                    )}>
                                        {theme.name}
                                    </span>

                                    {selectedTheme === theme.id && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-accent-blue text-white rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                                            <Check size={10} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-xl font-black text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all uppercase tracking-widest text-[10px]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setTheme(selectedTheme);
                                onClose();
                            }}
                            className="flex-1 px-6 py-4 bg-accent-blue text-white rounded-xl font-black shadow-lg shadow-accent-blue/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px]"
                        >
                            Apply Theme
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;
