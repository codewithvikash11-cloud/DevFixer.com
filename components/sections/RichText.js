import React from 'react';

export default function RichText({ data }) {
    return (
        <section className="py-12 px-4">
            <div
                className="prose prose-invert prose-lg max-w-4xl mx-auto
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-[#008000] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-code:text-[#00FF00]
                prose-pre:bg-[#111] prose-pre:border prose-pre:border-[#222] prose-pre:rounded-xl
                "
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </section>
    );
}
