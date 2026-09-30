import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import Footer from '~/components/layout/footer/footer';
import Header from '~/components/layout/header';
import ThemeProvider from '~/components/layout/theme-provider';

import { albertSansFont, jetBrainsMonoFont } from '~/fonts';
import { site } from '~/lib/site';

import '~/styles/global.css';

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html
            lang="en"
            className={`${albertSansFont.variable} ${jetBrainsMonoFont.variable}`}
            suppressHydrationWarning>
            <body className="overflow-x-hidden bg-white font-sans text-neutral-950 antialiased">
                <ThemeProvider>
                    <Header />
                    <div className="mt-16 flex flex-col gap-4 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] md:mx-auto md:max-w-[120rem] md:gap-8">
                        {children}
                    </div>
                    <Footer />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
};

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: 'CSS Clamp Generator – Fluid Typography & Spacing Calculator',
        template: '%s | CSS Clamp',
    },
    description: site.description,
    applicationName: site.name,
    authors: [site.author],
    creator: site.author.name,
    openGraph: {
        type: 'website',
        siteName: site.name,
        locale: 'en_US',
        url: '/',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@WillemJaap_',
    },
};

export default RootLayout;
