"use client";

import React from 'react';
import { Bug, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className, iconOnly = false }) => {
    return (
        <div className={cn("flex items-center gap-3 group select-none", className)}>
            <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-accent-blue/10 border border-accent-blue/20 transition-all duration-500 group-hover:scale-110 group-active:scale-95 group-hover:bg-accent-blue/20 group-hover:border-accent-blue/40">
                <Bug className="text-accent-blue" size={24} />
                <div className="absolute -right-1 -bottom-1 p-0.5 rounded-lg bg-background border border-border shadow-lg scale-0 transition-transform duration-500 group-hover:scale-100">
                    <Code2 className="text-accent-blue" size={10} />
                </div>
            </div>
            {!iconOnly && (
                <span className="text-xl md:text-2xl font-black tracking-tighter transition-colors duration-500">
                    Dev<span className="text-accent-blue group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">Fixer</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
