import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';

import { pageMetadata } from '~/lib/site';

const description =
    'Generate fluid padding, margin and gap values with CSS clamp(). Set the smallest and largest spacing, preview it at any screen width and copy the CSS.';

const faq: FaqItem[] = [
    {
        question: 'How do I make padding responsive without media queries?',
        answer: 'Use a clamp() value for padding, for example padding-inline: clamp(1rem, 0.25rem + 3.125vw, 4rem). The padding is 16px on small screens, 64px on large screens and grows smoothly in between.',
    },
    {
        question: 'Can I use clamp() for margin and gap?',
        answer: 'Yes. clamp() works for margin, gap, row-gap, column-gap and any other property that takes a length. Using the same fluid tokens for padding and gaps keeps the rhythm of a layout consistent at every width.',
    },
    {
        question: 'What is fluid spacing?',
        answer: 'Fluid spacing is spacing that scales with the screen instead of switching at breakpoints. Page gutters, section padding and grid gaps get more room on large screens and tighten up on small ones, without any media queries.',
    },
    {
        question: 'Should spacing use vw or container query units?',
        answer: 'Use vw for page-level spacing like gutters and section padding. Use cqi for spacing inside components that appear in containers of different widths, like cards in a sidebar and in a main column.',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="Spacing clamp() generator"
            lede="Fluid padding, margin and gaps that scale with the screen."
            description={description}
            path="/spacing-clamp-generator"
            defaults={{ previewMode: 'container', minimumValue: 1, maximumValue: 4 }}
            faq={faq}>
            <section>
                <h2>Fluid spacing with clamp()</h2>
                <p>
                    Spacing that looks generous on a desktop wastes space on a phone, and spacing
                    that fits a phone feels cramped on a large monitor. A clamp() value gives page
                    gutters, section padding and gaps a size that fits every screen width.
                </p>
                <p>
                    The preview shows the value as the margin on both sides of a box. Set the
                    smallest and largest size, drag the screen width and copy the result.
                </p>
            </section>
            <section>
                <h2>Where to use fluid spacing</h2>
                <ul>
                    <li>Page gutters: the padding on both sides of your content.</li>
                    <li>Section padding between large blocks of a page.</li>
                    <li>Gaps in grids and card layouts.</li>
                    <li>Padding inside cards, with container query units.</li>
                </ul>
            </section>
            <section>
                <h2>Use it in your project</h2>
                <p>
                    Three tokens cover most layouts: a page gutter, a gap and a card padding. The{' '}
                    <Link href="/examples">dashboard example</Link> shows them working together, and
                    the <Link href="/tailwind">Tailwind CSS clamp() guide</Link> shows how to turn
                    them into utilities.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Spacing Clamp Generator – Fluid Padding, Margin & Gap',
    description,
    path: '/spacing-clamp-generator',
});

export default Page;
