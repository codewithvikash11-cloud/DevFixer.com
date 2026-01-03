"use client";

import React, { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import ToolsSidebar from '@/components/tools/ToolsSidebar';
import { Menu, X } from 'lucide-react';

export default function ToolsLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <LayoutWrapper>
            <div className="flex min-h-screen bg-background">
                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`
                    fixed lg:sticky top-[64px] left-0 h-[calc(100vh-64px)] 
                    w-72 bg-surface/50 backdrop-blur-md border-r border-border 
                    transform transition-transform duration-300 ease-in-out z-50
                    lg:transform-none lg:z-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="h-full overflow-y-auto scrollbar-thin">
                        <ToolsSidebar onItemClick={() => setIsSidebarOpen(false)} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile Header for Sidebar Toggle */}
                    <div className="lg:hidden sticky top-[64px] z-30 bg-background/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 -ml-2 rounded-lg hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <span className="font-bold text-sm text-text-primary">Tools Navigation</span>
                    </div>

                    <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
        </LayoutWrapper>
    );
}
