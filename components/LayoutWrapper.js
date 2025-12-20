"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const LayoutWrapper = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-background text-text-primary selection:bg-accent-blue/30 overflow-x-hidden">
            <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="pt-16 lg:pl-16 min-h-screen transition-all duration-300">
                <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
                    {children}
                </div>
            </main>

            <footer className="lg:pl-16 py-8 border-t border-border bg-panel text-center text-text-secondary text-sm">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded bg-accent-blue flex items-center justify-center text-white font-bold text-sm">
                            D
                        </div>
                        <span className="font-bold text-lg tracking-tight">DevFixer</span>
                    </div>
                    <div>
                        <p>&copy; {new Date().getFullYear()} DevFixer. All rights reserved.</p>
                        <p className="mt-2 text-xs opacity-50 font-mono">Precision coding support for modern developers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LayoutWrapper;
