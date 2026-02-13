
import React, { Suspense } from 'react'; // React is implicitly imported in Next.js pages but good for clarity
import LayoutWrapper from '@/components/LayoutWrapper';
import { getCategories } from '@/lib/wordpress';
import Link from 'next/link';
import { Tag, Code, Database, Server, Globe, Cpu, Layers } from 'lucide-react';

export const metadata = {
    title: 'Error Categories | ErrorWiki',
    description: 'Browse technical errors by category, language, or framework.',
};

// Map simpler category slugs to icons
const ICON_MAP = {
    'python': Code,
    'javascript': Code,
    'react': Code,
    'nextjs': Globe,
    'node': Server,
    'database': Database,
    'devops': Layers,
    'default': Tag
};

async function CategoriesGrid() {
    const categories = await getCategories();

    // If API fails or empty
    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-20 text-text-secondary">
                <p>No categories found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
                const Icon = ICON_MAP[cat.slug.toLowerCase()] || ICON_MAP.default;

                return (
                    <Link
                        key={cat.id}
                        href={`/errors?category=${cat.id}`} // Linking to errors page filtered by category
                        className="group p-6 rounded-2xl bg-surface border border-border hover:border-accent-primary/50 hover:bg-surface-hover transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">
                                {cat.count} Errors
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
                            {cat.name}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2">
                            {cat.description || `Browse common ${cat.name} errors and solutions.`}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
}

export default function CategoriesPage() {
    return (
        <LayoutWrapper>
            <div className="container mx-auto px-4 py-12 pb-24">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        Browse by <span className="text-accent-primary">Category</span>
                    </h1>
                    <p className="text-xl text-text-secondary">
                        Find verified solutions for your specific language or framework.
                    </p>
                </div>

                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-48 bg-surface rounded-2xl border border-border" />
                        ))}
                    </div>
                }>
                    <CategoriesGrid />
                </Suspense>
            </div>
        </LayoutWrapper>
    );
}
