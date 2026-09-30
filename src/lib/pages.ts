export interface PageLink {
    href: string;
    /** Short name for navigation. */
    label: string;
    /** Card title and description for overviews. */
    title: string;
    text: string;
}

export const tools: PageLink[] = [
    {
        href: '/font-size-clamp-generator',
        label: 'Font size generator',
        title: 'Font size clamp() generator',
        text: 'Fluid typography that scales smoothly between two screen widths.',
    },
    {
        href: '/spacing-clamp-generator',
        label: 'Spacing generator',
        title: 'Spacing clamp() generator',
        text: 'Fluid padding and margin, previewed on a real layout.',
    },
    {
        href: '/fluid-type-scale-generator',
        label: 'Type scale generator',
        title: 'Fluid type scale generator',
        text: 'A complete clamp() type scale from one base size and ratio.',
    },
    {
        href: '/tailwind-clamp-generator',
        label: 'Tailwind generator',
        title: 'Tailwind CSS clamp() generator',
        text: 'Fluid values as Tailwind v4 or v3 theme tokens, or as a class.',
    },
    {
        href: '/line-height-clamp-generator',
        label: 'Line height generator',
        title: 'Line height clamp() generator',
        text: 'Line spacing that opens up as lines get longer.',
    },
    {
        href: '/gap-clamp-generator',
        label: 'Gap generator',
        title: 'Gap clamp() generator',
        text: 'Fluid grid and flexbox gaps that grow with the screen.',
    },
    {
        href: '/border-radius-clamp-generator',
        label: 'Border radius generator',
        title: 'Border radius clamp() generator',
        text: 'Corners that stay in proportion as elements grow.',
    },
    {
        href: '/px-to-rem-converter',
        label: 'px to rem converter',
        title: 'px to rem converter',
        text: 'Convert between px, rem and vw with any base size.',
    },
];

export const guides: PageLink[] = [
    {
        href: '/guide',
        label: 'Guide',
        title: 'How to use CSS clamp()',
        text: 'The syntax, how to read a clamp value and when to use it.',
    },
    {
        href: '/tailwind',
        label: 'Tailwind CSS',
        title: 'Tailwind CSS clamp() guide',
        text: 'Fluid font sizes and spacing in Tailwind CSS v4 and v3.',
    },
    {
        href: '/deepdive',
        label: 'Deep dive',
        title: 'The maths behind clamp()',
        text: 'Slope, intercept, zoom and accessibility, and container units.',
    },
    {
        href: '/examples',
        label: 'Examples',
        title: 'Examples',
        text: 'A fluid type scale and a dashboard layout with fluid gutters.',
    },
    {
        href: '/clamp-vs-media-queries',
        label: 'clamp() vs media queries',
        title: 'clamp() vs media queries',
        text: 'Continuous scaling versus breakpoints, and when to use each.',
    },
    {
        href: '/clamp-vs-min-max',
        label: 'clamp() vs min() and max()',
        title: 'clamp() vs min() and max()',
        text: 'How the three comparison functions relate, with examples.',
    },
    {
        href: '/fluid-typography-accessibility',
        label: 'Accessibility',
        title: 'Fluid typography accessibility',
        text: 'Zoom, WCAG 1.4.4 and how to keep fluid text resizable.',
    },
    {
        href: '/container-query-units',
        label: 'Container query units',
        title: 'clamp() with container query units',
        text: 'Components that scale with their container instead of the window.',
    },
    {
        href: '/sass-clamp',
        label: 'Sass',
        title: 'Sass clamp() function',
        text: 'A fluid() function and mixin for SCSS projects.',
    },
    {
        href: '/bootstrap-clamp',
        label: 'Bootstrap',
        title: 'clamp() in Bootstrap',
        text: 'Fluid font sizes and spacers instead of RFS.',
    },
    {
        href: '/css-in-js-clamp',
        label: 'CSS-in-JS',
        title: 'clamp() in CSS-in-JS',
        text: 'A fluid() helper for styled-components, Emotion and vanilla-extract.',
    },
];
