import { getPosts, getCategories } from '@/lib/wordpress';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import Pagination from '@/components/blog/Pagination';

export const metadata = {
    title: 'Blog - ErrorWiki',
    description: 'Latest articles, tutorials, and insights for developers.',
    openGraph: {
        title: 'Blog - ErrorWiki',
        description: 'Latest articles, tutorials, and insights for developers.',
        type: 'website',
    },
};

export default async function BlogPage({ searchParams }) {
    const page = parseInt(searchParams.page || '1', 10);
    const categoryId = searchParams.category ? parseInt(searchParams.category, 10) : null;
    const perPage = 9;

    const [categories, { posts, totalPages }] = await Promise.all([
        getCategories(),
        getPosts(page, perPage, categoryId),
    ]);

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Our Blog
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Insights, tutorials, and updates from the ErrorWiki team.
                    </p>
                </div>

                {/* Filters */}
                <CategoryFilter categories={categories} />

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-300">No posts found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
                    </div>
                )}

                {/* Pagination */}
                <Pagination currentPage={page} totalPages={totalPages} />
            </div>
        </div>
    );
}
