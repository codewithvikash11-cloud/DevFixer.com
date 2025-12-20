import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Palette, Menu, X, Command } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const Navbar = ({ onMenuClick, isSidebarOpen }) => {
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/errors?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-16 bg-panel/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-6 z-50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-all active:scale-90"
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-accent-blue/10 border border-accent-blue/20 group-hover:scale-105 transition-transform active:scale-95">
                            <img src="/logo.png" alt="DevFixer Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-black text-xl tracking-tighter hidden sm:block bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">DevFixer</span>
                    </Link>
                </div>

                <div className="flex-1 max-w-xl px-4 md:px-8">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search errors... (⌘K)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full bg-background/50 border border-border rounded-xl py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all border-opacity-50 hover:border-accent-blue/30"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-1 px-1.5 py-0.5 bg-panel border border-border rounded text-[10px] text-text-secondary font-mono">
                            <Command size={10} />
                            <span>K</span>
                        </div>
                    </div>
                    {/* Small screen search icon */}
                    <button
                        onClick={() => router.push('/errors')}
                        className="sm:hidden p-2 text-text-secondary hover:text-text-primary ml-auto flex active:scale-90 transition-all"
                    >
                        <Search size={20} />
                    </button>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    <button
                        onClick={() => setIsThemeModalOpen(true)}
                        className="p-2 hover:bg-white/5 rounded-xl text-text-secondary hover:text-text-primary transition-all flex items-center space-x-2 active:scale-90"
                        title="Choose a theme"
                    >
                        <Palette size={20} />
                        <span className="hidden md:block text-sm font-bold tracking-tight">Theme</span>
                    </button>
                </div>
            </nav>

            {isThemeModalOpen && (
                <ThemeSelector onClose={() => setIsThemeModalOpen(false)} />
            )}
        </>
    );
};

export default Navbar;
