import { getPageBySlug } from '@/lib/actions/pages';
import PageLayout from '@/components/PageLayout';

export async function generateMetadata() {
    const page = await getPageBySlug('privacy-policy');
    if (!page) return { title: 'Privacy Policy' };
    return { title: page.title };
}

export default async function PrivacyPage() {
    const page = await getPageBySlug('privacy-policy');

    if (!page) {
        return (
            <PageLayout
                title="Privacy Policy"
                content="<p>Privacy Policy content coming soon.</p>"
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
