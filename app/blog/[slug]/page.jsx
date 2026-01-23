import { getPostBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url;

    return {
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
        openGraph: {
            title: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
            images: imageUrl ? [{ url: imageUrl }] : [],
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.modified,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
            images: imageUrl ? [imageUrl] : [],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const title = post.title.rendered;
    const content = post.content.rendered;
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url;

    // JSON-LD for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        datePublished: post.date,
        dateModified: post.modified,
        image: imageUrl ? [imageUrl] : [],
        author: {
            '@type': 'Person',
            name: 'ErrorWiki Team' // Or fetch author if available
        }
    };

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="mb-8 text-center">
                <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Blog</Link>
                <h1
                    className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <div className="text-gray-500">{date}</div>
            </div>

            {imageUrl && (
                <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={imageUrl}
                        alt={featuredMedia?.alt_text || title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 900px"
                    />
                </div>
            )}

            <div
                className="prose prose-lg max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </article>
    );
}
