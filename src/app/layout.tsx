import type { Metadata } from 'next';
import { Inter, Poppins, Roboto, Roboto_Mono } from 'next/font/google';

import '@/styles/global.scss';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500'],
    subsets: ['latin'],
});

const roboto = Roboto_Mono({
    variable: '--font-roboto-mono',
    weight: '400',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Sebastian Borromeo - Computer Science Student',
    description:
        'Sebastian Borromeo is a rising fourth-year student studying Computer Science and Data Science at The Universiity of Virginia. Explore my portfolio to see my latest projects and work!',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className='no-doc-scroll'>
            <body className={`${poppins.variable} ${inter.className}`} suppressHydrationWarning={true}>
                <div className="grain-overlay" aria-hidden="true"></div>
                {children}
            </body>
        </html>
    );
}
