import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'Make fluid typography with CSS clamp() pass WCAG 1.4.4 Resize Text: why pure vw fails zoom, why the rem part matters, the 2.5x rule and how to test at 200%.';

const faq: FaqItem[] = [
    {
        question: 'Is fluid typography with clamp() accessible?',
        answer: 'It can be. Use rem for the minimum, the maximum and the fixed part of the preferred value, keep the maximum within about 2.5 times the minimum, and test at 200% browser zoom. Font sizes made only of vw units are the ones that fail.',
    },
    {
        question: 'Why does a vw font size not grow when I zoom in?',
        answer: 'Browser zoom makes CSS pixels larger, so the page gets fewer CSS pixels wide. A vw value is a percentage of that width, so it shrinks in CSS pixels by the same factor that zoom enlarges them. The two cancel out and the text stays the same size on screen.',
    },
    {
        question: 'What does WCAG 1.4.4 Resize Text require?',
        answer: 'Success criterion 1.4.4, level AA, requires that text can be resized up to 200 percent without assistive technology and without loss of content or functionality. Captions and images of text are excluded.',
    },
    {
        question: 'What is the 2.5 times rule for fluid type?',
        answer: 'If the maximum font size is at most 2.5 times the minimum, text can reach twice its largest size at 500% browser zoom, because at that zoom it renders at no less than 5 times its minimum. It is a conservative rule of thumb, not part of WCAG.',
    },
    {
        question: 'Should fluid font sizes use rem or px?',
        answer: 'Use rem. Both scale with browser zoom, but only rem also follows the default font size a user sets in their browser settings. A clamp() with px bounds ignores that setting completely.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="Accessibility"
            title="Fluid typography and accessibility"
            lede="How to make clamp() font sizes that still grow when people zoom in or change their default font size, and how to test them."
            article={{ path: '/fluid-typography-accessibility', description }}>
            <p>
                Fluid type scales with the screen. That is the point of it, but it also means the
                font size depends on something the reader does not control directly. Done badly,
                text stops growing when people zoom in. Done well, a <code>clamp()</code> font size
                is just as accessible as a fixed one.
            </p>

            <h2>What WCAG asks for</h2>
            <p>
                WCAG success criterion 1.4.4, Resize Text, is level AA. It says that, except for
                captions and images of text, text can be resized without assistive technology up to
                200 percent without loss of content or functionality.
            </p>
            <p>
                In practice most people resize text with browser zoom, and some change the default
                font size in their browser settings. Your fluid type has to work with both.
            </p>

            <h2>How browser zoom works</h2>
            <p>
                Browser zoom makes every CSS pixel bigger. The window on the screen stays the same
                size, so the page gets fewer CSS pixels wide. A 1440px wide window at 200% zoom is a
                720px wide page as far as your CSS is concerned.
            </p>
            <p>
                That is also why a page can switch to its mobile layout when you zoom in far enough.
            </p>

            <h2>Why pure vw font sizes fail</h2>
            <p>
                A <code>vw</code> unit is 1% of the viewport width in CSS pixels. Take a heading set
                in viewport units only:
            </p>
            <pre>
                <code>{`h1 {
    font-size: 4vw;
}`}</code>
            </pre>
            <p>
                In a 1440px window at 100%, that is 57.6px. At 200% zoom the page is 720px wide, so{' '}
                <code>4vw</code> is 28.8 CSS pixels. Each of those is drawn twice as large, so the
                heading is still 57.6px on screen. Zoom enlarged the pixels and shrank the viewport
                by the same factor, and the two cancel out.
            </p>
            <p>
                The heading does not grow at all, however far the reader zooms. It also ignores the
                browser’s default font size setting, because <code>vw</code> has nothing to do with
                font sizes.
            </p>

            <h2>Why the rem part matters</h2>
            <p>
                A <code>clamp()</code> font size mixes units. Take this heading, which grows from
                36px to 64px between a 360px and a 1440px screen:
            </p>
            <pre>
                <code>{`h1 {
    font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
}`}</code>
            </pre>
            <p>
                When you zoom in, the two parts of the preferred value behave differently. The{' '}
                <code>1.667rem</code> part grows with zoom, like any fixed size. The{' '}
                <code>2.593vw</code> part stays the same size on screen, like the pure{' '}
                <code>vw</code> heading above. The minimum and maximum are in <code>rem</code>, so
                they grow with zoom too.
            </p>
            <p>
                So the larger the <code>rem</code> share of the preferred value, the better the text
                responds to zoom. A small size range over a wide viewport range gives a small slope
                and a large <code>rem</code> part. A big size range over a narrow viewport range
                does the opposite.
            </p>
            <p>Here is what that heading does in a 1440px wide window:</p>
            <ul>
                <li>
                    <strong>100% zoom</strong>: 64px, the maximum.
                </li>
                <li>
                    <strong>200% zoom</strong>: about 91px on screen. That is 1.42 times the
                    original, not 2 times.
                </li>
                <li>
                    <strong>About 340% zoom</strong>: 128px, twice the original.
                </li>
                <li>
                    <strong>500% zoom</strong>: 180px, the minimum of 36px drawn five times as
                    large.
                </li>
            </ul>
            <p>
                So even a reasonable fluid heading may not double at exactly 200% zoom. It gets
                there, but it needs more zoom than a fixed size would. The{' '}
                <Link href="/deepdive">deep dive</Link> explains the formula behind these numbers.
            </p>

            <h2>The 2.5 times rule of thumb</h2>
            <p>
                A common rule is to keep the maximum font size at or below about 2.5 times the
                minimum. Here is the reasoning behind it:
            </p>
            <ul>
                <li>Chrome, Edge and Firefox let you zoom up to 500%.</li>
                <li>
                    At any zoom level, the text is never smaller than its minimum in CSS pixels. At
                    500% zoom, that minimum is drawn five times as large.
                </li>
                <li>
                    The text is never larger than its maximum at 100% zoom. To reach 200% of any
                    size it had, it has to reach twice the maximum.
                </li>
                <li>
                    Five times the minimum is at least twice the maximum when the maximum is at most
                    2.5 times the minimum.
                </li>
            </ul>
            <p>
                The heading above passes: 64px is about 1.8 times 36px. Now take a heading that
                grows from 16px to 64px over the same range. The intercept works out to zero, so the
                preferred value is only viewport units:
            </p>
            <pre>
                <code>{`h1 {
    font-size: clamp(1rem, 4.444vw, 4rem);
}`}</code>
            </pre>
            <p>
                The maximum is four times the minimum. In a 1440px window it stays at 64px on screen
                at 100%, 200% and 400% zoom, and only reaches 80px at 500%. It never gets close to
                128px.
            </p>
            <p>A few things to keep in mind about this rule:</p>
            <ul>
                <li>
                    It is a safe upper limit, not an exact test. Values above 2.5 times can still
                    pass, depending on the slope and the window size.
                </li>
                <li>
                    It relies on the browser zooming to 500%. If a browser stops earlier, the safe
                    ratio is lower.
                </li>
                <li>
                    It counts text as resizable if it reaches 200% at some zoom level. WCAG does not
                    say which zoom level has to get you there, and a stricter reading expects twice
                    the size at 200% zoom. As the example above shows, most fluid headings do not
                    meet that stricter reading.
                </li>
            </ul>
            <p>
                Two articles cover this in depth. Adrian Roselli’s{' '}
                <Link
                    href="https://adrianroselli.com/2019/12/responsive-type-and-zoom.html"
                    target="_blank"
                    rel="noreferrer">
                    Responsive Type and Zoom
                </Link>{' '}
                shows how viewport-based type fails to scale when zoomed. Maxwell Barvian’s{' '}
                <Link
                    href="https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/"
                    target="_blank"
                    rel="noreferrer">
                    Addressing Accessibility Concerns With Using Fluid Type
                </Link>{' '}
                on Smashing Magazine works through the maths and the 2.5 times rule.
            </p>

            <h2>Respect the default font size</h2>
            <p>
                Browser zoom is not the only way people make text bigger. Many set a larger default
                font size in their browser settings, so every site starts larger. That setting
                changes the size of <code>1rem</code>, and nothing else.
            </p>
            <ul>
                <li>
                    <strong>Use rem, not px, for the minimum, maximum and intercept.</strong> A
                    value like <code>clamp(16px, 10px + 1.563vw, 40px)</code> scales with zoom but
                    ignores the font size setting completely.
                </li>
                <li>
                    <strong>Do not set a px font size on the root element.</strong>{' '}
                    <code>
                        html {'{'} font-size: 16px; {'}'}
                    </code>{' '}
                    overrides the user’s setting for every <code>rem</code> value on the page.
                </li>
                <li>
                    <strong>Keep body text close to fixed.</strong> A range like <code>1rem</code>{' '}
                    to <code>1.125rem</code> barely depends on the viewport, so it behaves almost
                    exactly like a fixed size.
                </li>
            </ul>
            <p>
                The <Link href="/">clamp() generator</Link> outputs rem for every fixed part of the
                value, so this is taken care of if you copy its output.
            </p>

            <h2>Avoid loss of content</h2>
            <p>
                The second half of 1.4.4 is easy to forget: text has to grow without loss of
                content. At high zoom levels the page is very narrow in CSS pixels, so it behaves
                like a small phone. Make sure your minimum size still fits there:
            </p>
            <ul>
                <li>Long words in large headings should wrap instead of overflowing the screen.</li>
                <li>Boxes with a fixed height should not clip text that has grown.</li>
                <li>Sticky headers should not cover most of the screen when zoomed in.</li>
            </ul>

            <h2>How to test</h2>
            <ol>
                <li>
                    Open the page in a wide window and zoom to 200% with <code>Ctrl</code> or{' '}
                    <code>Cmd</code> and <code>+</code>. Check that headings and body text are
                    clearly larger, and that nothing overlaps, overflows or gets cut off.
                </li>
                <li>
                    Keep zooming towards 400% and 500%. Your largest heading should eventually reach
                    twice the size it had at 100%.
                </li>
                <li>
                    To compare exact sizes, read the computed <code>font-size</code> in DevTools. It
                    is in CSS pixels, so multiply it by the zoom level to get the size on screen.
                </li>
                <li>
                    Reset the zoom and raise the default font size in the browser settings. In
                    Chrome that is under Appearance, in Firefox under Fonts. All text should grow,
                    including fluid headings.
                </li>
                <li>Repeat the zoom test in a narrow window, where most text is at its minimum.</li>
            </ol>

            <h2>Summary</h2>
            <ul>
                <li>Never size text with viewport units alone.</li>
                <li>
                    Use <code>rem</code> for the minimum, the maximum and the intercept.
                </li>
                <li>Keep the maximum at or below about 2.5 times the minimum.</li>
                <li>Test at 200% zoom and beyond, and with a larger default font size.</li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="Fluid typography accessibility FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Fluid Typography Accessibility: clamp(), Zoom and WCAG 1.4.4',
    description,
    path: '/fluid-typography-accessibility',
});

export default Page;
