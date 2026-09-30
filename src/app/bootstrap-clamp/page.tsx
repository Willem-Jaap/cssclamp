import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'How Bootstrap 5 RFS makes font sizes responsive, and how to use CSS clamp() instead for headings, display sizes, fs-* utilities and spacers. Tested on 5.3.';

const faq: FaqItem[] = [
    {
        question: 'Does Bootstrap 5 use clamp() for font sizes?',
        answer: 'No. Bootstrap 5 uses RFS, which writes a calc() value like calc(1.375rem + 1.5vw) and a @media (min-width: 1200px) rule that switches to the fixed size. You can replace those values with clamp() by overriding the Sass variables.',
    },
    {
        question: 'Do I need to set $enable-rfs to false to use clamp()?',
        answer: 'No. RFS only rescales plain px and rem numbers. Any other value, including a clamp(), is printed as is without a media query. Keep $enable-rfs on if you want RFS for the sizes you did not replace, or turn it off to make every other size fixed.',
    },
    {
        question: 'How do I make Bootstrap headings fluid with clamp()?',
        answer: 'Set $h1-font-size to $h6-font-size to clamp() values before you import Bootstrap’s variables. The h1 to h6 elements, the .h1 to .h6 classes and the .fs-1 to .fs-6 utilities all pick them up.',
    },
    {
        question: 'Can I add a clamp() value to Bootstrap spacers?',
        answer: 'Yes. Add a key to the $spacers map, for example section: clamp(1rem, 0.333rem + 2.963vw, 3rem). Bootstrap then generates p-section, my-section, gap-section and g-section. If you enable negative margins, also set $negative-spacers yourself.',
    },
    {
        question: 'How do I use clamp() with Bootstrap from a CDN?',
        answer: 'Without Sass, add your own CSS after Bootstrap’s stylesheet, for example h1, .h1 { font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem); }. Media queries do not add specificity, so your later rule wins at every screen size.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="Bootstrap"
            title="Fluid font sizes in Bootstrap with CSS clamp()"
            lede="How Bootstrap 5’s built-in responsive font sizes work, and how to swap them for clamp() in headings, display sizes and spacing."
            article={{ path: '/bootstrap-clamp', description }}>
            <p>
                Bootstrap 5 already makes large text smaller on small screens. It does that with a
                tool called RFS, not with <code>clamp()</code>. That works, but you do not control
                the start and end sizes, and every value snaps to its full size at one breakpoint.
            </p>
            <p>
                This page shows what RFS does, and how to replace it with clamp() values from the{' '}
                <Link href="/">clamp() generator</Link>. Everything here was tested against
                Bootstrap 5.3.8 and Dart Sass.
            </p>

            <h2>How Bootstrap’s RFS works</h2>
            <p>
                RFS stands for Responsive Font Sizes. Bootstrap turns it on by default with{' '}
                <code>$enable-rfs: true</code> and uses it for headings, display headings, the{' '}
                <code>.fs-*</code> utilities and a few components like <code>legend</code>. The
                default <code>h3</code> compiles to:
            </p>
            <pre>
                <code>{`h3, .h3 {
    font-size: calc(1.3rem + 0.6vw);
}
@media (min-width: 1200px) {
    h3, .h3 {
        font-size: 1.75rem;
    }
}`}</code>
            </pre>
            <ul>
                <li>
                    Below 1200px, the size is a <code>calc()</code> that grows with the viewport.
                </li>
                <li>
                    From 1200px up, a media query sets the fixed size from{' '}
                    <code>$h3-font-size</code>.
                </li>
                <li>
                    Sizes of <code>1.25rem</code> or less, the default <code>$rfs-base-value</code>,
                    are never scaled. That is why <code>h5</code> and <code>h6</code> stay fixed.
                </li>
                <li>
                    How much smaller the text gets on a phone depends on <code>$rfs-factor</code>,
                    not on a size you pick.
                </li>
            </ul>
            <p>
                With <code>clamp()</code> you choose both sizes and both screen widths yourself, and
                you get one declaration instead of two.
            </p>

            <h2>Replacing heading sizes with clamp()</h2>
            <p>
                Set the variables before you import Bootstrap’s <code>variables</code> file.
                Bootstrap declares its defaults with <code>!default</code>, so your values win.
            </p>
            <pre>
                <code>{`// custom.scss
@import 'bootstrap/scss/functions';

// 36px to 64px, 30px to 48px, … between 360px and 1440px
$h1-font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
$h2-font-size: clamp(1.875rem, 1.5rem + 1.667vw, 3rem);
$h3-font-size: clamp(1.5rem, 1.25rem + 1.111vw, 2.25rem);
$h4-font-size: clamp(1.25rem, 1.083rem + 0.741vw, 1.75rem);
$h5-font-size: clamp(1.125rem, 1.042rem + 0.37vw, 1.375rem);
$h6-font-size: clamp(1rem, 0.958rem + 0.185vw, 1.125rem);

$display-font-sizes: (
    1: clamp(3rem, 2.333rem + 2.963vw, 5rem),
    2: clamp(2.75rem, 2.167rem + 2.593vw, 4.5rem),
    3: clamp(2.5rem, 2rem + 2.222vw, 4rem),
    4: clamp(2.25rem, 1.833rem + 1.852vw, 3.5rem),
    5: clamp(2rem, 1.667rem + 1.481vw, 3rem),
    6: clamp(1.75rem, 1.5rem + 1.111vw, 2.5rem),
);

@import 'bootstrap/scss/bootstrap';`}</code>
            </pre>
            <p>That compiles to a single rule per heading, with no media query:</p>
            <pre>
                <code>{`h1, .h1 {
    font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
}

.display-1 {
    font-size: clamp(3rem, 2.333rem + 2.963vw, 5rem);
    /* … font-weight, line-height */
}

.fs-1 {
    font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem) !important;
}`}</code>
            </pre>
            <ul>
                <li>
                    <code>$font-sizes</code>, the map behind <code>.fs-1</code> to{' '}
                    <code>.fs-6</code>, is built from the heading variables, so the utilities follow
                    automatically.
                </li>
                <li>
                    Overriding <code>$display-font-sizes</code> replaces the whole map. List all six
                    steps, or the ones you leave out disappear.
                </li>
                <li>
                    Recent Dart Sass versions warn that <code>@import</code> is deprecated. That is
                    how Bootstrap 5 is set up, and the warnings are safe to silence with{' '}
                    <code>--silence-deprecation=import</code>.
                </li>
            </ul>

            <h3>Do you need $enable-rfs: false?</h3>
            <p>
                No. RFS only rescales numbers in <code>px</code> or <code>rem</code>. For anything
                else, including a <code>clamp()</code>, it prints the value unchanged and skips the
                media query. You can leave RFS on, and the sizes you did not replace, like the{' '}
                <code>legend</code> element, keep their RFS behaviour.
            </p>
            <p>
                Set <code>$enable-rfs: false</code> only if you want every size you did not replace
                to be fixed. Then no <code>calc()</code> values or 1200px media queries are left
                from RFS at all.
            </p>

            <h2>Fluid spacing with $spacers</h2>
            <p>
                Bootstrap’s spacing utilities come from the <code>$spacers</code> map. Add a clamp()
                value under a new key. Because you redefine the map, repeat the default steps too.
            </p>
            <pre>
                <code>{`@import 'bootstrap/scss/functions';

$spacer: 1rem;
$spacers: (
    0: 0,
    1: $spacer * 0.25,
    2: $spacer * 0.5,
    3: $spacer,
    4: $spacer * 1.5,
    5: $spacer * 3,
    // 16px to 48px between 360px and 1440px
    section: clamp(1rem, 0.333rem + 2.963vw, 3rem),
);

@import 'bootstrap/scss/bootstrap';`}</code>
            </pre>
            <p>
                That gives you <code>p-section</code>, <code>py-section</code>,{' '}
                <code>mt-section</code>, <code>gap-section</code> and responsive versions like{' '}
                <code>py-lg-section</code>. Bootstrap also uses <code>$spacers</code> for grid
                gutters, so <code>g-section</code> sets a fluid gutter on a row.
            </p>
            <pre>
                <code>{`<section class="py-section">
    <div class="row g-section">…</div>
</section>`}</code>
            </pre>
            <h3>Negative margins</h3>
            <p>
                If you turn on <code>$enable-negative-margins</code>, Bootstrap tries to negate
                every spacer, and Sass stops with{' '}
                <code>Undefined operation &quot;-clamp(…)&quot;</code>. Define{' '}
                <code>$negative-spacers</code> yourself, next to <code>$spacers</code> and before
                you import Bootstrap, and wrap the fluid value in <code>calc(-1 * …)</code>:
            </p>
            <pre>
                <code>{`$negative-spacers: (
    n1: -0.25rem,
    n2: -0.5rem,
    n3: -1rem,
    n4: -1.5rem,
    n5: -3rem,
    nsection: calc(-1 * clamp(1rem, 0.333rem + 2.963vw, 3rem)),
);`}</code>
            </pre>
            <p>
                That gives you classes like <code>mt-nsection</code>, with the fluid value negated.
            </p>

            <h2>Without Sass: plain CSS overrides</h2>
            <p>
                If you load Bootstrap’s compiled CSS from a CDN, override the sizes in your own
                stylesheet, loaded after Bootstrap:
            </p>
            <pre>
                <code>{`:root {
    --text-h1: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
    --text-h2: clamp(1.875rem, 1.5rem + 1.667vw, 3rem);
    --space-section: clamp(1rem, 0.333rem + 2.963vw, 3rem);
}

h1, .h1 { font-size: var(--text-h1); }
h2, .h2 { font-size: var(--text-h2); }

.section-y {
    padding-block: var(--space-section);
}`}</code>
            </pre>
            <p>
                A media query does not add specificity. Bootstrap’s 1200px rule for <code>h1</code>{' '}
                has the same specificity as yours, so the rule that comes last wins. Put your file
                after Bootstrap and the clamp() applies at every width. The <code>.fs-*</code>{' '}
                utilities use <code>!important</code>, so for those a new class like{' '}
                <code>.section-y</code> is cleaner than an override.
            </p>

            <h2>Tips</h2>
            <ul>
                <li>
                    Keep one viewport range for every value, so headings and spacing grow in step.
                    Set it once in the <Link href="/">generator</Link>.
                </li>
                <li>
                    Keep Bootstrap’s breakpoints, like <code>col-md-6</code>, for layout. clamp() is
                    for sizes, not for changing the number of columns.
                </li>
                <li>
                    Writing lots of values? A <Link href="/sass-clamp">Sass fluid() function</Link>{' '}
                    can calculate them for you at compile time.
                </li>
                <li>
                    New to clamp()? The <Link href="/guide">guide</Link> explains how to read a
                    value.
                </li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="Bootstrap clamp() FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Bootstrap clamp() Font Size: Fluid Typography in Bootstrap 5',
    description,
    path: '/bootstrap-clamp',
});

export default Page;
