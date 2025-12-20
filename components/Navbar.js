"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar = ({ onMenuClick, isSidebarOpen }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/errors?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500",
            isScrolled
                ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
                : "bg-transparent border-b border-transparent"
        )}>
            <div className="h-full px-4 md:px-8 flex items-center justify-between gap-4 max-w-[1920px] mx-auto">
                <div className="flex items-center gap-4 lg:gap-8">
                    <button
                        onClick={onMenuClick}
                        className="p-2 lg:hidden hover:bg-white/5 rounded-xl text-text-secondary transition-all active:scale-90"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                <div className="flex-1 max-w-2xl px-2">
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-accent-blue" size={18} />
                        <input
                            type="text"
                            placeholder="Search for errors, fixes, or languages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 md:h-12 pl-12 pr-12 bg-panel border-2 border-border rounded-2xl text-sm transition-all focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 outline-none text-text-primary placeholder:text-text-secondary/50 group-hover:border-border/60"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-background border border-border text-[10px] font-black text-text-secondary uppercase select-none">
                            <Command size={10} />
                            <span>K</span>
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
