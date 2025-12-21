import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
});

export const metadata = {
    metadataBase: new URL('https://devfixer.com'),
    title: {
        default: 'DevFixer - The Developer Error Encyclopedia',
        template: '%s | DevFixer'
    },
    description: 'Fix coding errors instantly. Search thousands of solutions for JavaScript, Python, Java, React, and more. The ultimate debugging platform.',
    keywords: ['coding errors', 'debugging', 'programming fixes', 'stack trace analysis', 'developer tools', 'javascript errors', 'python errors'],
    authors: [{ name: 'DevFixer Team' }],
    creator: 'DevFixer',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://devfixer.com',
        siteName: 'DevFixer',
        title: 'DevFixer - Fix Code Errors Faster',
        description: 'The ultimate source for developer error solutions.',
        images: [
            {
                url: '/og-image.jpg', // We should add an image eventually
                width: 1200,
                height: 630,
                alt: 'DevFixer Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DevFixer',
        description: 'Fix code errors faster than ever.',
        creator: '@devfixer',
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

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
