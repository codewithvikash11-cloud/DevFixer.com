"use client";

import { Inter, JetBrains_Mono } from 'next/font/google';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';

// We reuse the fonts from the root layout implicitly if we import them, 
// but Next.js app router layouts nest. 
// However, since we want a distinct look or separate structure (no GlobalShell),
// we might need to override some defaults or just wrap content.

export default function AdminLayout({ children }) {
    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-background text-text-primary">
                <AdminSidebar />
                <main className="flex-1 lg:h-screen lg:overflow-y-auto bg-surface/50 pt-16 lg:pt-0">
                    <div className="container mx-auto max-w-7xl p-6 lg:p-10 animate-in fade-in duration-300">
                        {children}
                    </div>
                </main>
            </div>
        </AdminGuard>
    );
}
