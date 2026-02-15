import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
});

import { getSettings } from '@/lib/actions/settings';

export async function generateMetadata() {
    const settings = await getSettings();
    const siteTitle = settings.siteTitle || 'ErrorWiki';
    const siteDescription = settings.siteDescription || 'Instant AI-powered solutions for technical errors.';
    const ogImage = settings.ogImage || '/og-image.jpg';

    return {
        metadataBase: new URL('https://errorwiki.com'),
        title: {
            default: siteTitle,
            template: `%s | ${siteTitle}`
        },
        description: siteDescription,
        keywords: settings.keywords ? settings.keywords.split(',').map(k => k.trim()) : ['error fixer', 'ai debugging', 'programming errors'],
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://errorwiki.com',
            siteName: siteTitle,
            title: siteTitle,
            description: siteDescription,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: siteTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: siteTitle,
            description: siteDescription,
            images: [ogImage],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

import GlobalShell from '@/components/GlobalShell';

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider>
                    <AuthProvider>
                        <GlobalShell>
                            {children}
                        </GlobalShell>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
