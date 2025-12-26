"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Command, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar = ({ onMenuClick, isSidebarOpen }) => {
    const pathname = usePathname();
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
                ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
                : "bg-transparent border-b border-transparent"
        )}>
            <div className="h-full px-4 md:px-8 flex items-center justify-between gap-4 max-w-[1920px] mx-auto relative">

                {/* Mobile Search Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center px-4 gap-3 md:hidden transition-all duration-300",
                    isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="p-1.5 -ml-2 hover:bg-white/5 rounded-lg text-text-secondary"
                    >
                        <X size={18} />
                    </button>
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-9 pl-3 pr-9 bg-panel border border-border rounded-lg text-xs outline-none focus:border-accent-blue"
                        />
                        <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-accent-blue">
                            <Search size={14} />
                        </button>
                    </form>
                </div>

                {/* Left Section: Menu & Logo */}
                <div className={cn("flex items-center gap-4 lg:gap-8", isSearchOpen && "md:flex hidden")}>
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 lg:hidden hover:bg-white/5 rounded-xl text-text-secondary transition-all active:scale-90"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                    </Link>
                </div>

                {/* Center Section: Desktop Search */}
                <div className="hidden md:block flex-1 max-w-xl px-4 lg:px-8">
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-accent-blue" size={14} />
                        <input
                            type="text"
                            placeholder="Search errors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-8 md:h-9 pl-9 pr-9 bg-panel border border-border rounded-lg text-xs transition-all focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 outline-none text-text-primary placeholder:text-text-secondary/50 group-hover:border-border/80"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-background border border-border text-[9px] font-bold text-text-secondary uppercase select-none">
                            <Command size={8} />
                            <span>K</span>
                        </div>
                    </form>
                </div>

                {/* Right Section: Mobile Search Toggle & Theme & Auth */}
                <div className={cn("flex items-center gap-2 md:gap-4", isSearchOpen && "md:flex hidden")}>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2 md:hidden hover:bg-white/5 rounded-xl text-text-secondary"
                    >
                        <Search size={22} />
                    </button>
                    <ThemeToggle />

                    {/* Auth UI */}
                    {user ? (
                        <div className="flex items-center gap-2 pl-2 border-l border-border/50">
                            <Link href="/dashboard" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-[10px] font-black uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-all">
                                Dashboard
                            </Link>
                            <button onClick={logout} className="p-2 hover:bg-white/5 rounded-lg text-text-secondary" title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 pl-2 border-l border-border/50">
                            <Link href="/login" className="hidden md:block text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">
                                Log In
                            </Link>
                            <Link href="/signup" className="px-4 py-2 rounded-lg bg-accent-blue text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent-blue/20">
                                Join
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
