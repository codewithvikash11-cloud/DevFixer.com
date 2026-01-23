import { getPosts } from '@/lib/wordpress';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import { Suspense } from 'react';

export const metadata = {
    title: 'Blog | ErrorWiki',
    description: 'Latest articles and tutorials on web development, debugging, and programming.',
};

export default async function BlogPage({ searchParams }) {
    const page = searchParams.page || 1;
    const posts = await getPosts(page);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Our Blog</h1>

            {posts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-600">No posts found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    <Suspense fallback={null}>
                        <Pagination page={page} />
                    </Suspense>
                </>
            )}
        </div>
    );
}
