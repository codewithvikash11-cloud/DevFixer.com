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
    Globe,
    Code,
    Network,
    Layout,
    FileJson,
    ScrollText,
    GraduationCap,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import {
    GrammarIcon,
    RewriteIcon,
    PlagiarismIcon,
    DocumentsIcon,
    HistoryIcon,
    DocsIcon,
    SheetsIcon
} from '@/components/ui/PremiumIcons';

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

    const menuItems = [
        // Explore Section
        {
            section: "Explore",
            items: [
                { name: 'Home', href: '/', icon: Home, color: 'text-text-secondary' },
                { name: 'Fix Error', href: '/fix-error', icon: Zap, color: 'text-accent-primary', desc: "AI Chatbot" },
                { name: 'Learn', href: '/learn', icon: GraduationCap, color: 'text-accent-primary', desc: "Academy" },
                { name: 'Tools Hub', href: '/tools', icon: Briefcase, color: 'text-accent-primary', desc: "Utilities" },
                { name: 'API Tester', href: '/api-tester', icon: Network, color: 'text-accent-primary', desc: "REST Client" },
                { name: 'Compiler', href: '/compiler', icon: Code, color: 'text-accent-primary', desc: "Online IDE" },
                { name: 'Errors', href: '/errors', icon: Terminal, color: 'text-accent-primary', desc: "Fix Database" },
                { name: 'Languages', href: '/languages', icon: Globe, color: 'text-accent-primary', desc: "Docs & Syntax" },
                { name: 'Dashboard', href: '/dashboard', icon: Layout, color: 'text-accent-warning', desc: "Contributor" }
            ]
        },
        // Writing Section
        {
            section: "Writing AI",
            items: [
                { name: 'Docs Editor', href: '/docs', icon: DocsIcon, color: 'text-accent-primary', desc: "Rich Text", hasCustomIcon: true },
                { name: 'Sheets Editor', href: '/sheets', icon: SheetsIcon, color: 'text-accent-primary', desc: "Spreadsheet", hasCustomIcon: true },
                { name: 'Grammar', href: '/grammar', icon: GrammarIcon, color: 'text-accent-primary', desc: "AI Correction", hasCustomIcon: true },
                { name: 'Rewrite', href: '/rewrite', icon: RewriteIcon, color: 'text-accent-primary', desc: "Paraphraser", hasCustomIcon: true },
                { name: 'Plagiarism', href: '/plagiarism', icon: PlagiarismIcon, color: 'text-accent-primary', desc: "Originality Check", hasCustomIcon: true },
                { name: 'Saved Docs', href: '/documents', icon: DocumentsIcon, color: 'text-accent-primary', desc: "My Library", hasCustomIcon: true },
                { name: 'History', href: '/history', icon: HistoryIcon, color: 'text-accent-primary', desc: "Activity Log", hasCustomIcon: true }
            ]
        },
        // Productivity Section
        {
            section: "Productivity",
            items: [
                { name: 'Log Analyzer', href: '/log-analyzer', icon: ScrollText, color: 'text-accent-primary', desc: "AI Debugger" },
                { name: 'Code Reviewer', href: '/code-reviewer', icon: ShieldCheck, color: 'text-accent-primary', desc: "Quality Audit" },
                { name: 'Snippets', href: '/snippets', icon: BookOpen, color: 'text-accent-primary', desc: "Code Library" }
            ]
        }
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
                    "fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-panel border-r border-border z-[100] transform transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
            >
                <div className="flex items-center justify-between p-5 border-b border-border bg-surface/50 backdrop-blur-md">
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
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" size={16} />
                        <input
                            type="search"
                            placeholder="Search errors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 bg-surface border border-border rounded-xl text-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all placeholder:text-text-tertiary"
                        />
                    </form>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                    {menuItems.map((section, idx) => (
                        <div key={idx}>
                            <div className="px-2 mb-2">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-text-tertiary mb-1 whitespace-nowrap">{section.section}</h2>
                                <div className="h-0.5 w-6 bg-accent-primary/50 rounded-full shadow-[0_0_8px_var(--accent-primary)]"></div>
                            </div>
                            <div className="space-y-1">
                                {section.items.map((item, index) => {
                                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className={cn(
                                                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium group select-none relative overflow-hidden",
                                                isActive
                                                    ? "bg-accent-primary/10 text-accent-primary font-bold border border-accent-primary/20"
                                                    : "text-text-secondary hover:bg-surface hover:text-text-primary border border-transparent"
                                            )}
                                        >
                                            <div className={cn(
                                                "relative z-10",
                                                isActive ? "text-accent-primary" : item.color
                                            )}>
                                                {item.hasCustomIcon ? (
                                                    <item.icon size={20} isActive={isActive} />
                                                ) : (
                                                    <item.icon size={20} />
                                                )}
                                            </div>
                                            <div className="flex flex-col relative z-10">
                                                <span className="text-sm">{item.name}</span>
                                                {item.desc && <span className="text-[10px] text-text-tertiary font-normal">{item.desc}</span>}
                                            </div>

                                            {isActive && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary"></div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="p-5 border-t border-border space-y-3 bg-surface/30 backdrop-blur-sm">
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
                                className="flex items-center justify-center py-2.5 rounded-lg bg-[#008000] text-white hover:bg-[#006600] font-bold text-sm transition-colors shadow-lg shadow-[#008000]/20"
                            >
                                <UserPlus size={16} className="mr-2" />
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold text-sm">
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
