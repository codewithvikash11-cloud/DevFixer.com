import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
    const title = post.title.rendered;
    const excerpt = post.excerpt.rendered;
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            {imageUrl && (
                <div className="relative h-48 w-full">
                    <Image
                        src={imageUrl}
                        alt={featuredMedia?.alt_text || title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}
            <div className="p-6 flex-grow flex flex-col">
                <div className="text-sm text-gray-500 mb-2">{date}</div>
                <Link href={`/blog/${post.slug}`} className="block">
                    <h2
                        className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </Link>
                <div
                    className="text-gray-600 mb-4 flex-grow prose prose-sm max-w-none line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                />
                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block text-blue-600 font-medium hover:underline mt-auto"
                >
                    Read more &rarr;
                </Link>
            </div>
        </div>
    );
}
