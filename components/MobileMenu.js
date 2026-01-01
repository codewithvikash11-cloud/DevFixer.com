"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, Terminal, Code, BookOpen, Layout, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

export default function MobileMenu({ isOpen, onClose }) {
    const pathname = usePathname();

    const items = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Errors', href: '/errors', icon: Terminal },
        { label: 'Languages', href: '/languages', icon: Globe },
        { label: 'Compiler', href: '/compiler', icon: Code },
        { label: 'Snippets', href: '/snippets', icon: BookOpen },
        { label: 'Dashboard', href: '/dashboard', icon: Layout },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Side Drawer */}
            <div className={cn(
                "fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-out lg:hidden",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <Logo />
                    <button onClick={onClose} className="p-2 -mr-2 text-text-secondary hover:text-text-primary">
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium",
                                    isActive
                                        ? "bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                )}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 border border-border">
                        <h4 className="text-xs font-bold text-text-primary mb-1">CodeOrbit Mobile</h4>
                        <p className="text-[10px] text-text-secondary">Code on the go.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
