import { getPageBySlug } from '@/lib/wordpress';
import PageLayout from '@/components/PageLayout';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    const page = await getPageBySlug('disclaimer');
    if (!page) return { title: 'Disclaimer' };

    return {
        title: page.title.rendered,
        description: 'Disclaimer for Dev Fixer usage.',
    };
}

export default async function DisclaimerPage() {
    const page = await getPageBySlug('disclaimer');

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
