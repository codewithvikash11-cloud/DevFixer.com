import React from 'react';
import RewritePanel from '@/components/rewrite/RewritePanel';

export default function RewritePage() {
    return (
        <div className="min-h-screen bg-background pt-20 px-4 md:px-8 lg:px-12 pb-12 flex flex-col">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-2">
                    AI Rewrite <span className="text-accent-primary">Engine</span>
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl">
                    Transform your text with professional paraphrasing and tone adjustments.
                </p>
            </header>

            <div className="flex-1 w-full max-w-7xl mx-auto">
                <RewritePanel />
            </div>
        </div>
    );
}
