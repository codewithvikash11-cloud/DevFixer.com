import { getPageBySlug } from '@/lib/wordpress';
import PageLayout from '@/components/PageLayout';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    const page = await getPageBySlug('contact');
    if (!page) return { title: 'Contact Us' };

    return {
        title: page.title.rendered,
        description: page.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
        openGraph: {
            title: page.title.rendered,
            description: page.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
            type: 'website',
        },
    };
}

export default async function ContactPage() {
    const page = await getPageBySlug('contact');

    if (!page) {
        notFound();
    }

    return (
        <PageLayout
            title={page.title.rendered}
            content={page.content.rendered}
            date={page.modified}
        />
    );
}
