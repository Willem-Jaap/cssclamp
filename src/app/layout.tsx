import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import Footer from '~/components/layout/footer/footer';
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
    title: {
        default: 'CSS Clamp - Responsive spacing and typography',
        template: '%s | CSS Clamp',
    },
    description:
        'A tool to help you visualize, understand and generate CSS Clamp() values for padding, margin, and font size. See a live preview, copy the code, and take control of your responsive layouts.',
    keywords: ['css', 'clamp', 'tailwind', 'spacing', 'typography'],
};

export default RootLayout;
