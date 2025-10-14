import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Inter, Open_Sans, Poppins, Roboto, Roboto_Mono } from 'next/font/google';

import '@/styles/global.scss';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});
const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
    variable: '--font-roboto-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Sebastian Borromeo - Computer Science Student',
    description:
        'Sebastian Borromeo is a rising fourth-year student studying Computer Science and Data Science at The Universiity of Virginia. Explore my portfolio to see my latest projects and work!',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} ${openSans.className}`} suppressHydrationWarning={true}>
                <Analytics />
                <SpeedInsights />
                <div className="grain-overlay" aria-hidden="true"></div>
                {children}
            </body>
        </html>
    );
}
