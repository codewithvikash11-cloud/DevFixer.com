"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Code, Hash, Edit3, BookOpen, Settings, X, Terminal, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const Sidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Hash, label: 'Errors', href: '/errors' },
        { icon: Code, label: 'Languages', href: '/languages' },
        { icon: Edit3, label: 'Editor', href: '/editor' },
        { icon: BookOpen, label: 'Blogs', href: '/blogs' },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 bottom-0 z-40 flex flex-col items-center py-6 transition-transform duration-300 ease-in-out border-r border-white/5",
                // Mobile/Tablet: Slide in, wider, glass background
                "w-72 bg-background/95 backdrop-blur-xl md:w-72",
                // Desktop: Always visible, collapsed to icon rail, transparent/glass
                "lg:w-20 lg:translate-x-0 lg:bg-background/50 lg:backdrop-blur-sm",

                // Position top based on Navbar height (h-16 mobile, h-20 md/desktop)
                "top-16 md:top-20",

                // State toggle
                isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:shadow-none"
            )}
        >
            {/* Mobile Header in Sidebar */}
            <div className="lg:hidden w-full px-6 mb-8 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Navigation</span>
                <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full">
                    <X size={18} className="text-text-secondary" />
                </button>
            </div>

            <div className="w-full px-4 lg:px-0 space-y-2 lg:space-y-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // Check active state exact or sub-path (except root)
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group/item relative overflow-hidden",
                                // Desktop specific sizing
                                "lg:justify-center lg:px-0 lg:w-12 lg:h-12 lg:mx-auto lg:rounded-2xl",
                                isActive
                                    ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
                                    : "text-text-secondary hover:bg-surface-highlight hover:text-text-primary"
                            )}
                        >
                            <Icon
                                size={20}
                                className={cn(
                                    "relative z-10 transition-transform duration-300",
                                    !isActive && "group-hover/item:scale-110 group-hover/item:text-accent-primary"
                                )}
                            />

                            {/* Label: Visible on Mobile, Hidden on Desktop */}
                            <span className="lg:hidden font-bold text-sm tracking-tight">{item.label}</span>

                            {/* Desktop Tooltip */}
                            <div className="hidden lg:block absolute left-16 px-3 py-1.5 bg-panel border border-border/50 rounded-lg text-[10px] font-bold uppercase tracking-widest text-text-primary shadow-xl opacity-0 translate-x-[-8px] group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all pointer-events-none z-50 whitespace-nowrap">
                                {item.label}
                                {/* Tooltip Arrow */}
                                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-panel border-l border-b border-border/50 transform rotate-45" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="mt-autow-full px-4 lg:px-0 flex flex-col items-center space-y-4 mt-auto">
                {/* Divider */}
                <div className="w-8 h-px bg-border/50 hidden lg:block" />

                <Link href="/settings" className="p-3 text-text-tertiary hover:text-text-primary transition-colors lg:block hidden">
                    <Activity size={20} />
                </Link>

                {/* Mobile Status Card */}
                <div className="lg:hidden w-full p-4 mt-8 bg-surface/50 border border-border/50 rounded-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-3 mb-2">
                        <Terminal size={16} className="text-accent-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">System Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-success opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-success"></span>
                        </span>
                        <span className="text-xs font-bold text-text-primary">All Systems Nominal</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
