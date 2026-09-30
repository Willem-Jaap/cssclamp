import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';
import TypeScaleGenerator from '~/components/tools/type-scale-generator';

import { pageMetadata } from '~/lib/site';

const description =
    'Generate a fluid type scale with CSS clamp(). Pick a base size and a scale ratio for mobile and desktop, preview every step and copy CSS variables or Tailwind tokens.';

const faq: FaqItem[] = [
    {
        question: 'What is a fluid type scale?',
        answer: 'A type scale is a set of font sizes where each step is the previous one multiplied by a fixed ratio. In a fluid type scale every step is a clamp() value, so the whole scale grows smoothly from a mobile size to a desktop size instead of switching at breakpoints.',
    },
    {
        question: 'Why use a different ratio on mobile and desktop?',
        answer: 'Large screens have room for more contrast between headings and body text. A smaller ratio on mobile, like 1.2, keeps headings from taking over a narrow screen, while a larger ratio on desktop, like 1.25 or 1.333, gives the page a clearer hierarchy.',
    },
    {
        question: 'Which scale ratio should I choose?',
        answer: 'For text-heavy sites and apps, a minor third (1.2) or major third (1.25) works well. Marketing pages with large display headings can use a perfect fourth (1.333) or more on desktop. Higher ratios make the largest steps grow quickly, so check them at the smallest screen width.',
    },
    {
        question: 'How many steps do I need?',
        answer: 'Most sites need one or two steps below the base for small print and captions, and four to six above it for headings. Unused steps only add noise to your design tokens.',
    },
    {
        question: 'How do I use the scale in Tailwind CSS?',
        answer: 'Pick the Tailwind v4 output. It redefines Tailwind’s own font size tokens, like --text-base and --text-2xl, inside @theme, so every text-* utility in your project becomes fluid without changing your markup.',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="Fluid type scale generator"
            lede="A complete clamp() type scale from one base size and ratio."
            description={description}
            path="/fluid-type-scale-generator"
            tool={<TypeScaleGenerator />}
            faq={faq}>
            <section>
                <h2>How the scale is built</h2>
                <p>
                    Every step is the base size multiplied by the ratio once per step. Step 1 is
                    base × ratio, step 2 is base × ratio², and steps below the base divide instead.
                    The generator does this twice, once with the mobile base and ratio and once with
                    the desktop values, and connects the two with a clamp() for each step.
                </p>
                <p>
                    With the defaults, a 16px base and a 1.2 ratio on a 360px screen, and an 18px
                    base and a 1.25 ratio on a 1440px screen, the base step and the largest step
                    are:
                </p>
                <ul>
                    <li>
                        <code>--step-0: clamp(1rem, 0.958rem + 0.185vw, 1.125rem)</code>
                    </li>
                    <li>
                        <code>--step-5: clamp(2.488rem, 2.173rem + 1.4vw, 3.433rem)</code>
                    </li>
                </ul>
                <p>
                    Body text barely moves, from 16px to 18px, while the largest heading grows from
                    about 40px to 55px. That is the point of using two ratios: the hierarchy gets
                    stronger as the screen gets wider.
                </p>
            </section>
            <section>
                <h2>Using the scale</h2>
                <p>
                    Paste the CSS variables into your stylesheet and assign them to elements, for
                    example <code>{'h1 { font-size: var(--step-5); }'}</code> and{' '}
                    <code>{'body { font-size: var(--step-0); }'}</code>. The Tailwind output
                    replaces Tailwind’s default font sizes instead, so <code>text-base</code> and{' '}
                    <code>text-4xl</code> become fluid.
                </p>
                <p>
                    Give large steps a tighter line height, around 1.1, and body text a looser one,
                    around 1.5. The <Link href="/examples">examples page</Link> shows a hand-tuned
                    scale for h1 to h6 with matching line heights.
                </p>
            </section>
            <section>
                <h2>Keep it accessible</h2>
                <p>
                    All values use rem for the minimum, maximum and intercept, so the scale follows
                    the user’s font size setting. Keep the largest step within about 2.5 times its
                    mobile size and test at 200% zoom. The{' '}
                    <Link href="/fluid-typography-accessibility">
                        fluid typography accessibility guide
                    </Link>{' '}
                    explains why.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Fluid Type Scale Generator – CSS clamp() Typography Scale',
    description,
    path: '/fluid-type-scale-generator',
});

export default Page;
