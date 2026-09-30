import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'CSS clamp() vs min() and max(): how each function works, why min() sets an upper limit, when one bound is enough, and what happens when the minimum is too big.';

const faq: FaqItem[] = [
    {
        question: 'What is the difference between clamp(), min() and max() in CSS?',
        answer: 'min() returns the smallest of its values, max() returns the largest, and clamp(MIN, VAL, MAX) keeps a value between a lower and an upper limit. clamp() is shorthand for max(MIN, min(VAL, MAX)), so it is the same as using both at once.',
    },
    {
        question: 'Why does min() set a maximum?',
        answer: 'min() picks the smallest value, so the result can never be larger than any of its arguments. width: min(100%, 40rem) is at most 40rem, which makes it an upper limit. In the same way, max() picks the largest value and sets a lower limit.',
    },
    {
        question: 'What happens if the minimum in clamp() is larger than the maximum?',
        answer: 'The minimum wins. clamp(MIN, VAL, MAX) resolves as max(MIN, min(VAL, MAX)), so after the maximum is applied, the result is raised to the minimum again. The value is then fixed at the minimum and never changes.',
    },
    {
        question: 'Do I need calc() inside clamp(), min() or max()?',
        answer: 'No. Each argument of these functions is already a calculation, so you can write min(100% - 2rem, 70ch) or clamp(1rem, 0.625rem + 1.563vw, 2.5rem) directly. Wrapping the argument in calc() also works, it is just not needed.',
    },
    {
        question: 'Which browsers support clamp(), min() and max()?',
        answer: 'All current versions of Chrome, Edge, Firefox and Safari support all three functions. They have been available in every major browser since 2020, so you can use them without a fallback unless you support very old browsers.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="Comparison"
            title="CSS clamp() vs min() and max()"
            lede="Three comparison functions, one idea: pick a value and keep it within limits. Here is how they relate and when a single limit is enough."
            article={{ path: '/clamp-vs-min-max', description }}>
            <p>
                CSS has three comparison functions: <code>min()</code>, <code>max()</code> and{' '}
                <code>clamp()</code>. They all compare values that can have different units, like a
                percentage and a <code>rem</code> value, and the browser picks one when it lays out
                the page. Once you see how they relate, choosing between them is easy.
            </p>

            <h2>min(): the smallest value wins</h2>
            <p>
                <code>min()</code> takes one or more comma-separated values and returns the
                smallest:
            </p>
            <pre>
                <code>{`.content {
    width: min(100%, 40rem);
}`}</code>
            </pre>
            <p>
                On a narrow screen <code>100%</code> is smaller, so the content fills its parent. On
                a wide screen <code>40rem</code> is smaller, so the content stops there.
            </p>
            <p>
                This is the part that trips people up: <code>min()</code> sets a{' '}
                <strong>maximum</strong>. The result can never be larger than any of its arguments,
                so each argument is an upper limit.
            </p>

            <h2>max(): the largest value wins</h2>
            <p>
                <code>max()</code> is the mirror image. It returns the largest of its values, which
                makes each argument a <strong>lower</strong> limit:
            </p>
            <pre>
                <code>{`.section {
    padding: max(1rem, 4vw);
}`}</code>
            </pre>
            <p>
                On a phone, <code>4vw</code> is only a few pixels, so the padding holds at{' '}
                <code>1rem</code>. From 400px wide, <code>4vw</code> is larger and the padding grows
                with the screen, without an upper limit.
            </p>

            <h2>clamp(): both limits at once</h2>
            <p>
                <code>clamp()</code> takes exactly three values: a minimum, a preferred value and a
                maximum. It returns the preferred value, as long as it stays between the other two:
            </p>
            <pre>
                <code>{`h1 {
    font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
}`}</code>
            </pre>
            <p>
                The spec defines it as a combination of the other two functions. These two lines
                always give the same result:
            </p>
            <pre>
                <code>{`clamp(MIN, VAL, MAX)
max(MIN, min(VAL, MAX))`}</code>
            </pre>
            <p>
                <code>min(VAL, MAX)</code> caps the preferred value at the maximum, and{' '}
                <code>max(MIN, …)</code> then raises the result to at least the minimum. So{' '}
                <code>clamp()</code> is not a new ability, just a shorter and clearer way to write
                both limits. The <Link href="/guide">guide</Link> explains how to read a full clamp
                value, and the <Link href="/deepdive">deep dive</Link> shows where the numbers in
                the middle come from.
            </p>

            <h2>When one limit is enough</h2>
            <p>
                You do not always need both ends. If a value only has to stop in one direction, a
                single <code>min()</code> or <code>max()</code> is shorter and says more clearly
                what you mean.
            </p>

            <h3>A readable content width</h3>
            <pre>
                <code>{`.article {
    width: min(100% - 2rem, 70ch);
    margin-inline: auto;
}`}</code>
            </pre>
            <p>
                The article is never wider than 70 characters, which keeps lines readable. On small
                screens it fills the parent minus 1rem on each side. There is no lower limit,
                because the parent width already is one.
            </p>

            <h3>Padding with a floor</h3>
            <pre>
                <code>{`.hero {
    padding: max(1rem, 4vw);
}`}</code>
            </pre>
            <p>
                The padding never drops below <code>1rem</code>, and grows freely on large screens.
                That is fine if the element also has a maximum width. If it can get very wide, add
                an upper limit with <code>clamp()</code>.
            </p>

            <h3>Full-bleed sections</h3>
            <pre>
                <code>{`.full-bleed {
    padding-inline: max(1rem, (100% - 70rem) / 2);
}`}</code>
            </pre>
            <p>
                The background stretches edge to edge, while the content inside stays centred at up
                to 70rem wide. The percentage refers to the width of the parent, so when the section
                is narrower than 72rem, the padding holds at <code>1rem</code>.
            </p>

            <h3>When you need clamp()</h3>
            <p>
                Use <code>clamp()</code> when a value should grow with the screen but stop at both
                ends. That covers almost every fluid font size and most fluid spacing: the text
                should not get too small on a phone, and not too large on a wide monitor. The{' '}
                <Link href="/">clamp() generator</Link> calculates the preferred value for you.
            </p>

            <h2>When the minimum is larger than the maximum</h2>
            <p>
                Because <code>clamp()</code> is <code>max(MIN, min(VAL, MAX))</code>, the minimum is
                applied last. If the minimum is larger than the maximum, the minimum wins:
            </p>
            <pre>
                <code>{`/* Always 3rem: the minimum is larger than the maximum */
font-size: clamp(3rem, 2vw, 2rem);`}</code>
            </pre>
            <p>
                The browser does not reject the value or show a warning. The size just never
                changes. This is easy to cause by accident when the minimum and maximum come from
                different variables, so it is worth checking if a fluid value refuses to move.
            </p>

            <h2>Nesting and calculations</h2>
            <p>
                Every argument of <code>min()</code>, <code>max()</code> and <code>clamp()</code> is
                already a calculation. You can add, subtract, multiply and divide inside it without
                wrapping it in <code>calc()</code>:
            </p>
            <pre>
                <code>{`/* These are the same */
width: min(100% - 2rem, 70ch);
width: min(calc(100% - 2rem), 70ch);`}</code>
            </pre>
            <p>
                The functions can also be nested inside each other, and inside <code>calc()</code>.
                Custom properties work too:
            </p>
            <pre>
                <code>{`:root {
    --space: clamp(1rem, 0.625rem + 1.563vw, 2.5rem);
}

.stack > * + * {
    margin-top: calc(var(--space) * 2);
}

.sidebar {
    width: min(max(16rem, 25%), 24rem);
}`}</code>
            </pre>
            <p>
                The last one is <code>clamp(16rem, 25%, 24rem)</code> written out by hand. When you
                see a <code>max()</code> inside a <code>min()</code>, or the other way around,
                rewriting it as <code>clamp()</code> is usually easier to read.
            </p>
            <p>A few rules to keep in mind:</p>
            <ul>
                <li>
                    Put spaces around <code>+</code> and <code>-</code>. <code>100%-2rem</code> is
                    invalid, <code>100% - 2rem</code> is not.
                </li>
                <li>
                    The units have to make sense together. You can mix lengths and percentages, but
                    not a length and a plain number.
                </li>
                <li>
                    Percentages resolve the same way they would without the function. In{' '}
                    <code>width</code> they refer to the parent’s width, in <code>font-size</code>{' '}
                    to the parent’s font size.
                </li>
            </ul>

            <h2>Browser support</h2>
            <p>
                <code>min()</code>, <code>max()</code> and <code>clamp()</code> work in all current
                versions of Chrome, Edge, Firefox and Safari, and have done so since 2020. Unless
                you support browsers older than that, you can use them without a fallback. The{' '}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp"
                    target="_blank"
                    rel="noreferrer">
                    MDN page on clamp()
                </Link>{' '}
                has the exact version numbers.
            </p>

            <h2>Summary</h2>
            <ul>
                <li>
                    <code>min()</code> returns the smallest value, so it sets an upper limit.
                </li>
                <li>
                    <code>max()</code> returns the largest value, so it sets a lower limit.
                </li>
                <li>
                    <code>clamp(MIN, VAL, MAX)</code> is <code>max(MIN, min(VAL, MAX))</code>: both
                    limits in one function.
                </li>
                <li>Use a single min() or max() when only one limit matters.</li>
                <li>If the minimum is larger than the maximum, the minimum wins.</li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="clamp(), min() and max() FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'CSS clamp() vs min() and max(): Differences and Examples',
    description,
    path: '/clamp-vs-min-max',
});

export default Page;
