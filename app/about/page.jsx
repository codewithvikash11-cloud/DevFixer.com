import { getPageBySlug } from '@/lib/actions/pages';
import PageLayout from '@/components/PageLayout';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    const page = await getPageBySlug('about');
    if (!page) return { title: 'About Us' };

    return {
        title: page.title,
        description: page.seoDescription || page.title,
        openGraph: {
            title: page.title,
            description: page.seoDescription || page.title,
            type: 'website',
        },
    };
}

export default async function AboutPage() {
    const page = await getPageBySlug('about');

    if (!page) {
        // Fallback for initial dev experience if DB is empty
        // notFound(); 
        return (
            <PageLayout
                title="About Us"
                content="<p>DevFixer is your AI-powered companion for debugging code.</p>"
                date={new Date().toISOString()}
            />
        );
    }

    return (
        <PageLayout
            title={page.title}
            content={page.content}
            date={page.updatedAt}
        />
    );
}
