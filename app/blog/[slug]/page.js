import { getPostBySlug } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft } from 'lucide-react';
import '@/app/globals.css'; // Ensure global styles are available

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found - ErrorWiki',
        };
    }

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
        title: `${post.title.rendered} - ErrorWiki`,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
        openGraph: {
            title: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
            type: 'article',
            publishedTime: post.date,
            images: featuredMedia ? [{ url: featuredMedia }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
            images: featuredMedia ? [featuredMedia] : [],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url;
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title.rendered,
        image: imageUrl ? [imageUrl] : [],
        datePublished: post.date,
        dateModified: post.modified,
        author: {
            '@type': 'Person',
            name: post._embedded?.author?.[0]?.name || 'ErrorWiki Team', // Fallback if author not embedded
        },
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="container mx-auto px-4 max-w-4xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-400 hover:text-blue-400 mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>

                <header className="mb-12 text-center">
                    {/* Categories */}
                    <div className="flex justify-center gap-2 mb-6">
                        {post._embedded?.['wp:term']?.[0]?.map(term => (
                            <span key={term.id} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                                {term.name}
                            </span>
                        ))}
                    </div>

                    <h1
                        className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl leading-tight"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <div className="flex items-center justify-center text-gray-400 mb-8">
                        <Calendar className="mr-2 h-5 w-5" />
                        <time className="text-lg">{date}</time>
                        {post._embedded?.author?.[0] && (
                            <>
                                <span className="mx-3">•</span>
                                <span>By {post._embedded.author[0].name}</span>
                            </>
                        )}
                    </div>

                    {imageUrl && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                            <Image
                                src={imageUrl}
                                alt={post.title.rendered}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div
                    className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </article>
        </div>
    );
}
