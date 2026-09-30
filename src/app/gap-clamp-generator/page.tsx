import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';

import { pageMetadata } from '~/lib/site';

const description =
    'Generate a fluid grid and flexbox gap with CSS clamp(). Tight gutters on phones, roomy ones on desktops, previewed live in a grid at any screen width.';

const faq: FaqItem[] = [
    {
        question: 'Does gap work with clamp()?',
        answer: 'Yes. gap, row-gap and column-gap accept any length, including clamp(). It works for CSS grid and for flexbox in every current browser.',
    },
    {
        question: 'Should gap use vw or percentages?',
        answer: 'Use a clamp() with a vw part. Percentages in gap resolve against the container and behave differently for rows and columns, while a clamp() gives you a predictable minimum and maximum in rem.',
    },
    {
        question: 'Can rows and columns have different fluid gaps?',
        answer: 'Yes. Set row-gap and column-gap separately, or write gap with two values: gap: clamp(1rem, 0.5rem + 2vw, 2rem) clamp(0.75rem, 0.438rem + 1.302vw, 2rem). The first value is the row gap.',
    },
    {
        question: 'How do gap and padding relate?',
        answer: 'Use the same fluid token, or a fixed ratio between them, for the page gutter, the grid gap and the card padding. The layout then keeps the same rhythm at every width. The dashboard example shows this with three tokens.',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="Gap clamp() generator"
            lede="Fluid grid and flexbox gaps that grow with the screen."
            description={description}
            path="/gap-clamp-generator"
            defaults={{ property: 'gap', minimumValue: 0.75, maximumValue: 2 }}
            faq={faq}>
            <section>
                <h2>A fluid gap for grid and flexbox</h2>
                <p>
                    Gutters that look right on a desktop waste space on a phone, and gutters sized
                    for a phone make a desktop layout feel cramped. The preview applies the clamp()
                    value as the <code>gap</code> of a three-column grid, so you can see the spacing
                    change as you drag the screen width.
                </p>
                <p>
                    From 12px to 32px between 384px and 1920px, the value is{' '}
                    <code>clamp(0.75rem, 0.438rem + 1.302vw, 2rem)</code>. Use it as{' '}
                    <code>gap</code>, <code>row-gap</code> or <code>column-gap</code> on any grid or
                    flex container.
                </p>
            </section>
            <section>
                <h2>Tips</h2>
                <ul>
                    <li>Keep gaps smaller than the page gutter, so groups read as groups.</li>
                    <li>
                        Store the value in a custom property like <code>--layout-gap</code> and
                        reuse it for grids, stacks and flex rows.
                    </li>
                    <li>
                        Inside components that move between a sidebar and a main column, swap{' '}
                        <code>vw</code> for <code>cqi</code>. See the{' '}
                        <Link href="/container-query-units">container query units guide</Link>.
                    </li>
                </ul>
            </section>
            <section>
                <h2>See it in a layout</h2>
                <p>
                    The <Link href="/examples">dashboard example</Link> combines a fluid gap with
                    fluid page gutters and card padding. For padding and margin, use the{' '}
                    <Link href="/spacing-clamp-generator">spacing generator</Link>.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Gap Clamp Generator – Fluid Grid & Flexbox Gap in CSS',
    description,
    path: '/gap-clamp-generator',
});

export default Page;
