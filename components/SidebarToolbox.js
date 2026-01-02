"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Code,
    Terminal,
    BookOpen,
    Zap,
    ChevronLeft,
    ChevronRight,
    Layout,

    Globe,
    Network
} from 'lucide-react';

export default function SidebarToolbox() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        {
            name: "API Tester",
            href: "/api-tester",
            icon: Network,
            color: "text-[#F43F5E]", // Rose
            desc: "REST Client"
        },
        {
            name: "Compiler",
            href: "/compiler",
            icon: Code,
            color: "text-[#3B82F6]", // Blue
            desc: "Online IDE"
        },
        {
            name: "Snippets",
            href: "/snippets",
            icon: BookOpen,
            color: "text-[#10B981]", // Emerald
            desc: "Code Library"
        },
        {
            name: "Errors",
            href: "/errors",
            icon: Terminal,
            color: "text-[#EF4444]", // Red
            desc: "Fix Database"
        },
        {
            name: "Languages",
            href: "/languages",
            icon: Globe,
            color: "text-[#A855F7]", // Purple
            desc: "Docs & Syntax"
        },
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: Layout,
            color: "text-[#F59E0B]", // Amber
            desc: "Contributor"
        }
    ];

    return (
        <>
            {/* Desktop Rail / Sidebar */}
            <aside
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
                    ${isOpen ? 'w-64 bg-black/80' : 'w-20 bg-black/60'} 
                    backdrop-blur-xl border-r border-white/5 shadow-2xl hidden lg:flex flex-col pt-24 pb-6
                `}
            >
                {/* Rail Header */}
                <div className={`px-6 mb-8 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-1 whitespace-nowrap">Explore</h2>
                    <div className="h-0.5 w-6 bg-[#00E5FF] rounded-full shadow-[0_0_8px_#00E5FF]"></div>
                </div>

                <nav className="space-y-4 px-2 flex-1 flex flex-col items-center lg:items-stretch">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <div key={item.href} className="relative group/item w-full flex justify-center lg:justify-start">
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        relative flex items-center transition-all duration-300 group/link
                                        ${isOpen
                                            ? 'w-full p-3 rounded-xl gap-3 border border-transparent'
                                            : 'w-10 h-10 justify-center rounded-xl'
                                        }
                                        ${isActive
                                            ? isOpen
                                                ? 'bg-white/5 border-white/10 shadow-lg'
                                                : 'bg-gradient-to-br from-[#008000] to-[#005500] text-white shadow-[0_0_15px_rgba(0,128,0,0.5)] ring-1 ring-white/20'
                                            : 'hover:bg-white/5 text-gray-400 hover:text-white'
                                        }
                                    `}
                                >
                                    {/* Icon Container */}
                                    <div className={`
                                        relative z-10 transition-transform duration-300 ease-out group-hover/link:scale-110
                                        ${isActive && !isOpen ? 'text-white' : ''}
                                        ${isActive && isOpen ? 'text-[#00E5FF]' : ''}
                                    `}>
                                        <item.icon size={20} className={isActive ? 'drop-shadow-md' : ''} />
                                    </div>

                                    {/* Expanded Text */}
                                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100 ml-0' : 'w-0 opacity-0'}`}>
                                        <div className="flex flex-col items-start text-left">
                                            <p className={`text-sm font-bold whitespace-nowrap tracking-wide ${isActive ? 'text-white' : 'text-gray-400 group-hover/link:text-white'}`}>
                                                {item.name}
                                            </p>
                                            <p className="text-[10px] text-gray-600 font-medium whitespace-nowrap group-hover/link:text-gray-500 transition-colors">{item.desc}</p>
                                        </div>
                                    </div>

                                    {/* Active Indicator Line (Expanded Only) */}
                                    {isOpen && isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#008000] rounded-r-full shadow-[0_0_8px_#008000]"></div>
                                    )}
                                </Link>

                                {/* Tooltip (Collapsed Only) */}
                                {!isOpen && (
                                    <div className="
                                        absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                                        bg-[#1e293b] border border-[#334155] rounded-lg shadow-xl 
                                        opacity-0 invisible -translate-x-2 
                                        group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 
                                        transition-all duration-200 z-50 whitespace-nowrap
                                    ">
                                        <p className="text-xs font-bold text-white mb-0.5">{item.name}</p>
                                        <p className="text-[10px] text-gray-400">{item.desc}</p>
                                        {/* Arrow */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] border-l border-b border-[#334155] rotate-45"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Pro Banner / Footer */}
                <div className={`mt-auto mx-3 p-4 rounded-2xl bg-gradient-to-br from-[#00E5FF]/10 to-purple-500/10 border border-white/5 relative overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                    <div className="absolute inset-0 bg-white/5 blur-xl"></div>
                    <div className="relative flex items-center gap-2 mb-1">
                        <Zap size={14} className="text-[#00E5FF] fill-current" />
                        <span className="text-xs font-bold text-white whitespace-nowrap tracking-wide">CodeOrbit Pro</span>
                    </div>
                    <p className="relative text-[10px] text-gray-400 leading-relaxed">
                        Unlock AI Debugging & Cloud Sync.
                    </p>
                </div>
            </aside>

            {/* Overlay for mobile - Only if we trigger via another mobile button */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
