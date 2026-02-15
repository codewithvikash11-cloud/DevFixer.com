import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getCategories } from '@/lib/actions/categories';
import Link from 'next/link';
import { Folder } from 'lucide-react';

export const metadata = {
    title: 'Categories | DevFixer',
    description: 'Browse solutions by category.',
};

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <LayoutWrapper>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-accent-primary">Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/errors?category=${cat.name}`} // Or separate category page if we implemented it
                            className="bg-panel border border-border p-6 rounded-xl hover:border-accent-primary transition-colors flex items-center gap-4 group"
                        >
                            <div className="p-3 bg-accent-primary/10 rounded-lg text-accent-primary group-hover:scale-110 transition-transform">
                                <Folder size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-text-primary group-hover:text-accent-primary transition-colors">{cat.name}</h3>
                                {cat.description && <p className="text-sm text-text-secondary mt-1">{cat.description}</p>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </LayoutWrapper>
    );
}
