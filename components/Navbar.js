"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, Command, LogOut, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useNavbar } from '@/context/NavbarContext';

const Navbar = ({ onMenuClick, isSidebarOpen, centerContent: propCenter, customActions: propActions, hideSearch: propHideSearch, hideLinks: propHideLinks = false }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // ... (rest of context connection and state)
    // Context connection
    const {
        centerContent: contextCenter,
        customActions: contextActions,
        hideSearch: contextHideSearch,
        hideLinks: contextHideLinks
    } = useNavbar();

    // Prioritize props if passed (legacy/override), else use context
    const centerContent = propCenter || contextCenter;
    const customActions = propActions || contextActions;
    const hideSearch = propHideSearch || contextHideSearch;
    const hideLinks = propHideLinks || contextHideLinks;

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
            setTimeout(() => inputRef.current?.focus(), 50);
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
            "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
            isScrolled || isSearchOpen || centerContent
                ? "glass-strong border-b border-border shadow-sm"
                : "bg-transparent border-b border-transparent"
        )}>
            {/* Search Overlay Removed */}
            
            <div className={cn(
                "h-full px-4 md:px-8 flex items-center justify-between gap-4 max-w-[1920px] mx-auto relative transition-opacity duration-300"
            )}>

                {/* Left: Brand & Menu */}
                <div className="flex items-center gap-3 lg:gap-8 shrink-0">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 lg:hidden text-text-secondary hover:text-text-primary active:scale-90 transition-transform focus:outline-none focus:ring-2 focus:ring-accent-primary/20 rounded-lg"
                        aria-label="Open Menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" className="flex items-center gap-2 group shrink-0 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 rounded-lg p-1">
                        <Logo />
                    </Link>


                </div>

                {/* Center Content Empty (Removed Search Bar) */}
                <div className="hidden lg:block flex-1 max-w-sm lg:max-w-xl px-4 absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
                    <div className="pointer-events-auto inline-block w-full">
                        {centerContent && centerContent}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {customActions && (
                        <>
                            {customActions}
                            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
                        </>
                    )}

                    {/* Mobile/Tablet Search Icon Removed */}

                    <ThemeToggle />

                    {/* Authenticated State */}
                    {user ? (
                        <>
                            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
                            <div className="flex items-center gap-3">
                                <button onClick={logout} className="p-2 hover:bg-surface rounded-lg text-text-secondary transition-colors" aria-label="Log Out">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Unauthenticated State - Login / Signup */
                        <>
                            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
                            <Link
                                href="/login"
                                className="hidden sm:inline-flex px-4 py-2 text-sm font-bold text-[#008000] hover:text-[#006600] transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="hidden sm:inline-flex px-5 py-2 text-sm font-bold bg-[#008000] text-white rounded-lg hover:bg-[#006600] transition-all shadow-md shadow-[#008000]/20"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ href, children, active, isPrimary, ...props }) => (
    <Link
        href={href}
        className={cn(
            "px-3 py-2 text-sm font-medium transition-all rounded-lg relative flex items-center gap-2",
            active
                ? "text-accent-primary bg-accent-primary/5 font-bold"
                : "text-text-secondary hover:text-text-primary hover:bg-surface",
            isPrimary && "bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20",
            props.isPrimary && !active && "border border-accent-primary/20"
        )}
    >
        {isPrimary && <Sparkles className="w-4 h-4" />}
        {children}
        {active && !isPrimary && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-primary rounded-full" />
        )}
    </Link>
);

export default Navbar;
