import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'A Sass fluid() function and SCSS mixin that turn px sizes into a rem-based CSS clamp(), plus a type scale loop. Tested with Dart Sass, with compiled output.';

const faq: FaqItem[] = [
    {
        question: 'Can I use clamp() in Sass?',
        answer: 'Yes. clamp() is a CSS function, and Dart Sass 1.40 and later parse it as a calculation. You can use Sass variables and functions inside it, and Sass keeps the clamp() in the output when the units cannot be combined, like rem and vw.',
    },
    {
        question: 'Why does Sass say rem and vw have incompatible units?',
        answer: 'You added a rem value and a vw value outside of clamp() or calc(). Sass cannot add those at compile time. Put the sum inside clamp() or calc() so the browser resolves it, which is what the fluid() function on this page does.',
    },
    {
        question: 'Why does my clamp() output still contain Sass variables?',
        answer: 'You are on a Sass version older than 1.40, or on LibSass or node-sass. Those treat clamp() as plain text and copy it as is. Upgrade to the sass package from npm. The function on this page also needs @use and math.div, which LibSass does not support.',
    },
    {
        question: 'Should the fluid() function take px or rem?',
        answer: 'Take px as input, because design files use px and the slope is easier to reason about. Output rem for the bounds and the intercept, so text still grows when users change their browser font size or zoom in.',
    },
    {
        question: 'Is there a Sass clamp() mixin for fluid typography?',
        answer: 'Yes. Wrap the function in a mixin that takes the property name, for example @include fluid(font-size, 36px, 64px). It writes the same clamp() value the function returns, so you can use whichever reads better.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="Sass"
            title="A Sass clamp() function for fluid typography"
            lede="A small SCSS function and mixin that turn a start and end size in px into a rem-based clamp(), tested against Dart Sass."
            article={{ path: '/sass-clamp', description }}>
            <p>
                If your project uses Sass, you do not have to paste clamp() values from a generator
                one by one. A short function can do the same maths at compile time. You write{' '}
                <code>fluid(36px, 64px)</code> and Sass writes the full clamp() for you.
            </p>
            <p>
                The function below uses the same formula as the{' '}
                <Link href="/">clamp() generator</Link>, so the output matches it to the third
                decimal. If you want to know where the numbers come from, read the{' '}
                <Link href="/deepdive">deep dive</Link>.
            </p>

            <h2>The fluid() function</h2>
            <p>
                Copy this into a partial like <code>_fluid.scss</code>. It needs Dart Sass, the{' '}
                <code>sass</code> package on npm, version 1.40 or later.
            </p>
            <pre>
                <code>{`@use 'sass:math';

$root-font-size: 16px;

// px to rem, rounded to 3 decimals
@function to-rem($px) {
    @return math.div(math.round(math.div($px, $root-font-size) * 1000), 1000) * 1rem;
}

// Grows from $min at $min-vw to $max at $max-vw. All inputs in px.
@function fluid($min, $max, $min-vw: 360px, $max-vw: 1440px) {
    $slope: math.div($max - $min, $max-vw - $min-vw);
    $intercept: $min - $slope * $min-vw;
    $vw: math.div(math.round($slope * 100 * 1000), 1000) * 1vw;

    @return clamp(
        to-rem(math.min($min, $max)),
        to-rem($intercept) + $vw,
        to-rem(math.max($min, $max))
    );
}`}</code>
            </pre>
            <p>Here is what each line does:</p>
            <ul>
                <li>
                    <code>$slope</code> is how many px the value grows for every px of viewport. A
                    slope of 1 would grow 100vw, so the preferred value uses{' '}
                    <code>$slope * 100</code> as its vw part.
                </li>
                <li>
                    <code>$intercept</code> is where that line would cross a 0px wide viewport. It
                    becomes the rem part of the preferred value.
                </li>
                <li>
                    <code>math.min</code> and <code>math.max</code> keep the bounds in the right
                    order, so a value that shrinks as the screen grows still works.
                </li>
                <li>
                    Every number is rounded to 3 decimals with{' '}
                    <code>math.round(x * 1000) / 1000</code>, written with <code>math.div</code>{' '}
                    because the <code>/</code> operator is deprecated for division in Dart Sass.
                </li>
            </ul>

            <h3>Using it</h3>
            <pre>
                <code>{`@use 'fluid' as *;

h1 {
    font-size: fluid(36px, 64px);
}

.hero {
    // Custom viewport range: 360px to 1920px
    padding-block: fluid(16px, 128px, 360px, 1920px);

    // Shrinks from 48px to 16px as the screen grows
    margin-top: fluid(48px, 16px);
}`}</code>
            </pre>
            <p>Compiled with Dart Sass, that gives:</p>
            <pre>
                <code>{`h1 {
    font-size: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
}

.hero {
    padding-block: clamp(1rem, -0.615rem + 7.179vw, 8rem);
    margin-top: clamp(1rem, 3.667rem - 2.963vw, 3rem);
}`}</code>
            </pre>
            <p>
                The first value is exactly what the generator gives for 36px to 64px between 360px
                and 1440px. Sass also tidies up a negative vw part into a subtraction for you.
            </p>

            <h2>The mixin version</h2>
            <p>
                Some teams prefer a mixin, because it reads like a declaration. It is a thin wrapper
                around the function:
            </p>
            <pre>
                <code>{`@mixin fluid($property, $min, $max, $min-vw: 360px, $max-vw: 1440px) {
    #{$property}: fluid($min, $max, $min-vw, $max-vw);
}

.card {
    @include fluid(padding, 16px, 40px);
    @include fluid(gap, 12px, 24px, 320px, 1280px);
}`}</code>
            </pre>
            <pre>
                <code>{`.card {
    padding: clamp(1rem, 0.5rem + 2.222vw, 2.5rem);
    gap: clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem);
}`}</code>
            </pre>
            <p>
                A function and a mixin can share the name <code>fluid</code>, because Sass keeps
                them in separate namespaces.
            </p>

            <h2>A fluid type scale from a map</h2>
            <p>
                For a whole site, keep every size in one map and loop over it. Writing the values to
                custom properties means you can use them in plain CSS, in components and in inline
                styles, not only in Sass.
            </p>
            <pre>
                <code>{`@use 'sass:list';
@use 'fluid' as *;

$type-scale: (
    'h1': (36px, 64px),
    'h2': (30px, 48px),
    'h3': (24px, 36px),
    'h4': (20px, 28px),
    'h5': (18px, 22px),
    'h6': (16px, 18px),
    'p': (16px, 18px),
);

:root {
    @each $name, $sizes in $type-scale {
        --text-#{$name}: #{fluid(list.nth($sizes, 1), list.nth($sizes, 2))};
    }
}

@each $name, $sizes in $type-scale {
    .text-#{$name} {
        font-size: var(--text-#{$name});
    }
}`}</code>
            </pre>
            <p>The compiled custom properties:</p>
            <pre>
                <code>{`:root {
    --text-h1: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
    --text-h2: clamp(1.875rem, 1.5rem + 1.667vw, 3rem);
    --text-h3: clamp(1.5rem, 1.25rem + 1.111vw, 2.25rem);
    --text-h4: clamp(1.25rem, 1.083rem + 0.741vw, 1.75rem);
    --text-h5: clamp(1.125rem, 1.042rem + 0.37vw, 1.375rem);
    --text-h6: clamp(1rem, 0.958rem + 0.185vw, 1.125rem);
    --text-p: clamp(1rem, 0.958rem + 0.185vw, 1.125rem);
}

.text-h1 {
    font-size: var(--text-h1);
}
/* … one class per step */`}</code>
            </pre>
            <p>
                Note the <code>#{'{…}'}</code> around the function call. Sass does not evaluate
                expressions in a custom property value, so without interpolation you would get the
                literal text <code>fluid(…)</code> in your CSS.
            </p>

            <h2>How Sass handles clamp()</h2>
            <p>
                <code>clamp()</code> is a CSS function, not a Sass one, and that matters in two
                ways.
            </p>
            <h3>Sass cannot add rem and vw</h3>
            <p>
                <code>1.667rem + 2.593vw</code> can only be resolved in the browser, because Sass
                does not know how wide the viewport is. Written on its own, Sass stops with an
                error:
            </p>
            <pre>
                <code>{`Error: 1rem and 2vw have incompatible units.`}</code>
            </pre>
            <p>
                Since Dart Sass 1.40, <code>calc()</code>, <code>clamp()</code>, <code>min()</code>{' '}
                and <code>max()</code> are parsed as calculations. Inside them you can use variables
                and function calls, Sass does all the maths it can, and it keeps the rest as CSS for
                the browser. That is why the fluid() function can return{' '}
                <code>to-rem($intercept) + $vw</code>. If every argument has the same unit, Sass
                resolves the whole thing: <code>clamp(1rem, 2rem, 3rem)</code> compiles to{' '}
                <code>2rem</code>.
            </p>
            <h3>Mixed units need the rem conversion</h3>
            <p>
                The slope maths only works when the sizes and viewport widths share a unit. That is
                why the function takes px for everything and converts to rem at the end. Passing{' '}
                <code>fluid(2rem, 4rem)</code> with the default px viewports fails with an error,
                because the units no longer cancel out and the intercept ends up as a mix of rem and
                px. Convert rem to px before you pass it in.
            </p>
            <h3>Older Sass versions</h3>
            <p>
                Before 1.40, Dart Sass treated <code>clamp()</code> as a special function and copied
                its contents as plain text. The output then contains your function calls verbatim,
                for example <code>clamp( to-rem(math.min($min, $max)), … )</code>, which the browser
                ignores. LibSass and node-sass are deprecated and do not support <code>@use</code>{' '}
                or <code>math.div</code> at all. Install the <code>sass</code> package from npm.
            </p>

            <h2>Tips</h2>
            <ul>
                <li>
                    Use the same viewport range for every size, so all values grow in step. Change
                    the defaults in the function once instead of passing them each time.
                </li>
                <li>
                    Check a value in the <Link href="/">generator</Link> when you are unsure. The
                    preview shows exactly how it grows between the two screen sizes.
                </li>
                <li>
                    Using Tailwind as well? The same custom properties work as theme tokens. See the{' '}
                    <Link href="/tailwind">Tailwind CSS guide</Link>.
                </li>
                <li>
                    New to clamp() itself? Start with the <Link href="/guide">guide</Link>.
                </li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="Sass clamp() FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Sass clamp() Function for Fluid Typography (SCSS Mixin)',
    description,
    path: '/sass-clamp',
});

export default Page;
