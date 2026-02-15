import { getPageBySlug } from '@/lib/actions/pages';
import PageLayout from '@/components/PageLayout';

export async function generateMetadata() {
    const page = await getPageBySlug('contact');
    if (!page) return { title: 'Contact Us' };
    return { title: page.title };
}

export default async function ContactPage() {
    const page = await getPageBySlug('contact');

    if (!page) {
        return (
            <PageLayout
                title="Contact Us"
                content="<p>Email us at: contact@devfixer.com</p>"
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
