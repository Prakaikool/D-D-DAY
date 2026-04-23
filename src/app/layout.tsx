import './globals.css';
import type { Metadata } from 'next';
import { Onest, IBM_Plex_Mono } from 'next/font/google';

const onest = Onest({
    subsets: ['latin'],
    variable: '--font-onest',
    weight: ['300', '400', '500', '600', '700']
});

const mono = IBM_Plex_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
    title: 'D-D-DAY',
    description: 'Whether you arrive here on a bright day or a heavy one, I hope these tiny messages bring you something warm.',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${onest.variable} ${mono.variable}`}>
                {children}
            </body>
        </html>
    );
}
