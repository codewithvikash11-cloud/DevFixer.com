import { getPageBySlug } from '@/lib/wordpress';
import PageLayout from '@/components/PageLayout';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    const page = await getPageBySlug('privacy-policy');
    if (!page) return { title: 'Privacy Policy' };

    return {
        title: page.title.rendered,
        description: 'Privacy Policy for Dev Fixer and ErrorWiki.',
        robots: {
            index: false, // Often privacy pages are set to noindex, but user asked for SEO. Sticking to standard for now, but keeping this option in mind.
            follow: true,
        }
    };
}

export default async function PrivacyPolicyPage() {
    const page = await getPageBySlug('privacy-policy');

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
