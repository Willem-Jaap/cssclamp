import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import Footer from '~/components/layout/footer';
import Header from '~/components/layout/header';
import { robotoMonoFont, satoshiFont } from '~/fonts';
import '~/styles/global.css';

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={`${satoshiFont.variable} ${robotoMonoFont.variable}`}>
            <body className="bg-neutral-950 text-neutral-50 font-sans">
                <div className="flex flex-col gap-4 md:gap-8 m-4 md:mt-8 md:mx-auto md:max-w-[120rem] md:px-12">
                    <Header />
                    {children}
                    <Footer />
                </div>
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
