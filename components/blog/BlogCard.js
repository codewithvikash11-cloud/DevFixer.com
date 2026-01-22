import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function BlogCard({ post }) {
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url || '/placeholder-blog.jpg'; // You might want a better placeholder
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Link href={`/blog/${post.slug}`} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={post.title.rendered}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center text-sm text-gray-400">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time>{date}</time>
                </div>

                <h3
                    className="mb-3 text-xl font-bold leading-tight text-white group-hover:text-blue-400"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div
                    className="mb-4 flex-1 text-sm leading-relaxed text-gray-400 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />

                <div className="mt-auto flex items-center text-sm font-medium text-blue-400">
                    Read Article
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
