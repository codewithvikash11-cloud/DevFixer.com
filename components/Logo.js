"use client";

import React from 'react';
import { Bug, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className, iconOnly = false }) => {
    return (
        <div className={cn("flex items-center gap-3 group select-none cursor-pointer", className)}>
            <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-accent-blue/10 border border-accent-blue/20 transition-all duration-500 group-hover:scale-110 group-active:scale-95 group-hover:bg-accent-blue/20 group-hover:border-accent-blue/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Bug className="text-accent-blue transition-transform duration-500 group-hover:rotate-12" size={24} />

                {/* Creative accents */}
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-purple opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-accent-green opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 group-hover:-translate-x-1 group-hover:translate-y-1" />

                <div className="absolute -right-1 -bottom-1 p-0.5 rounded-lg bg-background border border-border shadow-lg scale-0 transition-transform duration-500 group-hover:scale-100 z-10">
                    <Code2 className="text-accent-blue" size={10} />
                </div>
            </div>
            {!iconOnly && (
                <span className="text-xl md:text-2xl font-black tracking-tighter transition-colors duration-500">
                    Dev<span className="text-accent-blue group-hover:shadow-accent-blue drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all">Fixer</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
