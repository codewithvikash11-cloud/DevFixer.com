import React from 'react';
import DocumentsDashboard from '@/components/documents/DocumentsDashboard';

export default function DocumentsPage() {
    return (
        <div className="min-h-screen bg-background pt-20 px-4 md:px-8 lg:px-12 pb-12 flex flex-col">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-2">
                        Saved <span className="text-accent-primary">Documents</span>
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl">
                        Access and manage your saved writing projects.
                    </p>
                </div>
            </header>

            <div className="flex-1 w-full max-w-7xl mx-auto">
                <DocumentsDashboard />
            </div>
        </div>
    );
}
