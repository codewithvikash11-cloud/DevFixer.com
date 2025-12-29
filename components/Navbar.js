"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Command, LogOut, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar = ({ onMenuClick, isSidebarOpen }) => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const inputRef = React.useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/errors?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-500",
            isScrolled
                ? "bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/5 supports-[backdrop-filter]:bg-background/60"
                : "bg-transparent border-b border-transparent"
        )}>
            <div className="h-full px-4 md:px-8 flex items-center justify-between gap-4 max-w-[1920px] mx-auto relative">

                {/* Mobile Search Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center px-4 gap-3 md:hidden transition-all duration-300",
                    isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                    <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-text-secondary">
                        <X size={20} />
                    </button>
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-4 pr-10 bg-surface border border-border/50 rounded-xl text-sm outline-none focus:border-accent-primary"
                        />
                    </form>
                </div>

                {/* Left: Brand */}
                <div className="flex items-center gap-4 lg:gap-8">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 lg:hidden hover:bg-surface rounded-xl text-text-secondary transition-all active:scale-95"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link href="/" className="flex items-center gap-2 group">
                        <Logo />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-6 ml-4">
                        <NavLink href="/errors">Errors</NavLink>
                        <NavLink href="/languages">Languages</NavLink>
                        <NavLink href="/pricing">Pricing</NavLink>
                    </div>
                </div>

                {/* Center: Omni-Search */}
                <div className="hidden md:block flex-1 max-w-sm lg:max-w-md px-4 absolute left-1/2 -translate-x-1/2">
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary" size={16} />
                        <input
                            type="text"
                            placeholder="Search 50k+ error solutions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-12 bg-surface/50 border border-border/50 rounded-full text-sm transition-all focus:bg-background focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/10 outline-none text-text-primary placeholder:text-text-tertiary shadow-sm hover:border-border"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
                            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-panel px-1.5 font-mono text-[10px] font-medium text-text-secondary">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>
                    </form>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button onClick={() => setIsSearchOpen(true)} className="p-2 md:hidden hover:bg-surface rounded-xl text-text-secondary">
                        <Search size={22} />
                    </button>

                    <ThemeToggle />

                    <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-bold hover:bg-surface-highlight transition-all">
                                <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                                Dashboard
                            </Link>
                            <button onClick={logout} className="p-2 hover:bg-surface rounded-lg text-text-secondary transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="hidden sm:block text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
                                Log In
                            </Link>
                            <Link href="/signup" className="group relative px-5 py-2 rounded-full bg-text-primary text-background text-sm font-bold hover:shadow-lg hover:shadow-accent-primary/20 transition-all overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                <span className="relative flex items-center gap-2">
                                    Get Started <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ href, children }) => (
    <Link
        href={href}
        className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group py-1"
    >
        {children}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Link>
);

export default Navbar;
