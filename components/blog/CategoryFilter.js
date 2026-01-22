'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');

    const handleCategoryChange = (categoryId) => {
        const params = new URLSearchParams(searchParams);
        if (categoryId) {
            params.set('category', categoryId);
            params.delete('page'); // Reset to page 1 on category change
        } else {
            params.delete('category');
            params.delete('page');
        }
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!currentCategory
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentCategory === String(category.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
