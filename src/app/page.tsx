import type { Metadata } from 'next';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import JsonLd from '~/components/content/json-ld';
import Generator from '~/components/misc/generator';

import { guides, tools, type PageLink } from '~/lib/pages';
import { pageMetadata, site } from '~/lib/site';

const features = [
    {
        title: 'Preview at any screen width',
        text: 'Drag the screen width and watch the value change in a real, scaled browser window. What you see is exactly what the CSS does.',
    },
    {
        title: 'Font sizes and spacing',
        text: 'Switch between text and container mode to tune fluid typography, padding, margin and gaps with the same formula.',
    },
    {
        title: 'Accessible by default',
        text: 'Values are written in rem with a rem intercept, so they keep respecting browser zoom and the user’s font size setting.',
    },
];

const steps = [
    'Enter the smallest and largest size you want, for example 1rem and 3rem.',
    'Set the viewport range where the value should grow, for example 24rem (384px) to 120rem (1920px).',
    'Check the result in the preview and copy the clamp() value into your CSS or Tailwind theme.',
];

const faq: FaqItem[] = [
    {
        question: 'What is a CSS clamp() generator?',
        answer: 'A CSS clamp() generator calculates a clamp() value that grows smoothly from a minimum size on small screens to a maximum size on large screens. You enter the two sizes and the viewport range, and it returns a value like clamp(1rem, 0.5rem + 2vw, 3rem) that you can paste into any CSS property that takes a length.',
    },
    {
        question: 'How do I calculate a clamp() value?',
        answer: 'Divide the size range by the viewport range to get the slope, then subtract slope × minimum viewport from the minimum size to get the intercept. The preferred value is intercept + slope × 100vw. For 1rem to 8rem between 24rem and 120rem that gives clamp(1rem, -0.75rem + 7.292vw, 8rem). The generator does this for you.',
    },
    {
        question: 'Should I use px or rem in clamp()?',
        answer: 'Use rem for the minimum, the maximum and the intercept. rem values follow the user’s browser font size and zoom, while px values do not. You can still think in pixels: 16px is 1rem at the default font size, and the generator converts between the two.',
    },
    {
        question: 'What is the difference between clamp() and media queries?',
        answer: 'Media queries switch a value at fixed breakpoints, so it jumps from one size to the next. clamp() changes the value continuously with the screen width, so every width gets its own size. Use clamp() for sizes and spacing, and media or container queries when the layout itself changes, like going from one column to three.',
    },
    {
        question: 'Can I use clamp() for padding, margin and gap?',
        answer: 'Yes. clamp() works in any property that accepts a length, including padding, margin, gap, width, height, border-radius and line-height. Switch the generator to container mode to preview spacing instead of text.',
    },
    {
        question: 'Is clamp() supported in all browsers?',
        answer: 'Yes. clamp() is supported in every current browser, including Chrome, Edge, Firefox and Safari, and has been since 2020.',
    },
    {
        question: 'Can I use clamp() with Tailwind CSS?',
        answer: 'Yes. Use an arbitrary value like text-[clamp(1rem,0.5rem+2vw,3rem)] for a one-off, or add the value to your theme. In Tailwind CSS v4 a --text-* or --spacing-* variable in @theme creates the utilities for you. See the Tailwind CSS clamp() guide for details.',
    },
    {
        question: 'Is fluid typography accessible?',
        answer: 'It can be. Avoid font sizes in pure viewport units, because they shrink when users zoom in. Use rem for the bounds and the intercept, keep the maximum within about 2.5 times the minimum for text, and test at 200% zoom.',
    },
    {
        question: 'Which viewport widths should I use?',
        answer: 'Use the smallest and largest widths your design is made for. A common range is 360px to 1440px, or 24rem to 120rem if you want the value to keep growing on large monitors. Outside that range the value stays at the minimum or maximum.',
    },
];

const LinkGrid = ({ title, links }: { title: string; links: PageLink[] }) => (
    <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-medium tracking-tight text-neutral-950">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col gap-2 rounded-xl border border-line p-5 transition-colors hover:bg-canvas">
                    <span className="flex items-center justify-between gap-2 font-medium text-neutral-950">
                        {link.title}
                        <ArrowUpRightIcon
                            size={16}
                            className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </span>
                    <span className="text-sm leading-relaxed text-neutral-500">{link.text}</span>
                </Link>
            ))}
        </div>
    </section>
);

const Page = () => {
    return (
        <>
            <div className="flex h-[calc(100dvh-4rem)] min-h-[36rem] flex-col gap-4 py-4">
                <h1 className="sr-only">CSS clamp() generator for fluid typography and spacing</h1>
                <Generator />
            </div>

            <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 py-24">
                <section className="flex flex-col gap-10">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium text-primary-500">
                            CSS clamp() generator
                        </p>
                        <h2 className="mt-3 text-3xl font-medium tracking-tight text-balance text-neutral-950">
                            Fluid typography and spacing without media queries
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-pretty text-neutral-500">
                            One clamp() value replaces a stack of breakpoints. Pick a minimum and a
                            maximum size, and every screen width in between gets its own value.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {features.map(feature => (
                            <div key={feature.title} className="rounded-xl border border-line p-5">
                                <h3 className="font-medium text-neutral-950">{feature.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-medium tracking-tight text-neutral-950">
                            How to generate a clamp() value
                        </h2>
                        <ol className="mt-6 flex flex-col gap-4">
                            {steps.map((step, index) => (
                                <li key={step} className="flex gap-4">
                                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-canvas font-mono text-xs text-neutral-700 ring-1 ring-line">
                                        {index + 1}
                                    </span>
                                    <span className="leading-relaxed text-neutral-600">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="flex flex-col justify-center gap-3 rounded-xl bg-neutral-950 p-6 scheme-fixed dark:ring-1 dark:ring-white/10">
                        <p className="text-sm text-neutral-400">The result, ready to paste:</p>
                        <code className="font-mono text-sm leading-relaxed text-neutral-100">
                            font-size: clamp(1rem, 0.625rem + 1.563vw, 2.5rem);
                        </code>
                        <p className="text-sm text-neutral-400">
                            16px on a 384px screen, 40px on a 1920px screen, and a smooth line in
                            between.
                        </p>
                    </div>
                </section>

                <LinkGrid title="More clamp() tools" links={tools} />
                <LinkGrid title="Learn more about clamp()" links={guides} />

                <Faq items={faq} />
            </div>

            <JsonLd
                data={{
                    '@type': 'WebApplication',
                    'name': 'CSS Clamp Generator',
                    'url': site.url,
                    'description': site.description,
                    'applicationCategory': 'DeveloperApplication',
                    'operatingSystem': 'Any',
                    'browserRequirements': 'Requires JavaScript',
                    'isAccessibleForFree': true,
                    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
                    'author': { '@type': 'Person', ...site.author },
                }}
            />
        </>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'CSS Clamp Generator – Fluid Typography & Spacing Calculator',
    description:
        'Free CSS clamp() generator for fluid typography and spacing. Set a minimum and maximum size, preview it at any screen width and copy the CSS or Tailwind value.',
    path: '/',
    absoluteTitle: true,
});

export default Page;
