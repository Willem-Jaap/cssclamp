import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';

import { pageMetadata } from '~/lib/site';

const description =
    'Generate a responsive font size with CSS clamp(). Set the smallest and largest font size, preview the text at any screen width and copy the fluid typography CSS.';

const faq: FaqItem[] = [
    {
        question: 'How do I make a font size responsive with clamp()?',
        answer: 'Set font-size to a clamp() value with a minimum, a preferred value that contains vw and a maximum, for example font-size: clamp(1rem, 0.625rem + 1.563vw, 2.5rem). The text then grows smoothly with the screen instead of jumping at breakpoints.',
    },
    {
        question: 'What is a good minimum and maximum font size?',
        answer: 'Body text works well from 16px to 18px (1rem to 1.125rem). Headings can grow more: an h1 from about 36px on phones to 64px on desktops is common. Keep the maximum within about 2.5 times the minimum so the text still scales with browser zoom.',
    },
    {
        question: 'Should the font size clamp use vw or rem?',
        answer: 'Both. The minimum, maximum and intercept should be rem so the text respects the user’s font size setting, and the part that grows should be vw so it follows the screen width.',
    },
    {
        question: 'How do I create a fluid type scale?',
        answer: 'Give every heading level and body text its own mobile and desktop size, and generate a clamp() value for each with the same viewport range. The examples page has a complete scale for h1 to h6 and body text that you can copy.',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="Font size clamp() generator"
            lede="Fluid typography that scales smoothly between two screen widths."
            description={description}
            path="/font-size-clamp-generator"
            defaults={{ previewMode: 'text', minimumValue: 1, maximumValue: 3 }}
            faq={faq}>
            <section>
                <h2>Fluid typography with clamp()</h2>
                <p>
                    A fixed font size is either too small on a phone or too big on a desktop, and
                    media queries only fix that at a few breakpoints. A clamp() font size grows in a
                    straight line between a minimum and a maximum, so the text fits every screen
                    width, not just the ones you designed for.
                </p>
                <p>
                    Set the smallest and largest size above, pick the viewport range where the text
                    should grow, and drag the screen width to check the result before you copy it.
                </p>
            </section>
            <section>
                <h2>Tips for fluid font sizes</h2>
                <ul>
                    <li>Keep body text almost fixed and let headings do the growing.</li>
                    <li>Pair large fluid headings with a tighter line height, around 1.1.</li>
                    <li>Test the largest heading at 200% browser zoom.</li>
                    <li>
                        Use the same viewport range for every step of your type scale, so they grow
                        in step.
                    </li>
                </ul>
            </section>
            <section>
                <h2>Use it in your project</h2>
                <p>
                    Paste the value into <code>font-size</code>, a custom property, or a Tailwind
                    theme token. The <Link href="/tailwind">Tailwind CSS clamp() guide</Link> shows
                    how, and the <Link href="/examples">examples</Link> include a complete fluid
                    type scale.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Font Size Clamp Generator – Responsive Fluid Typography',
    description,
    path: '/font-size-clamp-generator',
});

export default Page;
