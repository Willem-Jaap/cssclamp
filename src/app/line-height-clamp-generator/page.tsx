import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';

import { pageMetadata } from '~/lib/site';

const description =
    'Generate a fluid line height with CSS clamp(). Tighten line spacing on phones, open it up on wide screens and preview the paragraph at any width.';

const faq: FaqItem[] = [
    {
        question: 'Can I use clamp() for line-height?',
        answer: 'Yes. line-height accepts lengths, so a clamp() value like clamp(1.5rem, 1.375rem + 0.521vw, 2rem) works in every current browser. The line height then grows smoothly with the screen width.',
    },
    {
        question: 'Should line height be unitless or a length?',
        answer: 'A unitless line height like 1.5 scales with the font size and is inherited as a ratio, which is the safe default. A clamp() length gives you control over the spacing per screen width, but it is inherited as a fixed value, so set it on the elements that need it rather than on the body of a page with mixed font sizes.',
    },
    {
        question: 'Why would line height change with the screen width?',
        answer: 'Line length changes with the screen. Long lines on a wide screen need more space between them so the eye can find the start of the next line, while short lines on a phone read well with tighter spacing.',
    },
    {
        question: 'What if my font size is fluid too?',
        answer: 'If only the font size changes, a unitless line height is usually enough because it follows the font size. Use a fluid line height when you want the ratio itself to change, for example 1.3 on phones and 1.6 on desktops.',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="Line height clamp() generator"
            lede="Line spacing that opens up as lines get longer."
            description={description}
            path="/line-height-clamp-generator"
            defaults={{ property: 'line-height', minimumValue: 1.5, maximumValue: 2 }}
            faq={faq}>
            <section>
                <h2>Fluid line height with clamp()</h2>
                <p>
                    The preview sets a fixed font size of 1.25rem and applies the clamp() value to
                    its line height. At 1.5rem to 2rem, that is a ratio of 1.2 on a phone and 1.6 on
                    a wide screen. Drag the screen width to see the paragraph breathe as the lines
                    get longer.
                </p>
                <p>
                    With the default range of 384px to 1920px, the value is{' '}
                    <code>clamp(1.5rem, 1.375rem + 0.521vw, 2rem)</code>.
                </p>
            </section>
            <section>
                <h2>When to use it</h2>
                <ul>
                    <li>
                        Long-form text whose line length changes a lot between phone and desktop.
                    </li>
                    <li>Large headings that need tight spacing on small screens.</li>
                    <li>
                        Keep a unitless line height for everything else. It is simpler and scales
                        with the font size on its own.
                    </li>
                    <li>
                        Limit the line length with <code>max-width: 70ch</code> too. It does more
                        for readability than any line height.
                    </li>
                </ul>
            </section>
            <section>
                <h2>More fluid typography</h2>
                <p>
                    Pair this with a fluid font size from the{' '}
                    <Link href="/font-size-clamp-generator">font size generator</Link>, or read the{' '}
                    <Link href="/fluid-typography-accessibility">
                        fluid typography accessibility
                    </Link>{' '}
                    guide before you ship.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Line Height Clamp Generator – Fluid line-height in CSS',
    description,
    path: '/line-height-clamp-generator',
});

export default Page;
