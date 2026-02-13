
import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
    title: 'Terms of Service | ErrorWiki',
    description: 'Terms and conditions for using the ErrorWiki platform.',
};

export default function TermsPage() {
    return (
        <LayoutWrapper>
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
                    <p>Welcome to ErrorWiki. By using our website, you agree to these terms.</p>

                    <h2 className="text-2xl font-bold text-text-primary">1. Use of AI Solutions</h2>
                    <p>
                        Our platform provides AI-generated programming solutions. While we strive for accuracy, code solutions
                        should be verified before use in production environments. We are not liable for any damages
                        resulting from the use of code provided on this platform.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary">2. User Content</h2>
                    <p>
                        Any error logs or snippets you submit may be processed by our AI systems to generate solutions.
                        Please ensure you do not submit sensitive data, credentials, or proprietary code.
                    </p>

                    <h2 className="text-2xl font-bold text-text-primary">3. Disclaimer</h2>
                    <p>
                        The services are provided "as is" without warranties of any kind.
                    </p>
                </div>
            </div>
        </LayoutWrapper>
    );
}
