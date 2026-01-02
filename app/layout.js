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
        default: 'CodeOrbit - The Ultimate Developer Playground',
        template: '%s | CodeOrbit'
    },
    description: 'Build, compile, and debug code instantly. The all-in-one developer platform for HTML, CSS, JavaScript, and more.',
    keywords: ['online compiler', 'code playground', 'web development', 'codeorbit', 'developer tools'],
    authors: [{ name: 'CodeOrbit Team' }],
    creator: 'CodeOrbit',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://codeorbit.dev',
        siteName: 'CodeOrbit',
        title: 'CodeOrbit - Build Faster',
        description: 'The ultimate developer playground.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'CodeOrbit Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CodeOrbit',
        description: 'Build code faster than ever.',
        creator: '@codeorbit',
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
