---
name: css-clamp
description: Generate fluid CSS clamp() values for font sizes, spacing and layout that scale smoothly between two viewport or container widths. Use when the user asks for fluid or responsive typography, a fluid type scale, clamp() values, responsive padding/margins/gaps without breakpoints, or wants to replace stepped media-query sizes with a smooth value. Works for plain CSS, custom properties and Tailwind CSS.
---

# CSS clamp()

A fluid value is a straight line between two points: a minimum size at a minimum
viewport width and a maximum size at a maximum viewport width, capped at both ends.

```css
font-size: clamp(MIN, INTERCEPT + SLOPEvw, MAX);
```

## Always calculate with the script

Do not work the numbers out by hand. Run the bundled script, which does the
maths and rounds to three decimals:

```bash
node scripts/clamp.mjs <minSize> <maxSize> [minViewport] [maxViewport] [--unit vw|cqi] [--root 16]
```

- Sizes and viewports accept `px` or `rem` (`16`, `16px`, `1rem`). Bare numbers are px.
- Viewports default to `360px` and `1440px`.
- `--unit cqi` scales with the nearest container instead of the viewport.
- `--root` is the root font size in px, default `16`.

```bash
node scripts/clamp.mjs 16px 64px 320px 1440px
# clamp(1rem, 0.143rem + 4.286vw, 4rem)
```

The script lives next to this file. Resolve the path relative to the skill
directory. If Node is not available, use the formula below.

## Formula

All values in px, converted to rem by dividing by the root font size (16):

```
slope     = (maxSize - minSize) / (maxViewport - minViewport)
intercept = minSize - slope × minViewport
preferred = intercept(rem) + (slope × 100)vw
result    = clamp(minSize(rem), preferred, maxSize(rem))
```

Check the result: at `minViewport` the preferred value must equal `minSize`, and at
`maxViewport` it must equal `maxSize`.

## Rules

1. **Use rem for the bounds and the intercept, never px.** rem respects the user's
   font size setting and browser zoom.
2. **Never use a bare viewport unit for text** (`font-size: 4vw`). It does not grow when
   the user zooms in. The rem intercept is what keeps fluid text zoomable.
3. **Keep text ranges moderate.** For text, keep the maximum within about 2.5× the
   minimum so it still reaches 200% on zoom (WCAG 1.4.4). Body text should barely
   change, for example 16px to 18px.
4. **Pick viewports that match the design.** Use the project's smallest and largest
   design widths; ask if they are unclear. 360px–1440px is a sensible default.
5. **Use `cqi` for components** that sit in containers of different widths (cards,
   sidebars). The container needs `container-type: inline-size`.
6. **Do not use clamp when the layout changes shape** (1 column to 3). That is a
   media or container query. Clamp is for values, not layout switches.
7. **Define each value once** as a custom property or design token and reuse it.

## Output formats

Plain CSS:

```css
:root {
    --text-h1: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
    --space-section: clamp(1rem, 0.143rem + 4.286vw, 4rem);
}

h1 {
    font-size: var(--text-h1);
}
```

Tailwind CSS v4: put tokens in `@theme` to get utilities (`text-h1`, `p-section`):

```css
@theme {
    --text-h1: clamp(2.25rem, 1.667rem + 2.593vw, 4rem);
    --spacing-section: clamp(1rem, 0.143rem + 4.286vw, 4rem);
}
```

Tailwind one-off arbitrary value (no spaces): `px-[clamp(1rem,0.143rem+4.286vw,4rem)]`.

## Fluid type scale

For a full scale, run the script once per step with the same viewports. A
balanced default from 360px to 1440px:

| Element | Mobile | Desktop |
| ------- | ------ | ------- |
| h1      | 36px   | 64px    |
| h2      | 30px   | 48px    |
| h3      | 24px   | 36px    |
| h4      | 20px   | 28px    |
| h5      | 18px   | 22px    |
| h6      | 16px   | 18px    |
| p       | 16px   | 18px    |

Pair large headings with a tighter line height (about 1.1) and body text with a
looser one (about 1.6).

## Reference

Interactive generator, guide and deep dive: https://cssclamp.com
