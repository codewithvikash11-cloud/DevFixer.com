import React from 'react';
import HistoryTimeline from '@/components/history/HistoryTimeline';

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-background pt-20 px-4 md:px-8 lg:px-12 pb-12 flex flex-col">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-accent-primary tracking-tight mb-2">
                    Writing History
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl">
                    View your recent activity and past corrections.
                </p>
            </header>

            <div className="flex-1 w-full max-w-7xl mx-auto">
                <HistoryTimeline />
            </div>
        </div>
    );
}
