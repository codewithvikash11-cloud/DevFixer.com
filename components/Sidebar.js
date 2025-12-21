"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Code, Hash, Edit3, BookOpen, Settings, X } from 'lucide-react';
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
        { icon: Settings, label: 'Admin', href: '/admin' },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 bottom-0 w-64 lg:w-16 bg-panel border-r border-border flex flex-col items-center py-4 z-40 transition-transform duration-300 transform",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                "top-16 lg:top-16"
            )}
        >
            {/* Sidebar Header for Desktop (Logo only) */}
            <div className="hidden lg:flex items-center justify-center h-16 mb-4">
                <Logo iconOnly />
            </div>

            <div className="space-y-2 lg:space-y-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center lg:justify-center px-4 py-3 lg:px-0 lg:w-12 lg:h-12 mx-auto rounded-xl transition-all duration-300 relative group/item active:scale-95 ${isActive
                                ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                                }`}
                        >
                            <Icon size={22} className={`${!isActive && 'group-hover/item:scale-110 transition-transform'}`} />
                            <span className="ml-3 lg:hidden font-bold tracking-tight">{item.label}</span>

                            {/* Tooltip for desktop */}
                            <div className="hidden lg:block absolute left-14 px-3 py-1.5 bg-panel border border-border rounded-lg text-xs font-black tracking-widest text-white whitespace-nowrap opacity-0 translate-x-[-10px] group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all pointer-events-none z-50 shadow-2xl">
                                {item.label.toUpperCase()}
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto p-4 lg:p-0 lg:pb-6 flex flex-col items-center">
                <div className="hidden lg:block w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                </div>

                <div className="lg:hidden p-4 bg-accent-blue/5 border border-accent-blue/10 rounded-2xl w-full">
                    <p className="text-[10px] font-mono text-accent-blue font-black tracking-[0.2em] mb-1">SYSTEM_STATUS</p>
                    <p className="text-xs font-bold text-text-primary uppercase">Production Ready v1.0</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
