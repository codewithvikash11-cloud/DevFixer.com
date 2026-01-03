import React from 'react';
import PlagiarismChecker from '@/components/plagiarism/PlagiarismChecker';

export default function PlagiarismPage() {
    return (
        <div className="min-h-screen bg-background pt-20 px-4 md:px-8 lg:px-12 pb-12 flex flex-col">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-2">
                    Plagiarism <span className="text-accent-primary">Checker</span>
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl">
                    Scan your text for originality and get detailed source reports.
                </p>
            </header>

            <div className="flex-1 w-full p-4">
                <PlagiarismChecker />
            </div>
        </div>
    );
}
