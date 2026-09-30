import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';

import { pageMetadata } from '~/lib/site';

const description =
    'Generate a fluid border radius with CSS clamp(). Keep corners in proportion as cards and sections grow, and preview the radius at any screen width.';

const faq: FaqItem[] = [
    {
        question: 'Can border-radius use clamp()?',
        answer: 'Yes. border-radius accepts lengths, so a value like clamp(0.5rem, 0.25rem + 1.042vw, 1.5rem) works in every current browser, including for the individual corner properties.',
    },
    {
        question: 'Why make a border radius fluid?',
        answer: 'A radius that looks right on a small card on a phone looks too sharp on a large card on a desktop, and the other way around. A fluid radius keeps the corners in proportion to the element as it grows.',
    },
    {
        question: 'How do I keep nested corners consistent?',
        answer: 'Give the inner element the outer radius minus the padding between them: border-radius: calc(var(--radius) - var(--padding)). With fluid values for both, the nested corners stay concentric at every width. Wrap it in max(0px, …) so it never goes negative.',
    },
    {
        question: 'Should I use a percentage radius instead?',
        answer: 'A percentage radius depends on the width and height of the element, so it turns into an ellipse on rectangles. A clamp() value keeps the corners circular while still scaling with the screen.',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="Border radius clamp() generator"
            lede="Corners that stay in proportion as elements grow."
            description={description}
            path="/border-radius-clamp-generator"
            defaults={{ property: 'border-radius', minimumValue: 0.5, maximumValue: 1.5 }}
            faq={faq}>
            <section>
                <h2>A fluid border radius with clamp()</h2>
                <p>
                    Cards, images and sections get much larger on a desktop than on a phone. A fixed
                    radius that suits one size looks off at the other. The preview applies the
                    clamp() value to the radius of a large panel, so you can find a range that looks
                    right at every width.
                </p>
                <p>
                    From 8px to 24px between 384px and 1920px, the value is{' '}
                    <code>clamp(0.5rem, 0.25rem + 1.042vw, 1.5rem)</code>.
                </p>
            </section>
            <section>
                <h2>Tips</h2>
                <ul>
                    <li>
                        Keep the range small. Radius changes are easy to notice, and a 2 to 3 times
                        range is usually plenty.
                    </li>
                    <li>
                        Use one fluid radius token for large surfaces and a fixed radius for small
                        controls like buttons and inputs.
                    </li>
                    <li>
                        For nested elements, subtract the padding from the outer radius so the
                        corners stay concentric.
                    </li>
                </ul>
            </section>
            <section>
                <h2>Use it in Tailwind</h2>
                <p>
                    Pick Tailwind v4 under the result to get a <code>--radius-fluid</code> token,
                    which creates a <code>rounded-fluid</code> utility. The{' '}
                    <Link href="/tailwind">Tailwind CSS clamp() guide</Link> covers theme tokens in
                    more detail.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Border Radius Clamp Generator – Fluid Rounded Corners in CSS',
    description,
    path: '/border-radius-clamp-generator',
});

export default Page;
