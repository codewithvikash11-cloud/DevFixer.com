import { getPageBySlug } from '@/lib/wordpress';
import PageLayout from '@/components/PageLayout';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    const page = await getPageBySlug('about');
    if (!page) return { title: 'About Us' };

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

export default async function AboutPage() {
    const page = await getPageBySlug('about');

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
