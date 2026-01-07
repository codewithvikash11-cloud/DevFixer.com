"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Layers,
    Briefcase,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Shield
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/MobileMenu'; // Reuse logo or create custom admin one

export default function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const { logout } = useAuth();
    // const [isMobileOpen, setIsMobileOpen] = useState(false); // Controlled by parent now

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Posts', href: '/admin/posts', icon: FileText },
        { name: 'Pages', href: '/admin/pages', icon: Layers },
        { name: 'Tools', href: '/admin/tools', icon: Briefcase },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <>
            {/* Sidebar Container */}
            <aside className={`
                fixed top-16 left-0 h-[calc(100vh-4rem)] bg-panel border-r border-border z-40 transition-transform duration-300 w-64
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:static'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header - Hidden on Desktop if Navbar exists, but good to keep "Admin Panel" context somewhere. 
                        Maybe keep it simple. */}
                    <div className="p-6 border-b border-border hidden lg:flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                            <Shield size={18} />
                        </div>
                        <div>
                            <h1 className="font-black text-lg tracking-tight leading-none">Rovio Tech</h1>
                            <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-bold mt-1">Admin Panel</p>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                                        ${isActive
                                            ? 'bg-accent-primary/10 text-accent-primary shadow-sm'
                                            : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                                        }
                                    `}
                                >
                                    <item.icon size={18} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-border">
                        <div className="p-4 bg-surface rounded-xl mb-4">
                            <p className="text-xs text-text-secondary mb-2">Logged in as Admin</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-mono text-green-500">System Online</span>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
}
