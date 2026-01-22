'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        router.push(`/blog?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-medium text-gray-400">
                    Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
                </span>
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}
