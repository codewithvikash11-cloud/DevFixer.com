'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ page }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(page) || 1;

    const handlePrev = () => {
        if (currentPage > 1) {
            const params = new URLSearchParams(searchParams);
            params.set('page', (currentPage - 1).toString());
            router.push(`/blog?${params.toString()}`);
        }
    };

    const handleNext = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', (currentPage + 1).toString());
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={handlePrev}
                disabled={currentPage <= 1}
                className={`px-4 py-2 rounded-md border ${currentPage <= 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Previous
            </button>
            <span className="text-gray-600 font-medium">Page {currentPage}</span>
            <button
                onClick={handleNext}
                className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50"
            >
                Next
            </button>
        </div>
    );
}
