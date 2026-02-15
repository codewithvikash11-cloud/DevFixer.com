import { getPageBySlug } from '@/lib/actions/pages';
import PageLayout from '@/components/PageLayout';

export async function generateMetadata() {
    const page = await getPageBySlug('disclaimer');
    if (!page) return { title: 'Disclaimer' };
    return { title: page.title };
}

export default async function DisclaimerPage() {
    const page = await getPageBySlug('disclaimer');

    if (!page) {
        return (
            <PageLayout
                title="Disclaimer"
                content="<p>Disclaimer content coming soon.</p>"
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
