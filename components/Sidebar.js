"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Code, Hash, Edit3, BookOpen, Settings, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Sidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Hash, label: 'Errors', href: '/errors' },
        { icon: Code, label: 'Languages', href: '/languages' },
        { icon: Edit3, label: 'Editor', href: '/editor' },
        { icon: BookOpen, label: 'Blogs', href: '/blogs' },
        { icon: Settings, label: 'Admin', href: '/admin' },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 bottom-0 w-64 lg:w-16 bg-panel border-r border-border flex flex-col items-center py-4 z-40 transition-transform duration-300 transform",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                "lg:top-16"
            )}
        >
            {/* Mobile Header in Sidebar */}
            <div className="flex items-center justify-between w-full px-6 mb-8 lg:hidden">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-accent-blue flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent-blue/20">
                        D
                    </div>
                    <span className="font-bold text-xl tracking-tight">DevFixer</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex flex-col items-center w-full px-4 lg:px-0 space-y-2 lg:space-y-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center lg:justify-center w-full p-3 rounded-xl transition-all group relative",
                                isActive
                                    ? "text-accent-blue bg-accent-blue/10 shadow-inner"
                                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                            )}
                        >
                            <Icon size={24} className="shrink-0" />
                            <span className="ml-4 lg:hidden font-medium">{item.label}</span>

                            {/* Desktop Tooltip */}
                            <span className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-panel border border-border rounded-lg text-xs font-semibold text-text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl transform translate-x-2 group-hover:translate-x-0 z-50 whitespace-nowrap">
                                {item.label}
                            </span>

                            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-accent-blue rounded-r-full hidden lg:block" />}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto w-full px-4 lg:px-0 lg:hidden">
                <div className="p-4 bg-background/50 border border-border rounded-xl">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-1">Status</p>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                        <span className="text-xs font-semibold">Production Ready</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
