import type { Metadata } from 'next';

import DashboardLayout from '~/app/examples/dashboard-layout';
import TypeScale from '~/app/examples/type-scale';

const Page = () => {
    return (
        <div className="mx-auto w-full max-w-5xl py-16 md:py-24">
            <header className="mb-16 max-w-2xl">
                <p className="text-sm font-medium text-primary-500">Examples</p>
                <h1 className="mt-3 text-4xl font-medium tracking-tight text-balance text-neutral-950">
                    Fluid values in real layouts
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-pretty text-neutral-500">
                    Each example defines a mobile and a desktop size and lets{' '}
                    <code className="font-mono text-base">clamp()</code> fill in everything between
                    360px and 1440px. Pick a screen width to see the result at that size.
                </p>
            </header>

            <section className="flex flex-col gap-8">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-medium tracking-tight text-neutral-950">
                        Fluid type scale
                    </h2>
                    <p className="mt-2 text-neutral-500">
                        Headings h1 to h6 and body text. Large headings change a lot between mobile
                        and desktop, body text barely moves.
                    </p>
                </div>
                <TypeScale />
            </section>

            <section className="mt-24 flex flex-col gap-8">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-medium tracking-tight text-neutral-950">
                        Dashboard layout
                    </h2>
                    <p className="mt-2 text-neutral-500">
                        The striped areas are the page gutters on both sides of the content. They
                        grow with the screen together with the gaps and the card padding, so the
                        dashboard feels roomy on a desktop and never wastes space on a phone.
                    </p>
                </div>
                <DashboardLayout />
            </section>
        </div>
    );
};

export const metadata: Metadata = {
    title: 'Examples',
    description:
        'Examples of CSS clamp() in real layouts: a fluid type scale for h1 to h6 and body text, and a dashboard with fluid page gutters, gaps and card padding.',
};

export default Page;
