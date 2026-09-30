import type { Metadata } from 'next';
import Link from 'next/link';

import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const Page = () => {
    return (
        <Prose
            article={{
                path: '/deepdive',
                description:
                    'The maths behind CSS clamp(): how the slope and intercept are calculated, how the browser resolves it, zoom and accessibility, container query units and Tailwind CSS.',
            }}
            eyebrow="Deep dive"
            title="The maths and mechanics behind clamp()"
            lede="Where the numbers in a fluid value come from, how the browser resolves them, and what to watch out for with zoom, units and design tokens.">
            <h2>How the browser resolves clamp()</h2>
            <p>
                The spec defines <code>clamp()</code> as shorthand for a nested <code>min()</code>{' '}
                and <code>max()</code>:
            </p>
            <pre>
                <code>{`clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))`}</code>
            </pre>
            <p>
                The preferred value is capped by the maximum first, and the result is then raised to
                the minimum. That order matters in one edge case: if the minimum is larger than the
                maximum, the minimum wins. Nothing breaks, but the value never moves.
            </p>
            <p>
                All three arguments can be any length, percentage or number that makes sense for the
                property, and each one may itself be a calculation. That is why the preferred value
                can mix units, like <code>-0.75rem + 7.292vw</code>, without wrapping it in{' '}
                <code>calc()</code>.
            </p>

            <h2>Drawing a straight line</h2>
            <p>
                A fluid value is a straight line between two points: the minimum size at the minimum
                viewport, and the maximum size at the maximum viewport. Written as a formula, it is
                the classic <code>y = mx + b</code>:
            </p>
            <pre>
                <code>{`slope     = (maxSize - minSize) / (maxViewport - minViewport)
intercept = minSize - slope × minViewport
preferred = intercept + slope × 100vw`}</code>
            </pre>
            <p>
                The slope is how much the value grows per pixel of screen width. Because{' '}
                <code>1vw</code> is 1% of the viewport width, the slope is multiplied by 100 to turn
                it into <code>vw</code>. The intercept moves the line up or down so it passes
                exactly through the starting point.
            </p>

            <h3>A worked example</h3>
            <p>Take the generator&apos;s defaults, all in rem:</p>
            <ul>
                <li>
                    Size: <code>1rem</code> to <code>8rem</code>
                </li>
                <li>
                    Viewport: <code>24rem</code> (384px) to <code>120rem</code> (1920px)
                </li>
            </ul>
            <pre>
                <code>{`slope     = (8 - 1) / (120 - 24) = 7 / 96 ≈ 0.07292
intercept = 1 - 0.07292 × 24 = -0.75rem
preferred = -0.75rem + 7.292vw

result    = clamp(1rem, -0.75rem + 7.292vw, 8rem)`}</code>
            </pre>
            <p>You can check both ends by filling in the viewport width:</p>
            <ul>
                <li>
                    At 384px: <code>-12px + 7.292% × 384px = 16px</code>, exactly <code>1rem</code>.
                </li>
                <li>
                    At 1920px: <code>-12px + 7.292% × 1920px = 128px</code>, exactly{' '}
                    <code>8rem</code>.
                </li>
            </ul>
            <p>
                Outside that range the line keeps going, but the minimum and maximum cut it off.
                That is the whole trick.
            </p>

            <h2>Why the intercept uses rem</h2>
            <p>
                You could write a fluid value with only viewport units, like{' '}
                <code>font-size: 4vw</code>. Please don&apos;t. When someone zooms in, the page gets
                fewer CSS pixels wide, so <code>4vw</code> actually gets smaller. Their zoom is
                working against the text.
            </p>
            <p>
                Mixing units fixes most of that. The <code>rem</code> part of the preferred value
                grows with zoom and with the browser&apos;s font size setting, and the{' '}
                <code>rem</code> minimum and maximum do too. WCAG success criterion 1.4.4 asks that
                text can be resized to 200%, so for text it is worth testing at 200% zoom. A common
                rule of thumb is to keep the maximum within about 2.5 times the minimum; bigger
                ranges are more likely to stop growing with zoom before reaching 200%.
            </p>

            <h2>Viewport units and container units</h2>
            <p>
                <code>vw</code> ties a value to the whole browser window. That is right for page
                padding and headings, but not for a card that can sit in a narrow sidebar or a wide
                main column.
            </p>
            <p>
                Container query units solve this. <code>cqi</code> (or <code>cqw</code>) is 1% of
                the width of the nearest ancestor with <code>container-type: inline-size</code>.
                Swap <code>vw</code> for <code>cqi</code> and the same formula scales with the
                component instead of the window:
            </p>
            <pre>
                <code>{`.card-list {
    container-type: inline-size;
}

.card {
    padding: clamp(1rem, -0.75rem + 7.292cqi, 8rem);
}`}</code>
            </pre>
            <p>
                The generator&apos;s preview works exactly like this: the emulated screen is a
                container, so it can show what a value looks like at 1152px while your window is a
                different size.
            </p>

            <h2>Clamp in Tailwind CSS</h2>
            <p>For a one-off value, use an arbitrary value. Leave out the spaces:</p>
            <pre>
                <code>{`<section class="px-[clamp(1rem,-0.75rem+7.292vw,8rem)]">`}</code>
            </pre>
            <p>
                If you use a value more than once, make it a design token. In Tailwind CSS v4 you
                define it in your stylesheet and get a utility for free:
            </p>
            <pre>
                <code>{`@theme {
    --spacing-section: clamp(1rem, -0.75rem + 7.292vw, 8rem);
    --text-display: clamp(2.5rem, 1.875rem + 2.604vw, 5rem);
}`}</code>
            </pre>
            <pre>
                <code>{`<section class="px-section">
    <h1 class="text-display">Fluid by default</h1>
</section>`}</code>
            </pre>
            <p>This site does the same: its whole type scale is a set of clamp values.</p>

            <h2>Performance and support</h2>
            <p>
                <code>clamp()</code> is cheap. The browser only recalculates it when the viewport or
                container changes size, and it has no runtime cost of its own beyond normal layout.
                It is supported in every current browser, and has been since 2020.
            </p>

            <h2>Summary</h2>
            <ul>
                <li>A fluid value is a straight line between two points, cut off at both ends.</li>
                <li>
                    Slope = size range ÷ viewport range. Intercept = the start size minus slope ×
                    start viewport.
                </li>
                <li>
                    Use <code>rem</code> for the bounds and the intercept, and test text at 200%
                    zoom.
                </li>
                <li>
                    Use <code>cqi</code> instead of <code>vw</code> when a component should scale
                    with its container.
                </li>
            </ul>
            <p>
                Ready to try it? Open the <Link href="/">generator</Link>, or start with the{' '}
                <Link href="/guide">guide</Link> if you skipped it.
            </p>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'CSS clamp() Formula Explained: Slope, Intercept & Accessibility',
    description:
        'The maths behind CSS clamp(): how the slope and intercept are calculated, how the browser resolves it, zoom and accessibility, container query units and Tailwind CSS.',
    path: '/deepdive',
});

export default Page;
