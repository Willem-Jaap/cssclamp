import type { Metadata } from 'next';
import Link from 'next/link';

import Faq, { type FaqItem } from '~/components/content/faq';
import Prose from '~/components/content/prose';

import { pageMetadata } from '~/lib/site';

const description =
    'A tiny TypeScript fluid() helper that returns a CSS clamp() string, with examples for styled-components, Emotion, vanilla-extract, CSS Modules and React styles.';

const faq: FaqItem[] = [
    {
        question: 'Can I use clamp() in CSS-in-JS?',
        answer: 'Yes. clamp() is plain CSS, so any library that accepts a CSS string accepts it. In styled-components and Emotion you write it like any other value. In object styles and React inline styles you pass it as a string, for example fontSize: "clamp(1rem, 0.958rem + 0.185vw, 1.125rem)".',
    },
    {
        question: 'How do I use clamp() with styled-components?',
        answer: 'Write the value in the template literal, or interpolate a helper that builds it: font-size: ${fluid(36, 64)}. For a design system, put the values in your theme object once and read them with props.theme in each component.',
    },
    {
        question: 'Does calculating clamp() in JavaScript slow down my React app?',
        answer: 'Barely. The helper is a few multiplications. Still, call it once when you define your theme instead of in every render. With vanilla-extract the helper runs at build time, so it never reaches the browser at all.',
    },
    {
        question: 'Why use rem in a fluid font size instead of only vw?',
        answer: 'A size in only vw ignores the browser font size and does not grow when users zoom in. Keeping a rem part in the preferred value and rem bounds means text still responds to user settings, which matters for accessibility.',
    },
    {
        question: 'Should fluid values live in JavaScript or in CSS custom properties?',
        answer: 'Generate them once in JavaScript and expose them as custom properties. Your components then use var(--text-h1), which works in any styling approach, and the browser does the resizing with no JavaScript running on resize.',
    },
];

const Page = () => {
    return (
        <Prose
            eyebrow="CSS-in-JS"
            title="CSS clamp() in CSS-in-JS and React"
            lede="One small TypeScript helper for fluid font sizes and spacing, and how to use it with styled-components, Emotion, vanilla-extract, CSS Modules and inline styles."
            article={{ path: '/css-in-js-clamp', description }}>
            <p>
                <code>clamp()</code> is plain CSS, so it works in every CSS-in-JS library without a
                plugin. What you do want is a way to create the values without pasting them from a
                generator one by one. A short helper does that.
            </p>
            <p>
                The helper uses the same formula as the <Link href="/">clamp() generator</Link>, so
                both give the same output to the third decimal. The{' '}
                <Link href="/deepdive">deep dive</Link> explains the maths.
            </p>

            <h2>The fluid() helper</h2>
            <pre>
                <code>{`// fluid.ts
const round = (value: number) => Number.parseFloat(value.toFixed(3));

/** A clamp() that grows from minPx at minVw to maxPx at maxVw. Inputs in px, output in rem. */
export const fluid = (minPx: number, maxPx: number, minVw = 360, maxVw = 1440) => {
    const slope = (maxPx - minPx) / (maxVw - minVw);
    const intercept = (minPx - slope * minVw) / 16;
    const min = Math.min(minPx, maxPx) / 16;
    const max = Math.max(minPx, maxPx) / 16;

    return \`clamp(\${round(min)}rem, \${round(intercept)}rem + \${round(slope * 100)}vw, \${round(max)}rem)\`;
};`}</code>
            </pre>
            <ul>
                <li>
                    <code>slope</code> is how many px the value grows for each px of viewport. Times
                    100, it becomes the <code>vw</code> part.
                </li>
                <li>
                    <code>intercept</code> is where that line meets a 0px viewport. Divided by 16,
                    it becomes the <code>rem</code> part.
                </li>
                <li>
                    <code>Math.min</code> and <code>Math.max</code> keep the bounds in order, so a
                    value that shrinks on wider screens also works.
                </li>
                <li>
                    <code>parseFloat(toFixed(3))</code> rounds to 3 decimals and drops trailing
                    zeros, so you get <code>4rem</code> and not <code>4.000rem</code>.
                </li>
            </ul>
            <p>Run with Node, it returns:</p>
            <pre>
                <code>{`fluid(36, 64)            // clamp(2.25rem, 1.667rem + 2.593vw, 4rem)
fluid(30, 48)            // clamp(1.875rem, 1.5rem + 1.667vw, 3rem)
fluid(16, 18)            // clamp(1rem, 0.958rem + 0.185vw, 1.125rem)
fluid(16, 64)            // clamp(1rem, 0rem + 4.444vw, 4rem)
fluid(12, 24, 320, 1280) // clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem)`}</code>
            </pre>

            <h2>Generate your tokens once</h2>
            <p>
                Do not call <code>fluid()</code> in every component with different numbers. Build a
                small theme object once, with one viewport range for everything, and import it where
                you need it. The values stay consistent and the maths runs one time.
            </p>
            <pre>
                <code>{`// theme.ts
import { fluid } from './fluid';

export const theme = {
    text: {
        h1: fluid(36, 64),
        h2: fluid(30, 48),
        h3: fluid(24, 36),
        body: fluid(16, 18),
    },
    space: {
        section: fluid(16, 64),
        gutter: fluid(16, 32),
    },
} as const;`}</code>
            </pre>

            <h2>styled-components</h2>
            <p>
                Interpolate the helper or a theme value straight into the template literal. The
                result is a normal string, so styled-components treats it like any other value.
            </p>
            <pre>
                <code>{`import styled from 'styled-components';

import { fluid } from './fluid';
import { theme } from './theme';

export const Title = styled.h1\`
    font-size: \${fluid(36, 64)};
    line-height: 1.1;
\`;

export const Section = styled.section\`
    padding-block: \${theme.space.section};
\`;`}</code>
            </pre>
            <p>
                If you already pass a theme through <code>ThemeProvider</code>, add the fluid tokens
                to it and read them with <code>{'${({ theme }) => theme.text.h1}'}</code>.
            </p>

            <h2>Emotion</h2>
            <p>Emotion accepts the same string in object styles and in the css prop:</p>
            <pre>
                <code>{`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { fluid } from './fluid';

export const Title = styled.h1({
    fontSize: fluid(36, 64),
    lineHeight: 1.1,
});

export const Card = ({ children }: { children: React.ReactNode }) => (
    <div css={css({ padding: fluid(16, 40) })}>{children}</div>
);`}</code>
            </pre>

            <h2>vanilla-extract</h2>
            <p>
                vanilla-extract runs your <code>.css.ts</code> files at build time and writes a
                static stylesheet. <code>fluid()</code> runs during the build, and the browser only
                receives the finished clamp() values. Put them in a global theme so they become
                custom properties:
            </p>
            <pre>
                <code>{`// styles.css.ts
import { createGlobalTheme, style } from '@vanilla-extract/css';

import { fluid } from './fluid';

export const vars = createGlobalTheme(':root', {
    text: {
        h1: fluid(36, 64),
        body: fluid(16, 18),
    },
    space: {
        section: fluid(16, 64),
    },
});

export const title = style({
    fontSize: vars.text.h1,
    lineHeight: 1.1,
});

export const section = style({
    paddingBlock: vars.space.section,
});`}</code>
            </pre>
            <p>The generated CSS contains no trace of the helper:</p>
            <pre>
                <code>{`:root {
    --text-h1__r5u5r70: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
    --text-body__r5u5r71: clamp(1rem, 0.958rem + 0.185vw, 1.125rem);
    --space-section__r5u5r72: clamp(1rem, 0rem + 4.444vw, 4rem);
}
.styles_title__r5u5r73 {
    font-size: var(--text-h1__r5u5r70);
    line-height: 1.1;
}`}</code>
            </pre>

            <h2>CSS Modules with custom properties</h2>
            <p>
                CSS Modules are plain CSS, so they cannot call a JavaScript function. Set the tokens
                as custom properties once, for example on the root layout, and use{' '}
                <code>var()</code> in your modules.
            </p>
            <pre>
                <code>{`// layout.tsx
import type { CSSProperties, ReactNode } from 'react';

import { theme } from './theme';

const tokens = {
    '--text-h1': theme.text.h1,
    '--space-section': theme.space.section,
} as CSSProperties;

export const Layout = ({ children }: { children: ReactNode }) => (
    <body style={tokens}>{children}</body>
);`}</code>
            </pre>
            <pre>
                <code>{`/* hero.module.css */
.hero {
    padding-block: var(--space-section);
}

.title {
    font-size: var(--text-h1);
}`}</code>
            </pre>
            <p>
                If you do not need the values in JavaScript at all, skip the helper and paste the
                output of the generator into a global stylesheet instead.
            </p>

            <h2>Inline React styles</h2>
            <p>
                Inline styles take the same string. Pass it to a camelCase property and React writes
                it to the element.
            </p>
            <pre>
                <code>{`import { fluid } from './fluid';
import { theme } from './theme';

export const Hero = () => (
    <section style={{ paddingBlock: theme.space.section }}>
        <h1 style={{ fontSize: fluid(36, 64) }}>Fluid heading</h1>
    </section>
);`}</code>
            </pre>
            <p>
                The browser still does all the resizing. No resize listener or state is needed, and
                nothing rerenders when the window changes size.
            </p>

            <h2>Tips</h2>
            <ul>
                <li>
                    Keep one viewport range for every token, so font sizes and spacing grow in step.
                    The defaults in the helper are a good place to set it.
                </li>
                <li>
                    Prefer custom properties for shared tokens. They work in every approach on this
                    page, so you can switch libraries without touching the values.
                </li>
                <li>
                    Use Tailwind or Sass as well? See the <Link href="/tailwind">Tailwind CSS</Link>{' '}
                    and <Link href="/sass-clamp">Sass</Link> guides for the same values there.
                </li>
                <li>
                    New to clamp()? The <Link href="/guide">guide</Link> explains how to read a
                    value.
                </li>
            </ul>

            <div className="not-prose mt-16">
                <Faq title="CSS-in-JS clamp() FAQ" items={faq} />
            </div>
        </Prose>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'CSS clamp() in CSS-in-JS: styled-components, Emotion & React',
    description,
    path: '/css-in-js-clamp',
});

export default Page;
