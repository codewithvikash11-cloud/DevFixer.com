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
    metadataBase: new URL('https://codeorbit.dev'),
    title: {
        default: 'Rovio Tech - The Ultimate Developer Playground',
        template: '%s | Rovio Tech'
    },
    description: 'Build, compile, and debug code instantly. The all-in-one developer platform for HTML, CSS, JavaScript, and more.',
    keywords: ['online compiler', 'code playground', 'web development', 'rovio tech', 'developer tools'],
    authors: [{ name: 'Rovio Tech Team' }],
    creator: 'Rovio Tech',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://roviotech.com',
        siteName: 'Rovio Tech',
        title: 'Rovio Tech - Build Faster',
        description: 'The ultimate developer playground.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Rovio Tech Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rovio Tech',
        description: 'Build code faster than ever.',
        creator: '@roviotech',
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
