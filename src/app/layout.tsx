import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import Footer from '~/components/layout/footer';
import Header from '~/components/layout/header';

import { robotoMonoFont, satoshiFont } from '~/fonts';

import '~/styles/global.css';

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={`${satoshiFont.variable} ${robotoMonoFont.variable}`}>
            <body className="overflow-x-hidden bg-neutral-950 font-sans text-neutral-50">
                <div className="mt-[clamp(1rem,_0.8rem_+_1vw,_2rem)] flex flex-col gap-4 px-[clamp(1rem,_0.6rem_+_2vw,_3rem)] md:mx-auto md:max-w-[120rem] md:gap-8">
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
