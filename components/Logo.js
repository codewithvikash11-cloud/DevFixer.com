"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const Logo = ({ className, iconOnly = false }) => {
    return (
        <div className={cn("flex items-center gap-2.5 group select-none cursor-pointer", className)}>
            <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                    src="/logo.png"
                    alt="DevFixer Logo"
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
                />
            </div>

            {!iconOnly && (
                <span className="text-lg md:text-xl font-black tracking-tight flex flex-col leading-none">
                    <span className="text-text-primary">Dev<span className="text-accent-primary">Fixer</span></span>
                </span>
            )}
        </div>
    );
};

export default Logo;
