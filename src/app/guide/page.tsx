import type { Metadata } from 'next';
import Link from 'next/link';

import Prose from '~/components/content/prose';

import Example from '~/app/guide/example';
import { pageMetadata } from '~/lib/site';

const Page = () => {
    return (
        <Prose
            article={{
                path: '/guide',
                description:
                    'Learn how CSS clamp() works, how to read a clamp value, when to use it instead of media queries, and how to create fluid spacing and typography.',
            }}
            eyebrow="Guide"
            title="How to use CSS clamp()"
            lede="One line of CSS that scales spacing and type smoothly between two screen sizes. No breakpoints, no jumps.">
            <h2>What clamp() does</h2>
            <p>
                <code>clamp()</code> takes three values and returns the middle one, as long as it
                stays between the other two:
            </p>
            <pre>
                <code>clamp(minimum, preferred, maximum)</code>
            </pre>
            <ul>
                <li>
                    <strong>Minimum</strong>: the smallest the value is ever allowed to be.
                </li>
                <li>
                    <strong>Preferred</strong>: the value you actually want. It usually contains a
                    viewport unit like <code>vw</code>, so it grows with the screen.
                </li>
                <li>
                    <strong>Maximum</strong>: the largest the value is ever allowed to be.
                </li>
            </ul>

            <h2>Reading a clamp</h2>
            <p>Take the value this tool generates by default:</p>
            <pre>
                <code>padding: clamp(1rem, -0.75rem + 7.292vw, 8rem);</code>
            </pre>
            <p>
                On a narrow phone the preferred value is smaller than <code>1rem</code>, so the
                padding holds at <code>1rem</code>. As the screen gets wider, <code>7.292vw</code>{' '}
                grows and the padding grows with it, in a straight line. At a viewport of{' '}
                <code>120rem</code> (1920px) it reaches <code>8rem</code> and stops there.
            </p>
            <p>
                You rarely write that middle part by hand. Pick the smallest and largest value, pick
                the screen sizes where they should apply, and let the{' '}
                <Link href="/">generator</Link> do the maths. The{' '}
                <Link href="/deepdive">deep dive</Link> explains where the numbers come from.
            </p>

            <h2>See the difference</h2>
            <p>
                Both screens below get 16px of padding on small screens and 64px on large ones. The
                first uses two media queries, the second a single <code>clamp()</code>. Drag the
                slider and watch the pink area.
            </p>
            <Example />
            <p>
                The media query version jumps at 768px and 1024px and stays flat everywhere in
                between. The clamp version never jumps: every screen width gets its own padding.
            </p>

            <h2>Using the generator</h2>
            <ol>
                <li>
                    Choose <strong>Container</strong> to preview spacing, or <strong>Text</strong>{' '}
                    to preview font sizes.
                </li>
                <li>
                    Set the <strong>minimum and maximum value</strong>: the size on the smallest and
                    the largest screen.
                </li>
                <li>
                    Set the <strong>viewport range</strong>: the screen widths where the value
                    should start and stop growing. Match these to your design, for example 24rem
                    (384px) to 120rem (1920px).
                </li>
                <li>
                    Drag the <strong>screen width</strong> slider to check the result, then copy the
                    value.
                </li>
            </ol>

            <h2>When to reach for it</h2>
            <p>Clamp is at its best for values that should feel proportional to the screen:</p>
            <ul>
                <li>Page and section padding, and gaps between large blocks.</li>
                <li>Headings and display text.</li>
                <li>Gutters in grids and card layouts.</li>
            </ul>
            <p>It is less useful when:</p>
            <ul>
                <li>
                    <strong>The layout changes shape.</strong> Going from one column to three is a
                    job for a media or container query, not a fluid value.
                </li>
                <li>
                    <strong>The value is tiny.</strong> Scaling a 4px border radius to 6px is
                    invisible and only makes the code harder to read.
                </li>
                <li>
                    <strong>You need an exact value at an exact size.</strong> If a design specifies
                    24px at 768px and nothing in between, a breakpoint says that more clearly.
                </li>
            </ul>

            <h2>Tips</h2>
            <ul>
                <li>
                    Use <code>rem</code> for the minimum and maximum, so the value still respects
                    the user&apos;s font size setting.
                </li>
                <li>
                    Keep body text close to fixed. A fluid range like 1rem to 1.125rem is plenty;
                    save the big ranges for headings.
                </li>
                <li>
                    Put fluid values in variables or design tokens, so you only write each clamp
                    once.
                </li>
            </ul>

            <h2>Further reading</h2>
            <ul>
                <li>
                    <Link href="/deepdive">The deep dive</Link>: the maths, zoom and accessibility,
                    and container units.
                </li>
                <li>
                    <Link
                        href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp"
                        target="_blank"
                        rel="noreferrer">
                        clamp() on MDN
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://www.w3.org/TR/css-values-4/#comp-func"
                        target="_blank"
                        rel="noreferrer">
                        CSS Values and Units, Level 4
                    </Link>
                </li>
            </ul>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'How to Use CSS clamp() – A Practical Guide',
    description:
        'Learn how CSS clamp() works, how to read a clamp value, when to use it instead of media queries, and how to create fluid spacing and typography.',
    path: '/guide',
});

export default Page;
