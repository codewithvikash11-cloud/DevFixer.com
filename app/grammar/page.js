import React from 'react';
import GrammarEditor from '@/components/grammar/GrammarEditor';

export default function GrammarPage() {
    return (
        <div className="min-h-screen bg-background pt-20 px-4 md:px-8 lg:px-12 pb-12 flex flex-col">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-2">
                    AI Grammar <span className="text-accent-primary">Assistant</span>
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl">
                    Perfect your writing with real-time grammar, tone, and style corrections.
                </p>
            </header>

            <div className="flex-1 w-full max-w-7xl mx-auto">
                <GrammarEditor />
            </div>
        </div>
    );
}
