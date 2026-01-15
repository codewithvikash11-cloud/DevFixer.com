import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* 404 Glitch Effect */}
                <div className="relative">
                    <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary opacity-20">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-text-primary">
                            Page Not Found
                        </h1>
                    </div>
                </div>

                <p className="text-text-secondary">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Actions */}
                <div className="grid grid-cols-1 gap-4">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-primary-hover transition-all shadow-lg shadow-accent-primary/20"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>

                    <Link
                        href="/errors"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border text-text-primary font-bold rounded-xl hover:bg-surface-highlight transition-all"
                    >
                        <Search size={20} />
                        Search Solutions
                    </Link>
                </div>
            </div>
        </div>
    );
}
