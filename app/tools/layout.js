"use client";

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import ToolsSidebar from '@/components/tools/ToolsSidebar';
import { Menu, X, Command } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ToolsLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <LayoutWrapper>
            <div className="flex min-h-screen bg-background">
                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-200"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Mobile Sidebar (Drawer) */}
                <div className={`
                    fixed inset-y-0 left-0 w-[280px] sm:w-[320px] bg-background border-r border-border 
                    transform transition-transform duration-300 ease-in-out z-[70] lg:hidden shadow-2xl
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <span className="font-bold text-lg text-text-primary">Tools Navigation</span>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 rounded-lg hover:bg-surface-highlight text-text-secondary transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-thin">
                            <ToolsSidebar onItemClick={() => setIsSidebarOpen(false)} />
                        </div>
                    </div>
                </div>

                {/* Desktop Sticky Sidebar */}
                <div className="hidden lg:block w-72 flex-shrink-0 border-r border-border bg-surface/30 backdrop-blur-xl sticky top-[64px] h-[calc(100vh-64px)] overflow-hidden z-30">
                    <div className="h-full overflow-y-auto scrollbar-thin">
                        <ToolsSidebar />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile Header */}
                    <div className="lg:hidden sticky top-[64px] z-20 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 -ml-2 rounded-lg hover:bg-surface-highlight text-text-secondary hover:text-text-primary transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                            <span className="font-bold text-sm text-text-primary">All Tools</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-tertiary">
                            <Command size={12} />
                        </div>
                    </div>

                    <main className="flex-1 p-4 md:p-8 lg:px-12 lg:py-10 max-w-[1600px] w-full mx-auto">
                        {children}
                    </main>
                </div>
            </div>
        </LayoutWrapper>
    );
}
