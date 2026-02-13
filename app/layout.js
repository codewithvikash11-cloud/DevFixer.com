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

export const metadata = {
    metadataBase: new URL('https://errorwiki.com'),
    title: {
        default: 'ErrorWiki - AI Error Fixing Engine',
        template: '%s | ErrorWiki'
    },
    description: 'Instant AI-powered solutions for technical errors. Fix bugs in React, Next.js, Python, and more with verified explanations.',
    keywords: ['error fixer', 'ai debugging', 'programming errors', 'stacktrace analyzer', 'errorwiki'],
    authors: [{ name: 'ErrorWiki Team' }],
    creator: 'ErrorWiki',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://errorwiki.com',
        siteName: 'ErrorWiki',
        title: 'ErrorWiki - Build Faster',
        description: 'The ultimate developer playground.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'ErrorWiki Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ErrorWiki',
        description: 'Build code faster than ever.',
        creator: '@errorwiki',
    },
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

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
