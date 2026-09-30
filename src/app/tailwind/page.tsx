import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'How to use CSS clamp() in Tailwind CSS v4 and v3: fluid font sizes and spacing with arbitrary values, @theme tokens, tailwind.config.js and container queries.';

const faq: FaqItem[] = [
    {
        question: 'Does Tailwind CSS support clamp()?',
        answer: 'Yes. Tailwind has no built-in fluid utilities, but any clamp() value works as an arbitrary value, like text-[clamp(1rem,0.5rem+2vw,3rem)], or as a theme token. In Tailwind CSS v4 you add the token in @theme; in v3 you add it to tailwind.config.js.',
    },
    {
        question: 'How do I add a fluid font size in Tailwind CSS v4?',
        answer: 'Add a --text-* variable with a clamp() value to @theme in your CSS, for example --text-display: clamp(2.25rem, 1.667rem + 2.593vw, 4rem). Tailwind then generates a text-display utility. Add --text-display--line-height to set a matching line height.',
    },
    {
        question: 'How do I use clamp() in Tailwind CSS v3?',
        answer: 'Extend fontSize or spacing in tailwind.config.js, for example fontSize: { display: ["clamp(2.25rem, 1.667rem + 2.593vw, 4rem)", { lineHeight: "1.1" }] }. That creates text-display, and spacing entries create p-*, m-* and gap-* utilities.',
    },
    {
        question: 'Why does my arbitrary clamp() value not work in Tailwind?',
        answer: 'Class names cannot contain spaces, so write the value without them: text-[clamp(1rem,0.5rem+2vw,3rem)]. Tailwind adds the spaces around + and - for you. If Tailwind treats the value as a colour, add a type hint: text-[length:clamp(1rem,0.5rem+2vw,3rem)].',
    },
    {
        question: 'Can I use clamp() with container queries in Tailwind?',
        answer: 'Yes. Mark the parent with @container and use container query units instead of vw inside the value, for example p-[clamp(1rem,0.25rem+3.125cqi,4rem)]. The value then scales with the container instead of the whole window.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="Tailwind CSS"
            title="How to use CSS clamp() in Tailwind CSS"
            lede="Fluid font sizes and spacing in Tailwind CSS v4 and v3, from a quick arbitrary value to a full set of design tokens."
            article={{ path: '/tailwind', description }}>
            <p>
                Tailwind CSS has no fluid utilities built in, but it does not need them. A{' '}
                <code>clamp()</code> value works anywhere Tailwind accepts a length. There are three
                ways to use one, from quickest to most maintainable.
            </p>
            <p>
                All values on this page come from the <Link href="/">clamp() generator</Link>. Set
                your sizes there and paste the result into any of the examples below.
            </p>

            <h2>1. Arbitrary values</h2>
            <p>
                For a one-off, put the value in square brackets. Leave out the spaces, because a
                class name cannot contain them. Tailwind adds them back around <code>+</code> and{' '}
                <code>-</code> when it generates the CSS.
            </p>
            <pre>
                <code>{`<h1 class="text-[clamp(1.5rem,1.125rem+1.563vw,3rem)]">
    Fluid heading
</h1>

<section class="px-[clamp(1rem,0.25rem+3.125vw,4rem)]">
    Fluid page padding
</section>`}</code>
            </pre>
            <p>
                Tailwind reads a value inside <code>text-[…]</code> as a font size when it looks
                like a length. If it ever picks the wrong type, add a hint:{' '}
                <code>text-[length:clamp(1rem,0.5rem+2vw,3rem)]</code>.
            </p>
            <p>
                Arbitrary values are fine for a single element. Once you use the same value twice,
                turn it into a theme token.
            </p>

            <h2>2. Theme tokens in Tailwind CSS v4</h2>
            <p>
                Tailwind CSS v4 is configured in CSS. Every variable in <code>@theme</code> with a
                known prefix becomes a set of utilities, and clamp() values work like any other
                value.
            </p>
            <pre>
                <code>{`@import 'tailwindcss';

@theme {
    /* text-display, with its own line height */
    --text-display: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
    --text-display--line-height: 1.1;

    /* p-section, mx-section, gap-section, w-section, … */
    --spacing-section: clamp(1rem, 0.25rem + 3.125vw, 4rem);
}`}</code>
            </pre>
            <pre>
                <code>{`<section class="px-section py-section">
    <h1 class="text-display">Fluid by default</h1>
</section>`}</code>
            </pre>
            <ul>
                <li>
                    <code>--text-*</code> creates font size utilities.{' '}
                    <code>--text-*--line-height</code> pairs a line height with it.
                </li>
                <li>
                    <code>--spacing-*</code> creates padding, margin, gap, width, height and inset
                    utilities with the same name.
                </li>
                <li>
                    You can also overwrite the default steps. Redefining <code>--text-4xl</code>{' '}
                    makes every <code>text-4xl</code> in your project fluid. This site does exactly
                    that for its whole type scale.
                </li>
            </ul>

            <h3>A complete fluid type scale</h3>
            <p>
                The <Link href="/examples">examples page</Link> has a type scale for h1 to h6 and
                body text from 360px to 1440px. Drop it into <code>@theme</code> and you get{' '}
                <code>text-h1</code> through <code>text-p</code>:
            </p>
            <pre>
                <code>{`@theme {
    --text-h1: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
    --text-h2: clamp(1.875rem, 1.5rem + 1.667vw, 3rem);
    --text-h3: clamp(1.5rem, 1.25rem + 1.111vw, 2.25rem);
    --text-h4: clamp(1.25rem, 1.083rem + 0.741vw, 1.75rem);
    --text-h5: clamp(1.125rem, 1.042rem + 0.37vw, 1.375rem);
    --text-h6: clamp(1rem, 0.958rem + 0.185vw, 1.125rem);
    --text-p: clamp(1rem, 0.958rem + 0.185vw, 1.125rem);
}`}</code>
            </pre>

            <h2>3. tailwind.config.js in Tailwind CSS v3</h2>
            <p>
                In Tailwind CSS v3 the same tokens live in <code>tailwind.config.js</code>. A font
                size can be a string, or a tuple with a line height:
            </p>
            <pre>
                <code>{`/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            fontSize: {
                display: ['clamp(2.25rem, 1.667rem + 2.593vw, 4rem)', { lineHeight: '1.1' }],
            },
            spacing: {
                section: 'clamp(1rem, 0.25rem + 3.125vw, 4rem)',
            },
        },
    },
};`}</code>
            </pre>
            <p>
                That gives you the same <code>text-display</code> and <code>p-section</code>{' '}
                utilities as the v4 example.
            </p>

            <h2>Fluid values inside components</h2>
            <p>
                <code>vw</code> ties a value to the browser window. For a card that can sit in a
                narrow sidebar or a wide main column, scale with the container instead. Mark the
                parent with <code>@container</code>, which is built into Tailwind CSS v4, and swap{' '}
                <code>vw</code> for <code>cqi</code>:
            </p>
            <pre>
                <code>{`<div class="@container">
    <article class="p-[clamp(1rem,0.25rem+3.125cqi,4rem)]">
        Padding that follows the container
    </article>
</div>`}</code>
            </pre>
            <p>
                The <Link href="/deepdive">deep dive</Link> explains how container units change the
                formula.
            </p>

            <h2>Plugins</h2>
            <p>
                If you would rather write a start and end size than a full clamp() value, a plugin
                like{' '}
                <Link
                    href="https://github.com/nicolas-cusan/tailwind-clamp"
                    target="_blank"
                    rel="noreferrer">
                    tailwind-clamp
                </Link>{' '}
                calculates the formula for you. The trade-off is another dependency, and output that
                is harder to read in your stylesheet. Plain theme tokens are usually enough.
            </p>

            <h2>Tips</h2>
            <ul>
                <li>
                    Use <code>rem</code> for the bounds and the intercept, never only{' '}
                    <code>vw</code>, so text still grows when users zoom in.
                </li>
                <li>
                    Use the same viewport range for every token, so all values grow in step. The
                    generator lets you set it once.
                </li>
                <li>
                    Keep the number of tokens small. A handful of font sizes and two or three
                    spacing values cover most sites.
                </li>
                <li>
                    Keep media queries, or Tailwind’s <code>md:</code> and <code>lg:</code>{' '}
                    variants, for layout changes like switching from one column to three.
                </li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="Tailwind CSS clamp() FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Tailwind CSS clamp(): Fluid Font Sizes & Spacing (v4 and v3)',
    description,
    path: '/tailwind',
});

export default Page;
