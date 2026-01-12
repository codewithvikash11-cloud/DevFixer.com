import React from 'react';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.seoTitle || post.title} | ErrorWiki`,
        description: post.seoDescription || post.description,
    };
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* We are manually including Navbar here since layout wrappers might assume strict structure, 
              but usually main layout handles it. 
              Checking User Request "Public Post Page" -> /post/[slug] 
              We will rely on Global Layout for Navbar/Footer if it wraps all children.
              Assuming app/layout.js wraps everything.
          */}

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-sm text-text-secondary hover:text-accent-primary mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Home
                </Link>

                <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <Tag size={12} />
                            {post.category || 'Programming'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>{post.authorName || 'ErrorWiki Team'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image Placeholder (Optional) */}
                    <div className="w-full h-64 md:h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl mb-12 flex items-center justify-center border border-border">
                        <span className="text-gray-600 font-bold text-lg">Featured Image</span>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent-primary prose-img:rounded-2xl">
                        {/* 
                            For now, we render plain text with basic line breaks as "markdown"
                            In a real app, use react-markdown or similar.
                            The user asked for "Formatted article preview" in admin, implies markdown or html.
                            We will split by newline for basic structure.
                         */}
                        {post.content.split('\n').map((line, i) => {
                            if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>;
                            if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
                            if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
                            if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
                            if (line === '') return <br key={i} />;
                            return <p key={i}>{line}</p>;
                        })}
                    </div>
                </article>
            </main>
        </div>
    );
}
