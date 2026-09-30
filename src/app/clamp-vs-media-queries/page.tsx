import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'CSS clamp() vs media queries: the same heading written both ways, when breakpoints are still the right tool, and how to combine fluid values with media queries.';

const faq: FaqItem[] = [
    {
        question: 'Is clamp() better than media queries?',
        answer: 'For sizes, usually yes. One clamp() line replaces several breakpoints and scales smoothly at every screen width. For layout changes, like going from one column to three or hiding a sidebar, media queries and container queries are still the right tool. Most sites use both.',
    },
    {
        question: 'Can clamp() replace all media queries?',
        answer: 'No. clamp() only changes a single value between a minimum and a maximum. It cannot switch a grid to a different number of columns, change the order of elements or react to things like print, hover support or prefers-reduced-motion. Media queries do all of that.',
    },
    {
        question: 'Is clamp() faster than media queries?',
        answer: 'Not in a way you will notice. Both are resolved by the browser during normal style and layout work. The real difference is maintenance: one clamp() value is less code to write and change than a base value plus two or three overrides.',
    },
    {
        question: 'Can I use clamp() inside a media query?',
        answer: 'Yes. A clamp() value works anywhere a length works, including inside a media query or container query. A common pattern is to let clamp() handle font sizes and spacing, and use media queries only to change the layout.',
    },
    {
        question: 'Should I use container queries or media queries with clamp()?',
        answer: 'Use media queries for the page layout, which depends on the window. Use container queries for components that can sit in places of different widths. With container queries you can also swap vw for cqi inside clamp(), so the value scales with the container.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="Comparison"
            title="CSS clamp() vs media queries"
            lede="Breakpoints step, clamp() slides. Here is the same heading written both ways, and when each one is the right tool."
            article={{ path: '/clamp-vs-media-queries', description }}>
            <p>
                Media queries and <code>clamp()</code> both make a page respond to the screen, but
                they do it in different ways. A media query switches between fixed values at chosen
                widths. A <code>clamp()</code> value changes continuously between a minimum and a
                maximum. They are not rivals: most sites work best with both.
            </p>

            <h2>Stepping vs scaling</h2>
            <p>
                With media queries you pick a few widths, called breakpoints, and give each range
                its own value. Between two breakpoints the value is flat. At the breakpoint it jumps
                to the next one.
            </p>
            <p>
                With <code>clamp()</code> you pick a start size and an end size, and the browser
                draws a straight line between them. Every screen width gets its own value, and
                nothing jumps. Outside the range the value holds at the minimum or maximum.
            </p>
            <p>
                The <Link href="/guide">guide</Link> has a live side-by-side demo of this: drag the
                screen width and watch the media query version jump while the clamp version slides.
            </p>

            <h2>The same heading, both ways</h2>
            <p>
                Say the design has an h1 of 36px on phones and 64px on desktops. With media queries
                you need a base value and at least one override. Two breakpoints give you a middle
                step:
            </p>
            <pre>
                <code>{`h1 {
    font-size: 2.25rem; /* 36px */
}

@media (min-width: 48rem) {
    h1 {
        font-size: 3rem; /* 48px from 768px */
    }
}

@media (min-width: 80rem) {
    h1 {
        font-size: 4rem; /* 64px from 1280px */
    }
}`}</code>
            </pre>
            <p>
                With <code>clamp()</code>, the same sizes between a 360px and a 1440px screen fit on
                one line:
            </p>
            <pre>
                <code>{`h1 {
    font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
}`}</code>
            </pre>
            <p>Compare what each version gives you at a few widths:</p>
            <ul>
                <li>
                    <strong>767px</strong>: 36px with media queries, about 46.5px with clamp.
                </li>
                <li>
                    <strong>768px</strong>: 48px with media queries, about 46.6px with clamp.
                </li>
                <li>
                    <strong>1279px</strong>: 48px with media queries, about 59.8px with clamp.
                </li>
                <li>
                    <strong>1440px</strong>: 64px with both.
                </li>
            </ul>
            <p>
                The media query version jumps by 12px when the window grows by a single pixel, and
                then stays at 48px for over 500px of screen width. The clamp version moves a
                fraction of a pixel at a time. Both end at the same sizes, but only one of them
                looks right on a tablet in landscape or a narrow desktop window.
            </p>
            <p>
                You do not have to work out the middle part yourself. Enter the sizes and the
                viewport range in the <Link href="/">clamp() generator</Link> and copy the result.
            </p>

            <h2>When media queries are still the right tool</h2>
            <p>
                <code>clamp()</code> changes one value within a range. It cannot change the shape of
                a layout. Keep media queries, or container queries, for:
            </p>
            <ul>
                <li>
                    <strong>Layout changes.</strong> Going from one column to three, moving a
                    sidebar below the content or switching a menu to a drawer.
                </li>
                <li>
                    <strong>Showing and hiding things.</strong> A value that is either on or off has
                    no in-between to scale through.
                </li>
                <li>
                    <strong>Exact values at exact sizes.</strong> If the design says 24px at 768px
                    and 32px at 1024px, and nothing in between, a breakpoint says that more clearly.
                </li>
                <li>
                    <strong>Anything that is not about width.</strong> Media queries also react to{' '}
                    <code>prefers-reduced-motion</code>, <code>prefers-color-scheme</code>,{' '}
                    <code>hover</code>, <code>orientation</code> and <code>print</code>. clamp() has
                    no equivalent.
                </li>
            </ul>

            <h3>Container queries</h3>
            <p>
                Container queries work like media queries, but they look at the width of a parent
                element instead of the window. They are the better choice for components that can
                appear in places of different widths, like a card in a sidebar and in a main column:
            </p>
            <pre>
                <code>{`.card-list {
    container-type: inline-size;
}

.card {
    display: grid;
    gap: 1rem;
}

@container (min-width: 32rem) {
    .card {
        grid-template-columns: 12rem 1fr;
    }
}`}</code>
            </pre>
            <p>
                The same idea works for fluid values: swap <code>vw</code> for <code>cqi</code>{' '}
                inside <code>clamp()</code> and the value follows the container. The{' '}
                <Link href="/container-query-units">container query units guide</Link> covers that
                in detail.
            </p>

            <h2>Combining both</h2>
            <p>
                The split that works on most sites is simple: media queries change the layout,{' '}
                <code>clamp()</code> changes the sizes. You end up with a handful of breakpoints for
                structure, and no breakpoints at all for font sizes, padding and gaps.
            </p>
            <pre>
                <code>{`:root {
    --gutter: clamp(1rem, 0.625rem + 1.563vw, 2.5rem);
}

.page {
    display: grid;
    gap: var(--gutter);
    padding-inline: var(--gutter);
}

@media (min-width: 64rem) {
    .page {
        grid-template-columns: 16rem 1fr;
    }
}`}</code>
            </pre>
            <p>
                Here the gutter grows from 16px to 40px between a 384px and a 1920px screen. The
                media query only decides whether there is a sidebar. You never need to touch the
                gutter at the breakpoint, because it is already the right size on both sides of it.
            </p>
            <p>
                You can also use a clamp() value inside a media query when a component needs a
                different range on large screens. That is rarely needed. If you find yourself doing
                it often, the viewport range is probably too wide.
            </p>
            <p>
                The <Link href="/examples">examples page</Link> shows this split in a dashboard
                layout, with fluid page gutters, gaps and card padding.
            </p>

            <h2>Performance and maintainability</h2>
            <p>
                Performance is not a reason to pick one over the other. Both are resolved during
                normal style and layout work, and neither adds a runtime cost you can measure on a
                real page.
            </p>
            <p>Maintenance is where they differ:</p>
            <ul>
                <li>
                    <strong>Less code.</strong> A fluid value is one declaration. The media query
                    version is a base value plus an override per breakpoint, often spread across a
                    file.
                </li>
                <li>
                    <strong>One place to change.</strong> Put the clamp() value in a variable or
                    design token and every element using it stays in sync.
                </li>
                <li>
                    <strong>Closer to the design.</strong> Designers usually hand over a mobile and
                    a desktop size. A clamp() value is exactly those two sizes and a range, with
                    nothing invented in between.
                </li>
                <li>
                    <strong>Harder to read at a glance.</strong> <code>1.667rem + 2.593vw</code>{' '}
                    does not tell you what size you get at 1024px. A short comment with the pixel
                    sizes and the range fixes that.
                </li>
            </ul>
            <p>
                Both approaches need care with zoom. Text sized with <code>clamp()</code> needs a{' '}
                <code>rem</code> part so it still grows when users zoom in. With media queries,
                zooming in makes the page narrower in CSS pixels, which can drop it below a
                breakpoint and switch the text to its smaller size. The{' '}
                <Link href="/fluid-typography-accessibility">fluid typography accessibility</Link>{' '}
                guide explains how to get it right.
            </p>

            <h2>Summary</h2>
            <ul>
                <li>Media queries step between fixed values. clamp() scales continuously.</li>
                <li>Use clamp() for font sizes, padding, margins and gaps.</li>
                <li>Use media queries and container queries for layout and for on-off changes.</li>
                <li>Use both together: breakpoints for structure, fluid values for sizes.</li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="clamp() vs media queries FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'CSS clamp() vs Media Queries: When to Use Which',
    description,
    path: '/clamp-vs-media-queries',
});

export default Page;
