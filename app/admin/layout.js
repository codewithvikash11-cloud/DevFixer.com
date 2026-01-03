"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShieldAlert,
    Users,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    Lock,
    Layout,
    FileEdit,
    Box,
    Files,
    Code,
    AlertTriangle,
    Search,
    AlertOctagon
} from 'lucide-react';
import { adminService } from '@/lib/admin-service';

// Ensure data is init
if (typeof window !== 'undefined') {
    adminService.init();
}

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Security Center', href: '/admin/security', icon: ShieldAlert },
        { type: 'divider', label: 'CMS Engine' },
        { name: 'Pages & Layout', href: '/admin/pages', icon: Layout },
        { name: 'Content Manager', href: '/admin/content', icon: FileEdit },
        { name: 'Blog Posts', href: '/admin/posts', icon: FileText },
        { type: 'divider', label: 'Platform Modules' },
        { name: 'Tools Control', href: '/admin/tools', icon: Box },
        { name: 'Docs & Sheets', href: '/admin/files', icon: Files },
        { name: 'Snippets DB', href: '/admin/snippets', icon: Code },
        { name: 'Errors DB', href: '/admin/errors', icon: AlertTriangle },
        { type: 'divider', label: 'System' },
        { name: 'Users & Roles', href: '/admin/users', icon: Users },
        { name: 'SEO Manager', href: '/admin/seo', icon: Search },
        { name: 'System Logs', href: '/admin/logs', icon: AlertOctagon },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex font-sans">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-[#222] transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:block flex flex-col
            `}>
                <div className="h-16 shrink-0 flex items-center px-6 border-b border-[#222]">
                    <div className="flex items-center gap-2 text-accent-primary">
                        <Lock size={20} />
                        <span className="font-black tracking-wider text-sm uppercase">Secure Admin</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navItems.map((item, idx) => {
                        if (item.type === 'divider') {
                            return (
                                <div key={idx} className="pt-4 pb-2 px-2 text-[10px] font-black tracking-widest text-[#444] uppercase">
                                    {item.label}
                                </div>
                            );
                        }
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all
                                    ${isActive
                                        ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20 shadow-[0_0_15px_rgba(0,255,127,0.1)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <item.icon size={16} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-[#222]">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut size={18} />
                        Logout
                    </button>
                    <div className="mt-4 px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center font-bold text-black text-xs">AD</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white">Admin User</span>
                                <span className="text-[10px] text-gray-500">Super Admin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-[#050505] flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="h-16 border-b border-[#222] bg-[#0A0A0A] flex items-center justify-between px-4 lg:hidden shrink-0">
                    <span className="font-bold text-white">Admin Panel</span>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-400">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
