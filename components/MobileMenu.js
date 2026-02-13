"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    X,
    Home,
    Terminal,
    Sparkles,
    Search,
    Grid,
    LogIn,
    UserPlus,
    BookOpen,
    Briefcase,
    ShieldCheck,
    Globe // Added Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

export default function MobileMenu({ isOpen, onClose }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            onClose();
        }
    };

    const items = [
        { label: 'Home', href: '/', icon: Home, color: 'text-text-secondary' },
        { label: 'Fix Error', href: '/fix-error', icon: Sparkles, color: 'text-accent-primary', isPrimary: true },
        { label: 'Categories', href: '/categories', icon: Grid, color: 'text-text-secondary' },
        { label: 'Search', href: '/search', icon: Search, color: 'text-text-secondary' },
        { label: 'Browse Solutions', href: '/errors', icon: Terminal, color: 'text-text-secondary' },
        { divider: true },
        { label: 'Snippets', href: '/snippets', icon: BookOpen, color: 'text-text-secondary' },
        { label: 'Tools', href: '/tools', icon: Briefcase, color: 'text-text-secondary' },
        { label: 'Blog', href: '/blog', icon: ShieldCheck, color: 'text-text-secondary' },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Side Drawer */}
            <div
                className={cn(
                    "fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-panel border-r border-border z-[100] transform transition-transform duration-300 ease-out lg:hidden flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
            >
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <Logo />
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-text-secondary hover:text-text-primary active:bg-surface/50 rounded-lg transition-colors"
                        aria-label="Close Menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Mobile Search */}
                <div className="p-5 pb-2">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
                        <input
                            type="search"
                            placeholder="Search errors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 bg-surface border border-border rounded-xl text-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all"
                        />
                    </form>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
                    {items.map((item, index) => {
                        if (item.divider) {
                            return <div key={index} className="h-px bg-border my-2 mx-2" />;
                        }

                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        const isPrimary = item.isPrimary;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all font-medium group select-none",
                                    isActive
                                        ? "bg-accent-primary/10 text-accent-primary font-bold"
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary",
                                    isPrimary && !isActive && "text-accent-primary bg-accent-primary/5 hover:bg-accent-primary/10"
                                )}
                            >
                                <Icon
                                    size={20}
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-accent-primary" : item.color,
                                        isPrimary && "text-accent-primary"
                                    )}
                                />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="p-5 border-t border-border space-y-3 bg-surface/30">
                    {!user ? (
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="flex items-center justify-center py-2.5 rounded-lg border border-border bg-surface hover:bg-surface-hover text-text-primary font-bold text-sm transition-colors"
                            >
                                <LogIn size={16} className="mr-2" />
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                onClick={onClose}
                                className="flex items-center justify-center py-2.5 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 font-bold text-sm transition-colors shadow-sm"
                            >
                                <UserPlus size={16} className="mr-2" />
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold text-xs">
                                {user.name?.[0] || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-text-primary truncate">{user.name || 'User'}</p>
                                <p className="text-xs text-text-secondary truncate">{user.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
