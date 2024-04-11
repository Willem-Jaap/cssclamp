import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import Footer from '~/components/layout/footer';
import Header from '~/components/layout/header';

import { albertSansFont } from '~/fonts';

import '~/styles/global.css';

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={`${albertSansFont.variable}`}>
            <body className="overflow-x-hidden bg-neutral-50 font-sans text-neutral-950">
                <Header />
                <div className="mt-20 flex flex-col gap-4 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] md:mx-auto md:max-w-[120rem] md:gap-8">
                    {children}
                </div>
                <Footer />
                <Analytics />
            </body>
        </html>
    );
};

export const metadata: Metadata = {
    title: 'CSS Clamp - The best CSS clamping tool for spacing and typography',
    description:
        'Create easy clamping for margins, paddings and typography with CSS & Tailwind output',
    keywords: ['css', 'clamp', 'tailwind', 'spacing', 'typography'],
};

export default RootLayout;
