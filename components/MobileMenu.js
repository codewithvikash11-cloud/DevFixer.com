"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, Terminal, Code, BookOpen, Layout, Globe, Network, Briefcase, GraduationCap, ScrollText, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

export default function MobileMenu({ isOpen, onClose }) {
    const pathname = usePathname();

    const items = [
        { label: 'Home', href: '/', icon: Home, color: 'text-text-primary', activeColor: 'text-text-primary', activeBg: 'bg-text-primary/10' },
        { label: 'Learn', href: '/learn', icon: GraduationCap, color: 'text-[#00E5FF]', activeColor: 'text-[#00E5FF]', activeBg: 'bg-[#00E5FF]/10' },
        { label: 'Tools Hub', href: '/tools', icon: Briefcase, color: 'text-[#8B5CF6]', activeColor: 'text-[#8B5CF6]', activeBg: 'bg-[#8B5CF6]/10' },
        { label: 'API Tester', href: '/api-tester', icon: Network, color: 'text-[#F43F5E]', activeColor: 'text-[#F43F5E]', activeBg: 'bg-[#F43F5E]/10' },
        { label: 'Compiler', href: '/compiler', icon: Code, color: 'text-[#3B82F6]', activeColor: 'text-[#3B82F6]', activeBg: 'bg-[#3B82F6]/10' },
        { label: 'Errors', href: '/errors', icon: Terminal, color: 'text-[#EF4444]', activeColor: 'text-[#EF4444]', activeBg: 'bg-[#EF4444]/10' },
        { label: 'Languages', href: '/languages', icon: Globe, color: 'text-[#A855F7]', activeColor: 'text-[#A855F7]', activeBg: 'bg-[#A855F7]/10' },
        { label: 'Log Analyzer', href: '/log-analyzer', icon: ScrollText, color: 'text-amber-400', activeColor: 'text-amber-400', activeBg: 'bg-amber-400/10' },
        { label: 'Code Reviewer', href: '/code-reviewer', icon: ShieldCheck, color: 'text-green-400', activeColor: 'text-green-400', activeBg: 'bg-green-400/10' },
        { label: 'Snippets', href: '/snippets', icon: BookOpen, color: 'text-[#10B981]', activeColor: 'text-[#10B981]', activeBg: 'bg-[#10B981]/10' },
        { label: 'Back to Home', href: '/', icon: Layout, color: 'text-text-secondary', activeColor: 'text-text-primary', activeBg: 'bg-surface' },
    ];

    return (
        <>
            {/* Backdrop */}
            className={cn(
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 lg:hidden",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={onClose}
            />

            {/* Side Drawer */}
            <div className={cn(
                "fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-border z-[100] transform transition-transform duration-300 ease-out lg:hidden",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <Logo />
                    <button onClick={onClose} className="p-2 -mr-2 text-text-secondary hover:text-text-primary">
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium group",
                                    isActive
                                        ? cn(item.activeBg, item.activeColor, "border border-transparent")
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                )}
                            >
                                <Icon size={18} className={cn(isActive ? "text-current" : item.color)} />
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
