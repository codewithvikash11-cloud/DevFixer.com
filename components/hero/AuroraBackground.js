"use client";

import React, { useEffect, useState } from 'react';

const AuroraBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Base Background */}
            <div className="absolute inset-0 bg-white dark:bg-[#030303] transition-colors duration-500" />

            {/* Aurora Orbs - Optimized with CSS translate/scale instead of top/left for performance */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/30 dark:bg-cyan-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-1/3 w-[600px] h-[600px] bg-pink-400/30 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />

            {/* Grid Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.4] dark:opacity-[0.2]"
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(120, 120, 120, 0.2) 1px, transparent 0)` }}
            />

            {/* Vignette for focus */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#030303] dark:via-transparent dark:to-transparent" />
        </div>
    );
};

export default AuroraBackground;
