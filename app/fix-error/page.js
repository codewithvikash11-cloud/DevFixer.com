
'use client';

import React, { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import SolutionView from '@/components/chat/SolutionView';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function FixErrorPage() {
    const [solution, setSolution] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFixError = async (errorMessage) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ai/fix-error', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ error: errorMessage }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to generate solution');
            }

            const data = await response.json();
            setSolution(data);

            // Save to Local History
            try {
                // Dynamically import to avoid SSR issues if any, though documentService checks window
                const { documentService } = await import('@/lib/documents-local');
                documentService.addToHistory({
                    action: 'Fixed Error',
                    preview: data.title || 'Error Solution',
                    tool: 'fix-error'
                });
            } catch (err) {
                console.warn('Failed to save history', err);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerate = () => {
        setSolution(null);
        setError(null);
    };

    return (
        <LayoutWrapper>
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 md:p-8">
                {/* Hero Section (only visible when no solution) */}
                {!solution && (
                    <div className="text-center space-y-6 mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center justify-center p-3 bg-accent-primary/10 rounded-2xl mb-4 ring-1 ring-accent-primary/20">
                            <Sparkles className="w-8 h-8 text-accent-primary" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Fix your code <span className="text-accent-primary">instantly</span>.
                        </h1>
                        <p className="text-xl text-text-secondary">
                            Paste your error message, stack trace, or logs below. <br className="hidden md:block" />
                            Our AI engine will analyze it and provide a verified solution.
                        </p>
                    </div>
                )}

                {/* Error Message Display */}
                {error && (
                    <div className="w-full max-w-2xl mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Main Interaction Area */}
                <div className="w-full transition-all duration-500 ease-in-out">
                    {!solution ? (
                        <ChatInterface
                            onSubmit={handleFixError}
                            isLoading={isLoading}
                            placeholder="e.g. ReferenceError: document is not defined..."
                        />
                    ) : (
                        <SolutionView
                            solution={solution}
                            onRegenerate={handleRegenerate}
                        />
                    )}
                </div>

                {/* Footer / Trust Signals */}
                {!solution && (
                    <div className="mt-16 grid grid-cols-3 gap-8 text-center text-text-secondary opacity-50 text-sm">
                        <div>
                            <span className="block font-bold mb-1">Fast</span>
                            Instant analysis
                        </div>
                        <div>
                            <span className="block font-bold mb-1">Accurate</span>
                            Verified solutions
                        </div>
                        <div>
                            <span className="block font-bold mb-1">Secure</span>
                            Private processing
                        </div>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
