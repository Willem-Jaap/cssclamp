import type { Metadata } from 'next';

import TypeScale from '~/app/examples/type-scale';

const Page = () => {
    return (
        <div className="mx-auto w-full max-w-5xl py-16 md:py-24">
            <header className="mb-12 max-w-2xl">
                <p className="text-sm font-medium text-primary-500">Examples</p>
                <h1 className="mt-3 text-4xl font-medium tracking-tight text-balance text-neutral-950">
                    A fluid type scale
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-pretty text-neutral-500">
                    Headings h1 to h6 and body text, each defined by a mobile and a desktop size.
                    Everything in between is filled in by{' '}
                    <code className="font-mono text-base">clamp()</code>. Pick a screen width to see
                    the whole scale at that size.
                </p>
            </header>
            <TypeScale />
        </div>
    );
};

export const metadata: Metadata = {
    title: 'Examples',
    description:
        'A fluid typography scale for h1 to h6 and body text built with CSS clamp(), with mobile and desktop sizes and copyable custom properties.',
};

export default Page;
