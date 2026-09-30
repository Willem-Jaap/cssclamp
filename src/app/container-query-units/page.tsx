import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'Use CSS clamp() with container query units like cqi so components scale with their container, not the window. Units, full example, gotchas and Tailwind CSS.';

const faq: FaqItem[] = [
    {
        question: 'What is the cqi unit in CSS?',
        answer: 'cqi is 1% of the inline size of the nearest query container, which is its width in horizontal writing modes. It works like vw, but measures a parent element with container-type set instead of the browser window.',
    },
    {
        question: 'Can I use container query units inside clamp()?',
        answer: 'Yes. Container query units work anywhere a length works, including inside clamp(). Replace vw with cqi, for example clamp(1rem, 0.333rem + 3.333cqi, 2rem), and the value scales with the container instead of the window.',
    },
    {
        question: 'What is the difference between cqw and cqi?',
        answer: 'cqw always measures the physical width of the container. cqi measures its inline size, which is the width in horizontal writing modes and the height in vertical ones. For most sites they give the same result; cqi is the safer default.',
    },
    {
        question: 'What happens to cqi when there is no container?',
        answer: 'If no ancestor is a query container for that axis, container query units fall back to the small viewport units. cqi then behaves like svi, which is the same as svw in horizontal writing modes, so the value scales with the window instead.',
    },
    {
        question: 'How do I use container query units in Tailwind CSS?',
        answer: 'Add the @container class to the parent, which sets container-type: inline-size in Tailwind CSS v4, and use cqi in an arbitrary value on the child, like p-[clamp(1rem,0.333rem+3.333cqi,2rem)]. You can also put the value in an @theme token.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="Container queries"
            title="clamp() with container query units"
            lede="Swap vw for cqi and a fluid value scales with its component instead of the browser window."
            article={{ path: '/container-query-units', description }}>
            <p>
                A normal fluid value uses <code>vw</code>, so it follows the width of the browser
                window. That is right for page gutters and big headings. It is wrong for a component
                that can sit in a narrow sidebar on one page and a wide main column on the next. The
                window is the same size in both places, so the component gets the same padding and
                font size in both.
            </p>
            <p>
                Container query units fix that. They measure a parent element instead of the window,
                and they work inside <code>clamp()</code> like any other unit.
            </p>

            <h2>The units</h2>
            <p>
                Each unit is 1% of a dimension of the nearest query container, the same way{' '}
                <code>1vw</code> is 1% of the viewport:
            </p>
            <ul>
                <li>
                    <code>cqw</code>: 1% of the container’s width.
                </li>
                <li>
                    <code>cqh</code>: 1% of the container’s height.
                </li>
                <li>
                    <code>cqi</code>: 1% of the container’s inline size. In a horizontal writing
                    mode, that is the width.
                </li>
                <li>
                    <code>cqb</code>: 1% of the container’s block size. In a horizontal writing
                    mode, that is the height.
                </li>
                <li>
                    <code>cqmin</code> and <code>cqmax</code>: the smaller or larger of{' '}
                    <code>cqi</code> and <code>cqb</code>.
                </li>
            </ul>
            <p>
                For fluid values, <code>cqi</code> is the one you want almost every time. It gives
                the same result as <code>cqw</code> on most sites, and it keeps working if the text
                runs vertically.
            </p>

            <h2>Making a container</h2>
            <p>
                An element becomes a query container when you give it a <code>container-type</code>:
            </p>
            <pre>
                <code>{`.card-slot {
    container-type: inline-size;
}`}</code>
            </pre>
            <ul>
                <li>
                    <code>inline-size</code> lets descendants measure its width. This is the one you
                    need for <code>cqi</code>.
                </li>
                <li>
                    <code>size</code> lets them measure both width and height, but the element can
                    no longer take its height from its content. You usually need to give it a height
                    yourself.
                </li>
                <li>
                    <code>normal</code> is the default. The element is not a size container.
                </li>
            </ul>

            <h2>From vw to cqi</h2>
            <p>
                The formula does not change. The only difference is what the range means: instead of
                the smallest and largest screen, you pick the smallest and largest container width.
            </p>
            <p>
                Say a card should have 16px of padding at 320px wide and 32px at 800px wide, with a
                title that grows from 20px to 28px over the same range:
            </p>
            <pre>
                <code>{`slope     = (32 - 16) / (800 - 320) = 0.03333
intercept = 16 - 0.03333 × 320 = 5.333px = 0.333rem
preferred = 0.333rem + 3.333cqi`}</code>
            </pre>
            <p>
                You can use the <Link href="/">clamp() generator</Link> for this. Enter the
                container widths as the viewport range, copy the value and replace <code>vw</code>{' '}
                with <code>cqi</code>. The <Link href="/deepdive">deep dive</Link> explains the
                formula step by step.
            </p>

            <h2>A full example</h2>
            <p>
                The same card is used in a sidebar and in the main column. Each slot is a container,
                so each card sizes itself to the slot it is in:
            </p>
            <pre>
                <code>{`.layout {
    display: grid;
    grid-template-columns: 20rem 1fr;
    gap: 2rem;
}

.sidebar,
.main {
    container-type: inline-size;
}

.card {
    padding: clamp(1rem, 0.333rem + 3.333cqi, 2rem);
}

.card h2 {
    font-size: clamp(1.25rem, 0.917rem + 1.667cqi, 1.75rem);
}`}</code>
            </pre>
            <pre>
                <code>{`<div class="layout">
    <aside class="sidebar">
        <article class="card"><h2>In the sidebar</h2></article>
    </aside>
    <main class="main">
        <article class="card"><h2>In the main column</h2></article>
    </main>
</div>`}</code>
            </pre>
            <p>
                In the 320px sidebar, the card gets 16px of padding and a 20px title. In a main
                column of 800px or wider, it gets 32px and 28px. At 500px, it gets 22px of padding.
                The window size does not matter, only the slot.
            </p>
            <p>
                The generator on this site uses the same trick for its preview. The emulated screen
                is an <code>@container</code>, and the generated value is shown with <code>vw</code>{' '}
                swapped for <code>cqw</code>. That is how it can show a value at 1152px while your
                window has a different size.
            </p>

            <h2>Gotchas</h2>

            <h3>The element needs a container above it</h3>
            <p>
                Container query units resolve against the nearest ancestor that is a query container
                for that axis. If there is none, they fall back to the small viewport units:{' '}
                <code>cqi</code> behaves like <code>svi</code>, <code>cqb</code> like{' '}
                <code>svb</code>. Nothing breaks, but the value quietly follows the window instead
                of the component. If a value does not change when the container does, check that a
                parent really has <code>container-type</code>.
            </p>

            <h3>A container cannot use its own units</h3>
            <p>
                An element is never its own query container. If <code>.card</code> has{' '}
                <code>container-type: inline-size</code>, its own <code>padding</code> in{' '}
                <code>cqi</code> is measured against the next container further up, or the viewport.
                Only its children measure the card. Put the container on a wrapper, like the slots
                in the example above, when the card itself should scale.
            </p>

            <h3>Containers do not size to their content</h3>
            <p>
                <code>container-type: inline-size</code> tells the browser the element’s width does
                not depend on its content. That is what makes the units possible, but it means a
                container whose width would normally come from its content can collapse to nothing.
                Watch out for inline-block elements, floats and flex items that are not set to grow.
                Block elements and grid cells are fine.
            </p>

            <h3>cqb and cqh need a size container</h3>
            <p>
                An <code>inline-size</code> container only answers questions about its width. A{' '}
                <code>cqb</code> or <code>cqh</code> value skips it and looks further up for a{' '}
                <code>container-type: size</code> element, falling back to the viewport if there is
                none.
            </p>

            <h3>Units cannot target a named container</h3>
            <p>
                You can name a container with <code>container-name</code> and target it in an{' '}
                <code>@container</code> query. Container query units have no such option. They
                always use the nearest eligible container.
            </p>

            <h3>Font sizes still need a rem part</h3>
            <p>
                Zooming in makes a fluid container fewer CSS pixels wide, exactly like the viewport.
                A font size in <code>cqi</code> alone would not grow when people zoom, so keep the{' '}
                <code>rem</code> minimum, maximum and intercept. The{' '}
                <Link href="/fluid-typography-accessibility">fluid typography accessibility</Link>{' '}
                guide covers this in detail.
            </p>

            <h2>Tailwind CSS</h2>
            <p>
                Tailwind CSS v4 has container queries built in. The <code>@container</code> class
                sets <code>container-type: inline-size</code>, and <code>cqi</code> works in any
                arbitrary value. Leave out the spaces:
            </p>
            <pre>
                <code>{`<aside class="@container">
    <article class="p-[clamp(1rem,0.333rem+3.333cqi,2rem)]">
        <h2 class="text-[clamp(1.25rem,0.917rem+1.667cqi,1.75rem)]">Card title</h2>
    </article>
</aside>`}</code>
            </pre>
            <p>If you use the values more than once, make them theme tokens:</p>
            <pre>
                <code>{`@theme {
    --spacing-card: clamp(1rem, 0.333rem + 3.333cqi, 2rem);
    --text-card-title: clamp(1.25rem, 0.917rem + 1.667cqi, 1.75rem);
}`}</code>
            </pre>
            <p>
                That gives you <code>p-card</code> and <code>text-card-title</code>. They only
                follow the container when an ancestor has the <code>@container</code> class. The{' '}
                <Link href="/tailwind">Tailwind CSS clamp() guide</Link> covers arbitrary values and
                tokens in more depth.
            </p>

            <h2>Browser support</h2>
            <p>
                Container query units and <code>container-type</code> work in all current versions
                of Chrome, Edge, Firefox and Safari. Firefox was the last to add them, in early
                2023.
            </p>

            <h2>Summary</h2>
            <ul>
                <li>
                    <code>cqi</code> is 1% of the container’s width, the way <code>vw</code> is 1%
                    of the window’s.
                </li>
                <li>
                    Give a parent <code>container-type: inline-size</code>, then use{' '}
                    <code>cqi</code> instead of <code>vw</code> inside <code>clamp()</code>.
                </li>
                <li>Pick the range in container widths, not screen widths.</li>
                <li>
                    Without a container, the units fall back to small viewport units. An element
                    never measures itself.
                </li>
                <li>
                    Keep a <code>rem</code> part in font sizes so they still grow with zoom.
                </li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="Container query units FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'CSS clamp() with Container Query Units: Fluid Components with cqi',
    description,
    path: '/container-query-units',
});

export default Page;
