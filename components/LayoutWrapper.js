"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

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

            <main className="pt-16 md:pt-20 lg:pl-20 min-h-screen transition-all duration-300">
                <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LayoutWrapper;
